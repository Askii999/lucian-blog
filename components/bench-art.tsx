'use client';
import {useEffect,useRef} from 'react';
import {panelHeight,panelGeometry,PANEL_COUNT} from '@/lib/bench-panels';
import {useMotion} from './atmosphere';

// Independent geometry; motion model informed by Linear's public Benefits component.
export function BenchArt({kind}:{kind:string}) {
 const ref=useRef<SVGSVGElement>(null);
 const {enabled}=useMotion();
 useEffect(()=>{
  const svg=ref.current;if(!svg||!enabled)return;
  const groups=Array.from(svg.querySelectorAll<SVGGElement>('.wire-piece'));
  let mouseX=Infinity, selected=-1, raf=0,last=0,visible=false;
  const positions=groups.map(()=>0), velocities=groups.map(()=>0);
  const move=(e:PointerEvent)=>{if(e.pointerType==='touch')return;const b=svg.getBoundingClientRect();mouseX=(e.clientX-b.left)/b.width*320;selected=Math.max(0,Math.min(4,Math.floor((e.clientY-b.top)/b.height*5)));};
  const leave=()=>{mouseX=Infinity;selected=-1;};
  const draw=(time:number)=>{
   raf=requestAnimationFrame(draw);const dt=Math.min((time-last)/1000||.016,.025);last=time;
   groups.forEach((g,i)=>{
    let target=0;
    if(kind==='reading')target=selected<0?0:(i>=4-selected?(i-(4-selected)+1)*8:0);
    if(kind==='markdown')target=Number.isFinite(mouseX)?Math.max(0,1-Math.abs(mouseX-(75+i*52))/100)*12:0;
    const panelIndex=Number(g.dataset.panelIndex);
    if(kind==='palette'){
     const peak=Math.max(0,Math.min(PANEL_COUNT-1,Math.round((mouseX-94)/9)));
     target=Number.isFinite(mouseX)?panelHeight(panelIndex,peak)-panelHeight(panelIndex):0;
    }
    const stiffness=kind==='palette'?150:190;
    velocities[i]+=(stiffness*(target-positions[i])-18*velocities[i])*dt;
    positions[i]+=velocities[i]*dt;
    if(kind==='palette'){
     const geometry=panelGeometry(panelIndex,panelHeight(panelIndex)+positions[i]);
     g.children[0].setAttribute('d',geometry.face);g.children[1].setAttribute('d',geometry.edge);
    }else g.style.transform=`translateY(${-positions[i]}px)`;
   });
  };
  const sync=()=>{cancelAnimationFrame(raf);if(visible&&!document.hidden){last=performance.now();raf=requestAnimationFrame(draw);}};
  const observer=new IntersectionObserver(([e])=>{visible=e.isIntersecting;sync();});observer.observe(svg);
  svg.addEventListener('pointermove',move);svg.addEventListener('pointerleave',leave);document.addEventListener('visibilitychange',sync);
  return()=>{cancelAnimationFrame(raf);observer.disconnect();svg.removeEventListener('pointermove',move);svg.removeEventListener('pointerleave',leave);document.removeEventListener('visibilitychange',sync);groups.forEach(g=>{g.style.transform='';if(kind==='palette'){const geometry=panelGeometry(Number(g.dataset.panelIndex),panelHeight(Number(g.dataset.panelIndex)));g.children[0].setAttribute('d',geometry.face);g.children[1].setAttribute('d',geometry.edge);}});};
 },[kind,enabled]);
 const tile=(x:number,y:number,w:number,d:number,h:number,key:number)=>{
  const top=`M${x} ${y} l${w} ${-w*.5} l${d} ${d*.5} l${-w} ${w*.5} Z`;
  const sides=`M${x} ${y} v${h} l${d} ${d*.5} l${w} ${-w*.5} v${-h} l${-w} ${w*.5} Z`;
  return <g key={key} className="wire-piece" style={{'--piece':key} as React.CSSProperties}><path d={sides}/><path d={top}/><path className="wire-seam" d={`M${x+d} ${y+d*.5} v${h}`}/>{kind==='markdown'&&Array.from({length:12},(_,j)=><circle className="module-light" key={j} cx={x+w+(j%4-1.5)*3} cy={y-w*.5+8+Math.floor(j/4)*2} r=".6" style={{animationDelay:`${(j+key*3)*.13}s`}}/>)}</g>;
 };
 return <svg ref={ref} className={'wire-art wire-'+kind} viewBox="0 0 320 280" aria-hidden="true">
 {kind==='reading'&&Array.from({length:5},(_,i)=>tile(45,159-i*22,115,115,16,i))}
 {kind==='markdown'&&[[126,69,66,66,82],[54,112,66,66,66],[199,119,66,45,45],[126,176,66,66,40]].map(([x,y,w,d,h],i)=>tile(x-25,y,w,d,h,i))}
 {kind==='palette'&&Array.from({length:PANEL_COUNT},(_,i)=>PANEL_COUNT-1-i).map(i=>{const g=panelGeometry(i,panelHeight(i));return <g className="wire-piece" data-panel-index={i} key={i}><path d={g.face}/><path className="wire-seam" d={g.edge}/></g>;})}

 </svg>;
}
