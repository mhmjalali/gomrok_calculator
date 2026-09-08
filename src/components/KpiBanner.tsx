import type { CalcResult } from "@/lib/calc";
import { fmtDecimal, fmtInt } from "@/lib/format";
import { IconReceipt } from "./icons";

export default function KpiBanner({ r }: { r: CalcResult }) {
  return (
    <div className="mx-4 mt-5 flex flex-col gap-5 rounded-2xl bg-hero px-5 py-5 shadow-[0_8px_22px_rgba(36,31,46,0.16)] sm:mx-6 sm:px-6 lg:mx-14 lg:mt-8 lg:flex-row lg:items-center lg:gap-0 lg:rounded-[18px] lg:px-8 lg:py-[26px]">
      <div className="flex items-center gap-3.5 border-b border-hero-line pb-5 lg:border-b-0 lg:border-l lg:pb-0 lg:pl-8">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-[rgba(184,134,59,0.2)] text-gold lg:h-12 lg:w-12">
          <IconReceipt />
        </div>
        <div>
          <div className="mb-1 text-[13px] font-semibold text-hero-muted">مجموع کل &middot; E21</div>
          <div className="num text-[26px] font-extrabold text-hero-text sm:text-[32px]">{fmtInt(r.grandTotal)}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:flex lg:flex-1 lg:justify-around lg:gap-0 lg:pr-2">
        <Stat label="ارزش سیف · G2" value={fmtInt(r.cifValue)} />
        <Stat label="جمع هزینه · E11" value={fmtInt(r.totalCost)} />
        <Stat label="مجموع کل هزینه‌ها · E18" value={fmtInt(r.totalAllCosts)} />
        <Stat label="تعداد کارت مصرفی · E22" value={fmtDecimal(r.consumptionCardCount, 6)} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="mb-1.5 text-[11.5px] font-semibold text-hero-faint">{label}</div>
      <div className="num text-[19px] font-bold text-[#ece8f0]">{value}</div>
    </div>
  );
}
