
export enum UserMode {
  CUSTOMER = 'CUSTOMER',
  WORKER = 'WORKER'
}

export enum AppView {
  LANGUAGE_SELECTION = 'LANGUAGE_SELECTION',
  SPLASH = 'SPLASH',
  AUTH = 'AUTH',
  ONBOARDING_WORKER = 'ONBOARDING_WORKER',
  
  // Customer Views
  CUSTOMER_HOME = 'CUSTOMER_HOME',
  SERVICE_CATEGORY = 'SERVICE_CATEGORY',
  WORKER_PROFILE = 'WORKER_PROFILE',
  BOOKING_FLOW = 'BOOKING_FLOW',
  TRACKING = 'TRACKING',
  
  // Worker Views
  WORKER_HOME = 'WORKER_HOME',
  JOB_REQUEST = 'JOB_REQUEST',
  ACTIVE_JOB = 'ACTIVE_JOB',
  EARNINGS = 'EARNINGS',
  
  // Shared
  PROFILE = 'PROFILE',
  WALLET = 'WALLET',
  CHAT = 'CHAT'
}

export interface Worker {
  id: string;
  name: string;
  category: string;
  rating: number;
  jobsCompleted: number;
  hourlyRate: number;
  image: string;
  experience: number;
  isVerified: boolean;
}

export interface Job {
  id: string;
  customerName: string;
  type: string;
  status: 'PENDING' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED';
  date: string;
  amount: number;
  location: string;
  description: string;
}

export interface Transaction {
  id: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  date: string;
  description: string;
}
