import { useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { SPECIES_TEXT } from './text';
import type { ScoredSpecies } from './types';

interface Props {
  scored: ScoredSpecies;
  rank: number;
}

function scoreColor(score: number): string {
  if (score >= 70) return 'text-emerald-600 dark:text-emerald-400';
  if (score >= 45) return 'text-amber-600 dark:text-amber-400';
  return 'text-ink-muted';
}

export function SpeciesCard({ scored, rank }: Props) {
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(rank === 0);
  const [photoFailed, setPhotoFailed] = useState(false);
  const text = SPECIES_TEXT[locale][scored.profile.id];

  return (
    <div className="panel overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2.5 p-2.5 text-left"
      >
        {photoFailed ? (
          <span className="shrink-0 w-9 h-9 rounded-full bg-surface-3 border-2 border-brand-600/60 flex items-center justify-center text-base leading-none">
            🐟
          </span>
        ) : (
          <img
            src={scored.profile.image}
            alt={text.name}
            onError={() => setPhotoFailed(true)}
            className="shrink-0 w-9 h-9 rounded-full object-cover border-2 border-brand-600/60 shadow-[0_0_0_2px_var(--color-surface-1)]"
          />
        )}
        <span className="flex-1 min-w-0">
          <span className="block text-sm font-medium text-ink truncate">{text.name}</span>
          <span className="block text-[11px] text-ink-muted truncate">{text.season}</span>
        </span>
        <span className={`text-sm font-semibold tabular-nums ${scoreColor(scored.score)}`}>{scored.score}</span>
        <span className="text-ink-faint text-xs">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="px-3 pb-3 pt-0.5 space-y-2 text-xs text-ink-soft">
          <div>
            <span className="text-ink-faint">{t('species.baits')}: </span>
            {text.baits.join(', ')}
          </div>
          <div>
            <span className="text-ink-faint">{t('species.tackle')}: </span>
            {text.tackle.join(', ')}
          </div>
          {text.note && <div className="text-amber-600 dark:text-amber-400/90">⚠ {text.note}</div>}
        </div>
      )}
    </div>
  );
}
