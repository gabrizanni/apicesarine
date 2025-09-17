import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Eye, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BookingRequest {
  id: string;
  workshop_id: string | null;
  requester_name: string;
  requester_email: string;
  requester_phone: string | null;
  organization: string | null;
  preferred_date: string | null;
  participants_count: number | null;
  message: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  workshops?: {
    title: string;
  };
}

export const BookingRequestViewer = () => {
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<BookingRequest | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingStatus, setEditingStatus] = useState('');
  const [editingNotes, setEditingNotes] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchBookingRequests();
  }, []);

  const fetchBookingRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('booking_requests')
        .select(`
          *,
          workshops (
            title
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookingRequests(data || []);
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile caricare le richieste di prenotazione",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleView = (request: BookingRequest) => {
    setSelectedRequest(request);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (request: BookingRequest) => {
    setSelectedRequest(request);
    setEditingStatus(request.status);
    setEditingNotes(request.notes || '');
    setIsEditDialogOpen(true);
  };

  const handleUpdateStatus = async () => {
    if (!selectedRequest) return;

    try {
      const { error } = await supabase
        .from('booking_requests')
        .update({
          status: editingStatus,
          notes: editingNotes || null
        })
        .eq('id', selectedRequest.id);

      if (error) throw error;

      toast({
        title: "Successo",
        description: "Richiesta aggiornata con successo"
      });

      fetchBookingRequests();
      setIsEditDialogOpen(false);
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile aggiornare la richiesta",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'In attesa';
      case 'confirmed': return 'Confermata';
      case 'cancelled': return 'Annullata';
      case 'completed': return 'Completata';
      default: return status;
    }
  };

  if (loading) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Richieste di Prenotazione ({bookingRequests.length})</h3>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Richiedente</TableHead>
                <TableHead>Workshop</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Data Preferita</TableHead>
                <TableHead>Partecipanti</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead>Creata</TableHead>
                <TableHead>Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookingRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.requester_name}</TableCell>
                  <TableCell>{request.workshops?.title || '-'}</TableCell>
                  <TableCell>{request.requester_email}</TableCell>
                  <TableCell>
                    {request.preferred_date ? new Date(request.preferred_date).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell>{request.participants_count || '-'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(request.status)}`}>
                      {getStatusLabel(request.status)}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(request.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleView(request)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(request)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Dettagli Richiesta di Prenotazione</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Richiedente</Label>
                  <p>{selectedRequest.requester_name}</p>
                </div>
                <div>
                  <Label className="font-semibold">Email</Label>
                  <p>{selectedRequest.requester_email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Telefono</Label>
                  <p>{selectedRequest.requester_phone || '-'}</p>
                </div>
                <div>
                  <Label className="font-semibold">Organizzazione</Label>
                  <p>{selectedRequest.organization || '-'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Data Preferita</Label>
                  <p>{selectedRequest.preferred_date ? new Date(selectedRequest.preferred_date).toLocaleDateString() : '-'}</p>
                </div>
                <div>
                  <Label className="font-semibold">Numero Partecipanti</Label>
                  <p>{selectedRequest.participants_count || '-'}</p>
                </div>
              </div>

              <div>
                <Label className="font-semibold">Workshop</Label>
                <p>{selectedRequest.workshops?.title || '-'}</p>
              </div>

              <div>
                <Label className="font-semibold">Messaggio</Label>
                <p className="whitespace-pre-wrap">{selectedRequest.message || '-'}</p>
              </div>

              <div>
                <Label className="font-semibold">Note Interne</Label>
                <p className="whitespace-pre-wrap">{selectedRequest.notes || '-'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Stato</Label>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedRequest.status)}`}>
                    {getStatusLabel(selectedRequest.status)}
                  </span>
                </div>
                <div>
                  <Label className="font-semibold">Creata il</Label>
                  <p>{new Date(selectedRequest.created_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifica Stato Richiesta</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div>
                <Label className="font-semibold">Richiedente: {selectedRequest.requester_name}</Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Stato</Label>
                <Select value={editingStatus} onValueChange={setEditingStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">In attesa</SelectItem>
                    <SelectItem value="confirmed">Confermata</SelectItem>
                    <SelectItem value="cancelled">Annullata</SelectItem>
                    <SelectItem value="completed">Completata</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Note Interne</Label>
                <Textarea
                  id="notes"
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  rows={3}
                  placeholder="Aggiungi note interne..."
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Annulla
                </Button>
                <Button type="button" onClick={handleUpdateStatus}>
                  Aggiorna
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};