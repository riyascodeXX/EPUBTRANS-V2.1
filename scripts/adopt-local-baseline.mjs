import 'dotenv/config'
import pg from 'pg'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
const url = new URL(process.env.DATABASE_URL)
if (!['127.0.0.1','localhost','::1'].includes(url.hostname)) throw new Error('Existing local database adoption only; remote databases require reviewed migration deployment.')
const directory = 'src/migrations'
const baseline = '20261007_103004_baseline'
const enterprise = '20261007_103126_enterprise'
const pool = new pg.Pool({connectionString:process.env.DATABASE_URL})
const client = await pool.connect()
try {
 const applied = await client.query('SELECT name FROM payload_migrations WHERE name=$1',[enterprise])
 if (applied.rowCount) { console.log('Enterprise migration already applied.'); process.exitCode=0 }
 else {
  const baseSource=await readFile(path.join(directory,baseline+'.ts'),'utf8')
  const tables=[...baseSource.split('export async function down')[0].matchAll(/CREATE TABLE "([^"]+)"/g)].map(match=>match[1])
  for(const table of tables) { const result=await client.query('SELECT to_regclass($1) AS name',[`public.${table}`]);if(!result.rows[0].name) throw new Error(`Baseline table missing: ${table}. Do not adopt automatically.`) }
  await mkdir('.local-backups',{recursive:true})
  const snapshot={capturedAt:new Date().toISOString(),tables:{},columns:[],sequences:[]}
  const result=await client.query("SELECT tablename FROM pg_tables WHERE schemaname='public'")
  for(const {tablename} of result.rows) snapshot.tables[tablename]=(await client.query('SELECT * FROM "'+tablename.replaceAll('"','""')+'"')).rows
  snapshot.columns=(await client.query("SELECT * FROM information_schema.columns WHERE table_schema='public' ORDER BY table_name,ordinal_position")).rows
  snapshot.sequences=(await client.query("SELECT * FROM pg_sequences WHERE schemaname='public'")).rows
  const backup='.local-backups/pre-enterprise-'+Date.now()+'.json'
  await writeFile(backup,JSON.stringify(snapshot,null,2))
  const source=await readFile(path.join(directory,enterprise+'.ts'),'utf8')
  const sql=source.split('export async function down')[0].match(/await db.execute\(sql`([\s\S]*?)`\)/)?.[1]
  if(!sql || /\$\{|^\s*(DROP|DELETE|TRUNCATE)\s/im.test(sql)) throw new Error('Migration must be additive static SQL.')
  await client.query('BEGIN')
  await client.query(sql)
  await client.query('INSERT INTO payload_migrations (name,batch) VALUES ($1,1),($2,2)',[baseline,enterprise])
  await client.query('COMMIT')
  console.log('Baseline adopted and additive enterprise migration committed. Local backup saved in .local-backups.')
 }
} catch(error) {await client.query('ROLLBACK'); throw error}
finally {client.release(); await pool.end()}
