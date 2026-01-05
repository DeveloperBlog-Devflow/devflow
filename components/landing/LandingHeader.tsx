export function Header() {
  return (
    <div className="flex items-center justify-between bg-white">
      <h1 className="flex items-center gap-2 px-5 py-2 text-3xl font-bold">
        <span className="text-primary">&lt;/&gt;</span>
        <span>DevFlow</span>
      </h1>
      <div className="space-x-1 mr-1">
        <button className="border-border rounded-lg border p-1 px-4">
          로그인
        </button>
        <button className="bg-primary cursor-pointer rounded-lg p-1 px-2 text-white">
          시작하기
        </button>
      </div>
    </div>
  );
}
