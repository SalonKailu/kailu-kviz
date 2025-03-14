// Základní typy
export type SkinType = 'Suchá' | 'Smíšená' | 'Mastná' | 'Citlivá' | 'Normální';
export type ProductSet = 
  | 'Suchá základ' 
  | 'Suchá komplet'
  | 'Suchá a normální Anti-age'
  | 'Suchá základ + Sem tam pupínek'
  | 'M+SM základ'
  | 'M+SM komplet'
  | 'M+SM komplet + Sem tam pupínek'
  | 'M+SM Anti-age'
  | 'Normální komplet'
  | 'Normální základ'
  | 'Normální základ + Sem tam pupínek'
  | 'Citlivá'
  | 'Citlivá + Sem tam pupínek'
  | 'Kuperóza'
  | 'Dermatitida'
  | 'Problém: AKNÉ';

// Rozhraní pro odpovědi z kvízu
export interface QuizAnswers {
  'skin-description'?: string;
  'skin-nose'?: string;
  'skin-cheeks'?: string;
  'cosmetic-compatibility'?: string[];
  'skin'?: string[];
  'wish-fish'?: string;
  'budget-limit'?: string;
}

// Rozhraní pro výsledek kvízu
export interface QuizResult {
  skinType: SkinType;
  recommendedSet: ProductSet;
  problems: string[];
  specialRecommendations: {
    hasPigmentation: boolean;
    hasUndereyeCircles: boolean;
    antiAgeSuggested: boolean;
  };
}
// Konstanty pro typy pleti
export const SKIN_TYPES: Record<string, SkinType> = {
  DRY: 'suchá',
  MIXED: 'smíšená',
  OILY: 'mastná',
  SENSITIVE: 'citlivá',
  NORMAL: 'normální'
} as const;

// Konstanty pro produktové sady
export const PRODUCT_SETS: Record<string, ProductSet> = {
  SUCHA_ZAKLAD: 'Suchá základ',
  SUCHA_KOMPLET: 'Suchá komplet',
  SUCHA_ANTIAGE: 'Suchá a normální Anti-age',
  SUCHA_PUPINEK: 'Suchá základ + Sem tam pupínek',
  MSM_ZAKLAD: 'M+SM základ',
  MSM_KOMPLET: 'M+SM komplet',
  MSM_KOMPLET_PUPINEK: 'M+SM komplet + Sem tam pupínek',
  MSM_ANTIAGE: 'M+SM Anti-age',
  NORMALNI_KOMPLET: 'Normální komplet',
  NORMALNI_ZAKLAD: 'Normální základ',
  NORMALNI_PUPINEK: 'Normální základ + Sem tam pupínek',
  CITLIVA: 'Citlivá',
  CITLIVA_PUPINEK: 'Citlivá + Sem tam pupínek',
  KUPEROZA: 'Kuperóza',
  DERMATITIDA: 'Dermatitida',
  PROBLEM_AKNE: 'Problém: AKNÉ'
} as const;


// URL konstanty a limity
export const DISPLAY_NAMES = {
  'Normální základ': 'Základní sada pro normální pleť',
  'Normální komplet': 'Kompletní sada pro normální pleť',
  'Suchá základ': 'Základní sada pro suchou pleť',
  'Suchá komplet': 'Kompletní sada pro suchou pleť',
  'M+SM základ': 'Základní sada pro mastnou a smíšenou pleť',
  'M+SM komplet': 'Kompletní sada pro mastnou a smíšenou pleť',
  'Suchá a normální Anti-age': 'Anti-age sada pro normální a suchou pleť',
  'M+SM Anti-age': 'Anti-age sada pro mastnou a smíšenou pleť',
  'Citlivá': 'Sada pro citlivou pleť',
  'Citlivá + Sem tam pupínek': 'Sada pro citlivou pleť s pupínky',
  'Kuperóza': 'Sada pro pleť s kuperózou',
  'Problém: AKNÉ': 'Sada pro problematickou pleť'
};

