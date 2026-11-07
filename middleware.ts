import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export function middleware(request:NextRequest){
 if(request.nextUrl.hostname==='www.lucian.me.uk'){
  const url=request.nextUrl.clone();url.hostname='lucian.me.uk';url.protocol='https:';
  return NextResponse.redirect(url,308);
 }
 return NextResponse.next();
}
