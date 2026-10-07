import fs from 'node:fs'
import path from 'node:path'
const root='src/app/(frontend)'
const walk=directory=>fs.readdirSync(directory,{withFileTypes:true}).flatMap(item=>item.isDirectory()?walk(path.join(directory,item.name)):[path.join(directory,item.name)])
for(const file of walk(root).filter(file=>file.endsWith('page.tsx'))){let text=fs.readFileSync(file,'utf8');if(/^export const metadata(?:\s*:\s*Metadata)?\s*=\s*(\{[^\n]+\})\s*$/m.test(text)){text=text.replace(/^export const metadata(?:\s*:\s*Metadata)?\s*=\s*(\{[^\n]+\})\s*$/m,(_,value)=>'export const metadata = pageMetadata('+value+')\n');if(!text.includes("import {pageMetadata}"))text="import {pageMetadata} from '@/lib/seo'\n"+text;text=text.replace("import type { Metadata } from 'next'\n",'');fs.writeFileSync(file,text)}}
