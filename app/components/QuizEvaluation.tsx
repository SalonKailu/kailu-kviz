// Typy pro kvíz
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

interface QuizAnswers {
  'skin-description'?: string;
  'skin-nose'?: string;
  'skin-cheeks'?: string;
  'cosmetic-compatibility'?: string[];
  'skin'?: string[];
  'wish-fish'?: string;
  'budget-limit'?: string;
}

// Funkce pro vyhodnocení typu pleti
export function evaluateSkinType(answers: QuizAnswers): SkinType {
  const points: Record<SkinType, number> = {
    [SKIN_TYPES.DRY]: 0,
    [SKIN_TYPES.MIXED]: 0,
    [SKIN_TYPES.OILY]: 0,
    [SKIN_TYPES.SENSITIVE]: 0,
    [SKIN_TYPES.NORMAL]: 0
  };

  // Vyhodnocení první otázky o typu pleti
  const skinDescription = answers['skin-description'];
  if (skinDescription) {
    if (skinDescription.includes('Je v pohodě')) {
      points[SKIN_TYPES.NORMAL]++;
      points[SKIN_TYPES.MIXED]++;
    } else if (skinDescription.includes('Je suchá')) {
      points[SKIN_TYPES.DRY]++;
    } else if (skinDescription.includes('Dost se mastí')) {
      points[SKIN_TYPES.MIXED]++;
    } else if (skinDescription.includes('Mastí se hodně')) {
      points[SKIN_TYPES.OILY]++;
    } else if (skinDescription.includes('Je citlivá')) {
      points[SKIN_TYPES.SENSITIVE]++;
      points[SKIN_TYPES.DRY]++;
    }
  }

  // Vyhodnocení otázky o nose
  const noseAnswer = answers['skin-nose'];
  if (noseAnswer) {
    if (noseAnswer.includes('Vaše póry si na schovávanou nehrají')) {
      points[SKIN_TYPES.OILY]++;
      points[SKIN_TYPES.MIXED]++;
    } else if (noseAnswer.includes('Póry jsou viditelné jen při bližším pohledu')) {
      points[SKIN_TYPES.NORMAL]++;
    } else if (noseAnswer.includes('Jaké póry')) {
      points[SKIN_TYPES.DRY]++;
    }
  }

  // Vyhodnocení odpovědí o kosmetice
  const cosmeticAnswers = answers['cosmetic-compatibility'] || [];
  cosmeticAnswers.forEach(answer => {
    if (answer.includes('Občas mám pocit, že mi pleť spíše vysuší')) {
      points[SKIN_TYPES.DRY]++;
      points[SKIN_TYPES.SENSITIVE]++;
    }
    if (answer.includes('S kosmetikou musím opatrně')) {
      points[SKIN_TYPES.SENSITIVE]++;
    }
    // ... další vyhodnocení
  });

  // Určení výsledného typu pleti
  const sortedTypes = Object.entries(points)
    .sort(([, a], [, b]) => b - a) as [SkinType, number][];

  return sortedTypes[0][0];
}

// Funkce pro výběr produktové sady
export function selectProductSet(
  skinType: SkinType, 
  problems: string[], 
  budget: number
): ProductSet {
  // Kontrola speciálních případů
  if (problems.includes('Dermatitida')) {
    return PRODUCT_SETS.DERMATITIDA;
  }
  if (problems.includes('Kuperóza ("popraskané žilky")')) {
    return PRODUCT_SETS.KUPEROZA;
  }

  // Základní výběr podle typu pleti
  const sets: Record<SkinType, ProductSet[]> = {
    [SKIN_TYPES.DRY]: [PRODUCT_SETS.SUCHA_ZAKLAD, PRODUCT_SETS.SUCHA_KOMPLET],
    [SKIN_TYPES.MIXED]: [PRODUCT_SETS.MSM_ZAKLAD, PRODUCT_SETS.MSM_KOMPLET],
    [SKIN_TYPES.OILY]: [PRODUCT_SETS.MSM_ZAKLAD, PRODUCT_SETS.MSM_KOMPLET],
    [SKIN_TYPES.SENSITIVE]: [PRODUCT_SETS.CITLIVA],
    [SKIN_TYPES.NORMAL]: [PRODUCT_SETS.NORMALNI_ZAKLAD, PRODUCT_SETS.NORMALNI_KOMPLET]
  };

  let recommendedSet = sets[skinType][0];

  // Úprava doporučení podle problémů
  if (problems.includes('Akné (více než 5 pupínků)')) {
    recommendedSet = PRODUCT_SETS.PROBLEM_AKNE;
  } else if (problems.includes('Sem tam pupínek')) {
    const pupinekSet = `${recommendedSet} + Sem tam pupínek` as ProductSet;
    recommendedSet = pupinekSet;
  }

  // Zohlednění rozpočtu
  if (budget === 1500) {
    recommendedSet = sets[skinType][0]; // Základní sada
  }

  return recommendedSet;
}