import { SpinResult, Deck } from "@/types";
import { Clock, Target } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

interface HistoryTabProps {
  history: SpinResult[];
  decks: Deck[];
}

export function HistoryTab({ history, decks }: HistoryTabProps) {
  const getDeckName = (deckId: string) => {
    const deck = decks.find(d => d.id === deckId);
    return deck?.name || "Deck dihapus";
  };

  if (history.length === 0) {
    return (
      <div className="animate-fade-in">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground">History</h2>
          <p className="text-sm text-muted-foreground">Riwayat keputusan kamu</p>
        </div>

        <div className="glass rounded-xl p-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
            <Clock className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">Belum ada history</h3>
          <p className="text-sm text-muted-foreground">
            Spin deck untuk mulai membuat keputusan!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">History</h2>
        <p className="text-sm text-muted-foreground">{history.length} keputusan dibuat</p>
      </div>

      <div className="space-y-3">
        {history.map((result, index) => (
          <div key={`${result.deckId}-${result.timestamp}`} className="glass rounded-xl p-4 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg btn-gradient flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">
                  {result.selectedItem.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  dari {getDeckName(result.deckId)}
                </p>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDistanceToNow(result.timestamp, { addSuffix: true, locale: id })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
