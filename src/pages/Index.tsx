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
import { SEO, OrganizationSchema } from "@/lib/seo";

const Index = () => {
  return (
    <>
      <SEO
        title="Lynck Services - Geprüfte Handwerker finden"
        description="Vergleichen Sie kostenlos Angebote von geprüften Handwerkern in Deutschland. Heizung, Solar, Dach, Klempner, Elektriker und mehr."
        canonicalUrl="/"
        ogType="website"
      />
      <OrganizationSchema />
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
    </>
  );
};

export default Index;
