import '../styles.css';

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
    isUnder25?: boolean;
    is26to35?: boolean;
    is36to45?: boolean;
    is46to55?: boolean;
    isOver55?: boolean;
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
'Suchá základ': 'sada-pro-suchou-plet',
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
'Suchá základ': `
<div class="result-card-box">

  <p class="result-lead">
    Často pne, je citlivější a bez krému se necítí komfortně.
    Nestačí ji jen „něčím namazat“.
  </p>

  <p class="result-paragraph">
  Vaše pleť má obvykle nedostatek výživy i hydratace, proto je běžné, že se po nanesení krému chvíli cítíte lépe, ale <strong>během dne se pocit sucha vrátí</strong> a vy máte potřebu krém aplikovat znovu.
</p>

  <div class="result-highlight-box">
    Připravila jsem pro vás sadu 4 produktů, která je vhodná i pro začátečníky a zároveň dává smysl, pokud hledáte cenově i časově dostupnější variantu. 
  </div>


  <p class="result-paragraph">Přestože jde o základní péči, její účinnost vás příjemně překvapí!</p>


  <ul class="result-list">
    <li>Pleť nebude nepříjemně pnout</li>
    <li>Bude jemnější a příjemná na dotek</li>
    <li>Krém bude „fungovat“ po celý den, ne jen pár hodin</li>
  </ul>

</div>`
,
  
'Suchá základ + Sem tam pupínek': `<div class="result-card-box">

  <p style="font-size: 1.1rem; margin-bottom: 20px;">
    A občas se na ní objeví pupínek, který tam „vůbec nemá co dělat“.
  </p>

  <p style="margin-bottom: 20px;">
    Nejde o typickou problematickou pleť.
    Často je příčinou <strong style="color: #171717;">oslabená kožní bariéra</strong>,
    která hůř chrání pleť před vnějšími vlivy.
  </p>

  <p style="margin-bottom: 25px;">
    Vysušující produkty sice mohou pupínek krátkodobě stáhnout,
    ale zároveň pleť ještě více rozhodí a objeví se pnutí, citlivost
    nebo další reakce.
  </p>

  <div class="result-highlight-box">
    U suché pleti se sklonem k pupínkům je klíčové pleť
    <strong>zklidnit a posílit</strong> a důsledně se vyhýbat látkám, které by ji mohly oslabit.
  </div>

  <p style="margin-bottom: 5px;">
    Proto vám doporučuji sadu pro váš typ pleti doplnit <a href="https://www.kailushop.cz/sos-gel/" target="_blank" rel="noopener noreferrer" style="color: #faa4a6; text-decoration: underline;">SOS gelem</a> na pupínky.
  </p>

  <p style="margin-bottom: 0px;">
    Tato kombinace vám zajistí:
  </p>

  <ul class="result-list">
    <li>Úlevu od suchosti a nepříjemného pnutí</li>
    <li>Dostatečnou hydrataci bez zatížení</li>
    <li>Podporu ochranné bariéry pleti</li>
    <li>Rychlé zvládnutí pupínků bez podráždění</li>
  </ul>
</div>`,

