import { Header } from '@/components/landing/LandingHeader';
import { Hero } from '@/components/landing/LandingHeroSection';
import { Feature } from '@/components/landing/LandingFeature';
import { Demo } from '@/components/landing/LandingPreview';
export default function Home() {
  return (
    <div className="bg-background h-full space-y-60">
      <Header />
      <Hero />
      <Feature />
      <Demo />
    </div>
  );
}
