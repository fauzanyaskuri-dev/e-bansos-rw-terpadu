import React, { useState } from 'react';
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

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [applicants, setApplicants] = useState<BansosApplicant[]>(INITIAL_APPLICANTS);
  const [searchedNik, setSearchedNik] = useState<string>('3273110203990001');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<'rt' | 'rw' | null>(null);

  const handleNavigate = (screen: ScreenType) => {
    // If trying to access admin screens without login, prompt login or auto demo login
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

  const handleAddApplicant = (newApplicant: BansosApplicant) => {
    setApplicants([newApplicant, ...applicants]);
  };

  const handleUpdateStatus = (id: string, status: 'Disetujui' | 'Ditolak') => {
    setApplicants(prev => prev.map(item => item.id === id ? { 
      ...item, 
      statusRT: status,
      statusRW: status === 'Ditolak' ? 'Ditolak' : item.statusRW 
    } : item));
  };

  const handleUpdateStatusRW = (id: string, status: 'Disetujui' | 'Ditolak') => {
    setApplicants(prev => prev.map(item => item.id === id ? { ...item, statusRW: status } : item));
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
    </div>
  );
}
