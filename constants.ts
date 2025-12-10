import { Worker, Job, Transaction } from './types';
import { BrickWall, Hammer, Paintbrush, Droplets, Ruler, Wrench } from 'lucide-react';

export const CATEGORIES = [
  { id: 'mason', name: 'Mason', icon: BrickWall, color: 'bg-orange-100 text-orange-600' },
  { id: 'labour', name: 'Labour', icon: Hammer, color: 'bg-blue-100 text-blue-600' },
  { id: 'painter', name: 'Painter', icon: Paintbrush, color: 'bg-purple-100 text-purple-600' },
  { id: 'waterproofing', name: 'Waterproof', icon: Droplets, color: 'bg-cyan-100 text-cyan-600' },
  { id: 'epoxy', name: 'Epoxy', icon: Wrench, color: 'bg-emerald-100 text-emerald-600' },
  { id: 'carpenter', name: 'Carpenter', icon: Ruler, color: 'bg-amber-100 text-amber-600' },
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
