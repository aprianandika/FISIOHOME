/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface SpecProps {
  activeScreen: string;
}

export const ScreenSpecUI: React.FC<SpecProps> = ({ activeScreen }) => {
  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-100 font-sans">
      {/* Design System Highlight Header */}
      <div className="bg-gradient-to-br from-violet-500 to-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-500/10">
        <span className="text-[11px] font-bold tracking-widest uppercase bg-white/20 px-3 py-1 rounded-full text-violet-100">
          HEALTH-TECH BRAND DIRECTION
        </span>
        <h2 className="font-display font-bold text-2xl lg:text-3xl mt-3 tracking-tight">Fisiohome Design System</h2>
        <p className="text-sm text-indigo-100 mt-2 leading-relaxed">
          Inspired by Apple iOS human-interface style guidelines: combining clinical rigor with warm, stress-reducing homecare ergonomics.
        </p>

        {/* Color Palette Display */}
        <div className="grid grid-cols-4 gap-2 mt-6">
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl text-center border border-white/10">
            <div className="w-full h-8 rounded-lg bg-[#6b21cf] mx-auto border border-white/20"></div>
            <span className="text-[10px] font-mono mt-1 block">#6B21CF</span>
            <span className="text-[9px] text-indigo-200 uppercase block font-semibold">Primary</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl text-center border border-white/10">
            <div className="w-full h-8 rounded-lg bg-[#ef7d31] mx-auto border border-white/20"></div>
            <span className="text-[10px] font-mono mt-1 block">#EF7D31</span>
            <span className="text-[9px] text-indigo-200 uppercase block font-semibold">Accent</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl text-center border border-white/10">
            <div className="w-full h-8 rounded-lg bg-[#fcfaff] mx-auto border border-white/20"></div>
            <span className="text-[10px] font-mono mt-1 block text-slate-900">#FCFAFF</span>
            <span className="text-[9px] text-indigo-200 uppercase block font-semibold text-slate-100">Base</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl text-center border border-white/10">
            <div className="w-full h-8 rounded-lg bg-[#ffffff] mx-auto border border-white/20 shadow-inner"></div>
            <span className="text-[10px] font-mono mt-1 block text-slate-900">#FFFFFF</span>
            <span className="text-[9px] text-indigo-200 uppercase block font-semibold text-slate-100">Surface</span>
          </div>
        </div>
      </div>

      {/* Dynamic Spec Details based on active screen */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <span className="h-6 w-1.5 bg-violet-600 rounded-full"></span>
          <h3 className="font-display font-semibold text-xl tracking-tight text-slate-900 dark:text-white uppercase text-sm font-bold tracking-wider">
            Active Screen UX Strategy: {activeScreen.replace('-', ' ')}
          </h3>
        </div>

        {activeScreen === 'splash' && (
          <div className="space-y-4 animate-fade-in text-sm">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">🚀 Screen Purpose</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Establish primary brand essence, load background synchronization states, and welcome users with a calming, trustworthy corporate presence.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">🧘 UX Explanation</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Uses a clean, clutter-free centered visual layout to prevent cognitive overload. Staged entrance animation makes the interface feel highly polished and responsive from the initial second.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">📱 Layout Hierarchy</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Minimalist absolute center alignment. Brand mark is placed on Level 3 depth using a soft drop shadow, supported by humble semantic version parameters in the extreme margins.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">⚡ Call To Action (CTA) Placing</h4>
              <p className="text-slate-600 dark:text-slate-300">
                No split decisions of choice: a single premium automatic transition sequence, backed by a tactile fallback "Mulai Pemulihan" button to bypass introduction latency instantly.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">✏️ Microcopy Recommendation</h4>
              <p className="text-slate-600 dark:text-slate-300 italic font-mono text-xs bg-slate-50 dark:bg-slate-900 p-2 rounded border border-slate-100 dark:border-slate-800 block text-violet-600 dark:text-violet-400">
                "Fisiohome: Rehabilitasi Premium Mandiri di Rumah"
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">🎨 Premium UI Suggestion</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Apply a slow moving radial gradient sweep in the canvas background to simulate ambient natural morning light.
              </p>
            </div>
          </div>
        )}

        {activeScreen === 'onboarding' && (
          <div className="space-y-4 animate-fade-in text-sm">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">🚀 Screen Purpose</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Anesthetize user anxiety, demonstrate medical-grade security, and highlight three core service values in structured paginated steps.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">🧘 UX Explanation</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Ensures elderly and post-op users feel safe via large legible typography, simple navigation gestures (swipes, primary clicks), and transparent clinical benefits.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">📱 Layout Hierarchy</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Fluid top-anchored illustration card, paired with centered header texts, segmented status pips, and a prominent bottom fixed action bar for thumb ergonomics.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">⚡ Call To Action (CTA) Placing</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Prominent custom violet button ("Lanjutkan") and a subtle top-right bypass action ("Lewati") for returning power users who wish to login instantly.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">✏️ Microcopy Recommendation</h4>
              <p className="text-slate-600 dark:text-slate-300 italic font-mono text-xs bg-slate-50 dark:bg-slate-900 p-2 rounded border border-slate-100 dark:border-slate-800 block text-violet-600 dark:text-violet-400">
                "Sembuh Sempurna dari Rumah. Terapi terfokus, dipantau secara klinis oleh dokter dan fisioterapis ahli berlisensi."
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">🎨 Premium UI Suggestion</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Use elegant high-key clinical photographs of living spaces over styled vector shapes to maximize clinical trust and realism for medical investors.
              </p>
            </div>
          </div>
        )}

        {activeScreen === 'login' && (
          <div className="space-y-4 animate-fade-in text-sm">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">🚀 Screen Purpose</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Provide secure, friction-free authentication using modern biometric hooks or passwordless telephone verification.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">🧘 UX Explanation</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Minimizes form fatigue. Rather than requesting long credentials up front, we only prompt for a phone number or single-tap third-party credentials.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">📱 Layout Hierarchy</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Clinical welcoming banner, followed by a focused center field input group, a dominant single-action primary button, and bottom social authentication pills.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">⚡ Call To Action (CTA) Placing</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Primary center action "Lanjutkan" with trailing arrow icon, supported by visual secure lock vectors.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">✏️ Microcopy Recommendation</h4>
              <p className="text-slate-600 dark:text-slate-300 italic font-mono text-xs bg-slate-50 dark:bg-slate-900 p-2 rounded border border-slate-100 dark:border-slate-800 block text-violet-600 dark:text-violet-400">
                "Masuk Aman dengan Nomor HP. Kami akan mengirimkan kode verifikasi OTP langsung ke ponsel Anda."
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">🎨 Premium UI Suggestion</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Floating label interactions that restyle and shrink upon numeric input focus to mirror Apple's native iOS settings panel inputs.
              </p>
            </div>
          </div>
        )}

        {activeScreen === 'dashboard' && (
          <div className="space-y-4 animate-fade-in text-sm">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">🚀 Screen Purpose</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Act as the patient's centralized command center: highlighting current state metrics, upcoming schedules, and immediate booking entry gateways.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">🧘 UX Explanation</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Implements a bento-grid layout for recovery progress. By highlighting recovery status at 75%, it provides positive psychological reinforcement to stick to the medical regimen.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">📱 Layout Hierarchy</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Contextual Top Bar (Profile, Brand, Alerts) → Clear Greeting & Prompt → Sticky Search → Large Recovery Progress Card → Upcoming Session (high priority alert card) → Horizontal scrollable nearby therapists.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">⚡ Call To Action (CTA) Placing</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Split action buttons: "Pesan Kunjungan" (primary royal violet) and "Konsultasi Online" (secondary peach background) to quickly route the user based on immediate necessity.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">✏️ Microcopy Recommendation</h4>
              <p className="text-slate-600 dark:text-slate-300 italic font-mono text-xs bg-slate-50 dark:bg-slate-900 p-2 rounded border border-slate-100 dark:border-slate-800 block text-violet-600 dark:text-violet-400">
                "Halo, Alex. Siap untuk pemulihan hari ini?"
              </p>
            </div>
          </div>
        )}

        {activeScreen === 'discovery' && (
          <div className="space-y-4 animate-fade-in text-sm">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">🚀 Screen Purpose</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Help the user find and explore a matching, verified clinical specialist based on targeted symptoms, budget, location, and rating.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">🧘 UX Explanation</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Search text and horizontal filter chips work in tandem to return results instantly without reloading the page, which prevents drop-offs.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">📱 Layout Hierarchy</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Sticky top header containing keyword search input → Row of category filters with tactile feedback on click → Vertical scrolling clinician cards with prominent ratings.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">⚡ Call To Action (CTA) Placing</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Each card represents an active hit target. Tapping anyway on the card navigates seamlessly to the detailed therapist dossier profile.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">✏️ Microcopy Recommendation</h4>
              <p className="text-slate-600 dark:text-slate-300 italic font-mono text-xs bg-slate-50 dark:bg-slate-900 p-2 rounded border border-slate-100 dark:border-slate-800 block text-violet-600 dark:text-violet-400">
                "Menampilkan 4 Terapis Bersertifikasi yang dekat dengan wilayah Green Pramuka."
              </p>
            </div>
          </div>
        )}

        {activeScreen === 'detail' && (
          <div className="space-y-4 animate-fade-in text-sm">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">🚀 Screen Purpose</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Establish clinical credibility, show detailed medical certifications, list available schedules, and host reviews from other verified patients.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">🧘 UX Explanation</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Prominently displays key decision trust factors at the top: Experience years, verified badge, and rating score. This reduces conversion friction.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">📱 Layout Hierarchy</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Image of clinician → Overlaid profile metadata card (rating, cost, experience) → Bio statement → Horizontal available dates → Clickable time slots → Review list.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">⚡ Call To Action (CTA) Placing</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Locked sticky bottom menu showcasing the clear per-session price and a prominent full-width CTA: "Pesan Kunjungan Rumah" to proceed to checkout.
              </p>
            </div>
          </div>
        )}

        {activeScreen === 'consultation' && (
          <div className="space-y-4 animate-fade-in text-sm">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">🚀 Screen Purpose</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Facilitate remote digital-first consultations with real-time video streaming, clinical guidance checklists, and seamless chat triggers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">🧘 UX Explanation</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Provides a comforting clinical virtual space with clear volume, mute, and video controls. Shows therapist notes directly on screener overlays for visual clinical exercises.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">🎮 Interaction Idea</h4>
              <p className="text-slate-600 dark:text-slate-300">
                The therapist portrait rotates or zooms to highlight precise muscular movements during instructions, rendering a high-end rehabilitation tutorial.
              </p>
            </div>
          </div>
        )}

        {activeScreen === 'booking' && (
          <div className="space-y-4 animate-fade-in text-sm">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">🚀 Screen Purpose</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Collect target session details, patient contact info, and address coordinates with minimal input efforts to boost conversion rates.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">🧘 UX Explanation</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Address input automatically links with location pins to prevent typos. Remembers preceding session information so repeat bookings take less than 10 seconds.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">📱 Layout Hierarchy</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Progress marker → Patient Identity details → Symptoms/Notes descriptive text area → Structured cost breakdown (services fee + doctor rate) & conversion actions.
              </p>
            </div>
          </div>
        )}

        {activeScreen === 'payment' && (
          <div className="space-y-4 animate-fade-in text-sm">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">🚀 Screen Purpose</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Handle transaction checkouts securely while offering local digital wallets and mobile banks.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">🧘 UX Explanation</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Displaying security icons (SSL secure, certified logo) prevents cart abandonment and builds deep clinical user trust among non-technical elderly individuals.
              </p>
            </div>
          </div>
        )}

        {activeScreen === 'tracking' && (
          <div className="space-y-4 animate-fade-in text-sm">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">🚀 Screen Purpose</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Remove appointment arrival friction by showing the physical, real-time location tracker map of the inbound medical provider.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">🧘 UX Explanation</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Showing the doctor's portrait, direct chat icon, and estimated minutes to arrive (ETA) provides immediate psychological comfort to patients who are in pain waiting for rehabilitation.
              </p>
            </div>
          </div>
        )}

        {activeScreen === 'progress' && (
          <div className="space-y-4 animate-fade-in text-sm">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">🚀 Screen Purpose</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Show detailed medical recovery data, post-operative milestone status, joint angles checklists, and therapist clinical notes.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">🧘 UX Explanation</h4>
              <p className="text-slate-600 dark:text-slate-300">
                By gamifying milestones (e.g. "Week 6: Full weight bearing achieved"), patients feel empowered, improving engagement and subscription retention rates.
              </p>
            </div>
          </div>
        )}

        {activeScreen === 'history' && (
          <div className="space-y-4 animate-fade-in text-sm">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">🚀 Screen Purpose</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Chronicle completed sessions, invoice slips, past care programs, and direct single-click rebooking buttons.
              </p>
            </div>
          </div>
        )}

        {activeScreen === 'notifications' && (
          <div className="space-y-4 animate-fade-in text-sm">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">🚀 Screen Purpose</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Keep the user notified about physician confirmations, newly logged therapeutic exercises, and recovery milestones.
              </p>
            </div>
          </div>
        )}

        {activeScreen === 'profile' && (
          <div className="space-y-4 animate-fade-in text-sm">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">🚀 Screen Purpose</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Manage contact parameters, read health files, consult billing details, review packages, and configure app settings.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modern Health-tech Trends checklist */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-3">
        <h3 className="font-display font-semibold text-slate-900 dark:text-white text-sm uppercase tracking-wider flex items-center gap-2">
          💡 Suitable Health-Tech Innovation Stack
        </h3>
        <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-green-500 font-bold">✔️</span>
            <span><strong>Remote Patient Monitoring (RPM):</strong> Synchronizing IoT health tracker wearables directly to plot daily pain indices dynamically.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 font-bold">✔️</span>
            <span><strong>Computer Vision Motion Analysis:</strong> Utilizing camera frames on mobile devices to evaluate bone angles live during recovery workouts.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 font-bold">✔️</span>
            <span><strong>HIPAA-Compliant Smart Consultation:</strong> Live streaming end-to-end telemetry combined with automatic clinical report drafts.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
