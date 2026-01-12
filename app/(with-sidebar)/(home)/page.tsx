import BottomSection from '@/components/home/BottomSection';
import GraphSection from '@/components/home/GraphSection';
import HeaderSection from '@/components/home/HeaderSection';
import ProfileSection from '@/components/home/ProfileSection';
import ButtonSection from '@/components/home/ButtonSection';

const Page = () => {
  return (
    <div className="bg-background flex min-h-screen flex-col gap-6 font-sans md:p-[137px]">
      {/* 1. Header */}
      <HeaderSection />

      {/* 2-1. ProfileSection */}
      <ProfileSection className="grid grid-cols-1 gap-6 md:grid-cols-3" />

      {/* 2-2. GraphSection */}
      <GraphSection></GraphSection>

      {/* 2-3. BottomSection */}
      <BottomSection className="grid grid-cols-1 gap-6 md:grid-cols-2" />

      {/* 3. ButtonSection */}
      {/* 버튼 두개 만드쇼 */}
      <ButtonSection />
    </div>
  );
};

export default Page;
