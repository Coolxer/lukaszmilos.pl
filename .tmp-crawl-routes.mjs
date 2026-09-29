import { writeFileSync } from 'node:fs';

const origin = 'http://localhost:4321';
const queue = ['/', '/oferta/', '/portfolio/', '/blog/', '/kontakt/', '/o-mnie/'];
const seen = new Set();
const errors = [];
for (let i=0;i<queue.length;i++) {
  const route=queue[i];
  if(seen.has(route))continue;
  seen.add(route);
  let response;
  try { response=await fetch(origin+route); }
  catch(e){ errors.push({route,error:String(e)}); continue; }
  if(!response.ok){ errors.push({route,status:response.status}); continue; }
  const html=await response.text();
  for(const match of html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/g)) {
    let url;
    try{url=new URL(match[1],origin+route)}catch{continue}
    if(url.origin!==origin)continue;
    let path=url.pathname;
    if(!path.endsWith('/') && !/\.[a-z0-9]+$/i.test(path))path+='/';
    if(/\.[a-z0-9]+$/i.test(path))continue;
    if(path.startsWith('/_'))continue;
    if(!seen.has(path)&&!queue.includes(path))queue.push(path);
  }
}
const routes=[...seen];
writeFileSync('.tmp-all-routes.json',JSON.stringify(routes,null,2));
console.log(JSON.stringify({count:routes.length,errors,routes},null,2));
