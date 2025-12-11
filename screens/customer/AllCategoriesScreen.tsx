
import React from 'react';
import { CATEGORIES } from '../../constants';
import { AppView } from '../../types';
import { ArrowLeft } from 'lucide-react';

interface AllCategoriesScreenProps {
  onBack: () => void;
  onSelectCategory: (id: string) => void;
  t: (key: string) => string;
}

export const AllCategoriesScreen: React.FC<AllCategoriesScreenProps> = ({ onBack, onSelectCategory, t }) => {
  
  const renderCategoryGroup = (type: 'HOME' | 'INDUSTRIAL' | 'PROFESSIONAL', titleKey: string) => {
    const items = CATEGORIES.filter(c => c.type === type);
    if (items.length === 0) return null;

    return (
      <div className="mb-6 animate-fade-in">
        <h3 className="font-bold text-lg text-secondary mb-3 px-1">{t(titleKey)}</h3>
        <div className="grid grid-cols-3 gap-4">
          {items.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="flex flex-col items-center gap-2 group p-2 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                <cat.icon size={24} />
              </div>
              <span className="text-xs font-medium text-center text-gray-600 leading-tight">{t(cat.id) || cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="p-4 flex items-center gap-4 border-b border-gray-100 shadow-sm z-10">
        <button onClick={onBack} className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-bold">{t('all_categories')}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {renderCategoryGroup('HOME', 'home_services')}
        {renderCategoryGroup('INDUSTRIAL', 'industrial_services')}
        {renderCategoryGroup('PROFESSIONAL', 'professional_services')}
      </div>
    </div>
  );
};