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

// --- BEZPEČNÝ PŘEPÍNAČ VÝSLEDKŮ ---
if (typeof window !== 'undefined') {
  const panel = document.createElement('div');
  panel.style.cssText = 'position:fixed;bottom:20px;left:20px;z-index:99999;background:white;padding:15px;border:2px solid #faa4a6;border-radius:10px;box-shadow:0 5px 20px rgba(0,0,0,0.2);font-family:sans-serif;';
  panel.innerHTML = `
    <b style="display:block;margin-bottom:10px;color:black">Zobrazit výsledky pro:</b>
    <select id="set-switcher" style="padding:5px;width:100%;cursor:pointer;">
      <option value="">-- Vyberte sadu --</option>
      <option value="Suchá a normální Anti-age">Suchá a normální Anti-age</option>
      <option value="M+SM Anti-age">M+SM Anti-age</option>
      <option value="Citlivá">Citlivá</option>
      <option value="Normální základ + Sem tam pupínek">Normální základ + pupínek</option>
    </select>
  `;
  document.body.appendChild(panel);

  document.getElementById('set-switcher')?.addEventListener('change', (e: any) => {
    const vybranaSada = e.target.value;
    if (vybranaSada) {
      // Toto dočasně přepíše výsledek v paměti prohlížeče
      (window as any).forcedSet = vybranaSada;
      // Pokud jsi na stránce výsledků, hned se to změní
      alert("Sada nastavena na: " + vybranaSada + ". Pokud se text nezměnil, dokončete kvíz nebo obnovte stránku.");
      window.location.reload();
    }
  });
}