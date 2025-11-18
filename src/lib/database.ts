import { supabase } from '@/integrations/supabase/client';

// ============================================
// TYPES
// ============================================

export type Service = {
  id: string;
  name: string;
  name_en: string;
  slug: string;
  description: string | null;
  description_en: string | null;
  is_active: boolean;
  icon: string;
  lead_price_shared: number;
  created_at: string;
};

export type City = {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
};

export type Lead = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  city: string;
  plz: string;
  service_id: string;
  service_details: string;
  timeline: 'sofort' | 'diese_woche' | 'diesen_monat' | 'flexibel';
  status: 'new' | 'contacted' | 'converted';
  source: string;
  admin_notes: string | null;
};

export type LeadWithService = Lead & {
  service: Service;
};

// ============================================
// SERVICES
// ============================================

export async function getServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('name', { ascending: true });
  
  if (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
  return data as Service[];
}

export async function getServiceBySlug(slug: string) {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();
  
  if (error) {
    console.error('Error fetching service:', error);
    throw error;
  }
  return data as Service;
}

// ============================================
// CITIES
// ============================================

export async function getCities() {
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('is_active', true)
    .order('name', { ascending: true });
  
  if (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
  return data as City[];
}

// ============================================
// LEADS
// ============================================

export async function createLead(leadData: Omit<Lead, 'id' | 'created_at' | 'status' | 'source' | 'admin_notes'>) {
  const { data, error } = await supabase
    .from('leads')
    .insert({
      ...leadData,
      status: 'new',
      source: 'website'
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating lead:', error);
    throw error;
  }
  
  // Trigger webhook if configured
  if (data) {
    await triggerWebhook(data as Lead);
  }
  
  return data as Lead;
}

// ============================================
// WEBHOOK TRIGGER (for Zapier/n8n)
// ============================================

export async function triggerWebhook(leadData: Lead) {
  const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.log('No webhook URL configured, skipping webhook trigger');
    return;
  }
  
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lead_id: leadData.id,
        name: leadData.name,
        phone: leadData.phone,
        email: leadData.email,
        city: leadData.city,
        plz: leadData.plz,
        service_id: leadData.service_id,
        details: leadData.service_details,
        timeline: leadData.timeline,
        timestamp: leadData.created_at
      })
    });
    
    console.log(`Webhook triggered for lead #${leadData.id}`);
  } catch (error) {
    console.error('Webhook trigger failed:', error);
    // Don't throw error - webhook failure shouldn't break lead creation
  }
}
