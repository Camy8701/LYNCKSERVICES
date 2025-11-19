import { Link, useNavigate } from 'react-router-dom';
import type { LeadWithService } from '@/lib/database';
import { useLanguage } from '@/contexts/LanguageContext';

interface LeadsTableProps {
  leads: LeadWithService[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

async function copyLeadToClipboard(lead: LeadWithService) {
  const timelineText = 
    lead.timeline === 'sofort' ? 'Sofort / Notfall' :
    lead.timeline === 'diese_woche' ? 'Diese Woche' :
    lead.timeline === 'diesen_monat' ? 'Diesen Monat' : 'Flexibel';

  const text = `🔥 NEUE ANFRAGE #${lead.id.slice(0, 8)}

👤 ${lead.name}
📞 ${lead.phone}
📧 ${lead.email || '—'}
📍 ${lead.city} ${lead.plz}

🔧 Service: ${lead.service?.name}
⏰ ${timelineText}

📝 Beschreibung:
${lead.service_details}

⚡ JETZT ANRUFEN!`;

  try {
    await navigator.clipboard.writeText(text);
    alert('✅ Lead in Zwischenablage kopiert!');
  } catch (err) {
    console.error('Failed to copy:', err);
    alert('❌ Fehler beim Kopieren');
  }
}

export default function LeadsTable({ leads, currentPage, totalPages, totalCount }: LeadsTableProps) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  if (leads.length === 0) {
    return (
      <div className="bg-card backdrop-blur-md border border-border rounded-2xl p-12 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {t('Keine Leads gefunden', 'No leads found')}
        </h3>
        <p className="text-muted-foreground">
          {t('Versuchen Sie, die Filter anzupassen', 'Try adjusting the filters')}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-card backdrop-blur-md border border-border rounded-2xl overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30 border-b border-border">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">{t('Datum', 'Date')}</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">{t('Name', 'Name')}</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">{t('Telefon', 'Phone')}</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">{t('Service', 'Service')}</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">{t('Stadt', 'City')}</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">{t('Status', 'Status')}</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase">{t('Aktionen', 'Actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-muted/20 transition-colors">
                  <td className="py-4 px-4">
                    <span className="text-xs font-mono text-muted-foreground">
                      #{lead.id.slice(0, 8)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-muted-foreground">
                      {formatDateTime(lead.created_at)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-foreground">
                      {lead.name}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <a 
                      href={`tel:${lead.phone}`}
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      {lead.phone}
                    </a>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span>{lead.service?.icon}</span>
                      <span className="text-sm text-foreground whitespace-nowrap">
                        {lead.service?.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-muted-foreground">
                      {lead.city}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                      lead.status === 'new' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      lead.status === 'contacted' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {lead.status === 'new' ? t('Neu', 'New') : 
                       lead.status === 'contacted' ? t('Kontaktiert', 'Contacted') : t('Umgewandelt', 'Converted')}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => copyLeadToClipboard(lead)}
                        className="p-2 text-muted-foreground hover:text-primary hover:bg-muted/20 rounded-lg transition-all"
                        title={t('In Zwischenablage kopieren', 'Copy to clipboard')}
                      >
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      </button>
                      <Link
                        to={`/admin/leads/${lead.id}`}
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/20 rounded-lg transition-all"
                        title={t('Details anzeigen', 'Show details')}
                      >
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            {t('Zeige', 'Showing')} {((currentPage - 1) * 25) + 1} {t('bis', 'to')} {Math.min(currentPage * 25, totalCount)} {t('von', 'of')} {totalCount}
          </div>
          <div className="flex gap-2">
            {currentPage > 1 && (
              <button
                onClick={() => {
                  const params = new URLSearchParams(window.location.search);
                  params.set('page', String(currentPage - 1));
                  navigate(`/admin/leads?${params.toString()}`);
                }}
                className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-all"
              >
                ← {t('Zurück', 'Back')}
              </button>
            )}
            <span className="px-4 py-2 bg-primary/20 text-primary rounded-lg font-medium">
              {t('Seite', 'Page')} {currentPage} {t('von', 'of')} {totalPages}
            </span>
            {currentPage < totalPages && (
              <button
                onClick={() => {
                  const params = new URLSearchParams(window.location.search);
                  params.set('page', String(currentPage + 1));
                  navigate(`/admin/leads?${params.toString()}`);
                }}
                className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-all"
              >
                {t('Weiter', 'Next')} →
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
