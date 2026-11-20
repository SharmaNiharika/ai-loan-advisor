const LLM_URL =
  "https://llm-wrapper-741152993481.asia-south1.run.app/llm/query";

export async function getAdvisorExplanation({
  profile,
  product,
  calculation
}) {
  const prompt = `
You are a responsible AI loan advisory assistant.

Use ONLY the information supplied below.
Do not invent lending products, interest rates, fees, eligibility rules,
approval probabilities, or financial calculations.

Never guarantee approval.

BORROWER PROFILE
Loan amount: INR ${profile.loanAmount}
Purpose: ${profile.purpose}
Monthly income: INR ${profile.monthlyIncome}
Existing EMI: INR ${profile.existingEMI}
Employment type: ${profile.employmentType}
Preferred tenure: ${profile.preferredTenure} months
Risk profile: ${profile.riskProfile}

SELECTED PRODUCT
Product: ${product.name}
Annual interest rate: ${product.annualRate}%
Allowed loan amount: INR ${product.minAmount} to INR ${product.maxAmount}
Minimum monthly income: INR ${product.minIncome}
Allowed tenure: ${product.minTenure} to ${product.maxTenure} months
Allowed employment types: ${product.employmentTypes.join(", ")}

The application's deterministic eligibility engine has already determined
that this borrower satisfies the mock eligibility rules above.

Do NOT independently reassess eligibility.
Do NOT introduce eligibility requirements that are not supplied here.

CALCULATED BY OUR APPLICATION
Monthly EMI: INR ${calculation.emi}
Total interest: INR ${calculation.totalInterest}
Total repayment: INR ${calculation.totalRepayment}

Explain the recommendation concisely using this exact structure:

WHY THIS PRODUCT MATCHES
- Explain why the loan amount qualifies.
- Explain why the income qualifies.
- Explain why the tenure qualifies.
- Explain why the employment type qualifies.

YOUR REPAYMENT
- Explain the monthly EMI.
- Explain total interest and total repayment.
- Mention that the new EMI is in addition to the existing EMI.

TENURE TRADE-OFF
- Explain the benefit and drawback of a shorter tenure.
- Explain the benefit and drawback of a longer tenure.

Formatting requirements:
- Return plain text only.
- Do NOT use Markdown.
- Do NOT use asterisks.
- Do NOT use # heading markers.
- Do NOT use HTML.
- Use simple headings and hyphen bullets only.
- Keep the response concise.
- Do not alter any calculated values.
- Do not provide an approval disclaimer because the application displays
  its own fixed disclaimer separately.
`.trim();

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 15000);

  try {
    const response = await fetch(LLM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LLM_API_TOKEN}`
      },
      body: JSON.stringify({ prompt }),
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(
        `LLM service returned ${response.status}`
      );
    }

    const data = await response.json();

    return (
      data.response ||
      data.result ||
      data.answer ||
      data.text ||
      data.message ||
      JSON.stringify(data)
    );
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(
        "LLM request timed out after 15 seconds"
      );
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}