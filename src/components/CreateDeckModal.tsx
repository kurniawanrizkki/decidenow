import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Plus, X, Layers } from "lucide-react";
import { Deck, DeckItem } from "@/types";
import { generateId } from "@/lib/storage";

interface CreateDeckModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (deck: Deck) => void;
}

export function CreateDeckModal({ open, onClose, onSave }: CreateDeckModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<DeckItem[]>([]);
  const [newItem, setNewItem] = useState("");
  const [newItemBeban, setNewItemBeban] = useState<number>(1); // default: ringan

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, { 
        id: generateId(), 
        name: newItem.trim(),
        color: `hsl(${Math.random() * 360}, 70%, 50%)`,
        beban: newItemBeban
      }]);
      setNewItem("");
      setNewItemBeban(1);
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSave = () => {
    if (name.trim() && items.length >= 2) {
      onSave({
        id: generateId(),
        name: name.trim(),
        description: description.trim(),
        items,
        createdAt: Date.now()
      });
      setName("");
      setDescription("");
      setItems([]);
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center">
              <Layers className="w-4 h-4 text-primary-foreground" />
            </div>
            Buat Deck Baru
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Nama Deck</label>
            <Input
              placeholder="contoh: Tugas Kuliah"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-secondary border-border"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Deskripsi (opsional)</label>
            <Textarea
              placeholder="Deskripsi singkat..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-secondary border-border resize-none"
              rows={2}
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">
              Items ({items.length}/10) - minimal 2
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="Tambah item..."
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-secondary border-border"
                disabled={items.length >= 10}
              />
              <Button 
                variant="gradient" 
                size="icon"
                onClick={addItem}
                disabled={!newItem.trim() || items.length >= 10}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Input beban hanya muncul jika masih bisa tambah item */}
            {items.length < 10 && (
              <div className="flex items-center gap-2 mt-2">
                <label className="text-sm text-muted-foreground whitespace-nowrap">Beban:</label>
                <select
                  value={newItemBeban}
                  onChange={(e) => setNewItemBeban(Number(e.target.value))}
                  className="text-sm bg-secondary border border-border rounded px-2 py-1"
                >
                  <option value={1}>Ringan</option>
                  <option value={2}>Sedang</option>
                  <option value={3}>Berat</option>
                </select>
              </div>
            )}

            {items.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {items.map((item) => (
                  <span 
                    key={item.id}
                    className="pl-3 pr-1.5 py-1 rounded-full bg-secondary text-secondary-foreground text-sm flex items-center gap-1.5"
                  >
                    {item.name} ({item.beban === 1 ? "●" : item.beban === 2 ? "●●" : "●●●"})
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-5 h-5 rounded-full hover:bg-destructive/20 flex items-center justify-center transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Batal
            </Button>
            <Button 
              variant="gradient" 
              className="flex-1"
              onClick={handleSave}
              disabled={!name.trim() || items.length < 2}
            >
              Simpan Deck
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}