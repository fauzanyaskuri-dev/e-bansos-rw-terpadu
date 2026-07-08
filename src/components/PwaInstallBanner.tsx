import React, { useState, useEffect } from 'react';

export const PwaInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check if already installed in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsInstalled(true);
    }

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      {/* Offline Status Bar if offline */}
      {!isOnline && (
        <div className="bg-rose-600 text-white px-4 py-2 text-center text-xs font-black tracking-wide border-b-2 border-black flex items-center justify-center gap-2 z-50">
          <span className="material-symbols-outlined text-sm animate-pulse">wifi_off</span>
          <span>Anda sedang offline. Data dan status tersimpan dalam Mode Offline PWA.</span>
        </div>
      )}

      {/* Floating PWA / Mobile App Install Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        {(!isInstalled && showBanner) || !isInstalled ? (
          <button
            onClick={handleInstallClick}
            className="bold-btn bg-amber-400 hover:bg-amber-300 text-black px-4 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black transition-transform active:translate-x-0.5 active:translate-y-0.5"
            title="Pasang Aplikasi E-Bansos PWA"
          >
            <span className="material-symbols-outlined text-xl">install_mobile</span>
            <span>Install Aplikasi PWA</span>
          </button>
        ) : null}
      </div>

      {/* Installation Guide Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bold-card bg-white max-w-md w-full p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-4 border-b-2 border-black">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-300 border-2 border-black flex items-center justify-center font-black">
                  <span className="material-symbols-outlined">phone_android</span>
                </div>
                <h3 className="text-lg font-black text-black">Instalasi PWA &amp; Mobile App</h3>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg border-2 border-black bg-zinc-100 hover:bg-zinc-200 font-black px-2.5"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm font-medium text-zinc-700">
              <p className="font-bold text-black">
                Jadikan Portal E-Bansos RW 03 sebagai Aplikasi Mobile mandiri di perangkat Anda untuk akses cepat, notifikasi, dan dukungan offline.
              </p>
              
              <div className="p-4 bg-zinc-50 rounded-xl border-2 border-black space-y-2">
                <div className="font-bold text-black flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-500">smartphone</span>
                  <span>Pengguna Android (Chrome / Edge):</span>
                </div>
                <p className="text-xs text-zinc-600 pl-6">
                  Ketuk ikon menu titik tiga (⋮) di pojok kanan atas browser Anda, lalu pilih <strong>&quot;Tambahkan ke Layar Utama&quot;</strong> atau <strong>&quot;Instal Aplikasi&quot;</strong>.
                </p>
              </div>

              <div className="p-4 bg-zinc-50 rounded-xl border-2 border-black space-y-2">
                <div className="font-bold text-black flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-500">phone_iphone</span>
                  <span>Pengguna iPhone / iOS (Safari):</span>
                </div>
                <p className="text-xs text-zinc-600 pl-6">
                  Ketuk tombol <strong>Bagikan (Share)</strong> di bagian bawah Safari, lalu gulir dan ketuk <strong>&quot;Tambahkan ke Layar Utama&quot; (Add to Home Screen)</strong>.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bold-btn bg-black text-white px-6 py-2.5 rounded-xl text-sm font-black"
              >
                Mengerti &amp; Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
