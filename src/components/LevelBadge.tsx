import { Star, Zap } from "lucide-react";

interface LevelBadgeProps {
  level: number;
  experience: number;
}

export function LevelBadge({ level, experience }: LevelBadgeProps) {
  const currentLevelExp = (level - 1) * 100;
  const nextLevelExp = level * 100;
  const progress = ((experience - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100;

  return (
    <div className="glass rounded-xl p-3 flex items-center gap-3">
      <div className="relative">
        <div className="w-12 h-12 rounded-full btn-gradient flex items-center justify-center glow-primary">
          <span className="text-lg font-bold text-primary-foreground">{level}</span>
        </div>
        <Star className="absolute -top-1 -right-1 w-4 h-4 text-warning fill-warning" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
          <Zap className="w-3 h-3" />
          <span>{experience} XP</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full btn-gradient transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
