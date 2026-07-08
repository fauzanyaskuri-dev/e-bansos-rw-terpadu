import React, { useState } from 'react';
import { ScreenType, BansosApplicant } from '../types';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface StatisticsScreenProps {
  applicants: BansosApplicant[];
  onNavigate: (screen: ScreenType) => void;
}

export const StatisticsScreen: React.FC<StatisticsScreenProps> = ({ applicants, onNavigate }) => {
  const [selectedRtFilter, setSelectedRtFilter] = useState<string>('all');

  // Filtered applicants
  const filteredApplicants = selectedRtFilter === 'all' 
    ? applicants 
    : applicants.filter(a => a.rt === selectedRtFilter);

  // Aggregate by RT for BarChart
  const rtMap: Record<string, { rt: string; Menunggu: number; Disetujui: number; Ditolak: number }> = {};
  ['1', '2', '3', '4', '5'].forEach(rtNum => {
    rtMap[rtNum] = { rt: `RT 0${rtNum}`, Menunggu: 0, Disetujui: 0, Ditolak: 0 };
  });

  applicants.forEach(item => {
    const rtKey = item.rt || '1';
    if (!rtMap[rtKey]) {
      rtMap[rtKey] = { rt: `RT 0${rtKey}`, Menunggu: 0, Disetujui: 0, Ditolak: 0 };
    }
    if (item.statusRW === 'Disetujui') {
      rtMap[rtKey].Disetujui += 1;
    } else if (item.statusRW === 'Ditolak') {
      rtMap[rtKey].Ditolak += 1;
    } else {
      rtMap[rtKey].Menunggu += 1;
    }
  });

  const chartData = Object.values(rtMap);

  // Aggregate by Bansos Type for PieChart
  const typeMap: Record<string, number> = {};
  applicants.forEach(item => {
    const t = item.bansosType || 'Sembako Reguler';
    typeMap[t] = (typeMap[t] || 0) + 1;
  });

  const pieData = Object.keys(typeMap).map(key => ({
    name: key,
    value: typeMap[key]
  }));

  const COLORS = ['#facc15', '#4ade80', '#60a5fa', '#f87171', '#c084fc'];

  const totalCount = applicants.length;
  const approvedCount = applicants.filter(a => a.statusRW === 'Disetujui').length;
  const rejectedCount = applicants.filter(a => a.statusRW === 'Ditolak').length;
  const pendingCount = applicants.filter(a => a.statusRW === 'Menunggu').length;

  return (
    <div className="min-h-screen bg-zinc-50 pb-16">
      {/* Header Banner */}
      <div className="bg-black text-white py-12 px-6 border-b-2 border-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-amber-300 text-black px-3 py-1 rounded-lg text-xs font-black border border-black">
              <span className="material-symbols-outlined text-sm">analytics</span>
              <span>STATISTIK &amp; ANALITIK RW 03</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Rekapitulasi Data Bantuan Sosial
            </h1>
            <p className="text-sm font-semibold text-zinc-300 max-w-2xl leading-relaxed">
              Analisis real-time penerima bantuan sosial beras, PKH, BLT, dan sembako terpadu di wilayah RW 03.
            </p>
          </div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="bold-btn bg-amber-400 text-black px-6 py-3 rounded-xl text-sm font-black flex items-center gap-2"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span>Kembali ke Dashboard</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-10">
        {/* Filter Bar */}
        <div className="bold-card bg-white p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined">filter_alt</span>
            <span className="font-black text-sm">Filter Wilayah RT:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['all', '1', '2', '3', '4', '5'].map(rt => (
              <button
                key={rt}
                onClick={() => setSelectedRtFilter(rt)}
                className={`bold-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-black ${
                  selectedRtFilter === rt ? 'bg-black text-white' : 'bg-zinc-100 text-black hover:bg-zinc-200'
                }`}
              >
                {rt === 'all' ? 'Semua RT (RW 03)' : `RT 0${rt}`}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bold-card bg-white p-5">
            <p className="text-xs font-black text-zinc-500 uppercase">Total Warga</p>
            <h3 className="text-2xl sm:text-3xl font-black text-black mt-1">
              {filteredApplicants.length}
            </h3>
            <span className="text-xs font-bold text-zinc-600">Pengajuan terdaftar</span>
          </div>

          <div className="bold-card bg-emerald-100 p-5 border-2 border-black">
            <p className="text-xs font-black text-emerald-900 uppercase">Disetujui RW</p>
            <h3 className="text-2xl sm:text-3xl font-black text-black mt-1">
              {filteredApplicants.filter(a => a.statusRW === 'Disetujui').length}
            </h3>
            <span className="text-xs font-bold text-emerald-800">Penerima sah</span>
          </div>

          <div className="bold-card bg-amber-100 p-5 border-2 border-black">
            <p className="text-xs font-black text-amber-900 uppercase">Menunggu</p>
            <h3 className="text-2xl sm:text-3xl font-black text-black mt-1">
              {filteredApplicants.filter(a => a.statusRW === 'Menunggu').length}
            </h3>
            <span className="text-xs font-bold text-amber-800">Proses verifikasi</span>
          </div>

          <div className="bold-card bg-rose-100 p-5 border-2 border-black">
            <p className="text-xs font-black text-rose-900 uppercase">Ditolak</p>
            <h3 className="text-2xl sm:text-3xl font-black text-black mt-1">
              {filteredApplicants.filter(a => a.statusRW === 'Ditolak').length}
            </h3>
            <span className="text-xs font-bold text-rose-800">Tidak memenuhi syarat</span>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart by RT */}
          <div className="bold-card bg-white p-6 sm:p-8 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b-2 border-black">
              <div>
                <h3 className="text-lg font-black text-black">Distribusi Status per Wilayah RT</h3>
                <p className="text-xs font-bold text-zinc-600">Perbandingan status Menunggu, Disetujui, dan Ditolak</p>
              </div>
              <span className="text-xs font-black px-2.5 py-1 bg-amber-300 border-2 border-black rounded-lg">Bar Chart</span>
            </div>

            <div className="w-full h-80 pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                  <XAxis dataKey="rt" tick={{ fontSize: 12, fontWeight: 'bold' }} stroke="#000" />
                  <YAxis tick={{ fontSize: 12, fontWeight: 'bold' }} stroke="#000" allowDecimals={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '2px solid #000', borderRadius: '12px', fontWeight: 'bold', fontSize: '12px', boxShadow: '3px 3px 0px 0px rgba(0,0,0,1)' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', paddingTop: '10px' }} />
                  <Bar dataKey="Menunggu" name="Menunggu" fill="#facc15" stroke="#000" strokeWidth={1.5} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Disetujui" name="Disetujui" fill="#4ade80" stroke="#000" strokeWidth={1.5} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Ditolak" name="Ditolak" fill="#f87171" stroke="#000" strokeWidth={1.5} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Program Distribution */}
          <div className="bold-card bg-white p-6 sm:p-8 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b-2 border-black">
              <div>
                <h3 className="text-lg font-black text-black">Jenis Bantuan Sosial RW 03</h3>
                <p className="text-xs font-bold text-zinc-600">Proporsi jenis program bantuan yang diajukan warga</p>
              </div>
              <span className="text-xs font-black px-2.5 py-1 bg-emerald-300 border-2 border-black rounded-lg">Program</span>
            </div>

            <div className="space-y-4 pt-4">
              {pieData.map((item, idx) => {
                const percentage = totalCount > 0 ? Math.round((item.value / totalCount) * 100) : 0;
                return (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-black">
                      <span>{item.name}</span>
                      <span>{item.value} Warga ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-zinc-200 h-4 rounded-lg border-2 border-black overflow-hidden">
                      <div 
                        className="h-full border-r-2 border-black" 
                        style={{ 
                          width: `${percentage}%`, 
                          backgroundColor: COLORS[idx % COLORS.length] 
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-zinc-50 rounded-xl border-2 border-black mt-6 space-y-2">
              <div className="font-black text-xs text-black flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-500">info</span>
                <span>Catatan Distribusi Bantuan</span>
              </div>
              <p className="text-xs font-semibold text-zinc-600">
                Penyaluran bantuan dikoordinasikan langsung oleh Pengurus RW 03 bersama kelurahan setempat berdasarkan SK Kemensos dan data Pensasaran Percepatan Penghapusan Kemiskinan Ekstrem (P3KE).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
