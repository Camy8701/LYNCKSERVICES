import { ReactNode, useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AdCarousel from "@/components/ads/AdCarousel";
import AdSidebar from "@/components/ads/AdSidebar";
import { getActiveAds, type Ad } from "@/lib/ads";

interface PageLayoutProps {
  children: ReactNode;
  hideAds?: boolean;
}

const PageLayout = ({ children, hideAds = false }: PageLayoutProps) => {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    if (hideAds) return;

    async function loadAds() {
      try {
        const activeAds = await getActiveAds();
        setAds(activeAds);
      } catch (error) {
        console.error('Error loading ads:', error);
      }
    }

    loadAds();
  }, [hideAds]);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Ad Sidebar - Always visible */}
      {!hideAds && <AdSidebar ads={ads} />}

      <main className={`flex-1 overflow-y-auto ${!hideAds ? 'lg:ml-[280px]' : ''}`}>
        {/* Mobile Ad Carousel */}
        {ads.length > 0 && !hideAds && <AdCarousel ads={ads} />}

        <Navigation />
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default PageLayout;
