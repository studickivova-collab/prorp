import { useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { SPECIES } from '../species/data';
import { SPECIES_TEXT } from '../species/text';
import type { CatchEntry } from './types';
import type { DiaryPrefill } from './DiaryContext';

interface Props {
  prefill: DiaryPrefill | null;
  onSave: (entry: Omit<CatchEntry, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function DiaryForm({ prefill, onSave, onCancel }: Props) {
  const { t, locale } = useI18n();
  const [dateIso, setDateIso] = useState(todayIso());
  const [waterBodyName, setWaterBodyName] = useState(prefill?.waterBodyName ?? '');
  const [species, setSpecies] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [conditions, setConditions] = useState(prefill?.conditions ?? '');

  const canSave = waterBodyName.trim().length > 0 && species.trim().length > 0;

  const fieldClass =
    'w-full rounded-lg bg-surface-3 border border-line text-ink px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500';

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSave) return;
        onSave({
          dateIso,
          waterBodyName: waterBodyName.trim(),
          species: species.trim(),
          weightKg: weightKg ? Number(weightKg) : null,
          conditions: conditions.trim(),
          waterBodyId: prefill?.waterBodyId,
          lat: prefill?.lat,
          lon: prefill?.lon,
        });
      }}
      className="space-y-3"
    >
      {prefill?.lat !== undefined && prefill?.lon !== undefined && (
        <div className="text-xs text-brand-600 dark:text-brand-400 bg-brand-500/10 border border-brand-500/30 rounded-lg px-3 py-2">
          📍 {t('diary.pinnedOnMap')}
        </div>
      )}

      <label className="block">
        <span className="block text-xs text-ink-muted mb-1">{t('diary.date')}</span>
        <input type="date" value={dateIso} onChange={(e) => setDateIso(e.target.value)} className={fieldClass} />
      </label>

      <label className="block">
        <span className="block text-xs text-ink-muted mb-1">{t('diary.place')}</span>
        <input
          type="text"
          value={waterBodyName}
          onChange={(e) => setWaterBodyName(e.target.value)}
          placeholder={t('diary.placePlaceholder')}
          className={fieldClass}
        />
      </label>

      <label className="block">
        <span className="block text-xs text-ink-muted mb-1">{t('diary.species')}</span>
        <input
          type="text"
          list="diary-species-options"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          placeholder={t('diary.speciesPlaceholder')}
          className={fieldClass}
        />
        <datalist id="diary-species-options">
          {SPECIES.map((s) => (
            <option key={s.id} value={SPECIES_TEXT[locale][s.id].name} />
          ))}
        </datalist>
      </label>

      <label className="block">
        <span className="block text-xs text-ink-muted mb-1">{t('diary.weight')}</span>
        <input
          type="number"
          inputMode="decimal"
          min="0"
          step="0.1"
          value={weightKg}
          onChange={(e) => setWeightKg(e.target.value)}
          placeholder="0.0"
          className={fieldClass}
        />
      </label>

      <label className="block">
        <span className="block text-xs text-ink-muted mb-1">{t('diary.conditions')}</span>
        <textarea
          value={conditions}
          onChange={(e) => setConditions(e.target.value)}
          rows={2}
          className={`${fieldClass} resize-none`}
        />
      </label>

      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-ghost flex-1 py-2.5"
        >
          {t('diary.cancel')}
        </button>
        <button
          type="submit"
          disabled={!canSave}
          className="btn btn-primary flex-1 py-2.5"
        >
          {t('diary.save')}
        </button>
      </div>
    </form>
  );
}
