
import React, { useState } from 'react';
import { UserMode, AppView } from '../types';
import { Button } from '../components/Button';
import { ArrowLeft, Phone, ShieldCheck } from 'lucide-react';

interface AuthScreenProps {
  userMode: UserMode;
  onSuccess: () => void;
  onBack: () => void;
  t: (key: string) => string;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ userMode, onSuccess, onBack, t }) => {
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = () => {
    if (phone.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('OTP');
    }, 1000);
  };

  const handleVerifyOtp = () => {
    if (otp.length < 4) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1000);
  };

  return (
    <div className="h-full bg-white flex flex-col p-6">
      <button onClick={onBack} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-8">
        <ArrowLeft size={20} />
      </button>

      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-2">
          {step === 'PHONE' ? t('whats_number') : t('verify_number')}
        </h2>
        <p className="text-gray-500 mb-8">
          {step === 'PHONE' 
            ? (userMode === UserMode.CUSTOMER ? t('login_customer_desc') : t('login_worker_desc'))
            : `${t('enter_code_sent')} ${phone}`
          }
        </p>

        {step === 'PHONE' ? (
          <div className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3">
              <Phone size={20} className="text-gray-400" />
              <div className="w-px h-6 bg-gray-300"></div>
              <span className="text-gray-500 font-medium">+91</span>
              <input 
                type="tel" 
                placeholder="00000 00000" 
                className="bg-transparent flex-1 outline-none text-lg font-semibold"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                maxLength={10}
              />
            </div>
            <Button 
              fullWidth 
              onClick={handleSendOtp} 
              disabled={phone.length !== 10}
              isLoading={loading}
            >
              {t('get_otp')}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex gap-4 justify-center">
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  className="w-14 h-14 border-2 border-gray-200 rounded-xl text-center text-2xl font-bold focus:border-primary focus:outline-none"
                  value={otp[i] || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val) {
                      setOtp(prev => {
                        const next = prev.split('');
                        next[i] = val;
                        return next.join('');
                      });
                    }
                  }}
                />
              ))}
            </div>
            <Button 
              fullWidth 
              onClick={handleVerifyOtp} 
              disabled={otp.length !== 4}
              isLoading={loading}
            >
              {t('verify_login')}
            </Button>
            <button onClick={() => setStep('PHONE')} className="w-full text-center text-primary font-medium text-sm">
              {t('change_number')}
            </button>
          </div>
        )}
      </div>
      
      <div className="text-center py-4">
        <p className="flex items-center justify-center gap-2 text-xs text-gray-400">
          <ShieldCheck size={14} /> {t('secure_login')}
        </p>
      </div>
    </div>
  );
};