const header=document.getElementById("header");
const nav=document.getElementById("nav");
const menuBtn=document.getElementById("menuBtn");
window.addEventListener("scroll",()=>header.classList.toggle("scrolled",window.scrollY>40));
menuBtn.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach((el,i)=>{el.style.transitionDelay=(i%4)*70+"ms";observer.observe(el)});

const filters=document.querySelectorAll(".filter");
const items=document.querySelectorAll(".gallery-item");
filters.forEach(btn=>btn.addEventListener("click",()=>{
  filters.forEach(b=>b.classList.remove("active"));btn.classList.add("active");
  const f=btn.dataset.filter;
  items.forEach(item=>{
    const show=f==="all"||item.dataset.cat===f;
    item.style.display=show?"block":"none";
  });
}));

const wrap=document.getElementById("baWrap"), before=document.getElementById("baBefore"), handle=document.getElementById("baHandle");
function moveBA(x){
  const r=wrap.getBoundingClientRect();
  let p=((x-r.left)/r.width)*100;p=Math.max(2,Math.min(98,p));
  before.style.width=p+"%";handle.style.left=p+"%";
}
let dragging=false;
wrap.addEventListener("pointerdown",e=>{dragging=true;wrap.setPointerCapture(e.pointerId);moveBA(e.clientX)});
wrap.addEventListener("pointermove",e=>{if(dragging)moveBA(e.clientX)});
wrap.addEventListener("pointerup",()=>dragging=false);
wrap.addEventListener("pointercancel",()=>dragging=false);

document.querySelector(".cursor-glow")?.addEventListener("pointermove",e=>{});
window.addEventListener("pointermove",e=>{
 const g=document.querySelector(".cursor-glow"); if(g){g.style.left=e.clientX+"px";g.style.top=e.clientY+"px";}
});
