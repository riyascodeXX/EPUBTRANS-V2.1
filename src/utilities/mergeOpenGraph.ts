import type { Metadata } from 'next'
const defaultOpenGraph:Metadata['openGraph']={type:'website',siteName:'EPUBTRANS',title:'EPUBTRANS',description:'Publishing, translation, localization, multimedia and accessibility services.'}
export const mergeOpenGraph=(og?:Metadata['openGraph']):Metadata['openGraph']=>({...defaultOpenGraph,...og})
