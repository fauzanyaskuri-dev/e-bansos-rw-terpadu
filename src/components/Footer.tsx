import React from 'react';
import { ScreenType } from '../types';

interface FooterProps {
  onNavigate: (screen: ScreenType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t-2 border-black w-full py-8 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 lg:px-12 max-w-7xl mx-auto gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="text-lg font-black text-black">
            Portal E-Bansos RW
          </span>
          <p className="text-xs font-semibold text-zinc-600">
            &copy; 2026 Portal E-Bansos. Layanan Sosial Terpadu Pemerintah.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 font-bold text-xs">
          <button 
            onClick={() => onNavigate('privacy')}
            className="hover:underline text-black"
          >
            Kebijakan Privasi
          </button>
          <button 
            onClick={() => onNavigate('terms')}
            className="hover:underline text-black"
          >
            Syarat &amp; Ketentuan
          </button>
          <button 
            onClick={() => onNavigate('contact')}
            className="hover:underline text-black"
          >
            Kontak Kami
          </button>
        </div>
      </div>
    </footer>
  );
};
