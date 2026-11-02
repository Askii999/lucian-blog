import { getSiteCopy } from '@/lib/content';
export const dynamic = 'force-dynamic';
export function GET() {
  return Response.json(getSiteCopy(), { headers: { 'Cache-Control': 'no-store' } });
}
