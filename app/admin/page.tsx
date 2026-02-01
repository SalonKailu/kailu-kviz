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
      console.error('Chyba při načítání:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const parseAnswers = (answers: any) => {
    if (!answers) return {};
    if (typeof answers === 'object') return answers;
    try { return JSON.parse(answers); } catch (e) { return {}; }
  };

  // --- VÝPOČET STATISTIK ---
  const totalSessions = data.length;
  const completedSessions = data.filter(d => d.step === 'completed').length;
  const completionRate = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;

  if (loading) return <div className="p-8 text-center font-sans">Načítání analytiky...</div>;

  return (
    <div className="p-4 md:p-8 font-sans bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-black">Quiz Analytics</h1>
          <button onClick={fetchData} className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:opacity-80">
            Aktualizovat data
          </button>
        </div>

        {/* STATISTIKY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 uppercase font-bold mb-1">Celkem průchodů</p>
            <p className="text-4xl font-black">{totalSessions}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 uppercase font-bold mb-1">Dokončeno</p>
            <p className="text-4xl font-black text-green-600">{completedSessions}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 uppercase font-bold mb-1">Míra dokončení</p>
            <p className="text-4xl font-black text-blue-600">{completionRate}%</p>
          </div>
        </div>

        {/* TABULKA */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 font-bold text-sm">Datum a čas</th>
                  <th className="p-4 font-bold text-sm">Stav / Krok</th>
                  <th className="p-4 font-bold text-sm">Slevový kód</th>
                  <th className="p-4 font-bold text-sm">Akce</th>
                </tr>
              </thead>
              <tbody>
                {data.map((entry) => (
                  <tr key={entry.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-sm text-gray-600">
                      {new Date(entry.timestamp).toLocaleString('cs-CZ')}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        entry.step === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {entry.step === 'completed' ? 'DOKONČENO' : `KROK: ${entry.step}`}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-bold text-blue-600">
                      {entry.discount_code || '-'}
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => setSelectedEntry(entry)}
                        className="bg-gray-900 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-black transition-all"
                      >
                        ZOBRAZIT DETAIL
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* DETAIL MODAL */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-black uppercase tracking-tight">Detail analýzy</h2>
              <button onClick={() => setSelectedEntry(null)} className="text-2xl hover:rotate-90 transition-transform">×</button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-2 gap-6 mb-8 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-black mb-1 tracking-widest">Čas záznamu</p>
                  <p className="font-bold">{new Date(selectedEntry.timestamp).toLocaleString('cs-CZ')}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-black mb-1 tracking-widest">Slevový kód</p>
                  <p className="font-bold text-blue-600 text-lg">{selectedEntry.discount_code || 'NEVYGENEROVÁN'}</p>
                </div>
              </div>

              <h3 className="text-sm font-black uppercase mb-4 tracking-widest text-gray-500">Odpovědi respondenta</h3>
              <div className="space-y-3">
                {Object.entries(parseAnswers(selectedEntry.answers)).length > 0 ? (
                  Object.entries(parseAnswers(selectedEntry.answers)).map(([key, value]: [string, any]) => (
                    <div key={key} className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">{key}</p>
                      <p className="text-sm font-bold text-gray-800">
                        {Array.isArray(value) ? value.join(', ') : String(value)}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-400 italic">Data odpovědí nejsou k dispozici.</div>
                )}
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 text-right">
              <button onClick={() => setSelectedEntry(null)} className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform">
                ZAVŘÍT DETAIL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}