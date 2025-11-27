import PageLayout from "@/components/PageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, ArrowRight } from "lucide-react";

const Blog = () => {
  const { t, language } = useLanguage();

  const blogPosts = [
    {
      image: "/blog-heating.jpg",
      titleDe: "Heizungsmodernisierung 2025: Förderungen und Zuschüsse nutzen",
      titleEn: "Heating System Modernization 2025: Utilize Subsidies and Grants",
      excerptDe: "BEG-Förderung bis zu 70% für Wärmepumpen. Erfahren Sie, wie Sie staatliche Zuschüsse für Ihre Heizungssanierung optimal nutzen und bis zu 25.000€ sparen können.",
      excerptEn: "BEG funding up to 70% for heat pumps. Learn how to optimize government subsidies for your heating renovation and save up to €25,000.",
      date: language === 'de' ? "20. November 2024" : "November 20, 2024",
      slug: "heizungsmodernisierung-foerderung-2025"
    },
    {
      image: "/blog-solar.jpg",
      titleDe: "Photovoltaik für Eigenheimbesitzer: Lohnt sich die Investition?",
      titleEn: "Photovoltaics for Homeowners: Is the Investment Worth It?",
      excerptDe: "Aktuelle Einspeisevergütung, Eigenverbrauch optimieren und steuerliche Vorteile. Amortisation in 8-12 Jahren bei durchschnittlichen Einfamilienhäusern in Deutschland.",
      excerptEn: "Current feed-in tariff, optimize self-consumption and tax benefits. Payback in 8-12 years for average single-family homes in Germany.",
      date: language === 'de' ? "15. November 2024" : "November 15, 2024",
      slug: "photovoltaik-eigenheim-2024"
    },
    {
      image: "/blog-roofing.jpg",
      titleDe: "Dachsanierung: Diese 5 Warnsignale sollten Sie kennen",
      titleEn: "Roof Renovation: These 5 Warning Signs You Should Know",
      excerptDe: "Feuchte Decken, fehlende Ziegel oder hohe Heizkosten? Diese Anzeichen deuten auf dringenden Sanierungsbedarf hin. Inklusive Kostenübersicht für typische Einfamilienhäuser.",
      excerptEn: "Damp ceilings, missing tiles or high heating costs? These signs indicate urgent renovation needs. Including cost overview for typical single-family homes.",
      date: language === 'de' ? "10. November 2024" : "November 10, 2024",
      slug: "dachsanierung-warnsignale"
    },
    {
      image: "/blog-electrician.jpg",
      titleDe: "Elektroinstallation modernisieren: Wann ist es Zeit für eine Sanierung?",
      titleEn: "Modernize Electrical Installation: When Is It Time for Renovation?",
      excerptDe: "Altbauten mit veralteter Elektrik bergen Risiken. FI-Schutzschalter nachrüsten, Leitungen erneuern: Was bei der Elektrosanierung beachtet werden muss und was es kostet.",
      excerptEn: "Old buildings with outdated electrics pose risks. Retrofitting RCD circuit breakers, renewing cables: What to consider during electrical renovation and costs.",
      date: language === 'de' ? "5. November 2024" : "November 5, 2024",
      slug: "elektroinstallation-modernisieren"
    },
    {
      image: "/blog-renovation.jpg",
      titleDe: "Altbausanierung: Förderung, Kosten und Zeitplan",
      titleEn: "Old Building Renovation: Funding, Costs and Timeline",
      excerptDe: "KfW-Programm 261 für energetische Sanierung nutzen. Schritt-für-Schritt Anleitung für die Sanierung von Altbauten inkl. typischer Kostenpunkte und Förderhöhen.",
      excerptEn: "Use KfW program 261 for energy-efficient renovation. Step-by-step guide for renovating old buildings including typical cost points and funding amounts.",
      date: language === 'de' ? "1. November 2024" : "November 1, 2024",
      slug: "altbausanierung-foerderung"
    },
    {
      image: "/blog-plumbing.png",
      titleDe: "Sanitär erneuern: Von der Planung bis zur Umsetzung",
      titleEn: "Renew Plumbing: From Planning to Implementation",
      excerptDe: "Badsanierung, Rohrerneuerung oder Heizungsanbindung: Worauf Eigentümer achten müssen. Materialwahl, Normen und durchschnittliche Kosten für Standard-Bäder.",
      excerptEn: "Bathroom renovation, pipe renewal or heating connection: What owners need to consider. Material selection, standards and average costs for standard bathrooms.",
      date: language === 'de' ? "28. Oktober 2024" : "October 28, 2024",
      slug: "sanitaer-erneuern"
    }
  ];

  return (
    <PageLayout>
      <div className="px-4 sm:px-6 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground font-serif font-normal mb-12 text-center">
            Blog
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="glass-card rounded-xl overflow-hidden group hover:border-white/[0.12] transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={language === 'de' ? post.titleDe : post.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <h2 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {language === 'de' ? post.titleDe : post.titleEn}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {language === 'de' ? post.excerptDe : post.excerptEn}
                  </p>
                  <a 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all text-sm font-medium"
                  >
                    {t("Weiterlesen", "Read more")}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Blog;
