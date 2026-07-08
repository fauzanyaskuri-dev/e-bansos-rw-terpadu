import React, { useState } from 'react';
import { ScreenType, BansosApplicant } from '../types';

interface AdminRTScreenProps {
  applicants: BansosApplicant[];
  onUpdateStatus: (id: string, status: 'Disetujui' | 'Ditolak') => void;
  onNavigate: (screen: ScreenType) => void;
  onLogout: () => void;
}

export const AdminRTScreen: React.FC<AdminRTScreenProps> = ({ applicants, onUpdateStatus, onNavigate, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'verifikasi' | 'validasi' | 'statistik' | 'pengaturan'>('verifikasi');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const filteredApplicants = applicants.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.nik.includes(searchQuery)
  );

  const pendingCount = applicants.filter(a => a.statusRT === 'Menunggu').length + 35; // mock total
  const verifiedCount = applicants.filter(a => a.statusRT !== 'Menunggu').length + 83; // mock total

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
          <title>Laporan Verifikasi RT 01 - Bantuan Sosial</title>
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
          <h2>Pemerintah Kota Sejahtera — RT 01 / RW 03</h2>
          <h1>Laporan Verifikasi Data Warga Penerima Bansos</h1>
          <p>Tanggal Cetak: ${new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}</p>
          <table>
            <thead>
              <tr>
                <th>NIK</th>
                <th>Nama Warga</th>
                <th>Pekerjaan</th>
                <th>Pendapatan</th>
                <th>Status RT</th>
              </tr>
            </thead>
            <tbody>
              ${filteredApplicants.map(item => `
                <tr>
                  <td>${item.nik}</td>
                  <td><b>${item.name}</b><br><small>${item.bansosType}</small></td>
                  <td>${item.job}</td>
                  <td>Rp ${item.monthlyIncome.toLocaleString('id-ID')}</td>
                  <td><b>${item.statusRT}</b></td>
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
    <div className="bg-[#f8f9fa] text-zinc-900 font-sans min-h-screen flex flex-col md:flex-row w-full relative">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-white border-b-2 border-black p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 border-2 border-black rounded-lg bg-zinc-100 flex items-center justify-center"
          >
            <span className="material-symbols-outlined">{mobileSidebarOpen ? 'close' : 'menu'}</span>
          </button>
          <span className="font-black text-base">Panel RT 01</span>
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
        <div className="mb-6 flex justify-between items-start">
          <div>
            <span className="bg-amber-300 border-2 border-black px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider inline-block mb-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Aparat RT
            </span>
            <h1 className="text-xl font-black text-black flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl font-black" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              Panel RT 01
            </h1>
            <p className="text-zinc-600 font-medium text-xs mt-1">Petugas Verifikasi Wilayah RT 01</p>
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
            className={`w-full flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl font-bold text-sm transition-all border-2 border-transparent hover:border-black hover:bg-zinc-100`}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </button>
          
          <button 
            onClick={() => { setActiveTab('verifikasi'); setMobileSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl font-bold text-sm transition-all border-2 ${
              activeTab === 'verifikasi' ? 'bg-amber-300 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'border-transparent hover:border-black hover:bg-zinc-100'
            }`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>fact_check</span>
            <span>Verifikasi Data</span>
          </button>

          <button 
            onClick={() => { setActiveTab('validasi'); setMobileSidebarOpen(false); onNavigate('admin-rw'); }}
            className={`w-full flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl font-bold text-sm transition-all border-2 border-transparent hover:border-black hover:bg-zinc-100`}
          >
            <span className="material-symbols-outlined">verified_user</span>
            <span>Validasi RW</span>
          </button>

          <button 
            onClick={() => onNavigate('statistics')}
            className={`w-full flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl font-bold text-sm transition-all border-2 border-transparent hover:border-black hover:bg-zinc-100`}
          >
            <span className="material-symbols-outlined">bar_chart</span>
            <span>Statistik</span>
          </button>

          <button 
            onClick={() => onNavigate('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl font-bold text-sm transition-all border-2 border-transparent hover:border-black hover:bg-zinc-100`}
          >
            <span className="material-symbols-outlined">settings</span>
            <span>Pengaturan</span>
          </button>
        </nav>

        <div className="mt-auto space-y-3 pt-4 border-t-2 border-black">
          <button 
            onClick={handleExportPDF}
            className="bold-btn w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-300 text-black rounded-xl text-xs"
          >
            <span className="material-symbols-outlined text-sm font-bold">download</span>
            Export Laporan PDF
          </button>
          <button 
            onClick={onLogout}
            className="bold-btn w-full flex items-center justify-center gap-2 px-4 py-3 bg-rose-300 text-black rounded-xl text-xs"
          >
            <span className="material-symbols-outlined text-sm font-bold">logout</span>
            <span>Keluar Akun</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-0 md:ml-64 flex-1 p-4 sm:p-8 lg:p-12 bg-[#f8f9fa] min-h-screen">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 sm:mb-10 pb-6 border-b-2 border-black">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-black">Verifikasi Warga RT 01</h2>
            <p className="text-zinc-600 font-medium text-xs sm:text-sm mt-1">Kelola dan validasi data pendaftar bansos di wilayah RT Anda.</p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-black">search</span>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari NIK atau Nama..." 
                className="bold-input pl-10 pr-4 text-black text-sm h-12 w-full md:w-72"
              />
            </div>
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1WTpPiqSfgLhSFe_NKomkTiwurV6X_FefaBNBaYZAvD-GY05nKio1Vvtimy44SWMDD1bS1Tw1AVlnTlECyj7MDMXMI5Pn_wmNrS_kJWod7I8nD7E55ILoec80K9AUz-hkRcJvoejyjXjeeFZUJGqYJ9_OffrHrSZgkW0LpjRwgXvNRc7_bTlXUAiAifVsUawEPNPHf0EwDBsLCmJTd95Rc3Ss7psaE3smEBSVRWNUXHUXwP8rx-EDFQgEAajebB_80UhkHZJv2A78" 
              alt="Avatar"
              className="w-12 h-12 rounded-xl border-2 border-black object-cover shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0 hidden sm:block"
            />
          </div>
        </header>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 sm:mb-10">
          <div className="bold-card p-6 bg-white flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-300 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-black font-black flex-shrink-0">
              <span className="material-symbols-outlined text-2xl">group</span>
            </div>
            <div>
              <p className="text-xs font-black text-zinc-500 uppercase">Total Pendaftar</p>
              <p className="text-2xl font-black text-black">124</p>
            </div>
          </div>
          
          <div className="bold-card p-6 bg-white flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-black font-black flex-shrink-0">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>pending_actions</span>
            </div>
            <div>
              <p className="text-xs font-black text-zinc-500 uppercase">Menunggu Verifikasi</p>
              <p className="text-2xl font-black text-black">{pendingCount}</p>
            </div>
          </div>

          <div className="bold-card p-6 bg-white flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-400 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-black font-black flex-shrink-0">
              <span className="material-symbols-outlined text-2xl">check_circle</span>
            </div>
            <div>
              <p className="text-xs font-black text-zinc-500 uppercase">Sudah Divalidasi</p>
              <p className="text-2xl font-black text-black">{verifiedCount}</p>
            </div>
          </div>
        </section>

        {/* Data Table Section */}
        <section className="bold-card bg-white overflow-hidden">
          <div className="px-6 py-4 border-b-2 border-black flex justify-between items-center bg-zinc-50">
            <h3 className="text-lg font-black text-black flex items-center gap-2">
              <span className="material-symbols-outlined text-black">list_alt</span>
              Menunggu Verifikasi RT 01
            </h3>
            <span className="text-xs font-black bg-amber-300 border-2 border-black px-3 py-1 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Live RT 01
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-zinc-100 border-b-2 border-black text-black font-black text-xs uppercase tracking-wider">
                  <th className="px-6 py-4">NIK</th>
                  <th className="px-6 py-4">Nama Warga</th>
                  <th className="px-6 py-4">Pekerjaan</th>
                  <th className="px-6 py-4">Pendapatan</th>
                  <th className="px-6 py-4 text-right">Aksi Verifikasi</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-black">
                {filteredApplicants.map((item) => (
                  <tr key={item.id} className="hover:bg-amber-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-sm text-black">{item.nik}</td>
                    <td className="px-6 py-4">
                      <div className="font-black text-black text-sm">{item.name}</div>
                      <div className="text-xs font-semibold text-zinc-500">RT {item.rt} / RW {item.rw} • {item.bansosType}</div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-zinc-700 text-sm">{item.job}</td>
                    <td className="px-6 py-4 font-black text-black text-sm whitespace-nowrap">
                      Rp {item.monthlyIncome.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                      {item.statusRT === 'Disetujui' ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-300 text-black text-xs font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          ✓ Disetujui RT
                        </span>
                      ) : item.statusRT === 'Ditolak' ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-300 text-black text-xs font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          ✕ Ditolak RT
                        </span>
                      ) : (
                        <>
                          <button 
                            onClick={() => onUpdateStatus(item.id, 'Ditolak')}
                            className="bold-btn px-4 py-2 bg-rose-300 text-black text-xs rounded-xl"
                          >
                            Tolak
                          </button>
                          <button 
                            onClick={() => onUpdateStatus(item.id, 'Disetujui')}
                            className="bold-btn px-4 py-2 bg-amber-300 text-black text-xs rounded-xl"
                          >
                            Setujui / Validasi
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t-2 border-black flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold text-zinc-700 bg-zinc-50">
            <span>Menampilkan 1-{filteredApplicants.length} dari 38 data pendaftar</span>
            <div className="flex gap-2">
              <button className="bold-btn w-8 h-8 flex items-center justify-center rounded-lg bg-white opacity-50 cursor-not-allowed">
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="bold-btn w-8 h-8 flex items-center justify-center rounded-lg bg-amber-400 text-black text-xs">1</button>
              <button className="bold-btn w-8 h-8 flex items-center justify-center rounded-lg bg-white text-xs">2</button>
              <button className="bold-btn w-8 h-8 flex items-center justify-center rounded-lg bg-white text-xs">3</button>
              <button className="bold-btn w-8 h-8 flex items-center justify-center rounded-lg bg-white">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
