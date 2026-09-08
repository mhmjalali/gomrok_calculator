import type { CalcResult } from "@/lib/calc";
import { fmtInt } from "@/lib/format";
import type { ComponentType, SVGProps } from "react";
import { IconBox, IconCoin, IconDocument, IconDots, IconFlask, IconPercent, IconShield } from "./icons";

interface StatCardDef {
  label: string;
  hint: string;
  value: number;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export default function StatGrid({ r }: { r: CalcResult }) {
  const cards: StatCardDef[] = [
    { label: "حقوق گمرکی", hint: "G3", value: r.dutyAmount, Icon: IconPercent },
    { label: "سود بازرگانی", hint: "G4", value: r.profitAmount, Icon: IconCoin },
    { label: "هلال احمر", hint: "G5", value: r.redCrescentAmount, Icon: IconShield },
    { label: "پسماند", hint: "G6", value: r.wasteAmount, Icon: IconDots },
    { label: "کولبری", hint: "E8", value: r.kolbariAmount, Icon: IconBox },
    { label: "مالیات ۲ درصد", hint: "E9", value: r.tax2PercentAmount, Icon: IconDocument },
    { label: "مالیات", hint: "E10", value: r.taxAmount, Icon: IconDocument },
    { label: "کارمزد استاندارد", hint: "E16", value: r.standardFeeAmount, Icon: IconCoin },
    { label: "آزمایشگاه", hint: "E15", value: r.labFee, Icon: IconFlask },
  ];

  return (
    <div>
      <h2 className="mb-3.5 text-[15.5px] font-bold">اجزای هزینه</h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-3.5">
        {cards.map((c) => (
          <StatCard key={c.hint} {...c} />
        ))}
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:mt-3.5 sm:grid-cols-2 sm:gap-3.5">
        <SecondaryStat label="هزینه گمرکی و کولبری هرعدد" hint="E12" value={r.costPerUnit} />
        <SecondaryStat label="مجموع کل هزینه هرعدد" hint="E19" value={r.totalCostPerUnit} />
      </div>
    </div>
  );
}

function StatCard({ label, hint, value, Icon }: StatCardDef) {
  const isZero = value === 0;
  return (
    <div className="rounded-[13px] border border-border bg-surface px-3.5 py-3.5 sm:px-[18px] sm:py-4">
      <div className="mb-2 flex items-center gap-1.5 text-primary sm:mb-2.5">
        <Icon />
        <span className="text-[11px] font-semibold text-muted sm:text-xs">{label}</span>
      </div>
      <div className={`num text-[19px] font-extrabold ${isZero ? "text-faint" : "text-ink"}`}>{fmtInt(value)}</div>
      <div className="mt-0.5 font-mono text-[9px] text-[#c2bcc9]">{hint}</div>
    </div>
  );
}

function SecondaryStat({ label, hint, value }: { label: string; hint: string; value: number }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-[13px] border border-border bg-surface px-4 py-3.5 sm:px-[18px] sm:py-4">
      <span className="text-[12.5px] font-semibold text-muted">
        {label} <span className="font-mono text-[10px] text-faint">&middot; {hint}</span>
      </span>
      <span className="num text-base font-bold">{fmtInt(value)}</span>
    </div>
  );
}
