"use client";

import { useMemo, useState } from "react";
import { type CalcInputs, calculate, defaultInputs } from "@/lib/calc";
import { useSettings } from "@/lib/useSettings";
import FormCard from "./FormCard";
import Header from "./Header";
import KpiBanner from "./KpiBanner";
import SettingsModal from "./SettingsModal";
import StatGrid from "./StatGrid";

export default function Calculator() {
  const [inputs, setInputs] = useState<CalcInputs>(defaultInputs);
  const [settings, setSettings] = useSettings();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const result = useMemo(() => calculate(inputs, settings), [inputs, settings]);

  function setField<K extends keyof CalcInputs>(key: K, value: CalcInputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header onClear={() => setInputs(defaultInputs)} onOpenSettings={() => setSettingsOpen(true)} />

      <KpiBanner r={result} />

      <div className="grid flex-1 grid-cols-1 gap-5 px-4 pt-5 sm:gap-6 sm:px-6 sm:pt-6 lg:grid-cols-[400px_1fr] lg:px-14">
        <FormCard inputs={inputs} onChange={setField} />
        <StatGrid r={result} />
      </div>

      <div className="px-4 py-9 text-center text-xs text-faint">
        برگرفته از فرمول گمرکی ۱۴۰۵ پاوه &mdash; تمامی محاسبات مطابق فایل مرجع است.
      </div>

      <SettingsModal open={settingsOpen} settings={settings} onChange={setSettings} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}
