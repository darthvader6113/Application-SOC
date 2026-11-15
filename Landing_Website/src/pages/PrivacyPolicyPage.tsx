import React from 'react';
import {
  Container,
  Title,
  Text,
  Badge,
  Paper,
  Stack,
  Box,
  Divider,
  Group,
  ThemeIcon,
  List,
} from '@mantine/core';
import {
  IconShieldLock,
  IconDatabase,
  IconEyeCheck,
  IconScale,
  IconClock,
  IconMail,
} from '@tabler/icons-react';
import { MotionReveal } from '../components/MotionReveal';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <Box py={{ base: 40, md: 60 }}>
      <Container size="lg">
        {/* Header */}
        <MotionReveal direction="up" delay={0.05}>
          <Box mb={50}>
            <Badge color="blue" variant="light" size="lg" mb="sm">
              Legal & Privacy
            </Badge>
            <Title order={1} fw={800} c="#094067" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)' }}>
              Privacy Policy
            </Title>
            <Group gap="xs" mt="xs">
              <Text size="xs" c="dimmed">
                Effective Date: November 12, 2026
              </Text>
              <Text size="xs" c="dimmed">·</Text>
              <Text size="xs" c="dimmed">
                Version 3.2 (Commercial & Enterprise)
              </Text>
            </Group>
            <Text size="md" c="dimmed" mt="md" lh={1.7}>
              Hardman & Reed Financial Technologies Inc. (&quot;Hardman & Reed,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting the privacy, confidentiality, and integrity of corporate borrowers, business owners, and institutional capital partners. This policy details how we collect, process, and safeguard commercial data across our lending operating system.
            </Text>
          </Box>
        </MotionReveal>

        <Stack gap="xl">
          {/* Section 1 */}
          <MotionReveal direction="up" delay={0.1}>
            <Paper p="xl" radius="md" withBorder bg="#ffffff">
              <Group gap="sm" mb="md">
                <ThemeIcon size={36} radius="md" color="blue" variant="light">
                  <IconDatabase size={20} />
                </ThemeIcon>
                <Title order={3} size="h4" c="dark.8">
                  1. Information We Collect
                </Title>
              </Group>
              <Text size="sm" c="dark.7" lh={1.7} mb="md">
                To evaluate commercial creditworthiness and service loan facilities, we collect information regarding your business and authorized representatives:
              </Text>
              <List spacing="xs" size="sm" icon={<ThemeIcon color="blue" size={18} radius="xl"><IconEyeCheck size={12} /></ThemeIcon>}>
                <List.Item>
                  <strong>Commercial Entity Records:</strong> Registered business name, Tax Identification Number (EIN/TIN/GSTIN), certificate of incorporation, corporate address, ownership cap table, and organizational structure.
                </List.Item>
                <List.Item>
                  <strong>Financial & Operating Telemetry:</strong> Bank transaction histories via open-banking APIs (e.g., Plaid), accounting ledgers (QuickBooks, Xero), accounts receivable schedules, balance sheets, profit & loss statements, and invoice aging reports.
                </List.Item>
                <List.Item>
                  <strong>Beneficial Owner & Director e-KYC:</strong> Full legal name, date of birth, residential address, government ID/passport data, and direct ownership percentage to satisfy anti-money laundering (AML) and know-your-customer (KYC) requirements.
                </List.Item>
                <List.Item>
                  <strong>Bureau Inquiries:</strong> Commercial credit history pulled via authorized soft or hard pulls from Experian, Equifax, and CIBIL registries.
                </List.Item>
              </List>
            </Paper>
          </MotionReveal>

          {/* Section 2 */}
          <MotionReveal direction="up" delay={0.1}>
            <Paper p="xl" radius="md" withBorder bg="#ffffff">
              <Group gap="sm" mb="md">
                <ThemeIcon size={36} radius="md" color="teal" variant="light">
                  <IconScale size={20} />
                </ThemeIcon>
                <Title order={3} size="h4" c="dark.8">
                  2. How We Utilize Your Data
                </Title>
              </Group>
              <Text size="sm" c="dark.7" lh={1.7} mb="sm">
                We utilize collected data strictly for sanctioned commercial credit functions:
              </Text>
              <List spacing="xs" size="sm">
                <List.Item>Real-time underwriting, risk pricing, and debt-service coverage ratio (DSCR) algorithmic scoring.</List.Item>
                <List.Item>Automated fraud detection, bank account ownership validation, and synthetic identity prevention.</List.Item>
                <List.Item>Loan disbursement via Fedwire/ACH/NEFT and processing automated repayment schedules.</List.Item>
                <List.Item>Statutory reporting and portfolio compliance filings under RBI, FCA, and US banking partner mandates.</List.Item>
              </List>
              <Paper p="sm" mt="md" radius="sm" bg="#f8fafc" withBorder>
                <Text size="xs" fw={700} c="dark.8">
                  Zero Monetization Policy:
                </Text>
                <Text size="xs" c="dimmed">
                  Hardman & Reed never sells, rents, or licenses your commercial financial records to third-party advertisers or external marketing brokers.
                </Text>
              </Paper>
            </Paper>
          </MotionReveal>

          {/* Section 3 */}
          <MotionReveal direction="up" delay={0.1}>
            <Paper p="xl" radius="md" withBorder bg="#ffffff">
              <Group gap="sm" mb="md">
                <ThemeIcon size={36} radius="md" color="indigo" variant="light">
                  <IconShieldLock size={20} />
                </ThemeIcon>
                <Title order={3} size="h4" c="dark.8">
                  3. Information Sharing & Third-Party Disclosures
                </Title>
              </Group>
              <Text size="sm" c="dark.7" lh={1.7} mb="sm">
                We disclose commercial data exclusively to entities essential to executing and servicing credit facilities:
              </Text>
              <List spacing="xs" size="sm">
                <List.Item>
                  <strong>Licensed Depository Partners:</strong> FDIC-insured banks, FCA-authorized credit providers, and RBI-regulated NBFC partners who co-underwrite or fund specific loan tranches.
                </List.Item>
                <List.Item>
                  <strong>Credit Registries:</strong> Commercial credit reporting agencies to update trade payment experiences as legally mandated.
                </List.Item>
                <List.Item>
                  <strong>Regulatory Authorities:</strong> State and federal supervisory authorities, judicial subpoenas, or law enforcement investigations where statutory disclosure is required by law.
                </List.Item>
              </List>
            </Paper>
          </MotionReveal>

          {/* Section 4 */}
          <MotionReveal direction="up" delay={0.1}>
            <Paper p="xl" radius="md" withBorder bg="#ffffff">
              <Group gap="sm" mb="md">
                <ThemeIcon size={36} radius="md" color="cyan" variant="light">
                  <IconClock size={20} />
                </ThemeIcon>
                <Title order={3} size="h4" c="dark.8">
                  4. Data Retention, Security & Your Legal Rights
                </Title>
              </Group>
              <Text size="sm" c="dark.7" lh={1.7}>
                Financial and lending records are retained for a minimum statutory period of <strong>7 years</strong> following loan satisfaction or application closure to comply with statutory banking audit rules. 
              </Text>
              <Text size="sm" c="dark.7" lh={1.7} mt="xs">
                Depending on your operating jurisdiction (e.g., GDPR, CCPA/CPRA), authorized company representatives retain the right to request access, correction, or deletion of non-statutory identifying records by notifying our privacy officer.
              </Text>
              <Divider my="md" />
              <Group justify="space-between" align="center" wrap="wrap">
                <div>
                  <Text size="xs" fw={700} c="dark.8">
                    Data Protection Officer (DPO)
                  </Text>
                  <Text size="xs" c="dimmed">
                    credit-desk@hardmanreed.com · 100 Financial Center, New York, NY 10005
                  </Text>
                </div>
                <Badge color="blue" variant="light">
                  Encrypted Ingestion
                </Badge>
              </Group>
            </Paper>
          </MotionReveal>
        </Stack>
      </Container>
    </Box>
  );
};

