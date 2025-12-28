/**
 * 3-Step Matching Process Section
 *
 * Explains how LYNCK Services connects users with contractors
 * Phase 3 of Landing Page Redesign
 */

import { useLanguage } from "@/contexts/LanguageContext";
import { matchingProcessContent } from "@/data/landingPageContent";
import { Clock } from "lucide-react";

export default function MatchingProcess() {
  const { language } = useLanguage();

  const content = matchingProcessContent;
  const sectionTitle = language === 'de' ? content.sectionTitle.de : content.sectionTitle.en;
  const sectionSubtitle = language === 'de' ? content.sectionSubtitle.de : content.sectionSubtitle.en;
  const guaranteeBadge = language === 'de' ? content.guaranteeBadge.de : content.guaranteeBadge.en;

  return (
    <section
      id="how-it-works"
      className="px-4 sm:px-6 lg:px-12 py-16 md:py-24 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-4">
            {sectionTitle}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {sectionSubtitle}
          </p>
        </div>

        {/* 3 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mb-12">
          {content.steps.map((step, index) => {
            const title = language === 'de' ? step.title.de : step.title.en;
            const description = language === 'de' ? step.description.de : step.description.en;
            const details = language === 'de' ? step.details.de : step.details.en;

            return (
              <div key={step.number} className="relative">
                {/* Connector Line (desktop only) */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-primary/20 z-0" />
                )}

                {/* Step Card */}
                <div className="relative glass-card rounded-2xl p-8 h-full hover:border-primary/50 transition-all duration-300 z-10">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-6 text-5xl mx-auto">
                    {step.icon}
                  </div>

                  {/* Step Number Badge */}
                  <div className="absolute top-6 right-6 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-lg">{step.number}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-foreground mb-3 text-center">
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed text-center mb-3">
                    {description}
                  </p>

                  {/* Details */}
                  <p className="text-xs text-muted-foreground/70 text-center italic">
                    {details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-3 bg-primary/10 border border-primary/30 rounded-full px-6 py-3">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-sm md:text-base font-medium text-foreground">
              {guaranteeBadge}
            </span>
          </div>
        </div>

        {/* Trust Statement */}
        <div className="mt-12 text-center max-w-3xl mx-auto">
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            {language === 'de'
              ? 'Unser intelligentes Matching-System verbindet Sie automatisch mit den am besten geeigneten Fachbetrieben in Ihrer Region. Keine endlosen Telefonate, keine Unsicherheit – nur qualifizierte Angebote von geprüften Partnern.'
              : 'Our intelligent matching system automatically connects you with the most suitable contractors in your region. No endless phone calls, no uncertainty – just qualified quotes from verified partners.'}
          </p>
        </div>
      </div>
    </section>
  );
}
