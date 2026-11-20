import { products } from "../data/products.js";

export function findEligibleProducts(profile) {
  const debtToIncomeRatio =
    profile.monthlyIncome > 0
      ? profile.existingEMI / profile.monthlyIncome
      : 1;

  // Mock affordability rule for prototype purposes only.
  if (debtToIncomeRatio > 0.4) {
    return [];
  }

  return products.filter((product) => {
    const amountEligible =
      profile.loanAmount >= product.minAmount &&
      profile.loanAmount <= product.maxAmount;

    const incomeEligible =
      profile.monthlyIncome >= product.minIncome;

    const tenureEligible =
      profile.preferredTenure >= product.minTenure &&
      profile.preferredTenure <= product.maxTenure;

    const employmentEligible =
      product.employmentTypes.includes(profile.employmentType);

    const purposeEligible =
      product.purposes.includes(profile.purpose);

    return (
      amountEligible &&
      incomeEligible &&
      tenureEligible &&
      employmentEligible &&
      purposeEligible
    );
  });
}

export function selectRecommendedProduct(products, profile) {
  if (!products.length) {
    return null;
  }

  // Prefer an unsecured personal loan for standard personal borrowing.
  // Secured lending would require explicit collateral information,
  // which this prototype does not currently collect.
  const personalPurposes = [
    "HOME_RENOVATION",
    "MEDICAL",
    "EDUCATION",
    "TRAVEL",
    "OTHER"
  ];

  if (personalPurposes.includes(profile.purpose)) {
    const personalLoan = products.find(
      (product) => product.id === "personal-loan"
    );

    if (personalLoan) {
      return personalLoan;
    }
  }

  // For other eligible options, select the lowest available rate.
  return [...products].sort(
    (a, b) => a.annualRate - b.annualRate
  )[0];
}