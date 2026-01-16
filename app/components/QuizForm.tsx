"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { evaluateQuiz, type QuizResult, getRandomDiscountCode, copyToClipboard } from './QuizEvaluation';;
import { RESULT_TEXTS } from './QuizEvaluation';
import { SHOP_BASE_URL, PRODUCT_URLS, DISPLAY_NAMES } from './QuizEvaluation';
import { SKIN_TYPE_URLS } from './QuizEvaluation';
import Image from 'next/image';

const INTRO_TEXT = {
 title: "Vítejte na cestě za spokojenou pletí! 🎀",
 paragraphs: [
   'Pokud to jde, prosím:',
    '✅mějte odlíčenou pleť',
    '✅nachystejte si zrcátko',
    'Velkým pomocníkem bude také denní světlo a absence krémů na pleti.',
    'Odpovídejte upřímně a nebojte se, není to žádný test, všechny odpovědi mohou být správné. 😎'
 ]
};

const QUESTIONS = [
 {
   id: 'skin-description',
   title: 'Který z těchto popisů nejlépe odpovídá vaší pleti?',
   type: 'radio',
   section: 'skin',
   options: [
     'Je v pohodě, nemám s ní větší problémy',
     'Je suchá - pocitově i na pohled, občas pne nebo svědí',
     'Dost se mastí, tváře ale o něco méně, než zbytek obličeje',
     'Mastí se hodně a všude!',
     'Je citlivá. Málokterá kosmetika mi sedne'
   ]
 },
 {
   id: 'skin-nose',
   title: 'Který obrázek se vám nejvíce podobá?',
   type: 'radio',
   section: 'skin',
   images: [
     { url: 'https://684389.myshoptet.com/user/documents/upload/nos1.png', alt: 'Viditelné póry' },
     { url: 'https://684389.myshoptet.com/user/documents/upload/nos2.png', alt: 'Méně viditelné póry' },
     { url: 'https://684389.myshoptet.com/user/documents/upload/nos3.png', alt: 'Žádné viditelné póry' }
   ],
   options: [
     'Vaše póry si na schovávanou nehrají. Jsou dobře viditelné, mohou (ale nemusí) v nich být i černé tečky',
     'Póry jsou viditelné jen při bližším pohledu',
     'Jaké póry?'
   ]
 },
 {
   id: 'skin-cheeks',
   title: 'Na pórech fakt záleží! Omrkněte prosím ještě tváře. Vidíte je tam?',
   type: 'radio',
   section: 'skin',
   images: [
     { url: 'https://684389.myshoptet.com/user/documents/upload/tvare.png', alt: 'Póry všude' },
     { url: 'https://684389.myshoptet.com/user/documents/upload/tvare2.png', alt: 'Póry u nosu' },
     { url: 'https://684389.myshoptet.com/user/documents/upload/tvare3.jpg', alt: 'Minimum pórů' }
   ],
   options: [
     'Ano, jsou všude.',
     'Vidím je hlavně v oblasti vedle nosu, na tvářích potom o něco méně.',
     'Sem tam možná nějaký je.',
   ]
 },
 {
   id: 'cosmetic-compatibility',
   title: 'Jak si vaše pleť rozumí s kosmetickými produkty?',
   type: 'checkbox',
   section: 'skin',
   options: [
     'Občas mám pocit, že mi pleť spíše vysuší.',
     'S kosmetikou musím opatrně, pleť na ni často reaguje pnutím nebo zčervenáním.',
     'Většina kosmetických přípravků mi sedne.',
     'Některé produkty mi úplně ucpou pleť, zanesou póry a vyrobí pupínky!',
     'Moje pleť miluje pořádně hutné krémy a oleje!',
   ]
 },
 {
   id: 'target-intro',
   title: '',
   type: 'info',
   section: 'target',
   content: 'Skvělé, už máme celkem pěkný obrázek o tom, jaká vaše pleť je. Pokračujme tím, že se zaměříme na "detaily".',
   buttonText: 'Jasně!'
 },
 {
  id: 'skin',
  title: 'Je na vaší pleti něco, co byste tam už raději neměl/a?',
  type: 'checkbox',
  section: 'target',
  options: [
    'Pigmentové skvrny nebo jizvy po akné',
    'Kruhy pod očima',
    'Vrásky',
    'Sem tam pupínek',
    'Akné (stabilně více než 5 pupínků🤫)',
    'Rozšířené póry nebo černé tečky',
    'Trvale začervenalá pleť',
    'Dermatitida = zarudlé skvrny, šupinky nebo malé pupínky v okolí úst nebo na čele, nose a obočí',
    'Není, jsem spokojená / Nic z výše uvedeného'
  ]
},
{
  id: 'wish-intro',
  title: 'Skvělé, už se nám to rýsuje...',
  type: 'info',
  section: 'wish',
  content: 'Když v tom z našeho kosmetického rybníčku náhle vyskočila <strong>zlatá rybka 🐠</strong> a nabídla se, že vám splní vaše největší přání!',
  buttonText: 'Super!'
},
{
  id: 'wish-fish',
  title: 'Tak co to bude?   ',
  type: 'radio',
  section: 'wish',
  options: [
    'Chci zpomalit stárnutí.',
    'Už nechci mít citlivou pleť.',
    'Ať mi zmizí pupínky.',
    'Ať už není moje pleť tak vysušená.',
    'Nechť mé černé tečky navždy zmizí!',
    'Ať se moje pleť tolik nemastí.',
    'Chci udržet aktuální stav pleti co nejdéle.',
    'Zrovna jsem těhotná, nebo kojím - proto se chci vyhnout látkám, které bych neměla používat.',
  ]
},
{
  id: 'budget-intro',
  title: '',
  type: 'info',
  section: 'budget',
  content: 'Ještě si prosím rozmyslete, kolik chcete do vaší nové kosmetické výbavy investovat. 👛 Ptáme se na částku, která vám kompletně pokryje zhruba <strong>tříměsíční péči</strong> o pleť.',
  buttonText: 'Mám rozmyšleno!'
},
{
  id: 'budget-limit',
  title: 'Máte stanovený cenový limit?',
  type: 'radio',
  section: 'budget',
  options: [
    'Chtěl/a bych se vejít do 2000 Kč - stačí mi základní sada.',
    'Mám limit 2500 Kč.',
    'Rád/a se podívám i na dražší možnost, pokud pro mě bude nejvhodnější.',
  ]
},
{
  id: 'done-info',
  title: 'Vaše nová kosmetická výbava už se na vás těší!',
  type: 'info',
  section: 'done',
  content: '',
  buttonText: 'Taky se těším!'
}
];

