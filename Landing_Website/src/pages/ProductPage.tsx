import React, { useState } from 'react';
import {
  Container,
  Title,
  Text,
  Badge,
  SimpleGrid,
  Paper,
  ThemeIcon,
  Group,
  Stack,
  Button,
  Tabs,
  Box,
  Divider,
  Progress,
  Table,
} from '@mantine/core';
import {
  IconFileCertificate,
  IconCpu,
  IconAdjustmentsAlt,
  IconCalendarStats,
  IconBellRinging,
  IconReportAnalytics,
  IconCheck,
  IconArrowRight,
  IconLock,
  IconKey,
  IconDatabase,
  IconFingerprint,
  IconUsers,
  IconDeviceDesktopAnalytics,
  IconShieldLock,
} from '@tabler/icons-react';
import { MotionReveal, MotionStaggerContainer, MotionStaggerItem } from '../components/MotionReveal';

interface ProductPageProps {
  onOpenDemo: () => void;
  onOpenApply: () => void;
}

const features = [
  {
    icon: IconFileCertificate,
    color: 'blue',
    title: 'Loan Origination',
    tag: 'Frictionless Ingestion',
    desc: 'Digital application portal with real-time OCR document ingestion, automated financial statement extraction, and instantaneous e-KYC verification.',
    bullets: ['Instant OCR scan for P&L and balance sheets', 'Automated tax ID & TIN validation', 'White-label borrower onboarding portal'],
  },
  {
    icon: IconCpu,
    color: 'teal',
    title: 'Credit Decisioning',
    tag: 'Algorithmic Models',
    desc: 'State-of-the-art AI credit scoring combining direct bank transaction feeds, historical cash flow patterns, customer concentration risks, and bureau APIs.',
    bullets: ['Multi-bureau synthesis (Experian, Equifax, CIBIL)', 'Cash flow volatility & seasonal adjustments', 'Real-time debt service coverage calculation (DSCR)'],
  },
  {
    icon: IconAdjustmentsAlt,
    color: 'indigo',
    title: 'Underwriting Engine',
    tag: 'Rules & Governance',
    desc: 'Configurable automated policy rules engine with customizable risk weightings, automated sanction tiers, and intuitive manual override workflows for credit analysts.',
    bullets: ['Dynamic decision rule trees & risk matrices', '1-click analyst overrides with mandatory audit notes', 'Secondary review escalation triggers'],
  },
  {
    icon: IconCalendarStats,
    color: 'cyan',
    title: 'Loan Management',
    tag: 'Servicing Rails',
    desc: 'End-to-end servicing platform managing amortization schedules, automated EMI deduction via NACH/ACH, prepayment calculations, and collateral tracking.',
    bullets: ['Flexible daily, weekly, or monthly EMI options', 'Automated principal amortization & interest accrual', 'Zero-penalty partial prepayment calculations'],
  },
  {
    icon: IconBellRinging,
    color: 'orange',
    title: 'Collections & Recovery',
    tag: 'Smart Workflows',
    desc: 'Proactive early-warning telemetry detecting cash flow deterioration before default. Automated smart reminders via SMS/Email and tiered delinquency workflows.',
    bullets: ['Predictive delinquency early warning radar', 'Automated multi-channel escalation reminders', 'Restructuring and cure negotiation portal'],
  },
  {
    icon: IconReportAnalytics,
    color: 'violet',
    title: 'Reporting & Analytics',
    tag: 'Portfolio Health',
    desc: 'Executive analytics covering portfolio health, Non-Performing Asset (NPA) forecasting, vintage loss curves, and 1-click statutory regulatory reporting.',
    bullets: ['Real-time 30/60/90+ DPD tracking', 'Dynamic capital adequacy & provision models', 'Automated export for RBI/FCA compliance filings'],
  },
];

