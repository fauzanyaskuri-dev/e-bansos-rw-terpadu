import React, { useState } from 'react';
import { ScreenType } from '../types';

interface LandingScreenProps {
  onNavigate: (screen: ScreenType, extraData?: any) => void;
  onSearchNik: (nik: string) => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onNavigate, onSearchNik }) => {
  const [nikInput, setNikInput] = useState('');

  const handleCariData = (e: React.FormEvent) => {
    e.preventDefault();
    if (nikInput.trim()) {
      onSearchNik(nikInput.trim());
      onNavigate('tracking');
    } else {
      onNavigate('tracking');
    }
  };

  return (
    <div className="flex-grow bg-[#f8f9fa] flex flex-col">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-lg lg:px-3xl py-16 lg:py-24 w-full">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="bg-amber-300 border-2 border-black px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider inline-block mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            Layanan Resmi RW 03
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-black mb-6 tracking-tight leading-none">
            Portal E-Bansos RW Terpadu
          </h1>
          <p className="text-lg md:text-xl font-medium text-zinc-700 leading-relaxed">
            Platform transparansi dan pendaftaran bantuan sosial tingkat RW yang cepat, akurat, dan akuntabel bagi seluruh warga.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Cek Status NIK Card */}
          <div className="bold-card p-8 lg:p-10 flex flex-col justify-between h-full bg-white">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-300 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-black text-3xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>badge</span>
              </div>
              <h2 className="text-2xl font-black text-black mb-3 tracking-tight">Cek Status NIK Warga</h2>
              <p className="text-zinc-600 font-medium mb-8 leading-relaxed">
                Masukkan Nomor Induk Kependudukan (NIK) Anda untuk memeriksa status kepesertaan, riwayat, dan jadwal penyaluran Bantuan Sosial saat ini.
              </p>
              
              <form onSubmit={handleCariData} className="flex flex-col gap-4">
                <label className="text-sm font-extrabold text-black" htmlFor="nik-input">
                  Nomor Induk Kependudukan (NIK)
                </label>
                <input 
                  id="nik-input"
                  type="text" 
                  value={nikInput}
                  onChange={(e) => setNikInput(e.target.value)}
                  placeholder="Contoh: 3273110203990001" 
                  className="bold-input w-full h-12 text-black placeholder:text-zinc-400 font-mono px-4"
                />
                <button 
                  type="submit"
                  className="bold-btn mt-2 w-full bg-amber-400 text-black h-14 rounded-xl flex items-center justify-center gap-3 text-base"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>search</span>
                  Cari Data NIK Sekarang
                </button>
              </form>
            </div>
          </div>

          {/* Pendaftaran Mandiri Card */}
          <div className="bold-card p-8 lg:p-10 flex flex-col justify-between h-full bg-white">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-400 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-black text-3xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>assignment_add</span>
              </div>
              <h2 className="text-2xl font-black text-black mb-3 tracking-tight">Pendaftaran Mandiri Bansos</h2>
              <p className="text-zinc-600 font-medium mb-6 leading-relaxed">
                Bagi warga yang memenuhi syarat namun belum terdaftar, Anda dapat mengajukan pendaftaran secara mandiri dengan melampirkan foto KTP.
              </p>
              <div className="bg-zinc-50 p-5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-6">
                <h3 className="text-sm font-black text-black mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-600 text-lg">info</span>
                  Syarat Utama Pengajuan:
                </h3>
                <ul className="text-xs font-semibold text-zinc-700 list-disc list-inside space-y-1">
                  <li>Warga Negara Indonesia (WNI) berdomisili RW 03</li>
                  <li>Keluarga kategori prasejahtera / rentan</li>
                  <li>Bukan pegawai ASN, TNI, atau POLRI</li>
                </ul>
              </div>
            </div>
            
            <button 
              onClick={() => onNavigate('register')}
              className="bold-btn w-full bg-black text-white h-14 rounded-xl flex items-center justify-center gap-3 text-base hover:bg-zinc-900"
            >
              Mulai Pendaftaran Mandiri
              <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="border-t-2 border-black bg-white py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-lg lg:px-3xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-zinc-50 border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="w-12 h-12 bg-amber-300 border-2 border-black rounded-xl mx-auto mb-4 flex items-center justify-center font-black">
                <span className="material-symbols-outlined text-2xl">verified</span>
              </div>
              <h3 className="text-lg font-black text-black mb-2">100% Terverifikasi</h3>
              <p className="text-xs font-medium text-zinc-600">Terintegrasi langsung dengan data kependudukan resmi RT &amp; RW.</p>
            </div>
            <div className="p-6 bg-zinc-50 border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="w-12 h-12 bg-emerald-300 border-2 border-black rounded-xl mx-auto mb-4 flex items-center justify-center font-black">
                <span className="material-symbols-outlined text-2xl">update</span>
              </div>
              <h3 className="text-lg font-black text-black mb-2">Real-Time Tracking</h3>
              <p className="text-xs font-medium text-zinc-600">Pantau proses persetujuan berkas dari RT hingga RW seketika.</p>
            </div>
            <div className="p-6 bg-zinc-50 border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="w-12 h-12 bg-sky-300 border-2 border-black rounded-xl mx-auto mb-4 flex items-center justify-center font-black">
                <span className="material-symbols-outlined text-2xl">support_agent</span>
              </div>
              <h3 className="text-lg font-black text-black mb-2">Layanan Responsif</h3>
              <p className="text-xs font-medium text-zinc-600">Posko pengaduan dan bantuan yang siap melayani warga setiap hari kerja.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

