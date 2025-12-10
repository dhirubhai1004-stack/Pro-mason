
import React, { useState } from 'react';
import { MOCK_JOBS } from '../../constants';
import { AppView, Job } from '../../types';
import { Button } from '../../components/Button';
import { Bell, Briefcase, IndianRupee, MapPin, Navigation } from 'lucide-react';

interface WorkerHomeProps {
  onNavigate: (view: AppView, data?: any) => void;
  t: (key: string) => string;
}

export const WorkerHome: React.FC<WorkerHomeProps> = ({ onNavigate, t }) => {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="flex flex-col min-h-full">
      {/* Worker Header */}
      <header className="bg-secondary text-white p-6 pt-10 rounded-b-3xl shadow-lg relative z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <img 
              src="https://picsum.photos/seed/worker_profile/100/100" 
              className="w-12 h-12 rounded-full border-2 border-primary"
            />
            <div>
              <h2 className="font-bold text-lg">{t('hello')}, Raju</h2>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span className="text-xs text-gray-400">{isOnline ? t('online') : t('offline')}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
             {/* Toggle */}
            <button 
              onClick={() => setIsOnline(!isOnline)}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${isOnline ? 'bg-green-500' : 'bg-gray-600'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isOnline ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <Bell size={20} />
          </div>
        </div>

        {/* Earnings Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex justify-between items-center">
          <div>
            <p className="text-gray-400 text-xs mb-1">{t('todays_earnings')}</p>
            <h3 className="text-2xl font-bold flex items-center gap-1">
              <IndianRupee size={20} /> 1,250
            </h3>
          </div>
          <Button variant="primary" className="py-2 px-4 text-sm h-10">{t('withdraw')}</Button>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Job Requests */}
        {isOnline && (
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-secondary">{t('new_job_requests')}</h3>
              <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">2 New</span>
            </div>
            
            {MOCK_JOBS.filter(j => j.status === 'PENDING').map(job => (
              <div key={job.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-lg">{job.type}</h4>
                    <p className="text-sm text-gray-500">{job.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-primary">₹{job.amount}</p>
                    <p className="text-xs text-gray-400">{t('est_hours')}</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                
                <div className="flex gap-3">
                  <Button variant="ghost" className="flex-1 bg-gray-100">{t('reject')}</Button>
                  <Button variant="primary" className="flex-1" onClick={() => onNavigate(AppView.ACTIVE_JOB, { job })}>{t('accept')}</Button>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Today's Schedule */}
        <section>
          <h3 className="font-bold text-lg text-secondary mb-4">{t('todays_schedule')}</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500 font-medium">10:00</span>
                <div className="w-px h-full bg-gray-200 my-1 relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary"></div>
                </div>
              </div>
              <div className="bg-white flex-1 p-4 rounded-xl border border-gray-100">
                <div className="flex justify-between mb-1">
                  <h4 className="font-bold text-sm">Masonry Work</h4>
                  <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium">{t('completed')}</span>
                </div>
                <p className="text-xs text-gray-500">Sector 42, Green Valley</p>
              </div>
            </div>
             <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500 font-medium">14:00</span>
                <div className="w-px h-full bg-gray-200 my-1 relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gray-300"></div>
                </div>
              </div>
              <div className="bg-white flex-1 p-4 rounded-xl border border-gray-100 opacity-60">
                 <div className="flex justify-between mb-1">
                  <h4 className="font-bold text-sm">Plaster Repair</h4>
                  <span className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded font-medium">{t('upcoming')}</span>
                </div>
                <p className="text-xs text-gray-500">Block B, City Center</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
