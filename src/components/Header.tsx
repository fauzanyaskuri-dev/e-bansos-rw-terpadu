import React, { useState } from 'react';
import { ScreenType } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  isLoggedIn?: boolean;
  userRole?: 'rt' | 'rw' | null;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentScreen, onNavigate, isLoggedIn, userRole, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If in admin dashboard screens, use specific side nav instead of top nav
  if (currentScreen === 'admin-rt' || currentScreen === 'admin-rw') {
    return null;
  }

  // For transaction screens like registration or back-enabled screens
  const isTransactional = currentScreen === 'register' || currentScreen === 'help' || currentScreen === 'privacy' || currentScreen === 'terms' || currentScreen === 'contact';

  const handleNavClick = (screen: ScreenType) => {
    setMobileMenuOpen(false);
    onNavigate(screen);
  };

  return (
    <header className="bg-white border-b-2 border-black w-full h-20 sticky top-0 z-50 shadow-[0_4px_0_0_rgba(0,0,0,1)]">
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto h-full">
        <div 
          onClick={() => handleNavClick('home')} 
          className="flex items-center gap-3 cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
        >
          <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0">
            <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
          </div>
          <span className="text-base sm:text-xl font-black text-black tracking-tight truncate max-w-[200px] sm:max-w-none">
            Portal E-Bansos <span className="text-xs sm:text-sm font-bold bg-amber-300 px-2 py-0.5 rounded border border-black text-black">RW 03</span>
          </span>
        </div>

        {!isTransactional ? (
          <nav className="hidden md:flex gap-6 h-full items-center">
            <button 
              onClick={() => handleNavClick('home')}
              className={`px-4 py-2 font-extrabold text-sm transition-all rounded-lg ${
                currentScreen === 'home' 
                  ? 'bg-black text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                  : 'text-zinc-700 hover:text-black hover:bg-zinc-100'
              }`}
            >
              Beranda
            </button>
            <button 
              onClick={() => handleNavClick('tracking')}
              className={`px-4 py-2 font-extrabold text-sm transition-all rounded-lg ${
                currentScreen === 'tracking' 
                  ? 'bg-black text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                  : 'text-zinc-700 hover:text-black hover:bg-zinc-100'
              }`}
            >
              Lacak Status
            </button>
            <button 
              onClick={() => handleNavClick('help')}
              className={`px-4 py-2 font-extrabold text-sm transition-all rounded-lg ${
                currentScreen === 'help' 
                  ? 'bg-black text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                  : 'text-zinc-700 hover:text-black hover:bg-zinc-100'
              }`}
            >
              Pusat Bantuan
            </button>
          </nav>
        ) : (
          <div className="flex items-center">
            <button 
              onClick={() => handleNavClick('home')}
              className="bold-btn bg-white text-black px-4 py-2 rounded-lg text-sm flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span className="hidden sm:inline">Kembali ke Beranda</span>
              <span className="sm:hidden">Kembali</span>
            </button>
          </div>
        )}

        <div className="flex gap-3 items-center">
          {isLoggedIn ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xs sm:text-sm font-bold text-black hidden sm:inline bg-zinc-100 px-3 py-1 rounded-lg border border-black">
                {userRole === 'rt' ? 'Ketua RT 01' : 'Petugas RW 03'}
              </span>
              <button 
                onClick={() => handleNavClick(userRole === 'rt' ? 'admin-rt' : 'admin-rw')}
                className="bold-btn bg-amber-400 text-black px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm"
              >
                Dashboard
              </button>
              <button 
                onClick={onLogout}
                className="text-xs text-red-600 font-extrabold hover:underline px-1 sm:px-2 py-1 cursor-pointer"
              >
                Keluar
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <button 
                onClick={() => handleNavClick('login')}
                className="font-extrabold text-sm px-4 py-2 rounded-lg text-black hover:bg-zinc-100 transition-colors cursor-pointer border-2 border-transparent hover:border-black"
              >
                Masuk
              </button>
              <button 
                onClick={() => handleNavClick('register')}
                className="bold-btn bg-emerald-400 text-black px-5 py-2.5 rounded-xl text-sm"
              >
                Daftar Sekarang
              </button>
            </div>
          )}
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-black p-2 rounded-lg border-2 border-black bg-zinc-100 cursor-pointer flex items-center justify-center"
            aria-label="Toggle mobile menu"
          >
            <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b-2 border-black shadow-[0_8px_0_0_rgba(0,0,0,1)] p-6 space-y-4 animate-in fade-in slide-in-from-top-4 z-50">
          <div className="flex flex-col space-y-2">
            <button 
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-4 py-3 font-extrabold text-sm rounded-xl border-2 ${
                currentScreen === 'home' ? 'bg-amber-300 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'border-transparent hover:bg-zinc-100'
              }`}
            >
              Beranda
            </button>
            <button 
              onClick={() => handleNavClick('tracking')}
              className={`w-full text-left px-4 py-3 font-extrabold text-sm rounded-xl border-2 ${
                currentScreen === 'tracking' ? 'bg-amber-300 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'border-transparent hover:bg-zinc-100'
              }`}
            >
              Lacak Status NIK
            </button>
            <button 
              onClick={() => handleNavClick('help')}
              className={`w-full text-left px-4 py-3 font-extrabold text-sm rounded-xl border-2 ${
                currentScreen === 'help' ? 'bg-amber-300 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'border-transparent hover:bg-zinc-100'
              }`}
            >
              Pusat Bantuan &amp; Panduan
            </button>
            {!isLoggedIn && (
              <>
                <button 
                  onClick={() => handleNavClick('login')}
                  className="w-full text-left px-4 py-3 font-extrabold text-sm rounded-xl border-2 border-black bg-zinc-50 hover:bg-zinc-100"
                >
                  Masuk sebagai Petugas (RT / RW)
                </button>
                <button 
                  onClick={() => handleNavClick('register')}
                  className="bold-btn w-full bg-emerald-400 text-black px-4 py-3 rounded-xl text-sm font-extrabold text-center"
                >
                  Pendaftaran Mandiri Bansos
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

