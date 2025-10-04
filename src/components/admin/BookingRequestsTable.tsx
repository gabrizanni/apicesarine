import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, Search, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
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
  created_at: string;
  updated_at: string;
}

const statusMap: Record<string, BookingStatus> = {
  'pending': 'NUOVA',
  'NUOVA': 'NUOVA',
  'IN_REVISIONE': 'IN_REVISIONE',
  'confirmed': 'CONFERMATA',
  'CONFERMATA': 'CONFERMATA',
  'SCARTATA': 'SCARTATA'
};

const statusLabels: Record<BookingStatus, string> = {
  'NUOVA': 'Nuove',
  'IN_REVISIONE': 'In revisione',
  'CONFERMATA': 'Confermate',
  'SCARTATA': 'Scartate'
};

const ITEMS_PER_PAGE = 20;

export const BookingRequestsTable = () => {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<BookingStatus>('NUOVA');
  const [searchText, setSearchText] = useState('');
  const [provinceFilter, setProvinceFilter] = useState<string>('');
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('booking_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (err) {
      console.error('Error loading bookings:', err);
      setError('Errore nel caricamento delle prenotazioni.');
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = useMemo(() => {
    let filtered = bookings.filter(b => {
      const normalizedStatus = statusMap[b.status] || 'NUOVA';
      return normalizedStatus === activeTab;
    });

    if (searchText) {
      const search = searchText.toLowerCase();
      filtered = filtered.filter(b =>
        b.requester_name?.toLowerCase().includes(search) ||
        b.requester_email?.toLowerCase().includes(search) ||
        b.organization?.toLowerCase().includes(search)
      );
    }

    if (provinceFilter) {
      filtered = filtered.filter(b =>
        b.organization?.toLowerCase().includes(provinceFilter.toLowerCase())
      );
    }

    if (dateFrom) {
      filtered = filtered.filter(b =>
        b.preferred_date && new Date(b.preferred_date) >= dateFrom
      );
    }

    if (dateTo) {
      filtered = filtered.filter(b =>
        b.preferred_date && new Date(b.preferred_date) <= dateTo
      );
    }

    return filtered;
  }, [bookings, activeTab, searchText, provinceFilter, dateFrom, dateTo]);

  const paginatedBookings = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredBookings.slice(start, end);
  }, [filteredBookings, currentPage]);

  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);

  const exportToCSV = () => {
    const headers = ['Nome', 'Email', 'Telefono', 'Organizzazione', 'Data preferita', 'Partecipanti', 'Stato', 'Data creazione'];
    const rows = filteredBookings.map(b => [
      b.requester_name,
      b.requester_email,
      b.requester_phone || '',
      b.organization || '',
      b.preferred_date ? format(new Date(b.preferred_date), 'dd/MM/yyyy') : '',
      b.participants_count?.toString() || '',
      statusMap[b.status] || b.status,
      format(new Date(b.created_at), 'dd/MM/yyyy HH:mm', { locale: it })
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
      description: `${filteredBookings.length} righe esportate.`
    });
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <Tabs value={activeTab} onValueChange={(v) => {
        setActiveTab(v as BookingStatus);
        setCurrentPage(1);
      }}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            {(Object.keys(statusLabels) as BookingStatus[]).map(status => {
              const count = bookings.filter(b => (statusMap[b.status] || 'NUOVA') === status).length;
              return (
                <TabsTrigger key={status} value={status}>
                  {statusLabels[status]} ({count})
                </TabsTrigger>
              );
            })}
          </TabsList>
          <Button onClick={exportToCSV} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cerca nome, email, organizzazione..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="pl-9"
            />
          </div>

          <Input
            placeholder="Filtra per provincia..."
            value={provinceFilter}
            onChange={(e) => setProvinceFilter(e.target.value)}
          />

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn(!dateFrom && "text-muted-foreground")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateFrom ? format(dateFrom, 'dd/MM/yyyy') : 'Data da'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dateFrom}
                onSelect={setDateFrom}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn(!dateTo && "text-muted-foreground")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateTo ? format(dateTo, 'dd/MM/yyyy') : 'Data a'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dateTo}
                onSelect={setDateTo}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <TabsContent value={activeTab}>
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : paginatedBookings.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              Nessuna prenotazione trovata.
            </p>
          ) : (
            <>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Organizzazione</TableHead>
                      <TableHead>Data preferita</TableHead>
                      <TableHead>Partecipanti</TableHead>
                      <TableHead>Creata il</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedBookings.map((booking) => (
                      <TableRow
                        key={booking.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedBooking(booking.id)}
                      >
                        <TableCell className="font-medium">{booking.requester_name}</TableCell>
                        <TableCell>{booking.organization || 'N/A'}</TableCell>
                        <TableCell>
                          {booking.preferred_date
                            ? format(new Date(booking.preferred_date), 'dd MMM yyyy', { locale: it })
                            : 'N/A'}
                        </TableCell>
                        <TableCell>{booking.participants_count || 'N/A'}</TableCell>
                        <TableCell>
                          {format(new Date(booking.created_at), 'dd/MM/yy HH:mm', { locale: it })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Precedente
                  </Button>
                  <span className="flex items-center px-4 text-sm">
                    Pagina {currentPage} di {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Successivo
                  </Button>
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>

      {selectedBooking && (
        <BookingRequestDrawer
          bookingId={selectedBooking}
          open={!!selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onUpdate={loadBookings}
        />
      )}
    </>
  );
};
