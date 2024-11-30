import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { RESULT_TEXTS } from './QuizEvaluation';

type QuizResultsProps = {
  results: {
    skinType: string;
    recommendedSet: string;
    problems: string[];
    specialRecommendations: {
      hasPigmentation: boolean;
      hasUndereyeCircles: boolean;
      antiAgeSuggested: boolean;
    };
  };
  onContinue: () => void;
};

const SHOP_BASE_URL = 'https://www.kailushop.com/';
const PRODUCT_URLS = {
  'Suchá základ': 'zakladni-sada-pro-suchou-plet',
  'Suchá komplet': 'kompletni-sada-pro-suchou-plet',
  'Suchá a normální Anti-age': 'anti-age-sada-pro-normalni-a-suchou-plet',
  'Suchá základ + Sem tam pupínek': 'zakladni-sada-pro-suchou-plet',
  'M+SM základ': 'zakladni-sada-pro-mastnou-a-smisenou-plet',
  'M+SM komplet': 'kompletni-sada-pro-mastnou-a-smisenou-plet',
  'M+SM komplet + Sem tam pupínek': 'kompletni-sada-pro-mastnou-a-smisenou-plet',
  'M+SM Anti-age': 'anti-age-sada-pro-mastnou-a-smisenou-plet',
  'Normální komplet': 'kompletni-sada-pro-normalni-plet',
  'Normální základ': 'zakladni-sada-pro-normalni-plet',
  'Normální základ + Sem tam pupínek': 'zakladni-sada-pro-normalni-plet',
  'Citlivá': 'sada-pro-citlivou-plet',
  'Citlivá + Sem tam pupínek': 'sada-pro-citlivou-plet',
  'Kuperóza': 'pece-o-plet-s-kuperozou',
  'Problém: AKNÉ': 'sada-pro-problematickou-plet'
};

const getSetUrl = (setName: string) => {
  if (setName === 'Dermatitida') {
    return 'https://www.kailu.cz';
  }
  const productPath = PRODUCT_URLS[setName];
  return productPath ? `${SHOP_BASE_URL}${productPath}` : '#';
};

const QuizResults: React.FC<QuizResultsProps> = ({ results, onContinue }) => {
  const {
    skinType,
    recommendedSet,
    problems,
    specialRecommendations
  } = results;

  const isDermatitis = recommendedSet === 'Dermatitida';

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-center text-2xl font-semibold mb-8">
        🦋 VAŠE VÝSLEDKY 🦋
      </h1>
      
      <p className="mb-4">
        Vaše pleť je <span className="font-semibold">{skinType}</span>.
        <a href="#" className="text-gray-600 hover:text-gray-800 ml-1">
          Pokud se chcete dozvědět více, koukněte se tady
        </a>.
      </p>

      {!isDermatitis && (
        <Card className="bg-[#f1eae2] mb-6">
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4">
              Doporučená péče: {' '}
              <a 
                href={getSetUrl(recommendedSet)} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 underline"
              >
                {recommendedSet}
              </a>
            </h2>
            {problems.includes('Kruhy pod očima') && (
              <p className="mb-2">
                Doplňkový produkt: {' '}
                <a 
                  href="https://www.kailushop.cz/ocni-krem" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-gray-900 underline"
                >
                  Oční krém
                </a>
              </p>
            )}
          </CardContent>
        </Card>
      )}

      <div className="space-y-4 mb-8">
        <p>{RESULT_TEXTS[recommendedSet]}</p>
        
        {!isDermatitis && specialRecommendations.hasPigmentation && (
          <p className="mt-4">
            Pro pigmentové skvrny doporučujeme chemický peeling.
            Více informací najdete na našem webu.
          </p>
        )}
        
        {!isDermatitis && specialRecommendations.hasUndereyeCircles && (
          <p className="mt-4">
            {specialRecommendations.antiAgeSuggested
              ? 'Krém na kruhy pod očima je již součástí vaší anti-age sady.'
              : 'Pro zmírnění kruhů pod očima vám doporučuji přihodit do košíku skvělý oční krém od korejské značky Skin1004.'}
          </p>
        )}
      </div>

      <button
        onClick={onContinue}
        className="w-full py-3 bg-[#f1eae2] hover:bg-[#e5ddd4] transition-colors duration-200 rounded-lg text-black font-medium"
      >
        {isDermatitis ? 'Objednat se' : 'Pokračovat'}
      </button>
    </div>
  );
};

export default QuizResults;