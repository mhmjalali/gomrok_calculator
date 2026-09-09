"use client";

import type { CalcSettings } from "@/lib/calc";
import { defaultSettings } from "@/lib/calc";
import { IconGear } from "./icons";
import NumberField from "./NumberField";

interface RateField {
  key: keyof CalcSettings;
  label: string;
  hint: string;
}

const RATE_FIELDS: RateField[] = [
  { key: "dutyBaseRate", label: "نرخ پایه حقوق گمرکی", hint: "B3" },
  { key: "dutyFactor", label: "ضریب حقوق گمرکی", hint: "C3" },
  { key: "redCrescentRate", label: "نرخ هلال احمر", hint: "D5" },
  { key: "wasteRate", label: "نرخ پسماند", hint: "D6" },
  { key: "kolbariRate", label: "نرخ کولبری", hint: "D8" },
  { key: "tax2PercentRate", label: "نرخ مالیات ۲ درصد", hint: "D9" },
  { key: "taxRate", label: "نرخ مالیات", hint: "D10" },
  { key: "standardFeeRate", label: "نرخ کارمزد استاندارد", hint: "D16" },
];

const AMOUNT_FIELDS: RateField[] = [
  { key: "dutyVatAmount", label: "حقوق گمرکی با ارزش افزوده", hint: "E13" },
  { key: "advanceTaxAmount", label: "مالیات علی‌الحساب", hint: "E14" },
  { key: "brokerProfit", label: "سود کارگزار", hint: "E17" },
];

interface SettingsModalProps {
  open: boolean;
  settings: CalcSettings;
  onChange: (next: CalcSettings) => void;
  onClose: () => void;
}

export default function SettingsModal({
  open,
  settings,
  onChange,
  onClose,
}: SettingsModalProps) {
  if (!open) return null;

  function set<K extends keyof CalcSettings>(key: K, value: CalcSettings[K]) {
    onChange({ ...settings, [key]: value });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(36,31,46,0.5)] p-3 sm:p-5"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-160 overflow-y-auto rounded-[20px] bg-surface p-5 shadow-[0_24px_60px_rgba(20,16,30,0.35)] sm:max-h-[85vh] sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8.5 w-8.5 items-center justify-center rounded-[10px] bg-primary-tint text-primary">
              <IconGear />
            </div>
            <h2 className="text-lg font-extrabold">تنظیمات پیشرفته</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن"
            className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#f3f1ee] text-lg leading-none text-muted transition-colors hover:bg-primary-tint hover:text-primary"
          >
            &times;
          </button>
        </div>
        <p className="mb-5 text-[13px] leading-[1.9] text-muted">
          این مقادیر ثابت هستند و معمولاً تغییر نمی‌کنند. مقدار فعلی هرکدام در
          محاسبه استفاده می‌شود؛ نیازی به وارد کردن آن‌ها در هر بار محاسبه نیست.
        </p>

        <h3 className="mb-3 text-[12.5px] font-bold uppercase tracking-wide text-gold-text">
          نرخ‌ها (درصدها)
        </h3>
        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {RATE_FIELDS.map((f) => (
            <NumberField
              key={f.key}
              label={`${f.label} · ${f.hint}`}
              value={settings[f.key]}
              onChange={(v) => set(f.key, v)}
            />
          ))}
        </div>

        <h3 className="mb-3 text-[12.5px] font-bold uppercase tracking-wide text-gold-text">
          مبالغ ثابت
        </h3>
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {AMOUNT_FIELDS.map((f) => (
            <NumberField
              key={f.key}
              label={`${f.label} · ${f.hint}`}
              value={settings[f.key]}
              onChange={(v) => set(f.key, v)}
            />
          ))}
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-border-soft pt-5 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={() => onChange(defaultSettings)}
            className="rounded-[9px] border border-border bg-surface px-4.5 py-2.75 text-[13.5px] font-semibold text-ink-soft transition-colors hover:bg-primary-tint hover:border-primary"
          >
            بازگردانی به مقادیر پیش‌فرض
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-[9px] border-none bg-primary px-6 py-2.75 text-[13.5px] font-bold text-white transition-colors hover:bg-primary-dark"
          >
            بستن و ذخیره
          </button>
        </div>
      </div>
    </div>
  );
}
