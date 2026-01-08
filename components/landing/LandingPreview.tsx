import Image from 'next/image';
import FeatureContent from '@/components/landing/FeatureContent';

const LandingPreview = () => {
  return (
    <div className="mt-30 flex h-full flex-col items-center justify-center space-y-3 pb-50 text-center">
      <p className="bg-surface-alt rounded-mg mt-16 rounded-lg p-1 px-4 text-xs">
        🤔 왜 DevFlow를 사용할까요?
      </p>
      <h1 className="text-4xl font-bold">체계적인 학습으로</h1>
      <h1 className="text-primary text-4xl font-bold">더 빠른 성장</h1>
      <div className="mt-10 flex gap-50">
        <FeatureContent />
        <Image
          src="/PreviewImage.png"
          alt="DevFlow 미리보기"
          className="w-full object-cover"
          width={430}
          height={232}
        />
      </div>
    </div>
  );
};

export default LandingPreview;
