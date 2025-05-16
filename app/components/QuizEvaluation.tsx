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
    hasBlackheads?: boolean;
    isPregnant?: boolean;
  };
}
// Konstanty pro typy pleti
export const SKIN_TYPES: Record<string, SkinType> = {
  DRY: 'Suchá',
  MIXED: 'Smíšená',
  OILY: 'Mastná',
  SENSITIVE: 'Citlivá',
  NORMAL: 'Normální'
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
  'Dermatitida': 'Sada pro dermatitidu',
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
'Dermatitida': 'dermatitida',
'Problém: AKNÉ': 'sada-pro-problematickou-plet'
};

// Konstanty pro typy pleti
export const SKIN_TYPE_URLS = {
  'Mastná': 'mastnaplet',
  'Smíšená': 'smisenaplet',
  'Suchá': 'suchaplet',
  'Normální': 'normalniplet',
  'Citlivá': 'citlivost'
};

// Sady podle typu pleti s prioritami
export const SADY_DLE_TYPU: Record<SkinType, ProductSet[]> = {
  'Suchá': [
    'Suchá a normální Anti-age',
    'Suchá komplet',
    'Suchá základ + Sem tam pupínek',
    'Suchá základ'
  ],
  'Smíšená': [
    'M+SM komplet + Sem tam pupínek',
    'Problém: AKNÉ',
    'M+SM Anti-age',
    'M+SM komplet',
    'M+SM základ'
  ],
  'Mastná': [
    'M+SM komplet + Sem tam pupínek',
    'Problém: AKNÉ',
    'M+SM Anti-age',
    'M+SM komplet',
    'M+SM základ'
  ],
  'Normální': [
    'Suchá a normální Anti-age',
    'Normální základ + Sem tam pupínek',
    'Normální komplet',
    'Normální základ'
  ],
  'Citlivá': [
    'Citlivá + Sem tam pupínek',
    'Citlivá'
  ]
};

