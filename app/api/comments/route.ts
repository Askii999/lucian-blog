export function GET(){return Response.json([]);}
export function POST(){return Response.json({error:'请通过评论区登录 GitHub 后发言。',provider:'giscus'},{status:410});}
