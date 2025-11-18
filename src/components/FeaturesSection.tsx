import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getServices, type Service } from "@/lib/database";
import { getIconComponent } from "@/lib/serviceIcons";

// Service images mapping
const serviceImages: Record<string, string> = {
  heizung: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80",
  solar: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
  dachdecker: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=800&q=80",
  klempner: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",
  elektriker: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=800&q=80",
  renovierung: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
};

const FeaturesSection = () => {
  const { t, language } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error('Error loading services:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadServices();
  }, []);

  return (
    <section id="services" className="overflow-hidden glass-card rounded-3xl mt-8 mb-20 mx-4 md:mx-6 lg:mx-8">
      <div className="md:px-10 lg:px-14 pt-20 pr-6 pb-16 pl-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground font-serif font-normal">
            {t("Unsere Dienstleistungen", "Our Services")}
          </h2>
          <p className="text-lg text-muted-foreground mt-6">
            {t(
              "Finden Sie geprüfte Fachleute für alle Bereiche rund um Ihr Zuhause.",
              "Find verified professionals for all areas around your home."
            )}
          </p>
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground py-12">
            {t("Dienstleistungen werden geladen...", "Loading services...")}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = getIconComponent(service.icon);
              const image = serviceImages[service.slug] || serviceImages.renovierung;
              
              return (
                <div
                  key={service.id}
                  className="relative group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                >
                  <div
                    className="aspect-[4/3] overflow-hidden relative bg-cover bg-center rounded-2xl mb-6"
                    style={{ backgroundImage: `url(${image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-foreground mb-2 tracking-tight">
                    {language === 'de' ? service.name : service.name_en}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-1 font-medium">
                    {language === 'de' ? service.name_en : service.name}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {language === 'de' ? service.description : service.description_en}
                  </p>
                  <a
                    href={`/${service.slug}`}
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    {t("Angebot anfordern", "Request Quote")}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturesSection;
