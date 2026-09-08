// دلار گمرکی currency options — سال ۱۴۰۵ rates only (۱۴۰۴ column is not used).
export interface Currency {
  key: string;
  label: string;
  rate1405: number;
}

export const currencies: Currency[] = [
  { key: "dollar", label: "دلار", rate1405: 1310661 },
  { key: "yuan", label: "یوان", rate1405: 188931 },
  { key: "euro", label: "یورو", rate1405: 1551964 },
  { key: "dirham", label: "درهم", rate1405: 356885 },
];

export const defaultCurrencyKey = "dollar";

export function getCurrencyRate(key: string): number {
  return currencies.find((c) => c.key === key)?.rate1405 ?? 0;
}
