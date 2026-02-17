"use client";
import React, { useState } from 'react';
import { RESULT_TEXTS, DISPLAY_NAMES } from '../components/QuizEvaluation';
import '../globals.css';

const allSets = [
  'Suchá základ',
  'Suchá a normální Anti-age',
  'Suchá základ + Sem tam pupínek',
  'M+SM základ',
  'M+SM komplet',
  'M+SM komplet + Sem tam pupínek',
  'M+SM Anti-age',
  'Normální základ',
  'Normální základ + Sem tam pupínek',
  'Citlivá',
  'Citlivá + Sem tam pupínek',
  'Kuperóza',
  'Dermatitida',
  'Problém: AKNÉ'
];

// Mapování sady na typ pleti
const getSkinTypeForSet = (setName: string) => {
  if (setName.includes('Suchá')) return 'suchá';
  if (setName.includes('M+SM') || setName.includes('Mastná')) return 'smíšená';
  if (setName.includes('Normální')) return 'normální';
  if (setName.includes('Citlivá')) return 'citlivá';
  if (setName.includes('Kuperóza')) return 'citlivá se sklonem k začervenání';
  if (setName.includes('Dermatitida')) return 'citlivá';
  if (setName.includes('AKNÉ')) return 'mastná';
  return 'smíšená';
};

export default function TestResults() {
  const [selectedSet, setSelectedSet] = useState<string | null>(null);

  const getResultText = (setName: string) => {
    const text = RESULT_TEXTS[setName];
    const skinType = getSkinTypeForSet(setName);
    
    const testAnswers = {
      'skin-description': 'Dost se mastí, tváře ale o něco méně, než zbytek obličeje',
      'cosmetic-compatibility': ['Většina kosmetických přípravků mi sedne.'],
      'wish-fish': 'Chci zpomalit stárnutí.'
    };
    
    const testResult = {
      skinType: skinType,
      recommendedSet: setName,
      problems: [],
      specialRecommendations: {}
    };
    
   if (typeof text === 'function') {
  try {
    return text(testAnswers, testResult);
  } catch (e) {
    return '<p>Chyba při načítání textu</p>';
  }
}

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Test výsledkových stránek</h1>
      
      {/* Výběr sady */}
      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="font-semibold mb-3">Vyber sadu:</h2>
        <div className="flex flex-wrap gap-2">
          {allSets.map((setName) => (
            <button
              key={setName}
              onClick={() => setSelectedSet(setName)}
              className={`px-3 py-1 rounded text-sm ${
                selectedSet === setName 
                  ? 'bg-[#faa4a6] text-white' 
                  : 'bg-white border border-gray-300 hover:border-[#faa4a6]'
              }`}
            >
              {setName}
            </button>
          ))}
        </div>
      </div>

      {/* Zobrazení vybrané sady */}
      {selectedSet && (
        <div className="border-2 border-[#faa4a6] rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-500">
            {selectedSet}
          </h2>
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Vaše pleť je {getSkinTypeForSet(selectedSet)}.
          </p>
          <div 
            dangerouslySetInnerHTML={{ __html: getResultText(selectedSet) || '<p>Text nenalezen</p>' }} 
          />
        </div>
      )}

      {/* Zobrazit všechny najednou */}
      <div className="mt-8">
        <button
          onClick={() => setSelectedSet(null)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 mb-4"
        >
          Zobrazit všechny
        </button>

        {!selectedSet && (
          <div className="space-y-8">
            {allSets.map((setName) => (
              <div key={setName} className="border rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4 text-[#faa4a6]">
                  {setName}
                </h2>
                <p style={{ fontFamily: 'Cinzel, serif', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                  Vaše pleť je {getSkinTypeForSet(setName)}.
                </p>
                <div 
                  dangerouslySetInnerHTML={{ __html: getResultText(setName) || '<p>Text nenalezen</p>' }} 
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}