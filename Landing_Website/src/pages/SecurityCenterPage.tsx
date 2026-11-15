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
  IconShieldCheck,
  IconLock,
  IconKey,
  IconServer,
  IconAlertCircle,
  IconCertificate,
  IconCheck,
  IconRefresh,
} from '@tabler/icons-react';
import { MotionReveal, MotionStaggerContainer, MotionStaggerItem } from '../components/MotionReveal';

const securityPillars = [
  {
    icon: IconLock,
    title: 'Cryptographic Encryption',
    color: 'blue',
    desc: 'All borrower financial records and bureau payloads are encrypted using AES-256 bit keys at rest. All communications enforce TLS 1.3 with Perfect Forward Secrecy (PFS).',
  },
  {
    icon: IconKey,
    title: 'Zero-Trust & Hardware MFA',
    color: 'teal',
    desc: 'FIDO2 / WebAuthn hardware token authentication enforced across all internal underwriter and developer console endpoints. Strictly scoped Role-Based Access Controls (RBAC).',
  },
  {
    icon: IconCertificate,
    title: 'SOC 2 Type II & ISO 27001',
    color: 'indigo',
    desc: 'Continuously audited by independent AICPA-accredited assessors across all 5 Trust Services Criteria: Security, Availability, Processing Integrity, Confidentiality, and Privacy.',
  },
  {
    icon: IconServer,
    title: 'High Availability & Resiliency',
    color: 'cyan',
    desc: 'Distributed across redundant Tier-IV cloud availability zones with automated failover, 15-minute Recovery Point Objective (RPO), and 99.99% historical uptime SLA.',
  },
];

export const SecurityCenterPage: React.FC = () => {
  return (
    <Box py={{ base: 40, md: 60 }}>
      <Container size="lg">
        {/* Header */}
        <MotionReveal direction="up" delay={0.05}>
          <Box mb={50} ta="center">
            <Badge color="teal" variant="light" size="lg" mb="sm">
              Trust & Safety
            </Badge>
            <Title order={1} fw={800} c="#094067" style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)' }}>
              Security Center
            </Title>
            <Text size="lg" c="dimmed" mt="sm" style={{ maxWidth: 720, margin: '12px auto 0' }}>
              Institutional-grade cyber defense and cryptographic controls safeguarding billions in corporate transactions, banking feeds, and underwriting data.
            </Text>
          </Box>
        </MotionReveal>

        {/* Pillars Grid */}
        <Box mb={60}>
          <MotionStaggerContainer staggerDelay={0.08}>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
              {securityPillars.map((p) => (
                <MotionStaggerItem key={p.title}>
                  <Paper p="xl" radius="md" withBorder className="card-hover" bg="#ffffff" style={{ height: '100%' }}>
                    <ThemeIcon size={44} radius="md" color={p.color} variant="light" mb="md">
                      <p.icon size={24} stroke={1.8} />
                    </ThemeIcon>
                    <Title order={3} size="h4" c="dark.8" mb="xs">
                      {p.title}
                    </Title>
                    <Text size="sm" c="dimmed" lh={1.6}>
                      {p.desc}
                    </Text>
                  </Paper>
                </MotionStaggerItem>
              ))}
            </SimpleGrid>
          </MotionStaggerContainer>
        </Box>

        {/* Detailed Security Practices */}
        <Stack gap="xl">
          <MotionReveal direction="up" delay={0.1}>
            <Paper p="xl" radius="md" withBorder bg="#ffffff">
              <Title order={3} size="h4" c="dark.8" mb="md">
                Independent Audits & Continuous Penetration Testing
              </Title>
              <Text size="sm" c="dark.7" lh={1.7} mb="md">
                Hardman & Reed commissions mandatory quarterly external penetration tests conducted by top CREST-certified cybersecurity firms. Our continuous integration pipelines incorporate automated static analysis (SAST), dynamic vulnerability assessment (DAST), and dependency vulnerability scans prior to deployment.
              </Text>
              <List spacing="xs" size="sm" icon={<IconCheck size={14} color="#12b886" />}>
                <List.Item>Quarterly gray-box and black-box penetration audits of origination APIs.</List.Item>
                <List.Item>24/7 Managed Security Operations Center (SOC) with automated threat detection and SIEM logging.</List.Item>
                <List.Item>Cryptographically immutable audit trails recording all credit policy executions and underwriting actions.</List.Item>
              </List>
            </Paper>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.1}>
            <Paper p="xl" radius="md" withBorder bg="#ffffff">
              <Title order={3} size="h4" c="dark.8" mb="md">
                Responsible Vulnerability Disclosure Program
              </Title>
              <Text size="sm" c="dark.7" lh={1.7} mb="sm">
                We value the contributions of white-hat security researchers. If you identify a potential security vulnerability within Hardman & Reed systems, we encourage responsible disclosure without public exploitation.
              </Text>
              <Paper p="md" radius="sm" bg="#f8fafc" withBorder mt="md">
                <Group justify="space-between" align="center" wrap="wrap">
                  <div>
                    <Text size="xs" fw={700} c="dark.8">
                      Security Response Desk (PGP Key Available Upon Request)
                    </Text>
                    <Text size="xs" c="dimmed">
                      credit-desk@hardmanreed.com · Response SLA: &lt; 24 hours
                    </Text>
                  </div>
                  <Badge color="teal" variant="light">
                    Safe Harbor Compliant
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

