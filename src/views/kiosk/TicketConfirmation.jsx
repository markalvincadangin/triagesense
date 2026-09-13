import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';
import { useTriage } from '../../context/TriageContext';
import { Button } from '../../components/common/Button';
import { dispatchPrintJob } from '../../services/printerService';
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
  Scissors
} from 'lucide-react';

/**
 * 100% Authentic Scannable 2D QR Code
 * Generates an ISO/IEC 18004 standards-compliant QR Code using 'qrcode'.
 * Rendered on physical thermal paper receipt for private patient smartphone tracking.
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
        dark: '#000000',
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
 * Rendered on physical thermal paper receipt for triage clinician laser verification.
 */
function ScannableBarcode({ value, width = 1.3, height = 36 }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current && value) {
      try {
        JsBarcode(svgRef.current, value, {
          format: 'CODE128',
          lineColor: '#000000',
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

  // Retrieve patient details (strictly for physical thermal paper receipt payload; NEVER shown on public screen)
  const submittedRecord = intakes?.find((i) => i.id === referenceCode) || intakes?.[0] || null;
  const patientName = submittedRecord?.patientInfo?.fullName || 'Juan Dela Cruz';
  const patientAge = submittedRecord?.patientInfo?.age || '70';
  const patientGender = submittedRecord?.patientInfo?.gender || 'Male';
  const chiefComplaint = submittedRecord?.symptoms?.join(', ') || 'Chest Pain, Shortness of Breath';

  // Real URL that patient smartphones will open upon scanning the physical paper ticket
  const mobileTrackingUrl = `https://markalvincadangin.github.io/triagesense/?ticket=${referenceCode}`;

  useEffect(() => {
    // Dispatch print payload to physical ESC/POS thermal printer service
    dispatchPrintJob(submittedRecord);
  }, [submittedRecord]);

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
    <>
      {/* 
        ========================================================================
        1. PUBLIC DIGITAL SCREEN DISPLAY (Strictly Anonymous per RA 10173)
        ========================================================================
        Redacts all PII (Name, Age, Sex, Chief Complaint) and scan targets (QR/Barcode)
        from the public 32" kiosk display to eliminate shoulder-surfing in the ER lobby
        and prevent kiosk loitering.
      */}
      <div className="print:hidden flex flex-col items-center justify-between min-h-full px-4 sm:px-6 py-4 bg-canvas overflow-y-auto select-none font-sans">
        {/* Top Header Section */}
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

        {/* Main Content Flow: Anonymous Queue Slip + Directional Bridge + Guidance */}
        <div className="w-full max-w-[620px] mx-auto my-3 flex flex-col items-center gap-3 shrink-0">
          {/* Anonymous Digital Queue Slip */}
          <div className="w-full bg-[#FFFDF9] rounded-2xl border border-slate-300 shadow-md relative overflow-hidden flex flex-col text-slate-800 animate-fade-in font-sans">
            {/* Top Perforation Tear Line (Responsive Clean Dashed Divider) */}
            <div className="w-full relative py-1 px-4 bg-slate-100/70 border-b border-dashed border-slate-300 flex items-center justify-between text-[10px] font-mono text-slate-400 select-none overflow-hidden">
              <div className="flex items-center gap-2 flex-1 mr-3">
                <Scissors size={12} className="text-slate-400 -rotate-90 shrink-0" />
                <div className="flex-1 border-b border-dashed border-slate-300 h-0" />
              </div>
              <span className="font-bold shrink-0 text-slate-500 uppercase tracking-widest text-[9px]">TEAR HERE</span>
            </div>

            <div className="p-4 sm:p-5 flex flex-col gap-3">
              {/* Thermal Header: Monochrome WVSUMC Emblem + Hospital Details */}
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
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

              {/* Anonymous Queue Number Callout (Only Publicly Disclosed Token) */}
              <div className="text-center py-3 sm:py-4 bg-slate-50/90 rounded-xl border border-slate-200">
                <div className="text-[11px] font-mono font-black text-slate-500 uppercase tracking-widest">
                  {t('confirmation.queueLabel')}
                </div>
                <div className="text-5xl sm:text-6xl font-black text-slate-900 tracking-wider font-mono my-1 select-all drop-shadow-xs">
                  {referenceCode}
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-black tracking-wide uppercase">
                  <ShieldCheck size={14} className="text-emerald-700 shrink-0" />
                  <span>{t('confirmation.nextStepAssessment')}</span>
                </div>
              </div>

              {/* Waiting Reassurance Note */}
              <div className="text-center pt-2 border-t border-slate-200 text-xs font-medium text-slate-600 leading-relaxed">
                <span>{t('confirmation.nurseWaiting')}</span>
              </div>
            </div>

            {/* Bottom Perforation Tear Line (Responsive Clean Dashed Divider) */}
            <div className="w-full relative py-1 px-4 bg-slate-100/70 border-t border-dashed border-slate-300 flex items-center justify-between text-[10px] font-mono text-slate-400 select-none overflow-hidden">
              <div className="flex items-center gap-2 flex-1 mr-3">
                <Scissors size={12} className="text-slate-400 -rotate-90 shrink-0" />
                <div className="flex-1 border-b border-dashed border-slate-300 h-0" />
              </div>
              <span className="font-bold shrink-0 text-slate-500 uppercase tracking-widest text-[9px]">END OF RECEIPT</span>
            </div>
          </div>

          {/* Physical Directional Cue: Direct Vector to Chassis Printer Slot */}
          <div className="flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-emerald-50 border-2 border-brand-green text-emerald-950 font-black text-sm sm:text-base shadow-xs">
            <ArrowDown size={18} strokeWidth={3} className="text-brand-green shrink-0 animate-bounce" />
            <span>{t('confirmation.takeTicketSlot')}</span>
            <ArrowDown size={18} strokeWidth={3} className="text-brand-green shrink-0 animate-bounce" />
          </div>

          {/* Waiting Area Guidance Grid */}
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

        {/* Bottom Reset Timer & Manual Return Button */}
        <div className="w-full max-w-[620px] mx-auto flex flex-col items-center gap-2.5 mt-auto shrink-0 pb-1">
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

      {/* 
        ========================================================================
        2. PHYSICAL 80MM ESC/POS THERMAL PRINTED TICKET (Hardware Output)
        ========================================================================
        Only rendered when sent to physical thermal printer (@media print).
        Hidden from the public screen to protect patient privacy per RA 10173.
        Contains the confidential clinical intake snapshot, mobile tracking QR,
        and clinician EHR laser barcode.
      */}
      <div className="hidden print:block w-[80mm] p-4 text-black font-mono text-xs bg-white">
        <div className="text-center pb-2 border-b border-black">
          <div className="font-black text-xs uppercase tracking-tight">WEST VISAYAS STATE UNIVERSITY</div>
          <div className="font-bold text-[11px] uppercase">MEDICAL CENTER</div>
          <div className="text-[9.5px] mt-0.5">Emergency & Trauma Service • Patient Triage</div>
          <div className="text-[9px] text-gray-700 mt-0.5">TERMINAL K01 • {dateString} {timeString}</div>
        </div>

        <div className="text-center my-2.5 py-2 border-y border-dashed border-black">
          <div className="text-[9px] font-bold uppercase tracking-widest">QUEUE TICKET NUMBER</div>
          <div className="text-3xl font-black tracking-wider my-0.5">{referenceCode}</div>
          <div className="text-[9px] font-black uppercase tracking-wide">Next: In-Person Nurse Assessment</div>
        </div>

        {/* Confidential Clinical Details (Privately Held by Patient) */}
        <div className="py-2 border-b border-black text-[10px] space-y-1">
          <div className="flex justify-between">
            <span><strong>Patient:</strong> {patientName}</span>
            <span>{patientAge}y • {patientGender}</span>
          </div>
          <div><strong>Chief Complaint:</strong> {chiefComplaint}</div>
          <div><strong>Est. Wait Time:</strong> ~10–15 mins (3 ahead)</div>
        </div>

        {/* Scannable Validation Assets on Physical Paper */}
        <div className="my-3 flex flex-col items-center gap-2 text-center">
          <ScannableQRCode value={mobileTrackingUrl} size={90} />
          <div className="text-[8.5px] leading-tight">
            Point camera phone at QR code for live mobile queue tracking
          </div>
          <div className="mt-1 w-full flex justify-center">
            <ScannableBarcode value={referenceCode} width={1.3} height={32} />
          </div>
          <div className="text-[8px] text-gray-600">Clinician desk EHR barcode</div>
        </div>

        <div className="text-center text-[9px] pt-2 border-t border-dashed border-black">
          Please take a seat. A triage nurse will call your ticket number shortly.
        </div>
      </div>
    </>
  );
}
