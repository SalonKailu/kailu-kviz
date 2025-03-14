import { evaluateSkinType, selectProductSet, type SkinType, type ProductSet } from './QuizEvaluation';
import { SKIN_TYPES, PRODUCT_SETS } from './QuizEvaluation';

const testCases = [
  {
    name: "Test: Smíšená pleť bez akné se sadou pro smíšenou pleť",
    answers: {
      'skin-description': 'Dost se mastí, tváře ale o něco méně, než zbytek obličeje',
      'skin-nose': 'Vaše póry si na schovávanou nehrají. Jsou dobře viditelné, mohou (ale nemusí) v nich být i černé tečky',
      'skin-cheeks': 'Vidím je hlavně v oblasti vedle nosu, na tvářích potom o něco méně.',
      'cosmetic-compatibility': [
        'Většina kosmetických přípravků mi sedne.',
        'S kosmetikou musím opatrně, pleť na ni často reaguje pnutím nebo zčervenáním.',
        'Některé produkty mi úplně ucpou pleť, zanesou póry a vyrobí pupínky!'
      ],
      'skin': [
        'Pigmentové skvrny nebo jizvy po akné',
        'Kruhy pod očima',
        'Vrásky', 
        'Sem tam pupínek',
        'Rozšířené póry / černé tečky'
      ],
      'wish-fish': 'Chci zpomalit stárnutí.',
      'budget-limit': 'Mám limit 2500 Kč a určitě ho nechci překročit.'
    },
    expectedSkinType: SKIN_TYPES.MIXED,
    expectedSet: PRODUCT_SETS.MSM_KOMPLET
  },
  
  {
    name: "Test: Smíšená pleť s přáním zbavit se pupínků",
    answers: {
      'skin-description': 'Dost se mastí, tváře ale o něco méně, než zbytek obličeje',
      'skin-nose': 'Vaše póry si na schovávanou nehrají. Jsou dobře viditelné, mohou (ale nemusí) v nich být i černé tečky',
      'skin-cheeks': 'Vidím je hlavně v oblasti vedle nosu, na tvářích potom o něco méně.',
      'cosmetic-compatibility': [
        'Většina kosmetických přípravků mi sedne.'
      ],
      'skin': [
        'Pigmentové skvrny nebo jizvy po akné',
        'Rozšířené póry / černé tečky'
      ],
      'wish-fish': 'Ať mi zmizí pupínky.',
      'budget-limit': 'Mám limit 2500 Kč a určitě ho nechci překročit.'
    },
    expectedSkinType: SKIN_TYPES.MIXED,
    expectedSet: PRODUCT_SETS.PROBLEM_AKNE
  },
];

// Funkce pro spuštění testů
export function runTests() {
  console.log("=== ZAČÍNÁM TESTOVÁNÍ ===\n");
  let passed = 0;
  let failed = 0;

  testCases.forEach((testCase, index) => {
    console.log(`Spouštím: ${testCase.name}`);
    try {
      // Test typu pleti
      const skinType = evaluateSkinType(testCase.answers);
      if (testCase.expectedSkinType && skinType !== testCase.expectedSkinType) {
        console.error(`❌ Nesprávný typ pleti: očekáváno ${testCase.expectedSkinType}, získáno ${skinType}`);
        failed++;
        return;
      }

      // Test doporučené sady
      const budget = testCase.answers['budget-limit']?.includes('1500') ? 1500 : 
                    testCase.answers['budget-limit']?.includes('2500') ? 2500 : null;
      const recommendedSet = selectProductSet(
        skinType, 
        testCase.answers['skin'] || [], 
        budget,
        testCase.answers
      );

      if (recommendedSet !== testCase.expectedSet) {
        console.error(`❌ Nesprávná doporučená sada: očekáváno ${testCase.expectedSet}, získáno ${recommendedSet}`);
        failed++;
        return;
      }

      console.log(`✅ Test ${index + 1} prošel`);
      passed++;
    } catch (error) {
      console.error(`❌ Chyba v testu: ${error}`);
      failed++;
    }
  });

  console.log(`\n=== VÝSLEDKY TESTOVÁNÍ ===`);
  console.log(`Celkem testů: ${testCases.length}`);
  console.log(`Úspěšné: ${passed}`);
  console.log(`Neúspěšné: ${failed}`);
}

// Spustíme testy
runTests();