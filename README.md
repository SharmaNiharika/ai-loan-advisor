# AI Loan Advisor

AI Loan Advisor is an AI\-powered lending advisory prototype that evaluates a borrower's financial profile, recommends a suitable lending product from a mock product catalog, calculates repayment metrics, and provides a grounded AI\-generated explanation.

The project demonstrates how generative AI can be incorporated into a FinTech lending workflow while keeping financial calculations and eligibility decisions deterministic, explainable, and auditable.

The key design principle is:

**Application code makes financial decisions. AI explains those decisions.**

The LLM does not calculate EMI, determine eligibility, choose interest rates, or guarantee approval.

---

## Features

- Borrower financial\-profile capture
- Mock lending product catalog
- Deterministic eligibility evaluation
- Loan\-purpose\-based product filtering
- Existing EMI\-to\-income affordability check
- Product recommendation logic
- EMI calculation
- Total interest calculation
- Total repayment calculation
- AI\-generated recommendation explanation
- Shorter vs. longer tenure trade\-off explanation
- Grounded LLM prompting
- Hallucination safeguards
- Responsible lending disclaimer
- LLM timeout handling
- Graceful AI\-service fallback
- Form validation
- Error and no\-eligibility states
- Responsive Angular UI

---

## Tech Stack

### Frontend

- Angular
- TypeScript
- Angular Reactive Forms
- Angular HttpClient
- Angular Signals
- HTML
- CSS

### Backend

- Node.js
- Express.js
- JavaScript
- REST API
- dotenv
- CORS

### AI Integration

The backend integrates with the LLM wrapper supplied as part of the assessment.

The LLM is used only to transform validated financial information into a concise, user\-friendly explanation.

It does **not** perform financial calculations or underwriting decisions.

---

## System Architecture

\+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\+

\|      Angular UI       \|

\|      Port 4200        \|

\+\-\-\-\-\-\-\-\-\-\-\-\+\-\-\-\-\-\-\-\-\-\-\-\+

            \|

            \| POST /api/advisor/recommend

            \|

            v

\+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\+

\|   Node.js / Express   \|

\|      Port 3000        \|

\+\-\-\-\-\-\-\-\-\-\-\-\+\-\-\-\-\-\-\-\-\-\-\-\+

            \|

            \+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\+

            \|                        \|

            v                        v

\+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\+   \+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\+

\| Eligibility Engine   \|   \|   Product Catalog    \|

\|                      \|   \|                      \|

\| \- Amount             \|   \| \- Personal Loan      \|

\| \- Income             \|   \| \- Salary Advance     \|

\| \- Tenure             \|   \| \- BNPL               \|

\| \- Employment         \|   \| \- SME Loan           \|

\| \- Purpose            \|   \| \- Secured Loan       \|

\| \- Affordability      \|   \|                      \|

\+\-\-\-\-\-\-\-\-\-\-\+\-\-\-\-\-\-\-\-\-\-\-\+   \+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\+

            \|

            v

\+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\+

\| Recommendation Logic \|

\+\-\-\-\-\-\-\-\-\-\-\-\+\-\-\-\-\-\-\-\-\-\-\-\+

            \|

            v

\+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\+

\|    EMI Calculator     \|

\|                       \|

\| \- Monthly EMI         \|

\| \- Total Interest      \|

\| \- Total Repayment     \|

\+\-\-\-\-\-\-\-\-\-\-\-\+\-\-\-\-\-\-\-\-\-\-\-\+

            \|

            v

\+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\+

\| Grounded Prompt       \|

\| Builder               \|

\+\-\-\-\-\-\-\-\-\-\-\-\+\-\-\-\-\-\-\-\-\-\-\-\+

            \|

            v

\+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\+

\| Provided LLM Wrapper  \|

\+\-\-\-\-\-\-\-\-\-\-\-\+\-\-\-\-\-\-\-\-\-\-\-\+

            \|

            v

\+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\+

\| AI Explanation \+      \|

\| Fixed Disclaimer      \|

