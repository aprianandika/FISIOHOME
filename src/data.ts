/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Therapist, Booking, NotificationItem, RecoveryStage, UserProfile } from './types';

export const mockUserProfile: UserProfile = {
  name: 'Alex Thompson',
  email: 'alex.thompson@clinical.io',
  phone: '08123456789',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSnUImuyUKmnshw7IIXgV9bc5oTU-Vn50kDkoBUxeneBAEPgzyRotsiuhFHtfgLbjMguywwE5uTnvHUDqmPEZUhzjb3ljOu0ntASsY9HVqkjYx3c0_ve0vfGK3E19aueAQQhDlQUJecVFshxl3AN_MchuaSNsDyC9KVzH-E1-1eyV11Nvte_fgt7uC3BQgzRyQT5sQdUNdXmepW4Dt1tXcdbGv5bTBvRJu3H5Q2GF2cmVsf2VbMy-DNVsA4u9cKowdiTiAmd_xfzE',
  condition: 'Pasca-Rekonstruksi ACL (Kedua Lutut)',
  recoveryPercentage: 75,
  completedSessions: 12,
  totalSessions: 16
};

export const mockTherapists: Therapist[] = [
  {
    id: 'therapist-1',
    name: 'Dr. Marcus Thorne',
    title: 'Spesialis Rehabilitasi Pasca Operasi',
    rating: 4.9,
    reviewsCount: 142,
    experience: '10 Tahun',
    bio: 'Fisioterapis senior dengan keahlian dalam rehabilitasi ortopedi pasca operasi, cedera muskuloskeletal, dan restorasi mobilitas tubuh. Berpengalaman menangani atlet profesional nasional.',
    certified: true,
    homeVisit: true,
    duration: 60,
    sessionPrice: 150000,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    specialties: ['Pasca Operasi', 'Ortopedi', 'Cedera Lutut'],
    availableDays: [
      { day: 'Sen', dateNum: 23, fullDate: 'Senin, 23 Okt 2023' },
      { day: 'Sel', dateNum: 24, fullDate: 'Selasa, 24 Okt 2023' },
      { day: 'Rab', dateNum: 25, fullDate: 'Rabu, 25 Okt 2023' },
      { day: 'Kam', dateNum: 26, fullDate: 'Kamis, 26 Okt 2023' },
      { day: 'Jum', dateNum: 27, fullDate: 'Jumat, 27 Okt 2023' }
    ],
    timeSlots: ['09:00 AM', '10:30 AM', '01:00 PM', '03:30 PM', '04:45 PM'],
    reviews: [
      {
        id: 'rev-1',
        reviewerName: 'Sarah Jenkins',
        reviewerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
        rating: 5,
        comment: 'Dr. Marcus sangat luar biasa. Mobilitas lutut saya meningkat 40% hanya setelah tiga sesi kunjungan rumah. Sangat sopan dan membawa peralatan lengkap.',
        date: '24 Nov 2023'
      },
      {
        id: 'rev-2',
        reviewerName: 'Budi Santoso',
        reviewerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
        rating: 4.8,
        comment: 'Penjelasan biomekanika lututnya sangat jelas. Rehabilitasi saya dipandu perlahan tapi konsisten.',
        date: '12 Nov 2023'
      }
    ]
  },
  {
    id: 'therapist-2',
    name: 'Dr. Sarah Mitchell',
    title: 'Spesialis Terapi Manual & Cedera Olahraga',
    rating: 4.9,
    reviewsCount: 98,
    experience: '8 Tahun',
    bio: 'Spesialis cedera sendi lutut, bahu, dan pergelangan kaki. Dr. Mitchell menggunakan modalitas fisioterapi modern dikombinasikan dengan teknik pijat klinis berstandar tinggi.',
    certified: true,
    homeVisit: true,
    duration: 60,
    sessionPrice: 135000,
    avatar: 'https://images.unsplash.com/photo-1594824813573-246434e33963?auto=format&fit=crop&q=80&w=600',
    specialties: ['Cedera Olahraga', 'Terapi Manual', 'Manajemen Nyeri'],
    availableDays: [
      { day: 'Sen', dateNum: 23, fullDate: 'Senin, 23 Okt 2023' },
      { day: 'Sel', dateNum: 24, fullDate: 'Selasa, 24 Okt 2023' },
      { day: 'Rab', dateNum: 25, fullDate: 'Rabu, 25 Okt 2023' },
      { day: 'Kam', dateNum: 26, fullDate: 'Kamis, 26 Okt 2023' }
    ],
    timeSlots: ['08:00 AM', '10:00 AM', '01:30 PM', '03:00 PM'],
    reviews: [
      {
        id: 'rev-3',
        reviewerName: 'Alex Nugraha',
        reviewerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
        rating: 5,
        comment: 'Penyembuhan nyeri punggung bawah saya berkembang pesat. Sangat direkomendasikan untuk pekerja kantoran!',
        date: '02 Des 2023'
      }
    ]
  },
  {
    id: 'therapist-3',
    name: 'Dr. James Wilson',
    title: 'Spesialis Fisioterapi Neurologi & Stroke',
    rating: 4.8,
    reviewsCount: 176,
    experience: '12 Tahun',
    bio: 'Ahli dalam mengembalikan kemampuan motorik pasien pasca-stroke, penyakit Parkinson, dan trauma sistem saraf. Sangat ramah dan sabar membimbing lansia.',
    certified: true,
    homeVisit: true,
    duration: 75,
    sessionPrice: 170000,
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600',
    specialties: ['Stroke', 'Lansia', 'Restorasi Motorik'],
    availableDays: [
      { day: 'Sen', dateNum: 23, fullDate: 'Senin, 23 Okt 2023' },
      { day: 'Rab', dateNum: 25, fullDate: 'Rabu, 25 Okt 2023' },
      { day: 'Jum', dateNum: 27, fullDate: 'Jumat, 27 Okt 2023' }
    ],
    timeSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'],
    reviews: []
  },
  {
    id: 'therapist-4',
    name: 'Dr. Elena Rodriguez',
    title: 'Spesialis Terapi Fizikal Geriatrik & Osteoartritis',
    rating: 4.8,
    reviewsCount: 110,
    experience: '9 Tahun',
    bio: 'Pakar penanganan nyeri persendian lansia, pengapuran sendi lutut (Osteoarthritis), dan pemulihan keseimbangan tubuh guna mencegah risiko terjatuh di rumah.',
    certified: true,
    homeVisit: true,
    duration: 60,
    sessionPrice: 140000,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
    specialties: ['Geriatrik', 'Lansia', 'Nyeri Sendi'],
    availableDays: [
      { day: 'Sel', dateNum: 24, fullDate: 'Selasa, 24 Okt 2023' },
      { day: 'Kam', dateNum: 26, fullDate: 'Kamis, 26 Okt 2023' },
      { day: 'Jum', dateNum: 27, fullDate: 'Jumat, 27 Okt 2023' }
    ],
    timeSlots: ['10:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'],
    reviews: []
  }
];

