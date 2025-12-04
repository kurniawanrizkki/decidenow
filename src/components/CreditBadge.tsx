import { Coins } from "lucide-react";

interface CreditBadgeProps {
  credits: number;
  size?: "sm" | "md" | "lg";
}

export function CreditBadge({ credits, size = "md" }: CreditBadgeProps) {
  const sizeClasses = {
    sm: "text-sm px-2 py-1",
    md: "text-base px-3 py-1.5",
    lg: "text-lg px-4 py-2",
  };

  const iconSize = {
    sm: 14,
    md: 18,
    lg: 22,
  };

  return (
    <div className={`glass rounded-full flex items-center gap-2 ${sizeClasses[size]}`}>
      <Coins className="text-warning" size={iconSize[size]} />
      <span className="font-semibold text-foreground">{credits}</span>
    </div>
  );
}
