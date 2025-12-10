
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Languages, Check } from 'lucide-react';

interface LanguageSelectionScreenProps {
  onLanguageSelect: (lang: string) => void;
}

const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
];

export const LanguageSelectionScreen: React.FC<LanguageSelectionScreenProps> = ({ onLanguageSelect }) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col bg-white p-6">
      <div className="flex-1 flex flex-col items-center justify-center animate-fade-in pt-8">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-primary mb-6 shadow-lg shadow-orange-100">
          <Languages size={32} />
        </div>
        
        <h1 className="text-2xl font-bold mb-1 text-secondary">Choose Language</h1>
        <p className="text-gray-500 mb-8 font-medium">भाषा चुनें / மொழியைத் தேர்ந்தெடுக்கவும்</p>

        <div className="grid grid-cols-2 gap-4 w-full max-h-[50vh] overflow-y-auto no-scrollbar pb-4">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelected(lang.code)}
              className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 group ${
                selected === lang.code 
                  ? 'border-primary bg-orange-50 text-primary shadow-md' 
                  : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="font-bold text-lg mb-0.5">{lang.native}</div>
              <div className="text-xs opacity-60 font-medium">{lang.name}</div>
              
              {selected === lang.code && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <Check size={12} className="text-white" strokeWidth={3} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-6 bg-white">
        <Button 
          fullWidth 
          disabled={!selected} 
          onClick={() => selected && onLanguageSelect(selected)}
          className="shadow-xl shadow-orange-500/20"
        >
          Continue
        </Button>
        <p className="text-center text-xs text-gray-400 mt-4">You can change this later in settings</p>
      </div>
    </div>
  );
};
