export const PANEL_COUNT=15;
export function panelHeight(index:number, peak:number | null=null) {
 if(peak===null)return 28;
 const distance=Math.abs(index-peak);
 return Math.max(14,132-Math.min(distance,3)*28-Math.max(0,distance-3)*7);
}
export function panelGeometry(index:number,height:number) {
 const h=Math.max(12,Math.min(144,height));
 const x=28+index*9, y=204-index*4.5, width=132, slope=66, thickness=3;
 return {face:`M${x} ${y} L${x} ${y-h} L${x+width} ${y-h+slope} L${x+width} ${y+slope} Z`,
 edge:`M${x} ${y-h} l${thickness} ${-thickness*.5} l${width} ${slope} v${h} l${-thickness} ${thickness*.5} M${x+width} ${y-h+slope} l${thickness} ${-thickness*.5}`};
}
