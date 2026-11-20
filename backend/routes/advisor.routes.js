import express from "express";
import {
  findEligibleProducts,
  selectRecommendedProduct
} from "../services/eligibility.service.js";
import { calculateEMI } from "../services/emi.service.js";
import { getAdvisorExplanation } from "../services/llm.service.js";

const router = express.Router();

router.post("/recommend", async (req, res) => {
  try {
    const profile = {
      loanAmount: Number(req.body.loanAmount),
      purpose: req.body.purpose,
      monthlyIncome: Number(req.body.monthlyIncome),
      existingEMI: Number(req.body.existingEMI),
      preferredTenure: Number(req.body.preferredTenure),
      employmentType: req.body.employmentType,
      riskProfile: req.body.riskProfile
    };

    if (
      !profile.loanAmount ||
      profile.loanAmount <= 0 ||
      !profile.monthlyIncome ||
      profile.monthlyIncome <= 0 ||
      profile.existingEMI < 0 ||
      !profile.preferredTenure ||
      profile.preferredTenure <= 0 ||
      !profile.employmentType
    ) {
      return res.status(400).json({
        error: "Please provide valid borrower information."
      });
    }

    if (profile.existingEMI > profile.monthlyIncome) {
      return res.status(400).json({
        error: "Existing EMI cannot exceed monthly income."
      });
    }

    const eligibleProducts = findEligibleProducts(profile);

    const recommendedProduct =
      selectRecommendedProduct(eligibleProducts, profile);

    if (!recommendedProduct) {
      return res.status(200).json({
        eligible: false,
        message:
          "No suitable product was found under the current mock eligibility rules.",
        disclaimer:
          "This is an indicative assessment only. Final eligibility depends on underwriting and verification."
      });
    }

    const calculation = calculateEMI(
      profile.loanAmount,
      recommendedProduct.annualRate,
      profile.preferredTenure
    );

    let advisorMessage;

    try {
      advisorMessage = await getAdvisorExplanation({
        profile,
        product: recommendedProduct,
        calculation
      });
    } catch (error) {
      console.error("LLM unavailable:", error.message);

      advisorMessage =
        `${recommendedProduct.name} is the best matching product under ` +
        `the current mock eligibility rules. Your estimated monthly EMI is ` +
        `INR ${calculation.emi}. AI explanation is temporarily unavailable.`;
    }

    return res.json({
      eligible: true,

      recommendedProduct: {
        id: recommendedProduct.id,
        name: recommendedProduct.name,
        annualRate: recommendedProduct.annualRate
      },

      calculation,

      eligibleProducts: eligibleProducts.map((product) => ({
        id: product.id,
        name: product.name,
        annualRate: product.annualRate
      })),

      advisorMessage,

      disclaimer:
        "This is an indicative recommendation. Final approval, rate and eligibility depend on underwriting and verification."
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Unable to generate a loan recommendation."
    });
  }
});

export default router;