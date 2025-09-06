"use client";
import React, { useState, useEffect } from 'react';

interface QuizAnalytics {
  id: string;
  sessionId: string;
  timestamp: string;
  clientIP: string;
  userAgent: string;
  step: 'started' | 'completed' | 'abandoned';
  answers: any;
  result: any;
  currentQuestion: number;
  url: string;
  referrer: string;
}

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState<QuizAnalytics[]>([]);
  const [filter, setFilter] = useState<'all' | 'started' | 'completed' | 'abandoned'>('all');
  const [sortBy, setSortBy] = useState<'timestamp' | 'ip'>('timestamp');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<QuizAnalytics | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = () => {
    try {
      const data = JSON.parse(localStorage.getItem('quizAnalytics') || '[]');
      setAnalytics(data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    } catch (error) {
      console.error('Chyba při načítání analytics:', error);
    }
  };

  const clearAnalytics = () => {
    if (confirm('Opravdu chcete smazat všechna analytics data?')) {
      localStorage.removeItem('quizAnalytics');
      setAnalytics([]);
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Datum', 'Čas', 'IP adresa', 'Krok', 'Typ pleti', 'Doporučená sada', 'Rozpočet', 'Session ID'].join(','),
      ...filteredAnalytics.map(item => [
        new Date(item.timestamp).toLocaleDateString('cs-CZ'),
        new Date(item.timestamp).toLocaleTimeString('cs-CZ'),
        item.clientIP,
        item.step,
        item.result?.skinType || '',
        item.result?.recommendedSet || '',
        item.answers?.['budget-limit'] || '',
        item.sessionId
      ].map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `quiz-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const filteredAnalytics = analytics.filter(item => {
    if (filter !== 'all' && item.step !== filter) return false;
    if (dateFilter && !item.timestamp.startsWith(dateFilter)) return false;
    return true;
  });

  const stats = {
    total: analytics.length,
    started: analytics.filter(a => a.step === 'started').length,
    completed: analytics.filter(a => a.step === 'completed').length,
    abandoned: analytics.filter(a => a.step === 'abandoned').length,
    conversionRate: analytics.filter(a => a.step === 'started').length > 0 
      ? Math.round((analytics.filter(a => a.step === 'completed').length / analytics.filter(a => a.step === 'started').length) * 100)
      : 0
  };

  const skinTypeStats = analytics
    .filter(a => a.step === 'completed' && a.result?.skinType)
    .reduce((acc, item) => {
      const skinType = item.result.skinType;
      acc[skinType] = (acc[skinType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">📊 Quiz Analytics</h1>
            <div className="flex space-x-2">
              <button
                onClick={loadAnalytics}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                🔄 Aktualizovat
              </button>
              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                📥 Export CSV
              </button>
              <button
                onClick={clearAnalytics}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                🗑️ Smazat vše
              </button>
            </div>
          </div>

          {/* Statistiky */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Celkem událostí</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.started}</div>
              <div className="text-sm text-gray-600">Spuštěných kvízů</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{stats.completed}</div>
              <div className="text-sm text-gray-600">Dokončených</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{stats.abandoned}</div>
              <div className="text-sm text-gray-600">Opuštěných</div>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600">{stats.conversionRate}%</div>
              <div className="text-sm text-gray-600">Míra dokončení</div>
            </div>
          </div>

          {/* Filtry */}
          <div className="flex flex-wrap gap-4 mb-6">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">Všechny události</option>
              <option value="started">Pouze spuštěné</option>
              <option value="completed">Pouze dokončené</option>
              <option value="abandoned">Pouze opuštěné</option>
            </select>
            
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Filtr podle data"
            />
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="timestamp">Řadit podle času</option>
              <option value="ip">Řadit podle IP</option>
            </select>
          </div>

          {/* Statistiky typů pleti */}
          {Object.keys(skinTypeStats).length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Typy pleti (dokončené kvízy)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {Object.entries(skinTypeStats)
                  .sort(([,a], [,b]) => b - a)
                  .map(([skinType, count]) => (
                    <div key={skinType} className="bg-gray-50 p-3 rounded">
                      <div className="font-medium text-sm">{skinType}</div>
                      <div className="text-xl font-bold text-blue-600">{count}x</div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Tabulka */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Datum & Čas</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">IP Adresa</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Krok</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Typ pleti</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Doporučená sada</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rozpočet</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Akce</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAnalytics.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 text-sm">
                      <div>{new Date(item.timestamp).toLocaleDateString('cs-CZ')}</div>
                      <div className="text-gray-500">{new Date(item.timestamp).toLocaleTimeString('cs-CZ')}</div>
                    </td>
                    <td className="px-4 py-3 text-sm font-mono">{item.clientIP}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.step === 'completed' ? 'bg-green-100 text-green-800' :
                        item.step === 'started' ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {item.step === 'completed' ? '✅ Dokončen' :
                         item.step === 'started' ? '🚀 Spuštěn' :
                         '⚠️ Opuštěn'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {item.result?.skinType || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {item.result?.recommendedSet || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {item.answers?.['budget-limit'] || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={() => {
                          setSelectedRecord(item);
                          setShowDetailModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 text-xs"
                      >
                        📋 Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAnalytics.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {analytics.length === 0 ? '📊 Zatím žádná data...' : '🔍 Žádné záznamy neodpovídají filtru'}
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {showDetailModal && selectedRecord && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Detail záznamu</h3>
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Základní informace */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 border-b pb-2">Základní informace</h4>
                  <div><strong>Datum a čas:</strong> {new Date(selectedRecord.timestamp).toLocaleString('cs-CZ')}</div>
                  <div><strong>IP adresa:</strong> {selectedRecord.clientIP}</div>
                  <div><strong>Session ID:</strong> {selectedRecord.sessionId}</div>
                  <div><strong>Krok:</strong> {selectedRecord.step}</div>
                  <div><strong>Aktuální otázka:</strong> {selectedRecord.currentQuestion}</div>
                  <div><strong>URL:</strong> {selectedRecord.url}</div>
                  <div><strong>Referrer:</strong> {selectedRecord.referrer || 'Přímý přístup'}</div>
                  <div><strong>User Agent:</strong> <span className="text-xs text-gray-600 break-all">{selectedRecord.userAgent}</span></div>
                </div>

                {/* Výsledky kvízu */}
                {selectedRecord.result && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 border-b pb-2">Výsledky kvízu</h4>
                    <div><strong>Typ pleti:</strong> {selectedRecord.result.skinType}</div>
                    <div><strong>Doporučená sada:</strong> {selectedRecord.result.recommendedSet}</div>
                    {selectedRecord.result.problems && selectedRecord.result.problems.length > 0 && (
                      <div>
                        <strong>Problémy s pletí:</strong>
                        <ul className="list-disc list-inside mt-1 text-sm">
                          {selectedRecord.result.problems.map((problem, index) => (
                            <li key={index}>{problem}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {selectedRecord.result.specialRecommendations && (
                      <div>
                        <strong>Speciální doporučení:</strong>
                        <ul className="list-disc list-inside mt-1 text-sm">
                          {selectedRecord.result.specialRecommendations.hasPigmentation && <li>Pigmentové skvrny</li>}
                          {selectedRecord.result.specialRecommendations.hasUndereyeCircles && <li>Kruhy pod očima</li>}
                          {selectedRecord.result.specialRecommendations.hasBlackheads && <li>Černé tečky</li>}
                          {selectedRecord.result.specialRecommendations.antiAgeSuggested && <li>Anti-age péče</li>}
                          {selectedRecord.result.specialRecommendations.isPregnant && <li>Těhotenství/kojení</li>}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Odpovědi */}
              {selectedRecord.answers && Object.keys(selectedRecord.answers).length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 border-b pb-2 mb-3">Odpovědi z kvízu</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedRecord.answers).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 p-3 rounded">
                        <div className="font-medium text-sm text-gray-700 mb-1">
                          {key === 'skin-description' ? 'Popis pleti' :
                           key === 'skin-nose' ? 'Nos' :
                           key === 'skin-cheeks' ? 'Tváře' :
                           key === 'cosmetic-compatibility' ? 'Kompatibilita kosmetiky' :
                           key === 'skin' ? 'Problémy s pletí' :
                           key === 'wish-fish' ? 'Přání' :
                           key === 'budget-limit' ? 'Rozpočet' :
                           key}
                        </div>
                        <div className="text-sm">
                          {Array.isArray(value) ? (
                            <ul className="list-disc list-inside">
                              {value.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          ) : (
                            <span>{value}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-6">
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Zavřít
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAnalytics;