
import React, { useState } from 'react';
import { Card, CardContent } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Search } from 'lucide-react';
import { evaluateQuiz, type QuizResult } from './QuizEvaluation';
import { runTests } from './QuizEvaluation.test';
import QuizResults from './QuizResults';


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
    { text: 'Pigmentové skvrny nebo jizvy po akné', image: 'https://www.kailushop.cz/user/documents/upload/skvrny.png' },
    { text: 'Kruhy pod očima', image: 'https://www.kailushop.cz/user/documents/upload/kruhy.png' },
    { text: 'Vrásky', image: 'https://www.kailushop.cz/user/documents/upload/vrasky.png' },
    { text: 'Sem tam pupínek', image: 'https://www.kailushop.cz/user/documents/upload/pupinek.png' },
    { text: 'Akné (více než 5 pupínků🤫)', image: 'https://www.kailushop.cz/user/documents/upload/akne.png' },
    { text: 'Rozšířené póry / černé tečky', image: 'https://www.kailushop.cz/user/documents/upload/cernetecky.png' },
    { text: 'Dermatitida', image: 'https://www.kailushop.cz/user/documents/upload/dermatitida.png' },
    { text: 'Kuperóza ("popraskané žilky")', image: 'https://www.kailushop.cz/user/documents/upload/kuperoza.png' }
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
  title: 'Balíček na míru už se chystá. 🎁 Ale peníze bohužel ani v našem rybníku nerostou, proto se vás ještě zeptáme na váš rozpočet.',
  type: 'info',
  section: 'budget',
  content: 'Jedná se o částku, kterou plánujete investovat do své skin-care na následující 2-3 měsíce. Spotřeba produktů se u zákaznic mírně liší, záleží na konkrétní sadě a především na způsobu používání.',
  buttonText: 'Jdeme na to!'
},
{
  id: 'budget-limit',
  title: 'Kolik byste chtěl/a maximálně utratit za vaši novou pleťovou péči?',
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
     <h1 className="text-base font-semibold flex items-center">
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
       <Card className="min-h-screen bg-gray-50 py-8 px-4 max-w-[800px] mx-auto">
         <CardContent className="p-4">
           <SectionHeader currentQuestion={currentQuestion} />
           <div className="space-y-1">
             {INTRO_TEXT.paragraphs.map((paragraph, index) => (
               <p key={index} className="text-sm leading-[1.8]">{paragraph}</p>
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

 if (result) {
  return (
    <QuizResults 
      results={result}
      onContinue={() => window.location.href = getSetUrl(result.recommendedSet)}
    />
  );
}
            {/* Speciální doporučení */}
            {(result.specialRecommendations.hasPigmentation || 
              result.specialRecommendations.hasUndereyeCircles) && (
              <div className="mt-6">
                <p className="text-lg font-semibold">Speciální doporučení:</p>
                {result.specialRecommendations.hasPigmentation && (
                  <p className="mt-2">Pro pigmentové skvrny doporučujeme chemický peeling. 
                    Více informací najdete na našem webu.</p>
                )}
                {result.specialRecommendations.hasUndereyeCircles && (
                  <p className="mt-2">
                    {result.specialRecommendations.antiAgeSuggested 
                      ? 'Krém na kruhy pod očima je již součástí vaší anti-age sady.'
                      : 'Pro zmírnění kruhů pod očima vám doporučuji přihodit do košíku skvělý oční krém od korejské značky Skin1004.'}
                  </p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

 return (
  <>
    {process.env.NODE_ENV === 'development' && (
      <button
        onClick={runTests}
        className="fixed top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Spustit testy
      </button>
    )}
   <div className="min-h-screen bg-gray-50 py-8 px-4 container mx-auto max-w-[950px]">
     <Card className="min-h-screen bg-gray-50 py-8 px-4 max-w-[800px] mx-auto">
       <CardContent className="p-4">
         <SectionHeader currentQuestion={currentQuestion} />
         <div className={`mb-6 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
           <h2 className="text-md font-bold mb-2">
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
                     className="text-sm cursor-pointer leading-[1.8] transition-colors duration-200 hover:text-gray-800"
                   >
                     {typeof option === 'object' ? option.text : option}
                   </Label>
                   {/* Hover obrázek */}
<div className="absolute left-full ml-4 hidden group-hover:block transition-opacity duration-300">
{typeof option === 'object' && option.image && (
    <img
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
                     <div key={index} className="flex flex-col w-[200px]">
                       <div
                         className="relative aspect-square group"
                         onMouseEnter={() => setHoveredImage(index)}
                         onMouseLeave={() => setHoveredImage(null)}
                       >
                         <div className="relative overflow-hidden rounded-lg h-full">
                           <img
                             src={image.url}
                             alt={image.alt}
                             className={`w-full h-full object-cover transition-transform duration-200 ${
                               hoveredImage === index ? 'scale-125' : 'scale-100'
                             }`}
                           />
                           {hoveredImage === index && (
                             <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                               <Search className="w-8 h-8 text-white" />
                             </div>
                           )}
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
                               className="text-sm cursor-pointer leading-[1.8]"
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
                   className="space-y-1"
                 >
                   {currentQ.options.map((option, index) => (
                     <div key={index} className="flex items-start space-x-3 py-2 transition-all duration-200 hover:translate-x-0.5">
                       <RadioGroupItem 
                         value={option} 
                         id={`option-${index}`}
                         className="mt-0.5"
                       />
                       <Label
                         htmlFor={`option-${index}`}
                         className="text-sm cursor-pointer leading-[1.8] transition-colors duration-200 hover:text-gray-800"
                       >
                         {option}
                       </Label>
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