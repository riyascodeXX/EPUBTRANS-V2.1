import ts from 'typescript'
import {readFileSync,writeFileSync,readdirSync} from 'node:fs'
import path from 'node:path'
const roots=['src/app/(frontend)','src/components','src/lib/validation']
const texts=new Set()
const normalize=value=>value.replace(/\s+/g,' ').trim()
function walk(directory){for(const entry of readdirSync(directory,{withFileTypes:true})){const file=path.join(directory,entry.name);if(entry.isDirectory()){if(!['api','i18n'].includes(entry.name))walk(file)}else if(/\.tsx?$/.test(file)){const ast=ts.createSourceFile(file,readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true,file.endsWith('tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);function visit(node){if(ts.isJsxText(node)||ts.isStringLiteral(node)||ts.isNoSubstitutionTemplateLiteral(node)){const text=normalize(node.text);if(text.length>=2&&text.length<=5000&&/[a-zA-Z]/.test(text)&&!/^[@./#]/.test(text)&&!text.includes('className='))texts.add(text)}ts.forEachChild(node,visit)}visit(ast)}}}
roots.forEach(walk)
writeFileSync('src/lib/i18n/public-ui-texts.json',JSON.stringify([...texts].sort(),null,2)+'\n')
console.log(`Registered ${texts.size} public UI strings for translation.`)
