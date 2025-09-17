import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Users, BookOpen, FileText, Calendar } from 'lucide-react';
import { WorkshopManager } from './WorkshopManager';
import { EducatorManager } from './EducatorManager';
import { PostManager } from './PostManager';
import { BookingRequestViewer } from './BookingRequestViewer';

interface AdminLayoutProps {
  onLogout: () => void;
}

export const AdminLayout = ({ onLogout }: AdminLayoutProps) => {
  const [activeTab, setActiveTab] = useState('workshops');

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Admin CMS</h1>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="workshops" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Workshop
            </TabsTrigger>
            <TabsTrigger value="educators" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Educatori
            </TabsTrigger>
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Post
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Richieste
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workshops">
            <Card>
              <CardHeader>
                <CardTitle>Gestione Workshop</CardTitle>
              </CardHeader>
              <CardContent>
                <WorkshopManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="educators">
            <Card>
              <CardHeader>
                <CardTitle>Gestione Educatori</CardTitle>
              </CardHeader>
              <CardContent>
                <EducatorManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="posts">
            <Card>
              <CardHeader>
                <CardTitle>Gestione Post</CardTitle>
              </CardHeader>
              <CardContent>
                <PostManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Richieste di Prenotazione</CardTitle>
              </CardHeader>
              <CardContent>
                <BookingRequestViewer />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};