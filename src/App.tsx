import React, { useState, useEffect } from 'react';
import { ScreenType, BansosApplicant } from './types';
import { INITIAL_APPLICANTS } from './data';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingScreen } from './components/LandingScreen';
import { RegistrationScreen } from './components/RegistrationScreen';
import { TrackingScreen } from './components/TrackingScreen';
import { LoginScreen } from './components/LoginScreen';
import { AdminRTScreen } from './components/AdminRTScreen';
import { AdminRWScreen } from './components/AdminRWScreen';
import { InfoScreen } from './components/InfoScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { StatisticsScreen } from './components/StatisticsScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { PwaInstallBanner } from './components/PwaInstallBanner';
import { 
  initializeFirestoreData, 
  subscribeToApplicants, 
  addApplicantToFirestore, 
  updateApplicantInFirestore 
} from './lib/firebase';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [applicants, setApplicants] = useState<BansosApplicant[]>(INITIAL_APPLICANTS);
  const [searchedNik, setSearchedNik] = useState<string>('3273110203990001');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<'rt' | 'rw' | null>(null);

  useEffect(() => {
    initializeFirestoreData();
    const unsubscribe = subscribeToApplicants((data) => {
      setApplicants(data);
    });
    return () => unsubscribe();
  }, []);

  const handleNavigate = (screen: ScreenType) => {
    if ((screen === 'admin-rt' || screen === 'admin-rw') && !isLoggedIn) {
      setCurrentScreen('login');
      return;
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (role: 'rt' | 'rw') => {
    setIsLoggedIn(true);
    setUserRole(role);
    if (role === 'rt') {
      setCurrentScreen('admin-rt');
    } else {
      setCurrentScreen('admin-rw');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setCurrentScreen('home');
  };

  const handleSearchNik = (nik: string) => {
    setSearchedNik(nik);
  };

  const handleAddApplicant = async (newApplicant: BansosApplicant) => {
    // Optimistic update + Firebase
    setApplicants(prev => [newApplicant, ...prev]);
    await addApplicantToFirestore(newApplicant);
  };

  const handleUpdateStatus = async (id: string, status: 'Disetujui' | 'Ditolak') => {
    const updatedStatusRW = status === 'Ditolak' ? 'Ditolak' : applicants.find(i => i.id === id)?.statusRW || 'Menunggu';
    setApplicants(prev => prev.map(item => item.id === id ? { 
      ...item, 
      statusRT: status,
      statusRW: updatedStatusRW 
    } : item));
    await updateApplicantInFirestore(id, { 
      statusRT: status, 
      statusRW: updatedStatusRW 
    });
  };

  const handleUpdateStatusRW = async (id: string, status: 'Disetujui' | 'Ditolak') => {
    setApplicants(prev => prev.map(item => item.id === id ? { ...item, statusRW: status } : item));
    await updateApplicantInFirestore(id, { statusRW: status });
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-body-md selection:bg-primary-container selection:text-on-primary-container">
      {/* Top Header */}
      <Header 
        currentScreen={currentScreen} 
        onNavigate={handleNavigate} 
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        onLogout={handleLogout}
      />

      {/* Screen Router */}
      {currentScreen === 'home' && (
        <LandingScreen 
          onNavigate={handleNavigate} 
          onSearchNik={handleSearchNik} 
        />
      )}

      {currentScreen === 'register' && (
        <RegistrationScreen 
          onNavigate={handleNavigate} 
          onAddApplicant={handleAddApplicant} 
        />
      )}

      {currentScreen === 'tracking' && (
        <TrackingScreen 
          onNavigate={handleNavigate} 
          searchedNik={searchedNik} 
          applicants={applicants} 
        />
      )}

      {currentScreen === 'dashboard' && (
        <DashboardScreen 
          applicants={applicants} 
          onNavigate={handleNavigate} 
        />
      )}

      {currentScreen === 'statistics' && (
        <StatisticsScreen 
          applicants={applicants} 
          onNavigate={handleNavigate} 
        />
      )}

      {currentScreen === 'settings' && (
        <SettingsScreen 
          applicants={applicants} 
          onNavigate={handleNavigate} 
        />
      )}

      {currentScreen === 'login' && (
        <LoginScreen 
          onLogin={handleLogin} 
          onNavigate={handleNavigate} 
        />
      )}

      {currentScreen === 'admin-rt' && (
        <AdminRTScreen 
          applicants={applicants} 
          onUpdateStatus={handleUpdateStatus} 
          onNavigate={handleNavigate} 
          onLogout={handleLogout} 
        />
      )}

      {currentScreen === 'admin-rw' && (
        <AdminRWScreen 
          applicants={applicants} 
          onUpdateStatusRW={handleUpdateStatusRW}
          onNavigate={handleNavigate} 
          onLogout={handleLogout} 
        />
      )}

      {(currentScreen === 'help' || currentScreen === 'privacy' || currentScreen === 'terms' || currentScreen === 'contact') && (
        <InfoScreen 
          type={currentScreen as any} 
          onNavigate={handleNavigate} 
        />
      )}

      {/* Footer (hidden inside admin panels which have their own sidebar/footers) */}
      {currentScreen !== 'admin-rt' && currentScreen !== 'admin-rw' && (
        <Footer onNavigate={handleNavigate} />
      )}

      {/* PWA & Mobile Native App Install / Status Banner */}
      <PwaInstallBanner />
    </div>
  );
}
