import Sidebar from "@/components/Sidebar";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PortfolioGrid from "@/components/PortfolioGrid";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Navigation />
        <HeroSection />
        <FeaturesSection />
        <PortfolioGrid />
        <TestimonialsSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
