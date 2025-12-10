
import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { ImageUpload } from '../../components/ImageUpload';
import { CheckCircle } from 'lucide-react';

interface WorkerOnboardingProps {
  onComplete: () => void;
  t: (key: string) => string;
}

export const WorkerOnboarding: React.FC<WorkerOnboardingProps> = ({ onComplete, t }) => {
  const [step, setStep] = useState<'FORM' | 'SUCCESS'>('FORM');
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [aadharFront, setAadharFront] = useState<string | null>(null);
  const [aadharBack, setAadharBack] = useState<string | null>(null);
  const [bankProof, setBankProof] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    skill: '',
    experience: ''
  });

  const handleSubmit = () => {
    // Basic validation
    if (!profilePhoto || !aadharFront || !aadharBack || !bankProof || !formData.name || !formData.skill) {
      alert('Please complete all fields and uploads.');
      return;
    }

    setLoading(true);
    // Simulate API upload
    setTimeout(() => {
      setLoading(false);
      setStep('SUCCESS');
    }, 1500);
  };

  if (step === 'SUCCESS') {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 bg-white text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle size={48} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">{t('verification_pending')}</h2>
        <p className="text-gray-500 mb-8 max-w-xs">
          {t('verification_desc')}
        </p>
        <Button fullWidth onClick={onComplete}>{t('continue')}</Button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="bg-white p-6 shadow-sm z-10">
        <h2 className="text-2xl font-bold">{t('complete_profile')}</h2>
        <p className="text-sm text-gray-500">{t('personal_details')} & {t('upload_documents')}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Profile Photo Section */}
        <div className="flex flex-col items-center">
          <ImageUpload 
            label={t('profile_photo')}
            image={profilePhoto} 
            onImageChange={(_, url) => setProfilePhoto(url)} 
            t={t}
            aspectRatio="square"
            className="w-32"
          />
        </div>

        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('full_name')}</label>
            <input 
              type="text" 
              className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-primary"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('select_skill')}</label>
                <select 
                  className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-primary"
                  value={formData.skill}
                  onChange={(e) => setFormData({...formData, skill: e.target.value})}
                >
                  <option value="">-</option>
                  <option value="Mason">{t('mason')}</option>
                  <option value="Labour">{t('labour')}</option>
                  <option value="Painter">{t('painter')}</option>
                  <option value="Carpenter">{t('carpenter')}</option>
                </select>
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('years_experience')}</label>
                <input 
                  type="number" 
                  className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-primary"
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                />
             </div>
          </div>
        </div>

        {/* Documents Section */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-secondary pt-2">{t('upload_documents')}</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <ImageUpload 
              label={t('aadhar_front')}
              image={aadharFront} 
              onImageChange={(_, url) => setAadharFront(url)} 
              t={t}
            />
            <ImageUpload 
              label={t('aadhar_back')}
              image={aadharBack} 
              onImageChange={(_, url) => setAadharBack(url)} 
              t={t}
            />
          </div>
          
          <ImageUpload 
            label={t('bank_passbook')}
            image={bankProof} 
            onImageChange={(_, url) => setBankProof(url)} 
            t={t}
          />
        </div>
      </div>

      <div className="bg-white p-4 border-t border-gray-100">
        <Button fullWidth onClick={handleSubmit} isLoading={loading}>
          {t('submit_verification')}
        </Button>
      </div>
    </div>
  );
};
