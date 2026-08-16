import type { SpeciesProfile } from './types';

/**
 * Реальные фотографии видов с Wikimedia Commons вместо эмодзи.
 * Special:FilePath — стабильная постоянная ссылка на файл без нужды
 * знать хэшированный путь загрузки; ?width= отдаёт готовый превью-thumbnail.
 */
function commonsPhoto(file: string, width = 300): string {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${file}?width=${width}`;
}

/**
 * Профили видов для скоринга (без текста — переводы см. в text.ts).
 * Значения приблизительные, усреднённые для водоёмов Латвии; при
 * калибровке по дневнику уловов это первое место для правок.
 */
export const SPECIES: SpeciesProfile[] = [
  {
    id: 'pike',
    image: commonsPhoto('Esox_lucius_Prague_Vltava_2.jpg'),
    activeMonths: [0, 1, 2, 8, 9, 10, 11],
    preferredTrends: ['falling', 'stable'],
    preferredTimeOfDay: ['dawn', 'dusk'],
    tempRange: [2, 18],
    habitat: ['lake', 'river', 'water'],
  },
  {
    id: 'perch',
    image: commonsPhoto('Perca_fluviatilis_Prague_Vltava_4.jpg'),
    activeMonths: [0, 1, 7, 8, 9, 10, 11],
    preferredTrends: ['stable', 'falling'],
    preferredTimeOfDay: ['dawn', 'dusk', 'day'],
    tempRange: [8, 22],
    habitat: ['lake', 'river', 'water'],
  },
  {
    id: 'zander',
    image: commonsPhoto('Sander_lucioperca_1.jpg'),
    activeMonths: [4, 5, 6, 7, 8, 9],
    preferredTrends: ['stable', 'falling'],
    preferredTimeOfDay: ['dusk', 'night'],
    tempRange: [14, 23],
    habitat: ['lake', 'river', 'water'],
  },
  {
    id: 'bream',
    image: commonsPhoto('Abramis_brama_Prague_Vltava_1.jpg'),
    activeMonths: [4, 5, 6, 7, 8],
    preferredTrends: ['stable'],
    preferredTimeOfDay: ['dawn', 'night'],
    tempRange: [14, 24],
    habitat: ['lake', 'river', 'water'],
  },
  {
    id: 'roach',
    image: commonsPhoto('Rutilus_rutilus_Prague_Vltava_3.jpg'),
    activeMonths: [0, 1, 2, 3, 4, 8, 9],
    preferredTrends: ['stable', 'rising'],
    preferredTimeOfDay: ['day', 'dawn'],
    tempRange: [6, 20],
    habitat: ['lake', 'river', 'water'],
  },
  {
    id: 'carp',
    image: commonsPhoto('Common_carp_-_Cyprinus_carpio.jpg'),
    activeMonths: [5, 6, 7, 8],
    preferredTrends: ['stable', 'falling'],
    preferredTimeOfDay: ['dawn', 'dusk', 'night'],
    tempRange: [18, 27],
    habitat: ['lake', 'water'],
  },
  {
    id: 'tench',
    image: commonsPhoto('Tinca_tinca_Prague_Vltava_2.jpg'),
    activeMonths: [5, 6, 7],
    preferredTrends: ['stable'],
    preferredTimeOfDay: ['dawn'],
    tempRange: [16, 24],
    habitat: ['lake', 'water'],
  },
  {
    id: 'eel',
    image: commonsPhoto('Anguilla_anguilla.jpg'),
    activeMonths: [5, 6, 7, 8],
    preferredTrends: ['stable', 'falling'],
    preferredTimeOfDay: ['night'],
    tempRange: [14, 22],
    habitat: ['lake', 'river', 'water'],
  },
  {
    id: 'catfish',
    image: commonsPhoto('Silurus_glanis_Prague_Vltava_1.jpg'),
    activeMonths: [4, 5, 6, 7, 8],
    preferredTrends: ['stable'],
    preferredTimeOfDay: ['dusk', 'night'],
    tempRange: [16, 26],
    habitat: ['lake', 'river', 'water'],
  },
  {
    id: 'burbot',
    image: commonsPhoto('Lota_lota_Prague_Vltava_1.jpg'),
    activeMonths: [9, 10, 11, 0, 1, 2],
    preferredTrends: ['falling', 'stable'],
    preferredTimeOfDay: ['night'],
    tempRange: [-2, 10],
    habitat: ['lake', 'river', 'water'],
  },
  {
    id: 'asp',
    image: commonsPhoto('Aspius_aspius_Prague_Vltava_1.jpg'),
    // Легальный сезон уже без нерестового запрета (1 марта — 15 мая) —
    // см. регуляторную заметку в тексте вида.
    activeMonths: [5, 6, 7, 8, 9],
    preferredTrends: ['stable', 'rising'],
    preferredTimeOfDay: ['dawn', 'day'],
    tempRange: [10, 22],
    habitat: ['river', 'lake'],
  },
  {
    id: 'ide',
    image: commonsPhoto('Leuciscus_idus_Prague_Vltava_1.jpg'),
    activeMonths: [3, 4, 5, 8, 9],
    preferredTrends: ['stable', 'rising'],
    preferredTimeOfDay: ['dawn', 'dusk'],
    tempRange: [8, 20],
    habitat: ['river', 'lake'],
  },
  {
    id: 'chub',
    image: commonsPhoto('Squalius_cephalus_Prague_Vltava_1.jpg'),
    activeMonths: [4, 5, 6, 7, 8],
    preferredTrends: ['stable'],
    preferredTimeOfDay: ['dawn', 'day'],
    tempRange: [10, 22],
    // Голавль — рыба течения: озёра и "непонятные" водоёмы ему не подходят.
    habitat: ['river'],
  },
  {
    id: 'crucianCarp',
    image: commonsPhoto('Carassius_carassius_Prague_Vltava_1.jpg'),
    activeMonths: [4, 5, 6, 7],
    preferredTrends: ['stable'],
    preferredTimeOfDay: ['dawn', 'day'],
    tempRange: [16, 26],
    // Классика стоячей заросшей воды — в реках и каналах почти не встречается.
    habitat: ['lake'],
  },
  {
    id: 'rudd',
    image: commonsPhoto('Scardinius_erythrophthalmus_Prague_Vltava_1.jpg'),
    activeMonths: [4, 5, 6, 7],
    preferredTrends: ['stable'],
    preferredTimeOfDay: ['day', 'dawn'],
    tempRange: [14, 24],
    habitat: ['lake'],
  },
  {
    id: 'silverBream',
    image: commonsPhoto('Blicca_bjoerkna_Prague_Vltava_1.jpg'),
    activeMonths: [4, 5, 6, 7, 8, 9],
    preferredTrends: ['stable', 'falling'],
    preferredTimeOfDay: ['dawn', 'night'],
    tempRange: [12, 22],
    habitat: ['lake', 'river', 'water'],
  },
];