'Suchá a normální Anti-age': (answers, result) => {
  return `<div class="result-card-box">
    
    <p class="result-lead">
      Skvělé je, že je hladká a má téměř neviditelné póry. Horší je, že brzy ztrácí svoji pružnost, je náchylná k tvorbě vrásek a bez správné péče působí unaveně.
    </p>

    <p class="result-paragraph">
      Většina krémů z drogerie jen promastí povrch, ale vy potřebujete víc. Potřebujete účinné látky v efektivní rutině.
    </p>

    <div class="result-highlight-box">
      Anti-age sada využívá unikátní technologii mikrojehliček.
      Díky nim se dostanou aktivní látky (peptidy) hlouběji pod povrch, kde pleť znovu "nastartují". Je to nejúčinnější neinvazivní alternativa k estetickým zákrokům.
    </div>

    <p class="result-transition-text">Co můžete očekávat?</p>

<ul class="result-list">
  <li><strong>Intenzivní zpevnění</strong> kontur obličeje</li>
  <li><strong>Vyplnění jemných linek</strong> a viditelné zjemnění hlubších vrásek</li>
  <li><strong>Okamžitou úlevu</strong> od pnutí a navrácení "šťavnatosti" pleti</li>
</ul>

    <div style="background: #f9f9f9; padding: 20px; margin-top: 30px; border-radius: 8px;">
      <div style="color: #f5c518;">⭐⭐⭐⭐⭐</div>
      <p style="font-style: italic; margin-top: 10px;">
        „Mám velmi suchou pleť a tohle je první péče, po které mě ráno pleť nepne.
        Je vyživená a vrásky na čele jsou viditelně jemnější."
      </p>
      <p style="font-size: 0.9rem; color: #666; margin-top: 5px;">– Hana</p>
    </div>
  </div>`;
},

  'Normální základ + Sem tam pupínek': (answers, result) => {
  const skinType = result.skinType.toLowerCase();
  return `<div class="result-card-box">
   
    
    <p class="result-lead">
      Máte pleť v rovnováze, což je skvělý dar. Ale ty nárazové pupínky, které se objeví 
      před menstruací nebo po stresovém týdnu, dokážou tu radost spolehlivě zkazit.
    </p>

    <p class="result-paragraph">
      Největší chybou by bylo začít teď pleť drasticky vysušovat přípravky na akné. 
      Tím byste si jen zadělala na vrásky a šupinky. Potřebujete stabilitu a rychlou "záchrannou brzdu".
    </p>

    <div class="result-highlight-box">
      Tato sada udržuje pleť v kondici a pro ty nečekané hosty doporučuji k ní 
      <strong>přidat náš SOS gel</strong>. Zlikviduje pupínek v zárodku, aniž by spálil kůži kolem.
    </div>

    <p class="result-transition-text">Benefity této kombinace:</p>

    <ul class="result-list">
      <li>Udržuje přirozenou bariéru a zdravý lesk pleti</li>
      <li>Zklidňuje lokální podráždění během pár hodin</li>
      <li>Zabraňuje vzniku tmavých skvrn (hyperpigmentace) po pupíncích</li>
      <li>Lehké textury, které pleť nezatíží a neucpávají póry</li>
    </ul>

    <p class="result-paragraph">
      Tuhle sadu (společně se SOS gelem v kabelce) doporučuji všem klientkám jako "povinnou výbavu". 🤫
    </p>

    <div style="background: #f9f9f9; padding: 20px; margin-top: 30px; border-radius: 8px;">
      <div style="color: #f5c518;">⭐⭐⭐⭐⭐</div>
      <p style="font-style: italic; margin-top: 10px;">
        „Mám pleť v pohodě, ale pupínky mě vždycky trápily. SOS gel je zázrak, 
        do rána je zánět pryč a zbytek pleti zůstává krásně hydratovaný."
      </p>
      <p style="font-size: 0.9rem; color: #666; margin-top: 5px;">– Michaela</p>
    </div>
  </div>`;
},
  
 'M+SM základ': (answers, result) => {
  const isOver45 = result?.specialRecommendations?.is46to55 || result?.specialRecommendations?.isOver55;
  const is36to45 = result?.specialRecommendations?.is36to45;

  // 46+ BEZ dehydratace
  if (isOver45 && 
      !answers['skin-description']?.includes('Je suchá') && 
      !answers['cosmetic-compatibility']?.includes('Občas mám pocit, že mi pleť spíše vysuší')) {
    return `<div class="result-card-box">
      
      <p style="font-size: 1.1rem; margin-bottom: 20px;">
Vaše pleť se už nemastí jako dřív.
  T-zóna je klidnější a póry méně viditelné.
  Ale vrásky a ztráta pružnosti jsou naopak čím dál výraznější.
      </p>

      <p style="margin-bottom: 20px;">
        S věkem se produkce mazu snižuje. To znamená méně lesku, ale také méně přirozené ochrany.
        Proto je teď správná péče důležitější než kdy dřív.
      </p>

      <div class="result-highlight-box">
        Tahle sada udržuje pleť v kondici bez zbytečného zatěžování.
        Péče s ní je velmi rychlá, levná a pokrývá všechny základní potřeby.
      </div>

      <p style="margin-top: 30px; font-weight: 500;">
        Co vám přinese:
      </p>

      <ul class="result-list">
        <li><span>Udržuje pleť čistou bez vysušování</span></li>
        <li><span>Podporuje přirozenou pružnost</span></li>
        <li><span>Chrání před vnějšími vlivy</span></li>
      </ul>
    </div>`;
  }

  // 36-45 BEZ dehydratace
  if (is36to45 && 
      !answers['skin-description']?.includes('Je suchá') && 
      !answers['cosmetic-compatibility']?.includes('Občas mám pocit, že mi pleť spíše vysuší')) {
    return `<div class="result-card-box">
      
      <p style="font-size: 1.1rem; margin-bottom: 20px;">
        Cítíte, že se vaše pleť v posledních letech mění? 
        Mastí se o něco méně, pupínky vás netrápí, ale pořád nezvládne jakýkoli hutný krém.
      </p>

      <p style="margin-bottom: 20px;">
        To je přesně ta chvíle, kdy správná péče rozhodne o tom, 
        jak bude vaše pleť vypadat za pět let.
        Smíšená pleť stárne pomaleji, ale jen když ji nepřestanete chránit.
      </p>

      <div class="result-highlight-box">
        Tato sada bere ohled na váš rozpočet a dodává pleti čištění, ochranu i hydrataci.
      </div>

      <p style="margin-top: 30px; font-weight: 500;">
        Co můžete očekávat:
      </p>

      <ul class="result-list">
        <li><span>Pleť zůstane matná, ale ne vysušená</span></li>
        <li><span>Hydratace a ochrana proti UV záření</span></li>
        <li><span>Póry zůstanou čisté</span></li>
        <li><span>Jednoduchá rutina, která zabere pár minut denně</span></li>
      </ul>
    </div>`;
  }

  // NOVÁ PODMÍNKA PRO 45+ S DEHYDRATACÍ
  if (isOver45 && (
    answers['skin-description']?.includes('Je suchá') || 
    answers['cosmetic-compatibility']?.includes('Občas mám pocit, že mi pleť spíše vysuší')
  )) {
    return `<div class="result-card-box">
      
      <p style="font-size: 1.1rem; margin-bottom: 20px;">
        S věkem se pleť přirozeně mění. Produkuje méně mazu a ztrácí hydrataci.
      </p>

      <p style="margin-bottom: 20px;">
        Typ vaší pleti vám zůstane na vždy, ale stav se změnil. 
        To není chyba, jen přirozená změna, kterou respektujeme správnou péčí.
      </p>

      <div class="result-highlight-box">
        Tato sada podporuje přirozenou hydrataci vaší pleti bez zbytečného zatížení.
      </div>

      <p style="margin-top: 30px; font-weight: 500;">
        V čem je ještě skvelá?
      </p>

      <ul class="result-list">
        <li><span>Je časově i finančně úsporná</span></li>
        <li><span>Pomůže vyrovnat pleť a vrátit jí komfort</span></li>
        <li><span>Neucpává póry a respektuje přirozenou rovnováhu pleti</span></li>
      </ul>
    </div>`;
  }
  if (
    answers['skin-description']?.includes('Je suchá') || 
    answers['cosmetic-compatibility']?.includes('Občas mám pocit, že mi pleť spíše vysuší')
  ) {
    return `<div class="result-card-box">
      
      <p style="font-size: 1.1rem; margin-bottom: 20px;">
        Možná si říkáte, že máte pleť suchou, ale typ a stav není to stejné.
      </p>

      <p style="margin-bottom: 20px;">
        Vaše pleť se může lesknout v T-zóně, a přitom pnout nebo reagovat citlivě.
        To není rozpor, ale typický projev <strong style="color: #171717;">dehydratované smíšené pleti</strong>.
      </p>

      <div class="result-highlight-box">
        Jakmile pleti dodáte hydrataci a zpevníte kožní bariéru,
        začne se chovat klidněji a nepříjemné pocity zmizí.
      </div>

      <p style="margin-top: 30px; font-weight: 500;">
        Tato základní sada:
      </p>

      <ul class="result-list">
  <li><span>Dodá pleti potřebnou hydrataci bez zatížení</span></li>
  <li><span>Pomůže vyrovnat mastnější a sušší partie</span></li>
  <li><span>Neucpává póry a respektuje přirozenou rovnováhu pleti</span></li>
</ul>

      <p style="margin-top: 20px;">
        Výsledky viditelně urychlí, když před krémy ve vaší sadě přidáte ještě
        <a href="https://www.kailushop.cz/hydratacni-serum/" target="_blank" rel="noopener noreferrer" class="underline">
          hydratační sérum
        </a>.
      </p>
    </div>`;
  }

  return `<div class="result-card-box">
  
<p class="result-lead">
    Mastí se v T-zóně, ale zároveň volá po rovnováze, aby se zbytečně nepřesušovala.
</p>

<div class="result-highlight-box">
  Proto jsem sestavila péči, která ji nenutí vybírat mezi "matnou" nebo "mastnou".
</div>

  <p class="result-paragraph">
    Tato 4kroková rutina respektuje váš rozpočet i potřeby smíšené pleti. 
  </p>

  <p class="result-transition-text">Co můžete očekávat?</p>

  <ul class="result-list">
    <li><span><strong>Regulace lesku:</strong> Vaše T-zóna zůstane matná a svěží po celý den.</span></li>
    <li><span><strong>Čisté póry:</strong> Hloubkové čištění bez pocitu nepříjemného pnutí.</span></li>
    <li><span><strong>Lehká hydratace:</strong> Hydrataci bez ucpávání pórů a pocitu mastnoty.</span></li>
    <li><span><strong>Rychlá rutina:</strong> Funkční péči, která vám zabere jen pár minut ráno a večer.</span></li>
  </ul>

  <p class="result-paragraph" style="margin-top: 25px;">
    Pokud s cílenou péčí o pleť teprve začínáte, tato sada je pro vás perfektním odrazovým můstkem k čisté a klidné pleti. ✨
  </p>
</div>`;
},

  
'M+SM komplet': (answers, result) => {
  // Definice věku a stavu pleti
  const age = answers['age'] || '';
  const isOver45 = age === '46-55 let' || age === '56+ let';
  const isOver26 = age !== 'Do 25 let' && age !== '';
  
  const hasDehydration = answers['skin-description']?.includes('Je suchá') || 
                         answers['cosmetic-compatibility']?.includes('Občas mám pocit, že mi pleť spíše vysuší');

  // 1. VAŠE PŮVODNÍ PODMÍNKA PRO 45+ S DEHYDRATACÍ
  if (isOver45 && hasDehydration) {
    return `<div class="result-card-box">
      <p style="font-size: 1.1rem; margin-bottom: 20px;">
        S věkem se vaše pleť přirozeně změnila. Produkuje méně mazu a ztrácí hydrataci.
      </p>
      <p style="margin-bottom: 20px;">
        Typ vaší pleti vám zůstane na vždy, ale stav se změnil. 
        To není chyba, jen běžná změna, kterou respektujeme správnou péčí.
      </p>
      <div class="result-highlight-box">
        Vaše pleť si zaslouží <strong>systematickou hydrataci, ochranu a posílení kožní bariéry</strong>.
      </div>
      <p style="margin-top: 30px; font-weight: 500;">
        <strong>${DISPLAY_NAMES[result.recommendedSet]}</strong>:
      </p>
      <ul class="result-list">
        <li><span>Dodá pleti hydrataci bez ucpávání pórů</span></li>
        <li><span>Pomůže obnovit přirozenou rovnováhu</span></li>
        <li><span>Uleví od pocitu nepohodlí a sucha</span></li>
      </ul>
    </div>`;
  }

  // 2. VAŠE PŮVODNÍ PODMÍNKA PRO OSTATNÍ S DEHYDRATACÍ
  if (hasDehydration) {
    return `<div class="result-card-box">
      <p style="font-size: 1.1rem; margin-bottom: 20px;">
        Není typově suchá, ale chybí jí hydratace.
        Proto může působit rozhozeně – někde se leskne, jinde pne.
      </p>
      <p style="margin-bottom: 20px;">
        Když hydratace chybí dlouhodobě, pleť se začne „bránit“:
        produkuje víc mazu, je citlivější a hůř reaguje na běžnou kosmetiku.
      </p>
      <div class="result-highlight-box">
        Kompletní péče je v tomto případě klíčová.
        Nestačí jen krém, pleť potřebuje
        <strong>systematickou hydrataci a posílení kožní bariéry</strong>.
      </div>
      <p style="margin-top: 30px; font-weight: 500;">
        <strong>${DISPLAY_NAMES[result.recommendedSet]}</strong>:
      </p>
      <ul class="result-list">
        <li><span>Dodá pleti hydrataci bez ucpávání pórů</span></li>
        <li><span>Pomůže obnovit přirozenou rovnováhu pleti</span></li>
        <li><span>Uleví od lesku i nepříjemného pnutí</span></li>
      </ul>
      <p style="margin-top: 20px;">
        Výsledkem je klidnější, vyváženější pleť,
        která se během dne nechová extrémně.
      </p>
    </div>`;
  }

  // 3. NOVÁ PODMÍNKA: NAD 26 LET BEZ DEHYDRATACE
  if (isOver26) {
    return `<div class="result-card-box">
      <p style="font-size: 1.1rem; margin-bottom: 20px;">
        Občas bývá náročná hlavně proto,
      že špatně snáší extrémy - jak přesušení, tak přetížení. A s věkem se její schopnost regenerace se postupně zpomaluje.
      </p>
      <p style="margin-bottom: 20px;">
        Nyní je klíčová preventivní a udržovací péče, která respektuje její potřeby. Tedy hydratovat bez zatížení a chránit před vnějšími vlivy.
      </p>
      <div class="result-highlight-box">
        <strong>${DISPLAY_NAMES[result.recommendedSet]}</strong> nabízí perfektní balanc.
      </div>
      <ul class="result-list">
        <li><span>Podporuje přirozenou regeneraci pleti</span></li>
        <li><span>Perfektně čistí a neucpává póry</span></li>
        <li><span>Udržuje kožní bariéru silnou a odolnou</span></li>
        <li><span>Zpomaluje projevy stárnutí</span></li>
      </ul>
    </div>`;
  }

  // 4. VAŠE PŮVODNÍ "KLASICKÁ SMÍŠENÁ" (PRO MLADÉ DO 25)
  return `<div class="result-card-box">
    <p style="font-size: 1.05rem; margin-bottom: 18px;">
      Občas bývá náročná hlavně proto,
      že špatně snáší extrémy - jak přesušení, tak přetížení.
    </p>
    <p style="margin-bottom: 18px;">
      <strong>${DISPLAY_NAMES[result.recommendedSet]}</strong> nabídne pleti perfektní balanc bez kompromisů.
    </p>
    <div class="result-highlight-box">
      Nejde o rychlé „zmatnění“, ale o dlouhodobou rovnováhu.
    </div>
    <ul class="result-list">
      <li>Pomáhá regulovat mastnotu bez vysušení</li>
      <li>Perfektně čistí</li>
      <li>Neucpává póry</li>
      <li>Skvělý poměr cena:výkon</li>
    </ul>
  </div>`;
},
  