const getSkinTypeUrl = (skinType) => {
  const lowerType = skinType.toLowerCase().trim();
  
  if (lowerType.includes('citlivá') || lowerType.includes('citliva')) {
    return `${SHOP_BASE_URL}citlivost`;
  } else if (lowerType.includes('suchá') || lowerType.includes('sucha')) {
    return `${SHOP_BASE_URL}suchaplet`;
  } else if (lowerType.includes('mastná') || lowerType.includes('mastna')) {
    return `${SHOP_BASE_URL}mastnaplet`;
  } else if (lowerType.includes('smíšená') || lowerType.includes('smisena')) {
    return `${SHOP_BASE_URL}smisenaplet`;
  } else if (lowerType.includes('normální') || lowerType.includes('normalni')) {
    return `${SHOP_BASE_URL}normalniplet`;
  } else {
    return SHOP_BASE_URL;
  }
};

const SectionHeader = ({ currentQuestion }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const getHeaderText = () => {
    const question = QUESTIONS[currentQuestion];
    if (question.section === 'skin') return 'Poznejme vaši pleť 🔍';
    if (question.section === 'target') return 'Zaměřme cíl 🎯';
    if (question.section === 'wish') return 'Přejte si ✨';
    if (question.section === 'budget') return 'Rozpočet 💰';
    if (question.section === 'done') return 'A je to! 🎉';
  };

  const isFirstSection = QUESTIONS[currentQuestion].section === 'skin';

  return (
    <div className="pt-2 mb-3">
      <h1 className="text-base font-semibold flex items-center text-gray-900 relative">
        {getHeaderText()}
        
        {/* Zobrazit ikonku pouze v první sekci */}
        {isFirstSection && (
          <div className="relative ml-2">
            <button
              onClick={() => setShowTooltip(!showTooltip)}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              i
            </button>
            
            {/* Tooltip */}
            {showTooltip && (
              <div className="absolute left-1/2 translate-x-[-50%] top-7 z-10 w-64 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
                <div className="text-sm text-gray-700">
                  <p className="font-semibold mb-2">💡Co potřebujete pro přesné výsledky:</p>
                  <ul className="space-y-1 mb-3">
                    <li>✅ Odlíčená pleť</li>
                    <li>✅ Žádný krém</li>
                    <li>✅ Denní světlo</li>
                    <li>✅ Zrcátko</li>
                  </ul>
                  <p className="text-xs text-gray-600">
                    Odpovídejte upřímně podle aktuálního stavu vaší pleti. 
                    Není to test - všechny odpovědi jsou správné! 😊
                  </p>
                </div>
                {/* Šipka */}
                <div className="absolute -top-2 left-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white"></div>
              </div>
            )}
          </div>
        )}
      </h1>
      <div className="h-px bg-[#c0b6aa] mt-2"></div>
    </div>
  );
};

