import { useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { SPECIES } from '../species/data';
import { SPECIES_TEXT } from '../species/text';
import type { WaterBodyKind } from '../types/waterBody';

const HABITAT_ICON: Record<WaterBodyKind, string> = {
  lake: '🌊',
  river: '🏞️',
  water: '💧',
};

function HabitatBadges({ habitat }: { habitat: WaterBodyKind[] }) {
  const { t } = useI18n();
  return (
    <span className="flex flex-wrap gap-1">
      {habitat.map((kind) => (
        <span
          key={kind}
          className="inline-flex items-center gap-1 rounded-full bg-surface-3 border border-line px-2 py-0.5 text-[10px] text-ink-muted"
        >
          {HABITAT_ICON[kind]} {t(`water.${kind}`)}
        </span>
      ))}
    </span>
  );
}

function SpeciesEntry({ id }: { id: (typeof SPECIES)[number]['id'] }) {
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);
  const profile = SPECIES.find((s) => s.id === id)!;
  const text = SPECIES_TEXT[locale][id];

  return (
    <div className="panel overflow-hidden">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center gap-2.5 p-2.5 text-left">
        {photoFailed ? (
          <span className="shrink-0 w-9 h-9 rounded-full bg-surface-3 border-2 border-brand-600/60 flex items-center justify-center text-base leading-none">
            🐟
          </span>
        ) : (
          <img
            src={profile.image}
            alt={text.name}
            onError={() => setPhotoFailed(true)}
            className="shrink-0 w-9 h-9 rounded-full object-cover border-2 border-brand-600/60"
          />
        )}
        <span className="flex-1 min-w-0">
          <span className="block text-sm font-medium text-ink truncate">{text.name}</span>
          <span className="block text-[11px] text-ink-muted truncate">{text.season}</span>
        </span>
        <HabitatBadges habitat={profile.habitat} />
        <span className="text-ink-faint text-xs">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="px-3 pb-3 pt-0.5 space-y-2 text-xs text-ink-soft">
          <div>
            <span className="text-ink-faint">{t('species.habits')}: </span>
            {text.habits}
          </div>
          <div>
            <span className="text-ink-faint">{t('species.baits')}: </span>
            {text.baits.join(', ')}
          </div>
          <div>
            <span className="text-ink-faint">{t('species.tackle')}: </span>
            {text.tackle.join(', ')}
          </div>
          {text.groundbait.length > 0 && (
            <div>
              <span className="text-ink-faint block mb-0.5">{t('species.groundbait')}:</span>
              <ul className="list-disc list-inside space-y-0.5">
                {text.groundbait.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          )}
          {text.regulation && (
            <div className="text-ink-faint border-t border-line pt-1.5 mt-1.5">
              <span className="font-medium text-ink-soft">{t('species.regulation')}: </span>
              {text.regulation}
            </div>
          )}
          {text.note && <div className="text-amber-600 dark:text-amber-400/90">⚠ {text.note}</div>}
        </div>
      )}
    </div>
  );
}

export function AllSpeciesList() {
  const { t } = useI18n();

  return (
    <div>
      <p className="text-xs text-ink-muted mb-2.5">{t('guide.species.subtitle')}</p>
      <div className="space-y-2">
        {SPECIES.map((s) => (
          <SpeciesEntry key={s.id} id={s.id} />
        ))}
      </div>
    </div>
  );
}
