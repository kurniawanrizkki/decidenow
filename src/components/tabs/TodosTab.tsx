import { useState } from "react";
import { Todo } from "@/types";
import { TodoCard } from "../TodoCard";
import { CreateTodoModal } from "../CreateTodoModal";
import { Button } from "../ui/button";
import { Plus, CheckSquare } from "lucide-react";

interface TodosTabProps {
  todos: Todo[];
  onSaveTodo: (todo: Todo) => void;
  onCompleteTodo: (todoId: string, proofImage: string) => void;
  onDeleteTodo: (todoId: string) => void;
}

export function TodosTab({ todos, onSaveTodo, onCompleteTodo, onDeleteTodo }: TodosTabProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("active");

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeTodos = todos.filter(t => !t.completed);
  const completedTodos = todos.filter(t => t.completed);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Todos</h2>
          <p className="text-sm text-muted-foreground">
            {activeTodos.length} aktif • {completedTodos.length} selesai
          </p>
        </div>
        <Button variant="success" size="sm" onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4" />
          <span>Tambah</span>
        </Button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4">
        {(["active", "completed", "all"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === f 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {f === "active" ? "Aktif" : f === "completed" ? "Selesai" : "Semua"}
          </button>
        ))}
      </div>

      {filteredTodos.length === 0 ? (
        <div className="glass rounded-xl p-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
            <CheckSquare className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">
            {filter === "active" ? "Tidak ada todo aktif" : 
             filter === "completed" ? "Belum ada todo selesai" : "Belum ada todo"}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {filter === "active" 
              ? "Buat todo baru untuk mendapat credits!" 
              : "Selesaikan todo untuk mendapat credits"}
          </p>
          {filter !== "completed" && (
            <Button variant="success" onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4" />
              <span>Buat Todo</span>
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTodos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onComplete={onCompleteTodo}
              onDelete={onDeleteTodo}
            />
          ))}
        </div>
      )}

      <CreateTodoModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={onSaveTodo}
      />
    </div>
  );
}
