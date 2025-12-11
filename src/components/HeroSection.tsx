import { ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { servicesData } from "@/data/servicesData";
import { getIconComponent } from "@/lib/serviceIcons";

const HeroSection = () => {
  const { t, language } = useLanguage();

  return (
    <section 
      className="overflow-hidden glass-card rounded-3xl mb-20 mx-4 md:mx-6 lg:mx-8 relative"
      style={{
        backgroundImage: `url("/hero-house.png")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Panel */}
        <div className="relative md:p-10 lg:p-14 pt-6 pr-6 pb-6 pl-6 overflow-hidden">
          <div className="mt-10 md:mt-14 relative z-10 max-w-2xl">
            {/* Glassmorphism container for hero text */}
            <div className="bg-white/[0.12] backdrop-blur-md border border-white/[0.25] rounded-3xl p-5 md:p-6 mb-6">
              <h1 className="mt-0 text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground font-serif font-normal">
                {t("Finden Sie geprüfte", "Find Trusted")}
              </h1>
              <h2 className="mt-2 text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground font-serif font-normal">
                {t("Handwerker", "Home Services")}
              </h2>
              <h2 className="mt-2 text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground font-serif font-normal">
                {t("in Ihrer Nähe", "in Your Area")}
              </h2>

              <div className="mt-5 flex items-center gap-3">
                <span className="text-sm text-foreground">
                  {t(
                    "Kostenlos Angebote vergleichen • Geprüfte Fachleute • Schnelle Antwort",
                    "Compare quotes for free • Verified professionals • Fast response"
                  )}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="/services/renovierung"
                onClick={() => {
                  // GTM Event Tracking
                  if (typeof window !== 'undefined' && (window as any).dataLayer) {
                    (window as any).dataLayer.push({
                      event: 'cta_click',
                      cta_location: 'hero_section',
                      cta_text: language === 'de' ? 'Jetzt Angebot anfordern' : 'Request Quote Now',
                      destination: 'service_request_form'
                    });
                  }
                }}
                className="relative inline-flex items-center justify-center overflow-hidden group text-white tracking-tighter bg-gray-800 rounded-3xl pt-2.5 pr-4 pb-2.5 pl-4 hover:scale-105 transition-transform duration-300 animate-pulse-glow"
              >
                <span className="absolute transition-all duration-500 ease-out group-hover:w-56 group-hover:h-56 bg-teal-600 w-0 h-0 rounded-full"></span>
                <span className="relative text-base font-semibold">
                  {t("Jetzt Angebot anfordern", "Request Quote Now")}
                </span>
                <ArrowRight className="h-4 w-4 relative ml-3" />
              </a>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/[0.15] backdrop-blur-md border border-white/[0.2] rounded-2xl p-4 flex items-start gap-4">
                <div className="text-primary mt-1">
                  <Check className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-base font-medium tracking-tight text-white">
                    {t("100% Kostenlos", "100% Free")}
                  </p>
                  <p className="mt-1 text-sm text-gray-300">
                    {t(
                      "Keine versteckten Kosten. Sie zahlen nur, wenn Sie einen Handwerker beauftragen.",
                      "No hidden costs. You only pay when you hire a contractor."
                    )}
                  </p>
                </div>
              </div>
              <div className="bg-white/[0.15] backdrop-blur-md border border-white/[0.2] rounded-2xl p-4 flex items-start gap-4">
                <div className="text-primary mt-1">
                  <Check className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-base font-medium tracking-tight text-white">
                    {t("Geprüfte Fachleute", "Verified Professionals")}
                  </p>
                  <p className="mt-1 text-sm text-gray-300">
                    {t(
                      "Alle Handwerker sind verifiziert und haben nachgewiesene Erfahrung.",
                      "All contractors are verified and have proven experience."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Service Category Grid */}
        <div className="relative md:p-10 lg:p-14 pt-8 pr-8 pb-8 pl-8 flex items-center justify-center">
          {/* Service Cards Grid - 3x3 for 9 services */}
          <div className="grid grid-cols-3 gap-2 md:gap-3 w-full max-w-lg">
          {servicesData.map((service) => {
              const IconComponent = getIconComponent(service.icon);
              return (
              <a
                key={service.id}
                href={`/services/${service.slug}`}
                onClick={() => {
                  // GTM Event Tracking
                  if (typeof window !== 'undefined' && (window as any).dataLayer) {
                    (window as any).dataLayer.push({
                      event: 'service_click',
                      service_name: language === 'de' ? service.nameDe : service.nameEn,
                      service_slug: service.slug,
                      click_location: 'hero_grid'
                    });
                  }
                }}
                className="group relative flex flex-col items-center justify-center bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl p-2 md:p-4 hover:bg-white/40 hover:scale-105 transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.6),0_0_40px_rgba(16,185,129,0.4),0_0_60px_rgba(16,185,129,0.2)]"
              >
                <IconComponent className="w-8 h-8 md:w-10 md:h-10 mb-1 md:mb-2 text-primary" />
                <span className="text-[9px] md:text-[10px] text-center text-foreground font-semibold leading-tight break-words px-1">
                  {language === 'de' ? service.nameDe : service.nameEn}
                </span>
              </a>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
