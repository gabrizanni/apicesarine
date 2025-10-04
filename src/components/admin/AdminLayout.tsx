import { Routes, Route } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';
import { AdminDashboard } from './AdminDashboard';
import { BookingRequestsTable } from './bookings/BookingRequestsTable';

interface AdminLayoutProps {
  onLogout: () => void;
}

const AdminContenuti = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Contenuti</h2>
    <p className="text-muted-foreground">Gestione workshop, educatori e post in arrivo...</p>
  </div>
);

const AdminMedia = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Media</h2>
    <p className="text-muted-foreground">Gestione materiali e galleria in arrivo...</p>
  </div>
);

const AdminImpostazioni = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Impostazioni</h2>
    <p className="text-muted-foreground">Configurazioni sistema in arrivo...</p>
  </div>
);

export const AdminLayout = ({ onLogout }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col">
        <AdminTopbar onLogout={onLogout} />
        
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/prenotazioni" element={<BookingRequestsTable />} />
              <Route path="/contenuti" element={<AdminContenuti />} />
              <Route path="/media" element={<AdminMedia />} />
              <Route path="/impostazioni" element={<AdminImpostazioni />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};