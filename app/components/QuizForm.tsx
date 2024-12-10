
import React, { useState } from 'react';
import { Card, CardContent } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { evaluateQuiz, type QuizResult } from './QuizEvaluation';
import { RESULT_TEXTS } from './QuizEvaluation';
import { SHOP_BASE_URL, PRODUCT_URLS, DISPLAY_NAMES } from './QuizEvaluation';
import { SKIN_TYPE_URLS } from './QuizEvaluation';
import Image from 'next/image';


const INTRO_TEXT = {
 title: "Poznejme vaši pleť 🔍",
 paragraphs: [
   'Začneme hned tím nejdůležitějším a určíme typ vaší pleti.',
   'Pokud to jde: ❌nemějte make-up a ✅nachystejte si zrcátko.', 
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
     'Je citlivá. Často červená, občas pne, nebo se vytvoří šupinky. Málokterá kosmetika mi sedne'
   ]
 },
 {
   id: 'skin-nose',
   title: 'Koukněte se na svůj nos. Jakému obrázku se nejvíce podobá?',
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
   title: 'Na pórech záleží! Omrkněte prosím ještě tváře. Vidíte je tam?',
   type: 'radio',
   section: 'skin',
   images: [
     { url: 'https://684389.myshoptet.com/user/documents/upload/tvare.png', alt: 'Póry všude' },
     { url: 'https://684389.myshoptet.com/user/documents/upload/tvare2.png', alt: 'Póry u nosu' },
     { url: 'https://684389.myshoptet.com/user/documents/upload/tvare3.jpg', alt: 'Minimum pórů' },
     { url: 'https://684389.myshoptet.com/user/documents/upload/tvare4.png', alt: 'Zarudlá pleť' }
   ],
   options: [
     'Ano, jsou všude.',
     'Vidím je hlavně v oblasti vedle nosu, na tvářích potom o něco méně.',
     'Sem tam možná nějaký je.',
     'Čert vem póry, mě na první pohled upoutá zarudnutí a celkově podrážděný vzhled.'
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
     'U některé kosmetiky mám pocit napnuté pleti, jindy se zase více lesknu.'
   ]
 },
 {
   id: 'target-intro',
   title: 'Skvělé, už máme celkem pěkný obrázek o tom, jaká vaše pleť je. Pokračujme tím, že se zaměříme na "detaily".',
   type: 'info',
   section: 'target',
   content: '',
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
    'Akné (více než 5 pupínků🤫)',
    'Rozšířené póry / černé tečky',
    'Dermatitida',
    'Kuperóza ("popraskané žilky")',
    'Není, jsem spokojená / Nic z výše uvedeného'
  ]
},
{
  id: 'wish-intro',
  title: 'Z našeho kosmetického rybníčku náhle vyskočila zlatá rybka 🐠 a nabídla se, že vám splní vaše největší přání!',
  type: 'info',
  section: 'wish',
  content: '',
  buttonText: 'Super!'
},
{
  id: 'wish-fish',
  title: 'Tak co to bude?',
  type: 'radio',
  section: 'wish',
  options: [
    'Chci zpomalit stárnutí.',
    'Ať se moje pleť přestane lesknout.',
    'Už nechci mít citlivou pleť.',
    'Ať mi zmizí pupínky.',
    'Zbav mě vrásek.',
    'Ať už není moje pleť tak vysušená.',
    'Ráda bych, aby moje pleť byla zářivější a vypnujější.',
    'Nechť mé černé tečky navždy zmizí!',
  ]
},
{
  id: 'budget-intro',
  title: 'Balíček na míru už se chystá. 🎁',
  type: 'info',
  section: 'budget',
  content: 'Ještě si prosím rozmyslete, kolik chcete do vaší nové kosmetické výbavy investovat. Jedná se o částku, která vám kompletně pokryje tříměsíční péči o pleť.',
  buttonText: 'Mám rozmyšleno!'
},
{
  id: 'budget-limit',
  title: 'Máte stanovený cenový limit?',
  type: 'radio',
  section: 'budget',
  options: [
    'Chtěl/a bych se vejít do 1500 Kč - stačí mi základní sada.',
    'Mám limit 2500 Kč a určitě ho nechci překročit.',
    'Rád/a se podívám i na dražší možnost, pokud pro mě bude nejvhodnější.',
  ]
},
{
  id: 'done-info',
  title: 'Vaše nová kosmetická výbava už se na vás těší! 💖',
  type: 'info',
  section: 'done',
  content: '',
  buttonText: 'Taky se těším!'
}
];

