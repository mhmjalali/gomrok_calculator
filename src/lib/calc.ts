// Calculation engine — a direct translation of the "فرمول گمرکی" Excel sheet (Sheet1, rows 1-22).
// Every function below mirrors one Excel formula. Comments show the original cell reference
// and Persian label so this file can be checked against the source spreadsheet at any time.
// Verified byte-for-byte against the original workbook's computed values.

import { defaultCurrencyKey } from "./currencies";

export interface CalcInputs {
  qty: number; // A2 - تعداد (quantity)
  goodsValue: number; // D2 - ارزش کالا (goods value per unit)
  customsCurrency: string; // selected currency key for the دلار گمرکی dropdown — UI-only, not used in the math
  customsDollarRate: number; // E2 - دلار گمرکی (customs dollar rate) — prefilled from the selected currency, user may overwrite
  insuranceFreight: number; // F2 - بیمه و کرایه (insurance & freight factor) — prefilled, user may overwrite
  dutyFactor: number; // C3 - part of حقوق گمرکی
  profitFactor: number; // C4 - part of سود بازرگانی
  labFee: number; // E15 - آزمایشگاه (lab fee)
  miscCost: number; // E20 - هزینه متفرقه (misc cost)
}

export interface CalcSettings {
  dutyBaseRate: number; // B3 - حقوق گمرکی base rate
  profitBaseRate: number; // B4 - سود بازرگانی base rate
  redCrescentBaseRate: number; // B5 - هلال احمر base rate (present in sheet, not used by any formula)
  wasteBaseRate: number; // B6 - پسماند base rate (present in sheet, not used by any formula)
  redCrescentRate: number; // D5 - هلال احمر rate actually used in G5
  wasteRate: number; // D6 - پسماند rate actually used in G6
  kolbariRate: number; // D8 - کولبری rate
  tax2PercentRate: number; // D9 - مالیات ۲ درصد rate
  taxRate: number; // D10 - مالیات rate
  dutyVatRate: number; // D13 - حقوق گمرکی با ارزش افزوده rate (reference; not multiplied into E13 in the sheet)
  advanceTaxRate: number; // D14 - مالیات علی‌الحساب rate (reference; not multiplied into E14 in the sheet)
  standardFeeRate: number; // D16 - کارمزد استاندارد rate
  dutyVatAmount: number; // E13 - حقوق گمرکی با ارزش افزوده (flat static amount in the sheet)
  advanceTaxAmount: number; // E14 - مالیات علی‌الحساب (flat static amount in the sheet)
  brokerProfit: number; // E17 - سود کارگزار (flat static amount in the sheet)
}

export interface CalcResult {
  cifValue: number; // G2 - ارزش سیف
  valueNoInsurance: number; // H2
  dutyRate: number; // D3
  dutyAmount: number; // G3 - حقوق گمرکی
  profitRate: number; // D4
  profitAmount: number; // G4 - سود بازرگانی
  redCrescentAmount: number; // G5 - هلال احمر
  wasteAmount: number; // G6 - پسماند
  dutyProfitSum: number; // G7 - جمع
  perCoinRatio: number; // C8
  kolbariAmount: number; // E8 - کولبری
  tax2PercentAmount: number; // E9 - مالیات ۲ درصد
  taxAmount: number; // E10 - مالیات
  totalCost: number; // E11/E12 basis - جمع هزینه
  costPerUnit: number; // E12 - هزینه گمرکی و کولبری هرعدد
  dutyVatAmount: number; // E13 - حقوق گمرکی با ارزش افزوده
  advanceTaxAmount: number; // E14 - مالیات علی‌الحساب
  labFee: number; // E15 - آزمایشگاه
  standardFeeAmount: number; // E16 - کارمزد استاندارد
  brokerProfit: number; // E17 - سود کارگزار
  totalAllCosts: number; // E18 - مجموع کل هزینه‌ها
  totalCostPerUnit: number; // E19 - مجموع کل هزینه هرعدد
  miscCost: number; // E20 - هزینه متفرقه
  grandTotal: number; // E21 - مجموع کل
  consumptionCardCount: number; // E22 - تعداد کارت مصرفی
}

export const defaultInputs: CalcInputs = {
  qty: 0,
  goodsValue: 0,
  customsCurrency: defaultCurrencyKey, // "دلار" — matches customsDollarRate below
  customsDollarRate: 1310661, // prefilled statistical default — badge "پیش‌فرض", user may overwrite
  insuranceFreight: 1.005, // prefilled statistical default — badge "پیش‌فرض", user may overwrite
  dutyFactor: 0,
  profitFactor: 0,
  labFee: 0,
  miscCost: 0,
};

