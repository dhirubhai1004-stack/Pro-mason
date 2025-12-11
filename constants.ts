
import { Worker, Job, Transaction } from './types';
import { 
  BrickWall, Hammer, Paintbrush, Droplets, Ruler, Wrench, 
  Zap, PenTool, HardHat, Truck, Factory, UserCog, DraftingCompass, 
  ShieldCheck, Trees
} from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  type: 'HOME' | 'INDUSTRIAL' | 'PROFESSIONAL';
  icon: any;
  color: string;
}

export const CATEGORIES: Category[] = [
  // Home Services
  { id: 'mason', name: 'Mason', type: 'HOME', icon: BrickWall, color: 'bg-orange-100 text-orange-600' },
  { id: 'labour', name: 'Labour', type: 'HOME', icon: Hammer, color: 'bg-blue-100 text-blue-600' },
  { id: 'painter', name: 'Painter', type: 'HOME', icon: Paintbrush, color: 'bg-purple-100 text-purple-600' },
  { id: 'electrician', name: 'Electrician', type: 'HOME', icon: Zap, color: 'bg-yellow-100 text-yellow-600' },
  { id: 'plumber', name: 'Plumber', type: 'HOME', icon: Droplets, color: 'bg-cyan-100 text-cyan-600' },
  { id: 'carpenter', name: 'Carpenter', type: 'HOME', icon: Ruler, color: 'bg-amber-100 text-amber-600' },
  { id: 'waterproofing', name: 'Waterproof', type: 'HOME', icon: ShieldCheck, color: 'bg-indigo-100 text-indigo-600' },
  { id: 'gardener', name: 'Gardener', type: 'HOME', icon: Trees, color: 'bg-green-100 text-green-600' },

  // Industrial / Factory
  { id: 'welder', name: 'Welder', type: 'INDUSTRIAL', icon: Zap, color: 'bg-red-100 text-red-600' },
  { id: 'fitter', name: 'Fitter', type: 'INDUSTRIAL', icon: Wrench, color: 'bg-slate-100 text-slate-600' },
  { id: 'helper', name: 'Factory Helper', type: 'INDUSTRIAL', icon: UserCog, color: 'bg-gray-100 text-gray-600' },
  { id: 'operator', name: 'Machine Op.', type: 'INDUSTRIAL', icon: Factory, color: 'bg-zinc-100 text-zinc-600' },
  { id: 'driver_heavy', name: 'Heavy Driver', type: 'INDUSTRIAL', icon: Truck, color: 'bg-lime-100 text-lime-600' },

  // Professional / Architecture
  { id: 'architect', name: 'Architect', type: 'PROFESSIONAL', icon: DraftingCompass, color: 'bg-rose-100 text-rose-600' },
  { id: 'civil_eng', name: 'Civil Eng.', type: 'PROFESSIONAL', icon: HardHat, color: 'bg-sky-100 text-sky-600' },
  { id: 'interior', name: 'Interior Des.', type: 'PROFESSIONAL', icon: PenTool, color: 'bg-pink-100 text-pink-600' },
];

export const MOCK_WORKERS: Worker[] = [
  {
    id: 'w1',
    name: 'Rajesh Kumar',
    category: 'Mason',
    rating: 4.8,
    jobsCompleted: 142,
    hourlyRate: 350,
    experience: 8,
    isVerified: true,
    image: 'https://picsum.photos/seed/mason1/200/200'
  },
  {
    id: 'w2',
    name: 'Vikram Singh',
    category: 'Labour',
    rating: 4.5,
    jobsCompleted: 89,
    hourlyRate: 200,
    experience: 3,
    isVerified: true,
    image: 'https://picsum.photos/seed/labour1/200/200'
  },
  {
    id: 'w3',
    name: 'Amit Patel',
    category: 'Waterproofing',
    rating: 4.9,
    jobsCompleted: 210,
    hourlyRate: 500,
    experience: 12,
    isVerified: true,
    image: 'https://picsum.photos/seed/water1/200/200'
  },
  {
    id: 'w4',
    name: 'Suresh Electric',
    category: 'Electrician',
    rating: 4.7,
    jobsCompleted: 300,
    hourlyRate: 400,
    experience: 10,
    isVerified: true,
    image: 'https://picsum.photos/seed/electrician/200/200'
  },
  {
    id: 'w5',
    name: 'Priya Sharma',
    category: 'Architect',
    rating: 5.0,
    jobsCompleted: 45,
    hourlyRate: 1500,
    experience: 6,
    isVerified: true,
    image: 'https://picsum.photos/seed/architect/200/200'
  },
  {
    id: 'w6',
    name: 'Mohd. Rafiq',
    category: 'Welder',
    rating: 4.6,
    jobsCompleted: 120,
    hourlyRate: 450,
    experience: 15,
    isVerified: true,
    image: 'https://picsum.photos/seed/welder/200/200'
  }
];

export const MOCK_JOBS: Job[] = [
  {
    id: 'j1',
    customerName: 'Suresh Raina',
    type: 'Masonry Work',
    status: 'PENDING',
    date: 'Today, 10:00 AM',
    amount: 1200,
    location: 'Sector 42, Green Valley',
    description: 'Repair boundary wall cracks and plastering.'
  },
  {
    id: 'j2',
    customerName: 'Anita Desai',
    type: 'Tile Fitting',
    status: 'COMPLETED',
    date: 'Yesterday',
    amount: 3500,
    location: 'Block C, Highrise Apts',
    description: 'Bathroom floor tile installation.'
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', type: 'DEBIT', amount: 1200, date: '20 Oct, 2023', description: 'Payment to Rajesh K.' },
  { id: 't2', type: 'CREDIT', amount: 5000, date: '15 Oct, 2023', description: 'Wallet Top-up' },
  { id: 't3', type: 'DEBIT', amount: 850, date: '12 Oct, 2023', description: 'Payment to Vikram S.' },
];
