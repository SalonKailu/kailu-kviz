// Základní typy
export type SkinType = 'Suchá' | 'Smíšená' | 'Mastná' | 'Citlivá' | 'Normální';
export type ProductSet = 
  | 'Suchá základ' 
  | 'Suchá a normální Anti-age'
  | 'Suchá základ + Sem tam pupínek'
  | 'M+SM základ'
  | 'M+SM komplet'
  | 'M+SM komplet + Sem tam pupínek'
  | 'M+SM Anti-age'
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
  SUCHA_ANTIAGE: 'Suchá a normální Anti-age',
  SUCHA_PUPINEK: 'Suchá základ + Sem tam pupínek',
  MSM_ZAKLAD: 'M+SM základ',
  MSM_KOMPLET: 'M+SM komplet',
  MSM_KOMPLET_PUPINEK: 'M+SM komplet + Sem tam pupínek',
  MSM_ANTIAGE: 'M+SM Anti-age',
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
  'Normální základ': 'Sada pro normální pleť',
  'Suchá základ': 'Sada pro suchou pleť',
  'M+SM základ': 'Základní sada pro mastnou a smíšenou pleť',
  'M+SM komplet': 'Kompletní sada pro mastnou a smíšenou pleť',
  'Suchá a normální Anti-age': 'Anti-age sada pro normální a suchou pleť',
  'M+SM Anti-age': 'Anti-age sada pro mastnou a smíšenou pleť',
  'Citlivá': 'Sada pro citlivou pleť',
  'Citlivá + Sem tam pupínek': 'Sada pro citlivou pleť s pupínky',
  'Kuperóza': 'Sada pro pleť se začervenáním',
  'Dermatitida': 'Sada pro dermatitidu',
  'Problém: AKNÉ': 'Sada pro problematickou pleť'
};

export const SHOP_BASE_URL = 'https://www.kailushop.cz/';
export const PRODUCT_URLS = {
'Suchá základ': 'zakladni-sada-pro-suchou-plet',
'Suchá a normální Anti-age': 'anti-age-sada-pro-normalni-a-suchou-plet',
'Suchá základ + Sem tam pupínek': 'sada-pro-suchou-plet',
'M+SM základ': 'zakladni-sada-pro-mastnou-a-smisenou-plet',
'M+SM komplet': 'kompletni-sada-pro-mastnou-a-smisenou-plet',
'M+SM komplet + Sem tam pupínek': 'kompletni-sada-pro-mastnou-a-smisenou-plet',
'M+SM Anti-age': 'anti-age-sada-pro-mastnou-a-smisenou-plet',
'Normální základ': 'sada-pro-normalni-plet',
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
  'Suchá základ + Sem tam pupínek',
  'Suchá základ'  
],
  'Smíšená': [
    'M+SM Anti-age',
    'M+SM komplet',
    'M+SM komplet + Sem tam pupínek',
    'Problém: AKNÉ',
    'M+SM základ'
  ],
  'Mastná': [
    'M+SM Anti-age',
    'M+SM komplet',
    'M+SM komplet + Sem tam pupínek',
    'Problém: AKNÉ',
    'M+SM základ'
  ],
  'Normální': [
  'Suchá a normální Anti-age',
  'Normální základ + Sem tam pupínek',
  'Normální základ',
  'Problém: AKNÉ',
],
  'Citlivá': [
    'Citlivá',
    'Citlivá + Sem tam pupínek',
  ]
};

// Cenové limity pro sady
export const PRICE_LIMITS: Record<ProductSet, number | null> = {
  'Suchá základ': 2000,
  'M+SM základ': 2000,
  'Normální základ': 2000,
  'Dermatitida': 2000,
  'M+SM komplet': 2500,
  'Citlivá': 2500,
  'Kuperóza': 2500,
  'Problém: AKNÉ': 2500,
  'Suchá a normální Anti-age': 2500,
  'M+SM Anti-age': 3000,
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
    getText: (isAntiAge: boolean) => 'Pro zmírnění kruhů pod očima vám doporučuji přihodit do košíku skvělý oční krém od korejské značky Skin1004.'
  }
};

