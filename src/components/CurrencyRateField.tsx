"use client";

import { currencies } from "@/lib/currencies";
import { useNumericText } from "@/lib/useNumericText";

interface CurrencyRateFieldProps {
  label: string;
  badge?: string;
  currency: string;
  rate: number;
  onCurrencyChange: (key: string) => void;
  onRateChange: (value: number) => void;
  className?: string;
}

export default function CurrencyRateField({
  label,
  badge,
  currency,
  rate,
  onCurrencyChange,
  onRateChange,
  className,
}: CurrencyRateFieldProps) {
  const { text, handleChange } = useNumericText(rate, onRateChange);

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
      <div className="flex gap-2">
        <select
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          className="h-[42px] w-[80px] shrink-0 rounded-[9px] border border-border bg-field-bg px-1.5 text-sm font-semibold text-ink outline-none transition-colors focus:border-primary focus:bg-white"
        >
          {currencies.map((c) => (
            <option key={c.key} value={c.key}>
              {c.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          inputMode="decimal"
          value={text}
          onChange={handleChange}
          onFocus={(e) => e.target.select()}
          className="num h-[42px] min-w-0 flex-1 rounded-[9px] border border-border bg-field-bg px-3 text-base font-semibold text-ink outline-none transition-colors focus:border-primary focus:bg-white sm:text-sm"
        />
      </div>
    </div>
  );
}
