import { Home, Layers, CheckSquare, History } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "home" | "decks" | "todos" | "history";

interface NavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs = [
  { id: "home" as Tab, icon: Home, label: "Home" },
  { id: "decks" as Tab, icon: Layers, label: "Decks" },
  { id: "todos" as Tab, icon: CheckSquare, label: "Todos" },
  { id: "history" as Tab, icon: History, label: "History" },
];

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 glass border-t border-border z-50">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-200",
                isActive 
                  ? "text-primary glow-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn(
                "w-6 h-6 transition-transform",
                isActive && "scale-110"
              )} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