// Výsledné texty pro jednotlivé sady
export const RESULT_TEXTS: Record<ProductSet, string | ((answers: QuizAnswers) => string)> = {
  'Suchá základ': `<p style="margin-bottom: 1rem;">Podle vašich odpovědí je vaše pleť suchá a <strong>potřebuje hlavně hydrataci a výživu</strong>.</p>
<p style="margin-bottom: 1rem;">Proto jsem pro vás vybrala sadu, která <strong>přinese okamžitou úlevu a dlouhodobou rovnováhu</strong>:</p>
<ul style="margin-bottom: 1rem; padding-left: 1.2rem;">
  <li>➡ Uleví od pnutí a suchosti</li>
  <li>➡ Zjemní a zklidní pleť během několika dní</li>
  <li>➡ Dodá výživu bez zbytečné zátěže</li>
  <li>➡ Je časově i finančně úsporná</li>
</ul>
<p>S touto péčí bude vaše pleť jemná, vyživená a spokojená. ✨</p>`,
  
  'Suchá a normální Anti-age': `<p style="margin-bottom: 1rem;">Super! Díky vaším odpovědím víme, že kromě <strong>suchosti</strong> pleti řešíte i <strong>projevy stárnutí.</strong></p>
<p style="margin-bottom: 1rem;">Přímo pro vás je stvořená naše anti-age sada, která spojuje intenzivní hydrataci s účinnou ochranou proti vráskám:</p>
<ul style="margin-bottom: 1rem; padding-left: 1.2rem;">
  <li>➡ Hydratuje, zpevní a rozjasní pleť</li>
  <li>➡ Zpomaluje tvorbu jemných linek a vrásek ✨</li>
  <li>➡ Obsahuje <strong>aktivní látky s klinicky prokazatelnými účinky</strong></li>
</ul>
<p>Tato sada udrží vaši pleť pružnou, mladistvou a svěží každý další den. 🌸</p>`,
  
   'Suchá základ + Sem tam pupínek': `<p style="margin-bottom: 1rem;">Vypadá to, že je vaše pleť suchá, ale občas se na ní objeví i pupínek.</p>
<p style="margin-bottom: 1rem;">Proto jsem připravila <strong>kombinaci, která řeší oba problémy najednou</strong>:</p>
<ul style="margin-bottom: 1rem; padding-left: 1.2rem;">
  <li>Dlouhodobá hydratace a úleva od suchosti 💧</li>
  <li>Lehká textura, která neucpává póry</li>
  <li>Doplňkový SOS gel na rychlé řešení pupínků</li>
</ul>
<p>Vaše pleť tak bude jemná, vyživená a bez nečekaných překvapení.🎯</p>`,
  
  'M+SM základ': (answers) => {
    if (answers['skin-description']?.includes('Je suchá') || 
        answers['cosmetic-compatibility']?.includes('Občas mám pocit, že mi pleť spíše vysuší')) {
      return `<p style="margin-bottom: 1rem;">Vypadá to, že vaše suchá pleť je ve skutečnosti <strong>dehydratovaná</strong> - chybí jí voda, ne tuky. 💧</p>
      <p style="margin-bottom: 1rem;">Právě proto (a s ohledem na váš rozpočet), jsem pro vás vybrala tuto základní sadu.</p>

<ul style="margin-bottom: 1rem; padding-left: 1.2rem;">
  <li>➡ Dodá pleti potřebnou hydrataci 💧</li>
  <li>➡ Zajistí, že nebude mastná ani vysušená</li>
  <li>➡ Nezanáší póry</li>
  <li>➡ Je vhodná pro váš typ pleti</li>
</ul>

<p>Pokud byste měl/a pocit, že přeci jen potřebujete <strong>více hydratace</strong>, doporučuji před krémem nanášet ještě <a href="https://www.kailushop.cz/hydratacni-serum/" target="_blank" rel="noopener noreferrer" class="text-black underline hover:text-[#faa4a6]">hydratační sérum</a>! 🎯</p>`;
    }

    return `<p style="margin-bottom: 1rem;">Tohle je přesně to, co vaše pleť potřebuje! 🎯</p>
<p style="margin-bottom: 1rem;">Základní sada pro váš typ pleti:</p>
<ul style="margin-bottom: 1rem; padding-left: 1.2rem;">
  <li>➡ Čistí a osvěžuje pleť</li>
  <li>➡ Hydratuje bez ucpávání pórů</li>
  <li>➡ Pomáhá udržet pleť matnou</li>
  <li>➡ Předchází vzniku pupínků</li>
</ul>
<p>A víte co je na tom ještě skvělé? <strong>Vejdete se do rozpočtu</strong> a péče vám zabere <strong>jen pár minut denně.</strong> 💕</p>`;
  },
  
  'M+SM komplet': (answers) => {
  // Pokud odpověděl "je suchá" v první otázce NEBO má pocit vysušení
  if (answers['skin-description']?.includes('Je suchá') || 
      answers['cosmetic-compatibility']?.includes('Občas mám pocit, že mi pleť spíše vysuší')) {
     return `<p style="margin-bottom: 1rem;">Z vašich odpovědí vyplývá, že vaše pleť <strong>není typově suchá</strong>, jen jí chybí voda – je tedy <strong>dehydratovaná</strong>.</p>
<p style="margin-bottom: 1rem;">Tento kompletní set vyřeší oba problémy najednou:</p>
<ul style="margin-bottom: 1rem; padding-left: 1.2rem;">
  <li>➡ Dodá pleti <strong>hydrataci</strong> bez ucpání pórů 💧</li>
  <li>➡ Dodá pleti potřebný balanc díky <strong>zpevnění kožní bariéry</strong></li>
  <li>➡ Uleví od lesku i nepříjemného pnutí</li>

</ul>
<p>Vaše pleť bude konečně vyvážená – žádný lesk, žádná suchost! ✨</p>`;
  }
  
  return `<p style="margin-bottom: 1rem;">Pleť podobnou té vaší má téměř polovina našich zákaznic. 🙏 </p>
<p style="margin-bottom: 1rem;">Díky tomu jsem mohla do detailu vypiplat a mnohokrát si ověřit účinky této <strong>kompletní sady z korejské a české kosmetiky</strong>, která:</p>
<ul style="margin-bottom: 1rem; padding-left: 1.2rem;">
  <li>➡ Reguluje mastnotu a lesk</li>
  <li>➡ Brání vzniku pupínků</li>
  <li>➡ Hydratuje bez vysušení</li>
  <li>➡ Předchází prvním známkám stárnutí</li>
</ul>
<p>Je to ideální kombinace, která vaši pleť dostane do rovnováhy. ⚖</p>`;
},
  
'M+SM komplet + Sem tam pupínek': `<p style="margin-bottom: 1rem;">Vypadá to, že mazové žlázky na vaší pleti perfektně fungují, ale občas se díky tomu objeví i nechtěné pupínky.</p>
<p style="margin-bottom: 1rem;">Proto doporučuji tuto kompletní sadu, kterou můžete doplnit o náš oblíbený <a href="https://www.kailushop.cz/sos-gel/" target="_blank" rel="noopener noreferrer" class="text-black underline hover:text-[#faa4a6]">SOS gel</a> pro rychlé řešení nedokonalostí.</p>
<p style="margin-bottom: 1rem;">Tato kompletní sada:</p>
<ul style="margin-bottom: 1rem; padding-left: 1.2rem;">
  <li>➡ Důkladně <strong>čistí</strong> bez vysušení nebo podráždění</li>
  <li>➡ <strong>Reguluje</strong> tvorbu mazu</li>
  <li>➡ <strong>Hydratuje</strong> bez zatížení</li>
  <li>➡ <strong>Předchází</strong> ucpávání pórů a vzniku nedokonalostí</li>
</ul>
<p>S touto kombinací se vaše pleť zharmonizuje tak rychle, že ani nestihnete říct "pupínek".😉</p>`,
  
  'M+SM Anti-age': (answers) => {
  // Pokud odpověděl "je suchá" v první otázce NEBO má pocit vysušení
  if (answers['skin-description']?.includes('Je suchá') || 
      answers['cosmetic-compatibility']?.includes('Občas mám pocit, že mi pleť spíše vysuší')) {
    return `<p style="margin-bottom: 1rem;">Tato anti-age sada řeší hned tři problémy najednou - <strong>dehydrataci, póry náchylné k ucpávání i stárnutí</strong>. 💧✨</p>

<ul style="margin-bottom: 1rem; padding-left: 1.2rem;">
  <li>➡ Zpevňuje a projasňuje pleť</li>
  <li>➡ Hydratuje, aniž by ucpávala póry</li>
  <li>➡ Pomáhá redukovat vrásky a zpomaluje jejich tvorbu</li>
  <li>➡ Obsahuje retinol a retinal, jejichž <strong>účinnost je klinicky ověřena</strong> mnoha výzkumy</li>
</ul>

<p>Sama tuto sadu používám a naprosto ji zbožňuji. Těším se, až i vám přinese o level krásnější pleť.🙌</p>`;
  }
  
  return `<p style="margin-bottom: 1rem;">Z vašich odpovědí vyplývá, že kromě mastnější nebo smíšené pleti řešíte také projevy stárnutí.</p>

<p style="margin-bottom: 1rem;">Proto jsem vybrala anti-age sadu, která kombinuje <strong>účinnou regulaci mazu, hydrataci i péči proti vráskám</strong>:</p>

<ul style="margin-bottom: 1rem; padding-left: 1.2rem;">
  <li>➡ <strong>Zpevňuje</strong> a <strong>projasňuje</strong> pleť</li>
  <li>➡ <strong>Hydratuje</strong>, aniž by ucpávala póry</li>
  <li>➡ Pomáhá <strong>redukovat</strong> vrásky a zpomaluje jejich tvorbu</li>
  <li>➡ Obsahuje <strong>retinol a retinal</strong>, jejichž <strong>účinnost je klinicky ověřena</strong> a podpořena mnoha výzkumy</li>
</ul>

<p>Sama tuto sadu používám a naprosto ji zbožňuji. Těším se, až i vám přinese o level krásnější pleť.🙌</p>`;
},
  
'Normální základ': (answers) => {
  if (answers['wish-fish']?.includes('Zrovna jsem těhotná')) {
    return `<p style="margin-bottom: 1rem;">Doporučuji vám tuto sadu, protože je:</p>
    <ul style="margin-bottom: 1rem; padding-left: 1.2rem;">
  <li>➡ Perfektní pro vás, v době těhotenství i kojení</li>
  <li>➡ Cenově i časově úsporná</li>
  <li>➡ Šetrná a účinná</li>
  <li>➡ Hydratační, ale neucpávající póry</li>
</ul>
<p>❗V těhotenství je minimálně <strong>dvojnásobné riziko vzniku pigmentových skvrn</strong>, takže dbejte na <strong>důsledné nanášení i pravidelnou re-aplikaci denního krému.</strong> 🤫</p>`;
  }
  return `<p style="margin-bottom: 1rem;">Vypadá to, že je vaše pleť (naprosto) normální! 😯 Gratuluji - a tiše vám závidím. 😊</p>

<p style="margin-bottom: 1rem;">Doporučuji vám sadu, která:</p>

<ul style="margin-bottom: 1rem; padding-left: 1.2rem;">
  <li>➡ Udržuje pleť svěží a v kondici</li>
  <li>➡ Chrání před předčasným stárnutím</li>
  <li>➡ Je časově i finančně nenáročná</li>
</ul>

<p>Tato sada udrží vaši pleť dlouhodobě v perfektní kondici a ochrání ji před stárnutím. ✨</p>`;
},
  
  'Normální základ + Sem tam pupínek': `<p style="margin-bottom: 1rem;">Z vašich odpovědí to vypadá, že máte typ pleti, o kterém mnozí mohou jen snít – vaši pleť označujeme jako „normální". 😊</p>
<p style="margin-bottom: 1rem;">Vidím ale, že vás občas potrápí nějaký ten pupínek a proto vám doporučuji tuto kombinaci:</p>

<p style="margin-bottom: 0.5rem;"><strong>1) Základní sada pro normální pleť:</strong></p>
<ul style="margin-bottom: 1rem; padding-left: 1.2rem;">
  <li>➡ <strong>Udržuje</strong> pleť svěží a v kondici</li>
  <li>➡ <strong>Nezanáší</strong> póry</li>
  <li>➡ <strong>Chrání</strong> před předčasným stárnutím</li>
  <li>➡ Je <strong>časově i finančně nenáročná</strong></li>
</ul>

<p style="margin-bottom: 0.5rem;"><strong>2) SOS gel:</strong></p>
<ul style="margin-bottom: 1rem; padding-left: 1.2rem;">
  <li>➡ Hravě si poradí s klubajícím se pupínkem</li>
  <li>➡ <strong>Zabraňuje</strong> rozšíření nedokonalostí</li>
  <li>➡ <strong>Urychluje hojení</strong> a brání vzniku jizev nebo fleků</li>
</ul>

<p>S touto kombinací bude vaše pleť vždy jen zářit! ✨</p>`,
  
  'Citlivá': (answers) => {
  if (answers['wish-fish']?.includes('Ať už není moje pleť tak vysušená')) {
    return `<p style="margin-bottom: 1rem;">Vaše odpovědi ukazují, že máte citlivou, suchou pleť.</p>
<p style="margin-bottom: 1rem;">Proto jsem vybrala <strong>sadu, která řeší obě potřeby najednou</strong>:</p>
<ul style="margin-bottom: 1rem; padding-left: 1.2rem;">
  <li>➡ <strong>Zklidní</strong> podráždění</li>
  <li>➡ Doplní <strong>hydrataci</strong></li>
  <li>➡ Posílí <strong>ochrannou bariéru</strong> a <strong>mikrobiom</strong> pleti</li>
</ul>
<p>Díky <strong>zdravému mikrobiomu</strong> a <strong>silné kožní bariéře</strong> se vaše pleť změní k nepoznání! A jako bonus, sada také <strong>předchází vzniku vrásek a zpomaluje stárnutí</strong>.✨</p>`;
  }
  return `<p style="margin-bottom: 1rem;">Podle vašich odpovědí máte citlivou pleť, která potřebuje hlavně zklidnění a ochranu.</p>

<p style="margin-bottom: 1rem;">Proto doporučuji sadu, která kombinuje jemnou, ale účinnou péči:</p>

<ul style="margin-bottom: 1rem; padding-left: 1.2rem;">
  <li>➡ Zklidní zarudnutí a pálení</li>
  <li>➡ Hydratuje a posílí ochrannou bariéru</li>
  <li>➡ Podpoří zdravý mikrobiom pleti</li>
  <li>➡ Předchází vzniku vrásek a zpomaluje stárnutí pleti</li>
</ul>

<p>Díky této péči se vaše pleť bude cítit jako v sedmém nebi. 🌸</p>`;
},
  
'Citlivá + Sem tam pupínek': `<p style="margin-bottom: 1rem;">Potřebujete péči, která <strong>posílí ochrannou bariéru</strong> vaší pleti.</p>
<p style="margin-bottom: 1rem;">Proto je ideální volbou pro vás tato sada:</p>

<ul style="margin-bottom: 1rem; padding-left: 1.2rem;">
  <li>➡ Neucpává póry a zmírňuje zánět</li>
  <li>➡ Zklidní zarudnutí a nepříjemné pocity</li>
  <li>➡ Hydratuje a posílí ochrannou bariéru</li>
  <li>➡ Podpoří zdravý mikrobiom pleti</li>
  <li>➡ Předchází vzniku vrásek a zpomaluje stárnutí pleti</li>
</ul>
<p style="margin-bottom: 1rem;">K sadě vám doporučuji přihodit náš oblíbený <a href="https://www.kailushop.cz/sos-gel/" target="_blank" rel="noopener noreferrer" class="text-black underline hover:text-[#faa4a6]">SOS gel</a> pro rychlé řešení nedokonalostí.</p>`,
  
  'Kuperóza': `<p style="margin-bottom: 1rem;">Podle vašich odpovědí vás trápí začervenání pleti, které je často způsobeno "popraskanými žilkami".</p>

<p style="margin-bottom: 1rem;">Proto doporučuji speciální sadu zaměřenou právě na tento problém:</p>

<ul style="margin-bottom: 1rem; padding-left: 1.2rem;">
  <li>➡ Zklidňuje zarudnutí a podráždění</li>
  <li>➡ Podporuje pevnost a pružnost cév</li>
  <li>➡ Předchází zhoršování stavu</li>
  <li>➡ Vyživuje a hydratuje pleť</li>
</ul>

<p>⚡Pokud jde ve vašem případě pouze o občasné zarudnutí / nárazovou reakci pleti, bude pro vás správnou volbou také <a href="https://www.kailushop.cz/sada-pro-citlivou-plet/" target="_blank" style="color: #faa4a6; text-decoration: underline;">sadu pro citlivou pleť</a>, která se liší pouze použitým sérem. 😌</p>`,

  
  'Dermatitida': `<p style="margin-bottom: 1rem;"><strong>Zvolil/a jste možnost, že vás trápí dermatitida.</strong></p>

<p style="margin-bottom: 1rem;">V takovém případě doporučuji postupovat <strong>opatrně a individuálně</strong>:</p>

<ul style="margin-bottom: 1rem; padding-left: 1.2rem;">
<li>➡Okamžitě <strong>přestaňte používat produkty, které vám do teď nepomohly</strong></li>
  <li>➡ Nejlepší je <strong>objednat se</strong> na <a href="https://www.kailu.cz" target="_blank" style="color: #faa4a6; text-decoration: underline;">offline diagnostiku v Brně</a></li>
  <li>➡ Případně můžete <strong>poslat fotku</strong> na info@kailu.cz - zdarma vám poradíme o jaký typ dermatitidy se jedná a doporučíme péči na míru</li>
  <li>➡ Pokud jste již navštívil/a dermatologa a víte, zda se jedná o seboroickou nebo periorální dermatitidu, dejte nám vědět!</li>
</ul>

<p>Pokud si nakonec myslíte, že to nejspíš dermatitida nebude (nebo jste se překlikl/a), udělejte si kvíz znovu, či zvolte <a href="https://www.kailushop.cz/sada-pro-citlivou-plet/" target="_blank" style="color: #faa4a6; text-decoration: underline;">sadu pro citlivou pleť</a>.🌸</p>
`,
  
    'Problém: AKNÉ': (answers) => {
    // Kontrola typu pleti
    const skinType = evaluateSkinType(answers);
    
    // Pokud NENÍ mastná nebo smíšená pleť
    if (!['Mastná', 'Smíšená'].includes(skinType)) {
  return `<p>Z vašich odpovědí vyplývá, že vás trápí akné, ale zároveň máte citlivou nebo dehydratovanou pleť.</p>
          <p>Máte dvě možnosti:</p>
          <p><strong>1)</strong> Zkusit nejdřív jemnější <a href="https://www.kailushop.cz/sada-pro-citlivou-plet" target="_blank" style="color: #faa4a6; text-decoration: underline;">sadu pro citlivou pleť</a>, která se zaměří na opravu kožní bariéry, což by u vás mohlo "stačit" i na problémy s pupínky.</p>
          <p><strong>2)</strong> Použít <a href="https://www.kailushop.cz/sada-pro-problematickou-plet" target="_blank" style="color: #faa4a6; text-decoration: underline;">sadu na akné</a>, ale URČITĚ si dokoupit hydratační krém, jinak riskujete vysušení a podráždění.</p>
          <p>Volba je na vás, ale pokud byste potřeboval/a poradit, nebojte se nám napsat!😇</p>`;
}
    
    // Standardní odpověď pro mastnou/smíšenou pleť
    return `<p>Z vašich odpovědí vyplývá, že vás trápí akné.</p>
          <p style="margin-bottom: 1rem;">Naštěstí mám pro vás sadu, která řeší tento problém komplexně:</p>

<ul style="margin-bottom: 1rem; padding-left: 1.2rem;">
  <li>· Postupně zklidňuje a projasňuje pleť</li>
  <li>· Viditelně snižuje výskyt pupínků</li>
  <li>· Obsahuje i podrobný manuál, který vás provede péčí krok za krokem</li>
</ul>

<p style="margin-bottom: 1rem;">Tyto přípravky jsou velmi účinné a pomohly již několika našim klientkám. </p>

<p>Přesto vám musím připomenout, že každá pleť je jedinečná a univerzální řešení neexistuje. Dejte své pleti čas na adaptaci, pořádně se začtěte do pleťového manuálu, který je součástí sady a kdybyste potřeboval/a s čímkoli poradit, nebojte se na nás obrátit! Jsme v tom s vámi. 🙌</p>`;
  }
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
  if (problems.includes('Dermatitida = zarudlé skvrny, šupinky nebo malé pupínky v okolí úst nebo na čele, nose a obočí')) {
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
        hasBlackheads: problems.includes('Rozšířené póry nebo černé tečky') && 
          !['Mastná', 'Smíšená'].includes(basicSkinType),
        isPregnant
      }
    };
  }
  
  if (problems.includes('Trvale začervenalá pleť')) {
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
        hasBlackheads: problems.includes('Rozšířené póry nebo černé tečky') && 
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

  // NOVÁ LOGIKA PRO AKNÉ:
  const hasAcne = problems.includes('Akné (stabilně více než 5 pupínků🤫)');
  const wantsToRemoveAcne = answers['wish-fish']?.includes('Ať mi zmizí pupínky');

  // Logika podle typu pleti
  if (hasAcne) {
    if (['Mastná', 'Smíšená'].includes(skinType)) {
      // Pro mastnou/smíšenou stačí jen zaškrtnuté akné
      console.log('Mastná/smíšená pleť s akné - vracím sadu pro akné');
      return PRODUCT_SETS.PROBLEM_AKNE;
    } else {
      // Pro suchou/normální je potřeba i přání zbavit se pupínků
      if (wantsToRemoveAcne) {
        console.log('Suchá/normální pleť s akné + přání zbavit se pupínků - vracím sadu pro akné');
        return PRODUCT_SETS.PROBLEM_AKNE;
      } else {
        console.log('Suchá/normální pleť s akné, ale bez přání zbavit se pupínků - pokračuji standardní logikou');
      }
    }
  }
  
  // Odstraňte sadu pro akné z dostupných sad, pokud uživatel nemá akné
  if (affordableSets.includes(PRODUCT_SETS.PROBLEM_AKNE) && !hasAcne) {
    affordableSets = affordableSets.filter(set => set !== PRODUCT_SETS.PROBLEM_AKNE);
    console.log('Sada pro akné odstraněna z dostupných sad, protože uživatel nemá akné:', affordableSets);
  }

  // ANTI-AGE MÁ PRIORITU - přesunuto PŘED pupínky
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

  // PUPÍNKY AŽ PO ANTI-AGE
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