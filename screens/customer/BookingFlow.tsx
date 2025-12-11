
import React, { useState } from 'react';
import { AppView, Worker } from '../../types';
import { Button } from '../../components/Button';
import { ArrowLeft, Calendar, Clock, CreditCard, CheckCircle, MapPin } from 'lucide-react';

interface BookingFlowProps {
  worker: Worker;
  onBack: () => void;
  onComplete: () => void;
  t: (key: string) => string;
}

export const BookingFlow: React.FC<BookingFlowProps> = ({ worker, onBack, onComplete, t }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (step === 3) {
        onComplete();
      } else {
        setStep(prev => (prev + 1) as any);
      }
    }, 800);
  };

  const steps = [
    { title: 'Details', desc: 'Select date & time' },
    { title: 'Review', desc: 'Check order summary' },
    { title: 'Payment', desc: 'Secure checkout' },
  ];

  if (step === 3 && loading === false) {
     // Success State rendered differently
     return (
       <div className="h-full flex flex-col items-center justify-center p-8 bg-white text-center">
         <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <CheckCircle size={48} className="text-green-600" />
         </div>
         <h2 className="text-2xl font-bold mb-2">{t('booking_confirmed')}</h2>
         <p className="text-gray-500 mb-8">
           {worker.name} {t('booking_msg')}
         </p>
         <Button fullWidth onClick={onComplete}>{t('track_status')}</Button>
       </div>
     )
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 flex items-center gap-4 shadow-sm z-10">
        <button onClick={step === 1 ? onBack : () => setStep(prev => (prev - 1) as any)}>
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 className="font-bold text-lg">Book {t(worker.category.toLowerCase()) || worker.category}</h2>
          <p className="text-xs text-gray-400">Step {step} of 3</p>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {step === 1 && (
          <div className="space-y-6">
             <div className="bg-white p-4 rounded-xl border border-gray-100">
               <div className="flex gap-4">
                 <img src={worker.image} className="w-14 h-14 rounded-lg object-cover" />
                 <div>
                   <h3 className="font-bold">{worker.name}</h3>
                   <p className="text-sm text-gray-500">₹{worker.hourlyRate}/{t('hr')}</p>
                 </div>
               </div>
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">{t('select_date')}</label>
               <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                 {[0, 1, 2, 3, 4].map(day => (
                   <button key={day} className={`min-w-[70px] p-3 rounded-xl border ${day === 0 ? 'bg-secondary text-white border-secondary' : 'bg-white border-gray-200'} flex flex-col items-center justify-center`}>
                     <span className="text-xs opacity-70">Mon</span>
                     <span className="text-lg font-bold">{20 + day}</span>
                   </button>
                 ))}
               </div>
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">{t('select_time')}</label>
               <div className="grid grid-cols-3 gap-3">
                 {['09:00 AM', '10:00 AM', '01:00 PM', '03:00 PM'].map((time, idx) => (
                   <button key={time} className={`py-2 px-1 text-sm border rounded-lg ${idx === 1 ? 'bg-primary/10 border-primary text-primary font-bold' : 'bg-white border-gray-200'}`}>
                     {time}
                   </button>
                 ))}
               </div>
             </div>
             
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('job_desc_label')}</label>
                <textarea 
                  className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm focus:border-primary focus:outline-none" 
                  rows={3} 
                  placeholder={t('job_desc_placeholder')}
                ></textarea>
             </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
              <h3 className="font-bold border-b pb-2">{t('order_summary')}</h3>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{t('service_fee')} (2 {t('hr')})</span>
                <span>₹{worker.hourlyRate * 2}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{t('visiting_charge')}</span>
                <span>₹100</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">GST (18%)</span>
                <span>₹{(worker.hourlyRate * 2 + 100) * 0.18}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>{t('total')}</span>
                <span className="text-primary">₹{Math.round((worker.hourlyRate * 2 + 100) * 1.18)}</span>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-xl flex items-start gap-3">
              <MapPin size={20} className="text-primary mt-1" />
              <div>
                <p className="font-bold text-sm">Home</p>
                <p className="text-xs text-gray-500">Sector 29, Gurgaon, Haryana 122001</p>
              </div>
              <button className="text-primary text-xs font-bold ml-auto">CHANGE</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg mb-4">{t('payment_method')}</h3>
            
            {['UPI', 'Credit / Debit Card', 'Net Banking', 'Cash after Work'].map((method, idx) => (
              <button 
                key={method} 
                className={`w-full p-4 rounded-xl border flex items-center justify-between ${idx === 0 ? 'border-primary bg-orange-50' : 'bg-white border-gray-200'}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <CreditCard size={18} className="text-gray-600" />
                  </div>
                  <span className="font-medium">{method}</span>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${idx === 0 ? 'border-primary' : 'border-gray-300'}`}>
                  {idx === 0 && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white p-4 border-t border-gray-100">
        <Button fullWidth onClick={handleNext} isLoading={loading}>
          {step === 3 ? `${t('pay')} ₹${Math.round((worker.hourlyRate * 2 + 100) * 1.18)}` : t('continue')}
        </Button>
      </div>
    </div>
  );
};