export function Hero() {
  return (
    <div className="pt-30 flex flex-col items-center justify-center space-y-3 text-center">
      <p className="bg-surface-alt rounded-mg mt-16 rounded-lg p-1 px-4 text-xs">
        🚀 개발자를 위한 성장 플랫폼
      </p>
      <h1 className="text-8xl font-bold">매일 성장하는</h1>
      <h1 className="text-primary text-8xl font-bold">개발자의 여정</h1>
      <div className="text-2xl font-light">
        <h2>TIL 작성부터 목표 관리까지, DevFlow와 함께</h2>
        <h2>체계적인 학습으로 더 나은 개발자로 성장하세요</h2>
      </div>
    </div>
  );
}
