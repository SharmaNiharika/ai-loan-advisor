export function calculateEMI(principal, annualRate, months) {
  if (principal <= 0 || annualRate < 0 || months <= 0) {
    throw new Error("Invalid EMI calculation parameters");
  }

  const monthlyRate = annualRate / 12 / 100;

  let emi;

  if (monthlyRate === 0) {
    emi = principal / months;
  } else {
    emi =
      (principal *
        monthlyRate *
        Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
  }

  const totalRepayment = emi * months;
  const totalInterest = totalRepayment - principal;

  return {
    emi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalRepayment: Math.round(totalRepayment)
  };
}
