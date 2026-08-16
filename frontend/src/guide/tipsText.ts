import type { Locale } from '../i18n/translations';

export interface TipSection {
  id: string;
  title: string;
  body: string[];
}

/**
 * Общие советы по рыбалке в Латвии: сводка официальных правил (MK noteikumi
 * Nr. 800 "Makšķerēšanas, vēžošanas un zemūdens medību noteikumi") в
 * человеческом изложении + практические советы. Это ознакомительная
 * выжимка, а не юридический документ — перед поездкой на воду стоит
 * свериться с актуальной редакцией правил.
 */
export const TIPS_SECTIONS: Record<Locale, TipSection[]> = {
  ru: [
    {
      id: 'license',
      title: 'Карта рыболова',
      body: [
        'Для рыбалки на удочку нужна действующая карта рыболова (makšķerēšanas karte) и документ, удостоверяющий личность.',
        'Карта не нужна тем, кому нет 16 лет, тем, кому больше 65 лет, и людям с инвалидностью.',
        'На отдельных водоёмах с лицензионным ловом дополнительно нужна путёвка (лицензия) на конкретное место.',
      ],
    },
    {
      id: 'gear',
      title: 'Снасти и правила лова',
      body: [
        'Разрешено использовать не более двух снастей одновременно, на каждой — не более трёх крючков (в том числе тройников).',
        'Ловить рыбу на живца можно сеткой не более 1,5×1,5 м с ячеёй до 10 мм — только для наживки в том же водоёме, где она поймана.',
        'Пойманную рыбу нельзя разделывать до окончания рыбалки и продавать частным образом.',
      ],
    },
    {
      id: 'closedSeasons',
      title: 'Запреты и сроки нереста',
      body: [
        'С 1 марта по 30 апреля на большинстве водоёмов запрещена рыбалка с лодок и других плавсредств.',
        'У щуки, судака, жереха (салате) и ряда других видов — собственные сроки нерестового запрета, см. карточку вида в разделе «Виды рыб».',
        'В некоторых каналах Риги (Саркандаугава, Милгравис, Юглас-канал и др.) с 1 марта по 30 апреля рыбалка запрещена полностью — уточняйте актуальный список в официальных правилах.',
      ],
    },
    {
      id: 'limits',
      title: 'Минимальные размеры и нормы вылова',
      body: [
        'У многих видов установлен минимальный размер и/или дневная норма — они указаны в карточке каждого вида в разделе «Виды рыб».',
        'Размер рыбы измеряется от кончика носа до конца хвостового плавника.',
        'Рыбу, которую не оставляете себе, аккуратно снимите с крючка и сразу отпустите; если крючок не вынимается без вреда для рыбы — обрежьте леску.',
      ],
    },
    {
      id: 'etiquette',
      title: 'Этика и безопасность на воде',
      body: [
        'Убирайте за собой мусор и остатки прикормки — оставляйте место рыбалки чище, чем было.',
        'Не подходите ближе 50 м к промысловым сетям, рыбоходам и садкам, а также к мостам — лов с мостов и под ними запрещён.',
        'На льду держите дистанцию от лунок других рыболовов и проверяйте толщину льда перед выходом.',
      ],
    },
    {
      id: 'groundbaitBasics',
      title: 'Основы прикормки',
      body: [
        'Хищников (щука, судак, жерех, налим, сом) прикормкой не приманить — они реагируют только на движение, запах живца или звук.',
        'Мирную рыбу закармливайте небольшими порциями: лучше несколько раз докормить понемногу, чем высыпать всё сразу — крупная порция перекармливает рыбу и снижает клёв.',
        'Прикормку выбирайте под цвет дна и воды: тёмная — для тёмного ила, светлая — для песка, чтобы не настораживать рыбу пятном на грунте.',
      ],
    },
    {
      id: 'seasonWeather',
      title: 'Сезон, погода и время суток',
      body: [
        'Индекс активности рыбы и календарь клёва в приложении учитывают давление, фазу луны, температуру и время суток — используйте их, чтобы выбрать лучшее окно для рыбалки.',
        'Стабильное или медленно падающее давление обычно даёт лучший клёв, чем резкие скачки перед грозой или после неё.',
        'Рассвет и закат — самое активное время почти для всех видов; жаркий летний полдень рыба обычно пережидает на глубине.',
      ],
    },
    {
      id: 'whereToFish',
      title: 'Где ловить',
      body: [
        'На карте — более 10 000 озёр, рек и водохранилищ Латвии; фильтруйте по типу водоёма и ищите по названию в верхней строке поиска.',
        'Стоячую воду (озёра, пруды) выбирайте для карпа, карася, линя и красноперки; течение — для голавля, жереха и язя; щука, окунь, судак и лещ одинаково хорошо ловятся и там, и там.',
        'Открыв водоём на карте, вы увидите топ-3 наиболее вероятных вида под текущую погоду именно для этого типа водоёма — а полный список видов доступен в разделе «Виды рыб».',
      ],
    },
  ],
  lv: [
    {
      id: 'license',
      title: 'Makšķerēšanas karte',
      body: [
        'Makšķerējot nepieciešama derīga makšķerēšanas karte un personu apliecinošs dokuments.',
        'Karte nav nepieciešama personām līdz 16 gadu vecumam, personām virs 65 gadiem un personām ar invaliditāti.',
        'Atsevišķos ūdeņos ar licencēto makšķerēšanu papildus nepieciešama īpaša atļauja (licence) konkrētajai vietai.',
      ],
    },
    {
      id: 'gear',
      title: 'Rīki un makšķerēšanas kārtība',
      body: [
        'Vienlaikus atļauts izmantot ne vairāk kā divus makšķerēšanas rīkus, katram ne vairāk kā trīs āķus (arī vairākžuburu).',
        'Zivis ēsmai atļauts iegūt ar tīkliņu, kas nav lielāks par 1,5×1,5 m ar acu izmēru līdz 10 mm — tikai tajā pašā ūdenī, kur tās iegūtas.',
        'Noķertās zivis līdz makšķerēšanas beigām aizliegts sadalīt vai pārdot privāti.',
      ],
    },
    {
      id: 'closedSeasons',
      title: 'Liegumi un nārsta laiki',
      body: [
        'No 1. marta līdz 30. aprīlim vairumā ūdeņu aizliegta makšķerēšana no laivām un citiem peldošiem transportlīdzekļiem.',
        'Līdakai, zandartam, salatei un vairākām citām sugām ir savi nārsta liegumu periodi — skatiet konkrētās sugas karti sadaļā "Zivju sugas".',
        'Dažos Rīgas kanālos (Sarkandaugavā, Mīlgrāvī, Juglas kanālā u. c.) no 1. marta līdz 30. aprīlim makšķerēšana aizliegta pilnībā — pārbaudiet aktuālo sarakstu oficiālajos noteikumos.',
      ],
    },
    {
      id: 'limits',
      title: 'Minimālie izmēri un loma normas',
      body: [
        'Daudzām sugām noteikts minimālais garums un/vai dienas loma norma — tie norādīti katras sugas kartē sadaļā "Zivju sugas".',
        'Zivs garumu mēra no purna gala līdz astes spuras galam.',
        'Zivi, ko neatstājat lomā, uzmanīgi atbrīvojiet no āķa un uzreiz atlaidiet; ja āķi nevar izņemt nekaitējot zivij — nogrieziet auklu.',
      ],
    },
    {
      id: 'etiquette',
      title: 'Ētika un drošība pie ūdens',
      body: [
        'Savāciet atkritumus un ēsmošanas paliekas — atstājiet vietu tīrāku, nekā to atradāt.',
        'Neturieties tuvāk par 50 m no rūpnieciskās zvejas rīkiem, zivju ceļiem un sprostiem, kā arī no tiltiem — makšķerēšana no tiltiem un zem tiem ir aizliegta.',
        'Uz ledus turiet distanci no citu makšķernieku āliņģiem un pirms iešanas pārbaudiet ledus biezumu.',
      ],
    },
    {
      id: 'groundbaitBasics',
      title: 'Ēsmošanas pamati',
      body: [
        'Plēsējus (līdaku, zandartu, salati, vēdzeli, samu) ar ēsmošanu nepiesaistīsiet — tie reaģē tikai uz kustību, dzīvās zivtiņas smaržu vai skaņu.',
        'Miermīlīgo zivi ēsmojiet mazās porcijās: labāk papildināt vairākas reizes pa nedaudz, nekā izbērt visu uzreiz — liela porcija zivi pārbaro un samazina kodi.',
        'Izvēlieties ēsmošanu pēc grunts un ūdens krāsas: tumšu — tumšām dūņām, gaišu — smiltij, lai nepamanāms plankums grunti nesabiedē zivi.',
      ],
    },
    {
      id: 'seasonWeather',
      title: 'Sezona, laikapstākļi un diennakts laiks',
      body: [
        'Lietotnes zivju aktivitātes indekss un kodes kalendārs ņem vērā spiedienu, mēness fāzi, temperatūru un diennakts laiku — izmantojiet tos, lai izvēlētos labāko brīdi makšķerēšanai.',
        'Stabils vai lēni krītošs spiediens parasti dod labāku kodi nekā strauji lēcieni pirms negaisa vai pēc tā.',
        'Rīts un vakars ir aktīvākais laiks gandrīz visām sugām; vasaras dienas karstumu zivis parasti pārlaiž dziļumā.',
      ],
    },
    {
      id: 'whereToFish',
      title: 'Kur makšķerēt',
      body: [
        'Kartē — vairāk nekā 10 000 Latvijas ezeru, upju un ūdenskrātuvju; filtrējiet pēc ūdenstilpes veida un meklējiet pēc nosaukuma augšējā meklēšanas laukā.',
        'Stāvošu ūdeni (ezerus, dīķus) izvēlieties karpai, karūsai, līnim un rudulim; straumi — sapalam, salatei un ālantam; līdaka, asaris, zandarts un plaudis vienlīdz labi ķeras abos.',
        'Atverot ūdenstilpi kartē, redzēsiet top-3 visdrīzāk ķeramās sugas pašreizējiem apstākļiem un konkrētajam ūdenstilpes veidam — pilns sugu saraksts pieejams sadaļā "Zivju sugas".',
      ],
    },
  ],
  en: [
    {
      id: 'license',
      title: 'Fishing licence',
      body: [
        'A valid fishing card (makšķerēšanas karte) and ID are required to fish with a rod.',
        'No card is needed for anglers under 16, over 65, or with a registered disability.',
        'On waters with licensed fishing, an additional site-specific permit (licence) is required.',
      ],
    },
    {
      id: 'gear',
      title: 'Tackle and general rules',
      body: [
        'Up to two rods may be used at once, each with no more than three hooks (including treble hooks).',
        'Bait fish may be caught with a net no larger than 1.5×1.5 m with mesh up to 10 mm — only for use in the same water body where caught.',
        'Caught fish may not be gutted/cut up before the end of the session, or sold privately.',
      ],
    },
    {
      id: 'closedSeasons',
      title: 'Closures and spawning bans',
      body: [
        'From 1 March to 30 April, fishing from boats and other floating craft is banned on most waters.',
        'Pike, zander, asp and several other species each have their own spawning closure dates — see the species card in "Fish species".',
        'Several canals in Riga (Sarkandaugava, Mīlgrāvis, the Jugla Canal and others) are fully closed to fishing from 1 March to 30 April — check the official regulation for the current list.',
      ],
    },
    {
      id: 'limits',
      title: 'Minimum sizes and bag limits',
      body: [
        'Many species have a minimum length and/or a daily bag limit — these are listed on each species card in "Fish species".',
        'Fish length is measured from the tip of the snout to the end of the tail fin.',
        "Fish you don't keep should be unhooked gently and released immediately; if the hook can't be removed safely, cut the line instead.",
      ],
    },
    {
      id: 'etiquette',
      title: 'Etiquette and safety on the water',
      body: [
        'Take your rubbish and leftover bait with you — leave the spot cleaner than you found it.',
        'Stay at least 50 m from commercial fishing gear, fish passes and cages, and away from bridges — fishing from or under bridges is banned.',
        "On ice, keep your distance from other anglers' holes and check ice thickness before heading out.",
      ],
    },
    {
      id: 'groundbaitBasics',
      title: 'Groundbait basics',
      body: [
        "Predators (pike, zander, asp, burbot, catfish) won't come for groundbait — they respond only to movement, live-bait scent or sound.",
        'Feed coarse fish in small amounts: several light top-ups beat one big dump of bait — overfeeding kills the bite.',
        "Match groundbait colour to the bottom and water: dark for silt, pale for sand, so it doesn't stand out and spook fish.",
      ],
    },
    {
      id: 'seasonWeather',
      title: 'Season, weather and time of day',
      body: [
        "The app's fish activity index and bite calendar factor in pressure, moon phase, temperature and time of day — use them to pick the best window to fish.",
        'Stable or slowly falling pressure usually fishes better than sharp swings right before or after a storm.',
        'Dawn and dusk are the most active times for nearly every species; in summer, fish usually sit deep through the midday heat.',
      ],
    },
    {
      id: 'whereToFish',
      title: 'Where to fish',
      body: [
        "The map holds over 10,000 of Latvia's lakes, rivers and reservoirs — filter by water body type or search by name at the top.",
        'Pick still water (lakes, ponds) for carp, crucian carp, tench and rudd; current for chub, asp and ide; pike, perch, zander and bream do well in both.',
        'Open a water body on the map to see the top 3 species most likely right now for that type of water — the full species list lives in "Fish species".',
      ],
    },
  ],
};
