import { Routes, Route } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';
import { AdminDashboard } from './AdminDashboard';
import { BookingRequestsTable } from './BookingRequestsTable';

interface AdminLayoutProps {
  onLogout: () => void;
}

import { ContentManagement } from './ContentManagement';
import { AdminSettings } from './AdminSettings';
import { GalleryManager } from './GalleryManager';
import MaterialManager from './MaterialManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminContenuti = () => <ContentManagement />;

const AdminMedia = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-6">Media</h2>
    
    <Tabs defaultValue="gallery" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="gallery">Galleria</TabsTrigger>
        <TabsTrigger value="materials">Materiali</TabsTrigger>
      </TabsList>

      <TabsContent value="gallery">
        <GalleryManager />
      </TabsContent>

      <TabsContent value="materials">
        <MaterialManager />
      </TabsContent>
    </Tabs>
  </div>
);

const AdminImpostazioni = () => <AdminSettings />;

export const AdminLayout = ({ onLogout }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col">
        <AdminTopbar onLogout={onLogout} />
        
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            <Routes>
              <Route index element={<AdminDashboard />} />
              <Route path="prenotazioni" element={<BookingRequestsTable />} />
              <Route path="contenuti" element={<AdminContenuti />} />
              <Route path="media" element={<AdminMedia />} />
              <Route path="impostazioni" element={<AdminImpostazioni />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};