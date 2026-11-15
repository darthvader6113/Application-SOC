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
  SimpleGrid,
  List,
} from '@mantine/core';
import {
  IconBuildingBank,
  IconScale,
  IconCertificate,
  IconCheck,
  IconAlertTriangle,
  IconReceipt2,
} from '@tabler/icons-react';
import { MotionReveal, MotionStaggerContainer, MotionStaggerItem } from '../components/MotionReveal';

const frameworks = [
  {
    region: 'United States',
    regulator: 'CFPB · FinCEN · State Banking Commissions',
    desc: 'Operates in full compliance with the Equal Credit Opportunity Act (ECOA / Regulation B), Bank Secrecy Act (BSA), USA PATRIOT Act AML/KYC requirements, and state commercial financing disclosure laws (California SB 1235, New York Commercial Finance Disclosure Law).',
  },
  {
    region: 'United Kingdom & Europe',
    regulator: 'Financial Conduct Authority (FCA)',
    desc: 'Partner lending networks maintain rigorous FCA authorization standards for credit brokerage and commercial loan servicing. Compliant with UK Data Protection Act 2018, UK GDPR, and the Bribery Act 2010.',
  },
  {
    region: 'India & South Asia',
    regulator: 'Reserve Bank of India (RBI)',
    desc: 'Operates as a Lending Service Provider (LSP) in strict compliance with the RBI Digital Lending Guidelines. Transparent Key Fact Statements (KFS), direct borrower-RE disbursement rails, and zero third-party pool accounts.',
  },
];

export const ComplianceNoticePage: React.FC = () => {
  return (
    <Box py={{ base: 40, md: 60 }}>
      <Container size="lg">
        {/* Header */}
        <MotionReveal direction="up" delay={0.05}>
          <Box mb={50} ta="center">
            <Badge color="indigo" variant="light" size="lg" mb="sm">
              Regulatory Standards
            </Badge>
            <Title order={1} fw={800} c="#094067" style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)' }}>
              Compliance Notice
            </Title>
            <Text size="lg" c="dimmed" mt="sm" style={{ maxWidth: 740, margin: '12px auto 0' }}>
              Hardman & Reed adheres to stringent fair commercial lending standards, anti-money laundering frameworks, and consumer/commercial credit regulatory oversight globally.
            </Text>
          </Box>
        </MotionReveal>

        {/* Global Regulatory Frameworks */}
        <Box mb={60}>
          <MotionStaggerContainer staggerDelay={0.08}>
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
              {frameworks.map((f) => (
                <MotionStaggerItem key={f.region}>
                  <Paper p="xl" radius="md" withBorder className="card-hover" bg="#ffffff" style={{ height: '100%' }}>
                    <ThemeIcon size={42} radius="md" color="indigo" variant="light" mb="md">
                      <IconBuildingBank size={22} />
                    </ThemeIcon>
                    <Badge color="indigo" variant="light" size="sm" mb="xs">
                      {f.region}
                    </Badge>
                    <Title order={4} c="dark.8" mb="xs">
                      {f.regulator}
                    </Title>
                    <Text size="xs" c="dimmed" lh={1.6}>
                      {f.desc}
                    </Text>
                  </Paper>
                </MotionStaggerItem>
              ))}
            </SimpleGrid>
          </MotionStaggerContainer>
        </Box>

        <Stack gap="xl">
          {/* Fair Lending & Transparent Pricing */}
          <MotionReveal direction="up" delay={0.1}>
            <Paper p="xl" radius="md" withBorder bg="#ffffff">
              <Group gap="sm" mb="md">
                <ThemeIcon size={36} radius="md" color="blue" variant="light">
                  <IconReceipt2 size={20} />
                </ThemeIcon>
                <Title order={3} size="h4" c="dark.8">
                  Fair Practices Code & Transparent Pricing
                </Title>
              </Group>
              <Text size="sm" c="dark.7" lh={1.7} mb="md">
                Hardman & Reed is committed to full transparency across every loan product. Every approved applicant receives a standardized <strong>Key Fact Statement (KFS)</strong> and comprehensive disclosure document prior to contract signing detailing:
              </Text>
              <List spacing="xs" size="sm" icon={<IconCheck size={14} color="#12b886" />}>
                <List.Item>All-inclusive Annual Percentage Rate (APR), inclusive of all interest and origination charges.</List.Item>
                <List.Item>Itemized repayment schedule with explicit breakdown of principal amortization and accrued interest.</List.Item>
                <List.Item>Zero hidden balloon payment mandates, zero unannounced rate resets, and zero penalty locks for early settlement.</List.Item>
                <List.Item>Total finance charge and total amount repayable over the lifecycle of the facility.</List.Item>
              </List>
            </Paper>
          </MotionReveal>

          {/* Anti-Money Laundering & Sanctions Screening */}
          <MotionReveal direction="up" delay={0.1}>
            <Paper p="xl" radius="md" withBorder bg="#ffffff">
              <Group gap="sm" mb="md">
                <ThemeIcon size={36} radius="md" color="teal" variant="light">
                  <IconScale size={20} />
                </ThemeIcon>
                <Title order={3} size="h4" c="dark.8">
                  Anti-Money Laundering (AML) & Sanctions Screening
                </Title>
              </Group>
              <Text size="sm" c="dark.7" lh={1.7}>
                Every borrowing entity and ultimate beneficial owner (UBO holding &gt;= 25% equity) is systematically screened through automated compliance graphs against:
              </Text>
              <List spacing="xs" size="sm" mt="xs">
                <List.Item>US Office of Foreign Assets Control (OFAC) Specially Designated Nationals (SDN) lists.</List.Item>
                <List.Item>UK HM Treasury Consolidated Sanctions Lists.</List.Item>
                <List.Item>Global Politically Exposed Persons (PEP) registries and negative adverse media monitoring.</List.Item>
              </List>
            </Paper>
          </MotionReveal>

          {/* Grievance Redressal & Ombudsman Contact */}
          <MotionReveal direction="up" delay={0.1}>
            <Paper p="xl" radius="md" withBorder bg="#ffffff">
              <Group gap="sm" mb="md">
                <ThemeIcon size={36} radius="md" color="orange" variant="light">
                  <IconAlertTriangle size={20} />
                </ThemeIcon>
                <Title order={3} size="h4" c="dark.8">
                  Grievance Redressal & Compliance Escalation
                </Title>
              </Group>
              <Text size="sm" c="dark.7" lh={1.7}>
                If your business has a grievance or inquiry regarding loan underwriting, servicing accuracy, or regulatory disclosures, our dedicated compliance desk is available to assist.
              </Text>
              <Paper p="md" radius="sm" bg="#f8fafc" withBorder mt="md">
                <Group justify="space-between" align="center" wrap="wrap">
                  <div>
                    <Text size="xs" fw={700} c="dark.8">
                      Chief Compliance Officer & Grievance Officer
                    </Text>
                    <Text size="xs" c="dimmed">
                      credit-desk@hardmanreed.com · Desk: +1 (800) 427-3626
                    </Text>
                    <Text size="11px" c="dimmed" mt={2}>
                      Escalations acknowledged within 24 hours · Final resolution SLA within 7 business days.
                    </Text>
                  </div>
                  <Badge color="orange" variant="light">
                    Direct Ombudsman Desk
                  </Badge>
                </Group>
              </Paper>
            </Paper>
          </MotionReveal>
        </Stack>
      </Container>
    </Box>
  );
};

