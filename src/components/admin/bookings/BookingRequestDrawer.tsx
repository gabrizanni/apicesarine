import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { FileDown, Calendar as CalendarIcon, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

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
}

interface Educator {
  id: string;
  name: string;
  available_regions: any;
}

interface DrawerProps {
  booking: BookingRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: () => void;
}

type BookingStatus = 'NUOVA' | 'IN_REVISIONE' | 'CONFERMATA' | 'SCARTATA';

export const BookingRequestDrawer = ({ booking, open, onOpenChange, onUpdate }: DrawerProps) => {
  const [status, setStatus] = useState<BookingStatus>('NUOVA');
  const [assignedEducatorId, setAssignedEducatorId] = useState<string>('');
  const [internalNotes, setInternalNotes] = useState('');
  const [educators, setEducators] = useState<Educator[]>([]);
  const [saving, setSaving] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    if (booking) {
      setStatus((booking.status || 'NUOVA') as BookingStatus);
      setAssignedEducatorId(booking.assigned_educator_id || '');
      setInternalNotes(booking.internal_notes || '');
      loadEducators();
    }
  }, [booking]);

  useEffect(() => {
    // Auto-save internal notes
    if (booking && internalNotes !== (booking.internal_notes || '')) {
      const timer = setTimeout(() => {
        saveInternalNotes();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [internalNotes]);

  const loadEducators = async () => {
    try {
      const { data, error } = await supabase
        .from('educators')
        .select('id, name, available_regions')
        .eq('is_active', true);
      
      if (error) throw error;
      setEducators(data || []);
    } catch (error) {
      console.error('Error loading educators:', error);
    }
  };

  const saveInternalNotes = async () => {
    if (!booking) return;
    
    try {
      const { error } = await supabase
        .from('booking_requests')
        .update({ internal_notes: internalNotes })
        .eq('id', booking.id);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const updateStatus = async () => {
    if (!booking) return;
    
    try {
      setSaving(true);
      const { error } = await supabase
        .from('booking_requests')
        .update({ 
          status,
          assigned_educator_id: assignedEducatorId || null,
          internal_notes: internalNotes
        })
        .eq('id', booking.id);
      
      if (error) throw error;
      
      toast({
        title: 'Stato aggiornato',
        description: 'La prenotazione è stata aggiornata con successo',
      });
      
      onUpdate();
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile aggiornare lo stato',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const generateICS = () => {
    if (!booking || !booking.preferred_date) return;
    
    const startDate = new Date(booking.preferred_date);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Apicoltura//Booking//IT',
      'BEGIN:VEVENT',
      `DTSTART:${format(startDate, "yyyyMMdd'T'HHmmss")}`,
      `DTEND:${format(endDate, "yyyyMMdd'T'HHmmss")}`,
      `SUMMARY:Workshop - ${booking.organization || booking.requester_name}`,
      `DESCRIPTION:Partecipanti: ${booking.participants_count || 'N/A'}`,
      `LOCATION:${booking.organization || ''}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `booking_${booking.id}.ics`;
    link.click();
    
    toast({
      title: 'File .ics generato',
      description: 'Il file è stato scaricato',
    });
  };

  const generatePDF = () => {
    toast({
      title: 'Funzionalità in arrivo',
      description: 'La generazione PDF sarà disponibile a breve',
    });
  };

  const sendEmail = (template: 'confirm' | 'info') => {
    toast({
      title: 'Funzionalità in arrivo',
      description: `Invio email ${template === 'confirm' ? 'conferma' : 'richiesta info'} sarà disponibile a breve`,
    });
  };

  if (!booking) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Dettaglio Prenotazione</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 py-6">
          {/* Main Info */}
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground">Nome</Label>
              <p className="font-medium">{booking.requester_name}</p>
            </div>
            
            <div>
              <Label className="text-xs text-muted-foreground">Email</Label>
              <p>{booking.requester_email}</p>
            </div>
            
            {booking.requester_phone && (
              <div>
                <Label className="text-xs text-muted-foreground">Telefono</Label>
                <p>{booking.requester_phone}</p>
              </div>
            )}
            
            {booking.organization && (
              <div>
                <Label className="text-xs text-muted-foreground">Organizzazione</Label>
                <p>{booking.organization}</p>
              </div>
            )}
            
            {booking.preferred_date && (
              <div>
                <Label className="text-xs text-muted-foreground">Data Preferita</Label>
                <p>{format(new Date(booking.preferred_date), 'dd MMMM yyyy', { locale: it })}</p>
              </div>
            )}
            
            {booking.participants_count && (
              <div>
                <Label className="text-xs text-muted-foreground">Partecipanti</Label>
                <p>{booking.participants_count}</p>
              </div>
            )}
            
            {booking.message && (
              <div>
                <Label className="text-xs text-muted-foreground">Messaggio</Label>
                <p className="text-sm whitespace-pre-wrap">{booking.message}</p>
              </div>
            )}
          </div>
          
          <Separator />
          
          {/* Status & Assignment */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="status">Stato</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as BookingStatus)}>
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NUOVA">Nuova</SelectItem>
                  <SelectItem value="IN_REVISIONE">In Revisione</SelectItem>
                  <SelectItem value="CONFERMATA">Confermata</SelectItem>
                  <SelectItem value="SCARTATA">Scartata</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="educator">Educatore Assegnato</Label>
              <Select value={assignedEducatorId} onValueChange={setAssignedEducatorId}>
                <SelectTrigger id="educator">
                  <SelectValue placeholder="Seleziona educatore" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Nessuno</SelectItem>
                  {educators.map(educator => (
                    <SelectItem key={educator.id} value={educator.id}>
                      {educator.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button onClick={updateStatus} disabled={saving} className="w-full">
              {saving ? 'Salvataggio...' : 'Salva Modifiche'}
            </Button>
          </div>
          
          <Separator />
          
          {/* Internal Notes */}
          <div>
            <Label htmlFor="notes">Note Interne (autosave)</Label>
            <Textarea
              id="notes"
              placeholder="Note private visibili solo agli admin..."
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              rows={4}
              className="mt-2"
            />
          </div>
          
          <Separator />
          
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
            
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={() => sendEmail('confirm')} variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Email Conferma
              </Button>
              <Button onClick={() => sendEmail('info')} variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Richiedi Info
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
