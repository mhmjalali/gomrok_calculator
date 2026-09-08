"use client";

import type { CalcInputs } from "@/lib/calc";
import { getCurrencyRate } from "@/lib/currencies";
import CurrencyRateField from "./CurrencyRateField";
import NumberField from "./NumberField";

interface FormCardProps {
  inputs: CalcInputs;
  onChange: <K extends keyof CalcInputs>(key: K, value: CalcInputs[K]) => void;
}

export default function FormCard({ inputs, onChange }: FormCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <h2 className="mb-4 text-[15.5px] font-bold sm:mb-[18px]">اطلاعات محموله</h2>

      <div className="flex flex-col gap-3.5">
        <NumberField label="تعداد" value={inputs.qty} onChange={(v) => onChange("qty", v)} />
        <NumberField label="ارزش کالا" value={inputs.goodsValue} onChange={(v) => onChange("goodsValue", v)} />
        <CurrencyRateField
          label="دلار گمرکی"
          badge="پیش‌فرض"
          currency={inputs.customsCurrency}
          rate={inputs.customsDollarRate}
          onCurrencyChange={(key) => {
            onChange("customsCurrency", key);
            onChange("customsDollarRate", getCurrencyRate(key));
          }}
          onRateChange={(v) => onChange("customsDollarRate", v)}
        />
        <NumberField
          label="بیمه و کرایه"
          badge="پیش‌فرض"
          value={inputs.insuranceFreight}
          onChange={(v) => onChange("insuranceFreight", v)}
        />
        <div className="grid grid-cols-2 gap-3">
          <NumberField label="ضریب حقوق گمرکی" value={inputs.dutyFactor} onChange={(v) => onChange("dutyFactor", v)} />
          <NumberField label="ضریب سود بازرگانی" value={inputs.profitFactor} onChange={(v) => onChange("profitFactor", v)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <NumberField label="آزمایشگاه" value={inputs.labFee} onChange={(v) => onChange("labFee", v)} />
          <NumberField label="هزینه متفرقه" value={inputs.miscCost} onChange={(v) => onChange("miscCost", v)} />
        </div>
      </div>
    </div>
  );
}
