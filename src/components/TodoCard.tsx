import { useState, useRef } from "react";
import { Todo } from "@/types";
import { Check, Coins, Image, Trash2, X, Upload } from "lucide-react";
import { Button } from "./ui/button";

interface TodoCardProps {
  todo: Todo;
  onComplete: (todoId: string, proofImage: string) => void;
  onDelete: (todoId: string) => void;
}

export function TodoCard({ todo, onComplete, onDelete }: TodoCardProps) {
  const [showUpload, setShowUpload] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (previewImage) {
      onComplete(todo.id, previewImage);
      setShowUpload(false);
      setPreviewImage(null);
    }
  };

  if (todo.completed) {
    return (
      <div className="glass rounded-xl p-4 animate-fade-in opacity-70">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
            <Check className="w-5 h-5 text-success" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-foreground line-through">{todo.title}</h3>
            <div className="flex items-center gap-1 text-sm text-success">
              <Coins className="w-3 h-3" />
              <span>+{todo.credits} earned</span>
            </div>
          </div>
          {todo.proofImage && (
            <div className="w-12 h-12 rounded-lg overflow-hidden">
              <img src={todo.proofImage} alt="Proof" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl p-4 animate-fade-in">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{todo.title}</h3>
          {todo.description && (
            <p className="text-sm text-muted-foreground mt-1">{todo.description}</p>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive"
          onClick={() => onDelete(todo.id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-warning/10 border border-warning/30">
          <Coins className="w-4 h-4 text-warning" />
          <span className="text-sm font-medium text-warning">+{todo.credits} credits</span>
        </div>

        {!showUpload ? (
          <Button 
            variant="success" 
            size="sm"
            onClick={() => setShowUpload(true)}
          >
            <Check className="w-4 h-4" />
            <span>Complete</span>
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              setShowUpload(false);
              setPreviewImage(null);
            }}
          >
            <X className="w-4 h-4" />
            <span>Cancel</span>
          </Button>
        )}
      </div>

      {showUpload && (
        <div className="mt-4 pt-4 border-t border-border animate-fade-in">
          <p className="text-sm text-muted-foreground mb-3">
            Upload bukti untuk menyelesaikan task
          </p>
          
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          {!previewImage ? (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-32 rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <Upload className="w-8 h-8" />
              <span className="text-sm">Tap untuk upload gambar</span>
            </button>
          ) : (
            <div className="space-y-3">
              <div className="relative rounded-lg overflow-hidden">
                <img src={previewImage} alt="Preview" className="w-full h-32 object-cover" />
                <button
                  onClick={() => setPreviewImage(null)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-background/80 flex items-center justify-center text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <Button variant="success" className="w-full" onClick={handleSubmit}>
                <Check className="w-4 h-4" />
                <span>Submit & Claim {todo.credits} Credits</span>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
