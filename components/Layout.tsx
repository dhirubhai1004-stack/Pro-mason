
import React from 'react';
import { Home, Briefcase, Wallet, User, MessageSquare, MapPin } from 'lucide-react';
import { AppView, UserMode } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  userMode: UserMode | null;
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  t: (key: string) => string;
}

export const Layout: React.FC<LayoutProps> = ({ children, userMode, currentView, onNavigate, t }) => {
  // Views that don't show bottom nav
  const noNavViews = [
    AppView.LANGUAGE_SELECTION,
    AppView.SPLASH, 
    AppView.AUTH, 
    AppView.ONBOARDING_WORKER
  ];
  const showNav = !noNavViews.includes(currentView);

  const customerNav = [
    { icon: Home, label: t('nav_home'), view: AppView.CUSTOMER_HOME },
    { icon: MapPin, label: t('nav_track'), view: AppView.TRACKING },
    { icon: Wallet, label: t('nav_wallet'), view: AppView.WALLET },
    { icon: User, label: t('nav_profile'), view: AppView.PROFILE },
  ];

  const workerNav = [
    { icon: Home, label: t('nav_jobs'), view: AppView.WORKER_HOME },
    { icon: Briefcase, label: t('nav_active'), view: AppView.ACTIVE_JOB },
    { icon: Wallet, label: t('nav_earnings'), view: AppView.EARNINGS },
    { icon: User, label: t('nav_profile'), view: AppView.PROFILE },
  ];

  const navItems = userMode === UserMode.CUSTOMER ? customerNav : workerNav;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col mx-auto max-w-md shadow-2xl overflow-hidden relative">
      <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {children}
      </main>

      {showNav && (
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50 rounded-t-2xl shadow-[0_-5px_10px_rgba(0,0,0,0.02)]">
          {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.label}
                onClick={() => onNavigate(item.view)}
                className={`flex flex-col items-center gap-1 transition-colors duration-200 ${
                  isActive ? 'text-primary' : 'text-gray-400'
                }`}
              >
                <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};