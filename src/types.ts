export type ScreenType = 
  | 'home' 
  | 'register' 
  | 'login' 
  | 'tracking' 
  | 'dashboard'
  | 'statistics'
  | 'settings'
  | 'admin-rt' 
  | 'admin-rw' 
  | 'help'
  | 'privacy'
  | 'terms'
  | 'contact';

export interface BansosApplicant {
  id: string;
  nik: string;
  name: string;
  rt: string;
  rw: string;
  job: string;
  monthlyIncome: number;
  statusRT: 'Menunggu' | 'Disetujui' | 'Ditolak';
  statusRW: 'Menunggu' | 'Disetujui' | 'Ditolak';
  submissionDate: string;
  bansosType: string;
  ktpPhoto?: string;
}

export interface RTStats {
  total: number;
  menunggu: number;
  disetujui: number;
  ditolak: number;
}
