import Image from 'next/image';
import FeatureContent from '@/components/landing/FeatureContent';

const LandingPreview = () => {
  return (
    <div className="mt-30 flex h-full flex-col items-center justify-center space-y-3 pb-50 text-center">
      <h1 className="text-4xl font-bold">체계적인 학습으로</h1>
      <h1 className="text-primary text-4xl font-bold">더 빠른 성장</h1>
      <div className="mx-20 mt-10 grid max-w-7xl grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-2">
        {/* 왼쪽: 400 밑으로 못 내려가게 */}
        <div className="flex min-w-[355px] justify-center">
          <FeatureContent />
        </div>

        {/* 오른쪽: 이미지 그대로 */}
        <div className="flex justify-center">
          <Image
            src="/PreviewImage.png"
            alt="DevFlow 미리보기"
            width={720}
            height={400}
            className="w-full max-w-[480px] min-w-[360px] object-contain md:max-w-[560px] lg:max-w-[640px] xl:max-w-[720px]"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPreview;
