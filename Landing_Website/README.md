# Hardman & Reed — SMB Lending & Credit Platform

A modern, production-grade light-themed landing website built with **React**, **TypeScript**, **Vite**, and **Mantine UI**.

---

## 🚀 Overview

Hardman & Reed is an intelligent commercial lending platform engineered for small and mid-market businesses. This web platform delivers a seamless, high-velocity borrower and lender experience.

### Included Pages & Sections (Per Specification)

1. **Home (`/`)**
   - **Hero with content on left**: "Fast, intelligent lending for small businesses" with primary CTAs (*Apply Now*, *Book Demo*), trust markers, and live interactive credit engine preview card.
   - **Problem**: Outlines traditional banking pitfalls (4-8 week delays, manual paperwork, opaque scoring).
   - **Solution**: AI-powered origination, real-time decisioning, 24-hour wire disbursement.
   - **How it works**: 4 transparent milestones: *Apply Digitally* → *Credit Scoring* → *Automated Decision* → *Funds Disbursed*.
   - **Trust badges**: SOC 2 Type II, ISO 27001, RBI/FCA compliant networks, 256-bit encryption.
   - **Cards with stats**: Capital disbursed ($485M+), 24h speed, 94.2% automated origination, 78.5% approval rate with circular progress indicators.
   - **CTA banner**: "Get your business funded in 24 hours".

2. **Product (`/product`)**
   - **Features with icons**: Detailed modules for Loan origination, Credit decisioning, Underwriting engine, Loan management, Collections, and Portfolio reporting.
   - **Interactive Demo Preview**: Multi-tab console showcasing AI decision scoring, amortization schedule engine, and portfolio health metrics.
   - **Integrations**: Native connectors for Experian, Equifax, CIBIL, Plaid, Salesforce, and SAP.
   - **Security**: SOC2 Type II, MFA, granular RBAC, AES-256 encryption, immutable audit trails.

3. **Lending Products (`/lending`)**
   - **5 Core Loan Facilities**:
     - *Working Capital Loan*: $10K–$500K · 3–24 months
     - *Invoice Financing*: Up to 90% of receivables · 30–90 days
     - *Equipment Financing*: $25K–$1M · 12–60 months
     - *Business Line of Credit*: $10K–$250K · Revolving
     - *Expansion Term Loan*: $100K–$5M · 1–5 years
   - **Interactive Rates & EMI Calculator**: Real-time monthly payment calculation, APR estimate, and interest breakdown.
   - **Eligibility Criteria & Underwriting Matrix**: Transparent guidelines on revenue, time-in-business, and cash flow factors.

4. **Company (`/company`)**
   - **About & Mission**: Founded by lenders and engineers to democratize business credit with speed and fairness.
   - **Executive Team**: CEO, CTO, Chief Credit Officer, Head of Risk, Head of Compliance with bios and LinkedIn links.
   - **Testimonials (Comment with HTML content)**: Verifiable SMB borrower feedback across *Retail*, *Manufacturing*, and *Logistics*.
   - **Careers**: 5 active open positions with interactive application modal.
   - **FAQ with image**: Separated accordion answering key borrower and partner questions with fintech sidecard.
   - **Get in touch form**: Full consultation and demo request form with responsive feedback.

5. **Legal & Compliance Pages**
   - **Privacy Policy (`/privacy`)**: Enterprise commercial data ingestion, zero-monetization policy, statutory 7-year retention, and DPO contacts.
   - **Terms of Service (`/terms`)**: Commercial B2B scope, pre-approval disclaimers, electronic debit rules, and New York arbitration governance.
   - **Security Center (`/security`)**: SOC 2 Type II, ISO 27001, AES-256 encryption, zero-trust hardware MFA, quarterly penetration testing, and vulnerability disclosure desk.
   - **Compliance Notice (`/compliance`)**: CFPB/FinCEN, FCA, and RBI digital lending guidelines, Key Fact Statements (KFS), AML/OFAC/PEP sanctions screening, and direct ombudsman escalation.

---

## 🎨 Mantine UI Components Utilized

- **Hero with content on left**: `src/pages/HomePage.tsx`
- **Features with icons**: `src/pages/ProductPage.tsx`
- **Cookies banner**: `src/components/CookiesBanner.tsx`
- **Email banner**: `src/components/EmailBanner.tsx`
- **Get in touch form**: `src/components/GetInTouchForm.tsx`
- **Faq with image**: `src/components/FaqWithImage.tsx`
- **Comment with html content**: `src/components/CommentHtml.tsx`
- **Card with stats**: `src/components/StatsCard.tsx`
- **Button with loading progress**: `src/components/ProgressButton.tsx`
- **Simple footer**: `src/components/FooterSimple.tsx`
- **Header with mega menu**: `src/components/HeaderMegaMenu.tsx`

---

## 💻 Running Locally

### Development Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

