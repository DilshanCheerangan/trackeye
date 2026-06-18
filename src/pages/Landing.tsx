import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import TrustSection from '../components/landing/TrustSection';
import PlatformOverview from '../components/landing/PlatformOverview';
import IslandSection from '../components/landing/IslandSection';
import AnalyticsShowcase from '../components/landing/AnalyticsShowcase';
import AthleteSection from '../components/landing/AthleteSection';
import Footer from '../components/landing/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen bg-track-foam overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <TrustSection />
      <PlatformOverview />
      <IslandSection />
      <AnalyticsShowcase />
      <AthleteSection />
      <Footer />
    </div>
  );
}
