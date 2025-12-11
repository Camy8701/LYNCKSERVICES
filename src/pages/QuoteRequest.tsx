import PageLayout from "@/components/PageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { servicesData } from "@/data/servicesData";

const QuoteRequest = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    service: "",
    description: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save quote request to Supabase database
      const { data, error } = await supabase
        .from('quote_requests')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            location: formData.location,
            service: formData.service,
            description: formData.description,
            status: 'pending'
          }
        ])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Quote request saved successfully:', data);

      // Show success message
      toast({
        title: t("Anfrage gesendet", "Quote Request Sent"),
        description: t(
          "Vielen Dank für Ihre Anfrage. Wir werden uns innerhalb von 24 Stunden mit passenden Angeboten bei Ihnen melden.",
          "Thank you for your request. We will get back to you within 24 hours with matching quotes."
        )
      });

      // GTM Event Tracking
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'quote_request_submit',
          form_type: 'quote_request',
          service: formData.service,
          location: formData.location
        });
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        service: "",
        description: ""
      });
    } catch (error) {
      console.error('Error submitting quote request:', error);

      // Show error with fallback option
      toast({
        title: t("Fehler", "Error"),
        description: t(
          "Ihre Anfrage konnte nicht gesendet werden. Bitte kontaktieren Sie uns direkt per E-Mail:",
          "Your request could not be sent. Please contact us directly via email:"
        ) + " info@lynckservices.de",
        variant: "destructive",
        duration: 10000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <div className="px-4 sm:px-6 lg:px-12 py-12">
        <div className="glass-card rounded-3xl p-8 lg:p-12 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground font-serif font-normal mb-6">
            {t("Angebot anfordern", "Request a Quote")}
          </h1>

          <p className="text-lg text-muted-foreground mb-8">
            {t(
              "Füllen Sie das Formular aus und erhalten Sie kostenlose Angebote von geprüften Fachleuten in Ihrer Nähe.",
              "Fill out the form and receive free quotes from verified professionals in your area."
            )}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  {t("Wie es funktioniert", "How it works")}
                </h2>
                <ol className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold text-xs">1</span>
                    <span>{t("Formular ausfüllen", "Fill out the form")}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold text-xs">2</span>
                    <span>{t("Angebote erhalten", "Receive quotes")}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold text-xs">3</span>
                    <span>{t("Vergleichen & beauftragen", "Compare & hire")}</span>
                  </li>
                </ol>
              </div>

              <div className="pt-6 border-t border-border">
                <h3 className="text-sm font-medium text-foreground mb-3">
                  {t("Kontakt", "Contact")}
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="w-4 h-4 text-primary" />
                    <a href="mailto:info@lynckservices.de" className="hover:text-primary transition-colors">
                      info@lynckservices.de
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>Mo-Fr: 08:00-18:00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <form onSubmit={handleSubmit} className="md:col-span-2 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    {t("Name", "Name")} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full bg-white/[0.05] border-2 border-white/[0.15] rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder={t("Ihr Name", "Your name")}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    {t("E-Mail", "Email")} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full bg-white/[0.05] border-2 border-white/[0.15] rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder={t("ihre@email.de", "your@email.com")}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    {t("Telefon", "Phone")} *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full bg-white/[0.05] border-2 border-white/[0.15] rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder={t("+49 123 456789", "+49 123 456789")}
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    {t("Standort", "Location")} *
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                    className="w-full bg-white/[0.05] border-2 border-white/[0.15] rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder={t("PLZ oder Stadt", "ZIP code or city")}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                  {t("Welche Dienstleistung benötigen Sie?", "What service do you need?")} *
                </label>
                <select
                  id="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  required
                  className="w-full bg-white/[0.05] border-2 border-white/[0.15] rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                >
                  <option value="">{t("Bitte wählen", "Please select")}</option>
                  {servicesData.map((service) => (
                    <option key={service.id} value={service.slug}>
                      {language === 'de' ? service.nameDe : service.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                  {t("Beschreibung Ihres Projekts", "Project Description")} *
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={5}
                  className="w-full bg-white/[0.05] border-2 border-white/[0.15] rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                  placeholder={t(
                    "Beschreiben Sie Ihr Projekt so detailliert wie möglich...",
                    "Describe your project in as much detail as possible..."
                  )}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
                {isSubmitting
                  ? t("Wird gesendet...", "Sending...")
                  : t("Kostenlose Angebote erhalten", "Get Free Quotes")}
              </button>

              <p className="text-xs text-center text-muted-foreground">
                {t(
                  "100% kostenlos und unverbindlich. Wir geben Ihre Daten niemals weiter.",
                  "100% free and non-binding. We never share your data."
                )}
              </p>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default QuoteRequest;
