import { ArrowUp, ArrowDown, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrderControlsProps {
  currentPosition: number;
  totalItems: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  disabled?: boolean;
}

/**
 * Componente per i controlli di ordinamento degli elementi
 */
export const OrderControls = ({
  currentPosition,
  totalItems,
  onMoveUp,
  onMoveDown,
  disabled = false
}: OrderControlsProps) => {
  const isFirst = currentPosition === 1;
  const isLast = currentPosition === totalItems;

  return (
    <div className="flex items-center gap-1">
      <GripVertical className="w-4 h-4 text-muted-foreground" />
      <div className="flex flex-col gap-0.5">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMoveUp}
          disabled={disabled || isFirst}
          className="h-5 w-7 p-0 hover:bg-muted"
          title="Sposta su"
        >
          <ArrowUp className="w-3 h-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onMoveDown}
          disabled={disabled || isLast}
          className="h-5 w-7 p-0 hover:bg-muted"
          title="Sposta giù"
        >
          <ArrowDown className="w-3 h-3" />
        </Button>
      </div>
      <span className="text-xs text-muted-foreground min-w-[3ch] text-center">
        {currentPosition}
      </span>
    </div>
  );
};
