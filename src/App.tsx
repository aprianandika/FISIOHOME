/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity,
  Award,
  Bell,
  Briefcase,
  Calendar,
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  CreditCard,
  FileText,
  Heart,
  HelpCircle,
  Home,
  Lock,
  LogOut,
  MapPin,
  MessageSquare,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Sliders,
  Star,
  User,
  Users,
  Video,
  X,
  Volume2,
  Mic,
  VideoOff,
  Filter,
  ArrowRight,
  ChevronUp,
  AlertCircle
} from 'lucide-react';

import { Screen, Therapist, Booking, NotificationItem, RecoveryStage, UserProfile } from './types';
import { mockUserProfile, mockTherapists, mockBookings, mockNotifications, mockRecoveryStages } from './data';

export default function App() {
  // Mobile Simulator state
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist>(mockTherapists[0]);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [recoveryStages] = useState<RecoveryStage[]>(mockRecoveryStages);
  const [painLevel, setPainLevel] = useState<number>(3);
  
  // Navigation active tab for logged-in screens (Dashboard, Discovery, History, Profile)
  const [activeTab, setActiveTab] = useState<'home' | 'discovery' | 'history' | 'profile'>('home');

  // Search & Filter state
  const [searchText, setSearchText] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Semua');

  // Booking details configuration step
  const [bookingDate, setBookingDate] = useState<number>(23); // Default Sen 23
  const [bookingTime, setBookingTime] = useState<string>('01:00 PM');
  const [bookingType, setBookingType] = useState<'visit' | 'consultation'>('visit');
  const [patientNotes, setPatientNotes] = useState('');
  const [patientAddress, setPatientAddress] = useState('Apartemen Green Pramuka Tower Bougenville No. 12B, Jakarta Pusat');
  const [selectedPayment, setSelectedPayment] = useState('DANA Wallet');

  // Tracking simulator
  const [trackingProgress, setTrackingProgress] = useState(0);
  const [eta, setEta] = useState(11); // minutes
  const trackingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Active call duration timer for telemedicine
  const [callSeconds, setCallSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const [callActive, setCallActive] = useState(true);

  // Onboarding slider step
  const [onboardingIndex, setOnboardingIndex] = useState(0);

  // Favorites therapist list
  const [favorites, setFavorites] = useState<string[]>(['therapist-1']);

  // Handle auto-timed splash transition
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('onboarding');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  // Handle tracking coordinates update
  useEffect(() => {
    if (currentScreen === 'tracking') {
      setTrackingProgress(0);
      setEta(11);
      trackingIntervalRef.current = setInterval(() => {
        setTrackingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(trackingIntervalRef.current!);
            return 100;
          }
          return prev + 5;
        });
        setEta((prev) => (prev > 1 ? prev - 1 : 1));
      }, 2000);
    } else {
      if (trackingIntervalRef.current) {
        clearInterval(trackingIntervalRef.current);
      }
    }
    return () => {
      if (trackingIntervalRef.current) {
        clearInterval(trackingIntervalRef.current);
      }
    };
  }, [currentScreen]);

  // Handle video call timing
  useEffect(() => {
    let callTimer: NodeJS.Timeout;
    if (currentScreen === 'consultation' && callActive) {
      callTimer = setInterval(() => {
        setCallSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setCallSeconds(0);
    }
    return () => clearInterval(callTimer);
  }, [currentScreen, callActive]);

  // Helpers
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const handleFavoriteToggle = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const handleCreateBooking = () => {
    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      therapistId: selectedTherapist.id,
      therapistName: selectedTherapist.name,
      therapistAvatar: selectedTherapist.avatar,
      date: `Okt ${bookingDate}, 2023`,
      timeSlot: bookingTime,
      type: bookingType,
      status: 'upcoming',
      address: bookingType === 'visit' ? patientAddress : undefined,
      patientName: mockUserProfile.name,
      patientPhone: mockUserProfile.phone,
      notes: patientNotes,
      price: bookingType === 'visit' ? selectedTherapist.sessionPrice : 80000,
      paymentMethod: selectedPayment
    };
    
    setBookings([newBooking, ...bookings]);
    
    // Add real notification for confirmation
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Booking Sukses Terbayar!',
      message: `Pembayaran ${selectedPayment} diverifikasi. ${selectedTherapist.name} dijadwalkan pada tanggal Okt ${bookingDate} pukul ${bookingTime}.`,
      time: 'Baru saja',
      read: false,
      type: 'booking'
    };
    setNotifications([newNotif, ...notifications]);

    // Go to tracking screen automatically
    setCurrentScreen('tracking');
  };

  // Switcher callback that synchronizes tabs with dashboard screens
  const handleNavToTab = (tab: 'home' | 'discovery' | 'history' | 'profile') => {
    setActiveTab(tab);
    if (tab === 'home') setCurrentScreen('dashboard');
    else if (tab === 'discovery') setCurrentScreen('discovery');
    else if (tab === 'history') setCurrentScreen('history');
    else if (tab === 'profile') setCurrentScreen('profile');
  };

  // Onboarding screens configuration slide contents
  const onboardingSteps = [
    {
      title: 'Terapis Berlisensi ke Rumah',
      desc: 'Dapatkan tindakan fisioterapi berkualitas oleh tenaga medis ahli bersertifikasi dan diawasi langsung oleh spesialis.',
      img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Konsultasi Online Instan',
      desc: 'Bicara dengan fisoterapis klinis berpengalaman secara instan di mana saja untuk evaluasi awal gejala dan nyeri tubuh Anda.',
      img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Pantau Progress Pemulihan',
      desc: 'Evaluasi sendi, checklist latihan pasca operasi harian, dan grafik tingkat nyeri terpadu langsung di genggaman Anda.',
      img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex justify-center font-sans">
      
      {/* Centered clean container that acts as the real application */}
      <div className="w-full max-w-md bg-[#fcfaff] text-slate-900 min-h-screen flex flex-col relative shadow-2xl dark:bg-slate-900 border-x border-slate-200 dark:border-slate-800 overflow-hidden select-none">
        
        {/* Active Screen Viewport */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-24 relative flex flex-col bg-[#fcfaff]">
          
          <AnimatePresence mode="wait">

                
                {/* 1. SPLASH SCREEN */}
                {currentScreen === 'splash' && (
                  <motion.div
                    key="splash"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-[#6b21cf] to-[#5b17b8] flex flex-col items-center justify-between p-8 text-white z-10 text-center"
                  >
                    <div></div>
                    <div className="space-y-4 animate-pulse">
                      <div className="w-20 h-20 bg-white rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-indigo-900/30">
                        <Activity className="text-[#6b21cf] w-12 h-12" />
                      </div>
                      <h3 className="font-display font-extrabold text-3xl tracking-tight">Fisiohome</h3>
                      <p className="text-xs text-purple-200 tracking-wider uppercase font-semibold">Premium Home Rehabilitation</p>
                    </div>
                    
                    <button 
                      onClick={() => setCurrentScreen('onboarding')} 
                      className="w-full bg-white text-[#6b21cf] font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all duration-150 text-sm hover:brightness-110"
                    >
                      Mulai Pemulihan <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {/* 2. ONBOARDING SCREEN */}
                {currentScreen === 'onboarding' && (
                  <motion.div
                    key="onboarding"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: -20 }}
                    className="absolute inset-0 bg-[#fcfaff] flex flex-col justify-between p-6 z-10"
                  >
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xs font-bold text-[#6b21cf] uppercase tracking-wider">Fisiohome Care</span>
                      <button onClick={() => setCurrentScreen('login')} className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors">
                        Lewati
                      </button>
                    </div>

                    <div className="my-auto space-y-6">
                      <div className="w-full h-64 rounded-3xl overflow-hidden shadow-xl shadow-purple-900/5 relative border border-slate-100">
                        <img 
                          src={onboardingSteps[onboardingIndex].img} 
                          alt="Onboarding Visual" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      </div>

                      <div className="space-y-2 text-center px-2">
                        <h3 className="font-display font-bold text-xl text-slate-900 tracking-tight">
                          {onboardingSteps[onboardingIndex].title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed font-sans">
                          {onboardingSteps[onboardingIndex].desc}
                        </p>
                      </div>

                      {/* Pagination pips */}
                      <div className="flex justify-center gap-2">
                        {onboardingSteps.map((_, idx) => (
                          <span 
                            key={idx}
                            onClick={() => setOnboardingIndex(idx)}
                            className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                              idx === onboardingIndex ? 'w-6 bg-[#6b21cf]' : 'w-2 bg-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button 
                        onClick={() => {
                          if (onboardingIndex < onboardingSteps.length - 1) {
                            setOnboardingIndex(onboardingIndex + 1);
                          } else {
                            setCurrentScreen('login');
                          }
                        }}
                        className="w-full bg-[#6b21cf] text-white py-4 rounded-2xl font-semibold shadow-lg shadow-purple-500/20 flex items-center justify-center gap-1 text-sm hover:brightness-110 active:scale-95 duration-100"
                      >
                        {onboardingIndex === onboardingSteps.length - 1 ? 'Mulai Sekarang' : 'Lanjutkan'}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 3. LOGIN SCREEN */}
                {currentScreen === 'login' && (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#fcfaff] flex flex-col justify-between p-6 z-10"
                  >
                    <div className="pt-4 text-center space-y-2">
                      <div className="w-12 h-12 bg-[#6b21cf] rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <Activity className="text-white w-7 h-7" />
                      </div>
                      <h3 className="font-display font-bold text-xl text-slate-900">Selamat Datang Kembali</h3>
                      <p className="text-xs text-[#ef7d31] font-semibold">Mulai perjalanan pemulihan Anda dari rumah.</p>
                    </div>

                    {/* Authentication Form */}
                    <div className="space-y-4 my-auto">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-purple-700 uppercase tracking-widest block px-1">
                          Nomor Ponsel (OTP SMS)
                        </label>
                        <div className="flex h-14 w-full bg-white border border-slate-200 rounded-2xl overflow-hidden focus-within:border-[#6b21cf] shadow-sm focus-within:ring-1 focus-within:ring-[#6b21cf]/20 transition-all">
                          <div className="flex items-center gap-1.5 px-4 bg-slate-50 border-r border-slate-100 select-none">
                            <span className="text-sm font-semibold text-slate-600">+62</span>
                          </div>
                          <input 
                            type="tel" 
                            defaultValue="8123456789"
                            placeholder="Nomor telepon" 
                            className="flex-1 px-4 py-3 bg-transparent border-none text-slate-800 text-sm focus:outline-none focus:ring-0 placeholder:text-slate-300"
                          />
                        </div>
                      </div>

                      <button 
                        onClick={() => setCurrentScreen('dashboard')} 
                        className="w-full bg-[#6b21cf] hover:bg-[#5b17b8] text-white py-4 rounded-2xl font-semibold shadow-lg shadow-purple-500/10 flex items-center justify-center gap-1.5 text-sm duration-100 active:scale-95"
                      >
                        Lanjutkan <ArrowRight className="w-4 h-4" />
                      </button>

                      {/* Divider separator */}
                      <div className="relative flex items-center py-4">
                        <div className="flex-grow border-t border-slate-200/60"></div>
                        <span className="flex-shrink mx-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Atau masuk dengan</span>
                        <div className="flex-grow border-t border-slate-200/60"></div>
                      </div>

                      {/* Third party logins */}
                      <div className="grid grid-cols-2 gap-3">
                        <button 
                          onClick={() => setCurrentScreen('dashboard')} 
                          className="flex items-center justify-center h-12 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors py-2 px-3 text-xs font-semibold"
                        >
                          <svg className="w-4 h-4 mr-1.5 shrink-0" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                          </svg>
                          <span>Google</span>
                        </button>
                        <button 
                          onClick={() => setCurrentScreen('dashboard')} 
                          className="flex items-center justify-center h-12 bg-black text-white rounded-xl hover:opacity-90 transition-opacity py-2 px-3 text-xs font-semibold"
                        >
                          <svg className="w-4 h-4 mr-1.5 fill-current shrink-0" viewBox="0 0 24 24">
                            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C4.79 17.3 3.8 12.48 5.79 9.1c1.03-1.74 2.83-2.81 4.71-2.84 1.45-.03 2.5.76 3.37.76.84 0 2.2-.95 3.93-.77 1.43.14 2.51.71 3.19 1.62-2.91 1.75-2.45 5.77.53 6.96-.58 1.44-1.34 2.87-2.43 3.45zM15.48 2c.28 1.88-1.24 3.73-3.03 3.9-2.09.21-3.66-1.55-3.17-3.41 1.83-.24 3.65 1.54 3.17 3.51z"></path>
                          </svg>
                          <span>Apple</span>
                        </button>
                      </div>
                    </div>

                    <div className="text-center space-y-2 mt-4 text-[10px] text-slate-400 px-2 leading-normal">
                      <p>Baru di Fisiohome? <span className="font-semibold text-[#6b21cf] cursor-pointer hover:underline">Daftar sekarang</span></p>
                      <p>Dengan melanjutkan verifikasi, Anda menyetujui Ketentuan Layanan & Kebijakan Privasi standar klinis kami.</p>
                    </div>
                  </motion.div>
                )}

                {/* 4. HOME DASHBOARD SCREEN */}
                {currentScreen === 'dashboard' && (
                  <motion.div
                    key="dashboard"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-5 space-y-6"
                  >
                    {/* Header bar within dashboard */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <img 
                          src={mockUserProfile.avatar} 
                          alt="Patient Profile" 
                          className="w-10 h-10 rounded-full border-2 border-[#6b21cf]/15 object-cover"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 tracking-tight">{mockUserProfile.name}</h4>
                          <p className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            Progres: Premium Member
                          </p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => setCurrentScreen('notifications')} 
                        className="relative w-10 h-10 border border-slate-200/80 hover:bg-slate-50 rounded-full flex items-center justify-center text-slate-600 transition-colors"
                      >
                        <Bell className="w-4.5 h-4.5" />
                        {notifications.some(n => !n.read) && (
                          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#ef7d31] rounded-full border-white border"></span>
                        )}
                      </button>
                    </div>

                    {/* Ambient Greeting Prompt */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">Rehabilitasi Aktif</span>
                      <h3 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">Halo, Alex</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">Let's continue your recovery cycle today.</p>
                    </div>

                    {/* Search Bar simulation */}
                    <div 
                      onClick={() => handleNavToTab('discovery')}
                      className="flex h-12 w-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200/30 rounded-2xl items-center px-4 gap-3 text-slate-400 cursor-pointer transition-colors"
                    >
                      <Search className="w-4 h-4 shrink-0" />
                      <span className="text-xs">Cari layanan atau terapis klinis...</span>
                    </div>

                    {/* Quick CTA Action Grid */}
                    <div className="grid grid-cols-2 gap-3.5">
                      <button 
                        onClick={() => handleNavToTab('discovery')}
                        className="h-14 bg-[#6b21cf] hover:brightness-110 shadow-lg shadow-purple-600/15 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 text-xs transition-transform active:scale-95 duration-100"
                      >
                        <Calendar className="w-4 h-4" />
                        Pesan Kunjungan
                      </button>
                      <button 
                        onClick={() => {
                          setCallActive(true);
                          setCurrentScreen('consultation');
                        }}
                        className="h-14 bg-orange-100 hover:bg-orange-200/80 text-orange-600 font-semibold rounded-2xl flex items-center justify-center gap-2 text-xs transition-transform active:scale-95 duration-100"
                      >
                        <Video className="w-4 h-4" />
                        Konsultasi Online
                      </button>
                    </div>

                    {/* Progress Metrics Bento Card */}
                    <div 
                      onClick={() => setCurrentScreen('progress')}
                      className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-sm shadow-slate-950/5 flex items-center justify-between cursor-pointer hover:border-purple-200 hover:shadow-md transition-all group"
                    >
                      <div className="space-y-1 pr-2">
                        <h4 className="text-xs font-bold text-slate-800 tracking-tight uppercase tracking-wider text-purple-600">Progres Pemulihan</h4>
                        <p className="text-xs text-slate-500 font-semibold">{mockUserProfile.condition}</p>
                        <div className="mt-3.5">
                          <span className="text-[10px] font-bold bg-orange-100 text-orange-600 px-3 py-1 rounded-full uppercase tracking-wider">
                            12 / 16 Sesi Selesai
                          </span>
                        </div>
                      </div>
                      
                      {/* Dynamic circular graph icon */}
                      <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle className="text-slate-100" cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" strokeWidth="6"></circle>
                          <circle className="text-[#6b21cf]" cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" strokeDasharray="213.6" strokeDashoffset="53.4" strokeLinecap="round" strokeWidth="6"></circle>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold text-slate-900 font-display">75%</span>
                        </div>
                      </div>
                    </div>

                    {/* Sesi Mendatang Alert Card */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center px-1">
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Sesi Mendatang</h4>
                        <button onClick={() => handleNavToTab('history')} className="text-xs font-semibold text-[#6b21cf] hover:underline">
                          Lihat Semua
                        </button>
                      </div>

                      {bookings.length > 0 && (
                        <div 
                          onClick={() => setCurrentScreen('tracking')}
                          className="bg-purple-50/70 border border-purple-100 rounded-3xl p-4 flex items-center gap-3.5 cursor-pointer hover:bg-purple-50 transition-all active:scale-[0.98]"
                        >
                          <img 
                            src={bookings[0].therapistAvatar} 
                            alt="Physicist Thumbnail" 
                            className="w-12 h-12 rounded-2xl object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="text-xs font-bold text-slate-800 truncate">{bookings[0].therapistName}</h5>
                            <p className="text-[11px] text-slate-500 font-semibold">{bookings[0].date} • {bookings[0].timeSlot}</p>
                          </div>
                          <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#6b21cf] shadow-sm shrink-0">
                            <ChevronRight className="w-4 h-4" />
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Nearby Horizontal Scroll */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest px-1">Fisioterapis Unggulan</h4>
                      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                        {mockTherapists.map((therapist) => (
                          <div 
                            key={therapist.id}
                            onClick={() => {
                              setSelectedTherapist(therapist);
                              setCurrentScreen('detail');
                            }}
                            className="flex-shrink-0 w-[140px] bg-white border border-slate-100 rounded-3xl p-3.5 space-y-3 shadow-slate-900/5 shadow-sm scroll-smooth cursor-pointer hover:border-purple-200 transition-all hover:shadow-md"
                          >
                            <img 
                              src={therapist.avatar} 
                              alt={therapist.name} 
                              className="w-full h-24 rounded-2xl object-cover border border-slate-50"
                            />
                            <div className="space-y-1">
                              <h5 className="text-xs font-bold text-slate-800 truncate leading-tight">{therapist.name}</h5>
                              <p className="text-[10px] text-slate-400 truncate">{therapist.experience} Exp</p>
                              <div className="flex justify-between items-center pt-1.5 border-t border-slate-50">
                                <span className="text-[10px] font-bold text-[#ef7d31] flex items-center gap-0.5">
                                  <Star className="w-3.5 h-3.5 text-[#ef7d31] fill-[#ef7d31]" />
                                  {therapist.rating}
                                </span>
                                <span className="text-[10px] font-bold text-[#6b21cf]">
                                  Rp{(therapist.sessionPrice / 1000)}k
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 5. THERAPIST DISCOVERY SCREEN */}
                {currentScreen === 'discovery' && (
                  <motion.div
                    key="discovery"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-5 space-y-5"
                  >
                    <div className="space-y-2">
                      <h3 className="font-display font-bold text-xl text-slate-900">Cari Terapis</h3>
                      <p className="text-xs text-slate-500 leading-normal">Temukan terapis spesialis rehabilitasi berlisensi medis di sekitar area Anda.</p>
                    </div>

                    {/* Search Field with live text filter feedback */}
                    <div className="flex h-12 w-full bg-white border border-slate-200 rounded-2xl items-center px-4 gap-3 shadow-sm focus-within:border-[#6b21cf] transition-all">
                      <Search className="w-4 h-4 shrink-0 text-slate-400" />
                      <input 
                        type="text" 
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Cari spesialis atau gejala..." 
                        className="flex-1 text-sm text-slate-800 bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-slate-300"
                      />
                      {searchText && (
                        <button onClick={() => setSearchText('')}>
                          <X className="w-4 h-4 text-slate-400" />
                        </button>
                      )}
                    </div>

                    {/* Specialties Scroll Chip filters */}
                    <div className="flex gap-2.5 overflow-x-auto no-scrollbar scroll-smooth">
                      {['Semua', 'Pasca Operasi', 'Cedera Olahraga', 'Stroke', 'Lansia'].map((spec) => (
                        <button 
                          key={spec}
                          onClick={() => setSelectedSpecialty(spec)}
                          className={`flex-shrink-0 text-xs px-4 py-2.5 rounded-full font-semibold transition-all duration-150 ${
                            selectedSpecialty === spec 
                              ? 'bg-[#6b21cf] text-white shadow-md shadow-purple-500/10' 
                              : 'bg-slate-100 hover:bg-slate-200/60 text-slate-600'
                          }`}
                        >
                          {spec}
                        </button>
                      ))}
                    </div>

                    {/* Therapist hits listings matching search text & filters */}
                    <div className="space-y-3.5">
                      {mockTherapists
                        .filter(t => {
                          const matchesSearch = t.name.toLowerCase().includes(searchText.toLowerCase()) || 
                                                t.title.toLowerCase().includes(searchText.toLowerCase()) ||
                                                t.specialties.some(s => s.toLowerCase().includes(searchText.toLowerCase()));
                          const matchesFilter = selectedSpecialty === 'Semua' || t.specialties.includes(selectedSpecialty);
                          return matchesSearch && matchesFilter;
                        })
                        .map((therapist) => (
                          <div 
                            key={therapist.id}
                            onClick={() => {
                              setSelectedTherapist(therapist);
                              setCurrentScreen('detail');
                            }}
                            className="bg-white border border-slate-100 hover:border-[#6b21cf]/20 hover:shadow-md cursor-pointer rounded-3xl p-4 flex gap-4 transition-all duration-200"
                          >
                            <img 
                              src={therapist.avatar} 
                              alt={therapist.name} 
                              className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-slate-100"
                            />
                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                              <div>
                                <h4 className="text-xs font-bold text-slate-800 leading-snug truncate">{therapist.name}</h4>
                                <p className="text-[10px] text-purple-600 font-semibold truncate mt-0.5">{therapist.title}</p>
                              </div>
                              
                              <div className="flex justify-between items-center pt-2">
                                <span className="text-[11px] font-bold text-[#ef7d31] flex items-center gap-0.5">
                                  <Star className="w-3.5 h-3.5 text-[#ef7d31] fill-[#ef7d31]" />
                                  {therapist.rating}
                                </span>
                                <span className="text-[11px] font-semibold text-slate-400 font-display">
                                  Rp{(therapist.sessionPrice / 1000)}k / 60mnt
                                </span>
                              </div>
                            </div>
                          </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 6. THERAPIST DETAIL SCREEN */}
                {currentScreen === 'detail' && (
                  <motion.div
                    key="detail"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: -20 }}
                    className="absolute inset-0 bg-[#fcfaff] flex flex-col z-10 overflow-y-auto no-scrollbar"
                  >
                    {/* Header Image and overlay actions */}
                    <div className="relative h-64 shrink-0">
                      <img 
                        src={selectedTherapist.avatar} 
                        alt={selectedTherapist.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#fcfaff] via-transparent to-transparent"></div>
                      
                      <button 
                        onClick={() => setCurrentScreen('discovery')} 
                        className="absolute top-4 left-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-slate-800 shadow"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <button 
                        onClick={() => handleFavoriteToggle(selectedTherapist.id)}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow"
                      >
                        <Heart className={`w-5 h-5 transition-colors ${
                          favorites.includes(selectedTherapist.id) ? 'text-red-500 fill-red-500' : 'text-slate-400'
                        }`} />
                      </button>
                    </div>

                    {/* Detail Profile Cards */}
                    <div className="px-5 -mt-10 relative z-15 space-y-6 flex-1pb-24">
                      
                      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xl shadow-slate-900/5 space-y-4">
                        <div className="space-y-1">
                          <h3 className="font-display font-extrabold text-xl text-slate-900 leading-tight">
                            {selectedTherapist.name}
                          </h3>
                          <p className="text-xs font-semibold text-purple-600">
                            {selectedTherapist.title}
                          </p>
                        </div>

                        {/* Summary clinical badges */}
                        <div className="grid grid-cols-3 gap-2.5 pt-1.5">
                          <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-2xl text-center">
                            <span className="text-xs font-extrabold text-slate-800 block">{selectedTherapist.rating} ⭐</span>
                            <span className="text-[9px] text-slate-400 font-semibold block uppercase mt-0.5">Rating</span>
                          </div>
                          <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-2xl text-center">
                            <span className="text-xs font-extrabold text-[#6b21cf] block">{selectedTherapist.experience}</span>
                            <span className="text-[9px] text-slate-400 font-semibold block uppercase mt-0.5">Pengalaman</span>
                          </div>
                          <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-2xl text-center">
                            <span className="text-xs font-extrabold text-emerald-600 block">Verified</span>
                            <span className="text-[9px] text-slate-400 font-semibold block uppercase mt-0.5">Medis</span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-500 leading-relaxed font-sans pt-1">
                          {selectedTherapist.bio}
                        </p>
                      </div>

                      {/* Scheduling Day Slots picker */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center px-1">
                          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Jadwal Tersedia</h4>
                          <span className="text-xs text-purple-700 font-bold">{selectedTherapist.availableDays[0].day} - {selectedTherapist.availableDays[selectedTherapist.availableDays.length - 1].day}</span>
                        </div>

                        <div className="flex gap-2.5 overflow-x-auto no-scrollbar">
                          {selectedTherapist.availableDays.map((dayObj) => (
                            <button
                              key={dayObj.dateNum}
                              onClick={() => setBookingDate(dayObj.dateNum)}
                              className={`flex-shrink-0 w-14 h-18 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-150 border ${
                                bookingDate === dayObj.dateNum
                                  ? 'bg-[#6b21cf] text-white border-transparent shadow-lg shadow-purple-500/10'
                                  : 'bg-white text-slate-700 border-slate-200/70 hover:border-slate-300'
                              }`}
                            >
                              <span className="text-[10px] font-bold uppercase tracking-wider opacity-85">{dayObj.day}</span>
                              <span className="text-sm font-extrabold font-display">{dayObj.dateNum}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Time Slots Hour selections */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest px-1">Waktu Sesi</h4>
                        <div className="flex flex-wrap gap-2.5">
                          {selectedTherapist.timeSlots.map((timeStr) => (
                            <button
                              key={timeStr}
                              onClick={() => setBookingTime(timeStr)}
                              className={`text-xs px-4 py-3 rounded-full font-bold transition-all duration-150 border ${
                                bookingTime === timeStr
                                  ? 'bg-[#ef7d31] text-white border-transparent'
                                  : 'bg-white text-slate-600 border-slate-200/80 hover:border-slate-300'
                              }`}
                            >
                              {timeStr}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Review Preview block */}
                      {selectedTherapist.reviews.length > 0 && (
                        <div className="space-y-3.5">
                          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest px-1">Ulasan Pasien</h4>
                          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-4 space-y-2.5">
                            <div className="flex items-center gap-2.5">
                              <img 
                                src={selectedTherapist.reviews[0].reviewerAvatar} 
                                alt={selectedTherapist.reviews[0].reviewerName} 
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <div>
                                <h5 className="text-xs font-bold text-slate-800 leading-tight">{selectedTherapist.reviews[0].reviewerName}</h5>
                                <div className="flex text-amber-400">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <p className="text-xs text-slate-500 italic leading-relaxed">
                              "{selectedTherapist.reviews[0].comment}"
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Extra clinical spacing */}
                      <div className="h-28 shrink-0"></div>
                    </div>

                    {/* Stationary Bottom Booking Cost CTA Actions */}
                    <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 px-5 pt-3.5 pb-7 z-15 flex justify-between items-center gap-4">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Estimasi Tarif</span>
                        <h4 className="text-base font-extrabold text-slate-900 leading-tight font-display">
                          Rp{(selectedTherapist.sessionPrice / 1000)}b<span className="text-xs font-normal text-slate-400">/sesi</span>
                        </h4>
                      </div>
                      <button 
                        onClick={() => setCurrentScreen('booking')}
                        className="bg-[#6b21cf] hover:brightness-110 h-13 px-6 rounded-2xl text-white font-bold text-xs shadow-lg shadow-purple-600/15 flex items-center justify-center gap-1.5 transition-transform active:scale-95 duration-100 shrink-0"
                      >
                        Pesan Kunjungan
                        <ArrowRight className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 7. TELEMEDICINE ONLINE CONSULTATION SCREEN */}
                {currentScreen === 'consultation' && (
                  <motion.div
                    key="consultation"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#0c0a12] text-white flex flex-col justify-between p-6 z-20"
                  >
                    {/* Top video bar metadata */}
                    <div className="flex justify-between items-center pt-2">
                      <div className="bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-xs text-slate-100">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                        {callActive ? formatTime(callSeconds) : 'Panggilan Berakhir'}
                      </div>
                      <span className="text-xs text-slate-400 font-semibold">HD Kualitas Klinis</span>
                    </div>

                    {/* Interactive Telemedicine Camera Streams layout */}
                    <div className="flex-1 my-auto flex flex-col items-center justify-center relative w-full h-[400px] rounded-3xl overflow-hidden border border-white/10 bg-slate-950">
                      
                      {callActive ? (
                        <>
                          {/* Main stream: Physiotherapist talking */}
                          <img 
                            src="https://images.unsplash.com/photo-1594824813573-246434e33963?auto=format&fit=crop&q=80&w=600" 
                            alt="Physiotherapist Stream" 
                            className="w-full h-full object-cover opacity-85 absolute inset-0"
                          />
                          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl text-[11px] font-semibold flex items-center gap-1">
                            Dr. Sarah Mitchell <Award className="w-3.5 h-3.5 text-[#ef7d31]" />
                          </div>

                          {/* PIP stream: Patient Camera Feed */}
                          {!isCamOff && (
                            <div className="absolute top-4 right-4 w-24 h-32 rounded-2xl overflow-hidden border border-white/20 bg-slate-900 shadow-xl z-25">
                              <img 
                                src={mockUserProfile.avatar} 
                                alt="Patient camera stream" 
                                className="w-full h-full object-cover scale-x-[-1]"
                              />
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-center space-y-3 px-6">
                          <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                          <h5 className="font-bold text-sm">Konsultasi Selesai</h5>
                          <p className="text-[11px] text-slate-400 leading-relaxed">Fisiohome merekomendasikan program pemulihan ACL 12 Sesi harian untuk Anda.</p>
                        </div>
                      )}
                    </div>

                    {/* Interactive Telemedicine controls layout */}
                    <div className="space-y-4 pt-4 shrink-0">
                      
                      {callActive ? (
                        <div className="flex justify-around items-center">
                          <button 
                            onClick={() => setIsMuted(!isMuted)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                              isMuted ? 'bg-[#ef7d31] text-white' : 'bg-white/10 text-white hover:bg-white/25'
                            }`}
                          >
                            <Mic className="w-5 h-5" />
                          </button>
                          
                          <button 
                            onClick={() => setCallActive(false)}
                            className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 duration-100"
                          >
                            <Phone className="w-6 h-6 rotate-[135deg]" />
                          </button>

                          <button 
                            onClick={() => setIsCamOff(!isCamOff)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                              isCamOff ? 'bg-[#ef7d31] text-white' : 'bg-white/10 text-white hover:bg-white/25'
                            }`}
                          >
                            <VideoOff className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => {
                            setCurrentScreen('dashboard');
                          }}
                          className="w-full bg-[#6b21cf] text-white py-4 rounded-xl font-bold text-xs"
                        >
                          Kembali ke Dashboard Beranda
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* 8. BOOKING FLOW SCREEN */}
                {currentScreen === 'booking' && (
                  <motion.div
                    key="booking"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: -20 }}
                    className="p-5 space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <button onClick={() => setCurrentScreen('detail')} className="text-slate-600">
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <h3 className="font-display font-bold text-base text-slate-900">Konfirmasi Sesi</h3>
                    </div>

                    {/* Booking Form Information details summary */}
                    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm shadow-slate-950/5 space-y-4">
                      <div className="flex items-center gap-3 pb-3 border-b border-slate-50">
                        <img 
                          src={selectedTherapist.avatar} 
                          alt="Specialist" 
                          className="w-11 h-11 rounded-xl object-cover shrink-0"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">{selectedTherapist.name}</h4>
                          <p className="text-[10px] text-slate-400 font-semibold">{selectedTherapist.title}</p>
                        </div>
                      </div>

                      {/* Configured scheduling values */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-bold text-slate-300 uppercase tracking-wider block">Tanggal Sesi</span>
                          <p className="text-xs font-bold text-slate-800">Okt {bookingDate}, 2023</p>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-bold text-slate-300 uppercase tracking-wider block">Jam Sesi</span>
                          <p className="text-xs font-bold text-[#6b21cf]">{bookingTime}</p>
                        </div>
                      </div>
                    </div>

                    {/* Choose Consultation type (Visit to home vs video telemedicine consultation) */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest px-1">Tipe Layanan Terapi</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <label className={`cursor-pointer border p-3.5 rounded-2xl flex flex-col justify-between transition-all ${
                          bookingType === 'visit' 
                            ? 'bg-[#6b21cf]/5 border-[#6b21cf] ring-1 ring-[#6b21cf]/30' 
                            : 'bg-white border-slate-200/80 hover:border-slate-300'
                        }`}>
                          <input 
                            type="radio" 
                            name="bookingType" 
                            checked={bookingType === 'visit'}
                            onChange={() => setBookingType('visit')}
                            className="sr-only"
                          />
                          <span className="text-xs font-bold text-slate-800">Kunjungan Rumah</span>
                          <span className="text-[10px] text-slate-400 font-semibold mt-1">Estimasi 60 Menit</span>
                        </label>
                        <label className={`cursor-pointer border p-3.5 rounded-2xl flex flex-col justify-between transition-all ${
                          bookingType === 'consultation' 
                            ? 'bg-[#6b21cf]/5 border-[#6b21cf] ring-1 ring-[#6b21cf]/30' 
                            : 'bg-white border-slate-200/80 hover:border-slate-300'
                        }`}>
                          <input 
                            type="radio" 
                            name="bookingType" 
                            checked={bookingType === 'consultation'}
                            onChange={() => setBookingType('consultation')}
                            className="sr-only"
                          />
                          <span className="text-xs font-bold text-slate-800 font-sans">Konsultasi Video</span>
                          <span className="text-[10px] text-slate-400 font-semibold mt-1">Tarif hemat Rp80rb</span>
                        </label>
                      </div>
                    </div>

                    {/* Address config */}
                    {bookingType === 'visit' && (
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-purple-700 uppercase tracking-widest block px-1">
                          Alamat Kunjungan Rumah
                        </label>
                        <textarea 
                          rows={2}
                          value={patientAddress}
                          onChange={(e) => setPatientAddress(e.target.value)}
                          placeholder="Masukkan alamat lengkap rumah" 
                          className="w-full text-xs text-slate-700 bg-white border border-slate-200 rounded-2xl p-3 focus:outline-none focus:border-[#6b21cf]"
                        />
                      </div>
                    )}

                    {/* Extra Notes Input */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-1">
                        Catatan medis / Gejala (Opsional)
                      </label>
                      <textarea 
                        rows={1}
                        value={patientNotes}
                        onChange={(e) => setPatientNotes(e.target.value)}
                        placeholder="Contoh: Fokus penguatan lutut pasca melepas gips balutan..." 
                        className="w-full text-xs text-slate-700 bg-white border border-slate-200 rounded-2xl p-3 focus:outline-none focus:border-[#6b21cf] placeholder:text-slate-300"
                      />
                    </div>

                    {/* Action CTA */}
                    <button 
                      onClick={() => setCurrentScreen('payment')}
                      className="w-full bg-[#6b21cf] text-white py-4 rounded-2xl font-bold text-xs shadow-md shadow-purple-500/10 flex items-center justify-center gap-1 hover:brightness-110 duration-100 active:scale-95"
                    >
                      Pilih Metode Pembayaran
                      <ArrowRight className="w-4 h-4 ml-0.5" />
                    </button>
                  </motion.div>
                )}

                {/* 9. PAYMENT SCREEN */}
                {currentScreen === 'payment' && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-5 space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <button onClick={() => setCurrentScreen('booking')} className="text-slate-600">
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <h3 className="font-display font-bold text-base text-slate-900">Metode Pembayaran</h3>
                    </div>

                    {/* Substantial Checkout secure trust banners */}
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-3.5 flex items-start gap-2.5 text-emerald-800 text-[11px] font-semibold leading-relaxed">
                      <Lock className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                      <p>Koneksi Transaksi Fisiohome Terenkripsi Standard HIPAA & OJK Aman.</p>
                    </div>

                    {/* Payment list with vectors */}
                    <div className="space-y-2.5">
                      {[
                        { id: 'Dana Wallet', label: 'DANA Dompet Digital', info: 'Saldo: Rp 350.000' },
                        { id: 'Gopay Wallet', label: 'GoPay Instan', info: 'Saldo terhubung' },
                        { id: 'Transfer Bank Mandiri', label: 'Bank Mandiri Virtual Account', info: 'Verifikasi Otomatis' },
                        { id: 'Credit Card', label: 'Kartu Kredit / Debit Online', info: 'Visa / MasterCard' },
                      ].map((pay) => (
                        <label 
                          key={pay.id} 
                          className={`cursor-pointer flex items-center justify-between p-4 bg-white border rounded-2xl shadow-sm hover:border-[#6b21cf]/50 transition-all ${
                            selectedPayment === pay.id ? 'border-[#6b21cf] ring-1 ring-[#6b21cf]/20' : 'border-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <CreditCard className="w-5 h-5 text-slate-400 text-purple-600" />
                            <div>
                              <span className="text-xs font-bold text-slate-800 block leading-tight">{pay.label}</span>
                              <span className="text-[10px] text-slate-400 font-semibold">{pay.info}</span>
                            </div>
                          </div>
                          <input 
                            type="radio" 
                            name="paymentOption" 
                            checked={selectedPayment === pay.id}
                            onChange={() => setSelectedPayment(pay.id)}
                            className="accent-purple-700"
                          />
                        </label>
                      ))}
                    </div>

                    {/* Price summary details */}
                    <div className="bg-slate-50 border border-slate-100 rounded-3xl p-4 space-y-2 text-xs">
                      <div className="flex justify-between font-semibold">
                        <span className="text-slate-500">Tarif Fisioterapi</span>
                        <span className="text-slate-800">Rp{(selectedTherapist.sessionPrice)}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span className="text-slate-500">Kunjungan Rumah & Transport</span>
                        <span className="text-slate-800">FREE</span>
                      </div>
                      <div className="border-t border-slate-200/50 my-2 pt-2 flex justify-between font-extrabold text-sm text-slate-900">
                        <span>Total Pembayaran</span>
                        <span className="text-[#6b21cf] font-display">Rp{(selectedTherapist.sessionPrice)}</span>
                      </div>
                    </div>

                    {/* Booking final creation CTA */}
                    <button 
                      onClick={handleCreateBooking}
                      className="w-full bg-[#6b21cf] text-white py-4 rounded-2xl font-bold text-xs shadow-lg shadow-purple-600/15 flex items-center justify-center gap-1 hover:brightness-110 active:scale-95 duration-100"
                    >
                      Bayar Sekarang & Konfirmasi
                    </button>
                  </motion.div>
                )}

                {/* 11. RECOVERY PROGRESS SCREEN */}
                {currentScreen === 'progress' && (
                  <motion.div
                    key="progress"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: -20 }}
                    className="p-5 space-y-6"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        <button onClick={() => setCurrentScreen('dashboard')} className="text-slate-600 focus:outline-none">
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <h3 className="font-display font-extrabold text-xl text-slate-900">Progres Pemulihan</h3>
                      </div>
                      <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block pl-9">Klinis Medis Alex</span>
                      <p className="text-xs text-slate-400 leading-normal font-sans pl-9">Pasca-Rekonstruksi ACL • Minggu ke-6 dari 12</p>
                    </div>

                    {/* Recovery Ring display bento */}
                    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm shadow-slate-950/5 flex flex-col items-center justify-center text-center space-y-4">
                      <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle className="text-slate-100" cx="64" cy="64" fill="transparent" r="54" stroke="currentColor" strokeWidth="8"></circle>
                          <circle className="text-[#6b21cf]" cx="64" cy="64" fill="transparent" r="54" stroke="currentColor" strokeDasharray="339.12" strokeDashoffset="84.78" strokeLinecap="round" strokeWidth="8"></circle>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-extrabold text-slate-900 font-display">75%</span>
                          <span className="text-[9px] text-slate-400 tracking-wider uppercase font-extrabold">Mobilitas Lutut</span>
                        </div>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-slate-800">Status Mobilitas: Sesuai Target</p>
                        <p className="text-[11px] text-slate-400 font-semibold font-sans">90% Target Kelurusan pada Minggu 8</p>
                      </div>
                    </div>

                    {/* Pain index slider metric */}
                    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm shadow-slate-950/5 space-y-5">
                      <div className="flex justify-between items-center text-xs">
                        <div className="space-y-0.5">
                          <h4 className="font-bold text-slate-800">Indeks Nyeri Harian</h4>
                          <p className="text-[10px] text-slate-400">Sesuaikan rentang sendi berdasar rasio nyeri</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-extrabold text-white transition-colors duration-300 ${
                          painLevel <= 3 
                            ? 'bg-[#6b21cf]' 
                            : painLevel <= 7 
                              ? 'bg-[#ef7d31]' 
                              : 'bg-red-600'
                        }`}>
                          Lv {painLevel}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <input 
                          type="range" 
                          min="1" 
                          max="10" 
                          value={painLevel} 
                          onChange={(e) => setPainLevel(parseInt(e.target.value))}
                          className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#6b21cf]"
                        />
                        <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                          <span>1 - AMAN (NYERI MINIMAL)</span>
                          <span>10 - PARAH</span>
                        </div>
                      </div>
                    </div>

                    {/* Chart simulation widget */}
                    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm shadow-slate-950/5 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Intensitas Aktivitas Terapi</h4>
                        <span className="text-[11px] font-bold text-purple-700">7 Hari Terakhir</span>
                      </div>
                      
                      {/* Graphics heights vector mockup */}
                      <div className="flex items-end justify-between h-20 px-2 pt-2 border-b border-slate-100">
                        <div className="w-6 bg-[#6b21cf]/10 h-[40%] rounded-t-md"></div>
                        <div className="w-6 bg-[#6b21cf]/20 h-[60%] rounded-t-md"></div>
                        <div className="w-6 bg-[#6b21cf]/15 h-[55%] rounded-t-md"></div>
                        <div className="w-6 bg-[#6b21cf]/30 h-[80%] rounded-t-md"></div>
                        <div className="w-6 bg-[#ef7d31]/40 h-[70%] rounded-t-md animate-pulse"></div>
                        <div className="w-6 bg-[#6b21cf]/10 h-[30%] rounded-t-md"></div>
                        <div className="w-6 bg-[#6b21cf] h-[95%] rounded-t-md"></div>
                      </div>
                      <div className="flex justify-between px-1 text-[8px] font-extrabold text-slate-400 uppercase font-sans">
                        <span>S</span><span>S</span><span>R</span><span>K</span><span>J</span><span>S</span><span className="text-[#6b21cf]">M</span>
                      </div>
                    </div>

                    {/* Milestones list timeline check */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest px-1">Tahapan Pemulihan</h4>
                      <div className="space-y-2.5">
                        {recoveryStages.map((stg) => (
                          <div 
                            key={stg.week}
                            className={`p-4 rounded-2xl border transition-all ${
                              stg.status === 'past' 
                                ? 'bg-slate-50 border-slate-100/80 opacity-70' 
                                : stg.status === 'active' 
                                  ? 'bg-purple-50/20 border-purple-100 shadow-sm' 
                                  : 'bg-white border-slate-100'
                            }`}
                          >
                            <div className="flex justify-between items-start gap-2">
                              <div className="space-y-0.5">
                                <span className={`text-[9px] font-bold block uppercase tracking-wider ${
                                  stg.status === 'active' ? 'text-purple-600' : 'text-slate-400'
                                }`}>
                                  Minggu {stg.week} (Rencana)
                                </span>
                                <h5 className="text-xs font-bold text-slate-800">{stg.title}</h5>
                              </div>
                              {stg.status === 'past' && (
                                <span className="text-emerald-500 font-extrabold text-xs">Selesai ✓</span>
                              )}
                              {stg.status === 'active' && (
                                <span className="text-purple-700 font-extrabold text-xs animate-pulse">Aktif...</span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 leading-normal mt-1 text-slate-500 leading-relaxed font-sans">{stg.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Clinical notes box */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-5 space-y-4">
                      <div className="flex items-center gap-2.5">
                        <img 
                          src="https://images.unsplash.com/photo-1594824813573-246434e33963?auto=format&fit=crop&q=80&w=150" 
                          alt="Physio" 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">Catatan Medis Terapist</h4>
                          <p className="text-[9px] text-slate-400">Dr. Sarah Mitchell • Kemarin</p>
                        </div>
                      </div>
                      <div className="bg-slate-50 border-l-4 border-[#ef7d31] p-3 rounded text-[11px] font-medium leading-relaxed italic text-slate-500 font-sans">
                        "Alex memiliki respons ekstensi lutut yang sangat baik minggu ini. Lanjutkan latihan quadriceps static harian 3 set x 15 repetisi. Pertahankan sudut penumpuan seimbang."
                      </div>
                      {/* Interaction click alert for full records */}
                      <button 
                        onClick={() => alert("Mengunduh Laporan Medis Lengkap Fisiohome PDF (Simulasi)")}
                        className="w-full text-xs py-3.5 border border-slate-200 hover:border-slate-300 font-bold text-slate-600 rounded-xl bg-slate-50"
                      >
                        Lihat Rekam Medis Detail (PDF)
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 10. REAL-TIME TRACKING THERAPIST SCREEN */}
                {currentScreen === 'tracking' && (
                  <motion.div
                    key="tracking"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#fcfaff] flex flex-col justify-between overflow-hidden z-20"
                  >
                    {/* Simulated Map Visualizer */}
                    <div className="flex-1 w-full bg-slate-100 relative h-full flex items-center justify-center">
                      
                      {/* Vector minimalist map grid layout simulation */}
                      <div className="absolute inset-0 opacity-15 overflow-hidden">
                        {Array.from({ length: 15 }).map((_, i) => (
                          <div 
                            key={i} 
                            style={{ top: `${i * 40}px` }} 
                            className="absolute inset-x-0 h-px bg-slate-400"
                          />
                        ))}
                        {Array.from({ length: 15 }).map((_, i) => (
                          <div 
                            key={i} 
                            style={{ left: `${i * 40}px` }} 
                            className="absolute inset-y-0 w-px bg-slate-400"
                          />
                        ))}
                      </div>

                      {/* Moving route paths simulated coordinates */}
                      <div className="absolute w-44 h-44 border-2 border-dashed border-purple-500/30 rounded-full animate-ping"></div>

                      <div className="absolute text-center space-y-6">
                        <div className="relative">
                          {/* Inbound Clinician dynamic moving icon */}
                          <div className="w-14 h-14 bg-white border-2 border-[#6b21cf] shadow-xl p-0.5 rounded-full relative z-25 mx-auto animate-bounce">
                            <img 
                              src="https://images.unsplash.com/photo-1594824813573-246434e33963?auto=format&fit=crop&q=80&w=150" 
                              alt="Sarah Mitchell" 
                              className="w-full h-full object-cover rounded-full"
                            />
                            {/* Inbound therapeutic vehicle overlay badge */}
                            <span className="absolute -bottom-1 -right-1 bg-purple-700 text-white w-5 h-5 rounded-full flex items-center justify-center shadow text-[10px]">
                              🚗
                            </span>
                          </div>

                          {/* Home target coordinates */}
                          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 space-y-1">
                            <div className="w-6 h-6 bg-[#ef7d31] rounded-lg shadow flex items-center justify-center text-white text-[10px] mx-auto">
                              🏠
                            </div>
                            <span className="text-[9px] font-extrabold bg-slate-800 text-white px-2 py-0.5 rounded-full uppercase tracking-wider block whitespace-nowrap">Your Home</span>
                          </div>
                        </div>
                      </div>

                      {/* Back button from Map tracker wrapper */}
                      <button 
                        onClick={() => setCurrentScreen('dashboard')}
                        className="absolute top-4 left-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-slate-800 shadow"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Interactive delivery details */}
                    <div className="bg-white rounded-t-[32px] border-t border-slate-100 p-5 shrink-0 space-y-4 shadow-xl shadow-black/10 relative z-25">
                      
                      <div className="text-center space-y-1">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Menuju Lokasi Anda</h4>
                        <h3 className="font-display font-extrabold text-xl text-slate-950 leading-tight">
                          Estimasi Tiba: {eta} Menit
                        </h3>
                        {/* Progress dynamic line indicator */}
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mt-1 max-w-[200px] mx-auto relative">
                          <div 
                            style={{ width: `${trackingProgress}%` }} 
                            className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"
                          />
                        </div>
                      </div>

                      {/* Doctor driver details rows */}
                      <div className="flex justify-between items-center bg-slate-50/50 p-3.5 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-3">
                          <img 
                            src="https://images.unsplash.com/photo-1594824813573-246434e33963?auto=format&fit=crop&q=80&w=150" 
                            alt="Physicist portrait" 
                            className="w-11 h-11 rounded-full object-cover border border-slate-100"
                          />
                          <div>
                            <h5 className="text-xs font-bold text-slate-800 leading-tight">Dr. Sarah Mitchell</h5>
                            <p className="text-[10px] text-slate-400 font-semibold leading-normal font-sans">0.8 km • Plat H 234 FIS</p>
                          </div>
                        </div>

                        {/* Interactive contact overlays popup simulation */}
                        <div className="flex gap-2 shrink-0">
                          <a 
                            href="tel:+628123456789"
                            onClick={(e) => {
                              e.preventDefault();
                              alert("Menghubungi Dokter Sarah Mitchell via Telepon Fisiohome (Simulasi)...");
                            }}
                            className="w-9 h-9 border border-slate-200 hover:bg-slate-50 text-[#6b21cf] rounded-full flex items-center justify-center shadow-xs transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                          <button 
                            onClick={() => alert("Buka Live Chat Medis secure dengan Dr. Sarah Mitchell (Simulasi)...")}
                            className="w-9 h-9 border border-slate-200 hover:bg-slate-50 text-[#6b21cf] rounded-full flex items-center justify-center shadow-xs transition-colors"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Quick action to mock final completion of therapy session */}
                      <button 
                        onClick={() => {
                          // Change the first booking to completed in our local list state
                          setBookings((prev) =>
                            prev.map((b, idx) => (idx === 0 ? { ...b, status: 'completed' } : b))
                          );
                          alert("Sesi Kunjungan Fisiohome Berhasil Diselesaikan. Progress Pemulihan harian telah ter-update otomatis!");
                          setCurrentScreen('history');
                        }}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 transition-colors text-white py-3.5 rounded-2xl font-bold text-xs"
                      >
                        Selesaikan Sesi Terapi (Selesai Tindakan)
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 12. SESSION HISTORY SCREEN */}
                {currentScreen === 'history' && (
                  <motion.div
                    key="history"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-5 space-y-6"
                  >
                    <div className="space-y-1">
                      <h3 className="font-display font-extrabold text-xl text-slate-900">Riwayat Terapi</h3>
                      <p className="text-xs text-slate-500 font-sans">Semua catatan kunjungan harian dan sesi klinis telemedicine Anda.</p>
                    </div>

                    {/* Filter tabs upcoming vs completed historic log */}
                    <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-2xl">
                      <button className="text-xs font-bold py-2.5 rounded-xl bg-white text-slate-800 shadow-xs">
                        Selesai Sesi
                      </button>
                      <button className="text-xs font-bold py-2.5 rounded-xl text-slate-400 hover:text-slate-600 transition-colors">
                        Mendatang
                      </button>
                    </div>

                    {/* Booking session outputs loops */}
                    <div className="space-y-4">
                      {bookings.map((item) => (
                        <div 
                          key={item.id}
                          className="bg-white border border-slate-100 rounded-3xl p-4.5 space-y-3.5 shadow-sm shadow-slate-900/5 relative hover:border-purple-200 transition-all"
                        >
                          <div className="flex justify-between items-start gap-2">
                            <div className="flex items-center gap-3">
                              <img 
                                src={item.therapistAvatar} 
                                alt={item.therapistName} 
                                className="w-11 h-11 rounded-full object-cover shrink-0"
                              />
                              <div>
                                <h4 className="text-xs font-bold text-slate-800 leading-tight">{item.therapistName}</h4>
                                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{item.date} • {item.timeSlot}</p>
                              </div>
                            </div>
                            
                            {/* Absolute badge status indicators */}
                            <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider ${
                              item.status === 'upcoming' 
                                ? 'bg-orange-100 text-orange-600' 
                                : 'bg-slate-100 text-slate-500'
                            }`}>
                              {item.status}
                            </span>
                          </div>

                          {/* Address notes parameters */}
                          {item.address && (
                            <div className="bg-slate-50/50 p-2.5 rounded-xl text-[10px] text-slate-500 font-sans leading-relaxed border border-slate-100">
                              🏠 <strong className="text-slate-700">LOKASI:</strong> {item.address}
                            </div>
                          )}

                          {/* Actions on history items */}
                          <div className="flex justify-between items-center pt-2.5 border-t border-slate-50 text-xs font-bold text-[#6b21cf]">
                            <span>Biaya Sesi: Rp{(item.price / 1000)}k</span>
                            <button 
                              onClick={() => {
                                // Find matching therapist or default
                                const matchingTherapist = mockTherapists.find(t => t.id === item.therapistId) || mockTherapists[0];
                                setSelectedTherapist(matchingTherapist);
                                setCurrentScreen('detail');
                              }}
                              className="hover:underline flex items-center gap-1"
                            >
                              Pesan Lagi <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 13. NOTIFICATIONS FEED SCREEN */}
                {currentScreen === 'notifications' && (
                  <motion.div
                    key="notifications"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-5 space-y-5"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <button onClick={() => setCurrentScreen('dashboard')} className="text-slate-600">
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <h3 className="font-display font-bold text-base text-slate-900">Notifikasi</h3>
                      </div>

                      {/* Action mark read state */}
                      <button 
                        onClick={() => {
                          setNotifications(notifications.map(n => ({ ...n, read: true })));
                          alert("Semua notifikasi ter-tanda terbaca.");
                        }}
                        className="text-xs text-purple-700 font-bold hover:underline"
                      >
                        Tandai Terbaca
                      </button>
                    </div>

                    <div className="space-y-3">
                      {notifications.map((notif) => (
                        <div 
                          key={notif.id}
                          className={`p-4 rounded-3xl border flex items-start gap-3.5 transition-all ${
                            notif.read ? 'bg-white border-slate-100 opacity-70' : 'bg-purple-100/10 border-purple-100 shadow-sm shadow-purple-500/5'
                          }`}
                        >
                          <span className="text-lg shrink-0 mt-0.5">
                            {notif.type === 'booking' ? '📅' : notif.type === 'recovery' ? '📈' : '📢'}
                          </span>
                          <div className="flex-1 space-y-1 text-xs">
                            <div className="flex justify-between font-bold">
                              <h5 className="text-slate-800 leading-snug">{notif.title}</h5>
                              <span className="text-[9px] font-semibold text-slate-400 capitalize">{notif.time}</span>
                            </div>
                            <p className="text-slate-500 leading-relaxed font-sans">{notif.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 14. USER PROFILE SCREEN */}
                {currentScreen === 'profile' && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-5 space-y-6"
                  >
                    {/* User Identity detailed overview */}
                    <div className="flex flex-col items-center justify-center text-center space-y-3.5 pt-4">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-purple-500 to-indigo-600 shadow-xl">
                          <img 
                            src={mockUserProfile.avatar} 
                            alt="Alex Thompson" 
                            className="w-full h-full object-cover rounded-full border-2 border-white"
                          />
                        </div>
                        <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#6b21cf] text-white flex items-center justify-center shadow-lg active:scale-90 transition-transform">
                          ✍️
                        </button>
                      </div>

                      <div className="space-y-0.5">
                        <h3 className="font-display font-extrabold text-xl text-slate-900">{mockUserProfile.name}</h3>
                        <p className="text-[11px] text-slate-400 font-semibold font-sans">{mockUserProfile.email}</p>
                        <p className="text-xs text-orange-600 font-bold uppercase tracking-wider pt-2.5 block">{mockUserProfile.condition}</p>
                      </div>

                      <div className="bg-slate-100 text-slate-600 text-[10px] font-bold px-4 py-1 rounded-full tracking-wider uppercase">
                        MEMBER PLATINUM ACTIVE
                      </div>
                    </div>

                    {/* Progress summaries stats grids */}
                    <div className="grid grid-cols-2 gap-3.5">
                      <div className="bg-white border border-slate-100 p-4 rounded-3xl text-center space-y-1 shadow-sm">
                        <span className="text-lg block">📋</span>
                        <span className="text-[11px] font-bold text-slate-700 block">Sakit Knee ACL</span>
                        <span className="text-[9px] text-slate-400 font-semibold block uppercase tracking-wider font-sans">Kondisi Aktif</span>
                      </div>
                      <div className="bg-white border border-slate-100 p-4 rounded-3xl text-center space-y-1 shadow-sm">
                        <span className="text-lg block">🏃</span>
                        <span className="text-[11px] font-bold text-slate-700 block">Total 12 Sesi</span>
                        <span className="text-[9px] text-slate-400 font-semibold block uppercase tracking-wider font-sans">Rehabilitasi Selesai</span>
                      </div>
                    </div>

                    {/* Action navigation setting panels links list */}
                    <div className="bg-white border border-slate-100 rounded-[28px] overflow-hidden shadow-sm">
                      {[
                        { icon: '📁', label: 'Riwayat Rekam Medis Dokumen', desc: 'Akses surat rujukan dokter & MRI scan' },
                        { icon: '💳', label: 'Metode Pembayaran Tersimpan', desc: 'Kelola verifikasi kartu kredit harian' },
                        { icon: '🔒', label: 'Keamanan Standard Keamanan', desc: 'Privasi enkripsi medis berstandar HIPAA' },
                        { icon: '⚙️', label: 'Pengaturan Kunjungan Rumah', desc: 'Set koordinat wilayah Green Pramuka' },
                        { icon: '❔', label: 'Pusat Bantuan & Live Chat', desc: 'Dukungan staf darurat medis harian' },
                      ].map((set, idx) => (
                        <div 
                          key={idx}
                          onClick={() => alert(`Mengakses Fitur Pengaturan: "${set.label}" (Simulasi)...`)}
                          className="flex justify-between items-center p-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-b-0 cursor-pointer"
                        >
                          <div className="flex items-center gap-3.5">
                            <span className="text-lg shrink-0">{set.icon}</span>
                            <div>
                              <span className="text-xs font-bold text-slate-800 block leading-tight">{set.label}</span>
                              <span className="text-[10px] text-slate-400 font-semibold leading-normal font-sans block mt-0.5">{set.desc}</span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-300" />
                        </div>
                      ))}
                    </div>

                    {/* Logout simulation back routings */}
                    <button 
                      onClick={() => {
                        const leave = confirm("Apakah Anda yakin ingin keluar dari Profil Alex Thompson?");
                        if (leave) {
                          setCurrentScreen('login');
                        }
                      }}
                      className="w-full h-13 bg-slate-100 text-red-600 font-bold hover:bg-red-50 hover:text-red-700 transition-colors rounded-2xl text-xs flex items-center justify-center gap-1.5 duration-100 shadow-sm"
                    >
                      <LogOut className="w-4 h-4" /> Keluar Akun
                    </button>
                    
                    {/* Small system specs metrics to prevent empty blanks */}
                    <div className="text-center space-y-1 py-2 text-[10px] text-slate-400 select-none font-sans uppercase">
                      <p>Fisiohome Clinician App v2.4 (Build 102)</p>
                      <p>© 2026 Fisiohome Health-Tech Inc.</p>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

            </div>

            {/* Sticky iOS Home Bottom Navigation Bar (Visible only when compiled/logged in) */}
            {['dashboard', 'discovery', 'history', 'profile', 'progress', 'booking', 'payment', 'notifications'].includes(currentScreen) && (
              <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-xl border-t border-slate-200/40 px-3 pt-2.5 pb-6 flex justify-around items-center z-25">
                
                {/* 1. Beranda */}
                <button 
                  onClick={() => handleNavToTab('home')}
                  className={`flex flex-col items-center justify-center transition-all ${
                    activeTab === 'home' && currentScreen === 'dashboard' ? 'text-[#6b21cf] font-bold' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Home className="w-5 h-5" />
                  <span className="text-[9px] font-extrabold uppercase mt-1 tracking-wider">Beranda</span>
                </button>

                {/* 2. Cari / Discovery */}
                <button 
                  onClick={() => handleNavToTab('discovery')}
                  className={`flex flex-col items-center justify-center transition-all ${
                    activeTab === 'discovery' && currentScreen === 'discovery' ? 'text-[#6b21cf] font-bold' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Compass className="w-5 h-5" />
                  <span className="text-[9px] font-extrabold uppercase mt-1 tracking-wider">Cari</span>
                </button>

                {/* 3. Aktivitas / History */}
                <button 
                  onClick={() => handleNavToTab('history')}
                  className={`flex flex-col items-center justify-center transition-all ${
                    activeTab === 'history' && currentScreen === 'history' ? 'text-[#6b21cf] font-bold' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  <span className="text-[9px] font-extrabold uppercase mt-1 tracking-wider">Aktivitas</span>
                </button>

                {/* 4. Profil / Settings */}
                <button 
                  onClick={() => handleNavToTab('profile')}
                  className={`flex flex-col items-center justify-center transition-all ${
                    activeTab === 'profile' && currentScreen === 'profile' ? 'text-[#6b21cf] font-bold' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span className="text-[9px] font-extrabold uppercase mt-1 tracking-wider">Profil</span>
                </button>

              </div>
            )}

      </div>

    </div>
  );
}