\+\-\-\-\-\-\-\-\-\-\-\-\+\-\-\-\-\-\-\-\-\-\-\-\+

            \|

            v

\+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\+

\| Angular Result UI     \|

\+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\+

---

## Design Approach

A major architectural decision in this project is separating **deterministic financial logic** from **generative AI**.

A lending application should not rely on an LLM to calculate repayment values or independently decide borrower eligibility.

Therefore, the application performs the following steps before contacting the LLM:

1. Validate borrower input.
2. Evaluate the borrower against mock eligibility rules.
3. Find eligible products.
4. Select an appropriate product.
5. Calculate EMI.
6. Calculate total interest.
7. Calculate total repayment.
8. Build a grounded LLM prompt containing only validated information.
9. Ask the LLM to explain the recommendation.

The LLM therefore acts as an **explanation layer**, rather than a financial decision engine.

This improves:

- Predictability
- Auditability
- Calculation correctness
- Explainability
- Hallucination resistance
- Responsible AI behavior

---

## Project Structure

ai\-loan\-advisor/

\|

├── backend/

\|   \|

\|   ├── data/

\|   \|   └── products.js

\|   \|

\|   ├── routes/

\|   \|   └── advisor.routes.js

\|   \|

\|   ├── services/

\|   \|   ├── emi.service.js

\|   \|   ├── eligibility.service.js

\|   \|   └── llm.service.js

\|   \|

\|   ├── .env.example

\|   ├── .gitignore

\|   ├── package.json

\|   └── server.js

\|

├── frontend/

\|   \|

\|   ├── src/

\|   \|   └── app/

\|   \|       \|

\|   \|       ├── services/

\|   \|       \|   └── loan\-advisor.service.ts

\|   \|       \|

\|   \|       ├── app.ts

\|   \|       ├── app.html

\|   \|       ├── app.css

\|   \|       ├── app.config.ts

\|   \|       └── app.routes.ts

\|   \|

\|   ├── angular.json

\|   └── package.json

\|

├── .gitignore

└── README.md

---

# Mock Product Catalog

The application uses mock lending products for demonstration purposes.

The catalog contains:

- Personal Loan
- Salary Advance
- BNPL
- SME Loan
- Secured Loan

Each product contains rules such as:

- Minimum loan amount
- Maximum loan amount
- Minimum monthly income
- Minimum tenure
- Maximum tenure
- Supported employment types
- Supported loan purposes
- Mock annual interest rate

These values are intentionally illustrative and are **not real lending policies or underwriting criteria**.

---

## Example Mock Products

| Product | Mock Annual Rate | Intended Usage |
| --- | --- | --- |
| Personal Loan | 12% | General personal borrowing |
| Salary Advance | 15% | Smaller short\-term salaried borrowing |
| BNPL | 18% | Smaller purchase financing |
| SME Loan | 14% | Business borrowing |
| Secured Loan | 10% | Larger borrowing where security/collateral may apply |

---

# Eligibility Logic

Eligibility is evaluated by application code rather than the LLM.

The engine considers:

- Loan amount
- Monthly income
- Existing EMI
- Preferred tenure
- Employment type
- Loan purpose

The prototype also applies a mock affordability check.

Existing EMI / Monthly Income

If the borrower's existing EMI exceeds **40% of monthly income**, the prototype returns no suitable product.

Example:

Monthly Income = INR 50,000

Existing EMI   = INR 25,000

25,000 / 50,000 = 50%

Because 50% exceeds the prototype's 40% threshold, no recommendation is returned.

The 40% value is strictly a **prototype assumption** and should not be interpreted as an actual lender underwriting policy.

---

# Product Recommendation Logic

Eligibility and recommendation are intentionally separate concepts.

A product must first pass the eligibility rules.

For normal personal borrowing purposes such as:

- Home renovation
- Medical expenses
- Education
- Travel
- Other personal purposes

the system prefers an eligible **Personal Loan**.

This prevents the application from recommending a Secured Loan purely because it happens to have the lowest mock interest rate.

A production secured\-loan workflow should capture and validate collateral information before determining suitability.

For other scenarios, such as business borrowing, suitable products are evaluated using the mock product catalog.

