import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, purpose: "buy" | "rent" = "buy"): string {
  if (purpose === "rent") {
    if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} L/mo`;
    }
    return `₹${price.toLocaleString("en-IN")}/mo`;
  }

  if (price >= 10000000) {
    const cr = price / 10000000;
    return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2)} Cr`;
  }

  if (price >= 100000) {
    const lk = price / 100000;
    return `₹${lk % 1 === 0 ? lk.toFixed(0) : lk.toFixed(1)} L`;
  }

  return `₹${price.toLocaleString("en-IN")}`;
}

export function formatNumber(num: number): string {
  return num.toLocaleString("en-IN");
}

export interface EMICalculationResult {
  loanAmount: number;
  monthlyEMI: number;
  totalInterest: number;
  totalPayment: number;
  interestRatio: number;
  principalRatio: number;
}

export function calculateMortgageEMI(
  propertyPrice: number,
  downPaymentPercent: number = 20,
  annualInterestRate: number = 8.5,
  loanTenureYears: number = 20
): EMICalculationResult {
  const downPayment = (propertyPrice * downPaymentPercent) / 100;
  const principal = Math.max(0, propertyPrice - downPayment);
  const monthlyRate = annualInterestRate / 12 / 100;
  const numberOfMonths = loanTenureYears * 12;

  if (principal <= 0 || monthlyRate <= 0 || numberOfMonths <= 0) {
    return {
      loanAmount: 0,
      monthlyEMI: 0,
      totalInterest: 0,
      totalPayment: 0,
      interestRatio: 0,
      principalRatio: 100,
    };
  }

  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
    (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

  const totalPayment = emi * numberOfMonths;
  const totalInterest = Math.max(0, totalPayment - principal);

  const principalRatio = Math.round((principal / totalPayment) * 100) || 50;
  const interestRatio = 100 - principalRatio;

  return {
    loanAmount: Math.round(principal),
    monthlyEMI: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
    interestRatio,
    principalRatio,
  };
}