'M+SM komplet + Sem tam pupínek': (answers, result) => {
  const skinType = result.skinType.toLowerCase();
  const isOver45 = result?.specialRecommendations?.is46to55 || result?.specialRecommendations?.isOver55;
  
  // VARIANTA PRO 36+
  if (isOver45 || result?.specialRecommendations?.is36to45) {
    return `<div class="result-card-box">
     
      <p class="result-lead">
        Pupínky ve vašem věku většinou nesouvisí s nadměrným mazem, ale s hormonálními změnami.
      </p>

      <p class="result-paragraph">
        Těhotenství i menopauza mohou vyvolat lokální záněty podobné akné.
        Pleť zároveň potřebuje více hydratace a jemné zacházení, protože už není tak pevná jako dřív.
      </p>

      <div class="result-highlight-box">
        Kombinace SOS gel + kompletní sada respektuje citlivost vaší pleti a zároveň se postará o pupínky.
      </div>

      <p class="result-transition-text">
        <a href="https://www.kailushop.cz/sos-gel/" target="_blank" rel="noopener noreferrer" style="color: #faa4a6; text-decoration: underline;">SOS gel</a>
      </p>
      
      <ul class="result-list">
        <li>Výrazně brání rozvoji pupínků</li>
        <li>Působí proti vzniku skvrnek po akné</li>
      </ul>

      <p class="result-transition-text">Kompletní sada pro smíšenou pleť:</p>

      <ul class="result-list">
        <li>Hydratuje bez zatížení</li>
        <li>Zklidňuje záněty a podporuje hojení</li>
        <li>Neucpává póry</li>
        <li>Jemně reguluje bez vysoušení</li>
      </ul>

    </div>`;
  }
  // A POTOM POKRAČUJE PŮVODNÍ KÓD
  return `<div class="result-card-box">
   
    
    <p class="result-lead">
      Přirozeně produkuje více mazu a občas se objeví i pupínek. 
      To není chyba, jen signál, že pleť potřebuje správnou péči.
    </p>

 <p class="result-paragraph">
  Většina produktů na mastnou pleť ji buď vysušuje, nebo naopak ucpává póry.
  Výsledkem jsou další nedokonalosti místo zlepšení.
</p>

    <div class="result-highlight-box">
      Tahle kompletní sada je jiná – <strong>reguluje maz, ale nevysušuje</strong>. 
      A když se občas pupínek přece objeví, doporučuji přikoupit
      <a href="https://www.kailushop.cz/sos-gel/" target="_blank" rel="noopener noreferrer" style="color: #faa4a6; text-decoration: underline;">SOS gel</a> 
      pro rychlé řešení.
    </div>

    <p class="result-transition-text">Kompletní sada pro mastnou a smíšenou pleť:</p>

    <ul class="result-list">
      <li>Čistí bez vysušení a podráždění</li>
      <li>Reguluje tvorbu mazu</li>
      <li>Hydratuje bez zatížení a ucpávání pórů</li>
      <li>Předchází vzniku nových nedokonalostí</li>
      <li>Působí jako prevenci proti vráskám</li>
    </ul>

  
  </div>`;
},
  
  'M+SM Anti-age': (answers, result) => {
  const skinType = result.skinType.toLowerCase();
  const isOver35 = result?.specialRecommendations?.is36to45 || result?.specialRecommendations?.is46to55 || result?.specialRecommendations?.isOver55;
  
  // Dehydratovaná varianta
  if (answers['skin-description']?.includes('Je suchá') || 
      answers['cosmetic-compatibility']?.includes('Občas mám pocit, že mi pleť spíše vysuší')) {
    
    // Varianta pro 36+
    if (isOver35) {
      return `<div class="result-card-box">
        
        <p class="result-lead">
  Vaše pleť prochází přirozenými změnami. Začíná se méně mastit, ztrácí hydrataci a pevnost a vrásky se začínají prohlubovat.
</p>

<p class="result-paragraph">
  Hormonální změny ovlivňují kvalitu vaší pleti víc, než si možná myslíte. Proto potřebujete péči, která dělá více věcí najednou - hydratuje, zpevňuje a zpomaluje viditelné stárnutí.
</p>

        <div class="result-highlight-box">
          Využijeme toho, že váš typ pleti dobře snáší silné aktivní látky a zvolíme sadu s retinalem pro maximální a rychlý účinek.
        </div>

        <p class="result-transition-text">Anti-age sada pro mastnou a smíšenou pleť:</p>

        <ul class="result-list">
          <li>Zpevňuje a projasňuje pleť</li>
          <li>Hydratuje bez ucpávání pórů</li>
          <li>Redukuje vrásky a zpomaluje jejich tvorbu</li>
          <li>Obsahuje retinol a retinal – látky s klinicky ověřenou účinností</li>
        </ul>

        <p class="result-paragraph">
          Sama tuto sadu používám a (nejen jako milovnice retinolu) jsem nadšená! 🤫
        </p>

        <div style="background: #f9f9f9; padding: 20px; margin-top: 30px; border-radius: 8px;">
          <div style="color: #f5c518;">⭐⭐⭐⭐⭐</div>
          <p style="font-style: italic; margin-top: 10px;">
            „Sadu mi doporučila moje kosmetička a trefila do černého. 
            Po měsíci používání mám pocit, že hlubší vrásky se zjemnily 
            a ty drobné skoro zmizely."
          </p>
          <p style="font-size: 0.9rem; color: #666; margin-top: 5px;">– Jitka</p>
        </div>
      </div>`;
    }
    
    // Původní text pro mladší s dehydratací
    return `<div class="result-card-box">
      
      <p class="result-lead">
        Má viditelné póry, je dehydratovaná a k tomu se začínají objevovat první vrásky.
        Hodně výzev najednou, ale řešitelných.
      </p>

      <p class="result-paragraph">
        Dehydratovaná pleť stárne rychleji, protože jí chybí přirozená ochrana.
        A běžné anti-age krémy bývají příliš hutné, ucpou póry a způsobí další problémy.
      </p>

      <div class="result-highlight-box">
        Tato sada je sestavená přesně pro vaše potřeby -
        <strong>hydratuje, reguluje maz a zpomaluje první projevy stárnutí</strong> najednou.
        Bez kompromisů.
      </div>

      <p class="result-transition-text">Anti-age sada pro mastnou a smíšenou pleť:</p>

      <ul class="result-list">
        <li>Zpevňuje a projasňuje pleť</li>
        <li>Hydratuje bez ucpávání pórů</li>
        <li>Redukuje vrásky a zpomaluje jejich tvorbu</li>
        <li>Obsahuje retinol a retinal - látky s klinicky ověřenou účinností</li>
      </ul>

      <p class="result-paragraph">
        Sama tuto sadu používám a (nejen jako milovnice retinolu) jsem nadšená! 🤫
      </p>

      <div style="background: #f9f9f9; padding: 20px; margin-top: 30px; border-radius: 8px;">
        <div style="color: #f5c518;">⭐⭐⭐⭐⭐</div>
        <p style="font-style: italic; margin-top: 10px;">
          „Sadu mi doporučila moje kosmetička a trefila do černého. 
          Po měsíci používání mám pocit, že hlubší vrásky se zjemnily 
          a ty drobné skoro zmizely."
        </p>
        <p style="font-size: 0.9rem; color: #666; margin-top: 5px;">– Jitka</p>
      </div>
    </div>`;
  }
  
 // Klasická varianta (bez dehydratace)
const isOver45 = result?.specialRecommendations?.is46to55 || result?.specialRecommendations?.isOver55;

// Pro 45+ jiný úvod
if (isOver45) {
  return `<div class="result-card-box">
    
    <p class="result-lead">
      Vrásky jsou viditelné, ale tvorba mazu už je výrazně nižší.
    </p>

    <p class="result-paragraph">
      Zkoušela jste anti-age krémy, ale cítila jste, že jsou na vás moc těžké? 
      To je častý problém, protože většina z nich může být na váš typ pleti příliš hutná.
    </p>

    <div class="result-highlight-box">
      Využijeme toho, že <strong>váš typ pleti dobře snáší silné aktivní látky</strong> a zvolíme sadu s retinalem.
      Jeho účinky jsou klinicky ověřené a velmi rychle viditelné.
    </div>

    <p class="result-transition-text">Anti-age sada pro mastnou a smíšenou pleť:</p>

   <ul class="result-list">
  <li><strong>Zpevňuje a projasňuje</strong> pleť</li>
  <li><strong>Hydratuje</strong> bez mastného filmu</li>
  <li><strong>Redukuje vrásky</strong> a zpomaluje jejich tvorbu</li>
  <li>Obsahuje <strong>retinol a retinal</strong> - látky s klinicky ověřenou účinností</li>
</ul>

    <p class="result-paragraph">
      Sama tuto sadu používám a nemůžu si ji vynachválit. Stejně jako moje klientky.
    </p>

    <div style="background: #f9f9f9; padding: 20px; margin-top: 30px; border-radius: 8px;">
      <div style="color: #f5c518;">⭐⭐⭐⭐⭐</div>
      <p style="font-style: italic; margin-top: 10px;">
        „Sadu mi doporučila moje kosmetička a trefila do černého. 
        Po měsíci používání mám pocit, že hlubší vrásky se zjemnily 
        a ty drobné skoro zmizely."
      </p>
      <p style="font-size: 0.9rem; color: #666; margin-top: 5px;">– Jitka</p>
    </div>
  </div>`;
}

// Pro mladší - původní text s "prvními známkami"
return `<div class="result-card-box">
    
    <p class="result-lead">
      Nemá problém se suchostí, ale už se na ní začínají objevovat první známky stárnutí.
    </p>

    <p class="result-paragraph">
Zkoušela jste anti-age krémy, ale pleť se začala více lesknout nebo ucpávat? 
To je častý problém, protože většina z nich může být na váš typ pleti příliš hutná.
    </p>

    <div class="result-highlight-box">
      Využijeme toho, že <strong>váš typ pleti dobře snáší silné aktivní látky</strong> a zvolíme sadu s retinalem.
      Jeho účinky jsou klinicky ověřené a velmi rychle viditelné.
    </div>

    <p class="result-transition-text">Anti-age sada pro mastnou a smíšenou pleť:</p>

    <ul class="result-list">
      <li>Zpevňuje a projasňuje pleť</li>
      <li>Hydratuje bez ucpávání pórů</li>
      <li>Redukuje vrásky a zpomaluje jejich tvorbu</li>
      <li>Obsahuje retinol a retinal - látky s klinicky ověřenou účinností</li>
    </ul>

    <p class="result-paragraph">
      Sama tuto sadu používám a nemůžu si ji vynachválit. Stejně jako moje klientky.
    </p>

    <div style="background: #f9f9f9; padding: 20px; margin-top: 30px; border-radius: 8px;">
      <div style="color: #f5c518;">⭐⭐⭐⭐⭐</div>
      <p style="font-style: italic; margin-top: 10px;">
        „Sadu mi doporučila moje kosmetička a trefila do černého. 
        Po měsíci používání mám pocit, že hlubší vrásky se zjemnily 
        a ty drobné skoro zmizely."
      </p>
      <p style="font-size: 0.9rem; color: #666; margin-top: 5px;">– Jitka</p>
    </div>
  </div>`;
},