const SectionHeader = ({ currentQuestion }) => {
  const getHeaderText = () => {
    const question = QUESTIONS[currentQuestion];
    
    if (question.section === 'skin') return 'Poznejme vaši pleť 🔍'; // První sekce
    if (question.section === 'target') return 'Zaměřme cíl 🎯'; // Druhá sekce
    if (question.section === 'wish') return 'Přejte si ✨'; // Třetí sekce
    if (question.section === 'budget') return 'Rozpočet 💰'; // Čtvrtá sekce
    if (question.section === 'done') return 'A je to!🎉'; // Pátá sekce
 };

 return (
   <div className="pt-2 mb-3">
     <h1 className="text-base font-semibold flex items-center text-gray-900">
       {getHeaderText()}
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
 const [showIntro, setShowIntro] = useState(true);
 const [currentQuestion, setCurrentQuestion] = useState(0);
 const [answers, setAnswers] = useState({});
 const [hoveredImage, setHoveredImage] = useState(null);
 const [isTransitioning, setIsTransitioning] = useState(false);
 const [result, setResult] = useState<QuizResult | null>(null);

 const handleQuizComplete = () => {
  // Když dojdeme na konec kvízu, vyhodnotíme odpovědi
  if (currentQuestion === QUESTIONS.length - 1) {
    const result = evaluateQuiz(answers);
    setResult(result);
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
      handleQuizComplete(); // Přidali jsme volání handleQuizComplete
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 container mx-auto max-w-[950px]">
      <Card className="min-h-screen bg-gray-50 py-8 px-4 max-w-[1100px] mx-auto">
        <CardContent className="p-4">
          <SectionHeader currentQuestion={currentQuestion} />
          <div className="space-y-1">
            {INTRO_TEXT.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-sm leading-[1.8] text-gray-900 dark:text-gray-200">{paragraph}</p>
            ))}
          </div>
          <div className="flex justify-end mt-6">
            <CustomButton onClick={() => setShowIntro(false)}>
              Pojďme na to!
            </CustomButton>
          </div>
        </CardContent>
      </Card>
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
  const isDermatitis = result.recommendedSet === 'Dermatitida';

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-center text-2xl font-semibold mb-8">
        ✨ VAŠE VÝSLEDKY ✨
      </h1>
      
      <p className="mb-4">
        Vaše pleť je <span className="font-semibold">{result.skinType}</span>. 
        <a> </a><a 
  href={`${SHOP_BASE_URL}${SKIN_TYPE_URLS[result.skinType]}`}
  target="_blank" 
  rel="noopener noreferrer"
  className="text-black underline hover:text-[#faa4a6]"
>
  Tady se o ní dozvíte více
</a>
      </p>

      {!isDermatitis && (
  <div className="bg-[#f1eae2] mb-6 p-6 rounded-lg">
  <h2 className="font-semibold mb-4">
    Doporučená péče:{' '}
    <a 
      href={`${SHOP_BASE_URL}${PRODUCT_URLS[result.recommendedSet.split(' + ')[0]]}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-black underline hover:text-[#faa4a6]"
    >
      {DISPLAY_NAMES[result.recommendedSet.split(' + ')[0]]}
    </a>
  </h2>
  {(result.recommendedSet.includes('+ Sem tam pupínek') || result.problems.includes('Kruhy pod očima')) && (
          <div>
            <p className="font-semibold">Doplňkové produkty:</p>
            {result.recommendedSet.includes('+ Sem tam pupínek') && (
              <p>
                <a 
                  href={`${SHOP_BASE_URL}sem-tam-pupinek`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black underline hover:text-[#faa4a6]"
                >
                  Mini sada Sem tam pupínek
                </a>
              </p>
            )}
            {result.problems.includes('Kruhy pod očima') && (
              <p>
                <a 
                  href={`${SHOP_BASE_URL}ocni-krem`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black underline hover:text-[#faa4a6]"
                >
                  Oční krém
                </a>
              </p>
            )}
          </div>
        )}
      </div>
    )}

    
      <div className="space-y-4 mb-6">
        <p>{RESULT_TEXTS[result.recommendedSet]}</p>
        
        {!isDermatitis && result.specialRecommendations.hasPigmentation && (
          <p className="mt-4">
            S pigmentovými skvrnami je to trochu složitější. Kosmetika si s nimi může částečně poradit, ale nejúčinnější možností, jak se jich doopravdy zbavit, nebo je alespoň viditelně zmírnit, je chemický peeling. Více o něm píšu na {' '}
    <a 
      href="https://www.kailu.cz/kosmetika" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-black underline hover:text-[#faa4a6]"
    >webu</a>,{' '} kde máte také rovnou i možnost objednání.
          </p>
        )}
        
        {!isDermatitis && result.specialRecommendations.hasUndereyeCircles && (
          <p className="mt-4">
            {result.specialRecommendations.antiAgeSuggested
              ? 'Krém, který si hravě poradí s kruhy pod očima, je již součástí vaší anti-age sady.'
              : (
                <>
A skvělý {' '}
    <a 
      href="https://www.kailushop.cz/ocni-krem" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-black underline hover:text-[#faa4a6]"
    >
      oční krém
    </a>{' '}
    od korejské značky Skin1004 vám doporučuji zejména pro zmírnění kruhů pod očima. 
    Navíc působí skvěle i jako prevence drobných vrásek kolem očí.
                </>
              )}
          </p>
        )}
      </div>

      <button
  onClick={() => window.location.href = isDermatitis 
    ? 'https://www.kailu.cz' 
    : `${SHOP_BASE_URL}${PRODUCT_URLS[result.recommendedSet.split(' + ')[0]]}`
  }
  className="w-full py-3 bg-[#f1eae2] hover:bg-[#e5ddd4] transition-colors duration-200 rounded-lg text-black font-medium"
>
  {isDermatitis ? 'Objednat se' : 'Pokračovat'}
</button>
    </div>
  );
}

 return (
  <>

   <div className="min-h-screen bg-gray-50 py-8 px-4 container mx-auto max-w-[950px]">
     <Card className="min-h-screen bg-gray-50 py-8 px-4 max-w-[800px] mx-auto">
       <CardContent className="p-4">
         <SectionHeader currentQuestion={currentQuestion} />
         <div className={`mb-6 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
         <h2 className="text-md font-bold mb-2 text-gray-900">
  {currentQ.title}
</h2>

           {currentQ.type === 'info' ? (
             <div className="space-y-10">
               <p className="text-sm leading-[1.8]">{currentQ.content}</p>
               <div className="flex justify-end mt-6">
                 <CustomButton
                   onClick={() => handleQuestionChange(currentQuestion + 1)}
                 >
                   {currentQ.buttonText || 'Další'}
                 </CustomButton>
               </div>
             </div>
           ) : currentQ.type === 'checkbox' ? (
             <div className="space-y-1">
               {currentQ.options.map((option, index) => (
                 <div key={index} className="flex items-start space-x-3 py-2 relative group">
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
                     className="text-sm cursor-pointer leading-[1.8] "
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
             <div className="space-y-1">
               {currentQ.images ? (
                 <div className="flex flex-wrap gap-4">
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
                             layout="responsive" // Dynamická velikost
                width={1} // Poměr stran
                height={1} // Poměr stran (čtverec díky "aspect-square")
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
                           <div className="flex items-start space-x-2">
                             <RadioGroupItem
                               value={currentQ.options[index]}
                               id={`option-${index}`}
                             />
                             <Label
                               htmlFor={`option-${index}`}
                               className="text-sm cursor-pointer leading-[1.8] "
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
                className="space-y-2"
              >
                {currentQ.options.map((option, index) => (
                  <div key={index} className="flex flex-col w-full">
                    <div className="flex items-start space-x-2 py-2">
                      <RadioGroupItem
                        value={option}
                        id={`option-${index}`}
                      />
                      <Label
                        htmlFor={`option-${index}`}
                        className="text-sm cursor-pointer leading-[1.8] text-gray-900 dark:text-gray-200"
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