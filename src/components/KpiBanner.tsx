import type { CalcResult } from "@/lib/calc";
import { fmtDecimal, fmtInt } from "@/lib/format";
import { IconReceipt } from "./icons";

export default function KpiBanner({ r }: { r: CalcResult }) {
  return (
    <div className="mx-14 mt-8 flex items-center rounded-[18px] bg-hero px-8 py-[26px] shadow-[0_8px_22px_rgba(36,31,46,0.16)]">
      <div className="flex items-center gap-3.5 border-l border-hero-line pl-8">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[13px] bg-[rgba(184,134,59,0.2)] text-gold">
          <IconReceipt />
        </div>
        <div>
          <div className="mb-1 text-[13px] font-semibold text-hero-muted">مجموع کل &middot; E21</div>
          <div className="num text-[32px] font-extrabold text-hero-text">{fmtInt(r.grandTotal)}</div>
        </div>
      </div>

      <div className="flex flex-1 justify-around pr-2">
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
