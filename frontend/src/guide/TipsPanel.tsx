import { useI18n } from '../i18n/I18nContext';
import { TIPS_SECTIONS } from './tipsText';

export function TipsPanel() {
  const { locale } = useI18n();
  const sections = TIPS_SECTIONS[locale];

  return (
    <div className="space-y-3">
      {sections.map((section) => (
        <div key={section.id} className="panel p-3">
          <h3 className="font-display text-sm font-semibold text-ink mb-1.5">{section.title}</h3>
          <ul className="space-y-1.5 text-xs text-ink-soft list-disc list-inside">
            {section.body.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
