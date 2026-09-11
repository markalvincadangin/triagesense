import React, { useState, useEffect } from 'react';
import { ShieldCheck, Volume2, VolumeX, AlertCircle, Globe } from 'lucide-react';
import { useTriage } from '../../context/TriageContext';
import wvsumcLogo from '../../assets/wvsumc-logo.png';

export function KioskHeader({ onLogoClick }) {
  const { kioskLanguage, setKioskLanguage, triggerEmergencyModal } = useTriage();
  const [currentTime, setCurrentTime] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' PST'
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleReadAloud = () => {
    if (isSpeaking) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);

    if ('speechSynthesis' in window) {
      const phrases = {
        hil: 'Maayong adlaw sa WVSU Medical Center Emergency Room. Sunda ang mga tikang sa screen agud mabuligan ka gilayon sang nurse.',
        en: 'Welcome to WVSU Medical Center Emergency Check-In. Please follow the steps on screen so the nurse can assist you.',
        fil: 'Maligayang pagdating sa WVSU Medical Center Emergency Room. Sundin ang mga hakbang sa screen upang matulungan ka agad ng nurse.',
        ceb: 'Maayong pag-abot sa WVSU Medical Center Emergency Room. Sunda ang mga lakang sa screen aron matabangan ka dayon sa nurse.'
      };
      const textToSpeak = phrases[kioskLanguage] || phrases.en;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsSpeaking(false), 3000);
    }
  };

  const LANGUAGES = [
    { code: 'hil', label: 'Hiligaynon' },
    { code: 'en', label: 'English' },
    { code: 'fil', label: 'Filipino' },
    { code: 'ceb', label: 'Cebuano' }
  ];

  return (
    <header className="w-full h-24 bg-surface border-b border-border-main flex items-center justify-between px-10 shrink-0 select-none">
      {/* Brand Cluster */}
      <div
        onClick={onLogoClick}
        className={`flex items-center gap-4 ${onLogoClick ? 'cursor-pointer hover:opacity-95' : 'cursor-default'}`}
      >
        {/* Official WVSUMC Emblem Seal */}
        <img
          src={wvsumcLogo}
          alt="WVSU Medical Center Official Seal"
          className="w-14 h-14 object-contain drop-shadow-sm shrink-0"
        />

        <div>
          <div className="text-[15px] font-bold text-brand-green tracking-wide leading-tight">
            WEST VISAYAS STATE UNIVERSITY
          </div>
          <div className="text-[13px] font-semibold text-text-secondary tracking-wider mt-0.5">
            MEDICAL CENTER • EMERGENCY ROOM CHECK-IN
          </div>
        </div>
      </div>

      {/* Multimodal Accessibility & System Status Controls */}
      <div className="flex items-center gap-4">
        {/* Dialect Quick Toggle */}
        <div className="flex items-center bg-slate-100 rounded-full p-1 border border-slate-200 shadow-inner">
          <div className="px-2 text-slate-400">
            <Globe size={15} />
          </div>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setKioskLanguage(lang.code)}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                kioskLanguage === lang.code
                  ? 'bg-brand-green text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        {/* Read-Aloud Audio Guidance Button */}
        <button
          onClick={handleReadAloud}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
            isSpeaking
              ? 'bg-amber-100 text-amber-900 border-amber-300 ring-2 ring-amber-400/40 animate-pulse'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
          title="Read screen instructions aloud"
        >
          {isSpeaking ? <VolumeX size={16} className="text-amber-600" /> : <Volume2 size={16} className="text-brand-green" />}
          <span>{isSpeaking ? 'Speaking...' : 'Read Aloud'}</span>
        </button>

        {/* Emergency Immediate Nurse Assistance Call Button */}
        <button
          onClick={triggerEmergencyModal}
          className="flex items-center gap-2 px-4 py-1.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white rounded-full text-xs font-black tracking-wide shadow-md transition-all"
        >
          <AlertCircle size={16} strokeWidth={2.6} />
          <span>HELP / TABANG</span>
        </button>

        {/* Live System Time */}
        <div className="text-xs font-semibold text-text-secondary tabular-nums pl-2 border-l border-slate-200">
          {currentTime || '17:40:00 PST'}
        </div>
      </div>
    </header>
  );
}
