import { Deck } from "@/types";
import { Layers, ChevronRight, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

interface DeckCardProps {
  deck: Deck;
  onSelect: (deck: Deck) => void;
  onDelete: (deckId: string) => void;
}

export function DeckCard({ deck, onSelect, onDelete }: DeckCardProps) {
  return (
    <div className="glass rounded-xl p-4 animate-fade-in group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg btn-gradient flex items-center justify-center">
            <Layers className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{deck.name}</h3>
            <p className="text-sm text-muted-foreground">{deck.items.length} items</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(deck.id);
          }}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      
      {deck.description && (
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {deck.description}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {deck.items.slice(0, 3).map((item) => (
          <span 
            key={item.id} 
            className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
          >
            {item.name}
          </span>
        ))}
        {deck.items.length > 3 && (
          <span className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
            +{deck.items.length - 3} more
          </span>
        )}
      </div>

      <Button 
        variant="gradient" 
        className="w-full"
        onClick={() => onSelect(deck)}
      >
        <span>Spin Deck</span>
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