'Normální základ': (answers) => {
  // Těhotenství/kojení
  if (answers['wish-fish']?.includes('Zrovna jsem těhotná')) {
    return `<div class="result-card-box">
    
      
      <p class="result-lead">
        V období těhotenství a kojení se k vaší pleti chceme chovat s maximálním respektem. 
        Hormony totiž mění její reakce a to, co vám dříve vyhovovalo, může být najednou příliš silné.
      </p>

      <p class="result-paragraph">
        Některé účinné látky nejsou v tomto období vhodné.
        Proto jsem pro vás vybrala sadu, která je bezpečná a zároveň účinná.
      </p>

      <div class="result-highlight-box">
        <strong>Důležité:</strong> V těhotenství je až dvojnásobné riziko vzniku pigmentových skvrn.
        Denní krém s SPF nanášejte důsledně a během dne ho při pobytu na slunci obnovujte.
      </div>

      <p class="result-transition-text">Sada pro normální pleť:</p>

      <ul class="result-list">
        <li>Je bezpečná v těhotenství i při kojení</li>
        <li>Hydratuje bez ucpávání pórů</li>
        <li>Chrání před pigmentací díky SPF</li>
        <li>Je časově i finančně nenáročná</li>
      </ul>
    </div>`;
  }

  // Klasická normální pleť
  return `<div class="result-card-box">
    
    
    <p class="result-lead">
      Gratuluji, normální pleť je vzácnost! 🙌 Není suchá, nemastí se, 
      nereaguje přehnaně na kosmetiku. Prostě funguje.
    </p>

    <p class="result-paragraph">
      Teď jde o to tento stav udržet nebo ještě trochu vylepšit. 😉
    </p>

    <div class="result-highlight-box">
      Sada, kterou vám doporučuji, <strong>udržuje pleť v kondici
      a chrání ji před předčasným stárnutím</strong>.
    </div>

    <p class="result-transition-text">Co můžete očekávat?</p>

   <ul class="result-list">
  <li><span><strong>Dokonalou rovnováhu:</strong> Pleť bude svěží, sjednocená a bez nadbytečného lesku v T-zóně.</span></li>
  <li><span><strong>Aktivní ochranu:</strong> Účinnou prevenci proti předčasnému stárnutí a prvním vráskám.</span></li>
  <li><span><strong>Rychlé výsledky:</strong> Efektivní rutinu, která pleti dodá vše potřebné během pár minut.</span></li>
  <li><span><span><strong>Dostupnou kvalitu:</strong> Profesionální péči navrženou tak, aby šetřila vaši pleť i rozpočet.</span></li>
</ul>

  
  </div>`;
},
  
  'Normální základ + Sem tam pupínek': `<div class="result-card-box">
  
  
  <p class="result-lead">
    Nemastí se, nevysychá, většinou spolupracuje.
    Jen občas vyskočí pupínek a to dokáže pořádně potrápit.
  </p>

  <p class="result-paragraph">
    U normální pleti pupínky většinou nesouvisí s nadměrnou mastnotou.
    Spíš jde o hormonální výkyvy nebo reakci na konkrétní produkt.
    Proto nepotřebujete agresivní péči na akné – stačí cílené řešení.
  </p>

  <div class="result-highlight-box">
    Každodenní péče, kterou vám doporučuji, udrží pleť hydratovanou a chráněnou.
    A pro případ, že se objeví pupínek, doporučuji přikoupit <a href="https://www.kailushop.cz/sos-gel/" target="_blank" rel="noopener noreferrer" style="color: #faa4a6; text-decoration: underline;">SOS gel</a>.
  </div>

  <p class="result-transition-text">Sada pro normální pleť:</p>

  <ul class="result-list">
    <li>Čistí a chrání bez zbytečné zátěže</li>
    <li>Nezanáší póry (kterých stejně moc nemáte 😉)</li>
    <li>Chrání pleť a podporuje kožní bariéru</li>
  </ul>

  <p class="result-transition-text">SOS gel na pupínky:</p>

  <ul class="result-list">
    <li>Zklidní pupínek během 1–2 dnů</li>
    <li>Zabrání rozšíření a vzniku jizev</li>
    <li>Stačí nanést lokálně večer</li>
  </ul>

</div>`,
  
  'Citlivá': (answers, result) => {
  const skinType = result.skinType.toLowerCase(); // Získáme typ (např. "suchá", "smíšená")
  const isPregnant = answers['current-status']?.includes('Jsem těhotná') || answers['current-status']?.includes('Kojím');

  if (isPregnant) {
    return `<div class="result-card-box">
      
      
      <p class="result-lead">
        I když je vaše pleť přirozeně ${skinType}, v období těhotenství a kojení se k ní musíme chovat s maximálním respektem. 
        Hormony totiž mění její reakce a to, co vám dříve vyhovovalo, může být najednou příliš silné.
      </p>

      <p class="result-paragraph">
        Ať už teď vaše pleť díky hormonům září, nebo vás naopak trochu trápí, nejdůležitější je pro nás bezpečnost a stabilita. Vybrala jsem pro vás péči, která respektuje váš typ pleti, je účinná a zároveň bezpečná.
      </p>

      <div class="result-highlight-box">
        <strong>Jistota v období mateřství:</strong> Tato sada neobsahuje retinoidy ani kyseliny. Sází na zklidňující sílu centelly a probiotik, které jsou v tomto období zlatým standardem.
      </div>

      <ul class="result-list">
        <li>100% bezpečné složení během těhotenství i kojení.</li>
        <li>Posílení bariéry, aby vaše pleť zůstala klidná i při hormonálních bouřích.</li>
        <li>Intenzivní hydratace přizpůsobená potřebám vaší pleti.</li>
        <li>Bez parfemace</li>
      </ul>

      <p class="result-paragraph" style="font-weight: 500; border-top: 1px solid #eee; padding-top: 15px;">
        ✨ Dopřejte si péči, se kterou můžete být v klidu vy i vaše miminko.
      </p>
    </div>`;
  }
  // Citlivá + suchá
  if (answers['wish-fish']?.includes('Ať už není moje pleť tak vysušená')) {
    return `<div class="result-card-box">
      
      
      <p class="result-lead">
        Reaguje na kosmetiku, často pne nebo pálí. A k tomu jí chybí hydratace.
        Najít produkty, které ji nebudou dráždit a zároveň dostatečně vyživí, bývá oříšek.
      </p>

      <p class="result-paragraph">
        Citlivá pleť má oslabenou ochrannou bariéru. Když ji posílíte,
        pleť se přestane bránit a začne lépe přijímat péči.
      </p>

      <div class="result-highlight-box">
        Tato sada dělá přesně to: <strong>zklidňuje, hydratuje a posiluje kožní bariéru</strong>.
        Navíc podporuje zdravý mikrobiom, který je pro citlivou pleť klíčový.
      </div>

      <p class="result-transition-text">Co můžete od sady očekávat:</p>

      <ul class="result-list">
        <li><strong>Konec pnutí:</strong> Hloubková hydratace, kterou vaše pleť konečně udrží.</li>
        <li><strong>Viditelné zklidnění:</strong> Redukce zarudnutí, abyste se cítila skvěle i bez make-upu.</li>
        <li><strong>Silnější ochrana:</strong> Odolnější pleť, která přestane přehnaně reagovat na okolí.</li>
        <li><strong>Bezpečný anti-age:</strong> Vyhlazení vrásek bez rizika podráždění.</li>
      </ul>

      <p class="result-paragraph" style="font-style: italic; color: #666;">
        Tuto sadu jsem se snažila vyladit tak, aby byla pro citlivou pleť sázkou na jistotu. Pokud by vám přesto cokoli nesedělo, osobně vám pomohu rutinu upravit.
      </p>
    </div>`;
  }

  // Klasická citlivá pleť
  return `<div class="result-card-box">
    
    
<p class="result-lead">
      Reaguje i na produkty, které ostatním vyhovují. Zčervená, pálí nebo pne. 
    </p>

    <p class="result-paragraph">
         Vím, že každá změna kosmetiky je pro vás risk a proto jsem pro vás vybrala péči, která se mým klientkám vždy vyplatila.
      </p>

    <div class="result-highlight-box">
      <strong>Proč tato sada:</strong> Tato sada funguje jako „posilovna“ pro vaši bariéru. Nejdříve pleť zklidníme a pak ji naučíme, aby se už nenechala ničím rozhodit.
    </div>

    <p class="result-transition-text">Co se po zavedení nové rutiny změní?</p>

    <ul class="result-list">
      <li><strong>Konec nepříjemným pocitům:</strong> Účinné látky okamžitě zklidní vaši pleť.</li>
      <li><strong>Odolnější štít:</strong> Vaše bariéra se zacelí a přestane propouštět dráždivé látky.</li>
      <li><strong>Dlouhodobá úleva:</strong> Už nebudete muset každé ráno řešit, jak zakrýt červené skvrny.</li>
      <li><strong>Jemný anti-age:</strong> Omlazení pleti bez obav z podráždění.</li>
    </ul>

    <p class="result-paragraph" style="border-top: 1px solid #eee; padding-top: 1rem; font-weight: 500;">
      ✨ Tato sada je nejkratší cestou k pleti, která vás nebude trápit.
    </p>
  </div>`;
},

