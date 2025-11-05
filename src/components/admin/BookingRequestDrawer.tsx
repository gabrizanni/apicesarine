import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { FileDown, Calendar as CalendarIcon, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface BookingRequestDrawerProps {
  bookingId: string;
  open: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

interface BookingDetails {
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
}

interface Educator {
  id: string;
  name: string;
  available_regions: any;
}

const statusOptions = [
  { value: 'NUOVA', label: 'Nuova' },
  { value: 'IN_REVISIONE', label: 'In revisione' },
  { value: 'CONFERMATA', label: 'Confermata' },
  { value: 'SCARTATA', label: 'Scartata' }
];

export const BookingRequestDrawer = ({ bookingId, open, onClose, onUpdate }: BookingRequestDrawerProps) => {
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [educators, setEducators] = useState<Educator[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [internalNotes, setInternalNotes] = useState('');
  const [status, setStatus] = useState('');
  const [assignedEducatorId, setAssignedEducatorId] = useState<string>('');
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [emailTemplate, setEmailTemplate] = useState<'confirm' | 'info'>('confirm');
  const { toast } = useToast();

  useEffect(() => {
    if (open && bookingId) {
      loadBookingDetails();
      loadEducators();
    }
  }, [open, bookingId]);

  useEffect(() => {
    if (booking) {
      const saveTimer = setTimeout(() => {
        if (internalNotes !== (booking.internal_notes || '')) {
          autoSaveNotes();
        }
      }, 1000);
      return () => clearTimeout(saveTimer);
    }
  }, [internalNotes]);

  const loadBookingDetails = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('get-booking-details', {
        body: { bookingId }
      });

      if (error) throw error;
      if (!data) throw new Error('No booking data received');
      
      setBooking(data);
      setInternalNotes(data.internal_notes || '');
      setStatus(data.status || 'NUOVA');
      setAssignedEducatorId(data.assigned_educator_id || '');
    } catch (err) {
      console.error('Error loading booking:', err);
      toast({
        title: 'Errore',
        description: 'Impossibile caricare i dettagli della prenotazione.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const loadEducators = async () => {
    try {
      const { data, error } = await supabase
        .from('educators')
        .select('id, name, available_regions')
        .eq('is_active', true);

      if (error) throw error;
      setEducators(data || []);
    } catch (err) {
      console.error('Error loading educators:', err);
    }
  };

  const autoSaveNotes = async () => {
    try {
      const { error } = await supabase.functions.invoke('update-booking-status', {
        body: {
          bookingId,
          status,
          assignedEducatorId: assignedEducatorId || null,
          internalNotes
        }
      });

      if (error) throw error;
    } catch (err) {
      console.error('Error auto-saving notes:', err);
    }
  };

  const updateStatus = async () => {
    try {
      setSaving(true);
      const { error } = await supabase.functions.invoke('update-booking-status', {
        body: {
          bookingId,
          status,
          assignedEducatorId: assignedEducatorId || null,
          internalNotes
        }
      });

      if (error) throw error;

      toast({
        title: 'Aggiornato',
        description: 'Stato aggiornato con successo.'
      });
      onUpdate();
    } catch (err) {
      console.error('Error updating status:', err);
      toast({
        title: 'Errore',
        description: 'Impossibile aggiornare lo stato.',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  const generatePDF = () => {
    // Placeholder for PDF generation
    toast({
      title: 'PDF',
      description: 'Funzione di generazione PDF in arrivo.'
    });
  };

  const generateICS = () => {
    if (!booking?.preferred_date) {
      toast({
        title: 'Errore',
        description: 'Data preferita mancante.',
        variant: 'destructive'
      });
      return;
    }

    const event = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${format(new Date(booking.preferred_date), "yyyyMMdd'T'HHmmss")}`,
      `DTEND:${format(new Date(booking.preferred_date), "yyyyMMdd'T'HHmmss")}`,
      `SUMMARY:Workshop - ${booking.requester_name}`,
      `DESCRIPTION:${booking.organization || ''} - ${booking.participants_count || 0} partecipanti`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([event], { type: 'text/calendar' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `workshop_${booking.id}.ics`;
    link.click();

    toast({
      title: 'Download completato',
      description: 'File .ics scaricato.'
    });
  };

  const sendEmail = async () => {
    // Placeholder for email sending
    toast({
      title: 'Email',
      description: `Template "${emailTemplate === 'confirm' ? 'Conferma' : 'Richiesta info'}" inviato.`
    });
    setEmailDialogOpen(false);
  };

  if (loading) {
    return (
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <div className="space-y-4 mt-6">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  if (!booking) return null;

  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Dettagli Prenotazione</SheetTitle>
          </SheetHeader>

          <div className="space-y-6 mt-6">
            {/* Main Info */}
            <div className="space-y-2">
              <div>
                <Label className="text-muted-foreground">Nome</Label>
                <p className="font-medium">{booking.requester_name}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Email</Label>
                <p>{booking.requester_email}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Telefono</Label>
                <p>{booking.requester_phone || 'N/A'}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Organizzazione</Label>
                <p>{booking.organization || 'N/A'}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Data preferita</Label>
                <p>
                  {booking.preferred_date
                    ? format(new Date(booking.preferred_date), 'dd MMMM yyyy', { locale: it })
                    : 'N/A'}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Partecipanti</Label>
                <p>{booking.participants_count || 'N/A'}</p>
              </div>
              {booking.message && (
                <div>
                  <Label className="text-muted-foreground">Messaggio</Label>
                  <p className="text-sm whitespace-pre-wrap">{booking.message}</p>
                </div>
              )}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label>Stato</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Educator */}
            <div className="space-y-2">
              <Label>Educatore assegnato</Label>
              <Select value={assignedEducatorId} onValueChange={setAssignedEducatorId}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona educatore..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Nessuno</SelectItem>
                  {educators.map(edu => (
                    <SelectItem key={edu.id} value={edu.id}>
                      {edu.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={updateStatus} disabled={saving} className="w-full">
                Aggiorna stato
              </Button>
            </div>

            {/* Internal Notes */}
            <div className="space-y-2">
              <Label>Note interne (autosave)</Label>
              <Textarea
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                rows={4}
                placeholder="Aggiungi note interne..."
              />
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Button onClick={generatePDF} variant="outline" className="w-full">
                <FileDown className="h-4 w-4 mr-2" />
                Genera PDF
              </Button>
              <Button onClick={generateICS} variant="outline" className="w-full">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Genera .ics
              </Button>
              <Button
                onClick={() => {
                  setEmailTemplate('confirm');
                  setEmailDialogOpen(true);
                }}
                variant="outline"
                className="w-full"
              >
                <Mail className="h-4 w-4 mr-2" />
                Invia email conferma
              </Button>
              <Button
                onClick={() => {
                  setEmailTemplate('info');
                  setEmailDialogOpen(true);
                }}
                variant="outline"
                className="w-full"
              >
                <Mail className="h-4 w-4 mr-2" />
                Invia richiesta info
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Conferma invio email</AlertDialogTitle>
            <AlertDialogDescription>
              Vuoi inviare l'email "{emailTemplate === 'confirm' ? 'Conferma' : 'Richiesta informazioni'}" a {booking.requester_email}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annulla</AlertDialogCancel>
            <AlertDialogAction onClick={sendEmail}>Invia</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
