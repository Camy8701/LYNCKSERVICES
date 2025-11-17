import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Flame, Sun, Home, Droplets, Zap, Hammer } from "lucide-react";

const features = [
  {
    icon: Flame,
    titleDe: "Heizung & HVAC",
    titleEn: "Heating & HVAC",
    descriptionDe: "Notfall-Service, Installation, Wartung und Reparatur von Heizungsanlagen. 24/7 verfügbar.",
    descriptionEn: "Emergency service, installation, maintenance and repair of heating systems. Available 24/7.",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80",
    slug: "/heizung"
  },
  {
    icon: Sun,
    titleDe: "Solar & Photovoltaik",
    titleEn: "Solar & Photovoltaic",
    descriptionDe: "Förderungen bis 70%. Installation, Beratung und Wartung von Solaranlagen.",
    descriptionEn: "Grants up to 70%. Installation, consulting and maintenance of solar systems.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    slug: "/solar"
  },
  {
    icon: Home,
    titleDe: "Dachdecker",
    titleEn: "Roofing",
    descriptionDe: "Reparatur, Sanierung, Neueindeckung und Sturmschaden-Beseitigung.",
    descriptionEn: "Repair, renovation, re-roofing and storm damage removal.",
    image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=800&q=80",
    slug: "/dachdecker"
  },
  {
    icon: Droplets,
    titleDe: "Klempner & Sanitär",
    titleEn: "Plumbing & Sanitary",
    descriptionDe: "Rohrreinigung, Reparaturen, Neuinstallation von Sanitäranlagen.",
    descriptionEn: "Pipe cleaning, repairs, new installation of sanitary facilities.",
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",
    slug: "/klempner"
  },
  {
    icon: Zap,
    titleDe: "Elektriker",
    titleEn: "Electrician",
    descriptionDe: "Smart Home, Panel-Upgrades, Reparatur und Neuinstallation elektrischer Anlagen.",
    descriptionEn: "Smart home, panel upgrades, repair and new installation of electrical systems.",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=800&q=80",
    slug: "/elektriker"
  },
  {
    icon: Hammer,
    titleDe: "Allgemeine Renovierung",
    titleEn: "General Renovation",
    descriptionDe: "Badezimmer, Küche, Fenster & Türen, Malerarbeiten und mehr.",
    descriptionEn: "Bathroom, kitchen, windows & doors, painting and more.",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    slug: "/renovierung"
  }
];

const FeaturesSection = () => {
  const { t, language } = useLanguage();

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
            >
              <div
                className="aspect-[4/3] overflow-hidden relative bg-cover bg-center rounded-2xl mb-6"
                style={{ backgroundImage: `url(${feature.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2 tracking-tight">
                {language === 'de' ? feature.titleDe : feature.titleEn}
              </h4>
              <p className="text-sm text-muted-foreground mb-1 font-medium">
                {language === 'de' ? feature.titleEn : feature.titleDe}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {language === 'de' ? feature.descriptionDe : feature.descriptionEn}
              </p>
              <a
                href={feature.slug}
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                {t("Angebot anfordern", "Request Quote")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
