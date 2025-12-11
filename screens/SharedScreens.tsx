
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../components/Button';
import { MOCK_TRANSACTIONS, MOCK_WORKERS, MOCK_JOBS } from '../constants';
import { ArrowLeft, CreditCard, IndianRupee, MapPin, Phone, MessageSquare, Camera, Navigation, User, Settings, LogOut, CheckCircle, Share2, Compass, Home, Shield, AlertTriangle, Send } from 'lucide-react';
import { Job, Worker } from '../types';

/* --- CHAT SCREEN --- */
export const ChatScreen: React.FC<{ onBack: () => void; t: (key: string) => string }> = ({ onBack, t }) => {
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello, are you available?', sender: 'me', time: '10:00 AM' },
    { id: 2, text: 'Yes sir, I can reach in 15 mins.', sender: 'other', time: '10:02 AM' },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    if(!msg.trim()) return;
    setMessages([...messages, { id: Date.now(), text: msg, sender: 'me', time: 'Now' }]);
    setMsg('');
    // Mock reply
    setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now(), text: 'Ok, see you.', sender: 'other', time: 'Now' }]);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
       <div className="bg-white p-4 flex items-center gap-4 shadow-sm border-b z-10">
         <button onClick={onBack}><ArrowLeft size={24} /></button>
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
               <img src={MOCK_WORKERS[0].image} className="w-full h-full object-cover"/>
            </div>
            <div>
               <h3 className="font-bold text-sm">{MOCK_WORKERS[0].name}</h3>
               <p className="text-xs text-green-600 font-medium">Online</p>
            </div>
         </div>
       </div>
       
       <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(m => (
             <div key={m.id} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.sender === 'me' ? 'bg-primary text-white rounded-tr-none' : 'bg-white border rounded-tl-none'}`}>
                   <p>{m.text}</p>
                   <p className={`text-[10px] mt-1 ${m.sender === 'me' ? 'text-white/70' : 'text-gray-400'}`}>{m.time}</p>
                </div>
             </div>
          ))}
          <div ref={endRef} />
       </div>

       <div className="p-3 bg-white border-t flex gap-2">
          <input 
            className="flex-1 bg-gray-100 rounded-full px-4 outline-none text-sm" 
            placeholder={t('type_message')} 
            value={msg}
            onChange={e => setMsg(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
          />
          <button onClick={send} className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center">
             <Send size={18} />
          </button>
       </div>
    </div>
  );
};

/* --- BOOKINGS SCREEN (History) --- */
export const BookingsScreen: React.FC<{ t: (key: string) => string }> = ({ t }) => {
  return (
    <div className="p-6 pt-10">
       <h2 className="text-2xl font-bold mb-6">{t('bookings')}</h2>
       <div className="space-y-4">
          {MOCK_JOBS.map(job => (
             <div key={job.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="font-bold">{job.type}</h3>
                   <span className={`text-xs px-2 py-1 rounded font-bold ${job.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {job.status}
                   </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{job.date}</p>
                <div className="flex justify-between items-center text-sm">
                   <span className="font-bold">₹{job.amount}</span>
                   <button className="text-primary font-medium">{t('help_support')}</button>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};

/* --- LIVE MAP COMPONENT (MOCK) --- */
interface LiveMapProps {
  status: 'CONFIRMED' | 'ON_WAY' | 'REACHED' | 'STARTED';
  workerImage?: string;
}

const LiveMap: React.FC<LiveMapProps> = ({ status, workerImage }) => {
  const [workerPos, setWorkerPos] = useState(0); // 0 to 100% progress along route

  // Simulate movement
  useEffect(() => {
    if (status === 'ON_WAY') {
      const interval = setInterval(() => {
        setWorkerPos(prev => {
          if (prev >= 100) return 0; // Loop for demo
          return prev + 0.5;
        });
      }, 50);
      return () => clearInterval(interval);
    } else if (status === 'REACHED' || status === 'STARTED') {
      setWorkerPos(100);
    } else {
      setWorkerPos(0);
    }
  }, [status]);

  return (
    <div className="absolute inset-0 bg-[#eef2f6] overflow-hidden pointer-events-none">
      {/* Map Pattern (Roads) */}
      <div 
        className="absolute inset-0 opacity-40" 
        style={{
           backgroundImage: `
             linear-gradient(#cbd5e1 2px, transparent 2px), 
             linear-gradient(90deg, #cbd5e1 2px, transparent 2px),
             linear-gradient(rgba(255,255,255,0.8) 10px, transparent 10px),
             linear-gradient(90deg, rgba(255,255,255,0.8) 10px, transparent 10px)
           `,
           backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
           backgroundPosition: '-2px -2px, -2px -2px, -1px -1px, -1px -1px'
        }}
      ></div>

      {/* Main Road (Diagonal) */}
      <div className="absolute top-0 left-0 w-[200%] h-24 bg-white shadow-sm border-y border-gray-300 transform -rotate-45 origin-top-left -translate-y-1/2 translate-x-[20%]"></div>
      
      {/* Route Path (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
          </marker>
        </defs>
        
        {/* Simple Curve Path for Demo */}
        <path 
          d="M 100 100 Q 200 400 350 500" 
          stroke="url(#routeGradient)" 
          strokeWidth="6" 
          fill="none" 
          strokeLinecap="round"
          strokeDasharray="10,0"
          className="drop-shadow-md"
        />
      </svg>

      {/* Static Markers */}
      {/* Customer Home */}
      <div className="absolute top-[500px] left-[350px] transform -translate-x-1/2 -translate-y-full z-20">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-black rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white">
            <Home size={20} fill="currentColor" />
          </div>
          <div className="w-2 h-2 bg-black rounded-full mt-1 shadow-sm"></div>
        </div>
      </div>

      {/* Worker Marker (Animated) */}
      <div 
        className="absolute z-30 transition-all duration-100 ease-linear"
        style={{
          top: `${100 + (workerPos * 4)}px`,
          left: `${100 + (workerPos * 2.5)}px`,
          transform: `translate(-50%, -50%) rotate(${45}deg)`
        }}
      >
        <div className="relative">
          <div className="w-14 h-14 bg-white rounded-full border-4 border-primary shadow-2xl flex items-center justify-center p-1 overflow-hidden">
             {workerImage ? (
               <img src={workerImage} className="w-full h-full rounded-full object-cover" />
             ) : (
               <User size={24} className="text-primary" />
             )}
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-black rounded-full flex items-center justify-center border-2 border-white shadow-sm">
             <Navigation size={12} className="text-white transform rotate-45" />
          </div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-20 right-4 flex flex-col gap-3 pointer-events-auto">
        <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center text-gray-700 active:scale-95">
          <Compass size={20} />
        </button>
        <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center text-gray-700 active:scale-95">
          <Navigation size={20} className="transform rotate-45" />
        </button>
      </div>
    </div>
  );
};

/* --- WALLET SCREEN --- */
export const WalletScreen: React.FC<{t: (key: string) => string}> = ({ t }) => {
  const [balance, setBalance] = useState(4250);
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [amount, setAmount] = useState('');

  const handleAdd = () => {
    if (!amount) return;
    setBalance(prev => prev + Number(amount));
    setAmount('');
    setShowAddMoney(false);
  };

  return (
    <div className="p-6 pt-10">
      <h2 className="text-2xl font-bold mb-6">{t('nav_wallet')}</h2>
      
      {showAddMoney ? (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-8 animate-slide-up">
           <h3 className="font-bold mb-4">{t('top_up')}</h3>
           <input 
             type="number" 
             className="w-full text-3xl font-bold border-b-2 border-primary mb-6 outline-none py-2" 
             placeholder="₹0"
             value={amount}
             onChange={e => setAmount(e.target.value)}
             autoFocus
           />
           <div className="flex gap-3">
             <Button variant="ghost" fullWidth onClick={() => setShowAddMoney(false)}>{t('cancel')}</Button>
             <Button fullWidth onClick={handleAdd}>{t('pay')}</Button>
           </div>
        </div>
      ) : (
        <div className="bg-secondary text-white rounded-2xl p-6 shadow-xl shadow-black/10 mb-8 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
          <p className="text-gray-400 text-sm mb-1">{t('total_balance')}</p>
          <h3 className="text-4xl font-bold mb-6">₹{balance.toFixed(2)}</h3>
          <div className="flex gap-4">
            <Button variant="primary" className="h-10 text-sm px-6" onClick={() => setShowAddMoney(true)}>{t('top_up')}</Button>
            <button className="h-10 px-6 rounded-xl border border-white/20 hover:bg-white/10 text-sm font-semibold transition-colors">{t('history')}</button>
          </div>
        </div>
      )}

      <h3 className="font-bold text-lg mb-4">{t('recent_transactions')}</h3>
      <div className="space-y-4">
        {MOCK_TRANSACTIONS.map((t) => (
          <div key={t.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
             <div className="flex items-center gap-3">
               <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.type === 'DEBIT' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
                 <IndianRupee size={16} />
               </div>
               <div>
                 <p className="font-bold text-sm text-secondary">{t.description}</p>
                 <p className="text-xs text-gray-400">{t.date}</p>
               </div>
             </div>
             <span className={`font-bold ${t.type === 'DEBIT' ? 'text-red-500' : 'text-green-600'}`}>
               {t.type === 'DEBIT' ? '-' : '+'}₹{t.amount}
             </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* --- EDIT PROFILE SCREEN --- */
export const EditProfileScreen: React.FC<{ onBack: () => void; t: (key: string) => string }> = ({ onBack, t }) => {
  const [name, setName] = useState('Rahul Sharma');
  const [email, setEmail] = useState('rahul@example.com');

  return (
    <div className="h-full bg-white flex flex-col">
       <div className="p-4 flex items-center gap-4 border-b border-gray-100">
         <button onClick={onBack}><ArrowLeft size={24}/></button>
         <h2 className="font-bold text-lg">{t('edit_profile')}</h2>
       </div>
       <div className="p-6 space-y-6 flex-1">
          <div className="flex justify-center mb-6">
             <div className="relative">
                <img src="https://picsum.photos/seed/profile/150/150" className="w-24 h-24 rounded-full border-4 border-gray-100" />
                <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full border-2 border-white shadow-md">
                   <Camera size={14} />
                </button>
             </div>
          </div>
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">{t('full_name')}</label>
             <input value={name} onChange={e => setName(e.target.value)} className="w-full p-3 border rounded-xl" />
          </div>
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
             <input value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 border rounded-xl" />
          </div>
       </div>
       <div className="p-4 border-t">
          <Button fullWidth onClick={onBack}>{t('submit_verification')}</Button>
       </div>
    </div>
  );
};

/* --- PROFILE SCREEN --- */
export const ProfileScreen: React.FC<{ onLogout: () => void; onNavigate: (v: any) => void; t: (key: string) => string }> = ({ onLogout, onNavigate, t }) => {
  return (
    <div className="p-6 pt-10">
       <div className="flex items-center gap-4 mb-8">
         <img src="https://picsum.photos/seed/profile/150/150" className="w-20 h-20 rounded-full border-4 border-white shadow-lg" />
         <div>
           <h2 className="text-2xl font-bold">Rahul Sharma</h2>
           <p className="text-gray-500">+91 98765 43210</p>
         </div>
       </div>

       <div className="space-y-2">
         {[
           { icon: User, label: t('edit_profile'), action: () => onNavigate('EDIT_PROFILE') },
           { icon: MapPin, label: t('saved_addresses'), action: () => {} },
           { icon: Settings, label: t('settings'), action: () => {} },
           { icon: MessageSquare, label: t('help_support'), action: () => {} },
         ].map((item) => (
           <button 
             key={item.label} 
             onClick={item.action}
             className="w-full bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4 hover:bg-gray-50 transition-colors"
           >
             <item.icon size={20} className="text-gray-400" />
             <span className="font-medium flex-1 text-left">{item.label}</span>
             <span className="text-gray-300">›</span>
           </button>
         ))}
          <button onClick={onLogout} className="w-full bg-red-50 p-4 rounded-xl border border-red-100 flex items-center gap-4 hover:bg-red-100 transition-colors mt-8">
             <LogOut size={20} className="text-red-500" />
             <span className="font-medium flex-1 text-left text-red-600">{t('logout')}</span>
           </button>
       </div>
    </div>
  );
};

/* --- TRACKING SCREEN (Customer) --- */
export const TrackingScreen: React.FC<{t: (key: string) => string}> = ({ t }) => {
  const [status, setStatus] = useState<'ON_WAY' | 'REACHED' | 'STARTED'>('ON_WAY');
  
  // Demo simulation of worker arriving
  useEffect(() => {
    const t1 = setTimeout(() => setStatus('REACHED'), 10000); // 10s to reach
    return () => clearTimeout(t1);
  }, []);

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* Header Float */}
      <div className="absolute top-4 left-4 right-4 z-40 flex justify-between items-start pointer-events-none">
        <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center pointer-events-auto">
          <ArrowLeft size={20} />
        </button>
        <button className="bg-black/80 text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold flex items-center gap-2 pointer-events-auto backdrop-blur-md">
          <Share2 size={14} /> {t('share_status')}
        </button>
      </div>

      {/* Map Layer */}
      <div className="absolute inset-0 z-0">
        <LiveMap status={status} workerImage={MOCK_WORKERS[0].image} />
      </div>
      
      {/* Bottom Sheet Card - Uber Style */}
      <div className="absolute bottom-0 left-0 right-0 z-50">
         {/* Start Job OTP Popup when Worker Reaches */}
         {status === 'REACHED' && (
           <div className="mx-4 mb-4 bg-primary text-white p-4 rounded-xl shadow-lg flex items-center justify-between animate-bounce">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-white/20 rounded-lg">
                    <Shield size={20} />
                 </div>
                 <div>
                    <p className="text-xs font-medium opacity-90">{t('otp_for_start')}</p>
                    <p className="text-2xl font-bold tracking-widest">4812</p>
                 </div>
              </div>
              <div className="text-right">
                 <p className="text-[10px] opacity-80 max-w-[100px] leading-tight">{t('otp_desc')}</p>
              </div>
           </div>
         )}

         <div className="bg-white rounded-t-3xl shadow-[0_-5px_30px_rgba(0,0,0,0.15)] pb-8 overflow-hidden">
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
               <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
            </div>

            {/* Status Header */}
            <div className="px-6 pb-4 border-b border-gray-100">
               <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-xl font-bold text-secondary">
                      {status === 'ON_WAY' ? t('arriving_in') : (status === 'REACHED' ? t('status_reached') : t('status_started'))}
                    </h2>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {status === 'ON_WAY' ? t('status_on_way') : t('verification_desc')}
                    </p>
                  </div>
                  {status === 'ON_WAY' && (
                     <div className="text-right">
                       <span className="block text-2xl font-bold text-primary">15</span>
                       <span className="text-xs text-gray-400 font-bold uppercase">min</span>
                     </div>
                  )}
               </div>
            </div>

            {/* Worker Info */}
            <div className="p-6 flex items-center gap-4">
               <div className="relative">
                  <img src={MOCK_WORKERS[0].image} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md" />
                  <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
                     <div className="bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
                  </div>
               </div>
               
               <div className="flex-1">
                  <h3 className="font-bold text-lg">{MOCK_WORKERS[0].name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                     <span className="bg-gray-100 px-1.5 rounded text-xs font-bold text-secondary">{MOCK_WORKERS[0].rating} ★</span>
                     <span>• {MOCK_WORKERS[0].category}</span>
                     <span>• DL 4S 2891</span>
                  </div>
               </div>

               <div className="flex flex-col gap-2">
                  <button className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors">
                     <Phone size={20} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors">
                     <MessageSquare size={20} />
                  </button>
               </div>
            </div>

            {/* Actions */}
            <div className="px-6 flex gap-3">
               <button className="flex-1 py-3 rounded-xl border border-gray-200 font-bold text-gray-500 hover:bg-gray-50">
                 {t('cancel_booking')}
               </button>
               <button className="flex-1 py-3 rounded-xl bg-gray-100 font-bold text-secondary hover:bg-gray-200">
                 {t('help_support')}
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

/* --- ACTIVE JOB SCREEN (Worker) --- */
export const ActiveJobScreen: React.FC<{ job: Job; onBack: () => void; t: (key: string) => string }> = ({ job, onBack, t }) => {
  const [status, setStatus] = useState<'START' | 'IN_PROGRESS' | 'FINISH'>('START');
  // Updated state for OTP (4 boxes)
  const [startOtp, setStartOtp] = useState(['', '', '', '']);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
     if(showOtpInput) {
        setTimeout(() => otpRefs.current[0]?.focus(), 100);
     }
  }, [showOtpInput]);

  const handleStartJob = () => {
    const code = startOtp.join('');
    if (code === '4812') { // Mock OTP check
      setStatus('IN_PROGRESS');
      setShowOtpInput(false);
    } else {
      alert('Invalid OTP. Use 4812');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...startOtp];
    newOtp[index] = value;
    setStartOtp(newOtp);
    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !startOtp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 relative">
      {/* Map Background for Navigation Mode */}
      <div className="absolute inset-0 z-0">
         <LiveMap status={status === 'START' ? 'ON_WAY' : 'STARTED'} />
      </div>

      {/* Top Header Floating */}
      <div className="absolute top-4 left-4 right-4 z-10">
         <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50 flex gap-3 items-center">
             <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
               <ArrowLeft size={20} />
             </button>
             <div className="flex-1">
                <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase mb-1">
                   <Navigation size={12} fill="currentColor" /> 2.4 km • 15 min
                </div>
                <h2 className="font-bold text-secondary leading-tight">{job.location}</h2>
             </div>
             <button className="bg-blue-500 text-white p-3 rounded-full shadow-lg shadow-blue-500/30">
                <Navigation size={20} />
             </button>
         </div>
      </div>
      
      {/* Bottom Sheet Area */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
         <div className="bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-6 pb-8 space-y-6">
            
            {/* Customer Info Mini-Card */}
            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
               <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold text-xl">
                  {job.customerName.charAt(0)}
               </div>
               <div className="flex-1">
                  <p className="text-xs text-gray-400">Customer</p>
                  <p className="font-bold text-lg">{job.customerName}</p>
               </div>
               <div className="flex gap-2">
                  <button className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <Phone size={20} />
                  </button>
                  <button className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <MessageSquare size={20} />
                  </button>
               </div>
            </div>

            {/* Workflow Actions */}
            <div className="space-y-4">
              {status === 'START' && !showOtpInput && (
                <div className="space-y-3">
                   <div className="flex gap-2">
                     <Button variant="outline" fullWidth className="py-4" onClick={() => alert('Opening Google Maps...')}>
                        Google Maps
                     </Button>
                     <Button 
                        variant="primary" 
                        fullWidth 
                        className="py-4 text-lg" 
                        onClick={() => setShowOtpInput(true)}
                     >
                        {t('start_job')}
                     </Button>
                   </div>
                </div>
              )}

              {showOtpInput && (
                 <div className="bg-gray-50 p-4 rounded-xl space-y-4 animate-fade-in">
                    <div className="flex justify-between items-center">
                       <p className="font-bold text-sm">{t('start_otp_label')}</p>
                       <button onClick={() => setShowOtpInput(false)}><ArrowLeft size={16} /></button>
                    </div>
                    {/* OTP Split Input */}
                    <div className="flex gap-3 justify-center">
                       {startOtp.map((digit, i) => (
                         <input 
                           key={i}
                           ref={el => { otpRefs.current[i] = el; }}
                           type="text"
                           inputMode="numeric"
                           maxLength={1}
                           className="w-12 h-12 border-2 border-gray-200 rounded-xl text-center text-xl font-bold focus:border-primary focus:outline-none focus:scale-105 transition-transform bg-white shadow-sm"
                           value={digit}
                           onChange={(e) => handleOtpChange(i, e.target.value)}
                           onKeyDown={(e) => handleOtpKeyDown(i, e)}
                         />
                       ))}
                    </div>
                    <Button onClick={handleStartJob} disabled={startOtp.join('').length !== 4} fullWidth>
                       GO
                    </Button>
                 </div>
              )}

              {status === 'IN_PROGRESS' && (
                 <div className="space-y-4 animate-fade-in">
                    <div className="bg-orange-50 border border-primary/20 rounded-xl p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary animate-pulse">
                         <AlertTriangle size={20} />
                      </div>
                      <div>
                        <p className="text-primary font-bold">{t('work_in_progress')}</p>
                        <p className="text-xs text-gray-500">{t('started_at')} 10:30 AM</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                       <button className="h-24 rounded-xl border border-gray-200 flex flex-col items-center justify-center text-gray-400 bg-white hover:bg-gray-50">
                          <Camera size={24} className="mb-2 text-secondary"/>
                          <span className="text-xs font-bold">{t('upload_photo')}</span>
                       </button>
                       <button className="h-24 rounded-xl border border-gray-200 flex flex-col items-center justify-center text-gray-400 bg-white hover:bg-gray-50">
                          <MessageSquare size={24} className="mb-2 text-secondary"/>
                          <span className="text-xs font-bold">{t('chat')}</span>
                       </button>
                    </div>

                    <Button fullWidth onClick={() => setStatus('FINISH')} variant="secondary" className="py-4 text-lg">
                       {t('mark_completed')}
                    </Button>
                 </div>
              )}

              {status === 'FINISH' && (
                 <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center animate-slide-up">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                       <CheckCircle size={32} />
                    </div>
                    <h3 className="font-bold text-xl text-green-800">{t('job_done')}</h3>
                    <p className="text-sm text-green-600 mb-6">₹{job.amount} {t('payment_credit_msg')}</p>
                    <Button fullWidth onClick={onBack}>{t('back_home')}</Button>
                 </div>
              )}
            </div>
         </div>
      </div>
    </div>
  );
};
