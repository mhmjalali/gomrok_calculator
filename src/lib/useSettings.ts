"use client";

import { useCallback, useSyncExternalStore } from "react";
import { type CalcSettings, defaultSettings } from "./calc";

const STORAGE_KEY = "gomrok-calc-settings-v1";

type Listener = () => void;
let listeners: Listener[] = [];
let cache: CalcSettings | null = null;

function readFromStorage(): CalcSettings {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSettings;
    return { ...defaultSettings, ...JSON.parse(raw) };
  } catch {
    return defaultSettings;
  }
}

function subscribe(listener: Listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot(): CalcSettings {
  if (cache === null) cache = readFromStorage();
  return cache;
}

function getServerSnapshot(): CalcSettings {
  return defaultSettings;
}

function writeSettings(next: CalcSettings) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // localStorage may be unavailable (private mode, disabled) — the app still works,
    // settings just won't persist across reloads.
  }
  for (const listener of listeners) listener();
}

/**
 * Settings are a per-browser preference stored in localStorage. useSyncExternalStore
 * renders `defaultSettings` on the server and during the initial client pass, then
 * reconciles with the real stored value — the React-recommended way to read an
 * external browser store without a hydration mismatch or a setState-in-effect.
 */
export function useSettings() {
  const settings = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const setSettings = useCallback((next: CalcSettings) => writeSettings(next), []);
  return [settings, setSettings] as const;
}
