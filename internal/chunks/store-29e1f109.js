var O=Object.defineProperty,D=Object.defineProperties;var T=Object.getOwnPropertyDescriptors;var h=Object.getOwnPropertySymbols;var v=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable;var S=(t,s,n)=>s in t?O(t,s,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[s]=n,r=(t,s)=>{for(var n in s||(s={}))v.call(s,n)&&S(t,n,s[n]);if(h)for(var n of h(s))x.call(s,n)&&S(t,n,s[n]);return t},_=(t,s)=>D(t,T(s));import{D as y}from"./vendor-720ad347.js";const b={pump:{reagent:"",volume:0,op:"pump"},prime:{reagent:"",volume:0,op:"prime"},temp:{temp:25,wait:!0,op:"temp"},hold:{time:0,op:"hold"},takeimage:{name:"Test",path:".",xy0:[0,0],xy1:[1,1],channels:[!0,!0,!0,!0],z_tilt:19850,z_obj:32e3,save:!1,lasers:[0,0],laser_onoff:[!0,!0],od:[0,0],overlap:.1,op:"takeimage",z_from:0,z_to:0,z_spacing:232},autofocus:{channels:[!0,!0,!0,!0],laser_onoff:!0,laser:5,od:0,op:"autofocus"},goto:{step:1,n:4,op:"goto"}},W={name:"",port:1,v_pull:100,v_prime:200,v_push:2e3,wait:26},w={name:"",flowcell:0,reagents:[{uid:0,reagent:r({},W)}],cmds:[{uid:0,cmd:r({},b.pump)}]},f=[2e3,5e3,1e4,3e4,6e4];function p(t,s,n=o=>o,k=!0){let o,i,c,m=0;const u=new Set;function N(){const e=m;return m++,f[e>=f.length-1?f.length-1:e]}function d(){c&&clearTimeout(c),o&&(o.close(),o=void 0)}function z(){d(),u.size>0&&(c=setTimeout(()=>l(),N()))}async function l(){return c&&(clearTimeout(c),c=void 0),i||(o===void 0&&(o=new WebSocket(t)),o.onmessage=e=>{console.log(e.data),u.forEach(a=>{a(n(e.data))})},o.onclose=e=>z(),i=new Promise((e,a)=>{o&&(o.onerror=g=>{console.error("Websocket error"),a(g),i=void 0},o.onopen=g=>{m=0,e(!0),i=void 0})}),i)}return{set(e){if(console.log(e),o){const a=typeof e=="object"?()=>o.send(JSON.stringify(e)):()=>o.send(e);switch(o.readyState){case WebSocket.CLOSED|WebSocket.CLOSING:{l().then(a);break}case WebSocket.CONNECTING:{l().then(a);break}case WebSocket.OPEN:{a();break}}}k&&u.forEach(a=>{a(e)})},update(e){},subscribe(e){return l(),e(s),u.add(e),()=>{u.delete(e),u.size===0&&d()}}}}const C={n:0,img:[""],hist:[{counts:[10],bin_edges:[0]}],channels:[!1,!1,!1,!1]},E={x:-1,y:-1,z_tilt:[-1,-1,-1],z_obj:-1,od:[0,0],laser_onoff:[!0,!0],lasers:[-1,-1],shutter:!1,msg:""},J={block:"",max_uid:2,mode:"editingA",exps:[r({},w),r({},w)],image_params:_(r({},b.takeimage),{fc:!1,n:1})},$=y(r({},C)),G=p(`ws://${window.location.hostname}:8000/status`,r({},E),t=>JSON.parse(JSON.parse(t))),I=p(`ws://${window.location.hostname}:8000/user`,r({},J),t=>JSON.parse(JSON.parse(t))),L=p(`ws://${window.location.hostname}:8000/cmd`,"ok",t=>t,!1);export{b as a,L as c,$ as i,W as r,G as s,I as u};
