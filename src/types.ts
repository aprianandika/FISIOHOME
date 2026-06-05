/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Screen =
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'dashboard'
  | 'discovery'
  | 'detail'
  | 'consultation'
  | 'booking'
  | 'payment'
  | 'tracking'
  | 'progress'
  | 'history'
  | 'notifications'
  | 'profile';

export interface Review {
  id: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Therapist {
  id: string;
  name: string;
  title: string;
  rating: number;
  reviewsCount: number;
  experience: string;
  bio: string;
  certified: boolean;
  homeVisit: boolean;
  duration: number;
  sessionPrice: number;
  avatar: string;
  specialties: string[];
  availableDays: { day: string; dateNum: number; fullDate: string }[];
  timeSlots: string[];
  reviews: Review[];
}

export interface Booking {
  id: string;
  therapistId: string;
  therapistName: string;
  therapistAvatar: string;
  date: string;
  timeSlot: string;
  type: 'visit' | 'consultation';
  status: 'upcoming' | 'completed' | 'ongoing';
  address?: string;
  patientName: string;
  patientPhone: string;
  notes?: string;
  price: number;
  paymentMethod?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'booking' | 'recovery' | 'system';
}

export interface RecoveryStage {
  week: number;
  title: string;
  status: 'past' | 'active' | 'future';
  description: string;
  percentage?: number;
}

export interface PainRecord {
  date: string;
  level: number;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  condition: string;
  recoveryPercentage: number;
  completedSessions: number;
  totalSessions: number;
}
