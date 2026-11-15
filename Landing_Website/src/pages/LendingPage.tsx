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
  Slider,
  Grid,
  Select,
  Box,
  Divider,
  List,
} from '@mantine/core';
import {
  IconCoins,
  IconReceipt2,
  IconTruckLoading,
  IconBriefcase,
  IconBuildingStore,
  IconCheck,
  IconArrowRight,
  IconCalculator,
  IconCpu,
} from '@tabler/icons-react';
import { MotionReveal, MotionStaggerContainer, MotionStaggerItem } from '../components/MotionReveal';

interface LendingPageProps {
  onOpenApply: () => void;
  onOpenDemo: () => void;
}

const loanProducts = [
  {
    name: 'Working Capital Loan',
    purpose: 'Day-to-day operations, payroll & inventory restocking',
    amount: '$10K – $500K',
    term: '3 – 24 months',
    rate: 'Starting at 7.9% APR',
    icon: IconCoins,
    color: 'blue',
    features: ['No personal asset pledge', 'Pre-approval in 180 seconds', 'Daily/weekly/monthly debits'],
  },
  {
    name: 'Invoice Financing',
    purpose: 'Unlock cash tied up in unpaid enterprise receivables',
    amount: 'Up to 90% of invoice face value',
    term: '30 – 90 days',
    rate: '1.2% – 2.5% per 30 days',
    icon: IconReceipt2,
    color: 'teal',
    features: ['Non-notification factoring options', 'Integrates with QuickBooks/Xero', 'Advance deposited within 24h'],
  },
  {
    name: 'Equipment Financing',
    purpose: 'Machinery, vehicles, commercial hardware & technology',
    amount: '$25K – $1M',
    term: '12 – 60 months',
    rate: 'Starting at 6.8% APR',
    icon: IconTruckLoading,
    color: 'indigo',
    features: ['Equipment acts as collateral', '100% purchase cost financing', 'Potential tax depreciation deductions'],
  },
  {
    name: 'Business Line of Credit',
    purpose: 'Flexible revolving credit buffer for seasonal liquidity dips',
    amount: '$10K – $250K',
    term: 'Revolving (12–24 mo renewal)',
    rate: 'Draw-based interest from 8.5% APR',
    icon: IconBriefcase,
    color: 'cyan',
    features: ['Only pay interest on what you draw', 'Immediate repeat drawdowns via portal', 'Funds replenish automatically'],
  },
  {
    name: 'Expansion Term Loan',
    purpose: 'Strategic acquisition, second location, or facility expansion',
    amount: '$100K – $5M',
    term: '1 – 5 years',
    rate: 'Starting at 7.2% APR',
    icon: IconBuildingStore,
    color: 'violet',
    features: ['Fixed monthly installments', 'Predictable long-term budgeting', 'Tailored covenant packages'],
  },
];

