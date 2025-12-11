
import React from 'react';
import { MOCK_WORKERS, CATEGORIES } from '../../constants';
import { AppView, Worker } from '../../types';
import { ArrowLeft, Star, MapPin } from 'lucide-react';

interface ServiceCategoryScreenProps {
  categoryId: string;
  onBack: () => void;
  onSelectWorker: (worker: Worker) => void;
  t: (key: string) => string;
}

export const ServiceCategoryScreen: React.FC<ServiceCategoryScreenProps> = ({ categoryId, onBack, onSelectWorker, t }) => {
  // Filter workers. In a real app this would be an API call.
  // For demo, we match loosely or show all if none found to ensure UI isn't empty.
  const categoryName = t(categoryId);
  const categoryDef = CATEGORIES.find(c => c.id === categoryId);
  
  // Basic filtering mock logic
  let workers = MOCK_WORKERS.filter(w => w.category.toLowerCase() === categoryId.toLowerCase() || w.category === categoryName);
  
  // Fallback for demo if no workers match specifically (since we added new categories but maybe not enough mock workers)
  if (workers.length === 0) {
    workers = MOCK_WORKERS; 
  }

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <div className="bg-white p-4 flex items-center gap-4 border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <button onClick={onBack} className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <ArrowLeft size={24} />
        </button>
        <div>
           <h2 className="text-xl font-bold">{t(categoryId) || categoryDef?.name}</h2>
           <p className="text-xs text-gray-500">{workers.length} {t('nearby_workers')}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
         {workers.map((worker) => (
            <div 
              key={worker.id}
              onClick={() => onSelectWorker(worker)}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 active:scale-[0.98] transition-transform animate-slide-up"
            >
              <img 
                src={worker.image} 
                alt={worker.name} 
                className="w-20 h-20 rounded-xl object-cover bg-gray-200"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-lg text-secondary">{worker.name}</h4>
                  <div className="flex items-center gap-1 bg-green-50 px-1.5 py-0.5 rounded text-xs font-bold text-green-700">
                    <Star size={10} fill="currentColor" />
                    {worker.rating}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-1">{t(worker.category.toLowerCase()) || worker.category} • {worker.experience} {t('yrs_exp')}</p>
                <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                   <MapPin size={12} /> 2.5 km
                </div>
                <p className="text-primary font-bold text-lg">₹{worker.hourlyRate}<span className="text-sm text-gray-400 font-normal">/{t('hr')}</span></p>
              </div>
            </div>
         ))}
      </div>
    </div>
  );
};
