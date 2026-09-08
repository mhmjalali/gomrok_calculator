"use client";

import { parseNumber } from "@/lib/format";

interface NumberFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  badge?: string;
  className?: string;
}

export default function NumberField({ label, value, onChange, badge, className }: NumberFieldProps) {
  return (
    <div className={className}>
      <label className="mb-1.5 flex items-center gap-1.5 text-[12.5px] font-semibold text-ink-soft">
        {label}
        {badge && (
          <span className="rounded-md bg-gold-tint px-1.5 py-0.5 text-[9.5px] font-semibold text-gold-text">
            {badge}
          </span>
        )}
      </label>
      <input
        type="text"
        inputMode="decimal"
        value={Number.isNaN(value) ? "" : value}
        onChange={(e) => onChange(parseNumber(e.target.value))}
        onFocus={(e) => e.target.select()}
        className="num h-[42px] w-full rounded-[9px] border border-border bg-field-bg px-3 text-sm font-semibold text-ink outline-none transition-colors focus:border-primary focus:bg-white"
      />
    </div>
  );
}
