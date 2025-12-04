import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { HomeTab } from "@/components/tabs/HomeTab";
import { DecksTab } from "@/components/tabs/DecksTab";
import { TodosTab } from "@/components/tabs/TodosTab";
import { HistoryTab } from "@/components/tabs/HistoryTab";
import { CreditBadge } from "@/components/CreditBadge";
import { Deck, Todo, UserStats, SpinResult } from "@/types";
import {
  getUserStats,
  getDecks,
  getTodos,
  getSpinHistory,
  saveDeck,
  deleteDeck,
  saveTodo,
  completeTodo,
  deleteTodo,
} from "@/lib/storage";

type Tab = "home" | "decks" | "todos" | "history";

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [stats, setStats] = useState<UserStats>(getUserStats());
  const [decks, setDecks] = useState<Deck[]>(getDecks());
  const [todos, setTodos] = useState<Todo[]>(getTodos());
  const [history, setHistory] = useState<SpinResult[]>(getSpinHistory());

  const refreshStats = () => setStats(getUserStats());
  const refreshHistory = () => setHistory(getSpinHistory());

  const handleSaveDeck = (deck: Deck) => {
    setDecks(saveDeck(deck));
  };

  const handleDeleteDeck = (deckId: string) => {
    setDecks(deleteDeck(deckId));
  };

  const handleSaveTodo = (todo: Todo) => {
    setTodos(saveTodo(todo));
  };

  const handleCompleteTodo = (todoId: string, proofImage: string) => {
    setTodos(completeTodo(todoId, proofImage));
    refreshStats();
  };

  const handleDeleteTodo = (todoId: string) => {
    setTodos(deleteTodo(todoId));
  };

  const handleStatsUpdate = () => {
    refreshStats();
    refreshHistory();
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="glass sticky top-0 z-40 border-b border-border">
        <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">D</span>
            </div>
            <span className="font-semibold text-foreground">DecideNow</span>
          </div>
          <CreditBadge credits={stats.credits} />
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 max-w-md mx-auto">
        {activeTab === "home" && <HomeTab stats={stats} />}
        {activeTab === "decks" && (
          <DecksTab
            decks={decks}
            stats={stats}
            onSaveDeck={handleSaveDeck}
            onDeleteDeck={handleDeleteDeck}
            onStatsUpdate={handleStatsUpdate}
          />
        )}
        {activeTab === "todos" && (
          <TodosTab
            todos={todos}
            onSaveTodo={handleSaveTodo}
            onCompleteTodo={handleCompleteTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        )}
        {activeTab === "history" && <HistoryTab history={history} decks={decks} />}
      </main>

      {/* Bottom Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
