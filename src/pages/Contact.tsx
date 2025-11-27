import PageLayout from "@/components/PageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t("Nachricht gesendet", "Message sent"),
      description: t(
        "Wir melden uns so schnell wie möglich bei Ihnen.",
        "We will get back to you as soon as possible."
      )
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <PageLayout>
      <div className="px-4 sm:px-6 lg:px-12 py-12">
        <div className="glass-card rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground font-serif font-normal mb-6">
            {t("Kontakt", "Contact")}
          </h1>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t("E-Mail", "Email")}</p>
                  <a href="mailto:info@lynckservices.de" className="text-foreground hover:text-primary transition-colors">
                    info@lynckservices.de
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t("Telefon", "Phone")}</p>
                  <a href="tel:+493012345678" className="text-foreground hover:text-primary transition-colors">
                    +49 30 1234 5678
                  </a>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  {t("Name", "Name")}
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  {t("E-Mail", "Email")}
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  {t("Betreff", "Subject")}
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  {t("Nachricht", "Message")}
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                <Send className="w-4 h-4" />
                {t("Nachricht senden", "Send Message")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;
