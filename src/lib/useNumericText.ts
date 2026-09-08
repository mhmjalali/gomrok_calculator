import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { parseNumber } from "./format";

// Only allow characters that can appear while typing a plain (non-negative) number:
// digits (Latin or Persian), a single decimal point, and thousands commas.
const TYPING_PATTERN = /^[0-9۰-۹,]*\.?[0-9۰-۹,]*$/;

/**
 * Keeps a number input's raw text under the user's control while typing, so an
 * in-progress value like "0." or "1.50" isn't immediately collapsed back to "0"
 * or "1.5" mid-keystroke (which would happen if the input were bound directly
 * to the parsed numeric value). Re-syncs from the outside only when `value`
 * changes for a reason other than this hook's own `onChange` call.
 */
export function useNumericText(value: number, onChange: (value: number) => void) {
  const [text, setText] = useState(() => (Number.isNaN(value) ? "" : String(value)));
  const lastValue = useRef(value);

  useEffect(() => {
    if (value !== lastValue.current) {
      lastValue.current = value;
      setText(Number.isNaN(value) ? "" : String(value));
    }
  }, [value]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    if (!TYPING_PATTERN.test(raw)) return; // ignore keystrokes that can't be part of a number

    setText(raw);
    const parsed = parseNumber(raw);
    lastValue.current = parsed;
    onChange(parsed);
  }

  return { text, handleChange };
}
