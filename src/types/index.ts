export interface DeckItem {
  id: string;
  name: string;
  color: string;
}

export interface Deck {
  id: string;
  name: string;
  description: string;
  items: DeckItem[];
  beban: number; 
  createdAt: number;
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  credits: number;
  completed: boolean;
  proofImage?: string;
  createdAt: number;
  completedAt?: number;
}

export interface UserStats {
  credits: number;
  totalDecisions: number;
  todosCompleted: number;
  level: number;
  experience: number;
}

export interface SpinResult {
  deckId: string;
  selectedItem: DeckItem;
  timestamp: number;
}
