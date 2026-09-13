import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, AlertCircle, Globe } from 'lucide-react';
import { useTriage } from '../../context/TriageContext';
import wvsumcLogo from '../../assets/wvsumc-logo.png';

export function KioskHeader({ onLogoClick }) {
  const { kioskStep, kioskLanguage, setKioskLanguage, triggerEmergencyModal, t } = useTriage();
  const [currentTime, setCurrentTime] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Stop active speech synthesis when navigating to another step or switching language
  useEffect(() => {
    if (isSpeaking && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [kioskStep, kioskLanguage]);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleReadAloud = () => {
    if (isSpeaking) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = t(`readAloudGuidance.${kioskStep}`) || t('header.readAloudPrompt');

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.92;
      utterance.pitch = 1.0;
      utterance.lang = kioskLanguage === 'en' ? 'en-US' : 'fil-PH';

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    } else {
      setIsSpeaking(true);
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
    <header className="w-full h-24 bg-surface border-b border-border-main flex items-center justify-between px-6 shrink-0 select-none">
      {/* Brand Cluster */}
      <div
        onClick={onLogoClick}
        className={`flex items-center gap-3 shrink-0 ${onLogoClick ? 'cursor-pointer hover:opacity-95' : 'cursor-default'}`}
      >
        {/* Official WVSUMC Emblem Seal */}
        <img
          src={wvsumcLogo}
          alt="WVSU Medical Center Official Seal"
          className="w-14 h-14 object-contain drop-shadow-sm shrink-0"
        />

        <div className="flex flex-col justify-center shrink-0">
          <div className="text-lg font-black text-brand-green tracking-wide leading-tight whitespace-nowrap">
            {t('header.title')}
          </div>
          <div className="text-xs font-semibold text-text-secondary tracking-wider mt-0.5 whitespace-nowrap">
            {t('header.subtitle')}
          </div>
        </div>
      </div>

      {/* Multimodal Accessibility & System Status Controls */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Dialect Quick Toggle */}
        <div className="flex items-center bg-slate-100 rounded-full p-1 border border-slate-200/90 shadow-inner shrink-0">
          <div className="pl-2.5 pr-1 text-slate-400">
            <Globe size={16} />
          </div>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setKioskLanguage(lang.code)}
              className={`h-11 min-h-[44px] px-3 text-xs font-bold rounded-full transition-all flex items-center justify-center cursor-pointer ${
                kioskLanguage === lang.code
                  ? 'bg-brand-green text-white shadow-xs'
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
          className={`flex items-center gap-1.5 h-11 min-h-[44px] px-3.5 rounded-full text-xs font-bold transition-all border shrink-0 cursor-pointer ${
            isSpeaking
              ? 'bg-amber-100 text-amber-900 border-amber-300 ring-2 ring-amber-400/40 animate-pulse'
              : 'bg-surface text-text-primary border-border-main hover:bg-canvas'
          }`}
          title={t('header.readAloudPrompt')}
        >
          {isSpeaking ? <VolumeX size={16} className="text-amber-600" /> : <Volume2 size={16} className="text-brand-green" />}
          <span>{isSpeaking ? t('common.speaking') : t('common.readAloud')}</span>
        </button>

        {/* Emergency Immediate Nurse Assistance Call Button */}
        <button
          onClick={triggerEmergencyModal}
          className="flex items-center gap-1.5 h-11 min-h-[44px] px-4 bg-emergency hover:bg-emergency-dark active:scale-95 text-white rounded-full text-xs font-black tracking-wide shadow-md shadow-red-600/25 transition-all cursor-pointer shrink-0 ring-2 ring-red-200"
        >
          <AlertCircle size={16} strokeWidth={2.6} className="animate-pulse" />
          <span>{t('header.emergencyHelp')}</span>
        </button>

        {/* Live System Time */}
        <div className="text-xs font-bold text-text-secondary tabular-nums pl-2.5 border-l border-border-main shrink-0 whitespace-nowrap">
          {currentTime}
        </div>
      </div>
    </header>
  );
}
