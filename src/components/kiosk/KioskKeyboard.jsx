import React, { useState, useEffect } from 'react';
import { Delete, ArrowRight, Check, ChevronDown, Hash, Type, RotateCcw } from 'lucide-react';
import { useTriage } from '../../context/TriageContext';

export function KioskKeyboard({
  activeField,
  onKeyPress,
  onBackspace,
  onClear,
  onNextField,
  onClose,
  className = ''
}) {
  const { t } = useTriage();
  const [isShift, setIsShift] = useState(true); // Default to uppercase for patient records
  const [layoutMode, setLayoutMode] = useState('alpha'); // 'alpha' | 'numeric'

  const isLastField = activeField === 'contact';

  // Auto-switch mode based on the active field
  useEffect(() => {
    if (activeField === 'contact' || activeField === 'dob') {
      setLayoutMode('numeric');
    } else if (activeField === 'fullName') {
      setLayoutMode('alpha');
    }
  }, [activeField]);

  const fieldTitle =
    activeField === 'fullName'
      ? t('keyboard.fullName')
      : activeField === 'contact'
      ? t('keyboard.contact')
      : activeField === 'dob'
      ? t('keyboard.dob')
      : '';

  // QWERTY Key Rows
  const numRow = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'];
  const row3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '-', '.'];

  const handleKeyClick = (char) => {
    const finalChar = isShift ? char.toUpperCase() : char.toLowerCase();
    onKeyPress?.(finalChar);
  };

  return (
    <div
      className={`w-full max-w-[960px] mx-auto bg-slate-100/95 backdrop-blur-sm border-2 border-border-main rounded-3xl p-4 shadow-xl select-none flex flex-col gap-2.5 animate-fadeIn ${className}`}
    >
      {/* Keyboard Header / Active Target Bar */}
      <div className="flex items-center justify-between px-2 pb-1 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider font-bold text-text-secondary">
            {t('keyboard.typing')}:
          </span>
          <span className="text-sm font-black text-brand-green bg-brand-green-light px-3 py-0.5 rounded-full border border-emerald-200">
            {fieldTitle || 'Input'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Layout Mode Toggle */}
          <button
            type="button"
            onClick={() => setLayoutMode((prev) => (prev === 'alpha' ? 'numeric' : 'alpha'))}
            className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-black border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 active:scale-95 transition-all cursor-pointer"
          >
            {layoutMode === 'alpha' ? <Hash size={14} /> : <Type size={14} />}
            <span>{layoutMode === 'alpha' ? '123' : 'ABC'}</span>
          </button>

          {/* Dismiss Keyboard */}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1 h-8 px-3 rounded-lg text-xs font-bold border border-slate-300 bg-white hover:bg-slate-50 text-slate-600 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronDown size={16} />
              <span>{t('keyboard.hide')}</span>
            </button>
          )}
        </div>
      </div>

      {/* Mode A: QWERTY Keyboard */}
      {layoutMode === 'alpha' && (
        <div className="flex flex-col gap-2">
          {/* Numbers Row */}
          <div className="flex gap-1.5 justify-center">
            {numRow.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => onKeyPress?.(n)}
                className="flex-1 h-14 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 text-xl font-bold rounded-xl shadow-sm text-slate-800 active:scale-95 active:bg-slate-200 transition-all cursor-pointer flex items-center justify-center"
              >
                {n}
              </button>
            ))}
          </div>

          {/* QWERTY Row 1 */}
          <div className="flex gap-1.5 justify-center">
            {row1.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => handleKeyClick(k)}
                className="flex-1 h-15 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 text-2xl font-black rounded-xl shadow-sm text-slate-800 active:scale-95 active:bg-slate-200 transition-all cursor-pointer flex items-center justify-center"
              >
                {isShift ? k.toUpperCase() : k.toLowerCase()}
              </button>
            ))}
          </div>

          {/* QWERTY Row 2 (with Ñ) */}
          <div className="flex gap-1.5 justify-center px-2">
            {row2.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => handleKeyClick(k)}
                className="flex-1 h-15 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 text-2xl font-black rounded-xl shadow-sm text-slate-800 active:scale-95 active:bg-slate-200 transition-all cursor-pointer flex items-center justify-center"
              >
                {isShift ? k.toUpperCase() : k.toLowerCase()}
              </button>
            ))}
          </div>

          {/* QWERTY Row 3 (Shift, Letters, Backspace) */}
          <div className="flex gap-1.5 justify-center">
            {/* Shift / Caps Lock Key */}
            <button
              type="button"
              onClick={() => setIsShift((prev) => !prev)}
              className={`w-20 h-15 rounded-xl border-2 text-sm font-black transition-all cursor-pointer flex items-center justify-center shadow-sm active:scale-95 ${
                isShift
                  ? 'bg-brand-green border-brand-green text-white shadow-md'
                  : 'bg-slate-200 border-slate-300 text-slate-700 hover:bg-slate-300'
              }`}
            >
              CAPS
            </button>

            {row3.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => handleKeyClick(k)}
                className="flex-1 h-15 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 text-2xl font-black rounded-xl shadow-sm text-slate-800 active:scale-95 active:bg-slate-200 transition-all cursor-pointer flex items-center justify-center"
              >
                {isShift ? k.toUpperCase() : k.toLowerCase()}
              </button>
            ))}

            {/* Backspace Key */}
            <button
              type="button"
              onClick={onBackspace}
              className="w-20 h-15 bg-slate-200 hover:bg-slate-300 border-2 border-slate-300 text-slate-800 rounded-xl shadow-sm active:scale-95 transition-all cursor-pointer flex items-center justify-center"
            >
              <Delete size={24} />
            </button>
          </div>

          {/* Bottom Control Row (Mode, Clear, Spacebar, Next) */}
          <div className="flex gap-2 justify-center pt-1">
            {/* Clear Input Key */}
            <button
              type="button"
              onClick={onClear}
              className="px-5 h-14 bg-red-50 hover:bg-red-100 border-2 border-red-200 text-emergency-dark text-sm font-black rounded-xl shadow-sm active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw size={16} />
              <span>{t('keyboard.clear')}</span>
            </button>

            {/* Spacebar */}
            <button
              type="button"
              onClick={() => onKeyPress?.(' ')}
              className="flex-1 h-14 bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-700 text-base font-black rounded-xl shadow-sm active:scale-98 active:bg-slate-200 transition-all cursor-pointer flex items-center justify-center tracking-widest"
            >
              {t('keyboard.space')}
            </button>

            {/* Next Field / Done Key */}
            {onNextField && (
              <button
                type="button"
                onClick={isLastField ? onClose : onNextField}
                className={`px-6 h-14 border-2 text-white text-base font-black rounded-xl shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-2 ${
                  isLastField
                    ? 'bg-emerald-700 hover:bg-emerald-800 border-emerald-800'
                    : 'bg-brand-green hover:bg-brand-green-hover border-brand-green'
                }`}
              >
                <span>{isLastField ? t('keyboard.done') : t('keyboard.nextField')}</span>
                {isLastField ? <Check size={18} /> : <ArrowRight size={18} />}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mode B: Large Numeric Dialpad (Phone / Date) */}
      {layoutMode === 'numeric' && (
        <div className="w-full max-w-[620px] mx-auto flex flex-col gap-2.5 py-1">
          {/* Row 1: 1, 2, 3 */}
          <div className="grid grid-cols-3 gap-3">
            {['1', '2', '3'].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => onKeyPress?.(n)}
                className="h-16 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 text-3xl font-black rounded-2xl shadow-sm text-slate-800 active:scale-95 active:bg-slate-200 transition-all cursor-pointer flex items-center justify-center"
              >
                {n}
              </button>
            ))}
          </div>

          {/* Row 2: 4, 5, 6 */}
          <div className="grid grid-cols-3 gap-3">
            {['4', '5', '6'].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => onKeyPress?.(n)}
                className="h-16 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 text-3xl font-black rounded-2xl shadow-sm text-slate-800 active:scale-95 active:bg-slate-200 transition-all cursor-pointer flex items-center justify-center"
              >
                {n}
              </button>
            ))}
          </div>

          {/* Row 3: 7, 8, 9 */}
          <div className="grid grid-cols-3 gap-3">
            {['7', '8', '9'].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => onKeyPress?.(n)}
                className="h-16 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 text-3xl font-black rounded-2xl shadow-sm text-slate-800 active:scale-95 active:bg-slate-200 transition-all cursor-pointer flex items-center justify-center"
              >
                {n}
              </button>
            ))}
          </div>

          {/* Row 4: Contextual Shortcut (+09 for Phone, - for DOB), 0, Backspace */}
          <div className="grid grid-cols-3 gap-3">
            {activeField === 'contact' ? (
              <button
                type="button"
                onClick={() => {
                  onKeyPress?.('0');
                  onKeyPress?.('9');
                }}
                className="h-16 bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200 text-brand-green text-xl font-black rounded-2xl shadow-sm active:scale-95 transition-all cursor-pointer flex items-center justify-center"
              >
                +09
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onKeyPress?.('-')}
                className="h-16 bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 text-slate-800 text-3xl font-black rounded-2xl shadow-sm active:scale-95 transition-all cursor-pointer flex items-center justify-center"
              >
                —
              </button>
            )}

            <button
              type="button"
              onClick={() => onKeyPress?.('0')}
              className="h-16 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 text-3xl font-black rounded-2xl shadow-sm text-slate-800 active:scale-95 active:bg-slate-200 transition-all cursor-pointer flex items-center justify-center"
            >
              0
            </button>

            <button
              type="button"
              onClick={onBackspace}
              className="h-16 bg-slate-200 hover:bg-slate-300 border-2 border-slate-300 text-slate-800 rounded-2xl shadow-sm active:scale-95 transition-all cursor-pointer flex items-center justify-center"
            >
              <Delete size={28} />
            </button>
          </div>

          {/* Numeric Bottom Actions (Clear, Switch to ABC, Next/Done) */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClear}
              className="flex-1 h-13 bg-red-50 hover:bg-red-100 border-2 border-red-200 text-emergency-dark text-sm font-black rounded-xl shadow-sm active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <RotateCcw size={16} />
              <span>{t('keyboard.clear')}</span>
            </button>

            <button
              type="button"
              onClick={() => setLayoutMode('alpha')}
              className="flex-1 h-13 bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-700 text-sm font-black rounded-xl shadow-sm active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Type size={16} />
              <span>ABC</span>
            </button>

            {onNextField && (
              <button
                type="button"
                onClick={isLastField ? onClose : onNextField}
                className={`flex-1 h-13 border-2 text-white text-sm font-black rounded-xl shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  isLastField
                    ? 'bg-emerald-700 hover:bg-emerald-800 border-emerald-800'
                    : 'bg-brand-green hover:bg-brand-green-hover border-brand-green'
                }`}
              >
                <span>{isLastField ? t('keyboard.done') : t('keyboard.nextField')}</span>
                {isLastField ? <Check size={16} /> : <ArrowRight size={16} />}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
