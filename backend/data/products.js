export const products = [
  {
    id: "personal-loan",
    name: "Personal Loan",
    annualRate: 12,
    minAmount: 50000,
    maxAmount: 1000000,
    minIncome: 25000,
    minTenure: 12,
    maxTenure: 60,
    employmentTypes: ["SALARIED", "SELF_EMPLOYED"],
    purposes: ["HOME_RENOVATION", "MEDICAL", "EDUCATION", "TRAVEL", "OTHER"]
  },
  {
    id: "salary-advance",
    name: "Salary Advance",
    annualRate: 15,
    minAmount: 10000,
    maxAmount: 200000,
    minIncome: 20000,
    minTenure: 3,
    maxTenure: 12,
    employmentTypes: ["SALARIED"],
    purposes: ["MEDICAL", "EMERGENCY", "OTHER"]
  },
  {
    id: "bnpl",
    name: "BNPL",
    annualRate: 18,
    minAmount: 5000,
    maxAmount: 100000,
    minIncome: 15000,
    minTenure: 3,
    maxTenure: 12,
    employmentTypes: ["SALARIED", "SELF_EMPLOYED"],
    purposes: ["PURCHASE", "OTHER"]
  },
  {
    id: "sme-loan",
    name: "SME Loan",
    annualRate: 14,
    minAmount: 100000,
    maxAmount: 2000000,
    minIncome: 40000,
    minTenure: 12,
    maxTenure: 60,
    employmentTypes: ["SELF_EMPLOYED"],
    purposes: ["BUSINESS"]
  },
  {
    id: "secured-loan",
    name: "Secured Loan",
    annualRate: 10,
    minAmount: 200000,
    maxAmount: 5000000,
    minIncome: 30000,
    minTenure: 12,
    maxTenure: 120,
    employmentTypes: ["SALARIED", "SELF_EMPLOYED"],
    purposes: ["HOME_RENOVATION", "EDUCATION", "BUSINESS", "OTHER"]
  }
];