// Number formatting helpers — mirrors Excel's #,##0 style used throughout Sheet1.

export function fmtInt(value: number): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "۰";
  return Math.round(value).toLocaleString("en-US");
}

export function fmtDecimal(value: number, digits = 4): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "0";
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  });
}

// Parses a user-typed numeric string (allows empty -> 0, stray commas, Persian digits).
const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
export function parseNumber(str: string): number {
  if (str === "" || str === null || str === undefined) return 0;
  let normalized = String(str).replace(/,/g, "");
  normalized = normalized.replace(/[۰-۹]/g, (d) => String(persianDigits.indexOf(d)));
  const n = parseFloat(normalized);
  return Number.isNaN(n) ? 0 : n;
}
