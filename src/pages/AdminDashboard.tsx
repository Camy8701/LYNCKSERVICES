import AdminLayout from '@/components/AdminLayout';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-3xl font-instrument-serif text-foreground mb-4">
          Dashboard
        </h1>
        <p className="text-muted-foreground mb-8">
          Willkommen im Admin-Bereich von Lynck Services
        </p>

        {/* Placeholder Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/[0.03] dark:bg-white/[0.03] backdrop-blur-md border border-white/[0.06] rounded-2xl p-6">
            <div className="text-muted-foreground text-sm mb-2">Leads Heute</div>
            <div className="text-3xl font-bold text-foreground">0</div>
            <div className="text-xs text-muted-foreground mt-2">+0% vs. gestern</div>
          </div>

          <div className="bg-white/[0.03] dark:bg-white/[0.03] backdrop-blur-md border border-white/[0.06] rounded-2xl p-6">
            <div className="text-muted-foreground text-sm mb-2">Leads diese Woche</div>
            <div className="text-3xl font-bold text-foreground">0</div>
            <div className="text-xs text-muted-foreground mt-2">+0% vs. letzte Woche</div>
          </div>

          <div className="bg-white/[0.03] dark:bg-white/[0.03] backdrop-blur-md border border-white/[0.06] rounded-2xl p-6">
            <div className="text-muted-foreground text-sm mb-2">Aktive Unternehmen</div>
            <div className="text-3xl font-bold text-foreground">0</div>
            <div className="text-xs text-primary mt-2">→ Unternehmen hinzufügen</div>
          </div>

          <div className="bg-white/[0.03] dark:bg-white/[0.03] backdrop-blur-md border border-white/[0.06] rounded-2xl p-6">
            <div className="text-muted-foreground text-sm mb-2">Umsatz (Woche)</div>
            <div className="text-3xl font-bold text-foreground">€0</div>
            <div className="text-xs text-muted-foreground mt-2">0 Zuweisungen</div>
          </div>
        </div>

        {/* Placeholder Message */}
        <div className="mt-8 bg-white/[0.03] dark:bg-white/[0.03] backdrop-blur-md border border-white/[0.06] rounded-2xl p-8 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Admin-System erfolgreich eingerichtet!
          </h2>
          <p className="text-muted-foreground mb-4">
            Ihr Dashboard wird in Prompt 9 mit echten Daten gefüllt
          </p>
          <div className="flex gap-4 justify-center text-sm text-muted-foreground flex-wrap">
            <span>📊 Dashboard mit Statistiken</span>
            <span>📋 Lead-Verwaltung</span>
            <span>🏢 Unternehmen verwalten</span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
