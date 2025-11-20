import { ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { getServices, type Service } from "@/lib/database";
import { getIconComponent } from "@/lib/serviceIcons";

const HeroSection = () => {
  const { t, language } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error('Error loading services:', error);
      }
    }
    
    loadServices();
  }, []);

  return (
    <section className="overflow-hidden glass-card rounded-3xl mb-20 mx-4 md:mx-6 lg:mx-8">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Panel */}
        <div className="relative md:p-10 lg:p-14 pt-6 pr-6 pb-6 pl-6">
          <div className="mt-10 md:mt-14">
            <h1 className="mt-4 text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground font-serif font-normal">
              {t("Finden Sie geprüfte", "Find Trusted")}
            </h1>
            <h2 className="mt-2 text-5xl md:text-6xl lg:text-7xl tracking-tight text-muted-foreground font-serif font-normal">
              {t("Handwerker", "Home Services")}
            </h2>
            <h2 className="mt-2 text-5xl md:text-6xl lg:text-7xl tracking-tight text-muted-foreground font-serif font-normal">
              {t("in Ihrer Nähe", "in Your Area")}
            </h2>

            <div className="mt-6 flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {t(
                  "Kostenlos Angebote vergleichen • Geprüfte Fachleute • Schnelle Antwort",
                  "Compare quotes for free • Verified professionals • Fast response"
                )}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 mt-8 items-center">
              <a
                href="#services"
                className="relative inline-flex items-center justify-center overflow-hidden group text-white tracking-tighter bg-gray-800 rounded-3xl pt-2.5 pr-4 pb-2.5 pl-4 hover:scale-105 transition-transform duration-300"
              >
                <span className="absolute transition-all duration-500 ease-out group-hover:w-56 group-hover:h-56 bg-teal-600 w-0 h-0 rounded-full"></span>
                <span className="relative text-base font-semibold">
                  {t("Jetzt Angebot anfordern", "Request Quote Now")}
                </span>
                <ArrowRight className="h-4 w-4 relative ml-3" />
              </a>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-4 flex items-start gap-4">
                <div className="text-primary mt-1">
                  <Check className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-base font-medium tracking-tight text-foreground">
                    {t("100% Kostenlos", "100% Free")}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t(
                      "Keine versteckten Kosten. Sie zahlen nur, wenn Sie einen Handwerker beauftragen.",
                      "No hidden costs. You only pay when you hire a contractor."
                    )}
                  </p>
                </div>
              </div>
              <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-4 flex items-start gap-4">
                <div className="text-primary mt-1">
                  <Check className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-base font-medium tracking-tight text-foreground">
                    {t("Geprüfte Fachleute", "Verified Professionals")}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
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
        <div className="relative md:p-10 lg:p-14 pt-8 pr-8 pb-8 pl-8">
          <div className="relative overflow-hidden min-h-[420px] md:min-h-[520px] flex bg-white/[0.03] dark:bg-white/[0.03] backdrop-blur-sm ring-gray-200 dark:ring-white/10 ring-1 rounded-3xl items-center justify-center p-8">
            {/* Service Cards Grid */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 w-full max-w-md">
              {services.slice(0, 6).map((service) => {
                const IconComponent = getIconComponent(service.icon);
                return (
                  <a
                    key={service.id}
                    href={`/service/${service.slug}`}
                    className="group relative flex flex-col items-center justify-center bg-white/[0.03] dark:bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-xl p-3 md:p-6 hover:bg-white/[0.08] hover:scale-105 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                  >
                    <IconComponent className="w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-3 text-primary flex-shrink-0" />
                    <span className="text-[10px] md:text-xs text-center text-foreground font-medium leading-tight break-words">
                      {language === 'de' ? service.name : service.name_en}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
