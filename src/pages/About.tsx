import PageLayout from "@/components/PageLayout";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t, language } = useLanguage();

  const values = [
    { de: "Transparenz", en: "Transparency" },
    { de: "Qualität", en: "Quality" },
    { de: "Kundenzufriedenheit", en: "Customer Satisfaction" }
  ];

  return (
    <PageLayout>
      <div className="px-4 sm:px-6 lg:px-12 py-12">
        <div className="glass-card rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground font-serif font-normal mb-6">
            {t("Über uns", "About Us")}
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <h2 className="text-3xl text-foreground font-serif font-normal mt-8 mb-4">
              {t("Über Lynck Services", "About Lynck Services")}
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {t(
                "Wir sind Ihre digitale Brücke zwischen Hausbesitzern und qualifizierten Handwerkern in ganz Deutschland.",
                "We are your digital bridge between homeowners and qualified contractors across Germany."
              )}
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t(
                "Gegründet 2025 mit der Mission, die Suche nach zuverlässigen Fachleuten zu vereinfachen.",
                "Founded in 2025 with the mission to simplify the search for reliable professionals."
              )}
            </p>

            <h3 className="text-2xl text-foreground font-serif font-normal mt-8 mb-6">
              {t("Unsere Werte:", "Our Values:")}
            </h3>

            <ul className="space-y-3 mb-8">
              {values.map((value, index) => (
                <li key={index} className="text-foreground/90 text-lg">
                  {language === 'de' ? value.de : value.en}
                </li>
              ))}
            </ul>

            <div className="mt-12 p-6 bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-xl">
              <p className="text-sm text-muted-foreground italic">
                {t(
                  "[Placeholder: Unternehmensgeschichte, Team-Fotos und detaillierte Werte werden hier hinzugefügt]",
                  "[Placeholder: Company story, team photos, and detailed values will be added here]"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
