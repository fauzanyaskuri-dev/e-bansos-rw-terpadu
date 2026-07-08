import React, { useState } from 'react';
import { ScreenType, BansosApplicant } from '../types';

interface RegistrationScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onAddApplicant: (applicant: BansosApplicant) => void;
}

export const RegistrationScreen: React.FC<RegistrationScreenProps> = ({ onNavigate, onAddApplicant }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nik: '',
    nama: '',
    pekerjaan: '',
    pendapatan: '',
    rt: '',
    bansosType: 'Program Keluarga Harapan (PKH)'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newApplicant: BansosApplicant = {
      id: Date.now().toString(),
      nik: formData.nik || '3273110901' + Math.floor(100000 + Math.random() * 900000),
      name: formData.nama || 'Warga Baru',
      rt: formData.rt || '01',
      rw: '03',
      job: formData.pekerjaan || 'Wrs',
      monthlyIncome: Number(formData.pendapatan) || 1200000,
      statusRT: 'Menunggu',
      statusRW: 'Menunggu',
      submissionDate: 'Hari Ini',
      bansosType: formData.bansosType
    };
    onAddApplicant(newApplicant);
    setSubmitted(true);
  };

  return (
    <main className="flex-grow w-full max-w-[720px] mx-auto px-lg md:px-3xl py-2xl md:py-3xl">
      {/* Header Section */}
      <div className="mb-8 text-center md:text-left">
        <span className="bg-amber-300 border-2 border-black px-3 py-1 rounded text-xs font-black uppercase tracking-wider inline-block mb-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          Formulir Resmi
        </span>
        <h1 className="text-3xl md:text-4xl font-black text-black mb-2 tracking-tight">
          Pendaftaran Mandiri Bansos
        </h1>
        <p className="text-zinc-600 font-medium">
          Lengkapi formulir di bawah ini dengan data yang sebenar-benarnya untuk pendaftaran Bantuan Sosial tingkat RW.
        </p>
      </div>

      {/* Form Container */}
      <div className="bold-card p-6 md:p-10 bg-white">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* NIK Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-extrabold text-black" htmlFor="nik">
                Nomor Induk Kependudukan (NIK)
              </label>
              <input 
                id="nik" 
                name="nik" 
                type="number" 
                required 
                value={formData.nik}
                onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                placeholder="Masukkan 16 digit NIK" 
                className="bold-input w-full h-12 text-black font-mono placeholder:text-zinc-400 px-4"
              />
              <p className="text-xs font-medium text-zinc-500">Sesuai dengan KTP yang berlaku.</p>
            </div>

            {/* Nama Lengkap Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-extrabold text-black" htmlFor="nama">
                Nama Lengkap
              </label>
              <input 
                id="nama" 
                name="nama" 
                type="text" 
                required 
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                placeholder="Masukkan nama lengkap" 
                className="bold-input w-full h-12 text-black placeholder:text-zinc-400 px-4"
              />
            </div>

            {/* Pekerjaan Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-extrabold text-black" htmlFor="pekerjaan">
                Pekerjaan
              </label>
              <input 
                id="pekerjaan" 
                name="pekerjaan" 
                type="text" 
                required 
                value={formData.pekerjaan}
                onChange={(e) => setFormData({ ...formData, pekerjaan: e.target.value })}
                placeholder="Contoh: Buruh Harian Lepas" 
                className="bold-input w-full h-12 text-black placeholder:text-zinc-400 px-4"
              />
            </div>

            {/* Jenis Bansos */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-extrabold text-black" htmlFor="bansosType">
                Pilihan Jenis Bantuan Sosial
              </label>
              <select 
                id="bansosType"
                value={formData.bansosType}
                onChange={(e) => setFormData({ ...formData, bansosType: e.target.value })}
                className="bold-input w-full h-12 text-black cursor-pointer font-bold px-4"
              >
                <option value="Program Keluarga Harapan (PKH)">Program Keluarga Harapan (PKH)</option>
                <option value="Bantuan Pangan Non Tunai (BPNT)">Bantuan Pangan Non Tunai (BPNT)</option>
                <option value="Bantuan Sosial Tunai (BST)">Bantuan Sosial Tunai (BST)</option>
                <option value="Bantuan Langsung Tunai (BLT)">Bantuan Langsung Tunai (BLT)</option>
              </select>
            </div>

            {/* Pendapatan & RT Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pendapatan Field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-extrabold text-black" htmlFor="pendapatan">
                  Pendapatan Rata-rata / Bulan
                </label>
                <div className="flex items-center border-2 border-black rounded-lg bg-white overflow-hidden focus-within:ring-2 focus-within:ring-black">
                  <span className="bg-zinc-100 px-4 py-3 font-extrabold text-zinc-600 border-r-2 border-black">Rp</span>
                  <input 
                    id="pendapatan" 
                    name="pendapatan" 
                    type="text" 
                    inputMode="numeric"
                    required 
                    value={formData.pendapatan}
                    onChange={(e) => setFormData({ ...formData, pendapatan: e.target.value })}
                    placeholder="0" 
                    className="w-full h-12 px-4 text-black font-mono focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Pilih RT Dropdown */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-extrabold text-black" htmlFor="rt">
                  Pilih RT Domisili
                </label>
                <div className="relative">
                  <select 
                    id="rt" 
                    name="rt" 
                    required 
                    value={formData.rt}
                    onChange={(e) => setFormData({ ...formData, rt: e.target.value })}
                    className="bold-input appearance-none w-full h-12 text-black cursor-pointer font-bold px-4"
                  >
                    <option value="" disabled>Pilih wilayah RT</option>
                    <option value="01">RT 01</option>
                    <option value="02">RT 02</option>
                    <option value="03">RT 03</option>
                    <option value="04">RT 04</option>
                    <option value="05">RT 05</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black">
                    arrow_drop_down
                  </span>
                </div>
              </div>
            </div>

            {/* File Upload Section */}
            <div className="flex flex-col gap-2 mt-6">
              <label className="text-sm font-extrabold text-black">Upload Foto KTP</label>
              <div className="w-full border-2 border-dashed border-black rounded-xl bg-amber-50 hover:bg-amber-100 transition-colors cursor-pointer flex flex-col items-center justify-center py-8 relative group">
                <input 
                  id="ktp_upload" 
                  name="ktp_upload" 
                  type="file" 
                  accept="image/*" 
                  required 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                />
                <div className="flex flex-col items-center gap-2 text-center px-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-300 text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined font-black" style={{ fontVariationSettings: "'FILL' 1" }}>upload_file</span>
                  </div>
                  <span className="text-sm font-black text-black">Klik untuk unggah atau seret file</span>
                  <span className="text-xs font-semibold text-zinc-600">Format didukung: JPG, PNG, PDF (Maks. 5MB)</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-t-2 border-black my-6" />

            {/* Action Button */}
            <button 
              type="submit" 
              className="bold-btn w-full h-14 bg-amber-400 text-black text-base rounded-xl flex items-center justify-center gap-2"
            >
              Kirim Berkas Pendaftaran
              <span className="material-symbols-outlined font-bold text-lg">send</span>
            </button>
          </form>
        ) : (
          /* Success State */
          <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-emerald-400 border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-black text-4xl font-black" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
            </div>
            <h2 className="text-2xl font-black text-black">
              Pendaftaran Berhasil Terkirim!
            </h2>
            <p className="text-zinc-600 font-medium max-w-md mx-auto mb-6">
              Terima kasih, data Anda telah kami terima. Tim kami akan melakukan verifikasi berkas dalam waktu 3-5 hari kerja. Simpan nomor NIK Anda untuk melakukan pengecekan status secara berkala.
            </p>
            <div className="flex flex-col gap-4 w-full max-w-sm">
              <button 
                onClick={() => onNavigate('tracking')} 
                className="bold-btn w-full h-12 bg-black text-white text-sm rounded-xl flex items-center justify-center"
              >
                Lacak Status Sekarang
              </button>
              <button 
                onClick={() => onNavigate('home')} 
                className="bold-btn w-full h-12 bg-white text-black text-sm rounded-xl flex items-center justify-center"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
