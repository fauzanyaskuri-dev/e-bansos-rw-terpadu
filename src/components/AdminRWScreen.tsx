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
  CartesianGrid 
} from 'recharts';

interface AdminRWScreenProps {
  applicants: BansosApplicant[];
  onUpdateStatusRW: (id: string, status: 'Disetujui' | 'Ditolak') => void;
  onNavigate: (screen: ScreenType) => void;
  onLogout: () => void;
}

export const AdminRWScreen: React.FC<AdminRWScreenProps> = ({ applicants, onUpdateStatusRW, onNavigate, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const filteredApplicants = applicants.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.nik.includes(searchQuery)
  );

  const totalCount = applicants.length + 18; // base mock + new
  const menungguCount = applicants.filter(a => a.statusRW === 'Menunggu').length;
  const disetujuiCount = applicants.filter(a => a.statusRW === 'Disetujui').length;
  const ditolakCount = applicants.filter(a => a.statusRW === 'Ditolak').length;

  // Aggregate status counts (Pending, Approved, Rejected) by RT area for Recharts BarChart
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

  const handleApproveRW = (id: string) => {
    onUpdateStatusRW(id, 'Disetujui');
  };

  const handleRejectRW = (id: string) => {
    onUpdateStatusRW(id, 'Ditolak');
  };

  const handleExportPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      window.print();
      return;
    }
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Laporan Validasi RW 03 - Bantuan Sosial</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 30px; color: #000; background: #fff; }
            h2 { text-transform: uppercase; font-size: 16px; margin: 0; }
            h1 { text-transform: uppercase; font-size: 20px; margin: 5px 0 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #000; padding: 10px; text-align: left; font-size: 12px; }
            th { background: #f3f4f6; font-weight: bold; }
          </style>
        </head>
        <body>
          <h2>Pemerintah Kota Sejahtera — Sekretariat RW 03</h2>
          <h1>Laporan Validasi Akhir Penerima Bantuan Sosial</h1>
          <p>Tanggal Cetak: ${new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}</p>
          <table>
            <thead>
              <tr>
                <th>NIK</th>
                <th>Nama Warga</th>
                <th>RT</th>
                <th>Status RT</th>
                <th>Status RW</th>
              </tr>
            </thead>
            <tbody>
              ${filteredApplicants.map(item => `
                <tr>
                  <td>${item.nik}</td>
                  <td><b>${item.name}</b><br><small>${item.bansosType}</small></td>
                  <td>0${item.rt}</td>
                  <td>${item.statusRT}</td>
                  <td><b>${item.statusRW}</b></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <script>window.onload = function() { window.print(); };</script>
        </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="bg-[#f8f9fa] text-zinc-900 font-sans flex flex-col md:flex-row min-h-screen w-full relative">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-white border-b-2 border-black p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 border-2 border-black rounded-lg bg-zinc-100 flex items-center justify-center"
          >
            <span className="material-symbols-outlined">{mobileSidebarOpen ? 'close' : 'menu'}</span>
          </button>
          <span className="font-black text-base">Panel RW 03</span>
        </div>
        <button 
          onClick={() => onNavigate('home')}
          className="text-xs font-bold px-3 py-1.5 border-2 border-black rounded-lg bg-amber-300"
        >
          Beranda Utama
        </button>
      </div>

      {/* SideNavBar */}
      <aside className={`bg-white text-black font-sans h-screen w-64 fixed left-0 top-0 border-r-2 border-black flex flex-col p-6 space-y-4 z-50 transition-transform duration-300 md:translate-x-0 ${
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="mb-2 flex justify-between items-start">
          <div>
            <span className="bg-amber-300 border-2 border-black px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider inline-block mb-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Aparat RW
            </span>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-400 text-black border-2 border-black rounded-xl flex items-center justify-center font-black text-base shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                RW
              </div>
              <div>
                <h1 className="text-xl font-black text-black">Panel RW 03</h1>
                <p className="text-zinc-600 font-medium text-xs">Petugas Pengesahan RW</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setMobileSidebarOpen(false)}
            className="md:hidden p-1 text-black font-bold"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl font-bold text-sm transition-all border-2 border-transparent hover:border-black hover:bg-zinc-100"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </button>
          
          <button 
            onClick={() => onNavigate('admin-rt')}
            className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl font-bold text-sm transition-all border-2 border-transparent hover:border-black hover:bg-zinc-100"
          >
            <span className="material-symbols-outlined">fact_check</span>
            <span>Verifikasi RT</span>
          </button>

          <div className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-black text-sm bg-amber-300 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            <span>Validasi RW</span>
          </div>

          <button 
            onClick={() => onNavigate('statistics')}
            className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl font-bold text-sm transition-all border-2 border-transparent hover:border-black hover:bg-zinc-100"
          >
            <span className="material-symbols-outlined">bar_chart</span>
            <span>Statistik</span>
          </button>

          <button 
            onClick={() => onNavigate('settings')}
            className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl font-bold text-sm transition-all border-2 border-transparent hover:border-black hover:bg-zinc-100"
          >
            <span className="material-symbols-outlined">settings</span>
            <span>Pengaturan</span>
          </button>
        </nav>

        <div className="mt-auto space-y-3 pt-4 border-t-2 border-black">
          <button 
            onClick={handleExportPDF}
            className="bold-btn w-full bg-emerald-300 text-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs"
          >
            <span className="material-symbols-outlined text-sm font-bold">download</span>
            Export Laporan PDF
          </button>
          <button 
            onClick={onLogout}
            className="bold-btn w-full flex items-center gap-2 px-4 py-3 bg-rose-300 text-black rounded-xl text-xs justify-center"
          >
            <span className="material-symbols-outlined text-sm font-bold">logout</span>
            <span>Keluar Akun</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-0 md:ml-64 flex-1 p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-8">
        {/* Left Column: Table (70%) */}
        <section className="lg:w-2/3 flex flex-col gap-6">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end pb-6 border-b-2 border-black gap-4">
            <div>
              <span className="bg-amber-300 border-2 border-black px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider inline-block mb-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                Pengesahan RW
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-black">Pengesahan Data Warga</h2>
              <p className="text-zinc-600 font-medium text-xs sm:text-sm mt-1">Validasi akhir penerima Bansos tingkat RW sebelum dikirim ke pusat.</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-grow">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-black">search</span>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari NIK/Nama..." 
                  className="bold-input pl-10 pr-4 text-black text-sm h-12 w-full md:w-64"
                />
              </div>
            </div>
          </header>

          {/* Data Table Card */}
          <div className="bold-card bg-white overflow-hidden flex-1">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-zinc-100 border-b-2 border-black text-black font-black text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 whitespace-nowrap">NIK</th>
                    <th className="px-6 py-4 whitespace-nowrap">Nama Lengkap</th>
                    <th className="px-6 py-4 whitespace-nowrap">RT</th>
                    <th className="px-6 py-4 whitespace-nowrap">Status RT</th>
                    <th className="px-6 py-4 whitespace-nowrap text-right">Aksi RW</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black text-sm font-medium">
                  {filteredApplicants.map((item) => (
                    <tr key={item.id} className="hover:bg-amber-50/50 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-black">{item.nik.slice(0, 10)}...</td>
                      <td className="px-6 py-4 font-black text-black">{item.name}</td>
                      <td className="px-6 py-4 font-bold">0{item.rt}</td>
                      <td className="px-6 py-4">
                        {item.statusRW === 'Disetujui' ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-emerald-300 text-black text-xs font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <span className="material-symbols-outlined text-[14px]">check_circle</span> Disetujui RW
                          </span>
                        ) : item.statusRW === 'Ditolak' ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-rose-300 text-black text-xs font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <span className="material-symbols-outlined text-[14px]">cancel</span> Ditolak RW
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-amber-200 text-black text-xs font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <span className="material-symbols-outlined text-[14px]">pending</span> Menunggu RW
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right flex justify-end gap-2 items-center">
                        {item.statusRT === 'Ditolak' ? (
                          <span className="text-xs font-black text-rose-700 bg-rose-100 px-3 py-1.5 rounded-xl border-2 border-black">
                            Ditolak RT
                          </span>
                        ) : item.statusRW === 'Disetujui' ? (
                          <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl border-2 border-black">
                            Selesai Disetujui
                          </span>
                        ) : item.statusRW === 'Ditolak' ? (
                          <span className="text-xs font-black text-rose-800 bg-rose-100 px-3 py-1.5 rounded-xl border-2 border-black">
                            Ditolak RW
                          </span>
                        ) : (
                          <>
                            <button 
                              onClick={() => handleRejectRW(item.id)}
                              className="bold-btn bg-rose-300 hover:bg-rose-400 text-black px-3 py-1.5 rounded-xl text-xs flex items-center gap-1"
                              title="Tolak"
                            >
                              <span className="material-symbols-outlined text-sm font-bold">block</span> Tolak
                            </button>
                            <button 
                              onClick={() => handleApproveRW(item.id)}
                              className="bold-btn bg-emerald-300 hover:bg-emerald-400 text-black px-3 py-1.5 rounded-xl text-xs flex items-center gap-1"
                              title="Setujui Bansos"
                            >
                              <span className="material-symbols-outlined text-sm font-bold">thumb_up</span> Setujui
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Dummy */}
            <div className="px-6 py-4 bg-zinc-50 border-t-2 border-black flex justify-between items-center text-xs font-bold text-zinc-700">
              <span>Menampilkan 1-4 dari 24 data</span>
              <div className="flex gap-2">
                <button className="bold-btn w-8 h-8 rounded-lg bg-white flex items-center justify-center opacity-50" disabled><span className="material-symbols-outlined text-sm">chevron_left</span></button>
                <button className="bold-btn w-8 h-8 rounded-lg bg-amber-400 text-black text-xs flex items-center justify-center">1</button>
                <button className="bold-btn w-8 h-8 rounded-lg bg-white text-xs flex items-center justify-center">2</button>
                <button className="bold-btn w-8 h-8 rounded-lg bg-white text-xs flex items-center justify-center">3</button>
                <button className="bold-btn w-8 h-8 rounded-lg bg-white flex items-center justify-center"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Stats & Recharts Bar Chart (30%) */}
        <section className="lg:w-1/3 flex flex-col gap-6">
          <div className="bold-card bg-white p-6">
            <h3 className="text-lg font-black text-black mb-4 pb-3 border-b-2 border-black flex items-center justify-between">
              <span>Statistik Status per RT</span>
              <span className="text-xs font-bold px-2.5 py-1 bg-amber-300 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">RW 03</span>
            </h3>
            
            {/* Recharts Bar Chart */}
            <div className="w-full h-64 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                  <XAxis dataKey="rt" tick={{ fontSize: 11, fontWeight: 'bold' }} stroke="#000" />
                  <YAxis tick={{ fontSize: 11, fontWeight: 'bold' }} stroke="#000" allowDecimals={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '2px solid #000', borderRadius: '12px', fontWeight: 'bold', fontSize: '12px', boxShadow: '3px 3px 0px 0px rgba(0,0,0,1)' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 'bold', paddingTop: '8px' }} />
                  <Bar dataKey="Menunggu" name="Menunggu" fill="#facc15" stroke="#000" strokeWidth={1.5} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Disetujui" name="Disetujui" fill="#4ade80" stroke="#000" strokeWidth={1.5} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Ditolak" name="Ditolak" fill="#f87171" stroke="#000" strokeWidth={1.5} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Summary Legend / Counts */}
            <div className="space-y-3 mt-6">
              <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-md bg-amber-300 border border-black"></div>
                  <span className="text-xs font-black text-black">Menunggu RW</span>
                </div>
                <span className="text-xs font-black text-black">{applicants.filter(a => a.statusRW === 'Menunggu').length}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-md bg-emerald-400 border border-black"></div>
                  <span className="text-xs font-black text-black">Disetujui RW</span>
                </div>
                <span className="text-xs font-black text-black">{applicants.filter(a => a.statusRW === 'Disetujui').length}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-md bg-rose-400 border border-black"></div>
                  <span className="text-xs font-black text-black">Ditolak RW</span>
                </div>
                <span className="text-xs font-black text-black">{applicants.filter(a => a.statusRW === 'Ditolak').length}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-black">
              <p className="text-xs font-bold text-zinc-600 text-center leading-relaxed">
                Grafik batang rekapitulasi status per RT wilayah RW 03.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
