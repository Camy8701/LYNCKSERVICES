import { Mail, Phone } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="consultation" className="mt-24 px-4 sm:px-6 lg:px-12 mb-16">
      <div className="glass-card rounded-3xl p-8 lg:p-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/25"
            >
              <Mail className="w-5 h-5 stroke-[1.5] group-hover:scale-110 transition-transform duration-300" />
              Contact Us
            </a>
            <a
              href="#"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-lg font-medium border border-border hover:border-primary hover:text-primary transition-all duration-300"
            >
              <Phone className="w-5 h-5 stroke-[1.5] group-hover:scale-110 transition-transform duration-300" />
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
