import content from './generated/content.json';

// Public embed identifiers only. GitHub authentication stays with Giscus.
export type GiscusConfig={repo:string;repoId:string;category:string;categoryId:string};
export function getGiscusConfig():GiscusConfig|null{
 const saved:Partial<GiscusConfig>=content.giscus;
 const config={repo:process.env.GISCUS_REPO||saved.repo,repoId:process.env.GISCUS_REPO_ID||saved.repoId,category:process.env.GISCUS_CATEGORY||saved.category,categoryId:process.env.GISCUS_CATEGORY_ID||saved.categoryId};
 if(!Object.values(config).every(value=>typeof value==='string'&&value.trim().length>0))return null;
 const result=Object.fromEntries(Object.entries(config).map(([key,value])=>[key,value!.trim()])) as GiscusConfig;
 if(!/^[\w.-]+\/[\w.-]+$/.test(result.repo)||!/[A-Za-z0-9]/.test(result.repoId)||!/[A-Za-z0-9]/.test(result.categoryId))return null;
 return result;
}
