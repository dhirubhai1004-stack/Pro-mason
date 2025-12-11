
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { SplashScreen } from './screens/SplashScreen';
import { LanguageSelectionScreen } from './screens/LanguageSelectionScreen';
import { AuthScreen } from './screens/AuthScreen';
import { CustomerHome } from './screens/customer/CustomerHome';
import { AllCategoriesScreen } from './screens/customer/AllCategoriesScreen';
import { ServiceCategoryScreen } from './screens/customer/ServiceCategoryScreen';
import { BookingFlow } from './screens/customer/BookingFlow';
import { WorkerHome } from './screens/worker/WorkerHome';
import { WorkerOnboarding } from './screens/worker/WorkerOnboarding';
import { WalletScreen, ProfileScreen, TrackingScreen, ActiveJobScreen, ChatScreen, BookingsScreen } from './screens/SharedScreens';
import { AppView, UserMode, Worker, Job } from './types';
import { MOCK_WORKERS, MOCK_JOBS } from './constants';
import { ArrowLeft, Star } from 'lucide-react';
import { Button } from './components/Button';
import { TRANSLATIONS, LanguageCode } from './translations';

// Simple Worker Profile View Component placed here to avoid circular dependencies
const WorkerProfileView: React.FC<{ worker: Worker; onBack: () => void; onBook: () => void; t: (key: string) => string }> = ({ worker, onBack, onBook, t }) => (
  <div className="min-h-full bg-white flex flex-col">
    <div className="relative h-64">
      <img src={worker.image} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <button onClick={onBack} className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
        <ArrowLeft size={20} />
      </button>
      <div className="absolute bottom-4 left-4 text-white">
        <h2 className="text-3xl font-bold">{worker.name}</h2>
        <p className="opacity-90 text-lg">{t(worker.category.toLowerCase()) || worker.category}</p>
      </div>
    </div>
    
    <div className="flex-1 p-6 space-y-6 rounded-t-3xl -mt-6 bg-white relative">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-2xl font-bold text-primary">₹{worker.hourlyRate}<span className="text-sm text-gray-500 font-normal">/{t('hr')}</span></p>
        </div>
        <div className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-lg text-green-700 font-bold">
           <Star size={16} fill="currentColor" /> {worker.rating}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-gray-50 p-3 rounded-xl">
          <p className="font-bold text-lg">{worker.jobsCompleted}</p>
          <p className="text-xs text-gray-500">{t('jobs_completed')}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-xl">
          <p className="font-bold text-lg">{worker.experience} {t('yrs_exp')}</p>
          <p className="text-xs text-gray-500">{t('experience')}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-xl">
          <p className="font-bold text-lg text-green-600">Yes</p>
          <p className="text-xs text-gray-500">{t('verified')}</p>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-2">{t('about')}</h3>
        <p className="text-gray-500 leading-relaxed text-sm">
          Skilled {t(worker.category.toLowerCase()) || worker.category} with over {worker.experience} years of experience in residential and commercial projects. Specialist in high-quality finishing and timely delivery.
        </p>
      </div>

      <div className="pt-4">
        <Button fullWidth onClick={onBook}>{t('book_now')}</Button>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [userMode, setUserMode] = useState<UserMode | null>(null);
  const [view, setView] = useState<AppView>(AppView.LANGUAGE_SELECTION);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [language, setLanguage] = useState<LanguageCode>('en');

  // Translation helper
  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['en'][key] || key;
  };

  // Simple router logic
  const handleNavigate = (newView: AppView, data?: any) => {
    if (newView === AppView.WORKER_PROFILE && data?.worker) {
      setSelectedWorker(data.worker);
    }
    if (newView === AppView.ACTIVE_JOB && data?.job) {
      setSelectedJob(data.job);
    }
    if (newView === AppView.SERVICE_CATEGORY && data?.category) {
       setSelectedCategoryId(data.category);
    }
    setView(newView);
  };

  const handleModeSelect = (mode: UserMode) => {
    setUserMode(mode);
    setView(AppView.AUTH);
  };

  const handleAuthSuccess = () => {
    if (userMode === UserMode.CUSTOMER) {
      setView(AppView.CUSTOMER_HOME);
    } else {
      setView(AppView.ONBOARDING_WORKER);
    }
  };

  const renderContent = () => {
    switch (view) {
      case AppView.LANGUAGE_SELECTION:
        return <LanguageSelectionScreen onLanguageSelect={(lang) => { setLanguage(lang as LanguageCode); setView(AppView.SPLASH); }} />;
      
      case AppView.SPLASH:
        return <SplashScreen onSelectMode={handleModeSelect} t={t} />;
      
      case AppView.AUTH:
        return <AuthScreen userMode={userMode!} onSuccess={handleAuthSuccess} onBack={() => setView(AppView.SPLASH)} t={t} />;
      
      case AppView.ONBOARDING_WORKER:
        return <WorkerOnboarding onComplete={() => setView(AppView.WORKER_HOME)} t={t} />;

      /* CUSTOMER VIEWS */
      case AppView.CUSTOMER_HOME:
        return <CustomerHome onNavigate={handleNavigate} t={t} />;
      
      case AppView.ALL_CATEGORIES:
        return (
          <AllCategoriesScreen 
            onBack={() => setView(AppView.CUSTOMER_HOME)}
            onSelectCategory={(id) => handleNavigate(AppView.SERVICE_CATEGORY, { category: id })}
            t={t}
          />
        );

      case AppView.SERVICE_CATEGORY:
        return (
          <ServiceCategoryScreen 
            categoryId={selectedCategoryId || 'mason'}
            onBack={() => setView(AppView.ALL_CATEGORIES)}
            onSelectWorker={(worker) => handleNavigate(AppView.WORKER_PROFILE, { worker })}
            t={t}
          />
        );

      case AppView.WORKER_PROFILE:
        return selectedWorker ? (
          <WorkerProfileView 
            worker={selectedWorker} 
            onBack={() => setView(AppView.CUSTOMER_HOME)}
            onBook={() => setView(AppView.BOOKING_FLOW)}
            t={t}
          />
        ) : null;
      
      case AppView.BOOKING_FLOW:
        return selectedWorker ? (
          <BookingFlow 
            worker={selectedWorker} 
            onBack={() => setView(AppView.WORKER_PROFILE)}
            onComplete={() => setView(AppView.TRACKING)}
            t={t}
          />
        ) : null;

      case AppView.TRACKING:
        return <TrackingScreen t={t} />;
      
      case AppView.BOOKINGS:
        return <BookingsScreen t={t} />;

      /* WORKER VIEWS */
      case AppView.WORKER_HOME:
        return <WorkerHome onNavigate={handleNavigate} t={t} />;
      
      case AppView.ACTIVE_JOB:
        // Use selected job or fallback to mock for demo if direct nav
        const jobToUse = selectedJob || MOCK_JOBS[0];
        return <ActiveJobScreen job={jobToUse} onBack={() => setView(AppView.WORKER_HOME)} t={t} />;

      /* SHARED VIEWS */
      case AppView.WALLET:
      case AppView.EARNINGS:
        return <WalletScreen t={t} />;
      
      case AppView.PROFILE:
        return <ProfileScreen onLogout={() => { setUserMode(null); setView(AppView.LANGUAGE_SELECTION); }} onNavigate={handleNavigate} t={t} />;
      
      case AppView.CHAT:
        return <ChatScreen onBack={() => setView(AppView.CUSTOMER_HOME)} t={t} />;

      default:
        return <div className="p-10 text-center">View Not Found</div>;
    }
  };

  return (
    <Layout userMode={userMode} currentView={view} onNavigate={handleNavigate} t={t}>
      {renderContent()}
    </Layout>
  );
};

export default App;
