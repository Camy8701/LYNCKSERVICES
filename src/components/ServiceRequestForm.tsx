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
    city: '',
    plz: '',
    service_details: '',
    timeline: 'diese_woche' as const
  });
  
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
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t(
        'Bitte geben Sie eine gültige E-Mail-Adresse ein',
        'Please enter a valid email address'
      );
    }
    
    if (!/^[0-9]{5}$/.test(formData.plz)) {
      newErrors.plz = t(
        'PLZ muss genau 5 Ziffern haben',
        'Postal code must be exactly 5 digits'
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
          email: formData.email.trim() || null,
          city: formData.city,
          plz: formData.plz,
          service_id: service.id,
          service_details: formData.service_details.trim(),
          timeline: formData.timeline
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
      
      {/* Email Field (Optional) */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {t('E-Mail', 'Email')} <span className="text-muted-foreground text-xs">({t('optional', 'optional')})</span>
        </label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="ihre.email@beispiel.de"
          className={errors.email ? 'border-destructive' : ''}
        />
        {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
      </div>
      
      {/* PLZ and City Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* PLZ */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {t('Postleitzahl', 'Postal code')} <span className="text-destructive">*</span>
          </label>
          <Input
            type="text"
            pattern="[0-9]*"
            maxLength={5}
            value={formData.plz}
            onChange={(e) => setFormData({ ...formData, plz: e.target.value.replace(/\D/g, '') })}
            placeholder="10115"
            className={errors.plz ? 'border-destructive' : ''}
          />
          {errors.plz && <p className="mt-1 text-sm text-destructive">{errors.plz}</p>}
        </div>
        
        {/* City */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {t('Stadt', 'City')} <span className="text-destructive">*</span>
          </label>
          <select
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className={`w-full h-10 rounded-md border ${errors.city ? 'border-destructive' : 'border-input'} bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
          >
            <option value="">{t('Stadt auswählen...', 'Select city...')}</option>
            {cities.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          {errors.city && <p className="mt-1 text-sm text-destructive">{errors.city}</p>}
        </div>
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
