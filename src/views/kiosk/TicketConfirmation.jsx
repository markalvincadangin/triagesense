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
    <div className="flex flex-col items-center justify-between min-h-full px-4 sm:px-6 py-3 sm:py-4 bg-canvas overflow-y-auto select-none font-sans">
      {/* 1. Header Section */}
      <div className="text-center shrink-0">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-brand-green-light flex items-center justify-center text-brand-green mx-auto mb-1.5 shadow-2xs">
          <CheckCircle2 size={30} strokeWidth={2.5} />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-text-primary tracking-tight">
          {t('confirmation.title')}
        </h1>
        <h2 className="text-sm sm:text-base font-bold text-brand-green mt-0.5">
          {t('confirmation.ticketReady')}
        </h2>
      </div>

      {/* 2. Main Content Flow: Realistic Queue Ticket + Waiting Guide */}
      <div className="w-full max-w-[660px] mx-auto my-2 flex flex-col items-center gap-2.5 sm:gap-3 shrink-0">
        {/* Realistic Thermal Queue Slip Card */}
        <div className="w-full bg-[#FFFDF9] rounded-2xl border border-slate-300 shadow-lg relative overflow-hidden flex flex-col text-slate-800 animate-fade-in font-sans">
          {/* Top Perforation Tear Line (Responsive Clean Dashed Divider) */}
          <div className="w-full relative py-1 px-4 bg-slate-100/70 border-b border-dashed border-slate-300 flex items-center justify-between text-[10px] font-mono text-slate-400 select-none overflow-hidden">
            <div className="flex items-center gap-2 flex-1 mr-3">
              <span className="text-slate-500 font-bold text-xs">✂</span>
              <div className="flex-1 border-b border-dashed border-slate-300 h-0" />
            </div>
            <span className="font-bold shrink-0 text-slate-500 uppercase tracking-widest text-[9px]">TEAR HERE</span>
          </div>

          <div className="p-3.5 sm:p-4 flex flex-col gap-2.5">
            {/* 1. Thermal Header: Monochrome WVSUMC Emblem + Hospital Details */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <img
                  src={wvsumcLogo}
                  alt="WVSU Medical Center"
                  className="w-8 h-8 sm:w-9 sm:h-9 object-contain grayscale contrast-200 shrink-0"
                />
                <div className="text-left">
                  <div className="text-[11px] sm:text-xs font-black tracking-tight text-slate-900 uppercase">
                    West Visayas State University Medical Center
                  </div>
                  <div className="text-[10px] font-bold text-slate-600">
                    Emergency & Trauma Service • Patient Triage Admission
                  </div>
                </div>
              </div>
              <div className="text-right text-[9.5px] font-mono text-slate-500 font-bold hidden sm:block">
                <div>TERMINAL K01</div>
                <div>{dateString} • {timeString}</div>
              </div>
            </div>

            {/* 2. Big Queue Number Callout */}
            <div className="text-center py-1.5 sm:py-2 bg-slate-50/80 rounded-xl border border-slate-200/80">
              <div className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">
                {t('confirmation.queueLabel')}
              </div>
              <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-wider font-mono my-0.5 select-all drop-shadow-xs">
                {referenceCode}
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[11px] font-black tracking-wide uppercase">
                <ShieldCheck size={13} className="text-emerald-700 shrink-0" />
                <span>{t('confirmation.nextStepAssessment')}</span>
              </div>
            </div>

            {/* 3. Clinical & Patient Intake Summary (Spacious 2-Row Layout, 0 Truncation) */}
            <div className="p-2.5 rounded-xl bg-slate-100/70 border border-slate-200 text-left text-xs font-mono flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2 border-b border-slate-200/80 pb-1.5">
                <div>
                  <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider">Patient Info</span>
                  <span className="font-black text-slate-800">
                    {patientName} <span className="font-medium text-slate-600">({patientAge}y • {patientGender})</span>
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider">Est. Wait Time</span>
                  <span className="font-black text-emerald-800">~10–15 mins (3 ahead)</span>
                </div>
              </div>
              <div>
                <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider">Chief Complaint</span>
                <span className="font-bold text-slate-800 block text-xs leading-snug">
                  {chiefComplaint}
                </span>
              </div>
            </div>

            {/* 4. Dual Scannable Validation Section (Real QR Code + Real Barcode) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1.5 border-t border-slate-200 items-stretch">
              {/* Left: 100% Real 2D QR Code for Mobile Patient Tracking */}
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-slate-200 shadow-2xs h-full">
                <div className="p-1 bg-white border border-slate-300 rounded-lg shrink-0 shadow-2xs flex items-center justify-center">
                  <ScannableQRCode value={mobileTrackingUrl} size={70} />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <div className="flex items-center gap-1 text-[11px] font-black text-slate-900">
                    <Smartphone size={12} className="text-emerald-600 shrink-0" />
                    <span>Patient Mobile Tracker</span>
                  </div>
                  <p className="text-[9.5px] text-slate-600 font-medium leading-tight mt-0.5">
                    Scan with camera to track queue on your phone.
                  </p>
                  <span className="inline-block mt-1 text-[8.5px] font-mono text-emerald-800 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 truncate max-w-full">
                    triagesense.wvsumc.ph/q/{referenceCode}
                  </span>
                </div>
              </div>

              {/* Right: 100% Real 1D Barcode (Code-128) for Nurse Triage Desk Scanner */}
              <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white border border-slate-200 shadow-2xs text-center h-full">
                <div className="flex items-center gap-1 text-[11px] font-black text-slate-900 mb-0.5">
                  <ScanLine size={12} className="text-blue-600 shrink-0" />
                  <span>Nurse Station EHR Barcode</span>
                </div>
                <div className="flex items-center justify-center overflow-visible w-full py-0.5">
                  <ScannableBarcode value={referenceCode} width={1.2} height={28} />
                </div>
                <p className="text-[8.5px] text-slate-500 font-medium leading-tight">
                  Laser scanner barcode for triage desk verification
                </p>
              </div>
            </div>

            {/* 5. Reassurance & Clinical Safety Footer Note */}
            <div className="text-center pt-1 border-t border-slate-200 text-[11px] font-medium text-slate-600">
              <span>{t('confirmation.nurseWaiting')}</span>
            </div>
          </div>

          {/* Bottom Perforation Tear Line (Responsive Clean Dashed Divider) */}
          <div className="w-full relative py-1 px-4 bg-slate-100/70 border-t border-dashed border-slate-300 flex items-center justify-between text-[10px] font-mono text-slate-400 select-none overflow-hidden">
            <div className="flex items-center gap-2 flex-1 mr-3">
              <span className="text-slate-500 font-bold text-xs">✂</span>
              <div className="flex-1 border-b border-dashed border-slate-300 h-0" />
            </div>
            <span className="font-bold shrink-0 text-slate-500 uppercase tracking-widest text-[9px]">END OF RECEIPT</span>
          </div>
        </div>

        {/* Physical Directional Cue: Direct Vector to Chassis Printer Mouth */}
        <div className="flex items-center gap-2.5 px-6 py-2 rounded-full bg-emerald-50 border-2 border-brand-green text-emerald-950 font-black text-sm sm:text-base shadow-xs">
          <ArrowDown size={18} strokeWidth={3} className="text-brand-green shrink-0 animate-bounce" />
          <span>{t('confirmation.takeTicketSlot')}</span>
          <ArrowDown size={18} strokeWidth={3} className="text-brand-green shrink-0 animate-bounce" />
        </div>

        {/* 3. Waiting Area Guidance Grid: Fills Void with High-Value Reassurance */}
        <div className="w-full bg-white border border-slate-200 rounded-2xl p-3 sm:p-3.5 shadow-xs">
          <div className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
            <Clock size={16} className="text-brand-green shrink-0" />
            <span>{t('confirmation.guideTitle')}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-left">
            <div className="bg-canvas p-2.5 rounded-xl border border-border-main flex flex-col gap-1 shadow-2xs">
              <div className="flex items-center gap-1.5 text-brand-green font-black text-xs sm:text-sm">
                <FileText size={16} className="shrink-0" />
                <span>{t('confirmation.guideStep1Title')}</span>
              </div>
              <p className="text-[11px] text-slate-700 font-semibold leading-snug">
                {t('confirmation.guideStep1Desc')}
              </p>
            </div>

            <div className="bg-canvas p-2.5 rounded-xl border border-border-main flex flex-col gap-1 shadow-2xs">
              <div className="flex items-center gap-1.5 text-brand-green font-black text-xs sm:text-sm">
                <Tv size={16} className="shrink-0" />
                <span>{t('confirmation.guideStep2Title')}</span>
              </div>
              <p className="text-[11px] text-slate-700 font-semibold leading-snug">
                {t('confirmation.guideStep2Desc')}
              </p>
            </div>

            <div className="p-2.5 rounded-xl border-2 border-amber-300 bg-amber-50/90 flex flex-col gap-1 shadow-2xs">
              <div className="flex items-center gap-1.5 text-amber-950 font-black text-xs sm:text-sm">
                <AlertTriangle size={16} className="text-amber-600 shrink-0" />
                <span>{t('confirmation.guideStep3Title')}</span>
              </div>
              <p className="text-[11px] text-amber-950 font-bold leading-snug">
                {t('confirmation.guideStep3Desc')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Reset Timer & Manual Return Button */}
      <div className="w-full max-w-[660px] mx-auto flex flex-col items-center gap-2 mt-2 shrink-0 pb-1">
        {/* Dynamic Countdown Status Pill */}
        <div
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-bold transition-all shadow-2xs ${
            countdown <= 10
              ? 'bg-amber-50 border-amber-400 text-amber-950 shadow-md animate-pulse'
              : 'bg-white border-slate-300 text-slate-700'
          }`}
        >
          <Clock
            size={16}
            className={countdown <= 10 ? 'text-amber-600' : 'text-brand-green'}
            strokeWidth={2.5}
          />
          <span className="flex items-center gap-1.5 flex-wrap justify-center">
            <span className="font-extrabold text-slate-700">{t('confirmation.resetTimerPrefix')}</span>
            <span
              className={`inline-flex items-center justify-center px-2 py-0.5 rounded-md border text-sm sm:text-base font-black font-mono leading-none ${
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
          className="h-12 sm:h-13 text-lg sm:text-xl font-black tracking-wide shadow-md rounded-xl cursor-pointer"
        >
          {t('confirmation.doneBtn')}
        </Button>
      </div>
    </div>
  );
}
