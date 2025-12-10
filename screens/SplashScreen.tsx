
import React from 'react';
import { UserMode } from '../types';
import { Button } from '../components/Button';
import { Hammer, HardHat, User } from 'lucide-react';

interface SplashScreenProps {
  onSelectMode: (mode: UserMode) => void;
  t: (key: string) => string;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onSelectMode, t }) => {
  return (
    <div className="h-full flex flex-col bg-secondary text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-20%] right-[-20%] w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-8 z-10 mt-10">
        <div className="w-24 h-24 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary/20">
          <HardHat size={48} color="white" strokeWidth={1.5} />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">{t('app_name')}</h1>
        <p className="text-gray-400 text-center max-w-xs leading-relaxed">
          {t('tagline_customer')}
        </p>
      </div>

      <div className="p-6 space-y-4 bg-white rounded-t-3xl pb-12 z-10 text-secondary animate-slide-up">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold">{t('choose_role')}</h2>
          <p className="text-sm text-gray-500">{t('how_use_app')}</p>
        </div>

        <button 
          onClick={() => onSelectMode(UserMode.CUSTOMER)}
          className="w-full bg-gray-50 hover:bg-orange-50 border-2 border-transparent hover:border-primary p-4 rounded-xl flex items-center gap-4 transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <User size={24} />
          </div>
          <div className="text-left flex-1">
            <h3 className="font-bold text-lg">{t('i_need_workers')}</h3>
            <p className="text-xs text-gray-500">{t('hire_masons')}</p>
          </div>
        </button>

        <button 
          onClick={() => onSelectMode(UserMode.WORKER)}
          className="w-full bg-secondary text-white p-4 rounded-xl flex items-center gap-4 transition-all hover:bg-black shadow-lg shadow-black/20"
        >
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
            <Hammer size={24} />
          </div>
          <div className="text-left flex-1">
            <h3 className="font-bold text-lg">{t('i_am_worker')}</h3>
            <p className="text-xs text-gray-400">{t('find_jobs')}</p>
          </div>
        </button>
      </div>
    </div>
  );
};
