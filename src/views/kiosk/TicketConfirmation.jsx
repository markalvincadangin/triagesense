import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';
import { useTriage } from '../../context/TriageContext';
import { Button } from '../../components/common/Button';
import wvsumcLogo from '../../assets/wvsumc-logo.png';
import {
  CheckCircle2,
  ArrowRight,
  Clock,
  ShieldCheck,
  ArrowDown,
  Tv,
  AlertTriangle,
  FileText,
  Smartphone,
  ScanLine
} from 'lucide-react';

/**
 * 100% Authentic Scannable 2D QR Code
 * Generates an ISO/IEC 18004 standards-compliant QR Code using 'qrcode'.
 * Scannable by any iOS / Android camera phone.
 */
function ScannableQRCode({ value, size = 88 }) {
  const [dataUrl, setDataUrl] = useState('');

  useEffect(() => {
    let isMounted = true;
    QRCode.toDataURL(value, {
      errorCorrectionLevel: 'M',
      margin: 1,
      width: size * 3, // 3x high-resolution rendering
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    })
      .then((url) => {
        if (isMounted) setDataUrl(url);
      })
      .catch((err) => {
        console.error('QR code generation failed:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [value, size]);

  if (!dataUrl) {
    return (
      <div
        style={{ width: size, height: size }}
        className="bg-slate-100 rounded-lg flex items-center justify-center text-[9px] text-slate-400 font-mono animate-pulse"
      >
        Generating...
      </div>
    );
  }

  return (
    <img
      src={dataUrl}
      alt="Scannable QR Code"
      style={{ width: size, height: size }}
      className="rounded-lg shadow-2xs object-contain"
    />
  );
}

/**
 * 100% Authentic Scannable 1D Barcode (Code-128)
 * Generates an authentic Code-128 barcode using 'jsbarcode'.
 * Scannable by standard hospital handheld barcode scanners.
 */
function ScannableBarcode({ value, width = 1.3, height = 36 }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current && value) {
      try {
        JsBarcode(svgRef.current, value, {
          format: 'CODE128',
          lineColor: '#0f172a',
          width: width,
          height: height,
          displayValue: true,
          fontSize: 11,
          font: 'monospace',
          fontOptions: 'bold',
          textMargin: 3,
          margin: 0
        });
      } catch (err) {
        console.error('Barcode generation failed:', err);
      }
    }
  }, [value, width, height]);

  return <svg ref={svgRef} className="max-w-full overflow-visible" />;
}

export function TicketConfirmation() {
  const { lastSubmittedId, intakes, resetKioskSession, t } = useTriage();
  const [countdown, setCountdown] = useState(30);

  const referenceCode = lastSubmittedId || 'TS-2026-9515';
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = now.toLocaleDateString([], { month: 'short', day: '2-digit', year: 'numeric' });

  // Retrieve patient details if available from the intake session
  const submittedRecord = intakes?.find((i) => i.id === referenceCode) || intakes?.[0] || null;
  const patientName = submittedRecord?.patientInfo?.fullName || 'Juan Dela Cruz';
  const patientAge = submittedRecord?.patientInfo?.age || '70';
  const patientGender = submittedRecord?.patientInfo?.gender || 'Male';
  const chiefComplaint = submittedRecord?.symptoms?.join(', ') || 'Chest Pain, Shortness of Breath';

  // Real URL that patient smartphones will open upon scanning
  const mobileTrackingUrl = `https://markalvincadangin.github.io/triagesense/?ticket=${referenceCode}`;

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          resetKioskSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [resetKioskSession]);

  return (
    <div className="flex flex-col items-center justify-between h-full px-12 py-8 bg-canvas overflow-y-auto select-none font-sans">
      {/* 1. Header Section */}
      <div className="text-center mt-2 shrink-0">
        <div className="w-20 h-20 rounded-full bg-brand-green-light flex items-center justify-center text-brand-green mx-auto mb-4 shadow-subtle">
          <CheckCircle2 size={48} strokeWidth={2.5} />
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-text-primary tracking-tight">
          {t('confirmation.title')}
        </h1>
        <h2 className="text-xl sm:text-2xl font-bold text-brand-green mt-2.5">
          {t('confirmation.ticketReady')}
        </h2>
      </div>

      {/* 2. Main Content Flow: Realistic Queue Ticket + Waiting Guide */}
      <div className="w-full max-w-[820px] mx-auto my-3 flex flex-col items-center gap-4 shrink-0">
        {/* Realistic Thermal Queue Slip Card */}
        <div className="w-full bg-[#FFFDF9] rounded-2xl border border-slate-300 shadow-xl relative overflow-hidden flex flex-col text-slate-800 animate-fade-in font-sans">
          {/* Top Perforation Tear Line */}
          <div className="w-full relative py-1 px-4 bg-slate-100/70 border-b border-dashed border-slate-300 flex items-center justify-between text-[10px] font-mono text-slate-400 select-none overflow-hidden">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="text-slate-500 font-bold">✂</span>
              <span className="tracking-[4px] text-slate-400 font-semibold whitespace-nowrap overflow-hidden">
                - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
              </span>
            </div>
            <span className="font-bold shrink-0 ml-2 text-slate-500 uppercase tracking-widest text-[9px]">TEAR HERE</span>
          </div>

          <div className="p-5 sm:p-6 flex flex-col gap-3.5">
            {/* 1. Thermal Header: Monochrome WVSUMC Emblem + Hospital Details */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <img
                  src={wvsumcLogo}
                  alt="WVSU Medical Center"
                  className="w-10 h-10 object-contain grayscale contrast-200 shrink-0"
                />
                <div className="text-left">
                  <div className="text-xs font-black tracking-tight text-slate-900 uppercase">
                    West Visayas State University Medical Center
                  </div>
                  <div className="text-[11px] font-bold text-slate-600">
                    Emergency & Trauma Service • Patient Triage Admission
                  </div>
                </div>
              </div>
              <div className="text-right text-[10px] font-mono text-slate-500 font-bold hidden sm:block">
                <div>TERMINAL K01</div>
                <div>{dateString} • {timeString}</div>
              </div>
            </div>

            {/* 2. Big Queue Number Callout */}
            <div className="text-center py-2.5 bg-slate-50/80 rounded-xl border border-slate-200/80">
              <div className="text-[11px] font-mono font-black text-slate-500 uppercase tracking-widest">
                {t('confirmation.queueLabel')}
              </div>
              <div className="text-5xl sm:text-6xl font-black text-slate-900 tracking-wider font-mono my-1 select-all drop-shadow-xs">
                {referenceCode}
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-black tracking-wide uppercase">
                <ShieldCheck size={14} className="text-emerald-700 shrink-0" />
                <span>{t('confirmation.nextStepAssessment')}</span>
              </div>
            </div>

            {/* 3. Clinical & Patient Intake Summary Grid (Authentic Thermal Receipt Rows) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-slate-100/70 border border-slate-200 text-left text-xs font-mono">
              <div>
                <span className="block text-[10px] font-bold text-slate-500 uppercase">Patient Name</span>
                <span className="font-black text-slate-800 truncate block">{patientName}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-500 uppercase">Age / Gender</span>
                <span className="font-bold text-slate-800 block">{patientAge}y • {patientGender}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-500 uppercase">Chief Complaint</span>
                <span className="font-bold text-slate-800 truncate block">{chiefComplaint}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-500 uppercase">Est. Wait Time</span>
                <span className="font-black text-emerald-800 block">~10–15 mins (3 ahead)</span>
              </div>
            </div>

            {/* 4. Dual Scannable Validation Section (Real QR Code for Patient + Real Barcode for Nurse Desk) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2 border-t border-slate-200">
              {/* Left: 100% Real 2D QR Code for Mobile Patient Tracking */}
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="p-1 bg-white border border-slate-300 rounded-lg shrink-0 shadow-2xs flex items-center justify-center">
                  <ScannableQRCode value={mobileTrackingUrl} size={80} />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                    <Smartphone size={13} className="text-emerald-600 shrink-0" />
                    <span>Patient Mobile Tracker</span>
                  </div>
                  <p className="text-[10px] text-slate-600 font-medium leading-tight mt-0.5">
                    Point your camera phone at the QR code to track your queue line on mobile.
                  </p>
                  <span className="inline-block mt-1 text-[9px] font-mono text-emerald-800 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 truncate max-w-full">
                    triagesense.wvsumc.ph/q/{referenceCode}
                  </span>
                </div>
              </div>

              {/* Right: 100% Real 1D Barcode (Code-128) for Nurse Triage Desk Scanner */}
              <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs text-center">
                <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 mb-0.5">
                  <ScanLine size={13} className="text-blue-600 shrink-0" />
                  <span>Nurse Station EHR Barcode</span>
                </div>
                <div className="flex items-center justify-center overflow-visible w-full py-0.5">
                  <ScannableBarcode value={referenceCode} width={1.3} height={34} />
                </div>
                <p className="text-[9px] text-slate-500 font-medium leading-tight mt-0.5">
                  Laser scanner barcode for triage clinician desk verification
                </p>
              </div>
            </div>

            {/* 5. Reassurance & Clinical Safety Footer Note */}
            <div className="text-center pt-1.5 border-t border-slate-200 text-xs font-medium text-slate-600">
              <span>{t('confirmation.nurseWaiting')}</span>
            </div>
          </div>

          {/* Bottom Perforation Tear Line */}
          <div className="w-full relative py-1 px-4 bg-slate-100/70 border-t border-dashed border-slate-300 flex items-center justify-between text-[10px] font-mono text-slate-400 select-none overflow-hidden">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="text-slate-500 font-bold">✂</span>
              <span className="tracking-[4px] text-slate-400 font-semibold whitespace-nowrap overflow-hidden">
                - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
              </span>
            </div>
            <span className="font-bold shrink-0 ml-2 text-slate-500 uppercase tracking-widest text-[9px]">END OF RECEIPT</span>
          </div>
        </div>

        {/* Physical Directional Cue: Direct Vector to Chassis Printer Mouth */}
        <div className="flex items-center gap-3.5 px-8 py-3.5 rounded-full bg-emerald-50 border-2 border-brand-green text-emerald-950 font-black text-base sm:text-lg shadow-sm">
          <ArrowDown size={22} strokeWidth={3.5} className="text-brand-green shrink-0 animate-bounce" />
          <span className="animate-bounce">{t('confirmation.takeTicketSlot')}</span>
          <ArrowDown size={22} strokeWidth={3.5} className="text-brand-green shrink-0 animate-bounce" />
        </div>

        {/* 3. Waiting Area Guidance Grid: Fills Void with High-Value Reassurance */}
        <div className="w-full bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-6 shadow-subtle">
          <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-700 mb-3.5 flex items-center gap-2">
            <Clock size={18} className="text-brand-green shrink-0" />
            <span>{t('confirmation.guideTitle')}</span>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4 text-left">
            <div className="bg-canvas p-4 rounded-2xl border border-border-main flex flex-col gap-1.5 shadow-2xs">
              <div className="flex items-center gap-2 text-brand-green font-black text-sm sm:text-base">
                <FileText size={20} className="shrink-0" />
                <span>{t('confirmation.guideStep1Title')}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                {t('confirmation.guideStep1Desc')}
              </p>
            </div>

            <div className="bg-canvas p-4 rounded-2xl border border-border-main flex flex-col gap-1.5 shadow-2xs">
              <div className="flex items-center gap-2 text-brand-green font-black text-sm sm:text-base">
                <Tv size={20} className="shrink-0" />
                <span>{t('confirmation.guideStep2Title')}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                {t('confirmation.guideStep2Desc')}
              </p>
            </div>

            <div className="p-4 rounded-2xl border-2 border-amber-300 bg-amber-50/90 flex flex-col gap-1.5 shadow-2xs">
              <div className="flex items-center gap-2 text-amber-950 font-black text-sm sm:text-base">
                <AlertTriangle size={20} className="text-amber-600 shrink-0" />
                <span>{t('confirmation.guideStep3Title')}</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-950 font-bold leading-relaxed">
                {t('confirmation.guideStep3Desc')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Reset Timer & Manual Return Button */}
      <div className="w-full max-w-[820px] mx-auto flex flex-col items-center gap-3.5 mt-auto shrink-0 pb-2">
        {/* Dynamic Countdown Status Pill */}
        <div
          className={`flex items-center gap-3 px-6 sm:px-8 py-3 rounded-full border-2 text-base sm:text-lg font-bold transition-all shadow-subtle ${
            countdown <= 10
              ? 'bg-amber-50 border-amber-400 text-amber-950 shadow-md animate-pulse'
              : 'bg-white border-slate-300 text-slate-700'
          }`}
        >
          <Clock
            size={24}
            className={countdown <= 10 ? 'text-amber-600' : 'text-brand-green'}
            strokeWidth={2.5}
          />
          <span className="flex items-center gap-2 flex-wrap justify-center">
            <span className="font-extrabold text-slate-700">{t('confirmation.resetTimerPrefix')}</span>
            <span
              className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-lg border-2 text-xl sm:text-2xl font-black font-mono leading-none ${
                countdown <= 10
                  ? 'bg-red-100 text-red-700 border-red-400 animate-pulse'
                  : 'bg-emerald-100 text-brand-green border-brand-green/40'
              }`}
            >
              {countdown}s
            </span>
          </span>
        </div>

        {/* Primary Action Button */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          trailingIcon={ArrowRight}
          onClick={resetKioskSession}
          className="h-18 text-2xl font-black tracking-wide shadow-xl rounded-2xl cursor-pointer"
        >
          {t('confirmation.doneBtn')}
        </Button>
      </div>
    </div>
  );
}
