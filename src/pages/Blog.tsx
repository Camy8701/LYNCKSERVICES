import PageLayout from "@/components/PageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, ArrowRight } from "lucide-react";

const Blog = () => {
  const { t, language } = useLanguage();

  const blogPosts = [
    {
      image: "https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?auto=format&fit=crop&w=800&q=80",
      titleDe: "Was kostet eine neue Heizung 2025?",
      titleEn: "What Does a New Heating System Cost in 2025?",
      excerptDe: "Durchschnittliche Kosten und Fördermöglichkeiten für moderne Heizungsanlagen...",
      excerptEn: "Average costs and funding opportunities for modern heating systems...",
      date: language === 'de' ? "15. November 2025" : "November 15, 2025",
      slug: "heizung-kosten-2025"
    },
    {
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
      titleDe: "Solar Förderung 2025: Alle Programme im Überblick",
      titleEn: "Solar Funding 2025: All Programs at a Glance",
      excerptDe: "KfW, BAFA und regionale Förderungen für Solaranlagen im Detail erklärt...",
      excerptEn: "KfW, BAFA and regional funding for solar systems explained in detail...",
      date: language === 'de' ? "10. November 2025" : "November 10, 2025",
      slug: "solar-foerderung-2025"
    },
    {
      image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=800&q=80",
      titleDe: "Dach sanieren: Wann lohnt sich eine Sanierung?",
      titleEn: "Roof Renovation: When Is It Worth It?",
      excerptDe: "7 Anzeichen, dass Ihr Dach saniert werden sollte und was Sie beachten müssen...",
      excerptEn: "7 signs that your roof should be renovated and what you need to consider...",
      date: language === 'de' ? "5. November 2025" : "November 5, 2025",
      slug: "dach-sanierung-wann"
    },
    {
      image: "https://images.unsplash.com/photo-1585128903992-ae6ba42ca694?auto=format&fit=crop&w=800&q=80",
      titleDe: "Elektriker beauftragen: Das sollten Sie wissen",
      titleEn: "Hiring an Electrician: What You Should Know",
      excerptDe: "Wichtige Tipps zur Auswahl des richtigen Elektrikers für Ihr Projekt...",
      excerptEn: "Important tips for choosing the right electrician for your project...",
      date: language === 'de' ? "1. November 2025" : "November 1, 2025",
      slug: "elektriker-beauftragen"
    },
    {
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
      titleDe: "Badezimmer renovieren: Kosten und Planung",
      titleEn: "Bathroom Renovation: Costs and Planning",
      excerptDe: "Kompletter Leitfaden für die Planung und Durchführung Ihrer Badrenovierung...",
      excerptEn: "Complete guide to planning and executing your bathroom renovation...",
      date: language === 'de' ? "28. Oktober 2025" : "October 28, 2025",
      slug: "badezimmer-renovieren"
    },
    {
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
      titleDe: "Smart Home Installation: Möglichkeiten und Kosten",
      titleEn: "Smart Home Installation: Options and Costs",
      excerptDe: "Alles über Smart Home Systeme, Installation und was Sie investieren müssen...",
      excerptEn: "Everything about smart home systems, installation and what you need to invest...",
      date: language === 'de' ? "25. Oktober 2025" : "October 25, 2025",
      slug: "smart-home-installation"
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
