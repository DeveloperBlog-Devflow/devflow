import Link from 'next/link';

export function LandingHeader() {
  return (
    <div className="fixed flex w-full items-center justify-between bg-white">
      <h1 className="flex items-center gap-2 px-10 py-2 text-3xl font-bold">
        <span className="text-primary">&lt;/&gt;</span>
        <span>DevFlow</span>
      </h1>
      <div className="my-3 mr-1 space-x-3 pr-10">
        <Link
          className="border-border bg-primary rounded-lg border p-2 px-4 text-white"
          href="/login"
        >
          시작하기
        </Link>
      </div>
    </div>
  );
}
