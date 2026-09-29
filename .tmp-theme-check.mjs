import {writeFileSync} from 'node:fs';
const tab=(await(await fetch('http://127.0.0.1:9337/json')).json()).find(x=>x.type==='page');
const ws=new WebSocket(tab.webSocketDebuggerUrl);
await new Promise(r=>ws.addEventListener('open',r,{once:true}));
let id=0;const m=new Map();ws.addEventListener('message',({data})=>{const x=JSON.parse(data),t=m.get(x.id);if(t){m.delete(x.id);t(x.result)}});
const send=(method,params={})=>new Promise(r=>{const key=++id;m.set(key,r);ws.send(JSON.stringify({id:key,method,params}))});
const evalJs=async expression=>(await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true})).result.value;
await send('Page.enable');await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride',{width:390,height:900,deviceScaleFactor:1,mobile:true});
await send('Page.navigate',{url:'http://localhost:4321/'});
for(let i=0;i<100;i++){await new Promise(r=>setTimeout(r,100));if(await evalJs('document.readyState==="complete"&&location.pathname==="/"'))break}
await evalJs('document.documentElement.setAttribute("data-theme","dark");document.querySelector("astro-dev-toolbar")?.remove()');
await new Promise(r=>setTimeout(r,300));
const data=await evalJs(`(() => {const root=getComputedStyle(document.documentElement),a=getComputedStyle(document.querySelector('header .btn-primary')),b=getComputedStyle(document.querySelector('header nav a'));return {theme:document.documentElement.getAttribute('data-theme'),root:{primary:root.getPropertyValue('--color-primary'),primaryContent:root.getPropertyValue('--color-primary-content'),baseContent:root.getPropertyValue('--color-base-content'),base100:root.getPropertyValue('--color-base-100')},button:{color:a.color,bg:a.backgroundColor,btnfg:a.getPropertyValue('--btn-fg'),btnbg:a.getPropertyValue('--btn-bg')},nav:{color:b.color,bg:b.backgroundColor}}})()`);
console.log(JSON.stringify(data,null,2));
const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
writeFileSync('.tmp-dark-home.png',Buffer.from(shot.data,'base64'));
ws.close();
