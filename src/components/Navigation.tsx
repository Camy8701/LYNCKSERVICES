import { Search, Moon, Sun, ChevronDown, Home } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Navigation = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [servicesOpen, setServicesOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const services = [
    { icon: "🔥", name: t("Heizung & HVAC", "Heating & HVAC"), slug: "heizung" },
    { icon: "☀️", name: t("Solar & Photovoltaik", "Solar & Photovoltaic"), slug: "solar" },
    { icon: "🏠", name: t("Dachdecker", "Roofing"), slug: "dachdecker" },
    { icon: "🚰", name: t("Klempner & Sanitär", "Plumbing & Sanitary"), slug: "klempner" },
    { icon: "⚡", name: t("Elektriker", "Electrician"), slug: "elektriker" },
    { icon: "🔨", name: t("Allgemeine Renovierung", "General Renovation"), slug: "renovierung" },
  ];

  return (
    <nav className="flex items-center justify-between px-6 md:px-12 lg:px-16 py-4 mt-8 mb-4 mx-4 md:mx-6 lg:mx-8 glass-card rounded-2xl relative z-50">
      <div className="flex items-center gap-12">
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-all duration-300">
            <Home className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground tracking-tight">Lynck Services</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              className="text-sm text-foreground font-medium hover:text-primary transition-colors duration-300 flex items-center gap-1 py-2"
            >
              {t("Dienstleistungen", "Services")}
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {servicesOpen && (
              <div
                className="absolute top-full left-0 pt-1 w-64 z-[100]"
              >
                <div className="bg-background border border-border rounded-xl shadow-xl py-2">
                  {services.map((service) => (
                    <a
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-primary/10 hover:text-foreground transition-colors duration-200"
                    >
                      <span className="text-lg">{service.icon}</span>
                      <span>{service.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <a href="/#how-it-works" className="text-sm text-muted-foreground font-medium hover:text-foreground transition-colors duration-300">
            {t("So funktioniert's", "How It Works")}
          </a>
          <a href="/blog" className="text-sm text-muted-foreground font-medium hover:text-foreground transition-colors duration-300">
            Blog
          </a>
          <a href="/for-businesses" className="text-sm text-muted-foreground font-medium hover:text-foreground transition-colors duration-300">
            {t("Für Unternehmen", "For Businesses")}
          </a>
          <a
            href="/advertise"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-300 flex items-center gap-1"
          >
            {t("Werben", "Advertise")}
          </a>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden lg:block">
          <input
            type="text"
            placeholder={t("Service oder Stadt suchen...", "Search service or city...")}
            className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-2 pl-10 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 w-96 transition-all duration-300"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        </div>

        <button
          onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}
          className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground bg-white/[0.03] border border-white/[0.06] rounded-lg transition-colors duration-300"
        >
          {language === 'de' ? 'EN' : 'DE'}
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300 group"
        >
          {theme === "dark" ? (
            <Moon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
          ) : (
            <Sun className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
