import { Search, Moon, Sun, ChevronDown } from "lucide-react";
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
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg"></div>
          <span className="text-lg font-semibold text-foreground tracking-tight">Lynck Services</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <div className="relative">
            <button
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
              className="text-sm text-foreground font-medium hover:text-primary transition-colors duration-300 flex items-center gap-1"
            >
              {t("Dienstleistungen", "Services")}
              <ChevronDown className="w-3 h-3" />
            </button>
            {servicesOpen && (
              <div
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
                className="absolute top-full left-0 mt-2 w-64 bg-background/95 backdrop-blur-md border border-border rounded-xl shadow-lg z-[100] py-2"
              >
                {services.map((service) => (
                  <a
                    key={service.slug}
                    href={`/${service.slug}`}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors duration-300"
                  >
                    <span className="text-lg">{service.icon}</span>
                    <span>{service.name}</span>
                  </a>
                ))}
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
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden lg:block">
          <input
            type="text"
            placeholder={t("Suchen...", "Search...")}
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
