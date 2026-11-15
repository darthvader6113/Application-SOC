import React, { useState, useEffect } from 'react';
import { Box } from '@mantine/core';
import { HeaderMegaMenu } from './components/HeaderMegaMenu';
import { FooterSimple } from './components/FooterSimple';
import { CookiesBanner } from './components/CookiesBanner';
import { ChatbotWidget } from './components/ChatbotWidget';
import { ApplyModal } from './components/ApplyModal';
import { DemoModal } from './components/DemoModal';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { LendingPage } from './pages/LendingPage';
import { CompanyPage } from './pages/CompanyPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { SecurityCenterPage } from './pages/SecurityCenterPage';
import { ComplianceNoticePage } from './pages/ComplianceNoticePage';

const seoData: Record<string, { title: string; desc: string }> = {
  home: {
    title: 'Hardman & Reed — SMB Lending & Credit Platform | 24-Hour Capital',
    desc: 'Fast, intelligent lending for small businesses. Pre-approval in 180 seconds, funding up to $5M in 24 hours with AI-powered underwriting.',
  },
  product: {
    title: 'Lending OS — AI Credit Decisioning & Underwriting | Hardman & Reed',
    desc: 'Explore the intelligent infrastructure for commercial lending: automated digital origination, credit scoring, rules engine, and loan management.',
  },
  lending: {
    title: 'SMB Loan Products & Rates Calculator ($10K–$5M) | Hardman & Reed',
    desc: 'Compare Working Capital, Invoice Financing, Equipment Loans, Lines of Credit, and Term Loans. Transparent pricing from 7.9% APR.',
  },
  company: {
    title: 'About Us & Leadership — Democratizing SMB Credit | Hardman & Reed',
    desc: 'Founded by lenders and machine learning engineers to modernize business credit access with speed, fairness, and institutional integrity.',
  },
  security: {
    title: 'Security Center — SOC 2 Type II, ISO 27001 & Encryption | Hardman & Reed',
    desc: 'Bank-grade cyber defense: AES-256 encryption, zero-trust hardware MFA, quarterly penetration audits, and 99.99% cloud resiliency.',
  },
  compliance: {
    title: 'Compliance Notice & Fair Practices Code | Hardman & Reed',
    desc: 'Strict regulatory oversight under US CFPB/FinCEN, UK FCA, and RBI digital lending standards with automated AML/sanctions screening.',
  },
  privacy: {
    title: 'Privacy Policy — Commercial Data Governance | Hardman & Reed',
    desc: 'How Hardman & Reed protects business borrower confidentiality and financial telemetry. Zero monetization of corporate records.',
  },
  terms: {
    title: 'Terms of Service — Commercial Lending Platform | Hardman & Reed',
    desc: 'Terms and commercial governance for borrowers, applicants, and capital partners utilizing the Hardman & Reed Lending OS.',
  },
};

export const App: React.FC = () => {
  const [activePage, setActivePage] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    return hash && seoData[hash] ? hash : 'home';
  });
  const [applyModalOpened, setApplyModalOpened] = useState(false);
  const [demoModalOpened, setDemoModalOpened] = useState(false);

  // Synchronize URL Hash and SEO metadata
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash && seoData[hash]) {
        setActivePage(hash);
      } else if (!hash) {
        setActivePage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const current = seoData[activePage] || seoData.home;
    document.title = current.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', current.desc);
    }
  }, [activePage]);

  // Page change handler with URL hash sync and smooth scroll
  const handlePageChange = (page: string) => {
    setActivePage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Header with Mega Menu */}
      <HeaderMegaMenu
        activePage={activePage}
        setActivePage={handlePageChange}
        onOpenApply={() => setApplyModalOpened(true)}
        onOpenDemo={() => setDemoModalOpened(true)}
      />

      {/* Main Content View */}
      <Box component="main" style={{ flex: 1 }}>
        {activePage === 'home' && (
          <HomePage
            onOpenApply={() => setApplyModalOpened(true)}
            onOpenDemo={() => setDemoModalOpened(true)}
            setActivePage={handlePageChange}
          />
        )}
        {activePage === 'product' && (
          <ProductPage
            onOpenApply={() => setApplyModalOpened(true)}
            onOpenDemo={() => setDemoModalOpened(true)}
          />
        )}
        {activePage === 'lending' && (
          <LendingPage
            onOpenApply={() => setApplyModalOpened(true)}
            onOpenDemo={() => setDemoModalOpened(true)}
          />
        )}
        {activePage === 'company' && <CompanyPage />}
        {activePage === 'privacy' && <PrivacyPolicyPage />}
        {activePage === 'terms' && <TermsOfServicePage />}
        {activePage === 'security' && <SecurityCenterPage />}
        {activePage === 'compliance' && <ComplianceNoticePage />}
      </Box>

      {/* Footer */}
      <FooterSimple
        setActivePage={handlePageChange}
        onOpenApply={() => setApplyModalOpened(true)}
        onOpenDemo={() => setDemoModalOpened(true)}
      />

      {/* Persistent / Floating Components */}
      <CookiesBanner />
      <ChatbotWidget
        onOpenApply={() => setApplyModalOpened(true)}
        onOpenDemo={() => setDemoModalOpened(true)}
      />

      {/* Modals */}
      <ApplyModal opened={applyModalOpened} onClose={() => setApplyModalOpened(false)} />
      <DemoModal opened={demoModalOpened} onClose={() => setDemoModalOpened(false)} />
    </Box>
  );
};

export default App;
