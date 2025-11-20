import { Moon, Sun, ChevronDown, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchBar } from "./SearchBar";

const Navigation = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
          <div 
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              className="text-sm text-foreground font-medium hover:text-primary transition-colors duration-300 flex items-center gap-1"
            >
              {t("Dienstleistungen", "Services")}
              <ChevronDown className="w-3 h-3" />
            </button>
            {servicesOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-64 bg-background/95 backdrop-blur-md border border-border rounded-xl shadow-lg z-[100] py-2"
              >
                {services.map((service) => (
                  <a
                    key={service.slug}
                    href={`/service/${service.slug}`}
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
        <div className="hidden lg:block w-96">
          <SearchBar />
        </div>

        {/* Desktop Language & Theme */}
        <button
          onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}
          className="hidden lg:flex px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground bg-white/[0.03] border border-white/[0.06] rounded-lg transition-colors duration-300"
        >
          {language === 'de' ? 'EN' : 'DE'}
        </button>

        <button
          onClick={toggleTheme}
          className="hidden lg:flex p-2 hover:bg-white/10 rounded-lg transition-colors duration-300 group"
        >
          {theme === "dark" ? (
            <Moon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
          ) : (
            <Sun className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
          )}
        </button>

        {/* Mobile Language & Theme & Menu */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}
            className="px-2.5 py-1.5 text-xs font-medium text-foreground hover:text-primary bg-white/[0.03] border border-white/[0.06] rounded-lg transition-colors duration-300"
          >
            {language === 'de' ? 'EN' : 'DE'}
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
          >
            {theme === "dark" ? (
              <Moon className="w-5 h-5 text-foreground" />
            ) : (
              <Sun className="w-5 h-5 text-foreground" />
            )}
          </button>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300">
                <Menu className="w-6 h-6 text-foreground" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background/95 backdrop-blur-md border-border">
            <div className="flex flex-col gap-6 mt-8">
              {/* Mobile Search */}
              <div className="px-2">
                <SearchBar />
              </div>

              {/* Services Section */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground px-2">
                  {t("Dienstleistungen", "Services")}
                </h3>
                <div className="space-y-1">
                  {services.map((service) => (
                    <a
                      key={service.slug}
                      href={`/service/${service.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-2 py-2.5 text-sm text-foreground hover:bg-accent hover:text-primary rounded-lg transition-colors duration-300"
                    >
                      <span className="text-lg">{service.icon}</span>
                      <span>{service.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Other Navigation Items */}
              <div className="space-y-1 border-t border-border pt-4">
                <a
                  href="/#how-it-works"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-2 py-2.5 text-sm text-foreground hover:bg-accent hover:text-primary rounded-lg transition-colors duration-300"
                >
                  {t("So funktioniert's", "How It Works")}
                </a>
                <a
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-2 py-2.5 text-sm text-foreground hover:bg-accent hover:text-primary rounded-lg transition-colors duration-300"
                >
                  Blog
                </a>
                <a
                  href="/for-businesses"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-2 py-2.5 text-sm text-foreground hover:bg-accent hover:text-primary rounded-lg transition-colors duration-300"
                >
                  {t("Für Unternehmen", "For Businesses")}
                </a>
              </div>

            </div>
          </SheetContent>
        </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
