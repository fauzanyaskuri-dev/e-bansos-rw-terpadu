import React, { useState } from 'react';
import { ScreenType, BansosApplicant } from '../types';

interface DashboardScreenProps {
  applicants: BansosApplicant[];
  onNavigate: (screen: ScreenType) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ applicants, onNavigate }) => {
  const [searchNik, setSearchNik] = useState('');
  const [myApplicant, setMyApplicant] = useState<BansosApplicant | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchNik.trim()) return;
    const found = applicants.find(a => a.nik === searchNik.trim());
    setMyApplicant(found || null);
    setSearched(true);
  };

  const totalApplicants = applicants.length;
  const approvedCount = applicants.filter(a => a.statusRW === 'Disetujui').length;
  const pendingCount = applicants.filter(a => a.statusRW === 'Menunggu' || a.statusRT === 'Menunggu').length;

  return (
    <div className="min-h-screen bg-zinc-50 pb-16">
      {/* Hero Banner */}
      <div className="bg-amber-300 border-b-2 border-black py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 rounded-lg text-xs font-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)] border border-black">
              <span className="material-symbols-outlined text-sm">dashboard</span>
              <span>DASHBOARD WARGA RW 03</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight">
              Portal Layanan &amp; Verifikasi Bansos Warga
            </h1>
            <p className="text-sm font-bold text-zinc-800 max-w-2xl leading-relaxed">
              Pantau status pengajuan bantuan sosial Anda secara real-time, cek kuota wilayah RT/RW, dan akses layanan terpadu dengan transparan.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onNavigate('register')}
              className="bold-btn bg-black text-white px-6 py-3 rounded-xl text-sm font-black flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">add_circle</span>
              <span>Ajukan Bansos Baru</span>
            </button>
            <button
              onClick={() => onNavigate('statistics')}
              className="bold-btn bg-white text-black px-6 py-3 rounded-xl text-sm font-black flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">bar_chart</span>
              <span>Lihat Statistik RW</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-10">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bold-card bg-white p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-black text-zinc-500 uppercase tracking-wider">Total Pengajuan RW 03</p>
              <h3 className="text-3xl font-black text-black mt-1">{totalApplicants} Warga</h3>
              <p className="text-xs font-bold text-emerald-600 mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">verified</span> Terverifikasi aktif
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-amber-300 border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <span className="material-symbols-outlined text-2xl font-black">groups</span>
            </div>
          </div>

          <div className="bold-card bg-white p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-black text-zinc-500 uppercase tracking-wider">Bantuan Disetujui</p>
              <h3 className="text-3xl font-black text-black mt-1">{approvedCount} Penerima</h3>
              <p className="text-xs font-bold text-blue-600 mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">check_circle</span> Siap pencairan
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-300 border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <span className="material-symbols-outlined text-2xl font-black">task_alt</span>
            </div>
          </div>

          <div className="bold-card bg-white p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-black text-zinc-500 uppercase tracking-wider">Menunggu Verifikasi</p>
              <h3 className="text-3xl font-black text-black mt-1">{pendingCount} Pengajuan</h3>
              <p className="text-xs font-bold text-amber-600 mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">schedule</span> Proses RT / RW
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-sky-300 border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <span className="material-symbols-outlined text-2xl font-black">pending_actions</span>
            </div>
          </div>
        </div>

        {/* NIK Quick Checker Box */}
        <div className="bold-card bg-white p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b-2 border-black">
            <div>
              <h2 className="text-xl font-black text-black">Cek Status Pengajuan Saya</h2>
              <p className="text-xs font-bold text-zinc-600">Masukkan NIK Kependudukan Anda untuk melihat posisi berkas di RT dan RW</p>
            </div>
            <button
              onClick={() => onNavigate('tracking')}
              className="text-xs font-black text-black underline hover:text-amber-600"
            >
              Buka Halaman Lacak Penuh →
            </button>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 font-bold">
                <span className="material-symbols-outlined text-lg">badge</span>
              </span>
              <input
                type="text"
                value={searchNik}
                onChange={(e) => setSearchNik(e.target.value)}
                placeholder="Masukkan 16 digit NIK KTP Anda..."
                className="w-full pl-12 pr-4 py-3 bg-zinc-50 border-2 border-black rounded-xl text-sm font-bold focus:outline-none focus:bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                maxLength={16}
              />
            </div>
            <button
              type="submit"
              className="bold-btn bg-black text-white px-8 py-3 rounded-xl text-sm font-black flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">search</span>
              <span>Cek Status</span>
            </button>
          </form>

          {searched && (
            <div className="mt-6 pt-6 border-t-2 border-dashed border-zinc-300">
              {myApplicant ? (
                <div className="p-6 bg-emerald-50 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <span className="text-xs font-black bg-emerald-200 border border-black px-2.5 py-1 rounded-lg">Ditemukan di Sistem</span>
                      <h3 className="text-lg font-black text-black mt-2">{myApplicant.name}</h3>
                      <p className="text-xs font-bold text-zinc-600">NIK: {myApplicant.nik} • RT {myApplicant.rt} / RW {myApplicant.rw}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-zinc-500">Jenis Bantuan:</span>
                      <p className="text-sm font-black text-black">{myApplicant.bansosType}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-3 bg-white rounded-xl border-2 border-black">
                      <span className="text-xs font-bold text-zinc-500">Status Verifikasi RT:</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`w-3 h-3 rounded-full border border-black ${
                          myApplicant.statusRT === 'Disetujui' ? 'bg-emerald-400' : myApplicant.statusRT === 'Ditolak' ? 'bg-rose-450' : 'bg-amber-400'
                        }`}></span>
                        <span className="text-sm font-black text-black">{myApplicant.statusRT}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border-2 border-black">
                      <span className="text-xs font-bold text-zinc-500">Status Verifikasi RW:</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`w-3 h-3 rounded-full border border-black ${
                          myApplicant.statusRW === 'Disetujui' ? 'bg-emerald-400' : myApplicant.statusRW === 'Ditolak' ? 'bg-rose-450' : 'bg-amber-400'
                        }`}></span>
                        <span className="text-sm font-black text-black">{myApplicant.statusRW}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-rose-50 rounded-2xl border-2 border-black text-center space-y-2">
                  <span className="material-symbols-outlined text-3xl text-rose-600">error</span>
                  <h4 className="font-black text-black">NIK Tidak Ditemukan</h4>
                  <p className="text-xs font-semibold text-zinc-600">Pastikan NIK yang Anda masukkan benar atau daftarkan pengajuan baru jika belum terdaftar.</p>
                  <button
                    onClick={() => onNavigate('register')}
                    className="bold-btn mt-3 bg-black text-white px-5 py-2 rounded-xl text-xs font-black inline-flex items-center gap-1"
                  >
                    <span>Daftar Bansos Sekarang</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Recent Applicants Feed */}
        <div className="bold-card bg-white p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center pb-4 border-b-2 border-black">
            <div>
              <h2 className="text-xl font-black text-black">Daftar Pengajuan Terbaru RW 03</h2>
              <p className="text-xs font-bold text-zinc-600">Transparansi daftar penerima dan pengaju bantuan sosial warga</p>
            </div>
            <button
              onClick={() => onNavigate('statistics')}
              className="bold-btn bg-amber-300 text-black px-4 py-2 rounded-xl text-xs font-black"
            >
              Lihat Statistik Lengkap
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-black text-xs font-black uppercase bg-zinc-100">
                  <th className="p-3 border-r-2 border-black">Nama Warga</th>
                  <th className="p-3 border-r-2 border-black">RT / RW</th>
                  <th className="p-3 border-r-2 border-black">Jenis Bantuan</th>
                  <th className="p-3 border-r-2 border-black">Status RT</th>
                  <th className="p-3">Status RW</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-black text-xs font-bold">
                {applicants.slice(0, 5).map((applicant) => (
                  <tr key={applicant.id} className="hover:bg-zinc-50">
                    <td className="p-3 border-r-2 border-black font-black">{applicant.name}</td>
                    <td className="p-3 border-r-2 border-black">RT {applicant.rt} / RW {applicant.rw}</td>
                    <td className="p-3 border-r-2 border-black">{applicant.bansosType}</td>
                    <td className="p-3 border-r-2 border-black">
                      <span className={`px-2.5 py-1 rounded-lg border border-black ${
                        applicant.statusRT === 'Disetujui' ? 'bg-emerald-200' : applicant.statusRT === 'Ditolak' ? 'bg-rose-200' : 'bg-amber-200'
                      }`}>
                        {applicant.statusRT}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-lg border border-black ${
                        applicant.statusRW === 'Disetujui' ? 'bg-emerald-200' : applicant.statusRW === 'Ditolak' ? 'bg-rose-200' : 'bg-amber-200'
                      }`}>
                        {applicant.statusRW}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
