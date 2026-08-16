import type { Locale } from '../i18n/translations';
import type { SpeciesId, SpeciesText } from './types';

export const SPECIES_TEXT: Record<Locale, Record<SpeciesId, SpeciesText>> = {
  ru: {
    pike: {
      name: 'Щука',
      season: 'Осень и зима лучше всего, весной часто действует нерестовый запрет',
      baits: ['Крупные воблеры', 'Колеблющиеся блёсны', 'Силикон 10–15 см', 'Живец'],
      tackle: ['Спиннинг, тест 20–60 г', 'Металлический поводок'],
    },
    perch: {
      name: 'Окунь',
      season: 'Активен почти круглый год, пики — осень и зима подо льдом',
      baits: ['Мелкие воблеры', 'Вертушки №1–3', 'Силикон на джиг-головке', 'Червь, опарыш'],
      tackle: ['Лёгкий спиннинг (UL/L)', 'Поплавочная удочка'],
    },
    zander: {
      name: 'Судак',
      season: 'Лето и начало осени, лучший клёв в сумерках и ночью',
      baits: ['Джиг с силиконом', 'Раттлины', 'Живец на снасточке'],
      tackle: ['Спиннинг с чувствительной вершинкой', 'Плетёный шнур'],
    },
    bream: {
      name: 'Лещ',
      season: 'Тёплый сезон, май — сентябрь, лучше на рассвете',
      baits: ['Червь', 'Опарыш', 'Кукуруза', 'Прикормочные шары'],
      tackle: ['Фидер', 'Поплавочная удочка для дальнего заброса'],
    },
    roach: {
      name: 'Плотва',
      season: 'Активна почти круглый год, включая рыбалку по льду',
      baits: ['Опарыш', 'Мотыль', 'Тесто', 'Мелкие бойлы'],
      tackle: ['Маховая/болонская удочка', 'Лёгкий фидер'],
    },
    carp: {
      name: 'Карп',
      season: 'Тёплая вода, июнь — сентябрь',
      baits: ['Бойлы', 'Кукуруза', 'Пеллетс'],
      tackle: ['Карповое удилище', 'Кормушка-ракета', 'Сигнализатор поклёвки'],
    },
    tench: {
      name: 'Линь',
      season: 'Раннее лето, лучший клёв на рассвете в заросших участках',
      baits: ['Червь', 'Мотыль', 'Кукуруза'],
      tackle: ['Лёгкий фидер', 'Поплавочная удочка'],
    },
    eel: {
      name: 'Угорь',
      season: 'Тёплые летние ночи',
      baits: ['Червь-выползок', 'Мёртвая рыбка'],
      tackle: ['Донная снасть', 'Прочный поводок'],
      note: 'Популяция ограничена — проверьте актуальные правила и лицензию перед ловлей',
    },
  },
  lv: {
    pike: {
      name: 'Līdaka',
      season: 'Vislabāk rudenī un ziemā, pavasarī bieži nārsta liegums',
      baits: ['Lieli vobleri', 'Karotes', 'Silikons 10–15 cm', 'Dzīvā zivtiņa'],
      tackle: ['Spinings, tests 20–60 g', 'Metāla pavadiņa'],
    },
    perch: {
      name: 'Asaris',
      season: 'Aktīvs gandrīz visu gadu, virsotnes — rudens un ziema zem ledus',
      baits: ['Mazi vobleri', 'Griezīši Nr. 1–3', 'Silikons uz džiga', 'Tārps, uodkāpurs'],
      tackle: ['Viegls spinings (UL/L)', 'Pludiņmakšķere'],
    },
    zander: {
      name: 'Zandarts',
      season: 'Vasara un rudens sākums, labākā kode krēslā un naktī',
      baits: ['Džigs ar silikonu', 'Ratliny', 'Dzīvā zivtiņa uz snastes'],
      tackle: ['Jutīgs spinings', 'Pītā aukla'],
    },
    bream: {
      name: 'Plaudis',
      season: 'Silts sezona, maijs–septembris, labāk agri no rīta',
      baits: ['Tārps', 'Uodkāpurs', 'Kukurūza', 'Barošanas lodītes'],
      tackle: ['Fīderis', 'Pludiņmakšķere tālam metienam'],
    },
    roach: {
      name: 'Rauda',
      season: 'Aktīva gandrīz visu gadu, arī zemledus makšķerēšanā',
      baits: ['Uodkāpurs', 'Mušu kāpurs', 'Mīkla', 'Mazi boili'],
      tackle: ['Māvas/boloņas makšķere', 'Viegls fīderis'],
    },
    carp: {
      name: 'Karpa',
      season: 'Silts ūdens, jūnijs–septembris',
      baits: ['Boili', 'Kukurūza', 'Peletes'],
      tackle: ['Karpu makšķere', 'Barošanas raķete', 'Kodes signalizators'],
    },
    tench: {
      name: 'Līnis',
      season: 'Vasaras sākums, labākā kode agri no rīta aizaugušās vietās',
      baits: ['Tārps', 'Uodkāpurs', 'Kukurūza'],
      tackle: ['Viegls fīderis', 'Pludiņmakšķere'],
    },
    eel: {
      name: 'Zutis',
      season: 'Siltas vasaras naktis',
      baits: ['Lielais tārps', 'Beigta zivtiņa'],
      tackle: ['Grunts snaste', 'Izturīga pavadiņa'],
      note: 'Populācija ierobežota — pirms makšķerēšanas pārbaudiet aktuālos noteikumus un licenci',
    },
  },
  en: {
    pike: {
      name: 'Pike',
      season: 'Best in autumn and winter; spring often under a spawning closure',
      baits: ['Large jerkbaits/crankbaits', 'Spoons', '10–15 cm soft lures', 'Live bait'],
      tackle: ['Spinning rod, 20–60 g', 'Wire leader'],
    },
    perch: {
      name: 'Perch',
      season: 'Active nearly year-round, peaks in autumn and under winter ice',
      baits: ['Small crankbaits', 'Spinners #1–3', 'Soft lure on jig head', 'Worm, maggot'],
      tackle: ['Light spinning rod (UL/L)', 'Float rod'],
    },
    zander: {
      name: 'Zander',
      season: 'Summer through early autumn, best at dusk and at night',
      baits: ['Jig with soft lure', 'Rattling lures', 'Live bait rig'],
      tackle: ['Sensitive-tip spinning rod', 'Braided line'],
    },
    bream: {
      name: 'Bream',
      season: 'Warm season, May–September, best at dawn',
      baits: ['Worm', 'Maggot', 'Sweetcorn', 'Groundbait balls'],
      tackle: ['Feeder rod', 'Long-cast float rod'],
    },
    roach: {
      name: 'Roach',
      season: 'Active nearly year-round, including ice fishing',
      baits: ['Maggot', 'Bloodworm', 'Dough', 'Small boilies'],
      tackle: ['Pole/bolognese rod', 'Light feeder'],
    },
    carp: {
      name: 'Carp',
      season: 'Warm water, June–September',
      baits: ['Boilies', 'Sweetcorn', 'Pellets'],
      tackle: ['Carp rod', 'Bait rocket', 'Bite alarm'],
    },
    tench: {
      name: 'Tench',
      season: 'Early summer, best at dawn near weedy margins',
      baits: ['Worm', 'Bloodworm', 'Sweetcorn'],
      tackle: ['Light feeder', 'Float rod'],
    },
    eel: {
      name: 'Eel',
      season: 'Warm summer nights',
      baits: ['Lobworm', 'Dead baitfish'],
      tackle: ['Bottom rig', 'Sturdy leader'],
      note: 'Population is restricted — check current regulations and licence requirements before fishing',
    },
  },
};
