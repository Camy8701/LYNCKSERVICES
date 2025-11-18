import Sidebar from "@/components/Sidebar";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SecurityBadges from "@/components/SecurityBadges";
import TrustBadges from "@/components/TrustBadges";
import FeaturesSection from "@/components/FeaturesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import PortfolioGrid from "@/components/PortfolioGrid";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Navigation />
        <HeroSection />
        <SecurityBadges />
        <TrustBadges />
        <FeaturesSection />
        <WhyChooseUs />
        <PortfolioGrid />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
