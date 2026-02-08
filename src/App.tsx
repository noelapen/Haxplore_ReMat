import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/AuthPage';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ThemeProvider } from './contexts/ThemeContext';

type UserType = 'user' | 'admin' | null;
type AuthState = 'landing' | 'auth' | 'authenticated';

export default function App() {
  const [authState, setAuthState] = useState<AuthState>('landing');
  const [userType, setUserType] = useState<UserType>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Check for existing session
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedType = localStorage.getItem('userType');
    if (savedUser && savedType) {
      setCurrentUser(JSON.parse(savedUser));
      setUserType(savedType as UserType);
      setAuthState('authenticated');
    }
  }, []);

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    setAuthState('auth');
  };

  const handleAuthSuccess = (user: any) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('userType', userType || '');
    setAuthState('authenticated');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserType(null);
    setAuthState('landing');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userType');
  };

  const handleBackToLanding = () => {
    setUserType(null);
    setAuthState('landing');
  };

  return (
    <ThemeProvider>
      {authState === 'landing' && <LandingPage onSelectUserType={handleUserTypeSelect} />}
      
      {authState === 'auth' && (
        <AuthPage
          userType={userType!}
          onAuthSuccess={handleAuthSuccess}
          onBack={handleBackToLanding}
        />
      )}
      
      {authState === 'authenticated' && userType === 'admin' && (
        <AdminDashboard user={currentUser} onLogout={handleLogout} />
      )}
      
      {authState === 'authenticated' && userType === 'user' && (
        <UserDashboard user={currentUser} onLogout={handleLogout} />
      )}
    </ThemeProvider>
  );
}