---

# EMI Calculation

All monetary calculations are performed by deterministic application code.

The LLM never calculates EMI.

The application uses the standard reducing\-balance EMI formula:

              P × r × (1 \+ r)^n

EMI = \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-

             (1 \+ r)^n \- 1

Where:

P = Principal loan amount

r = Monthly interest rate

n = Number of monthly installments

The monthly interest rate is derived from the annual interest rate:

Monthly Rate = Annual Rate / 12 / 100

The application then calculates:

Total Repayment = EMI × Number of Months

Total Interest = Total Repayment \- Principal

---

## Example Calculation

For the default demonstration profile:

Loan Amount       : INR 500,000

Annual Rate       : 12%

Tenure            : 36 months

Employment        : Salaried

Purpose           : Home Renovation

Monthly Income    : INR 80,000

Existing EMI      : INR 12,000

The application calculates approximately:

Monthly EMI       : INR 16,607

Total Interest    : INR 97,858

Total Repayment   : INR 597,858

Displayed values are rounded to whole currency units.

---

# AI Strategy

The AI component is deliberately positioned after deterministic financial processing.

The LLM receives:

- Validated borrower information
- Selected product
- Product interest rate
- Relevant product eligibility constraints
- Calculated EMI
- Calculated total interest
- Calculated total repayment

It does not receive responsibility for deciding these values.

---

## Prompt Grounding Strategy

The prompt explicitly instructs the model to:

- Use only information supplied by the application
- Never invent lending products
- Never invent interest rates
- Never invent fees
- Never invent eligibility criteria
- Never independently reassess eligibility
- Never modify EMI calculations
- Never modify total repayment values
- Never provide approval probabilities
- Never guarantee approval
- Explain the recommendation concisely
- Explain the shorter vs. longer tenure trade\-off
- Return plain text rather than uncontrolled HTML

The product rules used by the deterministic eligibility engine are also provided to the model so it can explain **why** a borrower matched the selected product without inventing requirements.

---

# Hallucination Safeguards

The application uses several safeguards.

## 1\. Deterministic Financial Calculations

EMI, total interest, and total repayment are calculated in JavaScript.

The model only receives the final values.

## 2\. Deterministic Eligibility

The LLM is never asked:

Does this borrower qualify?

Application code determines eligibility before the LLM is called.

## 3\. Grounded Product Information

The selected product and relevant eligibility rules are explicitly passed to the model.

## 4\. Prompt Constraints

The prompt prohibits creating unsupported:

- Rates
- Products
- Fees
- Eligibility requirements
- Calculations
- Approval probabilities

## 5\. Application\-Controlled Disclaimer

The final responsible\-lending disclaimer is displayed by the application instead of relying on the LLM to generate it correctly.

## 6\. Graceful AI Failure

The lending calculation does not depend on the availability of the LLM.

If the AI service fails, the deterministic recommendation and repayment values can still be returned.

---

# Responsible AI

The assistant never guarantees approval.

The UI displays a fixed disclaimer:

**Important:** This is an indicative recommendation. Final approval, rate and eligibility depend on underwriting and verification.

The prototype provides educational lending guidance rather than making an actual credit decision.

A production implementation would require formal validation with legal, compliance, risk, underwriting, and model\-governance stakeholders.

---

# LLM Failure Handling

The LLM integration includes a request timeout.

If the LLM API is unavailable or exceeds the configured timeout:

1. Eligibility remains available.
2. The selected product remains available.
3. EMI calculations remain available.
4. Total interest remains available.
5. Total repayment remains available.
6. A deterministic fallback explanation is returned.

This avoids making generative AI a single point of failure for the lending workflow.

---

# Security and Privacy

Financial\-profile data is sensitive and requires careful handling.

## API Token Security

The LLM API token is stored exclusively in the backend environment.

Angular Browser

      \|

      v

Express Backend

      \|

      v

LLM API

The Angular application never receives the LLM credential.

The local .env file is excluded from Git.

An .env.example file documents required environment variables without exposing actual secrets.

---

