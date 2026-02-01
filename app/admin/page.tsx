"use client";
import React, { useState, useEffect } from 'react';

interface QuizAnalytics {
  id: string;
  session_id: string;
  timestamp: string;
  client_ip: string;
  user_agent: string;
  step: 'started' | 'completed' | 'abandoned';
  answers: any;
  result: any;
  discount_code?: string;
  current_question: number;
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

  const loadAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics');
      const data = await response.json();
      setAnalytics(data.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    } catch (error) {
      console.error('Chyba při načítání analytics:', error);
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Datum', 'Čas', 'IP adresa', 'Krok', 'Typ pleti', 'Doporučená sada', 'Rozpočet', 'Slevový kód', 'Session ID'].join(','),
      ...filteredAnalytics.map(item => [
        new Date(item.timestamp).toLocaleDateString('cs-CZ'),
        new Date(item.timestamp).toLocaleTimeString('cs-CZ'),
        item.client_ip, // Opraveno na podtržítko
        item.step,
        item.result?.skinType || '',
        item.result?.recommendedSet || '',
        item.answers?.['budget-limit'] || '',
        item.discount_code || '', // Opraveno na podtržítko
        item.session_id          // Opraveno na podtržítko
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
    started: new Set(analytics.filter(a => a.step === 'started').map(a => a.session_id)).size,
    completed: new Set(analytics.filter(a => a.step === 'completed').map(a => a.session_id)).size,
    abandoned: analytics.filter(a => a.step === 'abandoned').length,
    get conversionRate() {
      return this.started > 0 ? Math.round((this.completed / this.started) * 100) : 0;
    }
  };

  // ... zbytek skinTypeStats zůstává stejný ...
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
          {/* ... Hlavička a Statistiky stejné jako tvůj kód ... */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">📊 Quiz Analytics</h1>
            <div className="flex space-x-2">
              <button onClick={loadAnalytics} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">🔄 Aktualizovat</button>
              <button onClick={exportToCSV} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">📥 Export CSV</button>
            </div>
          </div>

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

          {/* Tabulka s opravenými názvy */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Datum & Čas</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">IP Adresa</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Krok</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Typ pleti</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Sada</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rozpočet</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Slevový kód</th>
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
                    <td className="px-4 py-3 text-sm font-mono">{item.client_ip}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${item.step === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {item.step === 'completed' ? '✅ Dokončen' : '🚀 Spuštěn'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{item.result?.skinType || '-'}</td>
                    <td className="px-4 py-3 text-sm">{item.result?.recommendedSet || '-'}</td>
                    <td className="px-4 py-3 text-sm">{item.answers?.['budget-limit'] || '-'}</td>
                    <td className="px-4 py-3 text-sm font-mono text-blue-600">
                      {item.discount_code || '-'} 
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button onClick={() => { setSelectedRecord(item); setShowDetailModal(true); }} className="text-blue-600 hover:text-blue-800 text-xs">📋 Detail</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal s opravenými názvy */}
        {showDetailModal && selectedRecord && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Detail záznamu</h3>
                <button onClick={() => setShowDetailModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 border-b pb-2">Základní informace</h4>
                  <div><strong>Datum:</strong> {new Date(selectedRecord.timestamp).toLocaleString('cs-CZ')}</div>
                  <div><strong>IP:</strong> {selectedRecord.client_ip}</div>
                  <div><strong>Session ID:</strong> {selectedRecord.session_id}</div>
                  <div><strong>Slevový kód:</strong> <span className="text-blue-600 font-bold">{selectedRecord.discount_code || '-'}</span></div>
                </div>
                {/* ... zbytek modalu s odpověďmi stejný ... */}
              </div>
              <div className="flex justify-end mt-6">
                <button onClick={() => setShowDetailModal(false)} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Zavřít</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAnalytics;