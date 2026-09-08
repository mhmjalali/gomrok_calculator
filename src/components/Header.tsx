"use client";

import { IconGear, IconTrash } from "./icons";

interface HeaderProps {
  onClear: () => void;
  onOpenSettings: () => void;
}

export default function Header({ onClear, onOpenSettings }: HeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface px-4 py-3 sm:px-6 lg:h-[76px] lg:px-14 lg:py-0">
      <h1 className="text-base sm:text-[19px] font-extrabold">
        محاسبه‌گر فرمول گمرکی{" "}
        <span className="text-xs sm:text-sm font-medium text-faint">&middot; پاوه ۱۴۰۵</span>
      </h1>
      <div className="flex items-center gap-2 sm:gap-2.5">
        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-1.5 rounded-[9px] border border-border bg-surface px-3 py-2 sm:px-4 sm:py-2.5 text-[13.5px] font-semibold text-ink transition-colors hover:bg-primary-tint hover:border-primary"
        >
          <IconTrash />
          <span className="hidden sm:inline">پاک کردن</span>
        </button>
        <button
          type="button"
          onClick={onOpenSettings}
          className="flex items-center gap-1.5 rounded-[9px] border border-transparent bg-primary px-3 py-2 sm:px-4 sm:py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          <IconGear />
          <span className="hidden sm:inline">تنظیمات</span>
        </button>
      </div>
    </div>
  );
}