## Production Security

For a production implementation, the following controls should be introduced:

- OAuth 2.0 / OpenID Connect authentication
- JWT or secure session management
- Per\-user authorization
- User\-level conversation isolation
- Encryption in transit using TLS
- Encryption of sensitive data at rest
- Cloud secrets management
- API rate limiting
- Input sanitization
- Sensitive\-data minimization
- PII masking where appropriate
- Audit logging
- Security monitoring
- Data\-retention policies
- Access\-control reviews

Chat history and financial data would always be scoped to the authenticated user.

---

# API Endpoints

## Health Check

GET /api/health

Example:

\{

  "status": "ok",

  "service": "AI Loan Advisor API"

\}

---

## Generate Loan Recommendation

POST /api/advisor/recommend

### Example Request

\{

  "loanAmount": 500000,

  "purpose": "HOME\_RENOVATION",

  "monthlyIncome": 80000,

  "existingEMI": 12000,

  "preferredTenure": 36,

  "employmentType": "SALARIED",

  "riskProfile": "MEDIUM"

\}

### Example Response Structure

\{

  "eligible": true,

  "recommendedProduct": \{

    "id": "personal\-loan",

    "name": "Personal Loan",

    "annualRate": 12

  \},

  "calculation": \{

    "emi": 16607,

    "totalInterest": 97858,

    "totalRepayment": 597858

  \},

  "eligibleProducts": [],

  "advisorMessage": "Grounded AI explanation...",

  "disclaimer": "This is an indicative recommendation. Final approval, rate and eligibility depend on underwriting and verification."

\}

---

# Local Setup

## Prerequisites

Install:

- Node.js
- npm
- Angular CLI
- Git

An API token for the supplied LLM wrapper is also required.

---

# Backend Setup

Navigate to the backend:

cd backend

Install dependencies:

npm install

Create:

.env

using .env.example as the template:

LLM\_API\_TOKEN=your\_api\_token\_here

PORT=3000

Start the backend:

npm run dev

The API runs at:

