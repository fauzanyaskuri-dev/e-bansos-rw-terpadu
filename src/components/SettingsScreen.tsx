import React, { useState } from 'react';
import { ScreenType, BansosApplicant } from '../types';

interface SettingsScreenProps {
  applicants: BansosApplicant[];
  onNavigate: (screen: ScreenType) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ applicants, onNavigate }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [offlineSync, setOfflineSync] = useState(true);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(applicants, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ebansos_rw03_export_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 4000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 pb-16">
      {/* Header Banner */}
      <div className="bg-amber-300 border-b-2 border-black py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 rounded-lg text-xs font-black border border-black">
              <span className="material-symbols-outlined text-sm">settings</span>
              <span>PENGATURAN APLIKASI &amp; SISTEM</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight">
              Konfigurasi Portal E-Bansos RW 03
            </h1>
            <p className="text-sm font-bold text-zinc-800 max-w-2xl leading-relaxed">
              Atur preferensi notifikasi, mode offline PWA, ekspor data pengajuan warga, dan informasi operasional kelurahan.
            </p>
          </div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="bold-btn bg-black text-white px-6 py-3 rounded-xl text-sm font-black flex items-center gap-2"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span>Kembali ke Dashboard</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8">
        {/* Notification Settings */}
        <div className="bold-card bg-white p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b-2 border-black">
            <div className="w-10 h-10 rounded-xl bg-amber-300 border-2 border-black flex items-center justify-center font-black">
              <span className="material-symbols-outlined">notifications</span>
            </div>
            <div>
              <h2 className="text-lg font-black text-black">Notifikasi &amp; Peringatan Status</h2>
              <p className="text-xs font-bold text-zinc-600">Atur cara Anda menerima informasi pembaruan verifikasi bansos</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl border-2 border-black">
              <div>
                <p className="font-black text-sm text-black">Notifikasi Browser PWA</p>
                <p className="text-xs font-semibold text-zinc-600">Terima pemberitahuan langsung saat status pengajuan disetujui RT/RW</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notificationsEnabled} 
                  onChange={() => setNotificationsEnabled(!notificationsEnabled)} 
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-black after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black border-2 border-black"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl border-2 border-black">
              <div>
                <p className="font-black text-sm text-black">Mode Sinkronisasi Offline PWA</p>
                <p className="text-xs font-semibold text-zinc-600">Simpan salinan data pengajuan secara lokal untuk akses tanpa koneksi internet</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={offlineSync} 
                  onChange={() => setOfflineSync(!offlineSync)} 
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-black after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black border-2 border-black"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Data & Backup Settings */}
        <div className="bold-card bg-white p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b-2 border-black">
            <div className="w-10 h-10 rounded-xl bg-emerald-300 border-2 border-black flex items-center justify-center font-black">
              <span className="material-symbols-outlined">database</span>
            </div>
            <div>
              <h2 className="text-lg font-black text-black">Cadangan &amp; Ekspor Data Warga</h2>
              <p className="text-xs font-bold text-zinc-600">Unduh arsip data pengajuan bansos RW 03 untuk keperluan pelaporan resmi</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-zinc-50 rounded-xl border-2 border-black">
              <div>
                <p className="font-black text-sm text-black">Ekspor Data Rekapitulasi (JSON / CSV)</p>
                <p className="text-xs font-semibold text-zinc-600">Unduh seluruh catatan pengajuan warga tersimpan di Firestore</p>
              </div>
              <button
                onClick={handleExportData}
                className="bold-btn bg-black text-white px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                <span>Unduh Data Warga</span>
              </button>
            </div>

            {exportSuccess && (
              <div className="p-3 bg-emerald-100 border-2 border-black rounded-xl text-xs font-black text-emerald-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-700">check_circle</span>
                <span>File cadangan data bansos RW 03 berhasil diunduh ke perangkat Anda!</span>
              </div>
            )}
          </div>
        </div>

        {/* Application Info */}
        <div className="bold-card bg-white p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b-2 border-black">
            <div className="w-10 h-10 rounded-xl bg-sky-300 border-2 border-black flex items-center justify-center font-black">
              <span className="material-symbols-outlined">info</span>
            </div>
            <div>
              <h2 className="text-lg font-black text-black">Tentang Aplikasi E-Bansos RW 03</h2>
              <p className="text-xs font-bold text-zinc-600">Informasi versi dan ketentuan layanan resmi</p>
            </div>
          </div>

          <div className="space-y-3 text-xs font-bold text-zinc-700">
            <div className="flex justify-between p-3 bg-zinc-50 rounded-xl border border-black">
              <span>Nama Sistem</span>
              <span className="font-black text-black">Portal E-Bansos RW 03 PWA</span>
            </div>
            <div className="flex justify-between p-3 bg-zinc-50 rounded-xl border border-black">
              <span>Versi Rilis</span>
              <span className="font-black text-black">v2.4.0 (Production Build)</span>
            </div>
            <div className="flex justify-between p-3 bg-zinc-50 rounded-xl border border-black">
              <span>Database Backend</span>
              <span className="font-black text-black">Google Firebase Firestore (Real-time)</span>
            </div>
            <div className="flex justify-between p-3 bg-zinc-50 rounded-xl border border-black">
              <span>Wilayah Operasional</span>
              <span className="font-black text-black">RW 03, Kelurahan Setempat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