export const SHOP_BASE_URL = 'https://www.kailushop.cz/';
export const PRODUCT_URLS = {
'Suchá základ': 'zakladni-sada-pro-suchou-plet',
'Suchá komplet': 'kompletni-sada-pro-suchou-plet',
'Suchá a normální Anti-age': 'anti-age-sada-pro-normalni-a-suchou-plet',
'Suchá základ + Sem tam pupínek': 'zakladni-sada-pro-suchou-plet',
'M+SM základ': 'zakladni-sada-pro-mastnou-a-smisenou-plet',
'M+SM komplet': 'kompletni-sada-pro-mastnou-a-smisenou-plet',
'M+SM komplet + Sem tam pupínek': 'kompletni-sada-pro-mastnou-a-smisenou-plet',
'M+SM Anti-age': 'anti-age-sada-pro-mastnou-a-smisenou-plet',
'Normální komplet': 'kompletni-sada-pro-normalni-plet',
'Normální základ': 'zakladni-sada-pro-normalni-plet',
'Normální základ + Sem tam pupínek': 'zakladni-sada-pro-normalni-plet',
'Citlivá': 'sada-pro-citlivou-plet',
'Citlivá + Sem tam pupínek': 'sada-pro-citlivou-plet',
'Kuperóza': 'pece-o-plet-s-kuperozou',
'Problém: AKNÉ': 'sada-pro-problematickou-plet'
};

// Konstanty pro typy pleti
export const SKIN_TYPE_URLS = {
  'mastná': 'mastnaplet',
  'smíšená': 'smisenaplet',
  'suchá': 'suchaplet',
  'normální': 'normalniplet',
  'citlivá': 'citlivost'
};

// Sady podle typu pleti s prioritami
export const SADY_DLE_TYPU: Record<SkinType, ProductSet[]> = {
  'suchá': [
    'Suchá a normální Anti-age',
    'Suchá komplet',
    'Suchá základ + Sem tam pupínek',
    'Suchá základ'
  ],
  'smíšená': [
    'M+SM komplet + Sem tam pupínek',
    'Problém: AKNÉ',
    'M+SM Anti-age',
    'M+SM komplet',
    'M+SM základ'
  ],
  'mastná': [
    'M+SM komplet + Sem tam pupínek',
    'Problém: AKNÉ',
    'M+SM Anti-age',
    'M+SM komplet',
    'M+SM základ'
  ],
  'normální': [
    'Suchá a normální Anti-age',
    'Normální základ + Sem tam pupínek',
    'Normální komplet',
    'Normální základ'
  ],
  'citlivá': [
    'Citlivá + Sem tam pupínek',
    'Citlivá'
  ]
};

// Cenové limity pro sady
export const PRICE_LIMITS: Record<ProductSet, number | null> = {
  'Suchá základ': 1500,
  'M+SM základ': 1500,
  'Normální základ': 1500,
  'Dermatitida': 1500,
  'Suchá komplet': 2500,
  'M+SM komplet': 2500,
  'Normální komplet': 2500,
  'Citlivá': 2500,
  'Kuperóza': 2500,
  'Problém: AKNÉ': 2500,
  'Suchá a normální Anti-age': null,
  'M+SM Anti-age': null,
  'Suchá základ + Sem tam pupínek': null,
  'M+SM komplet + Sem tam pupínek': null,
  'Normální základ + Sem tam pupínek': null,
  'Citlivá + Sem tam pupínek': null
};
// Speciální doporučení
export const SPECIAL_RECOMMENDATIONS = {
  PIGMENTATION: {
    text: '>S pigmentovými skvrnami je to trochu složitější. Kosmetika si s nimi může částečně poradit, ale nejúčinnější možností, jak se jich doopravdy zbavit, nebo je alespoň viditelně zmírnit, je chemický peeling. Více o něm píšu na webu, kde máte také rovnou i možnost objednání.',
    url: 'www.kailu.cz'
  },
  UNDEREYE_CIRCLES: {
    getText: (isAntiAge: boolean) => isAntiAge 
      ? 'Krém na kruhy pod očima je již součástí vaší anti-age sady.'
      : 'Pro zmírnění kruhů pod očima vám doporučuji přihodit do košíku skvělý oční krém od korejské značky Skin1004.'
  }
};