// Cenové limity pro sady
export const PRICE_LIMITS: Record<ProductSet, number | null> = {
  'Suchá základ': 2000,
  'M+SM základ': 2000,
  'Normální základ': 2000,
  'Dermatitida': 2000,
  'Suchá komplet': 2500,
  'M+SM komplet': 2500,
  'Normální komplet': 2500,
  'Citlivá': 2500,
  'Kuperóza': 2500,
  'Problém: AKNÉ': 2500,
  'Suchá a normální Anti-age': 3000,
  'M+SM Anti-age': 2500,
  'Suchá základ + Sem tam pupínek': 2500,
  'M+SM komplet + Sem tam pupínek': 3000,
  'Normální základ + Sem tam pupínek': 2500,
  'Citlivá + Sem tam pupínek': 3000
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
  'Suchá základ': 'Připravila jsem pro vás základní sadu 4 produktů, která je perfektní, pokud hledáte časově úspornou a cenově dostupnější variantu. Pleť bude hydratovaná, vyživená a příjemná na dotek.',
  
  'Suchá komplet': 'Připravila jsem pro vás sadu 5 produktů, které jsou silně hydratační a vyživující. Vaše pleť se díky nim bude mít jako v bavlnce, zmizí příznaky suchosti, podráždění, nepříjemné pnutí i nadměrná tvorba vrásek.',
  
  'Suchá a normální Anti-age': 'Vaše pleť přirozeně stárne o něco rychleji než mastná či smíšená pleť, a proto si zaslouží tuto péči! Produkty v této sadě nabízí intenzivní hydrataci s účinnými anti-age složkami a navíc jsou vhodné i pro citlivu pleť. Už se těšíte, až zazáříte?✨',
  
  'Suchá základ + Sem tam pupínek': 'Vypadá to, že vaše suchá pleť potřebuje především hydrataci, ale občas se na ní vyklube i nějaký ten pupínek. 😯 Pro řešení obou problémů vám doporučuji pořídit si sadu, která pleť hydratuje a zároveň nezatíží a doplnit ji našim oblíbeným duem pro občasné pupínky.',
  
  'M+SM základ': 'Pokud s péčí o pleť teprve začínáte nebo hledáte cenově dostupnější variantu, bude pro vás tato sada perfektní volbou. Produkty jsou lehké, nezatěžují pleť, regulují maz, ale nevysušují. Klikněte na tlačítko a omrkněte, co vás čeká. :)',
  
  'M+SM komplet': 'Vaše pleť potřebuje chytrou péči, která zkrotí nadměrnou tvorbu mazu, zabrání vzniku pupínků a přitom ji nevysuší. 🙏 A přesně to vám zařídí tento úžasný set produktů složený z korejské a české kosmetiky.',
  
  'M+SM komplet + Sem tam pupínek': 'Kompletní sada vaši pleť důkladně vyčistí, zreguluje tvorbu mazu bez vysušení a pomůže předcházet nedokonalostem. Pokud se přesto objeví nějaký ten pupínek, doporučuji mít po ruce produkty ze setu „Sem tam pupínek".',
  
  'M+SM Anti-age': 'Vaše pleť potřebuje péči, která myslí na každý detail! 💪 Tuto sadu sama používám a je to moje srdcovka – zpevňuje pleť, hydratuje bez ucpání pórů, projasňuje, nevysušuje a pomůže redukovat vrásky. Perfektní kombinace vyladěná do posledního detailu, kterou věřím, že si také zamilujete! ',
  
  'Normální komplet': ' Vaše pleť je ve skvělé kondici! Přestože se řadí mezi "normální" typ pleti, o kterém většina lidí jen sní, je důležité neusnout na vavřínech. I vaše pleť se s přibývajícím věkem mění a i když ji běžně netrápí problémy jako suchost, nebo nadměrný maz, procesy spojené s přirozeným stárnutím se jí nevyhnou. Připravila jsem pro vás kompletní sadu, díky které bude stále dokonale vyživená, svěží a rozzářená.',
  
  'Normální základ': (answers) => {
    if (answers['wish-fish']?.includes('Zrovna jsem těhotná')) {
      return 'Tato sada je šetrná, účinná, cenově dostupná a také časově nenáročná. 😇 Perfektní pro vás, v době těhotenství i kojení. ✨ Jen POZORna to, že na denní použití je potřeba dokoupit gel s SPF! V těhotenství je minimálně dvojnásobné riziko vzniku pigmentových skvrn, takže je ochrana UV záření velmi důležitá. 🤫';
    }
    return 'Vypadá to, že je vaše pleť (naprosto) normální! 😯 Gratuluji - a tiše vám závidím. 😊 Máte poměrně vzácný typ pleti, o kterém většina z nás může jen snít. S pravidelným používáním této sady bude vaše pleť svěží, zdravá a přirozeně zářivá.';
  },
  
  'Normální základ + Sem tam pupínek': 'Máte vzácný typ pleti, o kterém mnozí mohou jen snít – vaši pleť označujeme jako „normální." Z vašich odpovědí však vyplývá, že se občas objeví nějaký ten pupínek. Proto bych vám doporučila kombinaci dvou sad. Kompletní sada udrží vaši pleť v rovnováze, dodá jí přirozený jas a svěžest. A pokud se někdy objeví nečekané nedokonalosti, snadno si s nimi poradí naše mini sada „Sem tam pupínek." Dopřejte své pleti komplexní péči a objednejte si obě sady – pro krásu ve všech situacích!',
  
  'Citlivá': (answers) => {
    if (answers['wish-fish']?.includes('Ať už není moje pleť tak vysušená')) {
      return 'Připravila jsem pro vás sadu, která řeší obě vaše potřeby - zklidnění i hydrataci. A jako bonus posílíte ochranou bariéru a kožní mikrobiom vaší pleti.✨';
    }
    return 'Produkty v této sadě jsou velmi šetrné, ale jejich účinnost je neskutečná! Zklidní podrážděnou pleť, posílí její přirozenou ochrannou bariéru, hydratují a vyživují. A jako bonus také zpomalují ztárnutí pleti. 😍';
  },
  
  'Citlivá + Sem tam pupínek': 'Potřebujete péči, která posílí ochrannou bariéru vaší pleti. A přesně na to se zaměřuje sada pro citlivou pleť. Navíc zklidní, hydratuje a vyživí! Pokud budete chtít výrazně urychlit hojení případných pupínků, doporučuji přikoupit i doplňkový set Sem tam pupínek.',
  
  'Kuperóza': 'Nejlepší variantou pro vás bude zklidňující sada zaměřující se na kuperózu (popraskané žilky a začervenání v obličeji). Součástí balíčku je navíc velmi důležitý manuál, ve kterém se dozvíte několik užitečných rad a tipů, které vaší pleti prospějí a jsou stejně důležité jako samotné přípravky.',
  
  'Dermatitida': 'Vybral/a jste možnost, že máte dermatitidu. Není to s ní úplně jednoduché, může být periorální nebo seboroická. Nejlepší bude, když se objednáte na ošetření a probereme to naživo u nás v salonu. Pokud by to nebylo možné, napište mi email na info@kailu.cz, pošlete fotku a dořešíme to na dálku. Bude to výzva, ale se správnou péčí dermatitidu zvládneme porazit! Pro oba dva typy mám připravené sady se skvělými, osvědčenými produkty.🤩',
  
  'Problém: AKNÉ': 'Tato sada vaší pleti pomůže postupně se zklidnit, projasnit a výrazně snížit výskyt akné. Já tuto sadu zbožňuji zejména pro její rychlý nástup účinku a pro skutečně "nadupané" složení. 💖 Součástí vaší nové péče bude navíc i podrobný manuál, který vás krok za krokem provede celým procesem a pomůže vám se vším, co by vaši pleť mohlo ovlivnit. Už teď se těším na vaše výsledky! 🙌'
};

