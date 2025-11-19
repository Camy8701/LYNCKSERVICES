import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getServiceBySlug, getCities } from '@/lib/database';
import { getIconComponent } from '@/lib/serviceIcons';
import ServiceRequestForm from '@/components/ServiceRequestForm';
import PageLayout from '@/components/PageLayout';
import { Check, Info, Phone } from 'lucide-react';
import type { Service, City } from '@/lib/database';
import { SEO, ServiceSchema, BreadcrumbSchema } from '@/lib/seo';

export default function ServiceRequest() {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  const [service, setService] = useState<Service | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      
      setLoading(true);
      try {
        const [serviceData, citiesData] = await Promise.all([
          getServiceBySlug(slug),
          getCities()
        ]);
        
        if (!serviceData) {
          setNotFound(true);
        } else {
          setService(serviceData);
          setCities(citiesData);
        }
      } catch (error) {
        console.error('Error loading service:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [slug]);

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-pulse text-gray-400">Loading...</div>
        </div>
      </PageLayout>
    );
  }

  if (notFound || !service) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center">
            <h1 className="text-4xl font-instrument-serif text-white mb-4">
              {t('Service nicht gefunden', 'Service not found')}
            </h1>
            <Link to="/" className="text-emerald-400 hover:underline">
              {t('Zurück zur Startseite', 'Back to homepage')}
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  const Icon = getIconComponent(service.icon);
  const serviceName = language === 'de' ? service.name : service.name_en;
  const serviceDescription = language === 'de' ? service.description : service.description_en;

  const seoTitle = language === 'de' 
    ? `${serviceName} in Deutschland | Angebote vergleichen | Lynck Services`
    : `${serviceName} in Germany | Compare Quotes | Lynck Services`;
  
  const seoDescription = serviceDescription || (language === 'de'
    ? `Finden Sie geprüfte Handwerker für ${serviceName}. Kostenlos bis zu 3 Angebote vergleichen. Schnell, einfach und unverbindlich.`
    : `Find verified contractors for ${serviceName}. Compare up to 3 quotes for free. Fast, easy and non-binding.`);

  return (
    <PageLayout>
      <>
        <SEO
          title={seoTitle}
          description={seoDescription}
          canonicalUrl={`/service/${service.slug}`}
          ogType="website"
        />
        <ServiceSchema
          service={{
            name: serviceName,
            description: seoDescription,
            slug: service.slug
          }}
        />
        <BreadcrumbSchema
          items={[
            { name: 'Home', url: '/' },
            { name: serviceName, url: `/service/${service.slug}` }
          ]}
        />
      </>
      <main className="flex-1 overflow-y-auto">
        {/* Breadcrumb */}
        <nav className="px-4 md:px-8 py-4">
          <div className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              {t('Home', 'Home')}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{serviceName}</span>
          </div>
        </nav>

        {/* Main Content - 2 Column Layout */}
        <div className="px-4 md:px-8 py-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            
            {/* LEFT COLUMN - Form (2/3 width on desktop) */}
            <div className="lg:col-span-2">
              {/* Page Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-12 h-12 text-primary" />
                  <h1 className="text-4xl md:text-5xl font-instrument-serif text-foreground">
                    {serviceName}
                  </h1>
                </div>
                
                <p className="text-lg text-muted-foreground mb-6">
                  {serviceDescription}
                </p>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    {t('Kostenlos & unverbindlich', '100% Free & non-binding')}
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    {t('Bis zu 3 Angebote', 'Up to 3 quotes')}
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    {t('Geprüfte Fachleute', 'Verified professionals')}
                  </span>
                </div>
              </div>
              
              {/* Lead Capture Form Component */}
              <div className="bg-card backdrop-blur-md border border-border rounded-3xl p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  {t('Angebot anfordern', 'Request Quote')}
                </h2>
                
                <ServiceRequestForm service={service} cities={cities} />
              </div>
            </div>
            
            {/* RIGHT COLUMN - Sidebar (1/3 width on desktop) */}
            <div className="lg:col-span-1">
              {/* What Happens Next Card */}
              <div className="bg-card backdrop-blur-md border border-border rounded-2xl p-6 mb-6 lg:sticky lg:top-8">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  {t('Was passiert als nächstes?', 'What happens next?')}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm font-semibold">1</span>
                    <div>
                      <p className="text-foreground text-sm font-medium">
                        {t('Ihre Anfrage wird geprüft', 'Your request is reviewed')}
                      </p>
                      <p className="text-muted-foreground text-xs mt-1">
                        {t('Wir prüfen Ihre Anfrage und finden passende Fachleute', 'We review your request and find suitable professionals')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm font-semibold">2</span>
                    <div>
                      <p className="text-foreground text-sm font-medium">
                        {t('Fachleute werden benachrichtigt', 'Professionals are notified')}
                      </p>
                      <p className="text-muted-foreground text-xs mt-1">
                        {t('Qualifizierte Handwerker aus Ihrer Region erhalten Ihre Anfrage', 'Qualified contractors from your region receive your request')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm font-semibold">3</span>
                    <div>
                      <p className="text-foreground text-sm font-medium">
                        {t('Sie erhalten Angebote', 'You receive quotes')}
                      </p>
                      <p className="text-muted-foreground text-xs mt-1">
                        {t('Innerhalb von 24 Stunden melden sich Fachleute bei Ihnen', 'Within 24 hours professionals will contact you')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm font-semibold">4</span>
                    <div>
                      <p className="text-foreground text-sm font-medium">
                        {t('Vergleichen & beauftragen', 'Compare & hire')}
                      </p>
                      <p className="text-muted-foreground text-xs mt-1">
                        {t('Wählen Sie das beste Angebot für Ihr Projekt', 'Choose the best quote for your project')}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground">
                      {t('Tipp:', 'Tip:')}
                    </span>
                    {t('Halten Sie Ihr Telefon bereit!', 'Keep your phone ready!')}
                  </p>
                </div>
              </div>
              
              {/* Trust Badges */}
              <div className="bg-card backdrop-blur-md border border-border rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">
                  {t('Ihre Vorteile', 'Your Benefits')}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary" />
                    {t('100% kostenlos', '100% free')}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary" />
                    {t('Geprüfte Fachleute', 'Verified professionals')}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary" />
                    {t('Keine Verpflichtung', 'No obligation')}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary" />
                    {t('Schnelle Antwort (24h)', 'Fast response (24h)')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
