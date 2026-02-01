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

  if (loading) return <div className="p-8 text-center font-sans">Načítání...</div>;

  return (
    <div className="p-4 md:p-8 font-sans bg-gray-50 min-h-screen text-black">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black mb-8 uppercase tracking-tighter">Admin Panel</h1>

        {/* STATISTIKY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Průchodů</p>
            <p className="text-4xl font-black">{totalSessions}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Dokončeno</p>
            <p className="text-4xl font-black text-green-600">{completedSessions}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Míra dokončení</p>
            <p className="text-4xl font-black text-blue-600">{completionRate}%</p>
          </div>
        </div>

        {/* TABULKA */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="p-4 font-black uppercase text-[11px]">Datum</th>
                <th className="p-4 font-black uppercase text-[11px]">Stav</th>
                <th className="p-4 font-black uppercase text-[11px]">Slevový kód</th>
                <th className="p-4 font-black uppercase text-[11px]">Akce</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry) => (
                <tr key={entry.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="p-4">{new Date(entry.timestamp).toLocaleString('cs-CZ')}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black ${entry.step === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {entry.step === 'completed' ? 'DOKONČENO' : `KROK: ${entry.step}`}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-blue-600 font-mono">{entry.discount_code || '-'}</td>
                  <td className="p-4">
                    <button onClick={() => setSelectedEntry(entry)} className="bg-black text-white px-4 py-1.5 rounded-lg font-bold text-[10px] hover:scale-105 transition-transform">DETAIL</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL MODAL */}
      {selectedEntry && (() => {
        const answers = parseJson(selectedEntry.answers);
        const result = parseJson(selectedEntry.result);
        
        return (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
              <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                <h2 className="text-xl font-black uppercase">Detail respondenta</h2>
                <button onClick={() => setSelectedEntry(null)} className="text-3xl font-light">×</button>
              </div>
              
              <div className="p-6 overflow-y-auto space-y-6">
                {/* HLAVNÍ VÝSLEDEK - Zde jsou ty zmizelé sady a typ pleti */}
                <div className="bg-black text-white p-6 rounded-2xl shadow-xl">
                  <h3 className="text-[10px] font-black uppercase mb-4 tracking-widest opacity-60">Závěr kvízu</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-50">Doporučená sada</p>
                      <p className="text-lg font-black">{result.recommendedSet || 'Nenalezeno'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-50">Typ pleti</p>
                      <p className="text-lg font-black">{result.skinTypeName || 'Nenalezeno'}</p>
                    </div>
                  </div>
                </div>

                {/* ODPOVĚDI NA OTÁZKY */}
                <div className="space-y-2">
                  <h3 className="text-xs font-black text-gray-400 uppercase mb-3 tracking-widest">Kompletní odpovědi</h3>
                  {Object.entries(answers).map(([key, value]: [string, any]) => (
                    <div key={key} className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm flex justify-between items-center">
                      <p className="text-[10px] font-black text-gray-400 uppercase w-1/3">{key}</p>
                      <p className="text-sm font-bold text-gray-800 w-2/3 text-right">
                        {Array.isArray(value) ? value.join(', ') : String(value)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* TECHNICKÉ INFO */}
                <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-black">IP Adresa</p>
                    <p className="text-xs font-bold">{selectedEntry.client_ip || '-'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-black">Referrer</p>
                    <p className="text-xs font-bold truncate">{selectedEntry.referrer || 'Přímý vstup'}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t bg-gray-50 text-right">
                <button onClick={() => setSelectedEntry(null)} className="bg-black text-white px-10 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors">ZAVŘÍT</button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}