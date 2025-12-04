import { useState, useRef } from "react";
import { DeckItem } from "@/types";

interface SpinnerProps {
  items: DeckItem[];
  onSpinComplete: (item: DeckItem) => void;
  disabled?: boolean;
}

const SPIN_COLORS = [
  "hsl(270, 70%, 55%)",
  "hsl(300, 70%, 50%)",
  "hsl(330, 70%, 50%)",
  "hsl(200, 80%, 50%)",
  "hsl(180, 70%, 50%)",
  "hsl(160, 60%, 45%)",
  "hsl(45, 90%, 50%)",
  "hsl(20, 80%, 55%)",
];

export function Spinner({ items, onSpinComplete, disabled }: SpinnerProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<SVGGElement>(null);

  const segmentAngle = 360 / items.length;

  const spin = () => {
    if (isSpinning || disabled || items.length === 0) return;

    setIsSpinning(true);

    // Random extra rotations (5-10 full spins) + random stop position
    const extraSpins = (Math.floor(Math.random() * 5) + 5) * 360;
    const randomStop = Math.random() * 360;
    const totalRotation = rotation + extraSpins + randomStop;

    setRotation(totalRotation);

    setTimeout(() => {
      // Calculate which segment is at the top (0 degrees)
      const finalAngle = totalRotation % 360;
      const selectedIndex = Math.floor((360 - finalAngle + segmentAngle / 2) / segmentAngle) % items.length;
      
      setIsSpinning(false);
      onSpinComplete(items[selectedIndex]);
    }, 1000);
  };

  const getSegmentPath = (index: number): string => {
    const startAngle = (index * segmentAngle - 90) * (Math.PI / 180);
    const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180);
    
    const radius = 140;
    const cx = 150;
    const cy = 150;
    
    const x1 = cx + radius * Math.cos(startAngle);
    const y1 = cy + radius * Math.sin(startAngle);
    const x2 = cx + radius * Math.cos(endAngle);
    const y2 = cy + radius * Math.sin(endAngle);
    
    const largeArc = segmentAngle > 180 ? 1 : 0;
    
    return `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  const getTextPosition = (index: number) => {
    const angle = ((index + 0.5) * segmentAngle - 90) * (Math.PI / 180);
    const radius = 90;
    return {
      x: 150 + radius * Math.cos(angle),
      y: 150 + radius * Math.sin(angle),
      rotation: (index + 0.5) * segmentAngle,
    };
  };

  if (items.length === 0) {
    return (
      <div className="w-[300px] h-[300px] rounded-full glass flex items-center justify-center">
        <p className="text-muted-foreground text-center px-8">
          Tambahkan item ke deck untuk mulai spin
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Pointer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
        <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-accent drop-shadow-lg" />
      </div>

      {/* Wheel */}
      <svg 
        width="300" 
        height="300" 
        className={`spinner-glow cursor-pointer transition-transform duration-[4000ms] ${isSpinning ? '' : 'hover:scale-105'}`}
        style={{ 
          transform: `rotate(${rotation}deg)`,
          transitionTimingFunction: isSpinning ? 'cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'ease'
        }}
        onClick={spin}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Outer ring */}
        <circle cx="150" cy="150" r="148" fill="none" stroke="hsl(270, 50%, 30%)" strokeWidth="4" />
        
        <g ref={wheelRef}>
          {items.map((item, index) => {
            const textPos = getTextPosition(index);
            const color = SPIN_COLORS[index % SPIN_COLORS.length];
            
            return (
              <g key={item.id}>
                <path
                  d={getSegmentPath(index)}
                  fill={color}
                  stroke="hsl(270, 40%, 15%)"
                  strokeWidth="2"
                />
                <text
                  x={textPos.x}
                  y={textPos.y}
                  fill="white"
                  fontSize="11"
                  fontWeight="600"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${textPos.rotation}, ${textPos.x}, ${textPos.y})`}
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                >
                  {item.name.length > 12 ? item.name.slice(0, 12) + '...' : item.name}
                </text>
              </g>
            );
          })}
        </g>

        {/* Center circle */}
        <circle cx="150" cy="150" r="25" fill="hsl(270, 40%, 12%)" stroke="hsl(270, 70%, 55%)" strokeWidth="3" />
        <text x="150" y="150" fill="hsl(270, 70%, 55%)" fontSize="10" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
          SPIN
        </text>
      </svg>

      {/* Spin instruction */}
      {!isSpinning && (
        <p className="text-center text-sm text-muted-foreground mt-4 animate-pulse">
          Tap wheel untuk spin
        </p>
      )}
    </div>
  );
}
