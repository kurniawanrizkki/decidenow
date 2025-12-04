import { useState } from "react";
import { Deck, DeckItem, UserStats } from "@/types";
import { DeckCard } from "../DeckCard";
import { CreateDeckModal } from "../CreateDeckModal";
import { Spinner } from "../Spinner";
import { SpinResultModal } from "../SpinResultModal";
import { CreditBadge } from "../CreditBadge";
import { Button } from "../ui/button";
import { Plus, ArrowLeft, Coins } from "lucide-react";
import { spendCredits, addSpinResult } from "@/lib/storage";
import { toast } from "@/hooks/use-toast";

interface DecksTabProps {
  decks: Deck[];
  stats: UserStats;
  onSaveDeck: (deck: Deck) => void;
  onDeleteDeck: (deckId: string) => void;
  onStatsUpdate: () => void;
}

const SPIN_COST = 1;

export function DecksTab({ decks, stats, onSaveDeck, onDeleteDeck, onStatsUpdate }: DecksTabProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  const [spinResult, setSpinResult] = useState<DeckItem | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);

  const handleSelectDeck = (deck: Deck) => {
    if (stats.credits < SPIN_COST) {
      toast({
        title: "Credits tidak cukup!",
        description: `Kamu butuh ${SPIN_COST} credit untuk spin. Selesaikan todos untuk mendapat credits.`,
        variant: "destructive"
      });
      return;
    }
    setSelectedDeck(deck);
    setHasSpun(false);
  };

  const handleSpinComplete = (item: DeckItem) => {
    if (!selectedDeck || hasSpun) return;
    
    const success = spendCredits(SPIN_COST);
    if (!success) {
      toast({
        title: "Credits tidak cukup!",
        description: "Selesaikan todos untuk mendapat credits.",
        variant: "destructive"
      });
      return;
    }

    addSpinResult({
      deckId: selectedDeck.id,
      selectedItem: item,
      timestamp: Date.now()
    });

    setSpinResult(item);
    setShowResult(true);
    setHasSpun(true);
    onStatsUpdate();
  };

  const handleSpinAgain = () => {
    if (stats.credits < SPIN_COST) {
      toast({
        title: "Credits tidak cukup!",
        description: "Selesaikan todos untuk mendapat credits.",
        variant: "destructive"
      });
      return;
    }
    setShowResult(false);
    setHasSpun(false);
  };

  if (selectedDeck) {
    return (
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="sm" onClick={() => setSelectedDeck(null)}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Kembali
          </Button>
          <CreditBadge credits={stats.credits} />
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-foreground">{selectedDeck.name}</h2>
          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
            <Coins className="w-4 h-4 text-warning" />
            <span>Biaya: {SPIN_COST} credit per spin</span>
          </div>
        </div>

        <div className="flex justify-center mb-6">
        <Spinner 
          items={selectedDeck.items
            .map(item => ({ ...item })) // shallow copy agar tidak mutasi asli
            .sort((a, b) => b.beban - a.beban)} // urutkan: berat → ringan
          onSpinComplete={handleSpinComplete}
          disabled={hasSpun || stats.credits < SPIN_COST}
        />
        </div>

        {stats.credits < SPIN_COST && !hasSpun && (
          <p className="text-center text-sm text-destructive">
            Credits tidak cukup untuk spin. Selesaikan todos dulu!
          </p>
        )}

        <SpinResultModal
          open={showResult}
          onClose={() => setShowResult(false)}
          result={spinResult}
          deckName={selectedDeck.name}
          onSpinAgain={handleSpinAgain}
          canSpinAgain={stats.credits >= SPIN_COST}
        />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Decks</h2>
          <p className="text-sm text-muted-foreground">Kelola pilihan kamu</p>
        </div>
        <Button variant="gradient" size="sm" onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4" />
          <span>Buat Deck</span>
        </Button>
      </div>

      {decks.length === 0 ? (
        <div className="glass rounded-xl p-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
            <Plus className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">Belum ada deck</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Buat deck pertama kamu untuk mulai membuat keputusan
          </p>
          <Button variant="gradient" onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4" />
            <span>Buat Deck Pertama</span>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {decks.map((deck) => (
            <DeckCard 
              key={deck.id} 
              deck={deck} 
              onSelect={handleSelectDeck}
              onDelete={onDeleteDeck}
            />
          ))}
        </div>
      )}

      <CreateDeckModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={onSaveDeck}
      />
    </div>
  );
}
