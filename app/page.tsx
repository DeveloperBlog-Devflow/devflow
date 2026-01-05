import { LandingHeader } from '@/components/landing/LandingHeader';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeatureList } from '@/components/landing/FeatureList';
import { LandingPreview } from '@/components/landing/LandingPreview';
export default function Home() {
  return (
    <div className="bg-background h-full space-y-60">
      <LandingHeader />
      <HeroSection />
      <FeatureList />
      <LandingPreview />
    </div>
  );
}