const CustomButton = ({ children, ...props }) => (
 <button
   className="px-6 py-2 rounded-lg bg-[rgba(250,164,166,0.5)] hover:bg-[#faa4a6] text-black transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
   {...props}
 >
   {children}
 </button>
);

const ProgressBar = ({ current, total }) => (
 <div className="w-full mt-8">
   <div className="h-1 bg-gray-200 rounded-full">
     <div
       className="h-full bg-[rgba(250,164,166,0.5)] rounded-full transition-all duration-300"
       style={{ width: `${(current / total) * 100}%` }}
     ></div>
   </div>
   <div className="text-sm text-gray-500 text-center mt-2">
     {current} z {total}
   </div>
 </div>
);

const QuizForm = () => {
 const [showIntro, setShowIntro] = useState(false);
 const [currentQuestion, setCurrentQuestion] = useState(0);
 const [answers, setAnswers] = useState({});
 const [hoveredImage, setHoveredImage] = useState(null);
 const [isTransitioning, setIsTransitioning] = useState(false);
 const [result, setResult] = useState<QuizResult | null>(null);
 const [sessionId] = useState(() => `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
 const [discountCode] = useState(() => getRandomDiscountCode());
const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minut v sekundách
const [codeExpired, setCodeExpired] = useState(false);
const [codeCopied, setCodeCopied] = useState(false);
const [saveEmail, setSaveEmail] = useState('');
const [emailSaved, setEmailSaved] = useState(false);

 // === ANALYTICS FUNKCE ===
 const getClientIP = async (): Promise<string> => {
   try {
     const response = await fetch('https://api.ipify.org?format=json');
     const data = await response.json();
     return data.ip;
   } catch (error) {
     console.warn('Nepodařilo se získat IP adresu:', error);
     return 'unknown';
   }
 };

const logQuizData = async (answers: any, result: any, step: string) => {
  console.log('ANALYTICS FUNKCE BYLA ZAVOLÁNA!', step);
  
  // PŘIDAT KONTROLU DUPLICITŮ
  const logId = `${sessionId}_${step}`;
  const existingLogs = JSON.parse(localStorage.getItem('quizAnalytics') || '[]');
  const isDuplicate = existingLogs.some(log => 
    log.sessionId === sessionId && 
    log.step === step &&
    Math.abs(new Date(log.timestamp).getTime() - Date.now()) < 5000
  );
  
  if (isDuplicate) {
    console.log('Duplicitní log ignorován:', step, sessionId);
    return;
  }
  
  const timestamp = new Date().toISOString();
  const userAgent = navigator.userAgent;
  const clientIP = await getClientIP();
  
  const logData = {
    id: `${sessionId}_${step}_${Date.now()}`,
    sessionId,
    timestamp,
    clientIP,
    userAgent: userAgent.substring(0, 100),
    step,
    answers,
    result,
    currentQuestion: currentQuestion,
    url: window.location.href,
    referrer: document.referrer || 'direct'
  };
  
  console.log('=== QUIZ ANALYTICS ===');
  console.log('Session ID:', logData.sessionId);
  console.log('Čas:', logData.timestamp);
  console.log('IP:', logData.clientIP);
  console.log('Krok:', logData.step);
  console.log('Otázka:', logData.currentQuestion);
  if (result) {
    console.log('Typ pleti:', result.skinType);
    console.log('Doporučená sada:', result.recommendedSet);
  }
  console.log('=========================');
  
  // NOVÉ - poslat na server místo localStorage
  try {
    const response = await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logData)
    });
    
    if (response.ok) {
      console.log('Data úspěšně odeslána na server');
    } else {
      console.error('Chyba při odesílání dat na server');
    }
  } catch (error) {
    console.warn('Chyba při ukládání analytics:', error);
  }
  
  // Stále ukládat i do localStorage jako backup
  try {
    const existingLogs = JSON.parse(localStorage.getItem('quizAnalytics') || '[]');
    existingLogs.push(logData);
    localStorage.setItem('quizAnalytics', JSON.stringify(existingLogs));
  } catch (error) {
    console.warn('Chyba při ukládání do localStorage:', error);
  }
};

 // Logování opuštění stránky
useEffect(() => {
  const handleBeforeUnload = () => {
    if (currentQuestion > 0 && !result) {
      logQuizData(answers, null, 'abandoned');
    }
  };
  
  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
}, [currentQuestion, answers, result, sessionId]);

// Analytics pro dokončení kvízu
useEffect(() => {
  if (result && !sessionStorage.getItem(`completed_${sessionId}`)) {
    logQuizData(answers, result, 'completed');
    sessionStorage.setItem(`completed_${sessionId}`, 'true');
  }
}, [result, sessionId, answers]);

// Odpočet 15 minut pro slevový kód
useEffect(() => {
  if (!result || codeExpired) return;
  
  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        setCodeExpired(true);
        clearInterval(timer);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
  
  return () => clearInterval(timer);
}, [result, codeExpired]);

// Formátování času pro odpočet
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Funkce pro odeslání výsledků na email
const handleSaveEmail = async () => {
  if (!saveEmail || !saveEmail.includes('@')) return;
  
  try {
    // Uložit do analytics
    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: `${sessionId}_email_${Date.now()}`,
        sessionId,
        timestamp: new Date().toISOString(),
        step: 'email_saved',
        email: saveEmail,
        discountCode,
        result,
        answers
      })
    });
    
    // Vytvoř URL produktu
    const isDermatitis = result?.recommendedSet === 'Dermatitida';
    const productUrl = isDermatitis
      ? 'https://www.kailu.cz/kontakt'
      : `${SHOP_BASE_URL}${PRODUCT_URLS[result?.recommendedSet?.split(' + ')[0] || '']}`;

    // Poslat email
    await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: saveEmail,
        discountCode,
        result: result?.recommendedSet,
        skinType: result?.skinType,
        productUrl: productUrl
      })
    });
    
    setEmailSaved(true);
  } catch (error) {
    console.error('Chyba při ukládání emailu:', error);
  }
};
// Funkce pro kopírování kódu
const handleCopyCode = async () => {
  const success = await copyToClipboard(discountCode);
  if (success) {
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  }
};


// KÓD PRO DYNAMICKOU VÝŠKU
useEffect(() => {
  const sendHeight = () => {
    const height = document.body.scrollHeight;
     window.parent.postMessage(
       { type: 'kviz-height', height: height },
       '*'
     );
   };

   sendHeight();
   
   // Pošleme výšku každých 500ms
   const interval = setInterval(sendHeight, 500);

   return () => {
     clearInterval(interval);
   };
 }, [currentQuestion, showIntro, result]);

 const handleQuizComplete = () => {
   // Když dojdeme na konec kvízu, vyhodnotíme odpovědi
   if (currentQuestion === QUESTIONS.length - 1) {
     const result = evaluateQuiz(answers);
     setResult(result);
     
     // LOGOVÁNÍ DOKONČENÍ KVÍZU
     logQuizData(answers, result, 'completed');
   }
 };

 const handleQuestionChange = (newQuestion) => {
   if (newQuestion >= QUESTIONS.length) {
     handleQuizComplete();
     return;
   }

   setIsTransitioning(true);
   setTimeout(() => {
     setCurrentQuestion(newQuestion);
     setIsTransitioning(false);
   }, 300);
 };

 const handleAnswer = (value, isCheckbox = false) => {
   if (isCheckbox) {
     setAnswers(prev => {
       const currentAnswers = prev[QUESTIONS[currentQuestion].id] || [];
       const newAnswers = currentAnswers.includes(value)
         ? currentAnswers.filter(item => item !== value)
         : [...currentAnswers, value];
       return {
         ...prev,
         [QUESTIONS[currentQuestion].id]: newAnswers
       };
     });
   } else {
     setAnswers(prev => ({
       ...prev,
       [QUESTIONS[currentQuestion].id]: value
     }));
     if (currentQuestion < QUESTIONS.length - 1) {
       handleQuestionChange(currentQuestion + 1);
     } else {
       handleQuizComplete();
     }
   }
 };

 const handlePrevious = () => {
   if (currentQuestion === 0) {
     setShowIntro(true);
   } else {
     handleQuestionChange(currentQuestion - 1);
   }
 };

 if (showIntro) {
   return (
     <div className="bg-transparent">
       
       {/* VERZE PRO PC - pouze obrázek */}
       <div className="hidden md:flex justify-center items-stretch min-h-screen w-full">
         <img 
           src="https://www.kailushop.cz/user/documents/upload/kviz_diagnostika_pc.png"
           alt="Spustit diagnostiku"
           onClick={() => {
             setShowIntro(false);
             logQuizData({}, null, 'started');
           }}
           className="w-full h-full cursor-pointer"
         />
       </div>

       {/* VERZE PRO MOBIL - viditelná pouze na mobilu */}
       <div className="flex md:hidden">
         <img 
           src="https://www.kailushop.cz/user/documents/upload/HP_mob2.svg"
           alt="Spustit diagnostiku"
           onClick={() => {
             setShowIntro(false);
             logQuizData({}, null, 'started');
           }}
           className="w-full h-auto cursor-pointer"
         />
       </div>

     </div> 
   );
 }

 console.log('currentQuestion:', currentQuestion);
 console.log('QUESTIONS length:', QUESTIONS.length);

 const currentQ = currentQuestion < QUESTIONS.length ? QUESTIONS[currentQuestion] : null;

 if (!currentQ) {
   handleQuizComplete();
   return null;
 }

 console.log('currentQ:', currentQ);
 console.log('recommendedSet:', result?.recommendedSet);
 console.log('PRODUCT_URLS:', PRODUCT_URLS);

if (result) {
  // Google Analytics tracking
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'quiz_completed', {
      skin_type: result.skinType,
      recommended_set: result.recommendedSet,
      has_acne: result.problems.includes('Akné (stabilně více než 5 pupínků🤫)'),
      budget: answers['budget-limit'] || 'unlimited',
      discount_code: discountCode
    });
  }

  const isDermatitis = result.recommendedSet === 'Dermatitida';
  const productUrl = isDermatitis
    ? 'https://www.kailushop.cz/sada-pro-citlivou-plet/'
    : `${SHOP_BASE_URL}${PRODUCT_URLS[result.recommendedSet.split(' + ')[0]]}`;

  // Speciální text pro M+SM komplet (dehydratovaná varianta)
  const isDehydrated = answers['skin-description']?.includes('Je suchá') || 
    answers['cosmetic-compatibility']?.includes('Občas mám pocit, že mi pleť spíše vysuší');
  
  const isMSMKomplet = result.recommendedSet === 'M+SM komplet';

  return (
    <div className="max-w-2xl mx-auto p-6">
      
     {/* SEKCE 1: TYP PLETI */}
<div className="mb-4">
  <p style={{ fontFamily: 'Cinzel, serif', fontSize: '2rem', color: '#faa4a6', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
    Vaše pleť je {result.skinType.toLowerCase()}.
  </p>
</div>

{/* SEKCE 2-5: TEXT Z RESULT_TEXTS */}
<div className="mb-8 result-output-debug">
  {result && (
    <div 
      dangerouslySetInnerHTML={{ 
        __html: typeof RESULT_TEXTS[result.recommendedSet] === 'function'
          ? (RESULT_TEXTS[result.recommendedSet] as any)(answers, result)
          : RESULT_TEXTS[result.recommendedSet]
      }} 
    />
  )}
</div>
      {/* SEKCE 6: URGENCE + KÓD + CTA */}
{!codeExpired ? (
  <div className="mb-8">
    {/* Co získáte v sadě */}
    <div className="p-6 border border-gray-200 rounded-lg mb-4">
      <h3 className="font-semibold text-lg mb-4">V sadě získáte:</h3>
      <ul className="space-y-2">
        <li>✓ <strong>Produkty</strong> přesně pro vaši pleť</li>
<li>✓ <strong>Pleťový manuál</strong> krok za krokem</li>
<li>✓ <strong>Garance spokojenosti</strong> a další výhody Kailu klubu</li>
      </ul>
    </div>

    {/* Bonus s kódem */}
    <div className="p-6 border-2 border-[#faa4a6] rounded-lg bg-[#fdf8f8]">
      <h3 className="font-semibold text-lg mb-3 text-center">🎁 BONUS S KÓDEM</h3>
      <p className="text-center text-gray-700 mb-4">
        Osobně se podívám na vaše odpovědi<br />
        a ověřím, že je sada pro vás ta pravá.
      </p>

      <div className="flex items-center justify-center gap-3 mb-2">
        <button
          onClick={handleCopyCode}
          className="px-6 py-3 bg-white border-2 border-gray-300 hover:border-[#faa4a6] rounded-lg font-mono text-xl font-bold transition-colors"
          title="Klikněte pro zkopírování"
        >
          {discountCode}
          {codeCopied ? ' ✓' : ' 📋'}
        </button>
      </div>
      
      {codeCopied && (
        <p className="text-center text-sm text-green-600 mb-2">Kód zkopírován!</p>
      )}

      <p className="text-center text-sm text-gray-500 mb-4">
        Kód zadejte v košíku. Platí ještě: <span className="font-bold text-[#faa4a6]">{formatTime(timeLeft)}</span>
      </p>
    </div>

    {/* CTA tlačítko */}
    <button
      onClick={() => {
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'purchase_click', {
            product_set: result.recommendedSet,
            skin_type: result.skinType,
            discount_code: discountCode
          });
        }
        window.parent.location.href = productUrl;
      }}
      className="w-full mt-4 py-4 bg-[#91C77E] hover:bg-[#B2EA9F] transition-colors duration-200 rounded-lg text-black font-semibold text-lg"
    >
      Objednat sadu
    </button>
    
    <p className="text-center text-sm text-gray-500 mt-3">
      Expedice do 24 h
    </p>
  </div>
) : (
  <div className="mb-8 p-6 bg-gray-100 rounded-lg">
    <p className="text-center text-gray-600 mb-4">
      Platnost kódu vypršela, ale sadu si stále můžete objednat:
    </p>
    <button
      onClick={() => {
        window.parent.location.href = productUrl;
      }}
      className="w-full py-4 bg-[#91C77E] hover:bg-[#B2EA9F] transition-colors duration-200 rounded-lg text-black font-semibold text-lg"
    >
      Zobrazit doporučenou péči
    </button>
  </div>
)}

      {/* SEKCE 7: ZÁCHYTNÁ SÍŤ */}
      {!emailSaved ? (
        <div className="p-6 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Chcete si to ještě rozmyslet?</h3>
          <p className="text-sm text-gray-600 mb-4">Uložím vám výsledek na e-mail.</p>
          
          <div className="flex gap-2">
            <input
              type="email"
              value={saveEmail}
              onChange={(e) => setSaveEmail(e.target.value)}
              placeholder="váš@email.cz"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#faa4a6]"
            />
            <button
              onClick={handleSaveEmail}
              disabled={!saveEmail || !saveEmail.includes('@')}
              className="px-6 py-2 bg-[#faa4a6] hover:bg-[#f89a9c] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              Uložit
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-green-50 rounded-lg text-center">
          <p className="text-green-700">✓ Výsledek uložen! Pošleme vám ho na e-mail.</p>
        </div>
      )}

      {/* Debug tlačítka - pouze v development */}
      {process.env.NODE_ENV !== 'production' && (
        <div style={{position: 'fixed', bottom: '10px', right: '10px', zIndex: 9999}}>
          <a 
            href="/admin" 
            target="_blank"
            style={{
              display: 'block',
              background: '#faa4a6', 
              color: 'white', 
              padding: '5px 10px', 
              borderRadius: '5px', 
              textDecoration: 'none',
              fontSize: '12px',
              marginBottom: '5px'
            }}
          >
            📊 Analytics
          </a>
        </div>
      )}
    </div>
  );
}

 return (
   <>
     <div className={`bg-white container mx-auto max-w-[950px] ${currentQuestion === 0 ? '' : 'py-2 px-1 md:px-4'}`}>
       <Card className={`bg-white max-w-[800px] mx-auto ${currentQuestion === 0 ? 'p-2' : 'py-2 md:py-8 px-1 md:px-4'}`}>
         <CardContent className="p-4">
           <SectionHeader currentQuestion={currentQuestion} />
           <div className={`mb-6 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
             <h2 className="text-md font-bold mb-2 text-gray-900">
               {currentQ.title}
             </h2>

             {currentQ.type === 'info' ? (
               <div className="space-y-10">
                 <p className="text-sm leading-[1.8]" dangerouslySetInnerHTML={{ __html: currentQ.content }}></p>
                 <div className="flex justify-end mt-6">
                   <CustomButton
                     onClick={() => {
                       if (currentQuestion === QUESTIONS.length - 1) {
                         const quizResult = evaluateQuiz(answers);
                         setResult(quizResult);
                       } else {
                         handleQuestionChange(currentQuestion + 1);
                       }
                     }}
                   >
                     {currentQ.buttonText || 'Další'}
                   </CustomButton>
                 </div>
               </div>
             ) : currentQ.type === 'checkbox' ? (
               <div className="space-y-0.5">
                 {currentQ.options.map((option, index) => (
                   <div key={index} className="flex items-start space-x-3 py-1.5 relative group">
                     <Checkbox
                       id={`option-${index}`}
                       checked={(answers[currentQ.id] || []).includes(
                         typeof option === 'object' ? option.text : option
                       )}
                       onChange={(checked) =>
                         handleAnswer(
                           typeof option === 'object' ? option.text : option,
                           true
                         )
                       }
                       className="mt-0.5"
                     />
                     <Label
                       htmlFor={`option-${index}`}
                       className="text-sm cursor-pointer leading-[1.8] flex-1"
                     >
                       {typeof option === 'object' ? option.text : option}
                     </Label>
                     {/* Hover obrázek */}
                     <div className="absolute left-full ml-4 hidden group-hover:block transition-opacity duration-300">
                       {typeof option === 'object' && option.image && (
                         <Image
                           src={option.image}
                           alt={option.text}
                           className="w-[200px] h-[200px] object-cover rounded-lg shadow-lg"
                         />
                       )}
                     </div>
                   </div>
                 ))}
               </div>
             ) : (
               <div className="space-y-0.5">
                 {currentQ.images ? (
                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                     {currentQ.images.map((image, index) => (
                       <div key={index} className="flex flex-col w-[160px]">
                         <div
                           className="relative aspect-square group"
                           onMouseEnter={() => setHoveredImage(index)}
                           onMouseLeave={() => setHoveredImage(null)}
                         >
                           <div className="relative overflow-hidden rounded-lg h-full">
                             <Image
                               src={image.url}
                               alt={image.alt}
                               layout="responsive"
                               width={1}
                               height={1}
                               className={`w-full h-full object-cover transition-transform duration-200 ${
                                 hoveredImage === index ? 'scale-125' : 'scale-100'
                               }`}
                             />
                           </div>
                         </div>
                         <div className="mt-2">
                           <RadioGroup
                             value={answers[currentQ.id]}
                             onValueChange={handleAnswer}
                           >
                             <div className="flex items-start space-x-1.5">
                               <RadioGroupItem
                                 value={currentQ.options[index]}
                                 id={`option-${index}`}
                               />
                               <Label
                                 htmlFor={`option-${index}`}
                                 className="text-sm cursor-pointer leading-[1.8] text-gray-900 flex-1"
                               >
                                 {currentQ.options[index]}
                               </Label>
                             </div>
                           </RadioGroup>
                         </div>
                       </div>
                     ))}
                   </div>
                 ) : (
                   <RadioGroup
                     value={answers[currentQ.id]}
                     onValueChange={handleAnswer}
                     className="space-y-0.5"
                   >
                     {currentQ.options.map((option, index) => (
                       <div key={index} className="flex flex-col w-full">
                         <div className="flex items-start space-x-2 py-1.5">
                           <RadioGroupItem
                             value={option}
                             id={`option-${index}`}
                           />
                           <Label
                             htmlFor={`option-${index}`}
                             className="text-sm cursor-pointer leading-[1.8] text-gray-900 flex-1"
                           >
                             {option}
                           </Label>
                         </div>
                       </div>
                     ))}
                   </RadioGroup>
                 )}
               </div>
             )}

             {/* Navigační tlačítka */}
             <div className="flex justify-between mt-6">
               {currentQ.type === 'radio' && (
                 <CustomButton onClick={handlePrevious}>
                   Předchozí
                 </CustomButton>
               )}
               
               {currentQ.type === 'checkbox' && (
                 <>
                   <CustomButton onClick={handlePrevious}>
                     Předchozí
                   </CustomButton>
                   <CustomButton
                     onClick={() => {
                       if (answers[currentQ.id]?.length > 0) {
                         handleQuestionChange(currentQuestion + 1);
                       }
                     }}
                     disabled={!answers[currentQ.id]?.length}
                   >
                     Další
                   </CustomButton>
                 </>
               )}
             </div>

             <ProgressBar 
               current={currentQuestion + 1}
               total={QUESTIONS.length}
             />
           </div>
         </CardContent>
       </Card>
     </div>
   </>
 );
};

export default QuizForm;