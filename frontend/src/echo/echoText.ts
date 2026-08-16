import type { EchoZoneType } from './zones';
import type { SpeciesId } from '../species/types';
import type { WaterBodyKind } from '../types/waterBody';
import { SPECIES } from '../species/data';
import { SPECIES_TEXT } from '../species/text';
import { isHabitatCompatible } from '../species/scoreSpecies';
import type { Locale } from '../i18n/translations';

/**
 * Qualitative "who tends to be here" species shortlist per zone type — not
 * a re-run of the weather-aware scoring engine, just a rough who's-who by
 * fish behaviour (ambush hunters near points, still-water fish in coves,
 * etc). Filtered per water body against real habitat data so a lake-only
 * species (crucian carp, rudd) never appears on a river zone.
 */
const ZONE_SPECIES: Record<EchoZoneType, SpeciesId[]> = {
  ambushPoint: ['pike', 'zander', 'perch', 'asp'],
  cove: ['carp', 'tench', 'crucianCarp', 'rudd', 'roach', 'silverBream'],
  openWater: ['zander', 'bream', 'eel', 'perch'],
  riverBend: ['pike', 'zander', 'chub', 'asp', 'burbot', 'catfish'],
  riverLane: ['roach', 'ide', 'silverBream', 'bream', 'chub'],
};

export function suggestedSpeciesFor(type: EchoZoneType, kind: WaterBodyKind, locale: Locale): string[] {
  const ids = ZONE_SPECIES[type];
  return ids
    .filter((id) => {
      const profile = SPECIES.find((s) => s.id === id);
      return profile ? isHabitatCompatible(kind, profile.habitat) : false;
    })
    .map((id) => SPECIES_TEXT[locale][id].name);
}
