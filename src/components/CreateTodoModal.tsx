import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { CheckSquare, Coins } from "lucide-react";
import { Todo } from "@/types";
import { generateId } from "@/lib/storage";

interface CreateTodoModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (todo: Todo) => void;
}

const CREDIT_OPTIONS = [1, 2, 3, 5, 10];

export function CreateTodoModal({ open, onClose, onSave }: CreateTodoModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [credits, setCredits] = useState(2);

  const handleSave = () => {
    if (title.trim()) {
      onSave({
        id: generateId(),
        title: title.trim(),
        description: description.trim(),
        credits,
        completed: false,
        createdAt: Date.now()
      });
      setTitle("");
      setDescription("");
      setCredits(2);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <div className="w-8 h-8 rounded-lg bg-success flex items-center justify-center">
              <CheckSquare className="w-4 h-4 text-success-foreground" />
            </div>
            Tambah Todo Baru
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Judul Todo</label>
            <Input
              placeholder="contoh: Kerjakan tugas Deep Learning"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-secondary border-border"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Deskripsi (opsional)</label>
            <Textarea
              placeholder="Detail tambahan..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-secondary border-border resize-none"
              rows={2}
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Reward Credits</label>
            <div className="flex gap-2">
              {CREDIT_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setCredits(opt)}
                  className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1 transition-all ${
                    credits === opt 
                      ? 'bg-warning/20 border-2 border-warning text-warning' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  <Coins className="w-3 h-3" />
                  <span className="font-medium">{opt}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Semakin sulit task, semakin banyak credits
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Batal
            </Button>
            <Button 
              variant="success" 
              className="flex-1"
              onClick={handleSave}
              disabled={!title.trim()}
            >
              Tambah Todo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
