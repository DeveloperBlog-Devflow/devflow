import Image from 'next/image';
import FeatureContent from '@/components/landing/FeatureContent';

const LandingPreview = () => {
  return (
    <div className="mt-30 flex h-full flex-col items-center justify-center space-y-3 pb-50 text-center">
      <h1 className="text-4xl font-bold">체계적인 학습으로</h1>
      <h1 className="text-primary text-4xl font-bold">더 빠른 성장</h1>
      <div className="mx-20 mt-10 flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-50">
        <FeatureContent />
        <Image
          src="/PreviewImage.png"
          alt="DevFlow 미리보기"
          width={720}
          height={400}
          className="w-full max-w-[480px] min-w-[360px] flex-shrink-0 object-contain md:max-w-[560px] lg:max-w-[640px] xl:max-w-[720px]"
        />
      </div>
    </div>
  );
};

export default LandingPreview;
