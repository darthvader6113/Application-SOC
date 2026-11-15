import React from 'react';
import {
  Container,
  Title,
  Text,
  Accordion,
  Grid,
  Paper,
  ThemeIcon,
  Badge,
  Stack,
  Group,
  List,
} from '@mantine/core';
import {
  IconHelpCircle,
  IconClock,
  IconCheck,
  IconFileCheck,
  IconShieldLock,
} from '@tabler/icons-react';

const faqs = [
  {
    value: 'approval-speed',
    question: 'How fast can our business receive approved loan funds?',
    answer:
      'With our automated bank feed ingestion and algorithmic credit models, initial pre-approval occurs within 180 seconds. Full digital underwriting and contract sign-off are completed within 24 hours, with funds wired straight to your designated corporate account.',
  },
  {
    value: 'credit-impact',
    question: 'Does checking eligibility or applying affect our business credit score?',
    answer:
      'No. When checking your borrowing capacity or requesting initial term sheets, Hardman & Reed conducts a soft bureau pull that has zero negative impact on your Experian, CIBIL, or Equifax commercial credit scores. A formal hard inquiry only occurs after you formally accept loan terms.',
  },
  {
    value: 'underwriting-criteria',
    question: 'What factors does the AI underwriting engine evaluate?',
    answer:
      'Unlike legacy banks that rely solely on outdated annual tax balance sheets, our decisioning engine evaluates real-time operating metrics: daily cash flow volatility, revenue recurrence, customer concentration, invoice turnover, vendor payment track records, and operational stability.',
  },
  {
    value: 'collateral-requirements',
    question: 'Are personal guarantees or pledged collateral always required?',
    answer:
      'Not for all facilities. Working capital lines and invoice financing are primarily unsecured or backed directly by your verified receivable assets. For larger equipment or expansion term loans exceeding $1M, the financed equipment itself serves as security.',
  },
  {
    value: 'integrations-tech',
    question: 'Can banks and enterprise lenders license the Hardman & Reed Lending OS?',
    answer:
      'Yes. Hardman & Reed operates both as an institutional SMB funding network and offers an enterprise white-label SaaS suite for regional banks, non-banking financial companies (NBFCs), and fintech platforms.',
  },
];

export const FaqWithImage: React.FC = () => {
  return (
    <Container size="lg" py="xl">
      <Grid gap={{ base: 'xl', md: 50 }} align="center">
        {/* Left Side: Graphic / Info Banner */}
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Paper
            p="xl"
            radius="lg"
            withBorder
            style={{
              background: 'linear-gradient(180deg, #f8fbfd 0%, #eef5fb 100%)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Badge color="blue" variant="light" size="md" mb="sm">
              Answers & Guidance
            </Badge>
            <Title order={3} fw={800} c="#094067">
              Frequently Asked Questions
            </Title>
            <Text size="sm" c="dimmed" mt="xs" mb="lg">
              Everything you need to know about our automated SMB credit engine, interest structures, and regulatory compliance.
            </Text>

            <Stack gap="md" mt="md">
              <Group gap="sm">
                <ThemeIcon size={28} radius="xl" color="teal" variant="light">
                  <IconCheck size={16} />
                </ThemeIcon>
                <Text size="xs" fw={600}>
                  Transparent rates from 7.9% APR
                </Text>
              </Group>

              <Group gap="sm">
                <ThemeIcon size={28} radius="xl" color="blue" variant="light">
                  <IconClock size={16} />
                </ThemeIcon>
                <Text size="xs" fw={600}>
                  Real-time disbursement in 24 hours
                </Text>
              </Group>

              <Group gap="sm">
                <ThemeIcon size={28} radius="xl" color="indigo" variant="light">
                  <IconShieldLock size={16} />
                </ThemeIcon>
                <Text size="xs" fw={600}>
                  Bank-grade encryption & SOC2 security
                </Text>
              </Group>
            </Stack>
          </Paper>
        </Grid.Col>

        {/* Right Side: Accordion */}
        <Grid.Col span={{ base: 12, md: 7 }}>
          <Accordion variant="separated" radius="md" defaultValue="approval-speed">
            {faqs.map((faq) => (
              <Accordion.Item key={faq.value} value={faq.value} style={{ border: '1px solid #e9ecef' }}>
                <Accordion.Control icon={<IconHelpCircle size={18} color="#1971c2" />}>
                  <Text fw={600} size="sm">
                    {faq.question}
                  </Text>
                </Accordion.Control>
                <Accordion.Panel>
                  <Text size="sm" c="dimmed" lh={1.6}>
                    {faq.answer}
                  </Text>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
