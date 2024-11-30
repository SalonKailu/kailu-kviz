import { evaluateSkinType, selectProductSet, type SkinType, type ProductSet } from './QuizEvaluation';
import { SKIN_TYPES, PRODUCT_SETS } from './QuizEvaluation';

interface TestCase {
  name: string;
  answers: {
    'skin-description'?: string;
    'skin-nose'?: string;
    'skin-cheeks'?: string;
    'cosmetic-compatibility'?: string[];
    'skin'?: string[];
    'wish-fish'?: string; 
    'budget-limit'?: string;
  };
  expectedSkinType?: SkinType;
  expectedSet: ProductSet;
}

const testCases = [
  {
    name: "Test 1: Citlivá pleť s přáním zbavit se citlivosti, limit 2500",
    answers: {
      'skin-description': 'Je citlivá. Často červená, občas pne, nebo se vytvoří šupinky. Málokterá kosmetika mi sedne',
      'skin-nose': 'Póry jsou viditelné jen při bližším pohledu',
      'skin-cheeks': 'Čert vem póry, mě na první pohled upoutá zarudnutí a celkově podrážděný vzhled',
      'cosmetic-compatibility': ['S kosmetikou musím opatrně, pleť na ni často reaguje pnutím nebo zčervenáním'],
      'skin': ['Rozšířené póry / černé tečky'],
      'wish-fish': 'Už nechci mít citlivou pleť',
      'budget-limit': 'Mám limit 2500 Kč'
    },
    expectedSkinType: SKIN_TYPES.SENSITIVE,
    expectedSet: PRODUCT_SETS.CITLIVA
  },
  {
    name: "Test 2: Normální pleť se stárnutím a černými tečkami, bez limitu",
    answers: {
      'skin-description': 'Je v pohodě, nemám s ní větší problémy',
      'skin-nose': 'Póry jsou viditelné jen při bližším pohledu',
      'skin-cheeks': 'Sem tam možná nějaký je',
      'cosmetic-compatibility': ['Většina kosmetických přípravků mi sedne'],
      'skin': ['Vrásky', 'Rozšířené póry / černé tečky'],
      'wish-fish': 'Chci zpomalit stárnutí',
      'budget-limit': 'Rád/a se podívám i na dražší možnost'
    },
    expectedSkinType: SKIN_TYPES.NORMAL,
    expectedSet: PRODUCT_SETS.SUCHA_ANTIAGE
  },
  {
    name: "Test 3: Smíšená pleť s pupínky a přáním mít zářivější pleť, limit 1500",
    answers: {
      'skin-description': 'Dost se mastí, tváře ale o něco méně, než zbytek obličeje',
      'skin-nose': 'Vaše póry si na schovávanou nehrají',
      'skin-cheeks': 'Vidím je hlavně v oblasti vedle nosu',
      'cosmetic-compatibility': ['U některé kosmetiky mám pocit napnuté pleti, jindy se zase více lesknu'],
      'skin': ['Sem tam pupínek'],
      'wish-fish': 'Ráda bych, aby moje pleť byla zářivější a vypnujější',
      'budget-limit': 'Chtěl/a bych se vejít do 1500 Kč'
    },
    expectedSkinType: SKIN_TYPES.MIXED,
    expectedSet: PRODUCT_SETS.MSM_ZAKLAD
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