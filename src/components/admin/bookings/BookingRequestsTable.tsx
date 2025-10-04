import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, Search, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { BookingRequestDrawer } from './BookingRequestDrawer';
import { useToast } from '@/hooks/use-toast';

type BookingStatus = 'NUOVA' | 'IN_REVISIONE' | 'CONFERMATA' | 'SCARTATA';

interface BookingRequest {
  id: string;
  requester_name: string;
  requester_email: string;
  requester_phone: string | null;
  organization: string | null;
  workshop_id: string | null;
  preferred_date: string | null;
  participants_count: number | null;
  message: string | null;
  status: string;
  assigned_educator_id: string | null;
  internal_notes: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

const ITALIAN_REGIONS = [
  'Abruzzo', 'Basilicata', 'Calabria', 'Campania', 'Emilia-Romagna', 
  'Friuli-Venezia Giulia', 'Lazio', 'Liguria', 'Lombardia', 'Marche',
  'Molise', 'Piemonte', 'Puglia', 'Sardegna', 'Sicilia', 'Toscana',
  'Trentino-Alto Adige', 'Umbria', "Valle d'Aosta", 'Veneto'
];

export const BookingRequestsTable = () => {
  const [activeTab, setActiveTab] = useState<BookingStatus>('NUOVA');
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [searchText, setSearchText] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  
  // Drawer
  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const { toast } = useToast();

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [bookings, activeTab, searchText, selectedRegion, dateFrom, dateTo]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('booking_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      
      // Map old status to new ones
      const mappedData = (data || []).map(booking => ({
        ...booking,
        status: booking.status === 'pending' ? 'NUOVA' : 
                booking.status === 'confirmed' ? 'CONFERMATA' :
                booking.status || 'NUOVA'
      }));
      
      setBookings(mappedData);
    } catch (err) {
      console.error('Error loading bookings:', err);
      setError('Errore nel caricamento delle prenotazioni');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = bookings.filter(b => b.status === activeTab);
    
    if (searchText) {
      const search = searchText.toLowerCase();
      filtered = filtered.filter(b =>
        b.requester_name.toLowerCase().includes(search) ||
        b.requester_email.toLowerCase().includes(search) ||
        b.organization?.toLowerCase().includes(search)
      );
    }
    
    if (selectedRegion !== 'all') {
      filtered = filtered.filter(b => 
        b.notes?.toLowerCase().includes(selectedRegion.toLowerCase())
      );
    }
    
    if (dateFrom) {
      filtered = filtered.filter(b => 
        b.preferred_date && b.preferred_date >= dateFrom
      );
    }
    
    if (dateTo) {
      filtered = filtered.filter(b => 
        b.preferred_date && b.preferred_date <= dateTo
      );
    }
    
    setFilteredBookings(filtered);
    setCurrentPage(1);
  };

  const exportCSV = () => {
    const headers = ['Data Richiesta', 'Nome', 'Email', 'Telefono', 'Organizzazione', 'Data Preferita', 'Partecipanti', 'Status'];
    const rows = filteredBookings.map(b => [
      format(new Date(b.created_at), 'dd/MM/yyyy'),
      b.requester_name,
      b.requester_email,
      b.requester_phone || '',
      b.organization || '',
      b.preferred_date ? format(new Date(b.preferred_date), 'dd/MM/yyyy') : '',
      b.participants_count || '',
      b.status
    ]);
    
    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `prenotazioni_${activeTab}_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
    
    toast({
      title: 'Export completato',
      description: `Esportate ${filteredBookings.length} prenotazioni`,
    });
  };

  const handleRowClick = (booking: BookingRequest) => {
    setSelectedBooking(booking);
    setDrawerOpen(true);
  };

  const handleBookingUpdate = () => {
    loadBookings();
  };

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as BookingStatus)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="NUOVA">Nuove</TabsTrigger>
            <TabsTrigger value="IN_REVISIONE">In Revisione</TabsTrigger>
            <TabsTrigger value="CONFERMATA">Confermate</TabsTrigger>
            <TabsTrigger value="SCARTATA">Scartate</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Filters */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cerca nome, email, org..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger>
              <SelectValue placeholder="Tutte le province" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutte le province</SelectItem>
              {ITALIAN_REGIONS.map(region => (
                <SelectItem key={region} value={region}>{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Input
            type="date"
            placeholder="Data da"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
          
          <Input
            type="date"
            placeholder="Data a"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {filteredBookings.length} risultati
          </p>
          <Button onClick={exportCSV} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Organizzazione</TableHead>
                <TableHead>Data Preferita</TableHead>
                <TableHead>Partecipanti</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                  </TableRow>
                ))
              ) : paginatedBookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Nessuna prenotazione trovata
                  </TableCell>
                </TableRow>
              ) : (
                paginatedBookings.map((booking) => (
                  <TableRow 
                    key={booking.id} 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleRowClick(booking)}
                  >
                    <TableCell>
                      {format(new Date(booking.created_at), 'dd MMM yyyy', { locale: it })}
                    </TableCell>
                    <TableCell className="font-medium">{booking.requester_name}</TableCell>
                    <TableCell>{booking.organization || '-'}</TableCell>
                    <TableCell>
                      {booking.preferred_date 
                        ? format(new Date(booking.preferred_date), 'dd MMM yyyy', { locale: it })
                        : '-'
                      }
                    </TableCell>
                    <TableCell>{booking.participants_count || '-'}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Precedente
            </Button>
            <span className="py-2 px-4 text-sm">
              Pagina {currentPage} di {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Successiva
            </Button>
          </div>
        )}
      </div>

      <BookingRequestDrawer
        booking={selectedBooking}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        onUpdate={handleBookingUpdate}
      />
    </>
  );
};
