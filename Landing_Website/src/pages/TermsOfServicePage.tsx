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
  IconGavel,
  IconBuildingStore,
  IconCoin,
  IconShieldExclamation,
  IconFileCertificate,
  IconCheck,
} from '@tabler/icons-react';
import { MotionReveal } from '../components/MotionReveal';

export const TermsOfServicePage: React.FC = () => {
  return (
    <Box py={{ base: 40, md: 60 }}>
      <Container size="lg">
        {/* Header */}
        <MotionReveal direction="up" delay={0.05}>
          <Box mb={50}>
            <Badge color="blue" variant="light" size="lg" mb="sm">
              Terms & Governance
            </Badge>
            <Title order={1} fw={800} c="#094067" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)' }}>
              Terms of Service
            </Title>
            <Group gap="xs" mt="xs">
              <Text size="xs" c="dimmed">
                Last Updated: November 12, 2026
              </Text>
              <Text size="xs" c="dimmed">·</Text>
              <Text size="xs" c="dimmed">
                Commercial Lending Agreement
              </Text>
            </Group>
            <Text size="md" c="dimmed" mt="md" lh={1.7}>
              These Terms of Service (&quot;Terms&quot;) govern access to and utilization of the Hardman & Reed Lending Operating System, origination portal, APIs, and credit facilities. By submitting an application or accessing our platform, your business agrees to be bound by these Terms.
            </Text>
          </Box>
        </MotionReveal>

        <Stack gap="xl">
          {/* Section 1 */}
          <MotionReveal direction="up" delay={0.1}>
            <Paper p="xl" radius="md" withBorder bg="#ffffff">
              <Group gap="sm" mb="md">
                <ThemeIcon size={36} radius="md" color="blue" variant="light">
                  <IconBuildingStore size={20} />
                </ThemeIcon>
                <Title order={3} size="h4" c="dark.8">
                  1. Commercial B2B Scope & Applicant Representation
                </Title>
              </Group>
              <Text size="sm" c="dark.7" lh={1.7} mb="sm">
                Hardman & Reed services are strictly intended for <strong>commercial entities and bona fide small/medium businesses</strong>. Our facilities may not be utilized for personal, family, or consumer household borrowing.
              </Text>
              <Text size="sm" c="dark.7" lh={1.7}>
                By applying, you represent and warrant that:
              </Text>
              <List spacing="xs" size="sm" mt="xs" icon={<IconCheck size={14} color="#12b886" />}>
                <List.Item>You possess lawful legal authority to obligate the corporate applicant.</List.Item>
                <List.Item>All financial reports, bank credentials, tax forms, and entity filings provided are authentic and unmanipulated.</List.Item>
                <List.Item>The business entity is currently active, in good corporate standing, and not subject to active insolvency proceedings.</List.Item>
              </List>
            </Paper>
          </MotionReveal>

          {/* Section 2 */}
          <MotionReveal direction="up" delay={0.1}>
            <Paper p="xl" radius="md" withBorder bg="#ffffff">
              <Group gap="sm" mb="md">
                <ThemeIcon size={36} radius="md" color="teal" variant="light">
                  <IconCoin size={20} />
                </ThemeIcon>
                <Title order={3} size="h4" c="dark.8">
                  2. Loan Applications, Pre-Approvals & Sanctions
                </Title>
              </Group>
              <Text size="sm" c="dark.7" lh={1.7} mb="sm">
                Any pre-approval estimate, borrowing capacity figure, or indicative rate quote displayed via our algorithmic calculators or application portal represents an <strong>estimate only</strong> and does not constitute a binding commitment to lend.
              </Text>
              <Text size="sm" c="dark.7" lh={1.7}>
                Formal loan sanctions require satisfactory completion of:
              </Text>
              <List spacing="xs" size="sm" mt="xs">
                <List.Item>Live bank ledger verification via open-banking connector.</List.Item>
                <List.Item>Satisfactory fraud checks and beneficial owner OFAC/AML screening.</List.Item>
                <List.Item>Formal electronic execution of definitive promissory notes, loan agreements, or factoring contracts.</List.Item>
              </List>
            </Paper>
          </MotionReveal>

          {/* Section 3 */}
          <MotionReveal direction="up" delay={0.1}>
            <Paper p="xl" radius="md" withBorder bg="#ffffff">
              <Group gap="sm" mb="md">
                <ThemeIcon size={36} radius="md" color="indigo" variant="light">
                  <IconFileCertificate size={20} />
                </ThemeIcon>
                <Title order={3} size="h4" c="dark.8">
                  3. Automated Servicing, Debits & Repayment Obligations
                </Title>
              </Group>
              <Text size="sm" c="dark.7" lh={1.7}>
                Borrowers agree to maintain sufficient collected commercial funds in designated checking accounts for scheduled electronic ACH/NACH loan deductions. Hardman & Reed imposes <strong>zero prepayment penalties</strong> on term facilities unless explicitly agreed in custom syndication schedules.
              </Text>
              <Text size="sm" c="dark.7" lh={1.7} mt="sm">
                In the event of dishonored debits or non-payment, automated delinquency management protocols engage in compliance with fair commercial lending practices.
              </Text>
            </Paper>
          </MotionReveal>

          {/* Section 4 */}
          <MotionReveal direction="up" delay={0.1}>
            <Paper p="xl" radius="md" withBorder bg="#ffffff">
              <Group gap="sm" mb="md">
                <ThemeIcon size={36} radius="md" color="red" variant="light">
                  <IconShieldExclamation size={20} />
                </ThemeIcon>
                <Title order={3} size="h4" c="dark.8">
                  4. Disclaimers, Limitation of Liability & Governing Law
                </Title>
              </Group>
              <Text size="sm" c="dark.7" lh={1.7}>
                Except as expressly provided in formal loan contracts, our software platform and automated decisioning tools are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of merchantability or uninterrupted uptime.
              </Text>
              <Text size="sm" c="dark.7" lh={1.7} mt="sm">
                These Terms are governed by the commercial laws of the State of New York and applicable federal banking regulations, without regard to conflicts of law provisions. Disputes arising under platform usage shall be resolved through confidential commercial arbitration administered by JAMS or AAA in New York, NY.
              </Text>
              <Divider my="md" />
              <Group justify="space-between" align="center" wrap="wrap">
                <Text size="xs" c="dimmed">
                  Legal Inquiries: credit-desk@hardmanreed.com
                </Text>
                <Badge color="gray" variant="light">
                  Commercial B2B Terms
                </Badge>
              </Group>
            </Paper>
          </MotionReveal>
        </Stack>
      </Container>
    </Box>
  );
};

