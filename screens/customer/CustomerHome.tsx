
import React, { useState } from 'react';
import { CATEGORIES, MOCK_WORKERS } from '../../constants';
import { AppView, Worker } from '../../types';
import { Search, Star, MapPin, Bell, List, Map as MapIcon, ArrowRight, Navigation } from 'lucide-react';

interface CustomerHomeProps {
  onNavigate: (view: AppView, data?: any) => void;
  t: (key: string) => string;
}

export const CustomerHome: React.FC<CustomerHomeProps> = ({ onNavigate, t }) => {
  const [viewMode, setViewMode] = useState<'LIST' | 'MAP'>('LIST');
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

  // Show only first 6 categories on home
  const displayCategories = CATEGORIES.slice(0, 6);

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <header className="bg-secondary text-white p-6 pt-10 rounded-b-3xl shadow-lg relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-gray-400 text-sm mb-1">{t('current_location')}</p>
            <div className="flex items-center gap-2 font-semibold">
              <MapPin size={18} className="text-primary" />
              <span>Sector 29, Gurgaon</span>
            </div>
          </div>
          <button className="relative p-2 bg-white/10 rounded-full hover:bg-white/20">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-secondary"></span>
          </button>
        </div>
        
        <div className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-md">
          <Search size={20} className="text-gray-400" />
          <input 
            type="text" 
            placeholder={t('search_placeholder')}
            className="flex-1 outline-none text-secondary placeholder:text-gray-400"
          />
        </div>
        
        {/* Banner */}
        <div className="mt-8 bg-gradient-to-r from-primary to-orange-400 rounded-xl p-4 text-white flex justify-between items-center shadow-lg shadow-orange-500/20">
          <div>
            <p className="font-bold text-lg">{t('banner_offer')}</p>
            <p className="text-sm opacity-90">{t('banner_desc')}</p>
          </div>
          <button className="bg-white text-primary px-3 py-1.5 rounded-lg text-xs font-bold">
            {t('book_now')}
          </button>
        </div>
      </header>

      <div className="p-6 space-y-8">
        {/* Categories */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h3 className="font-bold text-lg text-secondary">{t('services')}</h3>
            <button 
              onClick={() => onNavigate(AppView.ALL_CATEGORIES)}
              className="text-primary text-sm font-medium"
            >
              {t('see_all')}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {displayCategories.map((cat) => (
              <button 
                key={cat.id}
                onClick={() => onNavigate(AppView.SERVICE_CATEGORY, { category: cat.id })}
                className="flex flex-col items-center gap-2 group"
              >
                <div className={`w-16 h-16 rounded-2xl ${cat.color} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                  <cat.icon size={28} />
                </div>
                <span className="text-xs font-medium text-gray-600">{t(cat.id) || cat.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Nearby Workers Section with Toggle */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-secondary">{t('nearby_workers')}</h3>
            
            {/* View Toggle */}
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button 
                 onClick={() => setViewMode('LIST')}
                 className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${viewMode === 'LIST' ? 'bg-white shadow-sm text-secondary' : 'text-gray-400'}`}
              >
                 <List size={16} /> {t('list_view')}
              </button>
              <button 
                 onClick={() => setViewMode('MAP')}
                 className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${viewMode === 'MAP' ? 'bg-white shadow-sm text-secondary' : 'text-gray-400'}`}
              >
                 <MapIcon size={16} /> {t('map_view')}
              </button>
            </div>
          </div>

          {viewMode === 'LIST' ? (
            <div className="space-y-4 animate-fade-in">
              {MOCK_WORKERS.slice(0, 5).map((worker) => (
                <div 
                  key={worker.id}
                  onClick={() => onNavigate(AppView.WORKER_PROFILE, { worker })}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 active:scale-[0.98] transition-transform"
                >
                  <img 
                    src={worker.image} 
                    alt={worker.name} 
                    className="w-16 h-16 rounded-xl object-cover bg-gray-200"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-secondary">{worker.name}</h4>
                      <div className="flex items-center gap-1 bg-green-50 px-1.5 py-0.5 rounded text-xs font-bold text-green-700">
                        <Star size={10} fill="currentColor" />
                        {worker.rating}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{t(worker.category.toLowerCase()) || worker.category} • {worker.experience} {t('yrs_exp')}</p>
                    <p className="text-primary font-bold text-sm">₹{worker.hourlyRate}/{t('hr')}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[400px] bg-gray-100 rounded-2xl relative overflow-hidden shadow-inner border border-gray-200 animate-fade-in group">
               {/* Map Background Pattern */}
               <div 
                 className="absolute inset-0 opacity-50" 
                 onClick={() => setSelectedWorker(null)}
                 style={{
                   backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px), radial-gradient(#cbd5e1 1px, transparent 1px)',
                   backgroundSize: '20px 20px',
                   backgroundPosition: '0 0, 10px 10px'
                 }}
               ></div>
               
               {/* Mock Roads */}
               <div className="absolute top-1/4 left-0 right-0 h-3 bg-white/70 -rotate-6 transform shadow-sm pointer-events-none"></div>
               <div className="absolute top-0 bottom-0 left-2/3 w-4 bg-white/70 rotate-12 transform shadow-sm pointer-events-none"></div>
               <div className="absolute bottom-1/4 left-0 right-0 h-5 bg-white/70 rotate-3 transform shadow-sm pointer-events-none"></div>

               {/* Current User Location */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                  <div className="w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow-md animate-pulse"></div>
                  <div className="w-20 h-20 bg-blue-500/10 rounded-full absolute -top-8 -left-8 animate-ping opacity-20"></div>
               </div>

               {/* Worker Pins */}
               {MOCK_WORKERS.slice(0, 5).map((worker, index) => {
                 // Deterministic mock positions
                 const top = 20 + (index * 25) % 60; 
                 const left = 20 + (index * 30) % 60;
                 const isSelected = selectedWorker?.id === worker.id;

                 return (
                   <button
                     key={worker.id}
                     onClick={(e) => { e.stopPropagation(); setSelectedWorker(worker); }}
                     className="absolute -translate-x-1/2 -translate-y-full transition-all duration-300 hover:z-20"
                     style={{ top: `${top}%`, left: `${left}%`, zIndex: isSelected ? 30 : 10 }}
                   >
                     <div className={`flex flex-col items-center transition-transform ${isSelected ? 'scale-110' : 'hover:scale-105'}`}>
                       <div className={`p-2 rounded-full shadow-lg border-2 border-white transition-colors ${isSelected ? 'bg-secondary text-white' : 'bg-primary text-white'}`}>
                           <MapPin size={20} fill="currentColor" />
                       </div>
                       {/* Name Tag */}
                       <span className={`mt-1 px-2 py-0.5 rounded text-[10px] font-bold shadow-sm whitespace-nowrap transition-all ${isSelected ? 'bg-secondary text-white opacity-100' : 'bg-white text-secondary opacity-0 group-hover:opacity-100'}`}>
                          {worker.name}
                       </span>
                     </div>
                   </button>
                 );
               })}

               {/* Selected Worker Overlay Card */}
               {selectedWorker && (
                 <div className="absolute bottom-4 left-4 right-4 bg-white p-3 rounded-xl shadow-xl border border-gray-100 flex gap-3 z-40 animate-slide-up">
                    <img src={selectedWorker.image} className="w-12 h-12 rounded-lg object-cover bg-gray-200" alt={selectedWorker.name} />
                    <div className="flex-1 min-w-0">
                       <h4 className="font-bold text-sm text-secondary truncate">{selectedWorker.name}</h4>
                       <p className="text-xs text-gray-500">{t(selectedWorker.category.toLowerCase())}</p>
                       <div className="flex items-center gap-1 mt-1">
                          <Star size={10} className="text-orange-500" fill="currentColor" />
                          <span className="text-xs font-bold">{selectedWorker.rating}</span>
                          <span className="text-xs text-gray-300">•</span>
                          <span className="text-xs font-bold text-primary">₹{selectedWorker.hourlyRate}/{t('hr')}</span>
                       </div>
                    </div>
                    <button 
                       onClick={() => onNavigate(AppView.WORKER_PROFILE, { worker: selectedWorker })}
                       className="bg-secondary text-white w-10 h-10 rounded-lg flex items-center justify-center hover:bg-black transition-colors self-center shadow-lg shadow-black/20"
                    >
                      <ArrowRight size={18} />
                    </button>
                 </div>
               )}

               {/* Map Controls (Visual Only) */}
               <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <div className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-600">
                    <Navigation size={16} />
                  </div>
               </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
