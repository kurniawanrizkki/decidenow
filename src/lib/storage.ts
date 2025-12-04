import { Deck, Todo, UserStats, SpinResult } from "@/types";

const STORAGE_KEYS = {
  DECKS: "decidenow_decks",
  TODOS: "decidenow_todos",
  USER_STATS: "decidenow_user_stats",
  SPIN_HISTORY: "decidenow_spin_history",
};

const DEFAULT_USER_STATS: UserStats = {
  credits: 10,
  totalDecisions: 0,
  todosCompleted: 0,
  level: 1,
  experience: 0,
};

// User Stats
export function getUserStats(): UserStats {
  const stored = localStorage.getItem(STORAGE_KEYS.USER_STATS);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(DEFAULT_USER_STATS));
  return DEFAULT_USER_STATS;
}

export function updateUserStats(stats: Partial<UserStats>): UserStats {
  const current = getUserStats();
  const updated = { ...current, ...stats };
  
  updated.level = Math.floor(updated.experience / 100) + 1;
  
  localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(updated));
  return updated;
}

export function addCredits(amount: number): UserStats {
  const current = getUserStats();
  return updateUserStats({ 
    credits: current.credits + amount,
    experience: current.experience + (amount * 10)
  });
}

export function spendCredits(amount: number): boolean {
  const current = getUserStats();
  if (current.credits < amount) return false;
  updateUserStats({ credits: current.credits - amount });
  return true;
}

// Decks
export function getDecks(): Deck[] {
  const stored = localStorage.getItem(STORAGE_KEYS.DECKS);
  const decks = stored ? JSON.parse(stored) : [];
  
  // Backward compatibility: pastikan setiap item punya `beban`
  return decks.map((deck: any) => ({
    ...deck,
    items: (deck.items || []).map((item: any) => ({
      ...item,
      beban: typeof item.beban === 'number' ? item.beban : 1,
    })),
  }));
}

export function saveDeck(deck: Deck): Deck[] {
  const decks = getDecks();
  const existingIndex = decks.findIndex(d => d.id === deck.id);
  
  if (existingIndex >= 0) {
    decks[existingIndex] = deck;
  } else {
    decks.push(deck);
  }
  
  localStorage.setItem(STORAGE_KEYS.DECKS, JSON.stringify(decks));
  return decks;
}

export function deleteDeck(deckId: string): Deck[] {
  const decks = getDecks().filter(d => d.id !== deckId);
  localStorage.setItem(STORAGE_KEYS.DECKS, JSON.stringify(decks));
  return decks;
}

// Todos
export function getTodos(): Todo[] {
  const stored = localStorage.getItem(STORAGE_KEYS.TODOS);
  return stored ? JSON.parse(stored) : [];
}

export function saveTodo(todo: Todo): Todo[] {
  const todos = getTodos();
  const existingIndex = todos.findIndex(t => t.id === todo.id);
  
  if (existingIndex >= 0) {
    todos[existingIndex] = todo;
  } else {
    todos.push(todo);
  }
  
  localStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(todos));
  return todos;
}

export function completeTodo(todoId: string, proofImage: string): Todo[] {
  const todos = getTodos();
  const todo = todos.find(t => t.id === todoId);
  
  if (todo && !todo.completed) {
    todo.completed = true;
    todo.proofImage = proofImage;
    todo.completedAt = Date.now();
    
    const stats = getUserStats();
    updateUserStats({
      credits: stats.credits + todo.credits,
      todosCompleted: stats.todosCompleted + 1,
      experience: stats.experience + (todo.credits * 15)
    });
  }
  
  localStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(todos));
  return todos;
}

export function deleteTodo(todoId: string): Todo[] {
  const todos = getTodos().filter(t => t.id !== todoId);
  localStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(todos));
  return todos;
}

// Spin History
export function getSpinHistory(): SpinResult[] {
  const stored = localStorage.getItem(STORAGE_KEYS.SPIN_HISTORY);
  return stored ? JSON.parse(stored) : [];
}

export function addSpinResult(result: SpinResult): SpinResult[] {
  const history = getSpinHistory();
  history.unshift(result);
  
  const trimmed = history.slice(0, 50);
  localStorage.setItem(STORAGE_KEYS.SPIN_HISTORY, JSON.stringify(trimmed));
  
  const stats = getUserStats();
  updateUserStats({ totalDecisions: stats.totalDecisions + 1 });
  
  return trimmed;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}