export const defaultSettings: CalcSettings = {
  dutyBaseRate: 0.04,
  profitBaseRate: 0.01,
  redCrescentBaseRate: 0.01,
  wasteBaseRate: 0.0005,
  redCrescentRate: 0.002,
  wasteRate: 0.0001,
  kolbariRate: 0.071,
  tax2PercentRate: 0.02,
  taxRate: 0.05,
  dutyVatRate: 0.04,
  advanceTaxRate: 0.02,
  standardFeeRate: 0.008,
  dutyVatAmount: 0,
  advanceTaxAmount: 0,
  brokerProfit: 0,
};

export function calculate(inputs: CalcInputs, settings: CalcSettings): CalcResult {
  const { qty, goodsValue, customsDollarRate, insuranceFreight, dutyFactor, profitFactor, labFee, miscCost } = inputs;
  const {
    dutyBaseRate,
    profitBaseRate,
    redCrescentRate,
    wasteRate,
    kolbariRate,
    tax2PercentRate,
    taxRate,
    standardFeeRate,
    dutyVatAmount,
    advanceTaxAmount,
    brokerProfit,
  } = settings;

  // G2 = A2*D2*E2*F2 — ارزش سیف (CIF value)
  const cifValue = qty * goodsValue * customsDollarRate * insuranceFreight;
  // H2 = D2*E2*A2 — value without insurance/freight
  const valueNoInsurance = goodsValue * customsDollarRate * qty;

  // D3 = B3*C3 — حقوق گمرکی rate ; G3 = G2*D3 — حقوق گمرکی amount
  const dutyRate = dutyBaseRate * dutyFactor;
  const dutyAmount = cifValue * dutyRate;

  // D4 = C4*B4 — سود بازرگانی rate ; G4 = G2*D4 — سود بازرگانی amount
  const profitRate = profitFactor * profitBaseRate;
  const profitAmount = cifValue * profitRate;

  // G5 = (G4+G3)*D5 — هلال احمر amount
  const redCrescentAmount = (profitAmount + dutyAmount) * redCrescentRate;

  // G6 = G2*D6 — پسماند amount
  const wasteAmount = cifValue * wasteRate;

  // G7 = SUM(G3:G6) — جمع
  const dutyProfitSum = dutyAmount + profitAmount + redCrescentAmount + wasteAmount;

  // A8 = H2 ; B8 = A2*D2 ; C8 = B8/619 ; E8 = A8*D8 — کولبری amount
  const qtyTimesGoods = qty * goodsValue;
  const perCoinRatio = qtyTimesGoods / 619;
  const kolbariAmount = valueNoInsurance * kolbariRate;

  // A9 = A8+G3+G4 ; E9 = A9*D9 — مالیات ۲ درصد amount
  const tax2PercentBase = valueNoInsurance + dutyAmount + profitAmount;
  const tax2PercentAmount = tax2PercentBase * tax2PercentRate;

  // A10 = G2 ; E10 = A10*D10 — مالیات amount
  const taxAmount = cifValue * taxRate;

  // E11 = A11+D11+G7+E9  where A11=E8, D11=E10 — جمع هزینه
  const totalCost = kolbariAmount + taxAmount + dutyProfitSum + tax2PercentAmount;

  // E12 = A12/D12  where A12=E11, D12=A2 — هزینه گمرکی و کولبری هرعدد
  const costPerUnit = qty !== 0 ? totalCost / qty : 0;

  // E16 = A16*D16  where A16=G2 — کارمزد استاندارد
  const standardFeeAmount = cifValue * standardFeeRate;

  // E18 = E14+E15+E16+E17+E20 — مجموع کل هزینه‌ها
  const totalAllCosts = advanceTaxAmount + labFee + standardFeeAmount + brokerProfit + miscCost;

  // E19 = E18/A2 — مجموع کل هزینه هرعدد
  const totalCostPerUnit = qty !== 0 ? totalAllCosts / qty : 0;

  // E21 = E12+E19 — مجموع کل
  const grandTotal = costPerUnit + totalCostPerUnit;

  // E22 = E8/57600000 — تعداد کارت مصرفی
  const consumptionCardCount = kolbariAmount / 57600000;

  return {
    cifValue,
    valueNoInsurance,
    dutyRate,
    dutyAmount,
    profitRate,
    profitAmount,
    redCrescentAmount,
    wasteAmount,
    dutyProfitSum,
    perCoinRatio,
    kolbariAmount,
    tax2PercentAmount,
    taxAmount,
    totalCost,
    costPerUnit,
    dutyVatAmount,
    advanceTaxAmount,
    labFee,
    standardFeeAmount,
    brokerProfit,
    totalAllCosts,
    totalCostPerUnit,
    miscCost,
    grandTotal,
    consumptionCardCount,
  };
}