[http://localhost:3000](http://localhost:3000)

Verify:

[http://localhost:3000/api/health](http://localhost:3000/api/health)

---

# Frontend Setup

Open another terminal.

Navigate to:

cd frontend

Install dependencies:

npm install

Start Angular:

ng serve

Open:

[http://localhost:4200](http://localhost:4200)

---

# Example User Flow

1. User enters the required loan amount.
2. User selects the borrowing purpose.
3. User provides monthly income.
4. User provides existing EMI.
5. User selects preferred tenure.
6. User selects employment type.
7. User provides the prototype risk profile.
8. Angular validates the form.
9. Angular submits the borrower profile to Express.
10. The backend evaluates product eligibility.
11. The recommendation logic selects the appropriate eligible product.
12. The EMI calculator calculates repayment metrics.
13. The backend constructs a grounded prompt.
14. The LLM explains the validated recommendation.
15. Angular displays the product, repayment metrics, AI explanation, and disclaimer.

---

# Test Scenarios

## Test 1: Standard Personal Loan

### Input

Loan Amount       : INR 500,000

Purpose           : Home Renovation

Monthly Income    : INR 80,000

Existing EMI      : INR 12,000

Preferred Tenure  : 36 months

Employment        : Salaried

Risk Profile      : Medium

### Expected

Eligible          : Yes

Recommended       : Personal Loan

Mock Rate         : 12%

Monthly EMI       : approximately INR 16,607

Total Interest    : approximately INR 97,858

Total Repayment   : approximately INR 597,858

The AI should explain why the supplied profile satisfies the mock Personal Loan rules.

---

## Test 2: High Existing EMI

### Input

Monthly Income : INR 50,000

Existing EMI   : INR 25,000

Calculation:

25,000 / 50,000 = 50%

### Expected

No suitable product because the existing EMI\-to\-income ratio exceeds the prototype's 40% affordability threshold.

---

## Test 3: Invalid Loan Amount

### Input

Loan Amount = \-500

### Expected

Frontend validation prevents submission and asks the user to enter valid values.

---

## Test 4: Business Borrower

Example:

Loan Amount       : INR 500,000

Purpose           : Business

Monthly Income    : INR 80,000

Existing EMI      : INR 10,000

Tenure            : 36 months

Employment        : Self\-employed

### Expected

The eligibility engine evaluates business\-oriented products, including the mock SME Loan where its rules are satisfied.

This demonstrates that the solution does not always return Personal Loan.

---

## Test 5: LLM Failure

Simulate an unavailable/unauthorized LLM API.

### Expected

The system should still provide:

- Product eligibility
- Recommended product
- EMI
- Total interest
- Total repayment
- Fallback advisory message
- Fixed disclaimer

The main lending workflow therefore remains usable when the generative AI service is unavailable.

---

# Assumptions

The prototype intentionally makes the following assumptions:

1. All lending products and rates are mock data.
2. Eligibility criteria are illustrative rather than real underwriting rules.
3. The 40% existing EMI\-to\-income threshold is a prototype affordability rule.
4. Full authentication is outside the one\-hour prototype scope.
5. MongoDB persistence is intentionally omitted.
6. Full conversational memory is not implemented.
7. Risk profile is captured for future extensibility but is not treated as a real credit\-risk score.
8. No credit bureau data is accessed.
9. No real lender APIs are integrated.
10. No actual loan application is submitted.
11. A production secured\-loan workflow would require explicit collateral capture and verification.
12. Monetary values shown by the UI are estimates based on the mock rates.
13. Final approval always remains subject to underwriting and verification.

---

# Current Limitations

This prototype does not include:

- Actual credit underwriting
- Credit bureau integration
- Real lender product feeds
- Production authentication
- Database persistence
- Real collateral verification
- Regulatory decisioning
- Document verification
- Production financial\-advice compliance
- Multi\-turn conversational memory
- Voice support
- Multilingual functionality

These omissions are intentional to keep the implementation focused on the assessment's core end\-to\-end workflow.

---

# Production Improvements

With additional development time, the application could be extended with:

## Persistence

- MongoDB for borrower/advisor sessions
- Conversation history
- Recommendation audit records

## Authentication

- OAuth 2.0 / OpenID Connect
- JWT/session security
- Role\-based authorization
- Per\-user data isolation

## Lending Architecture

- Dedicated policy/rules engine
- Credit bureau integration
- Collateral verification
- Real product catalog integration
- Regulatory rules
- Explainable product\-ranking logic

## AI Governance

- Prompt versioning
- Model version tracking
- Evaluation datasets
- Hallucination monitoring
- Prompt\-injection controls
- Model\-output validation
- AI audit logging
- Human\-review workflows for sensitive cases

## Reliability

- Structured application logging
- Distributed tracing
- Metrics and alerts
- Retry/circuit\-breaker policies
- Health checks for upstream AI services

## DevOps

- Docker
- CI/CD
- Automated tests
- Linting and quality gates
- Kubernetes/cloud deployment
- Cloud secrets management

## User Experience

- Multi\-product comparison
- Side\-by\-side tenure comparison
- Downloadable recommendation summary
- Multilingual advisory experience
- Voice interface
- Conversation history

---

# Why AI Is Used Here

An LLM is valuable for turning structured lending information into clear, conversational guidance.

However, using an LLM directly for financial calculations or policy decisions would introduce unnecessary uncertainty.

This prototype therefore uses AI where generative capability adds value:

- Explanation
- Personalization of wording
- Financial concept clarification
- Tenure trade\-off communication

And uses deterministic software where correctness is required:

- Eligibility
- Product filtering
- Recommendation rules
- Interest rates
- EMI calculation
- Total interest
- Total repayment
- Mandatory disclaimer

---

# Disclaimer

This repository is an assessment prototype created for demonstration purposes.

All products, eligibility criteria, limits, and interest rates are mock values.

The application does not provide real financial advice, perform actual credit underwriting, submit loan applications, or guarantee approval.

Final loan eligibility, interest rates, terms, and approval in a real lending environment would depend on formal underwriting, verification, applicable regulations, and lender policies.

