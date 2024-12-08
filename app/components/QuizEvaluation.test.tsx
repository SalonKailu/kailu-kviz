import { evaluateSkinType, selectProductSet, type SkinType, type ProductSet } from './QuizEvaluation';
import { SKIN_TYPES, PRODUCT_SETS } from './QuizEvaluation';

const testCases = [
  {
    name: "Test: Mastná pleť s maximem problémů",
    answers: {
      'skin-description': 'Mastí se hodně a všude!',
      'skin-nose': 'Vaše póry si na schovávanou nehrají',
      'skin-cheeks': 'Ano, jsou všude',
      'cosmetic-compatibility': [
        'Některé produkty mi úplně ucpou pleť, zanesou póry a vyrobí pupínky!',
        'U některé kosmetiky mám pocit napnuté pleti, jindy se zase více lesknu'
      ],
      'skin': [
        'Akné (více než 5 pupínků)',
        'Pigmentové skvrny nebo jizvy po akné',
        'Rozšířené póry / černé tečky',
        'Kruhy pod očima'
      ],
      'wish-fish': 'Ať se moje pleť přestane lesknout',
      'budget-limit': 'Rád/a se podívám i na dražší možnost'
    },
    expectedSkinType: SKIN_TYPES.OILY,
    expectedSet: PRODUCT_SETS.PROBLEM_AKNE
  },
  {
    name: "Test: Smíšená pleť se Sem tam pupínkem",
    answers: {
      'skin-description': 'Dost se mastí, tváře ale o něco méně, než zbytek obličeje',
      'skin-nose': 'Vaše póry si na schovávanou nehrají',
      'skin-cheeks': 'Vidím je hlavně v oblasti vedle nosu, na tvářích potom o něco méně',
      'cosmetic-compatibility': [
        'Některé produkty mi úplně ucpou pleť, zanesou póry a vyrobí pupínky!',
      ],
      'skin': ['Sem tam pupínek'],
      'wish-fish': 'Ať mi zmizí pupínky',
      'budget-limit': 'Rád/a se podívám i na dražší možnost'
    },
    expectedSkinType: SKIN_TYPES.MIXED,
    expectedSet: PRODUCT_SETS.MSM_KOMPLET_PUPINEK
  },

  {
    name: "Test: Mastná pleť s akné a pupínky",
    answers: {
      'skin-description': 'Mastí se hodně a všude!',
      'skin-nose': 'Vaše póry si na schovávanou nehrají',
      'skin-cheeks': 'Ano, jsou všude',
      'cosmetic-compatibility': [
        'Některé produkty mi úplně ucpou pleť, zanesou póry a vyrobí pupínky!'
      ],
      'skin': [
        'Akné (více než 5 pupínků)',
        'Sem tam pupínek'  // I když vyberou obojí
      ],
      'wish-fish': 'Ať mi zmizí pupínky',
      'budget-limit': 'Rád/a se podívám i na dražší možnost'
    },
    expectedSkinType: SKIN_TYPES.OILY,
    expectedSet: PRODUCT_SETS.PROBLEM_AKNE  // Měla by se doporučit sada na akné
  }
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