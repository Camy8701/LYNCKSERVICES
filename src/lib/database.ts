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

export async function getLeadById(id: string) {
  const { data, error } = await supabase
    .from('leads')
    .select(`
      *,
      service:services(*)
    `)
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching lead:', error);
    throw error;
  }
  return data as LeadWithService;
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

// ============================================
// ADMIN DASHBOARD STATISTICS
// ============================================

export async function getDashboardStats() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const thisWeekStart = new Date(today);
  thisWeekStart.setDate(today.getDate() - today.getDay()); // Sunday
  
  const lastWeekStart = new Date(thisWeekStart);
  lastWeekStart.setDate(thisWeekStart.getDate() - 7);
  
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  
  // Leads today
  const { count: leadsToday } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', today.toISOString());
  
  // Leads yesterday (for comparison)
  const { count: leadsYesterday } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', yesterday.toISOString())
    .lt('created_at', today.toISOString());
  
  // Leads this week
  const { count: leadsThisWeek } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', thisWeekStart.toISOString());
  
  // Leads last week (for comparison)
  const { count: leadsLastWeek } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', lastWeekStart.toISOString())
    .lt('created_at', thisWeekStart.toISOString());
  
  // Active companies
  const { count: activeCompanies } = await supabase
    .from('companies')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);
  
  // Revenue this week (sum of lead assignments)
  const { data: assignmentsThisWeek } = await supabase
    .from('lead_assignments')
    .select('amount_charged')
    .gte('assigned_at', thisWeekStart.toISOString());
  
  const revenueThisWeek = assignmentsThisWeek?.reduce(
    (sum, assignment) => sum + Number(assignment.amount_charged || 0),
    0
  ) || 0;
  
  // Revenue last week (for comparison)
  const { data: assignmentsLastWeek } = await supabase
    .from('lead_assignments')
    .select('amount_charged')
    .gte('assigned_at', lastWeekStart.toISOString())
    .lt('assigned_at', thisWeekStart.toISOString());
  
  const revenueLastWeek = assignmentsLastWeek?.reduce(
    (sum, assignment) => sum + Number(assignment.amount_charged || 0),
    0
  ) || 0;
  
  return {
    leadsToday: leadsToday || 0,
    leadsYesterday: leadsYesterday || 0,
    leadsThisWeek: leadsThisWeek || 0,
    leadsLastWeek: leadsLastWeek || 0,
    activeCompanies: activeCompanies || 0,
    revenueThisWeek,
    revenueLastWeek,
  };
}

// ============================================
// RECENT LEADS (for dashboard table)
// ============================================

export async function getRecentLeadsForDashboard(limit: number = 10) {
  const { data, error } = await supabase
    .from('leads')
    .select(`
      *,
      service:services(name, name_en, icon, slug)
    `)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data as LeadWithService[];
}