'Citlivá + Sem tam pupínek': `<div class="result-card-box">
 
  
  <p class="result-lead">
    Máte pocit, že si musíte vybrat? Buď řešit pupínky agresivní kosmetikou, nebo nechat pleť v klidu, ale s nedokonalostmi? 🤔
    Pomohu vám z tohoto začarovaného kruhu konečně vystoupit.
  </p>

  <p class="result-paragraph">
    Vaše pleť je citlivá, což znamená, že na každý silný zásah reaguje podrážděním. Potřebujeme si ji „udobřit“, posílit její přirozenou obranu a zároveň se šetrně a účinně zbavit existujících pupínků.
  </p>

  <div class="result-highlight-box">
    <strong>Dvojitý efekt:</strong> Sada se stará o celkové zklidnění, zatímco <a href="https://www.kailushop.cz/sos-gel/" target="_blank" rel="noopener noreferrer" style="color: #faa4a6; text-decoration: underline; font-weight: bold;">SOS gel</a> funguje jako šetrný „hasič“ tam, kde se zrovna objeví problém.
  </div>

  <p class="result-transition-text">Vaše nová rutina zajistí:</p>

  <ul class="result-list">
    <li><strong>Konec neustálého podráždění:</strong> Zmírnění zarudnutí, které pupínky často doprovází.</li>
    <li><strong>Čisté póry bez pnutí:</strong> Hydratace, která pleť „nedusí“ a nespouští tak další záněty.</li>
    <li><strong>Zdravý mikrobiom:</strong> Silná pleť, která se s bakteriemi akné dokáže mnohem lépe vypořádat sama.</li>
  </ul>

  <p class="result-transition-text">SOS gel na pupínky (doporučuji přikoupit):</p>

  <ul class="result-list">
    <li><strong>Cílený zásah:</strong> Zklidní pupínek, ale okolní citlivou kůži neporuší ani nevysuší.</li>
    <li><strong>Rychlejší hojení:</strong> Pomáhá předcházet tomu, aby po každém pupínku zůstal červený flíček.</li>
  </ul>

</div>`,
  
  'Kuperóza': `<div class="result-card-box">
  
  
  <p class="result-lead">
    Vybrala jste možnost, že vás trápí pleť se sklonem k začervenání.
    A asi už tušíte, že žádný zázračný krém neexistuje.
  </p>

  <p class="result-paragraph">
Budu k vám upřímná: Správná pleťová péče dokáže začervenání zmírnit, posílit stěny cév a zastavit zhoršování. Neumí již vzniklé "popraskané žilky" odstranit.
  </p>

  <div class="result-highlight-box">
    Tuto sadu jsem sestavila dle výsledků mých salonních klientek.
  </div>

  <p class="result-transition-text">Tato sada:</p>

  <ul class="result-list">
    <li>Zklidňuje zarudnutí a podráždění</li>
    <li>Posiluje pevnost a pružnost cév</li>
    <li>Předchází zhoršování stavu a zmírňuje projevy</li>
    <li>Hydratuje a chrání pleť</li>
    <li>Obsahuje manuál, který důkladně řeší i nekosmetickou část péče</li>
  </ul>

  <p class="result-paragraph">
    Pokud by ve vašem případě šlo spíš o občasné zarudnutí než o trvalý problém,
    může vám vyhovovat i <a href="https://www.kailushop.cz/sada-pro-citlivou-plet/" target="_blank" style="color: #faa4a6; text-decoration: underline;">sada pro citlivou pleť</a>.
  </p>

  <div style="background: #f9f9f9; padding: 20px; margin-top: 30px; border-radius: 8px;">
    <div style="color: #f5c518;">⭐⭐⭐⭐⭐</div>
    <p style="font-style: italic; margin-top: 10px;">
      „Celou řadu používám už půl roku. Moje pleť nebyla nikdy spokojenější!
      Přijít z chladného počasí domů a nezměnit se v rudou Sonju je příjemná změna."
    </p>
    <p style="font-size: 0.9rem; color: #666; margin-top: 5px;">– Martina</p>
  </div>
</div>`,

  'Dermatitida': `<div class="result-card-box">
  
  
  <p class="result-lead">
    Ale v kvízu jste označila, že vás trápí <strong>dermatitida</strong>. Při ní může nesprávná péče napáchat velké škody a můj systém vám teď raději žádou sadu nedoporučí.
  </p>

  <p class="result-paragraph">
    Dermatitida není jen podrážděná pleť. Nejčastěji se setkáváme se dvěma typy, které mají <strong>úplně jiné příčiny i řešení:</strong>
  </p>

  <ul class="result-list" style="margin-bottom: 1.5rem;">
    <li><strong>Periorální (kolem úst):</strong> Často vzniká "přepečováním" pleti, citlivou reakcí (např. na pastu s fluorem) nebo hormonálními změnami. Potřebuje absolutní klid a minimum látek.</li>
    <li><strong>Seboroická (šupinky):</strong> Souvisí s aktivitou kvasinek v mastnějších oblastech obličeje. Potřebuje složky, které kvasinky nebudou "krmit".</li>
  </ul>

  <div style="margin: 1.5rem 0; border-radius: 8px; overflow: hidden; border: 1px solid #eee; background: #fff;">
    <img src="https://www.kailushop.cz/user/documents/upload/ostatní_ulozene/dermatitidy.jpg" alt="Ukázky periorální a seboroické dermatitidy" style="width: 100%; height: auto; display: block;" />
    <p style="font-size: 0.85rem; padding: 0.6rem; background: #f9f9f9; color: #666; margin: 0; text-align: center; line-height: 1.4;">
      <em>Ilustrační foto: Vlevo periorální dermatitida, vpravo seboroická. Poznáváte se?</em>
    </p>
  </div>

  <div class="result-highlight-box" style="background-color: #fff5f5; border: 1px dashed #e53e3e; color: #c53030;">
    Co funguje na seboreu, může periorální dermatitidu drasticky zhoršit (a naopak). Proto nemá smysl "něco zkusit".
  </div>

  <p class="result-transition-text">Co teď musíme udělat?</p>

  <ul class="result-list">
    <li><strong>Zhodnotit stav:</strong> Nejlepší je to naživo, u kosmetičky nebo dermatologa. Ale pokud nemáte možnost, vyfoťte postižená místa na denním světle a pošlete na <a href="mailto:info@kailu.cz" style="color: #faa4a6; font-weight: bold;">info@kailu.cz</a>. Podívám se na ně a <strong>odpovím vám co nejdříve</strong> (obvykle do 24h), co (ne)dělat.</li>
    <li><strong>Nulová terapie:</strong> Přestaňte používat produkty, co máte. Když vám nepomohly do teď, nepomůžou ani dnes nebo zítra a zbytečně bysme mohli oddálit účinek správně zvolené péče.</li>
    <li><strong>Byl to jen překlik?</strong> Pokud dermatitidu nemáte a hledáte jen péči o citlivou pleť, vraťte se zpět nebo zvolte <a href="https://www.kailushop.cz/sada-pro-citlivou-plet/" target="_blank" style="color: #faa4a6; text-decoration: underline;">sadu pro citlivou pleť</a>.</li>
  </ul>

  <p class="result-paragraph">
    Těším se na to, že společně najdeme bezpečnou a účinnou cestu. 🙏
  </p>
</div>`,
  
