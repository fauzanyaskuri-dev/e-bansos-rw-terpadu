import React, { useState } from 'react';
import { ScreenType } from '../types';
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (role: 'rt' | 'rw') => void;
  onNavigate: (screen: ScreenType) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'rt' | 'rw'>('rt');
  const [username, setUsername] = useState('rt01_admin');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(activeTab);
  };

  return (
    <div className="flex-grow flex items-center justify-center py-16 px-lg bg-[#f8f9fa]">
      <div className="w-full max-w-[480px] bold-card bg-white overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        {/* Tabs */}
        <div className="grid grid-cols-2 border-b-2 border-black bg-zinc-100">
          <button 
            type="button"
            onClick={() => { setActiveTab('rt'); setUsername('rt01_admin'); }}
            className={`py-4 font-black text-sm transition-all cursor-pointer ${
              activeTab === 'rt' 
                ? 'bg-amber-300 text-black border-r-2 border-black shadow-inner' 
                : 'text-zinc-600 hover:text-black hover:bg-zinc-200'
            }`}
          >
            LOGIN RT 01
          </button>
          <button 
            type="button"
            onClick={() => { setActiveTab('rw'); setUsername('rw03_admin'); }}
            className={`py-4 font-black text-sm transition-all cursor-pointer ${
              activeTab === 'rw' 
                ? 'bg-amber-300 text-black border-l-2 border-black shadow-inner' 
                : 'text-zinc-600 hover:text-black hover:bg-zinc-200'
            }`}
          >
            LOGIN RW 03
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <span className="bg-emerald-300 border-2 border-black px-3 py-1 rounded text-xs font-black uppercase tracking-wider inline-block">
              Akses Aparat
            </span>
            <h2 className="text-2xl font-black text-black">Autentikasi Petugas</h2>
            <p className="text-zinc-600 font-medium text-sm">
              Silakan masuk menggunakan akun {activeTab === 'rt' ? 'Rukun Tetangga (RT)' : 'Rukun Warga (RW)'}.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-extrabold text-black" htmlFor="username">
                Username / ID Petugas
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-black">person</span>
                <input 
                  id="username"
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  required
                  className="bold-input w-full pl-10 pr-4 text-black text-sm h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-extrabold text-black" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-black">lock</span>
                <input 
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  required
                  className="bold-input w-full pl-10 pr-10 text-black text-sm h-12"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-zinc-700"
                >
                  <span className="material-symbols-outlined text-sm">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            <button 
              type="submit"
              className="bold-btn w-full h-14 bg-black text-white text-base rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-900"
            >
              Masuk Dashboard
              <span className="material-symbols-outlined font-bold text-lg">arrow_forward</span>
            </button>

            <div className="text-center">
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Instruksi pemulihan kata sandi telah dikirim ke email admin.'); }} className="text-xs font-bold text-black hover:underline">
                Lupa Password?
              </a>
            </div>
          </form>
        </div>

        {/* Footer info inside card */}
        <div className="px-6 py-4 bg-zinc-50 border-t-2 border-black flex items-center justify-center gap-2 text-xs font-bold text-zinc-700">
          <span className="material-symbols-outlined text-sm text-emerald-600" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
          Portal Resmi Pemerintah. Akses terbatas.
        </div>
      </div>
    </div>
  );
};
