import React from 'react';
import { ScreenType } from '../types';
import { ArrowLeft, HelpCircle, Shield, FileText, Mail, Phone, MapPin } from 'lucide-react';

interface InfoScreenProps {
  type: 'help' | 'privacy' | 'terms' | 'contact';
  onNavigate: (screen: ScreenType) => void;
}

export const InfoScreen: React.FC<InfoScreenProps> = ({ type, onNavigate }) => {
  const titles = {
    help: 'Pusat Bantuan Warga (FAQ)',
    privacy: 'Kebijakan Privasi Portal E-Bansos',
    terms: 'Syarat & Ketentuan Penggunaan',
    contact: 'Kontak Resmi Pengurus RW 03'
  };

  return (
    <div className="flex-grow max-w-4xl mx-auto px-6 py-16 w-full">
      <button 
        onClick={() => onNavigate('home')}
        className="bold-btn mb-8 px-4 py-2 bg-white text-black rounded-xl text-xs font-black inline-flex items-center gap-2"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Kembali ke Beranda
      </button>

      <div className="bold-card bg-white p-8 md:p-12 space-y-8">
        <h1 className="text-3xl md:text-4xl font-black text-black border-b-2 border-black pb-4 tracking-tight">
          {titles[type]}
        </h1>

        {type === 'help' && (
          <div className="space-y-6 text-zinc-700 font-medium">
            <h3 className="text-xl font-black text-black">Pertanyaan yang Sering Diajukan (FAQ)</h3>
            <div className="space-y-4">
              <div className="p-5 bg-zinc-50 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <p className="font-black text-black mb-1">1. Bagaimana cara mengecek status bansos saya?</p>
                <p className="text-sm">Masukkan 16 digit Nomor Induk Kependudukan (NIK) Anda pada kolom "Cek Status NIK" di halaman utama atau menu Lacak Status.</p>
              </div>
              <div className="p-5 bg-zinc-50 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <p className="font-black text-black mb-1">2. Berapa lama proses verifikasi pendaftaran mandiri?</p>
                <p className="text-sm">Verifikasi oleh Ketua RT memerlukan waktu 1-2 hari kerja, dilanjutkan verifikasi RW selama 2-3 hari kerja.</p>
              </div>
              <div className="p-5 bg-zinc-50 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <p className="font-black text-black mb-1">3. Apa saja syarat utama penerima bantuan sosial?</p>
                <p className="text-sm">Warga Negara Indonesia (WNI), berdomisili di wilayah RW 03, tergolong keluarga prasejahtera, dan tidak berstatus ASN/TNI/Polri.</p>
              </div>
            </div>
          </div>
        )}

        {type === 'privacy' && (
          <div className="space-y-6 text-zinc-700 font-medium leading-relaxed">
            <p>Portal E-Bansos RW berkomitmen penuh melindungi kerahasiaan data kependudukan warga sesuai dengan Undang-Undang Perlindungan Data Pribadi.</p>
            <h3 className="text-xl font-black text-black pt-2">Pengumpulan &amp; Penggunaan Data</h3>
            <p>Data NIK, nama, dan foto KTP yang Anda unggah hanya digunakan untuk keperluan verifikasi kelayakan penerima bantuan sosial tingkat RT dan RW serta dilaporkan kepada Dinas Sosial.</p>
            <h3 className="text-xl font-black text-black pt-2">Keamanan Sistem</h3>
            <p>Seluruh transmisi data dienkripsi dengan standar keamanan tingkat tinggi dan disimpan pada server resmi pemerintah yang terlindung dari akses tanpa izin.</p>
          </div>
        )}

        {type === 'terms' && (
          <div className="space-y-6 text-zinc-700 font-medium leading-relaxed">
            <h3 className="text-xl font-black text-black">Ketentuan Layanan</h3>
            <p>1. Pengguna wajib memasukkan data yang benar, akurat, dan sesuai dengan KTP asli.</p>
            <p>2. Pemalsuan dokumen atau data kependudukan dalam pengajuan bansos merupakan pelanggaran hukum yang dapat diproses sesuai peraturan yang berlaku.</p>
            <p>3. Keputusan hasil verifikasi oleh Ketua RT dan RW bersifat final berdasarkan musyawarah warga.</p>
          </div>
        )}

        {type === 'contact' && (
          <div className="space-y-8 text-zinc-700 font-medium">
            <p>Hubungi sekretariat pengurus RW atau posko pelayanan bansos terpadu:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-amber-50 rounded-2xl text-center space-y-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="material-symbols-outlined text-black text-3xl font-black">map</span>
                <p className="font-black text-black">Kantor Sekretariat RW 03</p>
                <p className="text-xs font-semibold">Jl. Merdeka Raya No. 45, Komplek Warga Sejahtera</p>
              </div>
              <div className="p-6 bg-emerald-50 rounded-2xl text-center space-y-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="material-symbols-outlined text-black text-3xl font-black">call</span>
                <p className="font-black text-black">Hotline Layanan</p>
                <p className="text-xs font-semibold">+62 21 555-BANSOS (08:00 - 16:00 WIB)</p>
              </div>
              <div className="p-6 bg-sky-50 rounded-2xl text-center space-y-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="material-symbols-outlined text-black text-3xl font-black">mail</span>
                <p className="font-black text-black">Email Resmi</p>
                <p className="text-xs font-semibold">bantuan@ebansos-rw03.go.id</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
