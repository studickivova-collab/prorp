import type { Locale } from '../i18n/translations';
import type { SpeciesId, SpeciesText } from './types';

export const SPECIES_TEXT: Record<Locale, Record<SpeciesId, SpeciesText>> = {
  ru: {
    pike: {
      name: 'Щука',
      season: 'Осень и зима лучше всего, весной часто действует нерестовый запрет',
      habits:
        'Хищник-засадчик: стоит у коряг, в водорослях, у обрывистых бровок и ждёт добычу. Активнее в пасмурную погоду и при похолодании, яркое солнце и жару не любит.',
      baits: ['Крупные воблеры', 'Колеблющиеся блёсны', 'Силикон 10–15 см', 'Живец'],
      tackle: ['Спиннинг, тест 20–60 г', 'Металлический поводок'],
      groundbait: [
        'Щуку не прикармливают — это хищник, реагирует только на движение приманки или живца',
        'Для ловли на живца важнее его свежесть — лучше взять из того же водоёма',
      ],
      regulation:
        'Разрешено 5 шт., из них не более одной длиннее 75 см. Минимальный размер — 50 см. Запрет на вылов: 1 марта — 30 апреля (нерест).',
    },
    perch: {
      name: 'Окунь',
      season: 'Активен почти круглый год, пики — осень и зима подо льдом',
      habits:
        'Держится стаями у коряг, свай и кромки водорослей; крупный окунь чаще одиночка и охотится у дна. Активно реагирует на суету малька у поверхности.',
      baits: ['Мелкие воблеры', 'Вертушки №1–3', 'Силикон на джиг-головке', 'Червь, опарыш'],
      tackle: ['Лёгкий спиннинг (UL/L)', 'Поплавочная удочка'],
      groundbait: [
        'Мелкий мотыль или рубленый червь малыми порциями приучает стаю держаться у точки',
        'Не перекармливайте: окунь — хищник и на слишком сытной прикормке не задерживается',
      ],
      regulation:
        'Из внутренних водоёмов — 5 кг на человека (из Балтийского моря и Рижского залива — 10 кг). Минимальный размер не установлен, кроме морских вод (19 см).',
    },
    zander: {
      name: 'Судак',
      season: 'Лето и начало осени, лучший клёв в сумерках и ночью',
      habits:
        'Держится стаями на русловых бровках, в ямах и у коряжника на течении, охотится на мелкую рыбу в сумерках и ночью. Чувствителен к падению давления перед грозой — клёв обычно усиливается.',
      baits: ['Джиг с силиконом', 'Раттлины', 'Живец на снасточке'],
      tackle: ['Спиннинг с чувствительной вершинкой', 'Плетёный шнур'],
      groundbait: [
        'На прикормку как хищник не реагирует',
        'Ищите скопления мелкой рыбы — там, где кормится плотва или уклейка, скорее всего есть и судак',
      ],
      regulation:
        'Разрешено 5 шт., из них не более одной длиннее 75 см. Минимальный размер — 45 см. Запрет на вылов: 16 апреля — 31 мая (нерест).',
    },
    bream: {
      name: 'Лещ',
      season: 'Тёплый сезон, май — сентябрь, лучше на рассвете',
      habits:
        'Стайная донная рыба, кормится на глубоких поливах и бровках, часто выдаёт себя пузырями на поверхности. Пугливый — на шум с берега уходит и кормится осторожнее.',
      baits: ['Червь', 'Опарыш', 'Кукуруза', 'Прикормочные шары'],
      tackle: ['Фидер', 'Поплавочная удочка для дальнего заброса'],
      groundbait: [
        'Плотная фидерная прикормка с земляным/сладким запахом (какао, жмых) — 3–5 шаров для старта, докорм каждые 20–30 минут малыми порциями',
        'В прикормку полезно добавить рубленого червя и немного тех же насадок, что на крючке',
      ],
      regulation: 'Без ограничения по количеству и размеру.',
    },
    roach: {
      name: 'Плотва',
      season: 'Активна почти круглый год, включая рыбалку по льду',
      habits:
        'Держится стаями у водорослей, свай и бровок, кормится мелкими порциями почти весь день. Хорошо реагирует на лёгкую, часто обновляемую прикормку.',
      baits: ['Опарыш', 'Мотыль', 'Тесто', 'Мелкие бойлы'],
      tackle: ['Маховая/болонская удочка', 'Лёгкий фидер'],
      groundbait: [
        'Лёгкая пылящая прикормка светлого цвета — 1–2 небольших шара для старта, дальше подкармливать понемногу каждые 15 минут',
        'Мотыль или опарыш в прикормке усиливают клёв',
      ],
      regulation: 'Без ограничения по количеству и размеру.',
    },
    carp: {
      name: 'Карп',
      season: 'Тёплая вода, июнь — сентябрь',
      habits:
        'Держится на прогретых мелководьях и у растительности, кормится у дна, часто на одних и тех же приученных прикормкой точках. Осторожен, требует тишины и правильно подобранного грунта.',
      baits: ['Бойлы', 'Кукуруза', 'Пеллетс'],
      tackle: ['Карповое удилище', 'Кормушка-ракета', 'Сигнализатор поклёвки'],
      groundbait: [
        'Закорм точки за 1–2 дня до рыбалки: 1–2 кг бойлов/пеллетса небольшими партиями приучают карпа держаться на месте',
        'В день ловли докармливать умеренно — переизбыток корма снижает частоту поклёвок',
      ],
      regulation: 'Без ограничения по количеству и размеру.',
    },
    tench: {
      name: 'Линь',
      season: 'Раннее лето, лучший клёв на рассвете в заросших участках',
      habits:
        'Любит илистое дно и заросли кувшинок, кормится на рассвете и в пасмурную погоду, очень осторожен и не переносит шума на берегу.',
      baits: ['Червь', 'Мотыль', 'Кукуруза'],
      tackle: ['Лёгкий фидер', 'Поплавочная удочка'],
      groundbait: [
        'Небольшое количество тёмной прикормки с червём или мотылём у границы водорослей, докорм редкий — линь долго стоит на закормленной точке',
      ],
      regulation: 'Минимальный размер — 25 см, разрешено 5 шт.',
    },
    eel: {
      name: 'Угорь',
      season: 'Тёплые летние ночи',
      habits:
        'Кормится в темноте у дна, часто в норах и корягах, реагирует в первую очередь на запах, а не на визуальную приманку.',
      baits: ['Червь-выползок', 'Мёртвая рыбка'],
      tackle: ['Донная снасть', 'Прочный поводок'],
      groundbait: [
        'Прикормка почти не нужна — угорь находит наживку по запаху; можно опустить у точки немного рубленого червя',
      ],
      regulation:
        'Минимальный размер — 50 см, разрешён 1 шт. (в озёрах Алаукстс, Алуксне, Разнас и ряде других — 3 шт.).',
      note: 'Популяция ограничена — проверьте актуальные правила и лицензию перед ловлей',
    },
    catfish: {
      name: 'Сом',
      season: 'Тёплая вода, май — сентябрь, крупная рыба активна тёплыми ночами',
      habits:
        'Держится в глубоких ямах, у коряжника и обрывистых берегов больших рек и озёр. Почти всеяден, охотится в основном ночью по запаху и звуку, но летом в мутной воде может брать и днём.',
      baits: ['Крупный живец', 'Выползок пучком', 'Мясо ракушки-перловицы', 'Кальмар, печень'],
      tackle: ['Мощное донное удилище', 'Кластера (клонк) — сом чувствует колебания воды', 'Прочная плетёнка от 0,3 мм'],
      groundbait: [
        'Классика — кластер (clonk): деревянная колотушка, которой бьют по воде, издавая звук вроде кваканья лягушки, привлекает сома издалека',
        'На стационарной точке можно оставить потроха или мёртвую рыбу — сом идёт на запах',
      ],
      regulation: 'Минимальный размер — 60 см, разрешено 3 шт.',
    },
    burbot: {
      name: 'Налим',
      season: 'Осень и зима, пик активности подо льдом в декабре–январе на нересте',
      habits:
        'Единственная холодолюбивая тресковая рыба наших водоёмов: летом впадает в оцепенение и почти не питается, а с похолоданием воды ниже 10°C начинает активно кормиться, особенно ночью.',
      baits: ['Живец (ёрш, пескарь)', 'Мёртвая рыбка на донку', 'Червь-выползок'],
      tackle: ['Донная снасть/закидушка', 'Жерлицы для ловли со льда'],
      groundbait: [
        'Прикормка налиму не нужна — привлекает запах свежей рыбы или мяса на снасти',
        'Лучшие точки — не там, где кормили, а где есть коряги, камни и перепад глубины',
      ],
      regulation: 'Минимальный размер — 35 см, разрешено 5 шт.',
    },
    asp: {
      name: 'Жерех (Салате)',
      season: 'Разрешённый сезон — июнь–октябрь, весной действует нерестовый запрет',
      habits:
        'Хищник открытой воды, охотится на течении и перекатах, знаменит своим «боем» — шумными ударами по стае малька у поверхности на рассвете. Пуглив, требует дальнего и точного заброса.',
      baits: ['Кастмастеры и колебалки', 'Воблеры-минноу', 'Мелкий силикон на лёгкой джиг-головке'],
      tackle: ['Спиннинг быстрого строя для дальнего заброса', 'Тонкая плетёнка'],
      groundbait: [
        'Жереха не ловят на прикормку — его ищут по всплескам и «бою» на поверхности',
        'Полезно приехать на место затемно и понаблюдать за водой, а не забрасывать наугад',
      ],
      regulation:
        'Официальное латвийское название — салате (лесная вимба). Минимальный размер — 45 см, разрешено 3 шт. Запрет на вылов: 1 марта — 15 мая.',
    },
    ide: {
      name: 'Язь',
      season: 'Весна и осень, лучший клёв на рассвете и закате',
      habits:
        'Держится у обратных течений, свай мостов и глубоких ям, весной в тёплые дни часто выходит кормиться у поверхности.',
      baits: ['Червь', 'Ручейник', 'Мелкие воблеры и вращающиеся блёсны'],
      tackle: ['Лёгкий спиннинг', 'Поплавочная удочка для дальнего заброса'],
      groundbait: [
        'Прикормка с рубленым червём и панировочными сухарями, забрасывать небольшими шарами выше по течению от точки ловли',
      ],
      regulation: 'Минимальный размер — 30 см.',
    },
    chub: {
      name: 'Голавль',
      season: 'Весна–лето, активен в тёплые солнечные дни на течении',
      habits:
        'Осторожная рыба переката и быстрого течения, стоит у нависающих деревьев, охотится на упавших в воду насекомых. Река — единственный подходящий дом: в озёрах и стоячей воде почти не встречается.',
      baits: ['Кузнечик, майский жук', 'Некрупный воблер-крэнк', 'Хлебная корка'],
      tackle: ['Лёгкий спиннинг', 'Нахлыст'],
      groundbait: [
        'Прикормка малоэффективна из-за течения — лучше подбрасывать несколько насекомых или хлебных крошек выше по течению от точки',
      ],
      regulation: 'Минимальный размер — 30 см.',
    },
    crucianCarp: {
      name: 'Карась',
      season: 'Тёплая вода, май — август, лучший клёв в тихую пасмурную погоду',
      habits:
        'Живёт в стоячей, часто заросшей и заиленной воде, переносит низкое содержание кислорода лучше почти любой другой рыбы. Клюёт медленно и осторожно, подолгу «пробуя» насадку.',
      baits: ['Опарыш', 'Червь', 'Тесто', 'Перловка'],
      tackle: ['Лёгкая поплавочная удочка', 'Короткий фидер'],
      groundbait: [
        'Немного вязкой прикормки без резкого запаха у границы камыша, докорм редкий и малыми порциями — карась не любит суеты на точке',
      ],
      regulation: 'Без ограничения по количеству и размеру.',
    },
    rudd: {
      name: 'Красноперка',
      season: 'Тёплая вода, май — август',
      habits:
        'Похожа повадками на плотву, но держится выше в толще воды и ближе к зарослям кувшинок и камыша, кормится в тёплой верхней воде.',
      baits: ['Опарыш', 'Ручейник', 'Хлеб', 'Мелкие бойлы'],
      tackle: ['Маховая удочка', 'Лёгкий поплавок с дальним отпуском'],
      groundbait: ['Лёгкая прикормка у самой границы зарослей, докорм небольшими порциями каждые 15–20 минут'],
      regulation: 'Без ограничения по количеству и размеру.',
    },
    silverBream: {
      name: 'Густера',
      season: 'Тёплый сезон, май — сентябрь, активна на рассвете и ночью',
      habits:
        'Похожа на леща, но мельче и держится ближе к берегу, кормится плотными стаями у дна на глубоких поливах.',
      baits: ['Червь', 'Опарыш', 'Мотыль'],
      tackle: ['Фидер', 'Поплавочная удочка для дальнего заброса'],
      groundbait: [
        'Фидерная прикормка средней вязкости с мотылём, докорм каждые 20–30 минут — густера быстро выедает точку',
      ],
      regulation: 'Без ограничения по количеству и размеру.',
    },
  },
  lv: {
    pike: {
      name: 'Līdaka',
      season: 'Vislabāk rudenī un ziemā, pavasarī bieži nārsta liegums',
      habits:
        'Slēpņa plēsējs — stāv pie kokiem ūdenī, ūdensaugos un stāvās nogāzēs, gaidot laupījumu. Aktīvāks apmākušā laikā un aukstuma priekšvakarā, saulainā karstumā mierīgāks.',
      baits: ['Lieli vobleri', 'Karotes', 'Silikons 10–15 cm', 'Dzīvā zivtiņa'],
      tackle: ['Spinings, tests 20–60 g', 'Metāla pavadiņa'],
      groundbait: [
        'Līdaku neēsmo — tas ir plēsējs un reaģē tikai uz ēsmas kustību vai dzīvo zivtiņu',
        'Svaigi noķerta dzīvā zivtiņa no tā paša ūdens der labāk nekā atvesta',
      ],
      regulation:
        'Atļauts 5 gab., no kurām ne vairāk kā viena garāka par 75 cm. Minimālais garums — 50 cm. Nārsta liegums: no 1. marta līdz 30. aprīlim.',
    },
    perch: {
      name: 'Asaris',
      season: 'Aktīvs gandrīz visu gadu, virsotnes — rudens un ziema zem ledus',
      habits:
        'Turas baros pie kokiem, pāļiem un ūdensaugu malām; lielākie asari bieži medī pa vienam pie grunts. Aktīvi reaģē uz mazuļu satraukumu pie virsmas.',
      baits: ['Mazi vobleri', 'Griezīši Nr. 1–3', 'Silikons uz džiga', 'Tārps, uodkāpurs'],
      tackle: ['Viegls spinings (UL/L)', 'Pludiņmakšķere'],
      groundbait: [
        'Neliels sarkanais tārpiņš vai sasmalcināts tārps mazās porcijās pieradina baru turēties pie vietas',
        'Nepārbarojiet — asaris ir plēsējs un pie pārāk sātīgas ēsmošanas neaizkavējas',
      ],
      regulation:
        'No iekšējiem ūdeņiem — 5 kg uz personu (no Baltijas jūras un Rīgas līča — 10 kg). Minimālais garums nav noteikts, izņemot jūras ūdeņus (19 cm).',
    },
    zander: {
      name: 'Zandarts',
      season: 'Vasara un rudens sākums, labākā kode krēslā un naktī',
      habits:
        'Turas baros gultnes nogāzēs, bedrēs un pie kokiem uz straumes, medī mazas zivtiņas krēslā un naktī. Jutīgs pret spiediena kritumu pirms negaisa — tad kode parasti pastiprinās.',
      baits: ['Džigs ar silikonu', 'Ratliny', 'Dzīvā zivtiņa uz snastes'],
      tackle: ['Jutīgs spinings', 'Pītā aukla'],
      groundbait: [
        'Kā plēsējs uz ēsmošanu nereaģē',
        'To piesaista mazo zivju bars — meklējiet vietas, kur baro rauda vai stinte',
      ],
      regulation:
        'Atļauts 5 gab., no kurām ne vairāk kā viena garāka par 75 cm. Minimālais garums — 45 cm. Nārsta liegums: no 16. aprīļa līdz 31. maijam.',
    },
    bream: {
      name: 'Plaudis',
      season: 'Silts sezona, maijs–septembris, labāk agri no rīta',
      habits:
        'Bara grunts zivs, baro dziļās vietās un nogāzēs, bieži nodod sevi ar burbuļiem pie virsmas. Bailīga — pie trokšņa krastā uzvedas klusāk.',
      baits: ['Tārps', 'Uodkāpurs', 'Kukurūza', 'Barošanas lodītes'],
      tackle: ['Fīderis', 'Pludiņmakšķere tālam metienam'],
      groundbait: [
        'Blīva fīdera ēsmošana ar zemes/saldu aromātu (kakao, rauši) — 3–5 lodes sākumā, papildus ēsmošana ik pēc 20–30 minūtēm mazās porcijās',
        'Ēsmošanā noder sasmalcināts tārps un tā pati āķa ēsma',
      ],
      regulation: 'Bez skaita vai izmēra ierobežojuma.',
    },
    roach: {
      name: 'Rauda',
      season: 'Aktīva gandrīz visu gadu, arī zemledus makšķerēšanā',
      habits:
        'Turas baros pie ūdensaugiem, pāļiem un nogāzēm, baro mazās porcijās gandrīz visu dienu. Labi reaģē uz vieglu, bieži atjaunotu ēsmošanu.',
      baits: ['Uodkāpurs', 'Mušu kāpurs', 'Mīkla', 'Mazi boili'],
      tackle: ['Māvas/boloņas makšķere', 'Viegls fīderis'],
      groundbait: [
        'Viegla, putekļojoša gaiša ēsmošana — 1–2 nelielas lodes sākumā, tālāk papildināt ik pēc 15 minūtēm',
        'Uodkāpurs vai mušu kāpurs ēsmošanā pastiprina kodi',
      ],
      regulation: 'Bez skaita vai izmēra ierobežojuma.',
    },
    carp: {
      name: 'Karpa',
      season: 'Silts ūdens, jūnijs–septembris',
      habits:
        'Turas sasilušos seklumos un pie ūdensaugiem, baro pie grunts, bieži tajās pašās vietās, kur pieradināta ar ēsmošanu. Piesardzīga, prasa klusumu un pareizi izvēlētu grunti.',
      baits: ['Boili', 'Kukurūza', 'Peletes'],
      tackle: ['Karpu makšķere', 'Barošanas raķete', 'Kodes signalizators'],
      groundbait: [
        'Vietas ēsmošana 1–2 dienas pirms copes: 1–2 kg boilu/peleti nelielās porcijās pieradina karpu turēties vietā',
        'Copes dienā papildināt mēreni — pārbarošana samazina kodes biežumu',
      ],
      regulation: 'Bez skaita vai izmēra ierobežojuma.',
    },
    tench: {
      name: 'Līnis',
      season: 'Vasaras sākums, labākā kode agri no rīta aizaugušās vietās',
      habits:
        'Mīl dūņainu grunti un ūdensrožu audzes, baro agri no rīta un apmākušā laikā, ļoti piesardzīgs un neieredz troksni krastā.',
      baits: ['Tārps', 'Uodkāpurs', 'Kukurūza'],
      tackle: ['Viegls fīderis', 'Pludiņmakšķere'],
      groundbait: [
        'Neliels daudzums tumšas ēsmošanas ar tārpu vai uodkāpuru pie ūdensaugu malas, papildināt reti — līnis ilgi turas ēsmotā vietā',
      ],
      regulation: 'Minimālais garums — 25 cm, atļauti 5 gab.',
    },
    eel: {
      name: 'Zutis',
      season: 'Siltas vasaras naktis',
      habits:
        'Baro tumsā pie grunts, bieži alās un starp kokiem, vislabāk reaģē uz smaržu, nevis vizuālu ēsmu.',
      baits: ['Lielais tārps', 'Beigta zivtiņa'],
      tackle: ['Grunts snaste', 'Izturīga pavadiņa'],
      groundbait: [
        'Ēsmošana gandrīz nav vajadzīga — zutis ēsmu atrod pēc smaržas; var pievienot nedaudz sasmalcināta tārpa',
      ],
      regulation:
        'Minimālais garums — 50 cm, atļauts 1 gab. (Alauksta, Alūksnes, Rāznas un vairākos citos ezeros — 3 gab.).',
      note: 'Populācija ierobežota — pirms makšķerēšanas pārbaudiet aktuālos noteikumus un licenci',
    },
    catfish: {
      name: 'Sams',
      season: 'Silts ūdens, maijs–septembris, lielie īpatņi aktīvi siltās naktīs',
      habits:
        'Turas dziļās bedrēs, pie kokiem un stāvos lielo upju un ezeru krastos. Gandrīz visēdājs, medī galvenokārt naktī pēc smaržas un skaņas, bet vasarā duļķainā ūdenī var ķert arī dienā.',
      baits: ['Liela dzīvā zivtiņa', 'Tārpu kūlītis', 'Gliemeņu gaļa', 'Kalmārs, aknas'],
      tackle: ['Jaudīgs grunts makšķerēšanas komplekts', 'Klonks — sams jūt ūdens vibrācijas', 'Izturīga pītā aukla no 0,3 mm'],
      groundbait: [
        'Klasika — klonks: koka rīks, ar ko sit pa ūdeni, radot vardes brēkšanai līdzīgu skaņu, kas piesaista samu no tālienes',
        'Stacionārā vietā var atstāt zivs iekšas vai beigtu zivtiņu — sams nāk pēc smaržas',
      ],
      regulation: 'Minimālais garums — 60 cm, atļauti 3 gab.',
    },
    burbot: {
      name: 'Vēdzele',
      season: 'Rudens un ziema, aktivitātes virsotne zem ledus decembrī–janvārī nārsta laikā',
      habits:
        'Vienīgā aukstumu mīlošā menczivju dzimtas zivs mūsu ūdeņos: vasarā krīt sastingumā un gandrīz nebaro, bet, ūdenim atdziestot zem 10°C, sāk aktīvi baroties, īpaši naktī.',
      baits: ['Dzīvā zivtiņa (ķīsis, grundulis)', 'Beigta zivtiņa uz grunts snastes', 'Tārps'],
      tackle: ['Grunts snaste', 'Stāvmakšķeres zemledus makšķerēšanai'],
      groundbait: [
        'Vēdzelei ēsmošana nav vajadzīga — to piesaista svaigas zivs vai gaļas smarža uz snastes',
        'Labākās vietas — nevis ēsmotas, bet ar kokiem, akmeņiem un dziļuma pārmaiņu',
      ],
      regulation: 'Minimālais garums — 35 cm, atļauti 5 gab.',
    },
    asp: {
      name: 'Salate (asaris)',
      season: 'Atļautā sezona — jūnijs–oktobris, pavasarī nārsta liegums',
      habits:
        'Atklāta ūdens plēsējs, medī uz straumes un rifteniem, pazīstams ar savu "kauju" — skaļiem sitieniem pa mazuļu baru pie virsmas agri no rīta. Piesardzīgs, prasa tālu un precīzu metienu.',
      baits: ['Kastmasteri un karotes', 'Vobleri-minnow', 'Neliels silikons uz viegla džiga'],
      tackle: ['Ātras darbības spinings tālam metienam', 'Plāna pītā aukla'],
      groundbait: [
        'Salati uz ēsmošanu neķer — to meklē pēc uzplaiksnījumiem un "kaujas" pie virsmas',
        'Der ierasties vēl tumsā un vērot ūdeni, nevis mest metienus pēc nejaušības principa',
      ],
      regulation:
        'Oficiālais nosaukums noteikumos — salate (meža vimba). Minimālais garums — 45 cm, atļauti 3 gab. Nārsta liegums: no 1. marta līdz 15. maijam.',
    },
    ide: {
      name: 'Ālants',
      season: 'Pavasaris un rudens, labākā kode agri no rīta un vakarā',
      habits:
        'Turas pretstraumēs, tiltu pāļu tuvumā un dziļās bedrēs, pavasarī siltās dienās bieži izpeld baroties pie virsmas.',
      baits: ['Tārps', 'Strauta kāpurs (rāceklis)', 'Mazi vobleri un griezīši'],
      tackle: ['Viegls spinings', 'Pludiņmakšķere tālam metienam'],
      groundbait: [
        'Ēsmošana ar sasmalcinātu tārpu un maizes rīvmaizi, mest nelielas lodes augšpus straumes no copes vietas',
      ],
      regulation: 'Minimālais garums — 30 cm.',
    },
    chub: {
      name: 'Sapals',
      season: 'Pavasaris–vasara, aktīvs siltās saulainās dienās uz straumes',
      habits:
        'Piesardzīga rifteņa un straujas straumes zivs, turas pie pārkarušos kokiem, medī ūdenī iekritušus kukaiņus. Upe ir vienīgā piemērotā mājvieta — ezeros un stāvošā ūdenī gandrīz nesastopams.',
      baits: ['Sienāzis, māju vabole', 'Neliels vobleris-crank', 'Maizes garoza'],
      tackle: ['Viegls spinings', 'Mušu makšķerēšana'],
      groundbait: [
        'Ēsmošana maz efektīva straumes dēļ — labāk iemest pāris kukaiņu vai maizes drupatu augšpus straumes no vietas',
      ],
      regulation: 'Minimālais garums — 30 cm.',
    },
    crucianCarp: {
      name: 'Karūsa',
      season: 'Silts ūdens, maijs–augusts, labākā kode klusā apmākušā laikā',
      habits:
        'Dzīvo stāvošā, bieži aizaugušā un dūņainā ūdenī, panes zemu skābekļa saturu labāk gandrīz par jebkuru citu zivi. Ķeras lēni un piesardzīgi, bieži ilgi "pārbauda" ēsmu.',
      baits: ['Uodkāpurs', 'Tārps', 'Mīkla', 'Perlovka'],
      tackle: ['Viegla pludiņmakšķere', 'Īss fīderis'],
      groundbait: [
        'Neliels daudzums lipīgas ēsmošanas bez asas smaržas pie niedru malas, papildināt reti un mazās porcijās — karūsa neieredz steigu vietā',
      ],
      regulation: 'Bez skaita vai izmēra ierobežojuma.',
    },
    rudd: {
      name: 'Rudulis',
      season: 'Silts ūdens, maijs–augusts',
      habits:
        'Uzvedas līdzīgi raudai, bet turas augstāk ūdens slānī un tuvāk ūdensrožu un niedru audzēm, baro siltā virsējā ūdenī.',
      baits: ['Uodkāpurs', 'Strauta kāpurs', 'Maize', 'Mazi boili'],
      tackle: ['Māvas makšķere', 'Viegls pludiņš tālam atlaidumam'],
      groundbait: ['Viegla ēsmošana tieši pie audžu malas, papildināt nelielās porcijās ik pēc 15–20 minūtēm'],
      regulation: 'Bez skaita vai izmēra ierobežojuma.',
    },
    silverBream: {
      name: 'Plicis',
      season: 'Silts sezona, maijs–septembris, aktīvs agri no rīta un naktī',
      habits:
        'Līdzīgs plaudim, bet mazāks un turas tuvāk krastam, baro blīvos baros pie grunts dziļākās vietās.',
      baits: ['Tārps', 'Uodkāpurs', 'Mušu kāpurs'],
      tackle: ['Fīderis', 'Pludiņmakšķere tālam metienam'],
      groundbait: [
        'Vidēji blīva fīdera ēsmošana ar mušu kāpuru, papildināt ik pēc 20–30 minūtēm — plicis ātri izēd vietu',
      ],
      regulation: 'Bez skaita vai izmēra ierobežojuma.',
    },
  },
  en: {
    pike: {
      name: 'Pike',
      season: 'Best in autumn and winter; spring often under a spawning closure',
      habits:
        'An ambush predator holding near snags, weed beds and steep drop-offs, waiting for prey. More active in overcast, cooling weather; less so in bright sun and heat.',
      baits: ['Large jerkbaits/crankbaits', 'Spoons', '10–15 cm soft lures', 'Live bait'],
      tackle: ['Spinning rod, 20–60 g', 'Wire leader'],
      groundbait: [
        'Pike are never chummed — as predators they only react to lure movement or live bait',
        'Fresh live bait caught in the same water outperforms bait brought from elsewhere',
      ],
      regulation:
        '5 fish allowed, only one may exceed 75 cm. Minimum length 50 cm. Closed season: 1 March – 30 April (spawning).',
    },
    perch: {
      name: 'Perch',
      season: 'Active nearly year-round, peaks in autumn and under winter ice',
      habits:
        'Shoals near snags, piles and weed edges; larger perch often hunt alone near the bottom. Reacts strongly to fry scattering at the surface.',
      baits: ['Small crankbaits', 'Spinners #1–3', 'Soft lure on jig head', 'Worm, maggot'],
      tackle: ['Light spinning rod (UL/L)', 'Float rod'],
      groundbait: [
        'Small doses of bloodworm or chopped worm keep the shoal holding at the spot',
        "Don't overfeed — as a predator, perch won't linger over an overly generous pile of bait",
      ],
      regulation:
        '5 kg per person from inland waters (10 kg from the Baltic Sea and Gulf of Riga). No minimum length inland (19 cm in Baltic/Gulf waters).',
    },
    zander: {
      name: 'Zander',
      season: 'Summer through early autumn, best at dusk and at night',
      habits:
        'Shoals on channel drop-offs, holes and snags in current, hunting small fish at dusk and at night. Sensitive to falling pressure before a storm — the bite often picks up then.',
      baits: ['Jig with soft lure', 'Rattling lures', 'Live bait rig'],
      tackle: ['Sensitive-tip spinning rod', 'Braided line'],
      groundbait: [
        "Not chummed — it's a predator and won't respond to groundbait",
        'Find it where baitfish like roach or bleak are shoaling, rather than baiting a spot',
      ],
      regulation:
        '5 fish allowed, only one may exceed 75 cm. Minimum length 45 cm. Closed season: 16 April – 31 May (spawning).',
    },
    bream: {
      name: 'Bream',
      season: 'Warm season, May–September, best at dawn',
      habits:
        'A shoaling bottom feeder working deep flats and drop-offs, often giving itself away with bubbles at the surface. Easily spooked and feeds more cautiously if there is noise on the bank.',
      baits: ['Worm', 'Maggot', 'Sweetcorn', 'Groundbait balls'],
      tackle: ['Feeder rod', 'Long-cast float rod'],
      groundbait: [
        'Dense feeder groundbait with an earthy/sweet smell (cocoa, cake meal) — 3–5 balls to start, then top up every 20–30 minutes in small amounts',
        'Add chopped worm and a little of your hook bait to the mix',
      ],
      regulation: 'No bag or size limit.',
    },
    roach: {
      name: 'Roach',
      season: 'Active nearly year-round, including ice fishing',
      habits:
        'Shoals near weeds, piles and drop-offs, feeding in small amounts almost all day. Responds well to light groundbait topped up often.',
      baits: ['Maggot', 'Bloodworm', 'Dough', 'Small boilies'],
      tackle: ['Pole/bolognese rod', 'Light feeder'],
      groundbait: [
        'Light, cloudy, pale groundbait — 1–2 small balls to start, topped up every 15 minutes after',
        'Mixing in bloodworm or maggot sharpens the bite',
      ],
      regulation: 'No bag or size limit.',
    },
    carp: {
      name: 'Carp',
      season: 'Warm water, June–September',
      habits:
        'Holds in warmed shallows and near vegetation, feeding on the bottom, often on the same spots it has been trained to return to by baiting. Wary — needs quiet and the right lakebed.',
      baits: ['Boilies', 'Sweetcorn', 'Pellets'],
      tackle: ['Carp rod', 'Bait rocket', 'Bite alarm'],
      groundbait: [
        'Pre-bait the spot 1–2 days ahead: 1–2 kg of boilies/pellets in small batches gets carp holding there',
        'Top up moderately on the day itself — overfeeding cuts down bite frequency',
      ],
      regulation: 'No bag or size limit.',
    },
    tench: {
      name: 'Tench',
      season: 'Early summer, best at dawn near weedy margins',
      habits:
        'Likes silty bottoms and lily beds, feeding at dawn and in overcast weather. Very wary and intolerant of noise on the bank.',
      baits: ['Worm', 'Bloodworm', 'Sweetcorn'],
      tackle: ['Light feeder', 'Float rod'],
      groundbait: [
        'A small amount of dark groundbait with worm or bloodworm near the weed line, topped up rarely — tench sit on a baited spot for a long time',
      ],
      regulation: 'Minimum length 25 cm, 5 fish allowed.',
    },
    eel: {
      name: 'Eel',
      season: 'Warm summer nights',
      habits:
        'Feeds in the dark near the bottom, often around burrows and snags, responding to scent far more than to a visual lure.',
      baits: ['Lobworm', 'Dead baitfish'],
      tackle: ['Bottom rig', 'Sturdy leader'],
      groundbait: [
        "Barely needs any chumming — eel finds bait by scent alone; a little chopped worm at the spot can help",
      ],
      regulation:
        'Minimum length 50 cm, 1 fish allowed (3 in lakes Alaukšu, Alūksne, Rāzna and a few other named lakes).',
      note: 'Population is restricted — check current regulations and licence requirements before fishing',
    },
    catfish: {
      name: 'Catfish (Wels)',
      season: 'Warm water, May–September, big fish most active on warm nights',
      habits:
        'Holds in deep holes, snags and steep banks of large rivers and lakes. Almost omnivorous, hunting mostly at night by smell and vibration, though it can feed by day in murky summer water.',
      baits: ['Large live bait', 'A bunch of lobworms', 'Freshwater mussel meat', 'Squid, liver'],
      tackle: ['Heavy bottom-fishing rod', 'A clonker — catfish feel water vibration', 'Strong braid, 0.3 mm+'],
      groundbait: [
        "The classic method is 'clonking': slapping a wooden paddle on the water makes a frog-like sound that draws catfish from a distance",
        'On a fixed swim, leftover guts or a dead fish left in the water work by scent alone',
      ],
      regulation: 'Minimum length 60 cm, 3 fish allowed.',
    },
    burbot: {
      name: 'Burbot',
      season: 'Autumn and winter, peak activity under the ice in December–January during spawning',
      habits:
        'The only cold-loving codfish in our waters: it goes dormant and barely feeds in summer, then starts feeding actively once the water drops below 10°C, especially at night.',
      baits: ['Live bait (ruffe, gudgeon)', 'Dead baitfish on a bottom rig', 'Lobworm'],
      tackle: ['Bottom rig / ledger', 'Tip-up rigs for ice fishing'],
      groundbait: [
        "Doesn't need chumming — it's drawn by the scent of fresh fish or meat on the rig",
        'Look for snags, rocks and depth changes rather than a baited spot',
      ],
      regulation: 'Minimum length 35 cm, 5 fish allowed.',
    },
    asp: {
      name: 'Asp (Salate)',
      season: 'Legal season June–October; a spring spawning closure applies',
      habits:
        "An open-water predator hunting in current and over riffles, famous for its surface 'boil' — loud strikes on baitfish shoals at dawn. Wary, needs a long, precise cast.",
      baits: ['Casting spoons', 'Minnow-style crankbaits', 'Small soft lure on a light jig head'],
      tackle: ['Fast-action spinning rod for long casts', 'Thin braided line'],
      groundbait: [
        "Not fished over bait — located by watching for surface splashes and the 'boil'",
        'Worth arriving before dawn and watching the water instead of blind-casting',
      ],
      regulation:
        "Official Latvian name: salate (also called 'forest vimba'). Minimum length 45 cm, 3 fish allowed. Closed season: 1 March – 15 May.",
    },
    ide: {
      name: 'Ide',
      season: 'Spring and autumn, best at dawn and dusk',
      habits:
        'Holds in eddies, near bridge piles and deep holes, often rising to feed at the surface on warm spring days.',
      baits: ['Worm', 'Caddis larva', 'Small crankbaits and spinners'],
      tackle: ['Light spinning rod', 'Float rod for long casts'],
      groundbait: ['Groundbait with chopped worm and breadcrumb, cast in small balls upstream of the swim'],
      regulation: 'Minimum length 30 cm.',
    },
    chub: {
      name: 'Chub',
      season: 'Spring–summer, active on warm sunny days in current',
      habits:
        "A wary fish of riffles and fast current, holding under overhanging trees and taking insects that fall into the water. Rivers are its only real home — it's rarely found in lakes or still water.",
      baits: ['Grasshopper, cockchafer', 'Small crankbait', 'Bread crust'],
      tackle: ['Light spinning rod', 'Fly fishing'],
      groundbait: [
        'Groundbait is of little use in current — better to trickle a few insects or bread crumbs in upstream of the spot',
      ],
      regulation: 'Minimum length 30 cm.',
    },
    crucianCarp: {
      name: 'Crucian carp',
      season: 'Warm water, May–August, best in calm overcast weather',
      habits:
        "Lives in still, often weedy and silty water, tolerating low oxygen better than almost any other fish. Bites slowly and cautiously, often 'testing' the bait for a long time.",
      baits: ['Maggot', 'Worm', 'Dough', 'Pearl barley'],
      tackle: ['Light float rod', 'Short feeder'],
      groundbait: [
        'A little sticky groundbait without a sharp smell near the reed line, topped up rarely and sparingly — crucian carp dislikes commotion on the spot',
      ],
      regulation: 'No bag or size limit.',
    },
    rudd: {
      name: 'Rudd',
      season: 'Warm water, May–August',
      habits:
        'Behaves like roach but holds higher in the water column and closer to lily beds and reeds, feeding in warm surface water.',
      baits: ['Maggot', 'Caddis larva', 'Bread', 'Small boilies'],
      tackle: ['Pole/whip rod', 'Light float set to fish shallow'],
      groundbait: ['Light groundbait right along the edge of the vegetation, topped up in small amounts every 15–20 minutes'],
      regulation: 'No bag or size limit.',
    },
    silverBream: {
      name: 'Silver bream',
      season: 'Warm season, May–September, active at dawn and at night',
      habits:
        'Similar to bream but smaller, holding closer to shore and feeding in dense shoals on the bottom over deep flats.',
      baits: ['Worm', 'Maggot', 'Bloodworm'],
      tackle: ['Feeder rod', 'Long-cast float rod'],
      groundbait: [
        'Medium-density feeder groundbait with bloodworm, topped up every 20–30 minutes — silver bream strip a swim quickly',
      ],
      regulation: 'No bag or size limit.',
    },
  },
} as const;
