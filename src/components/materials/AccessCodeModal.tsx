import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/custom-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AccessCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (code: string) => void;
  validateCode: (code: string) => Promise<boolean>;
}

const AccessCodeModal = ({ isOpen, onClose, onSuccess, validateCode }: AccessCodeModalProps) => {
  const [code, setCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      toast({
        title: "Errore",
        description: "Inserisci un codice di accesso",
        variant: "destructive",
      });
      return;
    }

    setIsValidating(true);
    setIsValid(null);

    try {
      const valid = await validateCode(code.trim().toUpperCase());
      setIsValid(valid);

      if (valid) {
        onSuccess(code.trim().toUpperCase());
        toast({
          title: "Accesso consentito",
          description: "Codice valido! Ora puoi accedere ai materiali premium",
        });
        onClose();
        setCode('');
      } else {
        toast({
          title: "Codice non valido",
          description: "Il codice inserito non è corretto o è scaduto",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error validating code:', error);
      toast({
        title: "Errore",
        description: "Errore durante la validazione del codice",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleClose = () => {
    setCode('');
    setIsValid(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Lock className="h-5 w-5 text-forest" />
            <span>Accesso area riservata</span>
          </DialogTitle>
          <DialogDescription>
            Inserisci il codice di accesso ricevuto dopo aver partecipato ai nostri laboratori
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="access-code">Codice di accesso</Label>
            <div className="relative">
              <Input
                id="access-code"
                type="text"
                placeholder="Inserisci il codice"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="pr-10"
                maxLength={20}
              />
              {isValid === true && (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
              )}
              {isValid === false && (
                <XCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
              )}
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Annulla
            </Button>
            <Button
              type="submit"
              variant="nature"
              disabled={isValidating || !code.trim()}
              className="flex-1"
            >
              {isValidating ? 'Verifica...' : 'Accedi'}
            </Button>
          </div>
        </form>

        <div className="text-sm text-muted-foreground mt-4 p-4 bg-muted/50 rounded-lg">
          <p className="font-medium mb-2">Come ottenere il codice:</p>
          <ul className="space-y-1 text-xs">
            <li>• Partecipa a uno dei nostri laboratori</li>
            <li>• Il codice ti verrà fornito al termine dell'attività</li>
            <li>• Contattaci se hai perso il tuo codice di accesso</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccessCodeModal;