import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar, CheckCircle, School } from 'lucide-react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

interface KPIData {
  newThisWeek: number;
  confirmedThisMonth: number;
  schoolsServed: number;
}

interface Booking {
  id: string;
  requester_name: string;
  organization: string;
  created_at: string;
  status: string;
}

export const AdminDashboard = () => {
  const [kpiData, setKpiData] = useState<KPIData | null>(null);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

      // Fetch KPI data
      const [newWeekData, confirmedMonthData, schoolsData, bookingsData] = await Promise.all([
        supabase
          .from('booking_requests')
          .select('id', { count: 'exact', head: true })
          .gte('created_at', weekAgo.toISOString()),
        
        supabase
          .from('booking_requests')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'confirmed')
          .gte('created_at', monthStart.toISOString()),
        
        supabase
          .from('booking_requests')
          .select('organization', { count: 'exact', head: false })
          .not('organization', 'is', null),
        
        supabase
          .from('booking_requests')
          .select('id, requester_name, organization, created_at, status')
          .order('created_at', { ascending: false })
          .limit(10)
      ]);

      if (newWeekData.error) throw newWeekData.error;
      if (confirmedMonthData.error) throw confirmedMonthData.error;
      if (schoolsData.error) throw schoolsData.error;
      if (bookingsData.error) throw bookingsData.error;

      const uniqueSchools = new Set(
        schoolsData.data?.map(b => b.organization?.trim()).filter(Boolean) || []
      );

      setKpiData({
        newThisWeek: newWeekData.count || 0,
        confirmedThisMonth: confirmedMonthData.count || 0,
        schoolsServed: uniqueSchools.size,
      });

      setRecentBookings(bookingsData.data || []);
    } catch (err) {
      console.error('Error loading dashboard:', err);
      setError('Errore nel caricamento dei dati. Riprova più tardi.');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nuove questa settimana</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">{kpiData?.newThisWeek}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confermate questo mese</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">{kpiData?.confirmedThisMonth}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scuole servite</CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">{kpiData?.schoolsServed}</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Ultime 10 prenotazioni</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : recentBookings.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nessuna prenotazione trovata.</p>
          ) : (
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{booking.requester_name}</p>
                    <p className="text-sm text-muted-foreground">{booking.organization || 'N/A'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">
                      {format(new Date(booking.created_at), 'dd MMM yyyy', { locale: it })}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : booking.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
