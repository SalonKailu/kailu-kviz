'use client';

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<any>(null);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/analytics');
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const parseJson = (str: any) => {
    if (!str) return {};
    if (typeof str === 'object') return str;
    try { return JSON.parse(str); } catch (e) { return {}; }
  };

  const totalSessions = data.length;
  const completedSessions = data.filter(d => d.step === 'completed').length;
  const completionRate = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;

  if (loading) return <div className="p-8 text-center font-sans">Načítání analytiky...</div>;

  return (
    <div className="p-8 font-sans bg-white min-h-screen text-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-black uppercase tracking-tight">Přehled Analytiky</h1>
          <button onClick={fetchData} className="text-sm font-bold border-2 border-gray-900 px-4 py-2 hover:bg-gray-900 hover:text-white transition-all">
            AKTUALIZOVAT
          </button>
        </div>

        {/* STATISTIKY - SVĚTLÉ */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          <div className="border-l-4 border-gray-900 pl-4 py-2">
            <p className="text-[10px] uppercase font-black text-gray-400">Celkem průchodů</p>
            <p className="text-3xl font-black">{totalSessions}</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4 py-2">
            <p className="text-[10px] uppercase font-black text-gray-400">Dokončeno</p>
            <p className="text-3xl font-black text-green-600">{completedSessions}</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <p className="text-[10px] uppercase font-black text-gray-400">Úspěšnost</p>
            <p className="text-3xl font-black text-blue-600">{completionRate}%</p>
          </div>
        </div>

        {/* TABULKA S NOVÝM SLOUPCEM */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-900 text-[11px] uppercase font-black text-gray-500">
                <th className="py-4 px-2">Datum</th>
                <th className="py-4 px-2">Stav</th>
                <th className="py-4 px-2">Doporučení</th>
                <th className="py-4 px-2">Slevový kód</th>
                <th className="py-4 px-2 text-right">Akce</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((entry) => {
                const res = parseJson(entry.result);
                return (
                  <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-2 text-sm">
                      {new Date(entry.timestamp).toLocaleString('cs-CZ')}
                    </td>
                    <td className="py-4 px-2">
                      <span className={`text-[10px] font-black px-2 py-1 rounded ${
                        entry.step === 'completed' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {entry.step === 'completed' ? 'DOKONČENO' : `KROK ${entry.step}`}
                      </span>
                    </td>
                    <td className="py-4 px-2 font-bold text-sm">
                      {res.recommendedSet || '—'}
                    </td>
                    <td className="py-4 px-2 font-mono font-bold text-blue-600">
                      {entry.discount_code || '—'}
                    </td>
                    <td className="py-4 px-2 text-right">
                      <button 
                        onClick={() => setSelectedEntry(entry)} 
                        className="text-[10px] font-black border-b-2 border-gray-900 pb-0.5 hover:text-gray-500 hover:border-gray-500 transition-all"
                      >
                        DETAIL
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL MODAL - SVĚTLÝ A PŘEHLEDNÝ */}
      {selectedEntry && (() => {
        const answers = parseJson(selectedEntry.answers);
        const result = parseJson(selectedEntry.result);
        
        return (
          <div className="fixed inset-0 bg-white/95 backdrop-blur-md flex flex-col p-8 md:p-16 z-50 overflow-y-auto">
            <div className="max-w-4xl mx-auto w-full">
              <div className="flex justify-between items-center mb-12 border-b border-gray-200 pb-6">
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter">Analýza záznamu</h2>
                  <p className="text-xs font-bold text-gray-400 mt-1">ID: {selectedEntry.session_id}</p>
                </div>
                <button onClick={() => setSelectedEntry(null)} className="text-5xl font-light hover:rotate-90 transition-transform">✕</button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                {/* LEVÝ SLOUPEC: VÝSLEDKY */}
                <div className="space-y-8">
                  <section>
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-blue-500 mb-4">Závěrečné vyhodnocení</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase text-gray-400">Doporučená sada</p>
                        <p className="text-2xl font-black text-gray-900">{result.recommendedSet || '—'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase text-gray-400">Zjištěný typ pleti</p>
                        <p className="text-2xl font-black text-gray-900">{result.skinType || '—'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase text-gray-400">Použitý slevový kód</p>
                        <p className="text-2xl font-black text-blue-600">{selectedEntry.discount_code || '—'}</p>
                      </div>
                    </div>
                  </section>

                  <section className="pt-8 border-t border-gray-100">
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-4">Technické parametry</h3>
                    <p className="text-xs font-bold">IP: {selectedEntry.client_ip || '—'}</p>
                    <p className="text-xs font-bold mt-1 text-gray-500">Čas: {new Date(selectedEntry.timestamp).toLocaleString('cs-CZ')}</p>
                  </section>
                </div>

                {/* PRAVÝ SLOUPEC: ODPOVĚDI */}
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-6">Odpovědi respondenta</h3>
                  <div className="space-y-4">
                    {Object.entries(answers).map(([key, value]: [string, any]) => (
                      <div key={key} className="border-b border-gray-200 pb-2">
                        <span className="text-[9px] font-black uppercase text-gray-400 block mb-1">{key}</span>
                        <span className="font-bold text-sm text-gray-800 leading-tight">
                          {Array.isArray(value) ? value.join(', ') : String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <button 
                  onClick={() => setSelectedEntry(null)} 
                  className="bg-gray-900 text-white px-16 py-4 font-black uppercase text-xs tracking-widest hover:bg-black transition-all"
                >
                  ZAVŘÍT DETAIL
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}