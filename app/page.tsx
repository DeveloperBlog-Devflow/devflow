import { Header } from '@/components/landing/LandingHeader';
import { Hero } from '@/components/landing/HeroSection';
import { Feature } from '@/components/landing/FeatureSection';
import { Demo } from '@/components/landing/DemoPreview';
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