'Problém: AKNÉ': (answers, result) => {
    const skinType = evaluateSkinType(answers);
    const isOver45 = result?.specialRecommendations?.is46to55 || result?.specialRecommendations?.isOver55;
    
    // VARIANT: Pokud má akné, ale pleť NENÍ mastná/smíšená (tedy je suchá, normální nebo citlivá)
    if (!['Mastná', 'Smíšená'].includes(skinType)) {
      
      // Varianta pro 45+
      if (isOver45) {
        return `<div class="result-card-box">
         
          <p class="result-lead">
            Říkáte si co se to s vaší pletí děje? Odpověď je: hormony.
          </p>

         <p class="result-paragraph">
  Tělo prochází hormonálními změnami, které ovlivňují i pleť. 
  Menopauza a perimenopauza způsobují kolísání hladin estrogenů, což může vyvolat záněty podobné akné.
</p>

<p class="result-paragraph">
  To není selhání vaší péče. Je to přirozená reakce těla na změny.
  Problém je, že většina produktů na akné počítá s mladou, mastnou pletí. 
</p>

<p class="result-paragraph">
  <strong>U vás potřebujeme trochu jiný přístup</strong> - ten, který zklidňuje záněty, 
  ale zároveň respektuje, že už není tak odolná jako dřív a potřebuje více hydratace a ochrany.
</p>

          <div class="result-highlight-box">
            <strong>Doporučuji - Možnost 1 (Doporučuji):</strong> Začněte se <a href="https://www.kailushop.cz/sada-pro-citlivou-plet" target="_blank" style="color: #faa4a6; text-decoration: underline; font-weight: bold;">sadou pro citlivou pleť</a>. Ta bariéru opraví a zklidní zánět. Často pupínky zmizí samy.
          </div>

          <div class="result-highlight-box" style="margin-top: 1rem;">
            <strong>Možnost 2:</strong> Pokud chcete cílenější řešení a cítíte, že je vaše pleť stále poměrně odolná, zvolte <a href="https://www.kailushop.cz/sada-pro-problematickou-plet" target="_blank" style="color: #faa4a6; text-decoration: underline; font-weight: bold;">sadu na akné</a>, ale <strong>doplňte ji o výživný krém</strong>, aby se pleť nezačala loupat.
          </div>

          <p class="result-paragraph">
            Nejste si jistá? Napište mi na info@kailu.cz. Ráda to s vámi proberu!
          </p>
        </div>`;
      }
      
      // Původní varianta pro mladší
      return `<div class="result-card-box">
       
        
        <p class="result-lead">
          To je důvod, proč vyžaduje velmi opatrný přístup. Potřebujeme vyřešit pupínky, ale zároveň hydratovat a chránit.
        </p>

        <p class="result-paragraph">
          Akné u suché pleti má úplně jiné příčiny než u té mastné.
          Nevzniká ucpáním póru mazem, ale jako reakce na narušenou kožní bariéru a/nebo hormonální výkyvy.
          Máme dvě cesty, jak se s tím vypořádat:
        </p>

        <div class="result-highlight-box">
          <strong>Možnost 1 (Doporučuji):</strong> Začněte se <a href="https://www.kailushop.cz/sada-pro-citlivou-plet" target="_blank" style="color: #faa4a6; text-decoration: underline; font-weight: bold;">sadou pro citlivou pleť</a>. Ta bariéru opraví a zklidní zánět. Často se stane, že pupínky zmizí samy, jakmile se pleť dostatečně "zpevní".
        </div>

        <div class="result-highlight-box" style="margin-top: 1rem;">
          <strong>Možnost 2:</strong> Zvolte <a href="https://www.kailushop.cz/sada-pro-problematickou-plet" target="_blank" style="color: #faa4a6; text-decoration: underline; font-weight: bold;">sadu na akné</a>, ale je <strong>naprosto nezbytné</strong> k ní používat i výživný hydratační krém, aby se vaše pleť nezačala loupat a pálit.
        </div>

        <p class="result-paragraph">
          Nejste si jistá? Napište mi na info@kailu.cz. Ráda to s vámi proberu!
        </p>
      </div>`;
    }
    
// STANDARD: Mastná/Smíšená pleť s akné
// Varianta pro 45+
if (isOver45) {
  return `<div class="result-card-box">
    
    <p class="result-lead">
  Asi jste si myslela, že v tomto věku budete mít od akné už klid.
</p>

<p class="result-paragraph">
  Chápu vaši frustraci. Ale akné není jen problém teenagerů. 
  Po 45 letech se může objevit znovu, tentokrát kvůli hormonálním změnám, ne kvůli nadměrnému mazu.
  Vaše pleť navíc není tak odolná vůči agresivní péči jako dřív.
</p>

<p class="result-paragraph">
  Naše sada pro aknozní pleť je velmi účinná a vaše pleť si ji díky jejímu typu "může dovolit" aniž by se přesušila.
  Kombinuje retinal (nejúčinnější formu vitaminu A) s hydratací a ochranou, kterou vaše pleť v tomto věku potřebuje.
</p>

    <p class="result-transition-text">Co můžete očekávat?</p>
    <ul class="result-list">
      <li><span><strong>Zklidnění zánětů:</strong> Redukce zarudnutí a urychlení hojení.</span></li>
      <li><span><strong>Prevence nových pupínků:</strong> Retinal podporuje obnovu pleti a reguluje tvorbu mazu.</span></li>
      <li><span><strong>Vyhlazení textury:</strong> Postupné sjednocení povrchu pleti.</span></li>
      <li><span><strong>Bez vysušení:</strong> Hydratace a ochrana, kterou vaše pleť v tomto věku potřebuje.</span></li>
    </ul>

    <div class="result-highlight-box">
    <strong>Pamatujte:</strong> Každá pleť je jedinečná. Dejte jí čas se adaptovat a poctivě dodržujte manuál. Trpělivost je v boji s akné vaše největší síla.
  </div>
  
  </div>`;
}

// Původní varianta pro mladší
return `<div class="result-card-box">
  
  <p class="result-lead">
    Proto má k tvorbě akné přirozeně větší sklony.
  </p>

  <p class="result-paragraph">
    Naše sada pro aknozní pleť kombinuje hned několik aktivních látek včetně retinalu, ale zároveň dbá na ochranu pleti i hydrataci. 
  </p>
  
  <p class="result-transition-text">Co můžete očekávat?</p>
  <ul class="result-list">
    <li><span><strong>Čisté póry:</strong> Retinal urychluje obnovu pleti, čímž omezuje tvorbu černých teček a pupínků.</span></li>
    <li><span><strong>Zklidnění aktivních míst:</strong> Redukce zarudnutí a urychlení regenerace již vzniklých projevů.</span></li>
    <li><span><strong>Sjednocení textury:</strong> Postupné vyhlazení povrchu pleti, který může být vlivem akné nejednotný.</span></li>
    <li><span><strong>Méně mastná pleť:</strong> Stabilizace celkového vzhledu pleti bez zbytečného pocitu mastnoty.</span></li>
  </ul>

  <div class="result-highlight-box">
    <strong>Pamatujte:</strong> Každá pleť je jedinečná. Dejte jí čas se adaptovat a poctivě dodržujte manuál. Trpělivost je v boji s akné vaše největší síla.
  </div>

</div>`;
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

// Získání věku
const age = answers['age'] || '';
const isUnder25 = age === 'Do 25 let';
const is26to35 = age === '26-35 let';
const is36to45 = age === '36-45 let';
const is46to55 = age === '46-55 let';
const isOver55 = age === '56+ let';
  
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
    const sortedSkinTypes = Object.entries(points)
      .filter(([type]) => type !== 'Citlivá')
      .sort((a, b) => b[1] - a[1]);
  
    const secondMostCommonType = sortedSkinTypes.length > 0 ? sortedSkinTypes[0][0] : null;
  
    displaySkinType = secondMostCommonType 
      ? `${secondMostCommonType}<br><small>a také citlivá</small>` 
      : `citlivá`;
  } else {
    displaySkinType = isSensitive 
      ? `${basicSkinType}<br><small>a také citlivá</small>` 
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
      isPregnant,
      isUnder25,
      is26to35,
      is36to45,
      is46to55,
      isOver55
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

// Slevové kódy pro trackování
export const DISCOUNT_CODES = ['16552304', '20690676', '59866170', '12505026', '30660454'] as const;

// Funkce pro získání náhodného kódu
export function getRandomDiscountCode(): string {
  const randomIndex = Math.floor(Math.random() * DISCOUNT_CODES.length);
  return DISCOUNT_CODES[randomIndex];
}

// Funkce pro kopírování do schránky (funguje i v iframe)
export async function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn('Clipboard API selhalo, zkouším fallback');
    }
  }
  
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Kopírování selhalo:', err);
    return false;
  }
}


