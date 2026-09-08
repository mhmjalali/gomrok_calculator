"use client";

import { IconGear, IconTrash } from "./icons";

interface HeaderProps {
  onClear: () => void;
  onOpenSettings: () => void;
}

export default function Header({ onClear, onOpenSettings }: HeaderProps) {
  return (
    <div className="flex h-[76px] items-center justify-between border-b border-border bg-surface px-14">
      <h1 className="text-[19px] font-extrabold">
        محاسبه‌گر فرمول گمرکی{" "}
        <span className="text-sm font-medium text-faint">&middot; پاوه ۱۴۰۵</span>
      </h1>
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-1.5 rounded-[9px] border border-border bg-surface px-4 py-2.5 text-[13.5px] font-semibold text-ink transition-colors hover:bg-primary-tint hover:border-primary"
        >
          <IconTrash />
          پاک کردن
        </button>
        <button
          type="button"
          onClick={onOpenSettings}
          className="flex items-center gap-1.5 rounded-[9px] border border-transparent bg-primary px-4 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          <IconGear />
          تنظیمات
        </button>
      </div>
    </div>
  );
}
