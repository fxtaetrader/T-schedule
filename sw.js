const V='tschedule-v1',FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>{const net=fetch(e.request).then(r=>{if(r&&r.ok&&new URL(e.request.url).origin===location.origin){const cp=r.clone();caches.open(V).then(c=>c.put(e.request,cp))}return r}).catch(()=>hit||caches.match('./index.html'));return hit||net}))});
self.addEventListener('notificationclick',e=>{e.notification.close();const a=e.action||'open',id=(e.notification.data||{}).id||'';
e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{if(l.length){l[0].postMessage({act:a,id});return l[0].focus()}return clients.openWindow('./index.html?act='+a+'&id='+id)}))});
