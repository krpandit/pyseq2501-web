import{S as C,i as L,s as F,e as i,t as E,j as J,c,a as d,g as S,d as n,l as K,b as s,f as H,F as l,J as y,K as g}from"./vendor-88195046.js";function B(h){let e,t,a,o,u,r,_,b,z,f,v,m,P,A;return{c(){e=i("div"),t=i("div"),a=i("span"),o=i("div"),u=i("span"),r=E("PySeq"),_=i("span"),b=E("\xA02501"),z=J(),f=i("a"),v=i("div"),m=i("span"),P=E("version"),A=E("\xA00.0.1"),this.h()},l(x){e=c(x,"DIV",{class:!0});var p=d(e);t=c(p,"DIV",{class:!0});var V=d(t);a=c(V,"SPAN",{"aria-label":!0,class:!0});var q=d(a);o=c(q,"DIV",{class:!0});var D=d(o);u=c(D,"SPAN",{class:!0});var N=d(u);r=S(N,"PySeq"),N.forEach(n),_=c(D,"SPAN",{class:!0});var j=d(_);b=S(j,"\xA02501"),j.forEach(n),D.forEach(n),q.forEach(n),V.forEach(n),z=K(p),f=c(p,"A",{href:!0,target:!0,rel:!0,class:!0});var w=d(f);v=c(w,"DIV",{"data-tip":!0,class:!0});var I=d(v);m=c(I,"SPAN",{class:!0});var k=d(m);P=S(k,"version"),k.forEach(n),A=S(I,"\xA00.0.1"),I.forEach(n),w.forEach(n),p.forEach(n),this.h()},h(){s(u,"class","normal-case font-light"),s(_,"class","grad font-medium svelte-11n8j87"),s(o,"class","inline-block text-3xl"),s(a,"aria-label","Homepage"),s(a,"class","px-2 flex-0 md:px-4 "),s(t,"class","flex items-center flex-none"),s(m,"class","hidden lg:inline"),s(v,"data-tip","Changelog"),s(v,"class","tooltip tooltip-bottom"),s(f,"href","https://github.com/chaichontat/pyseq2501/"),s(f,"target","_blank"),s(f,"rel","nofollow"),s(f,"class","font-mono text-xs opacity-50"),s(e,"class","mx-auto space-x-1 navbar max-w-none")},m(x,p){H(x,e,p),l(e,t),l(t,a),l(a,o),l(o,u),l(u,r),l(o,_),l(_,b),l(e,z),l(e,f),l(f,v),l(v,m),l(m,P),l(v,A)},p:y,i:y,o:y,d(x){x&&n(e)}}}class Q extends C{constructor(e){super();L(this,e,null,B,F,{})}}function G(h){let e;return{c(){e=i("div"),this.h()},l(t){e=c(t,"DIV",{class:!0,style:!0}),d(e).forEach(n),this.h()},h(){s(e,"class","circle transition-all svelte-ocwmti"),g(e,"--size",h[0]),g(e,"--color",h[1]),g(e,"--duration",h[2])},m(t,a){H(t,e,a)},p(t,[a]){a&1&&g(e,"--size",t[0]),a&2&&g(e,"--color",t[1]),a&4&&g(e,"--duration",t[2])},i:y,o:y,d(t){t&&n(e)}}}function M(h,e,t){let{size:a="1rem"}=e,{color:o="blue"}=e,{duration:u="1s"}=e;return h.$$set=r=>{"size"in r&&t(0,a=r.size),"color"in r&&t(1,o=r.color),"duration"in r&&t(2,u=r.duration)},[a,o,u]}class R extends C{constructor(e){super();L(this,e,M,G,F,{size:0,color:1,duration:2})}}export{Q as L,R as S};