export const LendingPage: React.FC<LendingPageProps> = ({ onOpenApply, onOpenDemo }) => {
  // Rate Calculator State
  const [calcAmount, setCalcAmount] = useState(150000);
  const [calcTerm, setCalcTerm] = useState(24);
  const [calcProduct, setCalcProduct] = useState('Working Capital Loan');

  const getEstimatedRate = () => {
    switch (calcProduct) {
      case 'Working Capital Loan':
        return 0.089; // 8.9%
      case 'Equipment Financing':
        return 0.075; // 7.5%
      case 'Business Line of Credit':
        return 0.095; // 9.5%
      case 'Expansion Term Loan':
        return 0.079; // 7.9%
      default:
        return 0.085;
    }
  };

  const apr = getEstimatedRate();
  const monthlyRate = apr / 12;
  const monthlyPayment = Math.round(
    (calcAmount * (monthlyRate * Math.pow(1 + monthlyRate, calcTerm))) /
      (Math.pow(1 + monthlyRate, calcTerm) - 1)
  );
  const totalCost = Math.round(monthlyPayment * calcTerm);
  const totalInterest = totalCost - calcAmount;

  return (
    <Box py={{ base: 40, md: 60 }}>
      <Container size="xl">
        {/* Header */}
        <MotionReveal direction="up" delay={0.05}>
          <Box ta="center" mb={60}>
            <Badge color="blue" variant="light" size="lg" mb="sm">
              Institutional SMB Credit
            </Badge>
            <Title
              order={1}
              fw={800}
              c="#094067"
              style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', lineHeight: 1.2 }}
            >
              Flexible Capital Built for Every SMB Milestone
            </Title>
            <Text size="lg" c="dimmed" mt="md" style={{ maxWidth: 700, margin: '16px auto 0' }}>
              Transparent credit facilities from $10,000 to $5,000,000. No predatory prepayment penalties, no application fees, and clear amortization terms.
            </Text>
            <Group justify="center" mt="xl">
              <Button size="md" color="blue" onClick={onOpenApply} rightSection={<IconArrowRight size={16} />}>
                Apply in 3 Minutes
              </Button>
              <Button size="md" variant="default" onClick={onOpenDemo}>
                Discuss Custom Facilities
              </Button>
            </Group>
          </Box>
        </MotionReveal>

        {/* SECTION 1: LOAN PRODUCTS */}
        <Box mb={80}>
          <MotionReveal direction="up" delay={0.1}>
            <Box mb="xl">
              <Badge color="blue" size="sm">
                Facilities Menu
              </Badge>
              <Title order={2} fw={800} mt={4} c="dark.8">
                Loan Products Overview
              </Title>
              <Text size="sm" c="dimmed">
                Designed to match specific commercial cash flow profiles and capital requirements.
              </Text>
            </Box>
          </MotionReveal>

          <MotionStaggerContainer staggerDelay={0.09}>
            <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="lg">
              {loanProducts.map((p) => (
                <MotionStaggerItem key={p.name}>
                  <Paper p="xl" radius="md" withBorder className="card-hover" bg="#ffffff" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Group justify="space-between" align="flex-start" mb="md">
                      <ThemeIcon size={44} radius="md" color={p.color} variant="light">
                        <p.icon size={24} />
                      </ThemeIcon>
                      <Badge color={p.color} variant="light" size="sm">
                        {p.term}
                      </Badge>
                    </Group>

                    <Title order={3} size="h4" fw={700} c="dark.8">
                      {p.name}
                    </Title>
                    <Text size="xs" c="dimmed" mt={4} mb="md" style={{ minHeight: 36 }}>
                      {p.purpose}
                    </Text>

                    <Paper p="sm" radius="md" bg="#f8fafc" withBorder mb="md">
                      <Group justify="space-between">
                        <div>
                          <Text size="11px" c="dimmed" fw={700}>
                            BORROWING LIMIT
                          </Text>
                          <Text fw={800} size="md" c="blue.8">
                            {p.amount}
                          </Text>
                        </div>
                        <div>
                          <Text size="11px" c="dimmed" fw={700}>
                            PRICING
                          </Text>
                          <Text fw={700} size="xs" c="teal.8">
                            {p.rate}
                          </Text>
                        </div>
                      </Group>
                    </Paper>

                    <Stack gap={6} mb="xl" style={{ flex: 1 }}>
                      {p.features.map((feat) => (
                        <Group key={feat} gap="xs" wrap="nowrap" align="flex-start">
                          <IconCheck size={14} color="#12b886" style={{ marginTop: 2, flexShrink: 0 }} />
                          <Text size="xs" c="dark.6">
                            {feat}
                          </Text>
                        </Group>
                      ))}
                    </Stack>

                    <Button fullWidth color={p.color} variant="light" onClick={onOpenApply} mt="auto">
                      Check Eligibility for this Loan
                    </Button>
                  </Paper>
                </MotionStaggerItem>
              ))}
            </SimpleGrid>
          </MotionStaggerContainer>
        </Box>

        {/* SECTION 2: INTERACTIVE RATES & EMI CALCULATOR */}
        <Box mb={80}>
          <MotionReveal direction="up" delay={0.15}>
            <Paper p={{ base: 'lg', md: 'xl' }} radius="lg" withBorder bg="#f8fafc">
              <Group justify="space-between" mb="lg">
                <div>
                  <Badge color="teal" variant="filled" size="sm">
                    Transparent Estimation
                  </Badge>
                  <Title order={2} fw={800} mt={4} c="#094067">
                    Interactive SMB Rate & Repayment Calculator
                  </Title>
                  <Text size="xs" c="dimmed">
                    Estimate monthly payments and loan economics with zero commitment or credit impact.
                  </Text>
                </div>
                <ThemeIcon size={38} radius="md" color="teal" variant="light">
                  <IconCalculator size={22} />
                </ThemeIcon>
              </Group>

              <Grid gap="xl" align="center">
                {/* Sliders and inputs */}
                <Grid.Col span={{ base: 12, md: 7 }}>
                  <Stack gap="lg">
                    <Select
                      label="Financing Facility"
                      data={[
                        'Working Capital Loan',
                        'Equipment Financing',
                        'Business Line of Credit',
                        'Expansion Term Loan',
                      ]}
                      value={calcProduct}
                      onChange={(val) => setCalcProduct(val || 'Working Capital Loan')}
                    />

                    <div>
                      <Group justify="space-between" mb="xs">
                        <Text size="sm" fw={600}>
                          Loan Amount:
                        </Text>
                        <Badge size="lg" color="blue" variant="filled">
                          ${calcAmount.toLocaleString()}
                        </Badge>
                      </Group>
                      <Slider
                        value={calcAmount}
                        onChange={setCalcAmount}
                        min={10000}
                        max={500000}
                        step={5000}
                        marks={[
                          { value: 10000, label: '$10K' },
                          { value: 150000, label: '$150K' },
                          { value: 300000, label: '$300K' },
                          { value: 500000, label: '$500K' },
                        ]}
                        mb="md"
                      />
                    </div>

                    <div>
                      <Group justify="space-between" mb="xs">
                        <Text size="sm" fw={600}>
                          Repayment Term (Months):
                        </Text>
                        <Badge size="lg" color="teal" variant="filled">
                          {calcTerm} Months
                        </Badge>
                      </Group>
                      <Slider
                        value={calcTerm}
                        onChange={setCalcTerm}
                        min={6}
                        max={48}
                        step={6}
                        marks={[
                          { value: 6, label: '6 mo' },
                          { value: 12, label: '12 mo' },
                          { value: 24, label: '24 mo' },
                          { value: 36, label: '36 mo' },
                          { value: 48, label: '48 mo' },
                        ]}
                      />
                    </div>
                  </Stack>
                </Grid.Col>

                {/* Live Output Card */}
                <Grid.Col span={{ base: 12, md: 5 }}>
                  <Paper p="xl" radius="md" bg="#ffffff" withBorder>
                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                      Estimated Monthly Installment
                    </Text>
                    <Text fw={800} size="32px" c="blue.8" my="xs">
                      ${monthlyPayment.toLocaleString()}
                      <Text span size="sm" c="dimmed" fw={500}>
                        /month
                      </Text>
                    </Text>

                    <Divider my="sm" />

                    <Stack gap="xs">
                      <Group justify="space-between">
                        <Text size="xs" c="dimmed">
                          Estimated Benchmark APR:
                        </Text>
                        <Text size="xs" fw={700} c="dark.8">
                          {(apr * 100).toFixed(1)}% Fixed
                        </Text>
                      </Group>
                      <Group justify="space-between">
                        <Text size="xs" c="dimmed">
                          Principal Borrowed:
                        </Text>
                        <Text size="xs" fw={700} c="dark.8">
                          ${calcAmount.toLocaleString()}
                        </Text>
                      </Group>
                      <Group justify="space-between">
                        <Text size="xs" c="dimmed">
                          Total Estimated Interest:
                        </Text>
                        <Text size="xs" fw={700} c="dark.8">
                          ${totalInterest.toLocaleString()}
                        </Text>
                      </Group>
                      <Group justify="space-between">
                        <Text size="xs" c="dimmed">
                          Prepayment Penalty:
                        </Text>
                        <Badge color="green" size="xs">
                          $0.00 (Zero Fee)
                        </Badge>
                      </Group>
                    </Stack>

                    <Button fullWidth color="blue" size="md" mt="lg" onClick={onOpenApply}>
                      Lock in this Rate Quote
                    </Button>
                  </Paper>
                </Grid.Col>
              </Grid>
            </Paper>
          </MotionReveal>
        </Box>

        {/* SECTION 3: ELIGIBILITY & CREDIT DECISIONING */}
        <Box mb={50}>
          <Grid gap="xl">
            {/* Eligibility Criteria */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <MotionReveal direction="right" delay={0.1} style={{ height: '100%' }}>
                <Paper p="xl" radius="lg" withBorder bg="#ffffff" style={{ height: '100%' }}>
                  <Group gap="xs" mb="md">
                    <ThemeIcon size={36} radius="md" color="teal" variant="light">
                      <IconCheck size={20} />
                    </ThemeIcon>
                    <div>
                      <Text fw={700} size="lg">
                        Eligibility Requirements
                      </Text>
                      <Text size="xs" c="dimmed">
                        Accessible standards designed for real businesses
                      </Text>
                    </div>
                  </Group>

                  <List spacing="md" size="sm" center icon={<IconCheck size={16} color="#12b886" />}>
                    <List.Item>
                      <strong>Operating History:</strong> Minimum 6 months of registered commercial operations.
                    </List.Item>
                    <List.Item>
                      <strong>Annual Revenue:</strong> At least $100,000 in gross annual revenues (or $10,000/month recurring).
                    </List.Item>
                    <List.Item>
                      <strong>Corporate Entity:</strong> Registered LLC, Corporation, Partnership, or Sole Proprietorship.
                    </List.Item>
                    <List.Item>
                      <strong>Bank Account:</strong> Dedicated business checking account with minimum 3 months transaction history.
                    </List.Item>
                    <List.Item>
                      <strong>Credit Profile:</strong> Minimum 580 owner FICO or clean business cash flow track record.
                    </List.Item>
                  </List>
                </Paper>
              </MotionReveal>
            </Grid.Col>

            {/* Credit Decisioning Matrix */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <MotionReveal direction="left" delay={0.15} style={{ height: '100%' }}>
                <Paper p="xl" radius="lg" withBorder bg="#ffffff" style={{ height: '100%' }}>
                  <Group gap="xs" mb="md">
                    <ThemeIcon size={36} radius="md" color="indigo" variant="light">
                      <IconCpu size={20} />
                    </ThemeIcon>
                    <div>
                      <Text fw={700} size="lg">
                        How We Decision Credit
                      </Text>
                      <Text size="xs" c="dimmed">
                        Holistic cash velocity instead of obsolete collateral
                      </Text>
                    </div>
                  </Group>

                  <Stack gap="sm">
                    <Paper p="sm" radius="md" bg="#f8fafc" withBorder>
                      <Text size="xs" fw={700} c="dark.8">
                        1. Continuous Cash Flow Analysis (40% Weight)
                      </Text>
                      <Text size="xs" c="dimmed" mt={2}>
                        Real-time assessment of monthly deposits, payment consistency, and buffer days to ensure debt servicing sustainability.
                      </Text>
                    </Paper>

                    <Paper p="sm" radius="md" bg="#f8fafc" withBorder>
                      <Text size="xs" fw={700} c="dark.8">
                        2. Bureau History & Trade Credit (25% Weight)
                      </Text>
                      <Text size="xs" c="dimmed" mt={2}>
                        Synthesis across Experian, Equifax, and CIBIL commercial credit profiles to evaluate historical supplier reliability.
                      </Text>
                    </Paper>

                    <Paper p="sm" radius="md" bg="#f8fafc" withBorder>
                      <Text size="xs" fw={700} c="dark.8">
                        3. Customer Retention & Repeat Orders (20% Weight)
                      </Text>
                      <Text size="xs" c="dimmed" mt={2}>
                        Evaluation of customer concentration risk, recurring contracts, and accounts receivable aging velocity.
                      </Text>
                    </Paper>

                    <Paper p="sm" radius="md" bg="#f8fafc" withBorder>
                      <Text size="xs" fw={700} c="dark.8">
                        4. Macro & Industry Benchmarks (15% Weight)
                      </Text>
                      <Text size="xs" c="dimmed" mt={2}>
                        Sector-specific volatility indices to calibrate risk spreads and protect borrower health during cyclical contractions.
                      </Text>
                    </Paper>
                  </Stack>
                </Paper>
              </MotionReveal>
            </Grid.Col>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