export const mockBookings: Booking[] = [
  {
    id: 'book-1',
    therapistId: 'therapist-2',
    therapistName: 'Dr. Sarah Mitchell',
    therapistAvatar: 'https://images.unsplash.com/photo-1594824813573-246434e33963?auto=format&fit=crop&q=80&w=150',
    date: 'Hari ini',
    timeSlot: '14:30',
    type: 'visit',
    status: 'upcoming',
    address: 'Apartemen Green Pramuka Tower Bougenville No. 12B, Jakarta Pusat',
    patientName: 'Alex Thompson',
    patientPhone: '+628123456789',
    notes: 'Mohon membawa TENS unit dan thera-band karena rehabilitasi fokus di penguatan otot paha depan (quadriceps).',
    price: 135000,
    paymentMethod: 'Dana Virtual Account'
  },
  {
    id: 'book-2',
    therapistId: 'therapist-1',
    therapistName: 'Dr. Marcus Thorne',
    therapistAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150',
    date: 'Kemarin, 4 Jun 2026',
    timeSlot: '10:00 AM',
    type: 'visit',
    status: 'completed',
    address: 'Apartemen Green Pramuka Tower Bougenville No. 12B, Jakarta Pusat',
    patientName: 'Alex Thompson',
    patientPhone: '+628123456789',
    price: 150000,
    paymentMethod: 'LinkAja Wallet'
  },
  {
    id: 'book-3',
    therapistId: 'therapist-1',
    therapistName: 'Dr. Marcus Thorne',
    therapistAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150',
    date: '28 Mei 2026',
    timeSlot: '01:00 PM',
    type: 'consultation',
    status: 'completed',
    patientName: 'Alex Thompson',
    patientPhone: '+628123456789',
    price: 80000,
    paymentMethod: 'Gopay'
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Kunjungan Terkonfirmasi',
    message: 'Dr. Sarah Mitchell mengonfirmasi kunjungan rumah harian untuk hari ini pukul 14:30.',
    time: '30 mnt lalu',
    read: false,
    type: 'booking'
  },
  {
    id: 'notif-2',
    title: 'Progress Recovery Baru!',
    message: 'Evaluasi mingguan Anda menunjukkan peningkatan 5% rotasi sendi pasca rekonstruksi ACL.',
    time: '2 jam lalu',
    read: false,
    type: 'recovery'
  },
  {
    id: 'notif-3',
    title: 'Promo Paket Platinum',
    message: 'Hemat s.d 20% dengan paket langganan rehab 10 sesi lengkap dengan terapis tetap.',
    time: '1 hari lalu',
    read: true,
    type: 'system'
  }
];

export const mockRecoveryStages: RecoveryStage[] = [
  {
    week: 2,
    title: 'Ekstensi Penuh Lutut',
    status: 'past',
    description: 'Fokus meluruskan lutut hingga 0 derajat berbaring. Mengurangi bengkak sendi awal post-op.',
    percentage: 100
  },
  {
    week: 6,
    title: 'Latihan Beban Tubuh Lengkap',
    status: 'active',
    description: 'Menumpu berat badan penuh secara mandiri tanpa kruk. Latihan keseimbangan neuromuscular statis.',
    percentage: 75
  },
  {
    week: 10,
    title: 'Latihan Agilitas Berpola',
    status: 'future',
    description: 'Transisi gerakan lateral ringan, squat koordinatif, dan jogging ritmis diatas permukaan rata.',
    percentage: 0
  },
  {
    week: 24,
    title: 'Kembali Berolahraga (Return to Sports)',
    status: 'future',
    description: 'Menyelesaikan tes fungsional olahraga secara holistik (hop test >90% perbandingan kaki sehat).',
    percentage: 0
  }
];
