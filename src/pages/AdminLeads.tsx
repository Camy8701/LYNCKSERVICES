import AdminLayout from '@/components/AdminLayout';

const AdminLeads = () => {
  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-3xl font-instrument-serif text-foreground mb-4">
          Leads
        </h1>
        <p className="text-muted-foreground mb-8">
          Verwalten Sie alle eingehenden Anfragen
        </p>
        
        <div className="bg-white/[0.03] dark:bg-white/[0.03] backdrop-blur-md border border-white/[0.06] rounded-2xl p-8 text-center">
          <div className="text-5xl mb-4">📋</div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Lead-Verwaltung kommt in Prompt 9
          </h2>
          <p className="text-muted-foreground">
            Hier können Sie alle Leads anzeigen, filtern und Unternehmen zuweisen
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminLeads;
