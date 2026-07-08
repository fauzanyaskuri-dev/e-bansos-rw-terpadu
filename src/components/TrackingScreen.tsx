import React, { useState } from 'react';
import { ScreenType, BansosApplicant } from '../types';

interface TrackingScreenProps {
  onNavigate: (screen: ScreenType) => void;
  searchedNik: string;
  applicants: BansosApplicant[];
}

export const TrackingScreen: React.FC<TrackingScreenProps> = ({ onNavigate, searchedNik, applicants }) => {
  const [nikQuery, setNikQuery] = useState(searchedNik || '3273110203990001');
  const [activeApplicant, setActiveApplicant] = useState<BansosApplicant | null>(() => {
    return applicants.find(a => a.nik === searchedNik) || applicants[0] || null;
  });

  React.useEffect(() => {
    if (activeApplicant) {
      const updated = applicants.find(a => a.nik === activeApplicant.nik);
      if (updated) {
        setActiveApplicant(updated);
      }
    }
  }, [applicants]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = applicants.find(a => a.nik.includes(nikQuery.trim()) || a.name.toLowerCase().includes(nikQuery.toLowerCase().trim()));
    if (found) {
      setActiveApplicant(found);
    } else {
      setActiveApplicant({
        id: 'mock',
        nik: nikQuery || '3273xxxxxxxxxxxx',
        name: 'Warga Terdaftar',
        rt: '02',
        rw: '03',
        job: 'Karyawan Swasta',
        monthlyIncome: 1400000,
        statusRT: 'Disetujui',
        statusRW: 'Menunggu',
        submissionDate: '12 Okt 2023',
        bansosType: 'Program Keluarga Harapan (PKH)'
      });
    }
  };

  const statusRT = activeApplicant?.statusRT || 'Menunggu';
  const statusRW = activeApplicant?.statusRW || 'Menunggu';

  const isRejected = statusRT === 'Ditolak' || statusRW === 'Ditolak';
  const isApproved = statusRT === 'Disetujui' && statusRW === 'Disetujui';
  const isPendingRw = statusRT === 'Disetujui' && statusRW === 'Menunggu';
  const isPendingRt = statusRT === 'Menunggu';

  const handlePrintPdf = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      window.print();
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Bukti Pengajuan Bansos - ${activeApplicant?.name || 'Warga'}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; color: #000; background: #fff; }
            .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 30px; }
            .header h2 { font-size: 14px; text-transform: uppercase; margin: 0; color: #333; }
            .header h1 { font-size: 20px; text-transform: uppercase; margin: 5px 0; font-weight: 900; }
            .header p { font-size: 12px; margin: 2px 0; color: #555; }
            .badge { display: inline-block; border: 2px solid #000; padding: 6px 16px; font-weight: bold; font-size: 12px; margin-top: 10px; text-transform: uppercase; background: #f3f4f6; }
            .content { margin-bottom: 40px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 20px; border: 2px solid #000; padding: 20px; }
            .grid-item { margin-bottom: 12px; }
            .label { font-size: 11px; text-transform: uppercase; color: #555; font-weight: bold; margin-bottom: 4px; }
            .value { font-size: 15px; font-weight: 900; color: #000; }
            .footer { display: flex; justify-content: space-between; margin-top: 60px; font-size: 12px; }
            .signature { text-align: center; width: 200px; }
            .signature .line { margin-top: 60px; border-bottom: 1px solid #000; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>Pemerintah Kota Sejahtera — Kelurahan Maju Jaya</h2>
            <h1>Sekretariat RW 03 / Wilayah Pelayanan Terpadu</h1>
            <p>Jl. Merdeka Raya No. 45, Telp: (021) 555-BANSOS</p>
            <div class="badge">Tanda Bukti Validasi &amp; Pengajuan Bantuan Sosial (Bansos)</div>
          </div>
          <div class="content">
            <div style="margin-bottom: 20px;">
              <strong>Status Verifikasi:</strong> <span style="background: #fde047; padding: 4px 8px; border: 1px solid #000;">${activeApplicant?.statusRW || 'Menunggu Pengesahan RW'}</span>
            </div>
            <div class="grid">
              <div class="grid-item">
                <div class="label">NIK Warga</div>
                <div class="value">${activeApplicant?.nik || '-'}</div>
              </div>
              <div class="grid-item">
                <div class="label">Nama Lengkap</div>
                <div class="value">${activeApplicant?.name || '-'}</div>
              </div>
              <div class="grid-item">
                <div class="label">Jenis Bantuan</div>
                <div class="value">${activeApplicant?.bansosType || '-'}</div>
              </div>
              <div class="grid-item">
                <div class="label">Tanggal Pengajuan</div>
                <div class="value">${activeApplicant?.submissionDate || '-'}</div>
              </div>
              <div class="grid-item">
                <div class="label">Pekerjaan</div>
                <div class="value">${activeApplicant?.job || '-'}</div>
              </div>
              <div class="grid-item">
                <div class="label">Perkiraan Pendapatan</div>
                <div class="value">Rp ${(activeApplicant?.monthlyIncome || 0).toLocaleString('id-ID')}</div>
              </div>
              <div class="grid-item" style="grid-column: span 2;">
                <div class="label">Wilayah RT / RW</div>
                <div class="value">RT ${activeApplicant?.rt || '01'} / RW ${activeApplicant?.rw || '03'}</div>
              </div>
            </div>
          </div>
          <div class="footer">
            <div class="signature">
              <p>Mengetahui,</p>
              <p><strong>Ketua RT ${activeApplicant?.rt || '01'}</strong></p>
              <div class="line">( ........................................ )</div>
            </div>
            <div class="signature">
              <p>Kota Sejahtera, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <p><strong>Ketua RW 03</strong></p>
              <div class="line">( H. Bambang Sutrisno )</div>
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <main className="flex-grow flex flex-col items-center py-16 px-6 lg:px-12">
      <div className="w-full max-w-[840px] flex flex-col gap-8">
        {/* Official Letterhead for Print */}
        <div className="print-only hidden print:block text-center border-b-2 border-black pb-6 mb-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-700">Pemerintah Kota Sejahtera — Kelurahan Maju Jaya</h2>
          <h1 className="text-2xl font-black text-black uppercase mt-1">Sekretariat RW 03 / Wilayah Pelayanan Terpadu</h1>
          <p className="text-xs font-medium text-zinc-600 mt-1">Jl. Merdeka Raya No. 45, Telp: (021) 555-BANSOS</p>
          <div className="mt-4 inline-block border-2 border-black px-4 py-1 text-xs font-black uppercase bg-zinc-100">
            Tanda Bukti Validasi &amp; Pengajuan Bantuan Sosial (Bansos)
          </div>
        </div>

        {/* Page Header (Hidden on Print) */}
        <div className="text-center space-y-3 mb-4 print:hidden">
          <span className="bg-amber-300 border-2 border-black px-3 py-1 rounded text-xs font-black uppercase tracking-wider inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            Pelacakan Real-Time
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-black tracking-tight">
            Status Pengajuan Bansos
          </h1>
          <p className="text-zinc-600 font-medium">
            Detail status pengajuan bantuan sosial Anda saat ini.
          </p>

          {/* Quick Search Bar */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto mt-6 flex gap-3 print:hidden">
            <div className="relative flex-grow">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-black">search</span>
              <input 
                type="text" 
                value={nikQuery}
                onChange={(e) => setNikQuery(e.target.value)}
                placeholder="Masukkan NIK untuk melacak..."
                className="bold-input w-full pl-10 pr-4 text-black font-mono text-sm h-12"
              />
            </div>
            <button type="submit" className="bold-btn px-6 bg-black text-white rounded-xl text-sm h-12 flex items-center justify-center">
              Cari
            </button>
          </form>
        </div>

        {/* Main Tracking Card */}
        <div className="bold-card p-6 md:p-10 bg-white flex flex-col gap-8">
          {/* NIK Identification */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-2 border-black pb-6">
            <div>
              <p className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-1">Status NIK Warga</p>
              <h2 className="text-xl md:text-2xl font-black text-black font-mono">
                {activeApplicant ? activeApplicant.nik : '3273110203990001'}
              </h2>
            </div>
            <div className={`text-black font-black text-xs px-4 py-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 ${
              isApproved ? 'bg-emerald-300' : isRejected ? 'bg-rose-300' : isPendingRw ? 'bg-amber-300' : 'bg-amber-200'
            }`}>
              <span className="material-symbols-outlined ${isApproved ? '' : 'animate-spin'} text-sm print:hidden" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isApproved ? 'check_circle' : isRejected ? 'cancel' : 'sync'}
              </span>
              {isApproved ? 'Disetujui & Selesai' : isRejected ? 'Pengajuan Ditolak' : isPendingRw ? 'Sedang Diproses RW' : 'Menunggu Verifikasi RT'}
            </div>
          </div>

          {/* Progress Stepper */}
          <div className="relative pt-4 pb-6 overflow-x-auto print:hidden">
            {/* Desktop View: Horizontal Steps */}
            <div className="hidden md:flex justify-between relative">
              {/* Connecting Line */}
              <div className="absolute left-0 top-4 w-full h-1 bg-black z-0">
                <div className={`absolute left-0 top-0 h-full ${isApproved ? 'w-full bg-emerald-400' : isPendingRw ? 'w-1/2 bg-emerald-400' : isRejected ? 'w-1/4 bg-rose-400' : 'w-1/4 bg-amber-400'}`}></div>
              </div>
              
              {/* Step 1 */}
              <div className="flex flex-col items-center gap-2 relative z-10 w-1/4">
                <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>check</span>
                </div>
                <div className="text-center">
                  <h3 className="text-xs font-black text-black">Berkas Masuk</h3>
                  <p className="text-[11px] font-bold text-zinc-500">{activeApplicant?.submissionDate || '12 Okt 2023'}</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center gap-2 relative z-10 w-1/4">
                <div className={`w-10 h-10 rounded-xl ${statusRT === 'Disetujui' ? 'bg-black text-white' : statusRT === 'Ditolak' ? 'bg-rose-400 text-black' : 'bg-amber-300 text-black animate-bounce'} flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>
                    {statusRT === 'Disetujui' ? 'check' : statusRT === 'Ditolak' ? 'close' : 'pending'}
                  </span>
                </div>
                <div className="text-center">
                  <h3 className="text-xs font-black text-black">Cek RT {activeApplicant?.rt || '01'}</h3>
                  <p className={`text-[11px] font-black ${statusRT === 'Disetujui' ? 'text-emerald-700' : statusRT === 'Ditolak' ? 'text-rose-700' : 'text-amber-700'}`}>
                    {statusRT === 'Disetujui' ? 'Disetujui' : statusRT === 'Ditolak' ? 'Ditolak RT' : 'Menunggu'}
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center gap-2 relative z-10 w-1/4">
                <div className={`w-10 h-10 rounded-xl ${statusRW === 'Disetujui' ? 'bg-black text-white' : statusRW === 'Ditolak' ? 'bg-rose-400 text-black' : statusRT === 'Disetujui' ? 'bg-amber-400 text-black animate-bounce' : 'bg-zinc-200 text-zinc-500'} flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>
                    {statusRW === 'Disetujui' ? 'check' : statusRW === 'Ditolak' ? 'close' : 'verified_user'}
                  </span>
                </div>
                <div className="text-center">
                  <h3 className="text-xs font-black text-black">Validasi RW</h3>
                  <p className={`text-[11px] font-black ${statusRW === 'Disetujui' ? 'text-emerald-700' : statusRW === 'Ditolak' ? 'text-rose-700' : statusRT === 'Disetujui' ? 'text-amber-700' : 'text-zinc-400'}`}>
                    {statusRW === 'Disetujui' ? 'Disetujui' : statusRW === 'Ditolak' ? 'Ditolak RW' : statusRT === 'Disetujui' ? 'Berlangsung' : 'Menunggu RT'}
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className={`flex flex-col items-center gap-2 relative z-10 w-1/4 ${isApproved ? '' : 'opacity-60'}`}>
                <div className={`w-10 h-10 rounded-xl ${isApproved ? 'bg-emerald-400 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-zinc-200 text-zinc-500'} flex items-center justify-center border-2 border-black`}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>
                    {isApproved ? 'workspace_premium' : 'lock'}
                  </span>
                </div>
                <div className="text-center">
                  <h3 className="text-xs font-black text-black">Selesai / E-Ticket</h3>
                  <p className={`text-[11px] font-bold ${isApproved ? 'text-emerald-700' : 'text-zinc-400'}`}>
                    {isApproved ? 'Siap Diambil' : 'Menunggu'}
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile View: Vertical Steps */}
            <div className="md:hidden flex flex-col gap-6 relative">
              <div className="absolute left-[19px] top-4 bottom-4 w-1 bg-black"></div>
              
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center flex-shrink-0 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>check</span>
                </div>
                <div className="pt-1">
                  <h3 className="text-sm font-black text-black">Berkas Masuk</h3>
                  <p className="text-xs font-bold text-zinc-500">{activeApplicant?.submissionDate || '12 Okt 2023'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center flex-shrink-0 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>check</span>
                </div>
                <div className="pt-1">
                  <h3 className="text-sm font-black text-black">Cek RT</h3>
                  <p className="text-xs font-bold text-zinc-500">Disetujui RT 0{activeApplicant?.rt || '1'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-black flex items-center justify-center flex-shrink-0 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <span className="text-sm font-black">3</span>
                </div>
                <div className="pt-1">
                  <h3 className="text-sm font-black text-black">Validasi RW</h3>
                  <p className="text-xs font-bold text-amber-700">Sedang berlangsung</p>
                </div>
              </div>

              <div className="flex items-start gap-4 relative z-10 opacity-60">
                <div className="w-10 h-10 rounded-xl bg-zinc-200 text-zinc-500 flex items-center justify-center flex-shrink-0 border-2 border-black">
                  <span className="text-sm font-bold">4</span>
                </div>
                <div className="pt-1">
                  <h3 className="text-sm font-black text-zinc-500">Disetujui</h3>
                  <p className="text-xs font-medium text-zinc-400">Menunggu</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detail Summary */}
          <div className="bg-amber-50 rounded-xl p-6 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase mb-1">Nama Kepala Keluarga</p>
              <p className="text-base font-black text-black">{activeApplicant?.name || 'Budi Santoso'}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase mb-1">Jenis Bansos</p>
              <p className="text-base font-black text-black">{activeApplicant?.bansosType || 'Program Keluarga Harapan (PKH)'}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase mb-1">Tanggal Pengajuan</p>
              <p className="text-base font-black text-black">{activeApplicant?.submissionDate || '12 Oktober 2023'}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase mb-1">Pekerjaan</p>
              <p className="text-base font-black text-black">{activeApplicant?.job || 'Karyawan Swasta'}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase mb-1">Perkiraan Pendapatan</p>
              <p className="text-base font-black text-black">Rp {(activeApplicant?.monthlyIncome || 1400000).toLocaleString('id-ID')}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase mb-1">Wilayah RT / RW</p>
              <p className="text-base font-black text-black">RT {activeApplicant?.rt || '01'} / RW {activeApplicant?.rw || '03'}</p>
            </div>
          </div>

          {/* Print Signature Section (Visible Only on Print) */}
          <div className="print-only hidden print:flex justify-between items-center pt-8 mt-4 border-t border-dashed border-black text-center text-xs">
            <div>
              <p className="font-bold">Mengetahui,</p>
              <p className="font-bold">Ketua RT {activeApplicant?.rt || '01'}</p>
              <div className="h-16"></div>
              <p className="font-bold underline">( ........................................ )</p>
            </div>
            <div>
              <p className="font-bold">Kota Sejahtera, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <p className="font-bold">Ketua RW 03</p>
              <div className="h-16"></div>
              <p className="font-bold underline">( H. Bambang Sutrisno )</p>
            </div>
          </div>

          {/* Primary Action */}
          <div className="pt-4 border-t-2 border-black flex justify-end print:hidden">
            <button 
              onClick={handlePrintPdf}
              className="bold-btn w-full md:w-auto h-12 px-8 bg-black text-white rounded-xl text-sm flex items-center justify-center gap-3 hover:bg-zinc-900"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>print</span>
              Cetak Bukti Pengambilan (Print / PDF)
            </button>
          </div>
        </div>

        {/* Contextual Helper */}
        <div className="flex items-start gap-4 p-5 bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] print:hidden">
          <span className="material-symbols-outlined text-black mt-0.5" style={{ fontSize: '22px' }}>info</span>
          <p className="text-xs font-bold text-zinc-700 leading-relaxed">
            Proses validasi RW biasanya memakan waktu 3-5 hari kerja. Pastikan nomor kontak yang terdaftar selalu aktif jika petugas membutuhkan informasi tambahan.
          </p>
        </div>
      </div>
    </main>
  );
};

