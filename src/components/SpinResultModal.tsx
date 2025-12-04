import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { DeckItem } from "@/types";
import { Sparkles, RotateCcw } from "lucide-react";

interface SpinResultModalProps {
  open: boolean;
  onClose: () => void;
  result: DeckItem | null;
  deckName: string;
  onSpinAgain: () => void;
  canSpinAgain: boolean;
}

export function SpinResultModal({ 
  open, 
  onClose, 
  result, 
  deckName,
  onSpinAgain,
  canSpinAgain
}: SpinResultModalProps) {
  if (!result) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass border-border max-w-sm text-center">
        <div className="py-4">
          <div className="w-20 h-20 mx-auto rounded-full btn-gradient flex items-center justify-center animate-bounce-in glow-primary mb-4">
            <Sparkles className="w-10 h-10 text-primary-foreground" />
          </div>
          
          <h2 className="text-xl font-semibold text-muted-foreground mb-1">
            Hasil dari {deckName}
          </h2>
          
          <p className="text-3xl font-bold text-gradient animate-scale-in mb-6">
            {result.name}
          </p>

          <p className="text-sm text-muted-foreground mb-6">
            Keputusan sudah dibuat! Waktunya eksekusi 💪
          </p>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Tutup
            </Button>
            <Button 
              variant="gradient" 
              className="flex-1"
              onClick={onSpinAgain}
              disabled={!canSpinAgain}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Spin Lagi</span>
            </Button>
          </div>

          {!canSpinAgain && (
            <p className="text-xs text-destructive mt-3">
              Credits tidak cukup untuk spin lagi
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
