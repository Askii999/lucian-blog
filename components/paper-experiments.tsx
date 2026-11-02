'use client';
import {useLanguage} from './language';
import {BenchArt} from './bench-art';
export function PaperExperiments(){
 const {language}=useLanguage(),en=language==='en';
 const titles=en?['Stacked panels','Modules','Elastic staircase']:language==='zh-Hant'?['疊層積木','模組積木','彈性階梯']:['叠层积木','模块积木','弹性阶梯'];
 const hints=en?['Hover or tap to feel the layers respond','A small study in grids and arrangement','Transitions with a little spring and damping']:language==='zh-Hant'?['懸停或輕觸查看層疊回饋','網格與排列小實驗','動態過渡與阻尼感']:['悬停或轻触查看层叠反馈','网格与排列小实验','动态过渡与阻尼感'];
 return <section className="explore-experiments" id="experiments" aria-labelledby="experiments-heading"><h2 id="experiments-heading">{en?'Experiments':'小实验'}</h2><div className="experiment-sculptures">{(['reading','markdown','palette'] as const).map((kind,index)=><figure className="experiment-sculpture stock" key={kind} aria-label={titles[index]}><span className="experiment-block-art"><BenchArt kind={kind}/></span><figcaption><span>{titles[index]}</span><span>{hints[index]}</span></figcaption></figure>)}</div></section>;
}