// Výsledné texty pro jednotlivé sady
export const RESULT_TEXTS: Record<ProductSet, string | ((answers: QuizAnswers) => string)> = {
  'Suchá základ': 'Vaše suchá pleť volá po pravidelné hydrataci a výživě. Připravila jsem pro vás základní sadu 4 produktů, která je perfektní pro začátek nebo pokud hledáte cenově dostupnější variantu. Přestože jde o základní péči, její účinnost vás příjemně překvapí! Pleť bude hydratovaná, vyživená a příjemná na dotek.',
  
  'Suchá komplet': 'Připravila jsem pro vás sadu 5 produktů, které jsou silně hydratační a vyživující. Vaše pleť se díky nim bude mít jako v bavlnce, zmizí příznaky suchosti, podráždění, nepříjemné pnutí i nadměrná tvorba vrásek.',
  
  'Suchá a normální Anti-age': 'Vaše pleť přirozeně stárne o něco rychleji než mastná či smíšená pleť, a proto si zaslouží speciální péči! Připravila jsem pro vás produkty, které kombinují intenzivní hydrataci s účinnými anti-age složkami. Vaše pleť bude jen zářit.✨',
  
  'Suchá základ + Sem tam pupínek': 'Vaše suchá pleť potřebuje především hydrataci, ale občas se na ní přesto vyklube nějaká ta nechtěná boulička. 😯 Proto vám doporučuji základní sadu pro váš typ pleti v kombinaci s mini sadou "Sem tam pupínek". Zatímco základní sada zajistí pleti potřebnou hydrataci a výživu, mini sada bude vaším pomocníkem v případě náhlých nedokonalostí. S touto kombinací bude vaše pleť spokojená za všech okolností!',
  
  'M+SM základ': 'Vaše pleť si zaslouží profesionální péči, která ji udrží v rovnováze. Pokud s péčí o pleť teprve začínáte nebo hledáte cenově dostupnější variantu, bude pro vás tato sada perfektní volbou. Produkty jsou lehké, nezatěžují pleť, regulují maz, ale nevysušují. Dopřejte své pleti pravidelnou péči, která zabere jen pár minut denně!',
  
  'M+SM komplet': 'Vaše pleť si žádá péči, která efektivně reguluje tvorbu kožního mazu a zároveň nevysušuje. Proto jsem pro vás připravila komplexní sadu šesti produktů, které šetrně čistí, hydratují a harmonizují pleť. Součástí je i náš bestseller – enzymatický peeling, expert na odstranění černých teček. 🦸‍♀️ S touto výbavou udržíme vaši pleť v dokonalé kondici!',
  
  'M+SM komplet + Sem tam pupínek': 'Doporučila bych vám kombinaci dvou sad. Zatímco hlavní sada se postará o každodenní potřeby vaší (občas docela náladové) pleti, mini sada vám pomůže ve chvílích, kdy se vám vyklube nevítaný pupínek. 🦸‍♀️ S touto kombinací budete vždy o krok napřed!',
  
  'M+SM Anti-age': 'Připravila jsem pro vás sadu 5 produktů, které respektují specifické potřeby vaší pleti a zároveň účinně bojují proti známkám stárnutí. Redukují nadměrnou mastnotu, oddalují tvorbu vrásek, zpevňují pleť a hydratují ji, aniž by ucpávaly póry. Dopřejte své pleti péči, která myslí na každý detail! ',
  
  'Normální komplet': ' Vaše pleť je ve skvělé kondici! Přestože se řadí mezi "normální" typ pleti, o kterém většina lidí jen sní, je důležité neusnout na vavřínech. I vaše pleť se s přibývajícím věkem mění a i když ji netrápí problémy jako suchost, nebo nadměrný maz, procesy spojené s přirozeným stárnutím se jí nevyhnou. Připravila jsem pro vás kompletní sadu 6 produktů, která kromě každodenní péče obsahuje i produkty pro intenzivnější ošetření. Vaše pleť bude dokonale vyživená, svěží a rozzářená.',
  
  'Normální základ': 'Pokud jste těhotná, tuto sadu vám doporučuji pro její vhodné, šetrné složení a přijatelnou cenu. Pokud těhotná nejste, znamená tento výsledek to, že je vaše pleť (naprosto) normální! Gratuluji - a tiše vám závidím. 😊 Máte poměrně vzácný typ pleti, o kterém většina z nás může jen snít. S pravidelným používáním této sady bude vaše pleť svěží, zdravá a přirozeně zářivá.',
  
  'Normální základ + Sem tam pupínek': 'Máte vzácný typ pleti, o kterém mnozí mohou jen snít – vaši pleť označujeme jako „normální.“ Z vašich odpovědí však vyplývá, že se občas objeví nějaký ten pupínek. Proto bych vám doporučila kombinaci dvou sad. Kompletní sada pro váš typ pleti udrží vaši pleť v rovnováze, dodá jí přirozený jas a svěžest. A pokud se objeví nečekané nedokonalosti, snadno si s nimi poradí naše mini sada „Sem tam pupínek.“ Dopřejte své pleti komplexní péči a objednejte si obě sady – pro krásu ve všech situacích!',
  
  'Citlivá': (answers) => {
    if (answers['wish-fish']?.includes('Ať už není moje pleť tak vysušená')) {
      return 'Připravila jsem pro vás sadu, která řeší obě vaše potřeby - zklidnění i hydrataci. A jako bonus posílíte ochranou bariéru a kožní mikrobiom vaší pleti.✨';
    }
    return 'Přestože jsou produkty v této sadě velmi šetrné, jejich účinnost je neskutečná! Zklidní podrážděnou pleť, posílí její přirozenou ochrannou bariéru, hydratují a vyživují.';
  },
  
  'Citlivá + Sem tam pupínek': 'Doporučila bych vám kombinaci dvou sad. Hlavní sada pro každodenní péči zklidní podrážděnou pleť, posílí její přirozenou ochrannou bariéru, hydratuje a vyživí. A doplňková sada Sem tam pupínek výrazně urychlí hojení a zamezí výskytu nedokonalostí.',
  
  'Kuperóza': 'Vybral/a jste možnost, že vás trápí kuperóza! Nejlepší variantou pro vás bude zklidňující sada speciálně sestavená pro vaši pleť. Součástí balíčku je navíc manuál, ve kterém se dozvíte několik užitečných rad a tipů, které vaší pleti prospějí.',
  
  'Dermatitida': 'Vybral/a jste možnost, že máte dermatitidu. Není to s ní úplně jednoduché, může být periorální nebo seboroická. Nejlepší bude, když se objednáte na ošetření a probereme to naživo u nás v salonu. Pokud by to nebylo možné, napište mi email na info@kailu.cz, pošlete fotku a dořešíme to na dálku. Bude to výzva, ale se správnou péčí dermatitidu zvládneme porazit! Pro oba dva typy mám připravené sady se skvělými, osvědčenými produkty.🤩',
  
  'Problém: AKNÉ': 'Připravila jsme pro vás velmi účinnou sadu s retinolem. 😍 Výsledky se nedostaví přes noc, ale s trpělivostí a správnou péčí uvidíte, jak se vaše pleť postupně zklidňuje, projasňuje a počet pupínků se viditelně snižuje. Součástí vaší nové péče bude navíc i podrobný manuál, který vás krok za krokem provede celým procesem a pomůže vám se vším, co by vaši pleť mohlo ovlivnit. Už teď se těším na vaše výsledky! 🙌'
};
// Funkce pro vyhodnocení typu pleti
export function evaluateSkinType(answers: QuizAnswers): SkinType {
  const points: Record<SkinType, number> = {
    [SKIN_TYPES.DRY]: 0,
    [SKIN_TYPES.MIXED]: 0,
    [SKIN_TYPES.OILY]: 0,
    [SKIN_TYPES.SENSITIVE]: 0,
    [SKIN_TYPES.NORMAL]: 0
  };
  console.log('=== VYHODNOCENÍ TYPU PLETI ===');
  console.log('Počáteční stav bodů:', {
   suchá: points[SKIN_TYPES.DRY],
    smíšená: points[SKIN_TYPES.MIXED],
    mastná: points[SKIN_TYPES.OILY],
    citlivá: points[SKIN_TYPES.SENSITIVE],
    normální: points[SKIN_TYPES.NORMAL]
  });

  // Vyhodnocení první otázky
  const skinDescription = answers['skin-description'];
if (skinDescription) {
  console.log('\nVyhodnocuji otázku o typu pleti:', skinDescription);
  if (skinDescription.includes('Je v pohodě')) {
    points[SKIN_TYPES.NORMAL]++;
    points[SKIN_TYPES.MIXED]++;
    console.log('Přidán 1 bod pro Normální a 1 bod pro Smíšenou');
  } else if (skinDescription.includes('Je suchá')) {
    points[SKIN_TYPES.DRY]++;
    console.log('Přidán 1 bod pro Suchou');
  } else if (skinDescription.includes('Dost se mastí')) {
    points[SKIN_TYPES.MIXED]++;
    console.log('Přidán 1 bod pro Smíšenou');
  } else if (skinDescription.includes('Mastí se hodně')) {
    points[SKIN_TYPES.OILY]++;
    console.log('Přidán 1 bod pro Mastnou');
  } else if (skinDescription.includes('Je citlivá')) {
    points[SKIN_TYPES.SENSITIVE]++;

    console.log('Přidán 1 bod pro Citlivou');
  }
  console.log('Body po první otázce:', {
    suchá: points[SKIN_TYPES.DRY],
    smíšená: points[SKIN_TYPES.MIXED],
    mastná: points[SKIN_TYPES.OILY],
    citlivá: points[SKIN_TYPES.SENSITIVE],
    normální: points[SKIN_TYPES.NORMAL]
  });
}

// Otázka o nose
const noseAnswer = answers['skin-nose'];
if (noseAnswer) {
  console.log('\nVyhodnocuji otázku o nose:', noseAnswer);
  if (noseAnswer.includes('Vaše póry si na schovávanou nehrají')) {
    points[SKIN_TYPES.OILY]++;
    points[SKIN_TYPES.MIXED]++;
    console.log('Přidán 1 bod pro Mastnou a 1 bod pro Smíšenou');
  } else if (noseAnswer.includes('Póry jsou viditelné jen při bližším pohledu')) {
    points[SKIN_TYPES.NORMAL]++;
    points[SKIN_TYPES.DRY]++;
    console.log('Přidán 1 bod pro Normální a 1 bod pro Suchou');
  } else if (noseAnswer.includes('Jaké póry')) {
    points[SKIN_TYPES.DRY]++;
    console.log('Přidán 1 bod pro Suchou');
  }
  console.log('Body po otázce o nose:', {
   suchá: points[SKIN_TYPES.DRY],
   smíšená: points[SKIN_TYPES.MIXED],
   mastná: points[SKIN_TYPES.OILY],
   citlivá: points[SKIN_TYPES.SENSITIVE],
   normální: points[SKIN_TYPES.NORMAL]
  });
}

  // Otázka o tvářích
  const cheeksAnswer = answers['skin-cheeks'];
  if (cheeksAnswer) {
    console.log('\nVyhodnocuji otázku o tvářích:', cheeksAnswer);
    if (cheeksAnswer.includes('Ano, jsou všude')) {
      points[SKIN_TYPES.OILY]++;
      console.log('Přidán bod pro Mastnou');
    } else if (cheeksAnswer.includes('Vidím je hlavně v oblasti vedle nosu')) {
      points[SKIN_TYPES.MIXED]++;
      console.log('Přidán bod pro Smíšenou');
    } else if (cheeksAnswer.includes('Sem tam možná nějaký je')) {
      points[SKIN_TYPES.NORMAL]++;
      points[SKIN_TYPES.DRY]++;
      console.log('Přidán bod pro Normální a Suchou');
 
  }
  console.log('Body po otázce o tvářích:', {
    suchá: points[SKIN_TYPES.DRY],
    smíšená: points[SKIN_TYPES.MIXED],
    mastná: points[SKIN_TYPES.OILY],
    citlivá: points[SKIN_TYPES.SENSITIVE],
    normální: points[SKIN_TYPES.NORMAL]
  });
}
  // Otázka o kosmetice
  const cosmeticAnswers = answers['cosmetic-compatibility'] || [];
  if (cosmeticAnswers.length > 0) {
    console.log('\nVyhodnocuji otázky o kosmetice:', cosmeticAnswers);
    cosmeticAnswers.forEach(answer => {
      if (answer.includes('Občas mám pocit, že mi pleť spíše vysuší')) {
        points[SKIN_TYPES.DRY]++;
        points[SKIN_TYPES.SENSITIVE]++;
        console.log('Přidán bod pro Suchou a Citlivou (vysušení)');
      }
      if (answer.includes('S kosmetikou musím opatrně')) {
        points[SKIN_TYPES.SENSITIVE]++;
        console.log('Přidán bod pro Citlivou (opatrnost)');
      }
      if (answer.includes('Většina kosmetických přípravků mi sedne')) {
        points[SKIN_TYPES.NORMAL]++;
        console.log('Přidán bod pro Normální');
      }
      if (answer.includes('Některé produkty mi úplně ucpou pleť')) {
        points[SKIN_TYPES.OILY]++;
        points[SKIN_TYPES.MIXED]++;
        console.log('Přidán bod pro Mastnou a Smíšenou');
      }
      if (answer.includes('Moje pleť miluje pořádně hutné krémy')) {
        points[SKIN_TYPES.DRY]++;
        console.log('Přidán bod pro Suchou');
      }
    });
    console.log('Body po otázce o kosmetice:', {
      Suchá: points[SKIN_TYPES.DRY],
      Smíšená: points[SKIN_TYPES.MIXED],
      Mastná: points[SKIN_TYPES.OILY],
      Citlivá: points[SKIN_TYPES.SENSITIVE],
      Normální: points[SKIN_TYPES.NORMAL]
    });
  }

  // Určení výsledného typu
  const sortedTypes = Object.entries(points)
    .sort(([,a], [,b]) => b - a) as [SkinType, number][];
  
  console.log('\n=== VÝSLEDEK ===');
  console.log('Seřazené typy podle bodů:', 
    sortedTypes.map(([type, score]) => `${type}: ${score}`).join(', ')
  );
  console.log('Vybraný typ pleti:', sortedTypes[0][0]);

  return sortedTypes[0][0];
}
function countSensitivityPoints(answers: QuizAnswers): number {
  let sensitivityPoints = 0;
  console.log('=== POČÍTÁNÍ BODŮ CITLIVOSTI ===');
  
  // První otázka - popis pleti
  if (answers['skin-description']?.includes('Je citlivá')) {
    sensitivityPoints++;
    console.log('+ 1 bod za citlivý popis pleti');
  }

    // Přání nemít citlivou pleť
    if (answers['wish-fish']?.includes('Už nechci mít citlivou')) {
      sensitivityPoints++;
      console.log('+ 1 bod za přání nemít citlivou pleť');
    }
  
  // Kosmetická kompatibilita
  const cosmeticAnswers = answers['cosmetic-compatibility'] || [];

  if (cosmeticAnswers.some(answer => answer.includes('S kosmetikou musím opatrně'))) {
    sensitivityPoints++;
    console.log('+ 1 bod za opatrnost s kosmetikou');
  }
  
  if (cosmeticAnswers.some(answer => answer.includes('Občas mám pocit, že mi pleť spíše vysuší'))) {
    sensitivityPoints++;
    console.log('+ 1 bod za vysušování pleti');
  }
  
  console.log('Celkový počet bodů citlivosti:', sensitivityPoints);
  return sensitivityPoints;
}

