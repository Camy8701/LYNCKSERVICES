import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, ArrowRight } from 'lucide-react';
import type { Service, City } from '@/lib/database';

interface ServiceRequestFormProps {
  service: Service;
  cities: City[];
}

export default function ServiceRequestForm({ service, cities }: ServiceRequestFormProps) {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    state: '',
    city: '',
    plz: '',
    service_details: '',
    timeline: 'diese_woche' as const,
    property_ownership: '',
    property_type: '',
    decision_maker: '',
    property_age: ''
  });

  // Cities by state
  const citiesByState: Record<string, string[]> = {
    hesse: [
      'Frankfurt am Main',
      'Wiesbaden',
      'Kassel',
      'Darmstadt',
      'Offenbach am Main',
      'Hanau',
      'Gießen',
      'Marburg',
      'Fulda',
      'Rüsselsheim am Main'
    ],
    nrw: [
      'Köln',
      'Aachen',
      'Düsseldorf',
      'Dortmund',
      'Essen',
      'Duisburg',
      'Bochum',
      'Wuppertal',
      'Bonn',
      'Münster'
    ]
  };

  const availableCities = formData.state ? citiesByState[formData.state] || [] : [];
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [gdprConsent, setGdprConsent] = useState(false);
  
  // Validation function
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.name.trim().length < 2) {
      newErrors.name = t(
        'Name muss mindestens 2 Zeichen lang sein',
        'Name must be at least 2 characters long'
      );
    }
    
    if (!/^(\+49|0)[0-9]{9,14}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = t(
        'Bitte geben Sie eine gültige deutsche Telefonnummer ein',
        'Please enter a valid German phone number'
      );
    }
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t(
        'Bitte geben Sie eine gültige E-Mail-Adresse ein',
        'Please enter a valid email address'
      );
    }

    if (!formData.property_ownership) {
      newErrors.property_ownership = t(
        'Bitte wählen Sie Ihren Eigentumsstatus aus',
        'Please select your ownership status'
      );
    }

    if (formData.property_ownership === 'renter') {
      newErrors.property_ownership = t(
        'Dieses Angebot ist nur für Immobilieneigentümer verfügbar',
        'This service is only available for property owners'
      );
    }

    if (!formData.property_type) {
      newErrors.property_type = t(
        'Bitte wählen Sie Ihren Immobilientyp aus',
        'Please select your property type'
      );
    }

    if (!formData.decision_maker) {
      newErrors.decision_maker = t(
        'Bitte wählen Sie aus, ob Sie Entscheidungsträger sind',
        'Please select if you are the decision maker'
      );
    }

    if (formData.decision_maker === 'no') {
      newErrors.decision_maker = t(
        'Der Entscheidungsträger muss das Angebot anfordern',
        'The decision maker must request the quote'
      );
    }
    
    // PLZ is now optional
    if (formData.plz && !/^[0-9]{5}$/.test(formData.plz)) {
      newErrors.plz = t(
        'PLZ muss genau 5 Ziffern haben',
        'Postal code must be exactly 5 digits'
      );
    }

    if (!formData.state) {
      newErrors.state = t(
        'Bitte wählen Sie ein Bundesland aus',
        'Please select a state'
      );
    }

    if (!formData.city) {
      newErrors.city = t(
        'Bitte wählen Sie eine Stadt aus',
        'Please select a city'
      );
    }
    
    if (formData.service_details.trim().length < 20) {
      newErrors.service_details = t(
        'Bitte beschreiben Sie Ihr Projekt (mindestens 20 Zeichen)',
        'Please describe your project (at least 20 characters)'
      );
    }
    
    if (!gdprConsent) {
      newErrors.gdpr = t(
        'Bitte stimmen Sie der Datenschutzerklärung zu',
        'Please accept the privacy policy'
      );
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Call edge function for server-side validation and secure lead creation
      const { data, error: functionError } = await supabase.functions.invoke('create-lead', {
        body: {
          name: formData.name.trim(),
          phone: formData.phone.replace(/\s/g, ''),
          email: formData.email.trim(),
          state: formData.state,
          city: formData.city,
          plz: formData.plz || null,
          service_id: service.id,
          service_details: formData.service_details.trim(),
          timeline: formData.timeline,
          property_ownership: formData.property_ownership,
          property_type: formData.property_type,
          decision_maker: formData.decision_maker,
          property_age: formData.property_age || null
        }
      });

      if (functionError) {
        console.error('Edge function error:', functionError);
        throw new Error(functionError.message || 'Failed to submit form');
      }

      console.log('Lead created successfully:', data.lead_id);
      
      // Redirect to thank you page
      navigate(`/danke?lead_id=${data.lead_id}`);
      
    } catch (err) {
      console.error('Error creating lead:', err);
      setError(t(
        'Es gab einen Fehler. Bitte versuchen Sie es erneut.',
        'There was an error. Please try again.'
      ));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-destructive text-sm">
          {error}
        </div>
      )}
      
      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {t('Ihr vollständiger Name', 'Your full name')} <span className="text-destructive">*</span>
        </label>
        <Input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder={t('Max Mustermann', 'John Doe')}
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
      </div>
      
      {/* Phone Field */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {t('Telefonnummer', 'Phone number')} <span className="text-destructive">*</span>
        </label>
        <Input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="+49 151 12345678"
          className={errors.phone ? 'border-destructive' : ''}
        />
        {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone}</p>}
      </div>
      
      {/* Email Field (Mandatory) */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {t('E-Mail', 'Email')} <span className="text-destructive">*</span>
        </label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="max@example.com"
          className={errors.email ? 'border-destructive' : ''}
        />
        {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
      </div>
      
      {/* Property Ownership - QUALIFYING QUESTION */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          {t('Sind Sie Eigentümer der Immobilie?', 'Are you the property owner?')} <span className="text-destructive">*</span>
        </label>
        <div className="space-y-3">
          <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
            formData.property_ownership === 'owner'
              ? 'border-primary bg-primary/5'
              : 'border-input hover:border-primary/50'
          }`}>
            <input
              type="radio"
              name="property_ownership"
              value="owner"
              checked={formData.property_ownership === 'owner'}
              onChange={(e) => setFormData({ ...formData, property_ownership: e.target.value })}
              className="w-4 h-4 text-primary focus:ring-2 focus:ring-ring"
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-foreground">
                {t('Ja, ich bin Eigentümer', 'Yes, I am the owner')}
              </span>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t('Ich besitze die Immobilie', 'I own the property')}
              </p>
            </div>
          </label>

          <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
            formData.property_ownership === 'renter'
              ? 'border-destructive bg-destructive/5'
              : 'border-input hover:border-input/50'
          }`}>
            <input
              type="radio"
              name="property_ownership"
              value="renter"
              checked={formData.property_ownership === 'renter'}
              onChange={(e) => setFormData({ ...formData, property_ownership: e.target.value })}
              className="w-4 h-4 text-primary focus:ring-2 focus:ring-ring"
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-foreground">
                {t('Nein, ich bin Mieter', 'No, I am a renter/tenant')}
              </span>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t('Ich miete die Immobilie', 'I rent the property')}
              </p>
            </div>
          </label>
        </div>
        {errors.property_ownership && (
          <div className="mt-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive">{errors.property_ownership}</p>
          </div>
        )}
      </div>

      {/* Property Type - QUALIFYING QUESTION */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {t('Art der Immobilie', 'Property type')} <span className="text-destructive">*</span>
        </label>
        <select
          value={formData.property_type}
          onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
          className={`w-full h-10 rounded-md border ${errors.property_type ? 'border-destructive' : 'border-input'} bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
        >
          <option value="">{t('Immobilientyp auswählen...', 'Select property type...')}</option>
          <option value="single_family">{t('Einfamilienhaus', 'Single-family house')}</option>
          <option value="apartment">{t('Eigentumswohnung', 'Apartment/Condo')}</option>
          <option value="multi_family">{t('Mehrfamilienhaus', 'Multi-family house')}</option>
          <option value="commercial">{t('Gewerbeimmobilie', 'Commercial property')}</option>
        </select>
        {errors.property_type && <p className="mt-1 text-sm text-destructive">{errors.property_type}</p>}
      </div>

      {/* Property Age - OPTIONAL (helps contractors estimate) */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {t('Alter der Immobilie', 'Property age')} <span className="text-muted-foreground text-xs">({t('optional', 'optional')})</span>
        </label>
        <select
          value={formData.property_age}
          onChange={(e) => setFormData({ ...formData, property_age: e.target.value })}
          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="">{t('Baujahr auswählen...', 'Select construction year...')}</option>
          <option value="before_1980">{t('Vor 1980', 'Before 1980')}</option>
          <option value="1980_2000">{t('1980 - 2000', '1980 - 2000')}</option>
          <option value="2000_2010">{t('2000 - 2010', '2000 - 2010')}</option>
          <option value="after_2010">{t('Nach 2010', 'After 2010')}</option>
          <option value="not_sure">{t('Weiß nicht', 'Not sure')}</option>
        </select>
        <p className="mt-1 text-xs text-muted-foreground">
          {t('Hilft uns, passende Fachleute zu finden', 'Helps us find suitable professionals')}
        </p>
      </div>

      {/* Decision Maker - QUALIFYING QUESTION */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          {t('Sind Sie der Entscheidungsträger für dieses Projekt?', 'Are you the decision maker for this project?')} <span className="text-destructive">*</span>
        </label>
        <div className="space-y-3">
          <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
            formData.decision_maker === 'yes'
              ? 'border-primary bg-primary/5'
              : 'border-input hover:border-primary/50'
          }`}>
            <input
              type="radio"
              name="decision_maker"
              value="yes"
              checked={formData.decision_maker === 'yes'}
              onChange={(e) => setFormData({ ...formData, decision_maker: e.target.value })}
              className="w-4 h-4 text-primary focus:ring-2 focus:ring-ring"
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-foreground">
                {t('Ja, ich entscheide', 'Yes, I decide')}
              </span>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t('Ich kann dieses Projekt beauftragen', 'I can hire for this project')}
              </p>
            </div>
          </label>

          <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
            formData.decision_maker === 'no'
              ? 'border-destructive bg-destructive/5'
              : 'border-input hover:border-input/50'
          }`}>
            <input
              type="radio"
              name="decision_maker"
              value="no"
              checked={formData.decision_maker === 'no'}
              onChange={(e) => setFormData({ ...formData, decision_maker: e.target.value })}
              className="w-4 h-4 text-primary focus:ring-2 focus:ring-ring"
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-foreground">
                {t('Nein, jemand anderes entscheidet', 'No, someone else decides')}
              </span>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t('Ich muss Zustimmung einholen', 'I need to get approval')}
              </p>
            </div>
          </label>
        </div>
        {errors.decision_maker && (
          <div className="mt-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive">{errors.decision_maker}</p>
          </div>
        )}
      </div>

      {/* State Selection */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {t('Bundesland', 'State')} <span className="text-destructive">*</span>
        </label>
        <select
          value={formData.state}
          onChange={(e) => setFormData({ ...formData, state: e.target.value, city: '' })}
          className={`w-full h-10 rounded-md border ${errors.state ? 'border-destructive' : 'border-input'} bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
        >
          <option value="">{t('Bundesland auswählen...', 'Select state...')}</option>
          <option value="hesse">{t('Hessen', 'Hesse')}</option>
          <option value="nrw">{t('Nordrhein-Westfalen', 'North Rhine-Westphalia')}</option>
        </select>
        {errors.state && <p className="mt-1 text-sm text-destructive">{errors.state}</p>}
      </div>

      {/* City Selection */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {t('Stadt', 'City')} <span className="text-destructive">*</span>
        </label>
        <select
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          disabled={!formData.state}
          className={`w-full h-10 rounded-md border ${errors.city ? 'border-destructive' : 'border-input'} bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <option value="">{t('Stadt auswählen...', 'Select city...')}</option>
          {availableCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {errors.city && <p className="mt-1 text-sm text-destructive">{errors.city}</p>}
        {!formData.state && (
          <p className="mt-1 text-xs text-muted-foreground">
            {t('Bitte wählen Sie zuerst ein Bundesland', 'Please select a state first')}
          </p>
        )}
      </div>

      {/* PLZ (Optional) */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {t('Postleitzahl', 'Postal code')} <span className="text-muted-foreground text-xs">({t('optional', 'optional')})</span>
        </label>
        <Input
          type="text"
          pattern="[0-9]*"
          maxLength={5}
          value={formData.plz}
          onChange={(e) => setFormData({ ...formData, plz: e.target.value.replace(/\D/g, '') })}
          placeholder="60311"
          className={errors.plz ? 'border-destructive' : ''}
        />
        {errors.plz && <p className="mt-1 text-sm text-destructive">{errors.plz}</p>}
      </div>
      
      {/* Service Details Textarea */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {t('Beschreiben Sie Ihr Projekt', 'Describe your project')} <span className="text-destructive">*</span>
        </label>
        <Textarea
          rows={4}
          value={formData.service_details}
          onChange={(e) => setFormData({ ...formData, service_details: e.target.value })}
          placeholder={t(
            'Z.B. Heizung ausgefallen, Notfall, 3-Zimmer Wohnung, Baujahr 2010...',
            'E.g. Heating system broken, emergency, 3-room apartment, built in 2010...'
          )}
          className={errors.service_details ? 'border-destructive' : ''}
        />
        <div className="flex justify-between items-center mt-1">
          {errors.service_details ? (
            <p className="text-sm text-destructive">{errors.service_details}</p>
          ) : (
            <p className="text-sm text-muted-foreground">
              {formData.service_details.length} / 20 {t('Zeichen (Minimum)', 'characters (minimum)')}
            </p>
          )}
        </div>
      </div>
      
      {/* Timeline Dropdown */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {t('Wann benötigen Sie die Dienstleistung?', 'When do you need the service?')} <span className="text-destructive">*</span>
        </label>
        <select
          value={formData.timeline}
          onChange={(e) => setFormData({ ...formData, timeline: e.target.value as any })}
          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="sofort">{t('Sofort / Notfall', 'Immediately / Emergency')}</option>
          <option value="diese_woche">{t('Diese Woche', 'This week')}</option>
          <option value="diesen_monat">{t('Diesen Monat', 'This month')}</option>
          <option value="flexibel">{t('Flexibel / Ich plane nur', 'Flexible / Just planning')}</option>
        </select>
      </div>
      
      {/* GDPR Consent Checkbox */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={gdprConsent}
            onChange={(e) => setGdprConsent(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
          />
          <span className="text-sm text-muted-foreground">
            {t(
              'Ich stimme zu, dass meine Daten an Fachleute weitergeleitet werden.',
              'I agree that my data will be forwarded to professionals.'
            )}{' '}
            <a href="/privacy" target="_blank" className="text-primary hover:underline">
              {t('Datenschutz', 'Privacy Policy')}
            </a>
            <span className="text-destructive"> *</span>
          </span>
        </label>
        {errors.gdpr && <p className="mt-1 text-sm text-destructive ml-7">{errors.gdpr}</p>}
      </div>
      
      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full"
        size="lg"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {t('Wird gesendet...', 'Sending...')}
          </>
        ) : (
          <>
            {t('Kostenlose Angebote erhalten', 'Get Free Quotes')}
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </Button>
      
      <p className="text-center text-xs text-muted-foreground">
        {t('Kostenlos & unverbindlich • Keine versteckten Kosten', 'Free & non-binding • No hidden costs')}
      </p>
    </form>
  );
}