// Proměnná pro body typů pleti
const points = {
  'Suchá': 0,
  'Smíšená': 0,
  'Mastná': 0,
  'Citlivá': 0,
  'Normální': 0
};

// Funkce pro vyhodnocení typu pleti
export function evaluateSkinType(answers: QuizAnswers): SkinType {
  // Reset bodů pro nové vyhodnocení
  points['Suchá'] = 0;
  points['Smíšená'] = 0;
  points['Mastná'] = 0;
  points['Citlivá'] = 0;
  points['Normální'] = 0;

  console.log('=== VYHODNOCENÍ TYPU PLETI ===');
  console.log('Počáteční stav bodů:', {
    Suchá: points['Suchá'],
    Smíšená: points['Smíšená'],
    Mastná: points['Mastná'],
    Citlivá: points['Citlivá'],
    Normální: points['Normální']
  });

  // Vyhodnocení první otázky
  const skinDescription = answers['skin-description'];
  if (skinDescription) {
    console.log('\nVyhodnocuji otázku o typu pleti:', skinDescription);
    if (skinDescription.includes('Je v pohodě')) {
      points['Normální']++;
      points['Smíšená']++;
      console.log('Přidán 1 bod pro Normální a 1 bod pro Smíšenou');
    } else if (skinDescription.includes('Je suchá')) {
      points['Suchá']++;
      console.log('Přidán 1 bod pro Suchou');
    } else if (skinDescription.includes('Dost se mastí')) {
      points['Smíšená']++;
      console.log('Přidán 1 bod pro Smíšenou');
    } else if (skinDescription.includes('Mastí se hodně')) {
      points['Mastná']++;
      console.log('Přidán 1 bod pro Mastnou');
    } else if (skinDescription.includes('Je citlivá')) {
      points['Citlivá']++;
      console.log('Přidán 1 bod pro Citlivou');
    }
    console.log('Body po první otázce:', {
      Suchá: points['Suchá'],
      Smíšená: points['Smíšená'],
      Mastná: points['Mastná'],
      Citlivá: points['Citlivá'],
      Normální: points['Normální']
    });
  }

  // Otázka o nose
  const noseAnswer = answers['skin-nose'];
  if (noseAnswer) {
    console.log('\nVyhodnocuji otázku o nose:', noseAnswer);
    if (noseAnswer.includes('Vaše póry si na schovávanou nehrají')) {
      points['Mastná']++;
      points['Smíšená']++;
      console.log('Přidán 1 bod pro Mastnou a 1 bod pro Smíšenou');
    } else if (noseAnswer.includes('Póry jsou viditelné jen při bližším pohledu')) {
      points['Smíšená']++;
      points['Normální']++;
      console.log('Přidán 1 bod pro Normální a 1 bod pro Smíšenou');
    } else if (noseAnswer.includes('Jaké póry')) {
      points['Suchá']++;
      console.log('Přidán 1 bod pro Suchou');
    }
    console.log('Body po otázce o nose:', {
      Suchá: points['Suchá'],
      Smíšená: points['Smíšená'],
      Mastná: points['Mastná'],
      Citlivá: points['Citlivá'],
      Normální: points['Normální']
    });
  }

  // Otázka o tvářích
  const cheeksAnswer = answers['skin-cheeks'];
  if (cheeksAnswer) {
    console.log('\nVyhodnocuji otázku o tvářích:', cheeksAnswer);
    if (cheeksAnswer.includes('Ano, jsou všude')) {
      points['Mastná']++;
      console.log('Přidán bod pro Mastnou');
    } else if (cheeksAnswer.includes('Vidím je hlavně v oblasti vedle nosu')) {
      points['Smíšená']++;
      console.log('Přidán bod pro Smíšenou');
    } else if (cheeksAnswer.includes('Sem tam možná nějaký je')) {
      points['Normální']++;
      points['Suchá']++;
      console.log('Přidán bod pro Normální a Suchou');
    }
    console.log('Body po otázce o tvářích:', {
      Suchá: points['Suchá'],
      Smíšená: points['Smíšená'],
      Mastná: points['Mastná'],
      Citlivá: points['Citlivá'],
      Normální: points['Normální']
    });
  }

  // Otázka o kosmetice
  const cosmeticAnswers = answers['cosmetic-compatibility'] || [];
  if (cosmeticAnswers.length > 0) {
    console.log('\nVyhodnocuji otázky o kosmetice:', cosmeticAnswers);
    cosmeticAnswers.forEach(answer => {
      if (answer.includes('Občas mám pocit, že mi pleť spíše vysuší')) {
        points['Suchá']++;
        points['Citlivá']++;
        console.log('Přidán bod pro Suchou a Citlivou (vysušení)');
      }
      if (answer.includes('S kosmetikou musím opatrně')) {
        points['Citlivá']++;
        console.log('Přidán bod pro Citlivou (opatrnost)');
      }
      if (answer.includes('Většina kosmetických přípravků mi sedne')) {
        points['Normální']++;
        console.log('Přidán bod pro Normální');
      }
      if (answer.includes('Některé produkty mi úplně ucpou pleť')) {
        points['Mastná']++;
        points['Smíšená']++;
        console.log('Přidán bod pro Mastnou a Smíšenou');
      }
      if (answer.includes('Moje pleť miluje pořádně hutné krémy')) {
        points['Suchá']++;
        console.log('Přidán bod pro Suchou');
      }
    });
    console.log('Body po otázce o kosmetice:', {
      Suchá: points['Suchá'],
      Smíšená: points['Smíšená'],
      Mastná: points['Mastná'],
      Citlivá: points['Citlivá'],
      Normální: points['Normální']
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
  const budget = budgetAnswer.includes('2000') ? 2000 :
                budgetAnswer.includes('2500') ? 2500 : null;
  console.log('Rozpočet:', budget);
  
  // Filtrujeme problémy
  let problems = answers['skin']?.filter(problem =>
    problem !== 'Není, jsem spokojená / Nic z výše uvedeného'
  ) || [];
  
  console.log('Filtrované problémy:', problems);
  
  // KLÍČOVÁ ZMĚNA: Priorita pro dermatitidu a kuperozu
  if (problems.includes('Zarudlé skvrny, šupinky nebo malé pupínky v okolí úst nebo na čele, nose a obočí (Dermatitida)')) {
    console.log('Nalezena dermatitida - nastavuji speciální sadu');
    
    // Určení zobrazovaného typu pleti
    const isSensitive = sensitivityPoints >= 2 || (isPregnant && budget > 2000);
    let displaySkinType = isSensitive 
      ? `${basicSkinType} a také citlivá` 
      : basicSkinType;
    
    return {
      skinType: displaySkinType,
      recommendedSet: 'Dermatitida',
      problems,
      specialRecommendations: {
        hasPigmentation: problems.includes('Pigmentové skvrny nebo jizvy po akné'),
        hasUndereyeCircles: problems.includes('Kruhy pod očima'),
        antiAgeSuggested: false,
        hasBlackheads: problems.includes('Rozšířené póry / černé tečky') && 
          !['Mastná', 'Smíšená'].includes(basicSkinType),
        isPregnant
      }
    };
  }
  
  if (problems.includes('Trvale začervenalá pleť / popraskané žilky')) {
    console.log('Nalezena kuperóza - nastavuji speciální sadu');
    
    // Určení zobrazovaného typu pleti
    const isSensitive = sensitivityPoints >= 2 || (isPregnant && budget > 2000);
    let displaySkinType = isSensitive 
      ? `${basicSkinType} a také citlivá` 
      : basicSkinType;
    
    return {
      skinType: displaySkinType,
      recommendedSet: 'Kuperóza',
      problems,
      specialRecommendations: {
        hasPigmentation: problems.includes('Pigmentové skvrny nebo jizvy po akné'),
        hasUndereyeCircles: problems.includes('Kruhy pod očima'),
        antiAgeSuggested: false,
        hasBlackheads: problems.includes('Rozšířené póry / černé tečky') && 
          !['Mastná', 'Smíšená'].includes(basicSkinType),
        isPregnant
      }
    };
  }
  
  // Pokud je těhotná, odstraníme pupínky z problémů
  if (isPregnant) {
    problems = problems.filter(problem => !problem.includes('pupínek'));
    console.log('Problémy po odstranění pupínků (těhotenství):', problems);
  }
  
  // Určení doporučené sady
  let recommendedSet: ProductSet;
  if (isPregnant) {
    // Logika pro těhotné
    if (budget === 2000) {
      recommendedSet = 'Normální základ';
      console.log('Těhotenství s limitem 2000 - vybírám Normální základ');
    } else {
      recommendedSet = 'Citlivá';
      console.log('Těhotenství s vyšším limitem - vybírám Citlivou sadu');
    }
  } else if (sensitivityPoints >= 2) {
  // Logika pro citlivou pleť (když není těhotná)
  if (budget === 2000) {
  // Pro základní typ pleti vybíráme kompletní sadu pro rozpočet 2000, pokud je dostupná
const affordableSets = SADY_DLE_TYPU[basicSkinType].filter(set => {
  const setPrice = PRICE_LIMITS[set];
  return setPrice === null || setPrice <= 2000;
});
recommendedSet = affordableSets.length > 0 ? affordableSets[0] : `${basicSkinType} základ`;
    console.log('Citlivá pleť s omezeným rozpočtem - vybírám:', recommendedSet);
  } else {
    // Pro vyšší rozpočet zvolíme citlivou sadu
    recommendedSet = problems.includes('Sem tam pupínek') 
      ? 'Citlivá + Sem tam pupínek'
      : 'Citlivá';
    console.log('Citlivá pleť - vybírám:', recommendedSet);
  }
} else {
    // Standardní logika pro ostatní případy
    recommendedSet = selectProductSet(basicSkinType, problems, budget, answers);
    console.log('Standardní výběr sady:', recommendedSet);
  }
  
  // Určení zobrazovaného typu pleti
  const isSensitive = sensitivityPoints >= 2 || (isPregnant && budget > 2000);
  let displaySkinType;
  
  if (basicSkinType === 'Citlivá') {
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
      ? `${basicSkinType} a také citlivá` 
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
        !['Mastná', 'Smíšená'].includes(basicSkinType) && 
        !recommendedSet.includes('M+SM komplet') && 
        !recommendedSet.includes('M+SM Anti-age'),
      isPregnant
    }
  };
};

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
  if (problems.includes('Zarudlé skvrny, šupinky nebo malé pupínky v okolí úst nebo na čele, nose a obočí (Dermatitida)')) {
    console.log('Nalezena dermatitida - vracím speciální sadu');
    return PRODUCT_SETS.DERMATITIDA;
  }
  
  if (problems.includes('Trvale začervenalá pleť / popraskané žilky')) {
    console.log('Nalezena kuperóza - vracím speciální sadu');
    return PRODUCT_SETS.KUPEROZA;
  }

  // Získání dostupných sad pro typ pleti
  const availableSets = SADY_DLE_TYPU[skinType];
  console.log('\nDostupné sady pro typ pleti:', availableSets);

  // Filtrování podle cenového limitu
  let affordableSets = availableSets.filter(set => {
    const setPrice = PRICE_LIMITS[set];
    if (setPrice === null) {
      return budget === null;
    }
    return budget === null || setPrice <= budget;
  });
  console.log('Sady v cenovém limitu:', affordableSets);

  // Výběr sady podle problémů
  const hasAcne = problems.includes('Akné (více než 5 pupínků)');
  const wantsToRemoveAcne = answers['wish-fish']?.includes('Ať mi zmizí pupínky');
  
  // Doporučit sadu na akné pouze pokud explicitně vybral akné nebo si přeje zbavit se pupínků
  if (hasAcne || wantsToRemoveAcne) {
    console.log('Nalezeno akné nebo přání zbavit se pupínků - vracím speciální sadu pro akné');
    return PRODUCT_SETS.PROBLEM_AKNE;
  }
  
  // Odstraňte sadu pro akné z dostupných sad, pokud uživatel nemá akné
  if (affordableSets.includes(PRODUCT_SETS.PROBLEM_AKNE) && !hasAcne && !wantsToRemoveAcne) {
    affordableSets = affordableSets.filter(set => set !== PRODUCT_SETS.PROBLEM_AKNE);
    console.log('Sada pro akné odstraněna z dostupných sad, protože uživatel nemá akné:', affordableSets);
  }

  if (problems.includes('Sem tam pupínek')) {
    // Pro mastnou/smíšenou pleť
    if (['Smíšená', 'Mastná'].includes(skinType)) {
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
    console.log('Pupínková sada není v dostupných sadách, pokračuji dalším výběrem');
  }

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
      if (['Smíšená', 'Mastná'].includes(skinType)) {
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
  if (affordableSets.length > 0) {
    console.log('Žádné speciální podmínky, vracím první dostupnou sadu:', affordableSets[0]);
    return affordableSets[0];
  } else {
    console.log('Nenalezena žádná dostupná sada.');
    // Fallback pro případ, že by nebyly žádné dostupné sady
    return skinType === 'Suchá' ? PRODUCT_SETS.SUCHA_ZAKLAD :
           skinType === 'Mastná' || skinType === 'Smíšená' ? PRODUCT_SETS.MSM_ZAKLAD :
           skinType === 'Normální' ? PRODUCT_SETS.NORMALNI_ZAKLAD :
           PRODUCT_SETS.CITLIVA;
  }
}