const integrations = [
  { name: 'Experian', type: 'Credit Bureau', desc: 'Commercial credit scoring & inquiry validation' },
  { name: 'Equifax', type: 'Credit Bureau', desc: 'Commercial fraud & corporate credit history' },
  { name: 'CIBIL', type: 'Credit Bureau', desc: 'South Asia credit registry & repayment records' },
  { name: 'Plaid', type: 'Open Banking', desc: 'Instant real-time bank ledger & asset authentication' },
  { name: 'Salesforce', type: 'CRM & Pipeline', desc: 'Two-way lead synching & relationship mapping' },
  { name: 'SAP ERP', type: 'Enterprise ERP', desc: 'Automatic general ledger & AP/AR reconciliation' },
];

const securitySpecs = [
  {
    icon: IconShieldLock,
    title: 'SOC 2 Type II Certified',
    desc: 'Independently audited operational safeguards guaranteeing strict data privacy, availability, and processing integrity.',
  },
  {
    icon: IconKey,
    title: 'Multi-Factor Auth (MFA)',
    desc: 'FIDO2 and WebAuthn hardware-token enforcement across all credit desk and administrative endpoints.',
  },
  {
    icon: IconUsers,
    title: 'Granular RBAC',
    desc: 'Role-based access controls ensuring credit officers, underwriters, and auditors only access permissible data silos.',
  },
  {
    icon: IconLock,
    title: 'End-to-End Encryption',
    desc: 'AES-256 bit encryption at rest in isolated database clusters and TLS 1.3 enforced for all transmission payloads.',
  },
  {
    icon: IconDatabase,
    title: 'Immutable Audit Trail',
    desc: 'Cryptographically hashed event logs recording every underwriting modification, policy check, and credit decision.',
  },
  {
    icon: IconFingerprint,
    title: 'Continuous Penetration Testing',
    desc: 'Quarterly third-party white-hat audits, vulnerability bounties, and round-the-clock SOC monitoring.',
  },
];

