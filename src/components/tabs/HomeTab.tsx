import { UserStats } from "@/types";
import { CreditBadge } from "../CreditBadge";
import { LevelBadge } from "../LevelBadge";
import { Target, CheckCircle2, Sparkles } from "lucide-react";

interface HomeTabProps {
  stats: UserStats;
}

export function HomeTab({ stats }: HomeTabProps) {
  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="text-center pt-4">
        <h1 className="text-3xl font-bold text-gradient mb-2">DecideNow</h1>
        <p className="text-muted-foreground">
          Buat keputusan jadi seru & menyenangkan
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CreditBadge credits={stats.credits} size="lg" />
          </div>
          <p className="text-sm text-muted-foreground">Credits tersedia</p>
        </div>
        
        <LevelBadge level={stats.level} experience={stats.experience} />
      </div>

      {/* Quick Stats */}
      <div className="glass rounded-xl p-4">
        <h3 className="font-semibold text-foreground mb-4">Statistik Kamu</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{stats.totalDecisions}</p>
              <p className="text-xs text-muted-foreground">Total Decisions</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{stats.todosCompleted}</p>
              <p className="text-xs text-muted-foreground">Todos Done</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="glass rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg btn-gradient flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Tips</h3>
            <p className="text-sm text-muted-foreground">
              Selesaikan todos untuk mendapat credits. Gunakan credits untuk spin deck dan buat keputusan dengan cara yang menyenangkan!
            </p>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">Cara Bermain</h3>
        <div className="space-y-2">
          {[
            { step: 1, text: "Buat deck berisi pilihan-pilihan kamu" },
            { step: 2, text: "Selesaikan todos untuk mendapat credits" },
            { step: 3, text: "Gunakan credits untuk spin dan pilih!" },
          ].map((item) => (
            <div key={item.step} className="flex items-center gap-3 glass rounded-lg p-3">
              <div className="w-8 h-8 rounded-full btn-gradient flex items-center justify-center text-sm font-bold text-primary-foreground">
                {item.step}
              </div>
              <p className="text-sm text-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
