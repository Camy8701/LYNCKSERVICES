import { useEffect, useState } from "react";
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
import AdSidebar from "@/components/ads/AdSidebar";
import AdCarousel from "@/components/ads/AdCarousel";
import { getActiveAds, type Ad } from "@/lib/ads";
import { SEO, OrganizationSchema, FAQSchema } from "@/lib/seo";

const Index = () => {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    async function loadAds() {
      try {
        const activeAds = await getActiveAds();
        setAds(activeAds);
      } catch (error) {
        console.error('Error loading ads:', error);
      }
    }
    loadAds();
  }, []);

  return (
    <>
      <SEO
        title="Handwerker finden in Hessen & NRW | Lynck Services - Kostenloser Angebotsvergleich"
        description="Finden Sie geprüfte Handwerker in Frankfurt, Köln, Düsseldorf & 17 weiteren Städten. Kostenloser Vergleich für Heizung, Solar, Dach, Klempner, Elektriker. Jetzt Angebot anfordern!"
        canonicalUrl="/"
        ogType="website"
      />
      <OrganizationSchema />
      <FAQSchema
        faqs={[
          {
            question: "In welchen Städten in Hessen bietet Lynck Services Handwerker an?",
            answer: "Wir vermitteln geprüfte Handwerker in 10 Städten in Hessen: Frankfurt am Main, Wiesbaden, Kassel, Darmstadt, Offenbach am Main, Hanau, Gießen, Marburg, Fulda und Rüsselsheim am Main."
          },
          {
            question: "Welche Städte in Nordrhein-Westfalen werden abgedeckt?",
            answer: "In NRW sind wir in 10 Städten vertreten: Köln, Düsseldorf, Dortmund, Essen, Duisburg, Bochum, Wuppertal, Bonn, Münster und Aachen."
          },
          {
            question: "Ist der Angebotsvergleich wirklich kostenlos?",
            answer: "Ja, unser Service ist 100% kostenlos. Sie erhalten bis zu 3 Angebote von geprüften Handwerkern ohne jegliche Kosten oder Verpflichtungen. Sie zahlen nur, wenn Sie sich für einen Handwerker entscheiden."
          },
          {
            question: "Wie schnell erhalte ich Angebote von Handwerkern?",
            answer: "Sie erhalten Angebote, sobald Ihre Anfrage eingegangen ist. Unsere geprüften Fachleute antworten schnell und zuverlässig, oft innerhalb weniger Stunden."
          },
          {
            question: "Welche Handwerker-Dienstleistungen werden angeboten?",
            answer: "Wir vermitteln Fachleute für Heizung & HVAC, Solar & Photovoltaik, Dachdecker, Klempner & Sanitär, Elektriker und allgemeine Renovierungsarbeiten in Hessen und Nordrhein-Westfalen."
          },
          {
            question: "Sind alle Handwerker geprüft?",
            answer: "Ja, alle Handwerker in unserem Netzwerk werden von uns geprüft. Wir kontrollieren Erfahrung, Zertifikate und Versicherung, bevor wir sie in unser Netzwerk aufnehmen."
          }
        ]}
      />
      <div className="flex min-h-screen bg-background">
        {/* Desktop Ad Sidebar - Always visible */}
        <AdSidebar ads={ads} />

        <main className="flex-1 overflow-y-auto lg:ml-[280px]">
          {/* Mobile Ad Carousel - Always visible with empty slots */}
          <AdCarousel ads={ads} />

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