const points = {
  [SKIN_TYPES.DRY]: 0,
  [SKIN_TYPES.MIXED]: 0,
  [SKIN_TYPES.OILY]: 0,
  [SKIN_TYPES.SENSITIVE]: 0,
  [SKIN_TYPES.NORMAL]: 0
};

// Hlavní vyhodnocovací funkce
export function evaluateQuiz(answers: QuizAnswers): QuizResult {
  // Základní typ pleti
  const basicSkinType = evaluateSkinType(answers);
  
  // Body citlivosti
  const sensitivityPoints = countSensitivityPoints(answers);
  console.log('Body citlivosti:', sensitivityPoints);
  
  // Kontrola těhotenství
  const isPregnant = answers['wish-fish']?.includes('Zrovna jsem těhotná');
  console.log('Je těhotná:', isPregnant);
  
  // Získání rozpočtu
  const budgetAnswer = answers['budget-limit'] || '';
  const budget = budgetAnswer.includes('1500') ? 1500 :
                budgetAnswer.includes('2500') ? 2500 : null;
  console.log('Rozpočet:', budget);
  
  // Filtrujeme problémy
  let problems = answers['skin']?.filter(problem =>
    problem !== 'Není, jsem spokojená / Nic z výše uvedeného'
  ) || [];
  
  console.log('Filtrované problémy:', problems); // Původní debug log
  
  // Pokud je těhotná, odstraníme pupínky z problémů
  if (isPregnant) {
    problems = problems.filter(problem => !problem.includes('pupínek'));
    console.log('Problémy po odstranění pupínků (těhotenství):', problems);
  }
  
  // Určení doporučené sady
  let recommendedSet: ProductSet;
  if (isPregnant) {
    // Logika pro těhotné
    if (budget === 1500) {
      recommendedSet = 'Normální základ';
      console.log('Těhotenství s limitem 1500 - vybírám Normální základ');
    } else {
      recommendedSet = 'Citlivá';
      console.log('Těhotenství s vyšším limitem - vybírám Citlivou sadu');
    }
  } else if (sensitivityPoints >= 2) {
    // Logika pro citlivou pleť (když není těhotná)
    recommendedSet = problems.includes('Sem tam pupínek') 
      ? 'Citlivá + Sem tam pupínek'
      : 'Citlivá';
    console.log('Citlivá pleť - vybírám:', recommendedSet);
  } else {
    // Standardní logika pro ostatní případy
    recommendedSet = selectProductSet(basicSkinType, problems, budget, answers);
    console.log('Standardní výběr sady:', recommendedSet);
  }
  
  // Určení zobrazovaného typu pleti - tady je hlavní změna
  const isSensitive = sensitivityPoints >= 2 || (isPregnant && budget > 1500);

  let displaySkinType;
  
  if (basicSkinType === 'citlivá') {
    // Najdeme druhý nejčastější typ pleti
    const sortedSkinTypes = Object.entries(points)
      .filter(([type]) => type !== 'Citlivá') // Vyřadíme "Citlivá"
      .sort((a, b) => b[1] - a[1]); // Seřadíme podle bodů
  
    const secondMostCommonType = sortedSkinTypes.length > 0 ? sortedSkinTypes[0][0] : 'Neurčeno';
  
    displaySkinType = secondMostCommonType 
    ? `${secondMostCommonType}, ale nyní musíme řešit především její citlivost` 
    : `Vaše pleť vykazuje známky citlivosti, což je nyní hlavní priorita.`;
} else {
    displaySkinType = isSensitive 
      ? `${basicSkinType} a také citlivá.` 
      : basicSkinType;
  }

console.log('Základní typ pleti:', basicSkinType);
console.log('Je citlivá:', isSensitive);
console.log('Výsledný zobrazený typ:', displaySkinType);
  
  return {
    skinType: displaySkinType,
    recommendedSet,
    problems,
    specialRecommendations: {
      hasPigmentation: problems.includes('Pigmentové skvrny nebo jizvy po akné'),
      hasUndereyeCircles: problems.includes('Kruhy pod očima'),
      antiAgeSuggested: recommendedSet.includes('Anti-age'),
      hasBlackheads: problems.includes('Rozšířené póry / černé tečky') && 
  !['mastná', 'smíšená'].includes(basicSkinType) && 
  !recommendedSet.includes('M+SM komplet') && 
  !recommendedSet.includes('M+SM Anti-age'),
      isPregnant
    }
  };
}
// Funkce pro výběr produktové sady
export function selectProductSet(
  skinType: SkinType, 
  problems: string[], 
  budget: number | null,
  answers: QuizAnswers
): ProductSet {
  console.log('\n=== VÝBĚR PRODUKTOVÉ SADY ===');
  console.log('Vstupní parametry:');
  console.log('- Typ pleti:', skinType);
  console.log('- Problémy:', problems);
  console.log('- Rozpočet:', budget);
  console.log('- Přání:', answers['wish-fish'] || 'žádné');

  // Kontrola speciálních případů
  if (problems.includes('Dermatitida')) {
    console.log('Nalezena dermatitida - vracím speciální sadu');
    return PRODUCT_SETS.DERMATITIDA;
  }
  if (problems.includes('Kuperóza ("popraskané žilky")')) {
    console.log('Nalezena kuperóza - vracím speciální sadu');
    return PRODUCT_SETS.KUPEROZA;
  }


  // Získání dostupných sad pro typ pleti
  const availableSets = SADY_DLE_TYPU[skinType];
  console.log('\nDostupné sady pro typ pleti:', availableSets);

  
  // Filtrování podle cenového limitu
  const affordableSets = availableSets.filter(set => {
    const setPrice = PRICE_LIMITS[set];
    if (setPrice === null) {
      return budget === null;
    }
    return budget === null || setPrice <= budget;
  });
  console.log('Sady v cenovém limitu:', affordableSets);

  // Výběr sady podle problémů
  if (problems.includes('Akné (více než 5 pupínků)')) {
    console.log('Nalezeno akné - vracím speciální sadu pro akné');
    return PRODUCT_SETS.PROBLEM_AKNE;
  }
  
  // A nahraďte ho tímto blokem kódu:
  const hasAcne = problems.includes('Akné (více než 5 pupínků)');
  const wantsToRemoveAcne = answers['wish-fish']?.includes('Ať mi zmizí pupínky');
  
  // Doporučit sadu na akné pouze pokud explicitně vybral akné nebo si přeje zbavit se pupínků
  if (hasAcne || wantsToRemoveAcne) {
    console.log('Nalezeno akné nebo přání zbavit se pupínků - vracím speciální sadu pro akné');
    return PRODUCT_SETS.PROBLEM_AKNE;
  }
  
  // Dále je potřeba upravit řazení dostupných sad, aby "Problém: AKNÉ" 
  // nebyla na prvním místě, pokud uživatel nemá akné
  if (affordableSets.includes(PRODUCT_SETS.PROBLEM_AKNE) && !hasAcne && !wantsToRemoveAcne) {
    // Odstraňte sadu pro akné z dostupných sad, pokud uživatel nemá akné
    affordableSets = affordableSets.filter(set => set !== PRODUCT_SETS.PROBLEM_AKNE);
    console.log('Sada pro akné odstraněna z dostupných sad, protože uživatel nemá akné:', affordableSets);
  }

  if (problems.includes('Sem tam pupínek')) {
    // Pro mastnou/smíšenou pleť
    if ([SKIN_TYPES.MIXED, SKIN_TYPES.OILY].includes(skinType)) {
      const pupinekSet = PRODUCT_SETS.MSM_KOMPLET_PUPINEK;
      if (affordableSets.includes(pupinekSet)) {
        console.log('Nalezen občasný pupínek pro mastnou/smíšenou pleť - vybírám:', pupinekSet);
        return pupinekSet;
      }
    } else {
      // Pro ostatní typy pleti
      const pupinekSet = `${skinType} základ + Sem tam pupínek` as ProductSet;
      if (affordableSets.includes(pupinekSet)) {
        console.log('Nalezen občasný pupínek - vybírám:', pupinekSet);
        return pupinekSet;
      }
    }
  }
    console.log('Pupínková sada není v dostupných sadách, pokračuji dalším výběrem');

    const wishAnswer = answers['wish-fish'];
    if (wishAnswer) {
      console.log('\nVyhodnocuji přání:', wishAnswer);

 // Pokud má být anti-age, vybereme anti-age sadu
if (problems.includes('Vrásky') || wishAnswer?.includes('Chci zpomalit stárnutí')) {
  const antiAgeSet = affordableSets.find(set => set.includes('Anti-age'));
  if (antiAgeSet) {
    console.log('Nalezeny vrásky nebo přání zpomalit stárnutí - vybírám anti-age sadu:', antiAgeSet);
    return antiAgeSet;
  }
  console.log('Anti-age sada není v dostupných sadách, pokračuji dalším výběrem');
}
    
  
    // Přání ohledně mastnoty a lesku
    if (wishAnswer.includes('přestane lesknout') || wishAnswer.includes('černé tečky')) {
      if ([SKIN_TYPES.MIXED, SKIN_TYPES.OILY].includes(skinType)) {
        console.log('Přání ohledně mastnoty/černých teček - vybírám kompletní sadu pro mastnou/smíšenou pleť');
        const kompletSada = affordableSets.find(set => set.includes('komplet'));
        if (kompletSada) return kompletSada;
      }
    }
  
    // Přání ohledně citlivé pleti
    if (wishAnswer.includes('nechci mít citlivou pleť')) {
      console.log('Přání ohledně citlivé pleti - vybírám speciální sadu pro citlivou pleť');
      const citlivaSada = affordableSets.find(set => set.includes('Citlivá'));
      if (citlivaSada) return citlivaSada;
    }
  
    // Přání ohledně pupínků
    if (wishAnswer.includes('zmizí pupínky')) {
      console.log('Přání ohledně pupínků - kontroluji dostupnost pupínkové sady');
      const pupinekSet = `${skinType} základ + Sem tam pupínek` as ProductSet;
      if (affordableSets.includes(pupinekSet)) return pupinekSet;
    }
  

  }
  // Jinak vracíme první dostupnou sadu podle priority
  console.log('\nŽádné speciální podmínky, vracím první dostupnou sadu:', affordableSets[0]);
  if (affordableSets.length > 0) {
    console.log('Žádné speciální podmínky, vracím první dostupnou sadu:', affordableSets[0]);
    return affordableSets[0];
  } else {
    console.log('Nenalezena žádná dostupná sada.');
    return null; // Nebo jiná logická hodnota
  }
}