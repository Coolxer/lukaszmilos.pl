import { readFileSync, writeFileSync } from 'node:fs';

const tab = (await (await fetch('http://127.0.0.1:9337/json')).json()).find(x => x.type === 'page');
const socket = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }));
let id = 0;
const tasks = new Map();
socket.addEventListener('message', ({ data }) => {
  const m = JSON.parse(data);
  const task = tasks.get(m.id);
  if (!task) return;
  tasks.delete(m.id);
  m.error ? task.reject(new Error(m.error.message)) : task.resolve(m.result);
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const key = ++id;
  tasks.set(key, { resolve, reject });
  socket.send(JSON.stringify({ id: key, method, params }));
});
const evaluate = async expression => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw Error(r.exceptionDetails.text);
  return r.result.value;
};
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const baseRoutes = [
  '/', '/oferta/', '/o-mnie/', '/kontakt/', '/oferta/cnc/', '/oferta/szlifiernie/',
  '/oferta/ogrodzenia/', '/oferta/mali-producenci/', '/oferta/modelarnie-druk-3d/',
  '/oferta/stolarnie/', '/oferta/firmy-techniczne/', '/oferta/inne/',
  '/oferta/strony-www/', '/oferta/systemy-i-automatyzacje/', '/oferta/system-obslugi-zapytan/',
  '/oferta/cnc/kalkulator/', '/oferta/szlifiernie/kalkulator/', '/oferta/ogrodzenia/kalkulator/',
  '/portfolio/', '/portfolio/automatyzacja-research-tematy-rolek/',
  '/blog/', '/blog/automatyzacja-planowanie-dat-make-com/', '/polityka-prywatnosci/'
];
const routes = [...new Set([...baseRoutes, ...JSON.parse(readFileSync('.tmp-all-routes.json', 'utf8'))])]
  .filter(route => !['/oferta/tworzenie-strony-www/', '/oferta/tworzenie-sklepu-www/'].includes(route));
if (process.argv[2]?.startsWith('/')) routes.splice(0, routes.length, process.argv[2]);
const widths = process.argv[2] === '768' ? [768] : [390,1280];

const scan = `(() => {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext('2d', {willReadFrequently:true});
  const parse = value => {
    ctx.clearRect(0,0,1,1);
    ctx.fillStyle = value;
    ctx.fillRect(0,0,1,1);
    return [...ctx.getImageData(0,0,1,1).data].map((n,i) => i === 3 ? n/255 : n);
  };
  const over = (top, bottom) => {
    const a = top[3] + bottom[3]*(1-top[3]);
    return [0,1,2].map(i => a ? (top[i]*top[3] + bottom[i]*bottom[3]*(1-top[3]))/a : 0).concat(a);
  };
  const lum = rgb => {
    const x = rgb.slice(0,3).map(v => {
      v /= 255;
      return v <= .04045 ? v / 12.92 : ((v + .055)/1.055)**2.4;
    });
    return .2126*x[0] + .7152*x[1] + .0722*x[2];
  };
  const ratio = (a,b) => (Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);
  const css = el => getComputedStyle(el);
  const paint = el => {
    const chain = [];
    for (let node=el; node && node.nodeType === 1; node=node.parentElement) chain.unshift(node);
    let bg = [255,255,255,1];
    const gradients = [];
    for (const node of chain) {
      const s = css(node);
      bg = over(parse(s.backgroundColor),bg);
      if (s.backgroundImage !== 'none') gradients.push(node.tagName.toLowerCase() + (node.className && typeof node.className === 'string' ? '.'+node.className.split(' ').slice(0,2).join('.') : ''));
    }
    return {bg, gradients};
  };
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const failures = [];
  let count=0;
  while (walker.nextNode()) {
    const node=walker.currentNode;
    const value=node.nodeValue.trim().replace(/\\s+/g,' ');
    if (!value || value.length < 2) continue;
    const el=node.parentElement;
    if (!el || /^(SCRIPT|STYLE|NOSCRIPT|OPTION)$/.test(el.tagName)) continue;
    const s=css(el), r=el.getBoundingClientRect();
    if (!r.width || !r.height || s.visibility === 'hidden' || s.display === 'none') continue;
    let hidden=false;
    for(let p=el.parentElement;p;p=p.parentElement){const ps=css(p);if(ps.display==='none'||ps.visibility==='hidden'){hidden=true;break}}
    if(hidden) continue;
    count++;
    const {bg,gradients}=paint(el);
    const fg=over(parse(s.color),bg);
    const cr=ratio(fg,bg);
    const font=parseFloat(s.fontSize), weight=parseInt(s.fontWeight,10)||400;
    const min=(font>=24 || (font>=18.66 && weight>=700))?3:4.5;
    if(cr<min-.08) {
      const cls=(typeof el.className==='string'?el.className:'').split(' ').filter(Boolean).slice(0,5).join(' ');
      failures.push({text:value.slice(0,75),tag:el.tagName.toLowerCase(),cls,ratio:+cr.toFixed(2),min,fg:s.color,bg:bg.map((n,i)=>i<3?Math.round(n):n),gradients:gradients.slice(-2),size:font,weight});
    }
  }
  return {count,failures};
})()`;

const results=[];
await send('Page.enable');
await send('Runtime.enable');
for (const width of widths) {
  await send('Emulation.setDeviceMetricsOverride', {width,height:900,deviceScaleFactor:1,mobile:width<600});
  for (const route of routes) {
    await send('Page.navigate', {url:'http://localhost:4321'+route});
    let loaded=false;
    for(let i=0;i<100;i++){
      await wait(100);
      loaded=await evaluate('document.readyState === "complete" && location.pathname === '+JSON.stringify(route));
      if(loaded)break;
    }
    if(!loaded)throw Error('Load timeout '+route);
    for (const theme of ['light','dark']) {
      await evaluate('document.documentElement.setAttribute("data-theme", '+JSON.stringify(theme)+')');
      await wait(400);
      const data=await evaluate(scan);
      results.push({width,route,theme,...data});
      if (data.failures.length || (theme === 'dark' && routes.indexOf(route) % 10 === 0)) console.log(width,theme,route,data.count,data.failures.length);
    }
  }
}
writeFileSync(widths.length === 1 ? '.tmp-contrast-audit-768.json' : '.tmp-contrast-audit.json',JSON.stringify(results,null,2));
socket.close();
