function i(n){requestAnimationFrame(()=>{n.style.transition="none",n.style.color="rgba(255,62,0,1)",n.style.backgroundColor="rgba(255,62,0,0.2)",setTimeout(()=>{n.style.transition="color 1s, background 1s",n.style.color="",n.style.backgroundColor=""})})}function e(n,t=0,a=1/0){const o=r=>{const s=parseFloat(n.value);t<s&&s<a?n.classList.remove("invalid"):n.classList.add("invalid")};return document.addEventListener("input",o),{destroy:()=>{document.removeEventListener("input",o)}}}export{e as c,i as f};
