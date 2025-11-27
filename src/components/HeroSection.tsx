import { ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getServices, type Service } from "@/lib/database";
import { getIconComponent } from "@/lib/serviceIcons";

const HeroSection = () => {
  const { t, language } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const quotes = [
    {
      de: "Ihr Zuhause verdient Experten, denen es genauso am Herzen liegt wie Ihnen",
      en: "Your Home Deserves Experts Who Care As Much As You Do"
    },
    {
      de: "Jedes großartige Zuhause hat ein Team dahinter – Wir helfen Ihnen, Ihres aufzubauen",
      en: "Every Great Home Has a Team Behind It—We'll Help You Build Yours"
    },
    {
      de: "Warten Sie nicht, bis das Leck zur Flut wird – Verbinden Sie sich mit vertrauenswürdigen Experten, bevor kleine Probleme zu großen Ausgaben werden",
      en: "Don't Wait for the Leak to Become a Flood—Connect With Trusted Experts Before Small Problems Become Big Expenses"
    },
    {
      de: "Der beste Zeitpunkt, sich um Ihr Zuhause zu kümmern, war gestern. Der zweitbeste ist jetzt.",
      en: "The Best Time to Care for Your Home Was Yesterday. The Second Best Time Is Right Now."
    },
    {
      de: "Vom Fundament bis zum Dach erzählt jede Ecke Ihres Zuhauses eine Geschichte – Sorgen Sie dafür, dass es eine Geschichte von Stolz ist, nicht von Vernachlässigung",
      en: "From Foundation to Rooftop, Every Corner of Your Home Tells a Story—Make Sure It's One of Pride, Not Neglect"
    },
    {
      de: "Vertrauen wird nicht gegeben, es wird verdient – Deshalb verbinden wir Sie nur mit verifizierten Fachleuten, die Ihr Zuhause wie ihr eigenes behandeln",
      en: "Trust Isn't Given, It's Earned—That's Why We Only Connect You With Verified Professionals Who Treat Your Home Like Their Own"
    },
    {
      de: "Ein gut gepflegtes Zuhause ist keine Ausgabe – Es ist eine Investition in Komfort, Sicherheit und Seelenfrieden",
      en: "A Well-Maintained Home Isn't an Expense—It's an Investment in Comfort, Safety, and Peace of Mind"
    }
  ];

  const handleHouseClick = () => {
    if (isFlipped) {
      // If showing quote, flip back to house
      setIsFlipped(false);
    } else {
      // If showing house, flip to next quote
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
      setIsFlipped(true);
    }
  };

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
              {t("Geprüfte Handwerker", "Verified Craftsmen")}
            </h1>
            <h2 className="mt-2 text-5xl md:text-6xl lg:text-7xl tracking-tight text-muted-foreground font-serif font-normal">
              {t("in Hessen & NRW", "in Hesse & NRW")}
            </h2>
            <h2 className="mt-2 text-5xl md:text-6xl lg:text-7xl tracking-tight text-muted-foreground font-serif font-normal">
              {t("in Ihrer Nähe", "in Your Area")}
            </h2>

            <div className="mt-6 flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {t(
                  "20 Städte • Frankfurt • Köln • Düsseldorf • Kostenloser Vergleich",
                  "20 Cities • Frankfurt • Cologne • Düsseldorf • Free Comparison"
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

        {/* Right Panel - House with Service Cards */}
        <div className="relative md:p-10 lg:p-14 pt-8 pr-8 pb-8 pl-8" style={{ perspective: '1800px' }}>
          {/* Flip Card Container */}
          <div
            className="relative w-full cursor-pointer transition-all duration-700 ease-in-out"
            onClick={handleHouseClick}
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              minHeight: '624px'
            }}
          >
            {/* Front - House with Services */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              <div className="relative w-full h-full flex flex-col items-center justify-start">
                {/* Minimalistic Roof - Line style */}
                <div className="relative w-full mb-0 h-40">
                  {/* Roof lines - Two diagonal lines forming triangle outline - Extended 20% beyond corners, 200% thicker */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 576 168" preserveAspectRatio="none" style={{ filter: 'drop-shadow(0 2px 4px rgba(16, 185, 129, 0.4))' }}>
                    {/* Left roof line - extends 20% beyond (48px on each side of original 480px width) */}
                    <line x1="-48" y1="168" x2="288" y2="0" stroke="rgba(16, 185, 129, 0.9)" strokeWidth="6" />
                    {/* Right roof line - extends 20% beyond */}
                    <line x1="288" y1="0" x2="624" y2="168" stroke="rgba(16, 185, 129, 0.9)" strokeWidth="6" />
                    {/* Chimney integrated with roof - scaled proportionally (20% larger) */}
                    <rect x="420" y="48" width="14.4" height="60" fill="rgba(16, 185, 129, 0.9)" stroke="rgba(16, 185, 129, 0.9)" strokeWidth="2.4" rx="1.2" />
                    {/* Chimney cap - scaled proportionally */}
                    <rect x="415.2" y="43.2" width="24" height="9.6" fill="rgba(16, 185, 129, 0.9)" stroke="rgba(16, 185, 129, 0.9)" strokeWidth="2.4" rx="1.2" />
                  </svg>
                </div>

                {/* House Body with Service Cards - 20% larger */}
                <div className="relative w-full max-w-xl bg-white/[0.03] dark:bg-white/[0.03] backdrop-blur-sm ring-primary/20 ring-2 rounded-b-2xl p-7 -mt-1 animate-glow-pulse">
                  {/* Service Cards Grid - scaled 20% larger */}
                  <div className="grid grid-cols-3 gap-4">
                    {services.slice(0, 6).map((service) => {
                      const IconComponent = getIconComponent(service.icon);
                      return (
                        <Link
                          key={service.id}
                          to={`/services/${service.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="group relative flex flex-col items-center justify-center bg-white/[0.05] dark:bg-white/[0.05] backdrop-blur-sm border border-primary/20 rounded-xl p-5 hover:bg-primary/10 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 z-20"
                        >
                          <IconComponent className="w-8 h-8 mb-2 text-primary" />
                          <span className="text-xs text-center text-foreground font-medium leading-tight">
                            {language === 'de' ? service.name : service.name_en}
                          </span>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Door at bottom - scaled 20% larger */}
                  <div className="mt-5 mx-auto w-20 h-24 bg-primary/60 border-2 border-primary rounded-t-lg relative">
                    <div className="absolute right-2 top-12 w-2 h-2 bg-foreground/50 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Back - Quote - scaled 20% larger */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <div className="relative w-full h-full flex items-center justify-center p-10 bg-primary/10 backdrop-blur-md border-2 border-primary rounded-3xl animate-glow-pulse">
                <p className="text-xl md:text-2xl text-foreground font-semibold text-center leading-relaxed">
                  "{language === 'de' ? quotes[currentQuoteIndex].de : quotes[currentQuoteIndex].en}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
