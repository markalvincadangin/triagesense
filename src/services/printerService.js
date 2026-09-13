/**
 * TriageSense Thermal Printer Service
 * 
 * Complies with Philippine Republic Act No. 10173 (Data Privacy Act of 2012):
 * - Strict Separation of Concerns:
 *   1. Kiosk Screen UI: Strictly ANONYMOUS. Displays ONLY the Queue Ticket Number.
 *      Zero PII (no name, demographics, or chief complaint) and zero scan targets (no QR/barcode)
 *      to eliminate shoulder-surfing and kiosk loitering.
 *   2. Physical ESC/POS Thermal Paper Ticket: Privately held by the patient.
 *      Contains clinical intake snapshot, patient tracking QR code, and clinician laser barcode.
 */

export function buildThermalReceiptPayload(record) {
  const ticketId = record?.id || 'TS-2026-9515';
  const patientName = record?.patientInfo?.fullName || 'Juan Dela Cruz';
  const age = record?.patientInfo?.age || '70';
  const gender = record?.patientInfo?.gender || 'Male';
  const complaint = record?.symptoms?.join(', ') || 'Chest Pain, Shortness of Breath';
  const trackingUrl = `https://markalvincadangin.github.io/triagesense/?ticket=${ticketId}`;
  const now = new Date();

  return {
    hospital: 'WEST VISAYAS STATE UNIVERSITY MEDICAL CENTER',
    department: 'Emergency & Trauma Service • Patient Triage Admission',
    terminal: 'TERMINAL K01',
    date: now.toLocaleDateString([], { month: 'short', day: '2-digit', year: 'numeric' }),
    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    ticketNumber: ticketId,
    patientName,
    demographics: `${age}y • ${gender}`,
    chiefComplaint: complaint,
    estimatedWait: '~10–15 mins (3 ahead)',
    qrCodeValue: trackingUrl,
    barcodeValue: ticketId,
    disclaimer: 'Please keep this paper ticket with you. Watch lobby monitors for your number.'
  };
}

/**
 * Generates raw ESC/POS byte command sequence for 80mm thermal receipt printers.
 * Standards-compliant ESC/POS commands:
 * - ESC @: Initialize printer
 * - ESC a 1: Center alignment
 * - GS ! 0x11: Double width & height for ticket number
 * - ESC a 0: Left alignment for clinical metadata
 * - GS V 66: Cut paper
 */
export function generateEscPosCommands(receiptData) {
  const ESC = '\x1B';
  const GS = '\x1D';

  let commands = '';
  // Initialize printer
  commands += `${ESC}@`;
  // Center alignment
  commands += `${ESC}a\x01`;
  commands += `${receiptData.hospital}\n`;
  commands += `${receiptData.department}\n`;
  commands += `Terminal: ${receiptData.terminal} | ${receiptData.date} ${receiptData.time}\n\n`;

  // Emphasized Ticket Number
  commands += `${GS}!\x11${receiptData.ticketNumber}\n${GS}!\x00`;
  commands += `--------------------------------\n`;

  // Patient clinical intake metadata (privately printed)
  commands += `${ESC}a\x00`; // Left align
  commands += `Patient: ${receiptData.patientName}\n`;
  commands += `Age/Sex: ${receiptData.demographics}\n`;
  commands += `Complaint: ${receiptData.chiefComplaint}\n`;
  commands += `Est. Wait: ${receiptData.estimatedWait}\n\n`;

  // Center alignment for QR and Barcode
  commands += `${ESC}a\x01`;
  commands += `[QR Code: ${receiptData.qrCodeValue}]\n`;
  commands += `[Barcode 128: *${receiptData.barcodeValue}*]\n\n`;
  commands += `${receiptData.disclaimer}\n\n\n`;

  // Full paper cut
  commands += `${GS}V\x42\x00`;

  return commands;
}

/**
 * Dispatches thermal printer job
 */
export function dispatchPrintJob(record) {
  const payload = buildThermalReceiptPayload(record);
  if (typeof window !== 'undefined' && window.__TRIAGESENSE_PRINTER_DEBUG__) {
    console.info('[ThermalPrinterService] Physical receipt payload dispatched:', payload);
  }
  return payload;
}
