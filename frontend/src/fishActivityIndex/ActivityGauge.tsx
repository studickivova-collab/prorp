import type { ActivityLevel } from './types';

interface Props {
  score: number;
  level: ActivityLevel;
}

const LEVEL_COLOR: Record<ActivityLevel, string> = {
  excellent: '#34d399',
  good: '#4fa171',
  average: '#f0a94e',
  poor: '#f87171',
};

export function ActivityGauge({ score, level }: Props) {
  const color = LEVEL_COLOR[level];

  return (
    <div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-4xl font-bold tabular-nums" style={{ color }}>
          {score}
        </span>
        <span className="text-sm text-ink-muted">/ 100</span>
      </div>
      <div className="mt-2 h-2.5 rounded-full bg-surface-3 overflow-hidden">
        <div
          className="h-full rounded-full transition-[width] duration-500"
          style={{ width: `${score}%`, background: color }}
        />
      </div>
    </div>
  );
}