export const ProductPage: React.FC<ProductPageProps> = ({ onOpenDemo, onOpenApply }) => {
  const [selectedDemoTab, setSelectedDemoTab] = useState<string | null>('decisioning');

  return (
    <Box py={{ base: 40, md: 60 }}>
      <Container size="xl">
        {/* Header */}
        <MotionReveal direction="up" delay={0.05}>
          <Box ta="center" mb={60}>
            <Badge color="blue" variant="light" size="lg" mb="sm">
              Hardman & Reed Lending OS
            </Badge>
            <Title
              order={1}
              fw={800}
              c="#094067"
              style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', lineHeight: 1.2 }}
            >
              The Intelligent Infrastructure for Commercial Lending
            </Title>
            <Text size="lg" c="dimmed" mt="md" style={{ maxWidth: 720, margin: '16px auto 0' }}>
              A modular cloud-native platform powering digital origination, real-time AI credit decisioning, comprehensive loan servicing, and regulatory governance.
            </Text>
            <Group justify="center" mt="xl">
              <Button size="md" color="blue" onClick={onOpenDemo} rightSection={<IconArrowRight size={16} />}>
                Request Full Platform Walkthrough
              </Button>
              <Button size="md" variant="default" onClick={onOpenApply}>
                Test Borrower Application Flow
              </Button>
            </Group>
          </Box>
        </MotionReveal>

        {/* SECTION 1: FEATURES WITH ICONS */}
        <Box mb={80}>
          <MotionReveal direction="up" delay={0.1}>
            <Box mb="xl">
              <Badge color="blue" size="sm">
                Core Capabilities
              </Badge>
              <Title order={2} fw={800} mt={4} c="dark.8">
                Engineered for Speed, Precision, and Control
              </Title>
              <Text size="sm" c="dimmed">
                Every stage of the SMB credit lifecycle unified into an automated, auditable workflow.
              </Text>
            </Box>
          </MotionReveal>

          <MotionStaggerContainer staggerDelay={0.1}>
            <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="lg">
              {features.map((item) => (
                <MotionStaggerItem key={item.title}>
                  <Paper p="xl" radius="md" withBorder className="card-hover" bg="#ffffff" style={{ height: '100%' }}>
                    <Group justify="space-between" align="center" mb="md">
                      <ThemeIcon size={46} radius="md" color={item.color} variant="light">
                        <item.icon size={26} stroke={1.8} />
                      </ThemeIcon>
                      <Badge color={item.color} variant="outline" size="sm">
                        {item.tag}
                      </Badge>
                    </Group>

                    <Title order={3} size="h4" fw={700} c="dark.8" mb="xs">
                      {item.title}
                    </Title>
                    <Text size="sm" c="dimmed" lh={1.6} mb="md">
                      {item.desc}
                    </Text>

                    <Divider my="sm" />

                    <Stack gap={6}>
                      {item.bullets.map((b) => (
                        <Group key={b} gap="xs" wrap="nowrap" align="flex-start">
                          <IconCheck size={14} color="#12b886" style={{ marginTop: 3, flexShrink: 0 }} />
                          <Text size="xs" c="dark.6">
                            {b}
                          </Text>
                        </Group>
                      ))}
                    </Stack>
                  </Paper>
                </MotionStaggerItem>
              ))}
            </SimpleGrid>
          </MotionStaggerContainer>
        </Box>

        {/* SECTION 2: DEMO PREVIEW (Interactive Console) */}
        <Box mb={80}>
          <MotionReveal direction="up" delay={0.15}>
            <Paper
              p={{ base: 'md', md: 'xl' }}
              radius="lg"
              withBorder
              bg="#f8fafc"
              style={{ borderColor: '#cbd5e1' }}
            >
              <Group justify="space-between" mb="lg" wrap="wrap">
                <div>
                  <Badge color="teal" variant="filled" size="sm">
                    Interactive Sandbox Preview
                  </Badge>
                  <Title order={3} fw={800} mt={4}>
                    Underwriter & Credit Decisioning Console
                  </Title>
                  <Text size="xs" c="dimmed">
                    Experience how our automated risk engine models borrower health in real time.
                  </Text>
                </div>
                <Button size="xs" variant="light" color="blue" onClick={onOpenDemo}>
                  Open Live Staging Environment
                </Button>
              </Group>

              <Tabs value={selectedDemoTab} onChange={setSelectedDemoTab} variant="outline" radius="md">
                <Tabs.List mb="md">
                  <Tabs.Tab value="decisioning" leftSection={<IconCpu size={16} />}>
                    AI Decision Engine
                  </Tabs.Tab>
                  <Tabs.Tab value="pipeline" leftSection={<IconCalendarStats size={16} />}>
                    Amortization & Servicing
                  </Tabs.Tab>
                  <Tabs.Tab value="portfolio" leftSection={<IconDeviceDesktopAnalytics size={16} />}>
                    Portfolio Health & NPA
                  </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="decisioning">
                  <Paper p="lg" radius="md" bg="#ffffff" withBorder>
                    <Group justify="space-between" mb="md">
                      <div>
                        <Text fw={700} size="sm">
                          Borrower: Apex Logistics Global LLC
                        </Text>
                        <Text size="xs" c="dimmed">
                          Application ID: #APP-2026-9812 · Facility: $350,000 Working Capital
                        </Text>
                      </div>
                      <Badge color="green" size="lg" variant="light">
                        AUTO-APPROVE: 89/100
                      </Badge>
                    </Group>

                    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md" mb="lg">
                      <Paper p="sm" radius="md" bg="#f1f5f9">
                        <Text size="11px" c="dimmed" fw={700}>
                          DEBT SERVICE RATIO (DSCR)
                        </Text>
                        <Text fw={800} size="lg" c="blue.8">
                          1.94x (Target &gt; 1.35x)
                        </Text>
                        <Progress value={85} color="blue" size="xs" mt={4} />
                      </Paper>

                      <Paper p="sm" radius="md" bg="#f1f5f9">
                        <Text size="11px" c="dimmed" fw={700}>
                          MONTHLY CASH INFLOWS
                        </Text>
                        <Text fw={800} size="lg" c="teal.8">
                          $248,500 Avg.
                        </Text>
                        <Progress value={92} color="teal" size="xs" mt={4} />
                      </Paper>

                      <Paper p="sm" radius="md" bg="#f1f5f9">
                        <Text size="11px" c="dimmed" fw={700}>
                          COMBINED BUREAU SCORE
                        </Text>
                        <Text fw={800} size="lg" c="indigo.8">
                          776 / 850 (Grade A)
                        </Text>
                        <Progress value={90} color="indigo" size="xs" mt={4} />
                      </Paper>
                    </SimpleGrid>

                    <Table striped highlightOnHover>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>Metric Factor</Table.Th>
                          <Table.Th>Source</Table.Th>
                          <Table.Th>Observed Value</Table.Th>
                          <Table.Th>Underwriting Status</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        <Table.Tr>
                          <Table.Td>Days Sales Outstanding (DSO)</Table.Td>
                          <Table.Td>Plaid / QuickBooks API</Table.Td>
                          <Table.Td>32 Days</Table.Td>
                          <Table.Td>
                            <Badge color="teal" size="xs">
                              Optimal
                            </Badge>
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>Customer Concentration</Table.Td>
                          <Table.Td>Bank Statement OCR</Table.Td>
                          <Table.Td>Top client is 14% of revenue</Table.Td>
                          <Table.Td>
                            <Badge color="teal" size="xs">
                              Low Risk
                            </Badge>
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>Bounced Checks / NSF Events</Table.Td>
                          <Table.Td>Chase Fed Clearing</Table.Td>
                          <Table.Td>0 in past 12 months</Table.Td>
                          <Table.Td>
                            <Badge color="teal" size="xs">
                              Clean
                            </Badge>
                          </Table.Td>
                        </Table.Tr>
                      </Table.Tbody>
                    </Table>
                  </Paper>
                </Tabs.Panel>

                <Tabs.Panel value="pipeline">
                  <Paper p="lg" radius="md" bg="#ffffff" withBorder>
                    <Text fw={700} size="sm" mb="xs">
                      Amortization Schedule Generation: $350,000 Term Loan @ 8.9% APR (24 Mo)
                    </Text>
                    <Text size="xs" c="dimmed" mb="md">
                      Automated ACH debit rules with real-time NACH holiday processing and zero prepayment locks.
                    </Text>
                    <Table striped>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>Month</Table.Th>
                          <Table.Th>Principal Due</Table.Th>
                          <Table.Th>Interest Due</Table.Th>
                          <Table.Th>Total EMI</Table.Th>
                          <Table.Th>Remaining Balance</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        <Table.Tr>
                          <Table.Td>Month 01</Table.Td>
                          <Table.Td>$13,380</Table.Td>
                          <Table.Td>$2,595</Table.Td>
                          <Table.Td>$15,975</Table.Td>
                          <Table.Td>$336,620</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>Month 02</Table.Td>
                          <Table.Td>$13,479</Table.Td>
                          <Table.Td>$2,496</Table.Td>
                          <Table.Td>$15,975</Table.Td>
                          <Table.Td>$323,141</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Td>Month 03</Table.Td>
                          <Table.Td>$13,579</Table.Td>
                          <Table.Td>$2,396</Table.Td>
                          <Table.Td>$15,975</Table.Td>
                          <Table.Td>$309,562</Table.Td>
                        </Table.Tr>
                      </Table.Tbody>
                    </Table>
                  </Paper>
                </Tabs.Panel>

                <Tabs.Panel value="portfolio">
                  <Paper p="lg" radius="md" bg="#ffffff" withBorder>
                    <Group justify="space-between" mb="md">
                      <div>
                        <Text fw={700} size="sm">
                          Total Active Loan Book: $485,240,000
                        </Text>
                        <Text size="xs" c="dimmed">
                          Aggregate SMB credit performance metrics across 12,400 active borrowers
                        </Text>
                      </div>
                      <Badge color="blue" size="md">
                        Current PAR &lt; 30: 98.4%
                      </Badge>
                    </Group>
                    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
                      <Paper p="md" radius="md" bg="#f8fafc" withBorder>
                        <Text size="xs" c="dimmed" fw={600}>
                          Gross NPA (90+ DPD)
                        </Text>
                        <Text fw={800} size="xl" c="green.7">
                          0.84%
                        </Text>
                        <Text size="11px" c="dimmed">
                          Industry benchmark: 3.20%
                        </Text>
                      </Paper>
                      <Paper p="md" radius="md" bg="#f8fafc" withBorder>
                        <Text size="xs" c="dimmed" fw={600}>
                          Average Yield (IRR)
                        </Text>
                        <Text fw={800} size="xl" c="blue.8">
                          13.8%
                        </Text>
                        <Text size="11px" c="dimmed">
                          Net of expected credit loss
                        </Text>
                      </Paper>
                      <Paper p="md" radius="md" bg="#f8fafc" withBorder>
                        <Text size="xs" c="dimmed" fw={600}>
                          Recovery Efficiency
                        </Text>
                        <Text fw={800} size="xl" c="teal.7">
                          96.1%
                        </Text>
                        <Text size="11px" c="dimmed">
                          Automated smart reminder workflows
                        </Text>
                      </Paper>
                    </SimpleGrid>
                  </Paper>
                </Tabs.Panel>
              </Tabs>
            </Paper>
          </MotionReveal>
        </Box>

        {/* SECTION 3: INTEGRATIONS */}
        <Box mb={80}>
          <MotionReveal direction="up" delay={0.1}>
            <Box mb="xl" ta="center">
              <Badge color="indigo" size="sm">
                Ecosystem
              </Badge>
              <Title order={2} fw={800} mt={4} c="#094067">
                Enterprise & Core Banking Integrations
              </Title>
              <Text size="sm" c="dimmed" style={{ maxWidth: 600, margin: '8px auto' }}>
                Connect seamlessly with leading credit registries, open banking aggregators, and enterprise ERP backbones via our robust REST & Webhook APIs.
              </Text>
            </Box>
          </MotionReveal>

          <MotionStaggerContainer staggerDelay={0.08}>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
              {integrations.map((item) => (
                <MotionStaggerItem key={item.name}>
                  <Paper p="lg" radius="md" withBorder className="card-hover" bg="#ffffff" style={{ height: '100%' }}>
                    <Group justify="space-between" mb="xs">
                      <Text fw={700} size="md" c="dark.8">
                        {item.name}
                      </Text>
                      <Badge variant="light" color="indigo" size="xs">
                        {item.type}
                      </Badge>
                    </Group>
                    <Text size="xs" c="dimmed">
                      {item.desc}
                    </Text>
                    <Group gap={6} mt="md">
                      <IconCheck size={14} color="#12b886" />
                      <Text size="11px" fw={600} c="teal.7">
                        Native Pre-built Connector Active
                      </Text>
                    </Group>
                  </Paper>
                </MotionStaggerItem>
              ))}
            </SimpleGrid>
          </MotionStaggerContainer>
        </Box>

        {/* SECTION 4: SECURITY & COMPLIANCE */}
        <Box mb={50}>
          <MotionReveal direction="up" delay={0.1}>
            <Box mb="xl">
              <Badge color="teal" size="sm">
                Institutional Trust
              </Badge>
              <Title order={2} fw={800} mt={4} c="#094067">
                Bank-Grade Security Architecture
              </Title>
              <Text size="sm" c="dimmed">
                Engineered from day one for strict regulatory scrutiny, financial data confidentiality, and system resiliency.
              </Text>
            </Box>
          </MotionReveal>

          <MotionStaggerContainer staggerDelay={0.08}>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
              {securitySpecs.map((s) => (
                <MotionStaggerItem key={s.title}>
                  <Paper p="lg" radius="md" withBorder className="card-hover" bg="#ffffff" style={{ height: '100%' }}>
                    <ThemeIcon size={38} radius="md" color="teal" variant="light" mb="sm">
                      <s.icon size={22} stroke={1.8} />
                    </ThemeIcon>
                    <Text fw={700} size="sm" c="dark.8">
                      {s.title}
                    </Text>
                    <Text size="xs" c="dimmed" mt={4} lh={1.5}>
                      {s.desc}
                    </Text>
                  </Paper>
                </MotionStaggerItem>
              ))}
            </SimpleGrid>
          </MotionStaggerContainer>
        </Box>
      </Container>
    </Box>
  );
};
