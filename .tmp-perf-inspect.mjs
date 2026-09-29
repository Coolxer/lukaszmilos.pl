import { readFileSync, statSync } from 'node:fs';
import sharp from 'sharp';

const html = readFileSync('dist/index.html', 'utf8');
const head = html.slice(0, html.indexOf('</head>') + 7);
console.log('Existing output head (built previously):');
for (const tag of head.match(/<(?:link|script|style)\b[^>]*>/g) ?? []) {
  if (/rel=(?:stylesheet|preload|modulepreload)|src=|<style/.test(tag)) console.log(tag.slice(0, 350));
}
console.log('Head bytes:', Buffer.byteLength(head));
console.log('Stylesheet links:', [...head.matchAll(/href="?([^" >]+\.css)[" >]/g)].map(m=>m[1]));
for (const name of ['lukasz-milos.webp','industry-cnc-v2.png','industry-technical-v1.png','industry-prototyping-v1.png','website-clarity-v1.png','process-flow-v1.png']) {
  const path='src/assets/images/pages/'+name;
  const metadata=await sharp(path).metadata();
  console.log(name,Math.round(statSync(path).size/1024)+'KiB',metadata.width+'x'+metadata.height,metadata.format);
}
const imgTags=[...html.matchAll(/<img\b[^>]*>/g)].map(m=>m[0]);
console.log('Homepage image tags:',imgTags.length);
for (const tag of imgTags.slice(0,6)) console.log(tag.slice(0,650));
