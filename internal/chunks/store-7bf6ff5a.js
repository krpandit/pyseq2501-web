var D=Object.defineProperty,T=Object.defineProperties;var v=Object.getOwnPropertyDescriptors;var h=Object.getOwnPropertySymbols;var z=Object.prototype.hasOwnProperty,N=Object.prototype.propertyIsEnumerable;var w=(t,s,n)=>s in t?D(t,s,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[s]=n,r=(t,s)=>{for(var n in s||(s={}))z.call(s,n)&&w(t,n,s[n]);if(h)for(var n of h(s))N.call(s,n)&&w(t,n,s[n]);return t},_=(t,s)=>T(t,v(s));import{D as O}from"./vendor-298196a7.js";const b={pump:{reagent:"",volume:0,op:"pump"},prime:{reagent:"",volume:0,op:"prime"},temp:{temp:25,wait:!0,op:"temp"},hold:{time:0,op:"hold"},takeimage:{name:"Test",path:".",xy0:[0,0],xy1:[1,1],channels:[!0,!0,!0,!0],z_tilt:19850,z_obj:32e3,lasers:[0,0],laser_onoff:[!0,!0],od:[0,0],overlap:.1,op:"takeimage"},autofocus:{channels:[!0,!0,!0,!0],laser_onoff:!0,laser:5,od:0,op:"autofocus"},goto:{step:1,n:4,op:"goto"}},J={name:"",port:1,v_pull:100,v_prime:200,v_push:2e3,wait:26},S={name:"",flowcell:0,reagents:[{uid:0,reagent:r({},J)}],cmds:[{uid:0,cmd:r({},b.pump)}]},p=[2e3,5e3,1e4,3e4,6e4];function f(t,s=void 0,n=o=>o,k=!0){let o,i,u,l=0;const c=new Set;function x(){const e=l;return l++,p[e>=p.length-1?p.length-1:e]}function d(){u&&clearTimeout(u),o&&(o.close(),o=void 0)}function y(){d(),c.size>0&&(u=setTimeout(()=>m(),x()))}async function m(){return u&&(clearTimeout(u),u=void 0),i||(o=new WebSocket(t),o.onmessage=e=>{console.log(e.data),c.forEach(a=>{a(n(e.data))})},o.onclose=e=>y(),i=new Promise((e,a)=>{o&&(o.onerror=g=>{console.error("Websocket error"),a(g),i=void 0},o.onopen=g=>{l=0,e(!0),i=void 0})}),i)}return{set(e){if(console.log(e),o){const a=typeof e=="object"?()=>o.send(JSON.stringify(e)):()=>o.send(e);o.readyState!==WebSocket.OPEN?m().then(a):a()}k&&c.forEach(a=>{a(e)})},update(e){},subscribe(e){return m(),e(s),c.add(e),()=>{c.delete(e),c.size===0&&d()}}}}const j={n:0,img:[""],hist:[{counts:[10],bin_edges:[0]}],channels:[!1,!1,!1,!1]},E={x:-1,y:-1,z_tilt:[-1,-1,-1],z_obj:-1,od:[0,0],laser_onoff:[!0,!0],lasers:[-1,-1],shutter:!1,msg:""},P={block:"",max_uid:2,mode:"editingA",exps:[r({},S),r({},S)],image_params:_(r({},b.takeimage),{fc:0,n:1})},A=O(r({},j)),C=f(`ws://${window.location.hostname}:8000/status`,r({},E),t=>JSON.parse(JSON.parse(t))),H=f(`ws://${window.location.hostname}:8000/user`,r({},P),t=>JSON.parse(JSON.parse(t))),q=f(`ws://${window.location.hostname}:8000/cmd`,"",t=>t,!1);export{b as a,q as c,A as i,J as r,C as s,H as u};
