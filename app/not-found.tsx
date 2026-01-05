import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="bg-background flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="text-7xl font-extrabold text-gray-900">404</h1>
      <p className="mt-4 text-lg text-gray-600">페이지를 찾을 수 없습니다.</p>

      <Link
        href="/"
        className="text-text-invert mt-8 inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-sm font-medium transition hover:bg-gray-800"
      >
        홈으로 돌아가기
      </Link>
    </main>
  );
}
