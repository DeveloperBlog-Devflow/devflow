import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 쿠키에서 isLoggedIn 확인
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true';

  if (pathname === '/') {
    // 로그인이 안 된 경우에만 랜딩으로 보냄
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/landing', request.url));
    }
    // 로그인 된 상태라면 그대로 루트('/')를 보여줌
    return NextResponse.next();
  }

  if (pathname === '/landing' && isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/landing'],
};
