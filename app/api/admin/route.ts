const closed=()=>Response.json({error:'Content is managed in Git.'},{status:410});
export const GET=closed;
export const POST=closed;
