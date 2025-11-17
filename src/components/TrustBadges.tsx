import { useLanguage } from "@/contexts/LanguageContext";
import { Check } from "lucide-react";

const TrustBadges = () => {
  const { t } = useLanguage();

  const badges = [
    {
      textDe: "500+ Geprüfte Handwerker",
      textEn: "500+ Verified Contractors"
    },
    {
      textDe: "Kostenlos & unverbindlich",
      textEn: "Free & non-binding"
    },
    {
      textDe: "Bis zu 3 Angebote vergleichen",
      textEn: "Compare up to 3 quotes"
    },
    {
      textDe: "Durchschnittliche Antwortzeit: 24h",
      textEn: "Average response time: 24h"
    }
  ];

  return (
    <div className="mx-4 md:mx-6 lg:mx-8 mb-12">
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
        {badges.map((badge, index) => (
          <div key={index} className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-sm text-muted-foreground">
              {t(badge.textDe, badge.textEn)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBadges;
