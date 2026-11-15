import React from 'react';
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Badge,
  Grid,
  Paper,
  ThemeIcon,
  SimpleGrid,
  Stack,
  Box,
  rem,
} from '@mantine/core';
import {
  IconArrowRight,
  IconCheck,
  IconClock,
  IconFileText,
  IconCpu,
  IconCoins,
  IconShieldCheck,
  IconAlertTriangle,
  IconBolt,
  IconDeviceAnalytics,
  IconCircleCheckFilled,
  IconSparkles,
} from '@tabler/icons-react';
import { StatsCard } from '../components/StatsCard';
import { TrustBadges } from '../components/TrustBadges';
import { ProgressButton } from '../components/ProgressButton';
import { EmailBanner } from '../components/EmailBanner';
import { MotionReveal, MotionStaggerContainer, MotionStaggerItem } from '../components/MotionReveal';

interface HomePageProps {
  onOpenApply: () => void;
  onOpenDemo: () => void;
  setActivePage: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenApply,
  onOpenDemo,
  setActivePage,
}) => {
  return (
    <Box>
      {/* SECTION 1: HERO (Hero with content on left) */}
      <Box
        py={{ base: 50, md: 90 }}
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #f8fbfd 0%, #edf5fc 45%, #f1faf6 100%)',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        {/* Decorative Grid Pattern Overlay */}
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(25, 113, 194, 0.12) 1.5px, transparent 0),
              linear-gradient(to right, rgba(226, 232, 240, 0.45) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(226, 232, 240, 0.45) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px, 64px 64px, 64px 64px',
            opacity: 0.85,
            pointerEvents: 'none',
            maskImage: 'radial-gradient(ellipse 90% 80% at 50% 40%, #000 50%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 40%, #000 50%, transparent 100%)',
          }}
        />

        {/* Ambient Radial Glowing Orbs */}
        <Box
          style={{
            position: 'absolute',
            top: '-15%',
            right: '-5%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(25, 113, 194, 0.14) 0%, rgba(20, 184, 166, 0.08) 45%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(30px)',
            pointerEvents: 'none',
          }}
        />
        <Box
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '-10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(9, 64, 103, 0.08) 0%, rgba(25, 113, 194, 0.04) 50%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />

        {/* Abstract SVG Capital Wave Lines */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            opacity: 0.4,
            pointerEvents: 'none',
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 600"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M-100,100 C300,350 700,50 1200,280 C1350,340 1500,200 1600,150"
            stroke="url(#hero-gradient-1)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path
            d="M-50,220 C350,420 800,150 1300,380 C1420,430 1550,320 1650,260"
            stroke="url(#hero-gradient-2)"
            strokeWidth="2"
          />
          <path
            d="M0,320 C450,520 900,260 1400,480 C1500,520 1600,420 1700,380"
            stroke="url(#hero-gradient-1)"
            strokeWidth="1"
            opacity="0.6"
          />
          <defs>
            <linearGradient id="hero-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1971c2" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#1098ad" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#12b886" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="hero-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#094067" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#1971c2" stopOpacity="0.15" />
            </linearGradient>
          </defs>
        </svg>

        <Container size="xl" style={{ position: 'relative', zIndex: 1 }}>
          <Grid gap={{ base: 30, md: 60 }} align="center">
            {/* Left Content */}
            <Grid.Col span={{ base: 12, md: 7 }}>
              <MotionReveal direction="up" delay={0.05}>
                <div className="pulse-badge" style={{ marginBottom: rem(16) }}>
                  <span className="pulse-dot" />
                  <Badge color="blue" variant="light" size="lg" radius="sm">
                    Next-Gen SMB Underwriting & Credit Rails
                  </Badge>
                </div>

                <Title
                  order={1}
                  style={{
                    fontSize: 'clamp(2.4rem, 4vw, 3.8rem)',
                    fontWeight: 800,
                    lineHeight: 1.15,
                    letterSpacing: '-1px',
                    color: '#094067',
                  }}
                >
                  Fast, intelligent lending for{' '}
                  <span className="gradient-text">small businesses</span>
                </Title>

                <Text size="lg" c="dimmed" mt="lg" mb="xl" lh={1.6} style={{ maxWidth: 600 }}>
                  Eliminate weeks of opaque bureaucratic paperwork. Hardman & Reed unlocks up to <strong>$5,000,000</strong> in dynamic working capital with automated bank analysis, real-time credit decisioning, and <strong>24-hour wire disbursement</strong>.
                </Text>

                {/* CTAs */}
                <Group gap="md" mb="xl">
                  <Button
                    size="lg"
                    color="blue"
                    onClick={onOpenApply}
                    rightSection={<IconArrowRight size={18} />}
                    style={{
                      paddingLeft: 28,
                      paddingRight: 28,
                    }}
                  >
                    Apply Now
                  </Button>
                  <Button size="lg" variant="default" onClick={onOpenDemo}>
                    Book Demo
                  </Button>
                </Group>

                {/* Highlights */}
                <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="xs" pt="sm">
                  <Group gap={6}>
                    <IconCircleCheckFilled size={18} color="#12b886" />
                    <Text size="xs" fw={600} c="dark.7">
                      24h Wire Transfer
                    </Text>
                  </Group>
                  <Group gap={6}>
                    <IconCircleCheckFilled size={18} color="#12b886" />
                    <Text size="xs" fw={600} c="dark.7">
                      Soft Credit Check
                    </Text>
                  </Group>
                  <Group gap={6}>
                    <IconCircleCheckFilled size={18} color="#12b886" />
                    <Text size="xs" fw={600} c="dark.7">
                      SOC 2 Audited
                    </Text>
                  </Group>
                  <Group gap={6}>
                    <IconCircleCheckFilled size={18} color="#12b886" />
                    <Text size="xs" fw={600} c="dark.7">
                      Rates from 7.9%
                    </Text>
                  </Group>
                </SimpleGrid>
              </MotionReveal>
            </Grid.Col>

            {/* Right Visual Card (Interactive Platform Preview) */}
            <Grid.Col span={{ base: 12, md: 5 }}>
              <MotionReveal direction="up" delay={0.2}>
                <Paper
                  p="xl"
                  radius="lg"
                  withBorder
                  className="subtle-glass"
                  style={{ position: 'relative' }}
                >
                  <Group justify="space-between" mb="md">
                    <div>
                      <Badge color="teal" variant="light" size="sm">
                        INSTANT CREDIT ENGINE
                      </Badge>
                      <Title order={4} mt={4} c="dark.8">
                        Live Pre-Approval Desk
                      </Title>
                    </div>
                    <ThemeIcon size={38} radius="md" color="blue" variant="light">
                      <IconSparkles size={20} />
                    </ThemeIcon>
                  </Group>

                  <Paper p="md" radius="md" bg="#ffffff" withBorder mb="md">
                    <Group justify="space-between" mb="xs">
                      <Text size="xs" c="dimmed" fw={600}>
                        CREDIT FACILITY ASSESSED
                      </Text>
                      <Badge color="blue" size="xs">
                        APPROVED
                      </Badge>
                    </Group>
                    <Text fw={800} size="xl" c="blue.8">
                      $250,000.00
                    </Text>
                    <Text size="xs" c="dimmed">
                      Working Capital Revolver · Prime + 1.8%
                    </Text>
                  </Paper>

                  <Stack gap="xs" mb="lg">
                    <Group justify="space-between">
                      <Text size="xs" c="dimmed">
                        Underwriting Velocity:
                      </Text>
                      <Text size="xs" fw={700} c="teal.7">
                        180 seconds automated
                      </Text>
                    </Group>
                    <Group justify="space-between">
                      <Text size="xs" c="dimmed">
                        Multi-Bureau Score:
                      </Text>
                      <Text size="xs" fw={700} c="dark.8">
                        782 / 850 (Exceptional)
                      </Text>
                    </Group>
                    <Group justify="space-between">
                      <Text size="xs" c="dimmed">
                        Disbursement Account:
                      </Text>
                      <Text size="xs" fw={700} c="dark.8">
                        Chase Business Checking ••9204
                      </Text>
                    </Group>
                  </Stack>

                  {/* Progress Button Component embedded in Hero visual */}
                  <ProgressButton />
                </Paper>
              </MotionReveal>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* SECTION 2: TRUST BADGES */}
      <MotionReveal direction="up" delay={0.1}>
        <TrustBadges />
      </MotionReveal>

      {/* SECTION 3: PROBLEM VS SOLUTION */}
      <Container size="xl" py={{ base: 40, md: 70 }}>
        <MotionReveal direction="up" delay={0.1}>
          <Box ta="center" mb={50}>
            <Badge color="red" variant="light" size="md">
              The Industry Bottleneck
            </Badge>
            <Title order={2} fw={800} mt="xs" c="#094067">
              Traditional SMB Borrowing is Fundamentally Broken
            </Title>
            <Text size="md" c="dimmed" mt="xs" style={{ maxWidth: 650, margin: '0 auto' }}>
              Main street businesses generate millions in enterprise value yet remain starved of timely working capital due to legacy bank protocols.
            </Text>
          </Box>
        </MotionReveal>

        <Grid gap="xl">
          {/* Problem Column */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <MotionReveal direction="right" delay={0.15} style={{ height: '100%' }}>
              <Paper p="xl" radius="lg" withBorder bg="#fff9f9" style={{ borderColor: '#ffe3e3', height: '100%' }}>
                <Group gap="xs" mb="md">
                  <ThemeIcon size={36} radius="md" color="red" variant="light">
                    <IconAlertTriangle size={20} />
                  </ThemeIcon>
                  <div>
                    <Text fw={700} size="lg" c="red.9">
                      The Problem: Legacy Banking
                    </Text>
                    <Text size="xs" c="red.7">
                      Frictional, opaque, and lethargic
                    </Text>
                  </div>
                </Group>

                <Stack gap="md" mt="lg">
                  <Paper p="md" radius="md" bg="#ffffff" withBorder>
                    <Group align="flex-start" wrap="nowrap">
                      <ThemeIcon color="red" variant="light" size="sm" mt={2}>
                        <IconClock size={14} />
                      </ThemeIcon>
                      <div>
                        <Text fw={700} size="sm">
                          Slow Approvals (4 to 8 Weeks)
                        </Text>
                        <Text size="xs" c="dimmed" mt={2}>
                          Endless underwriting committee meetings that stall payroll, supplier inventory discounts, and growth opportunities.
                        </Text>
                      </div>
                    </Group>
                  </Paper>

                  <Paper p="md" radius="md" bg="#ffffff" withBorder>
                    <Group align="flex-start" wrap="nowrap">
                      <ThemeIcon color="red" variant="light" size="sm" mt={2}>
                        <IconFileText size={14} />
                      </ThemeIcon>
                      <div>
                        <Text fw={700} size="sm">
                          Buried in Paperwork & PDF Requests
                        </Text>
                        <Text size="xs" c="dimmed" mt={2}>
                          Demands for 3 years of audited tax forms, wet-ink signatures, and manual bank statement printouts.
                        </Text>
                      </div>
                    </Group>
                  </Paper>

                  <Paper p="md" radius="md" bg="#ffffff" withBorder>
                    <Group align="flex-start" wrap="nowrap">
                      <ThemeIcon color="red" variant="light" size="sm" mt={2}>
                        <IconDeviceAnalytics size={14} />
                      </ThemeIcon>
                      <div>
                        <Text fw={700} size="sm">
                          Opaque, Rigid Credit Decisions
                        </Text>
                        <Text size="xs" c="dimmed" mt={2}>
                          Binary reject decisions based purely on obsolete static ratios without analyzing current recurring revenue health.
                        </Text>
                      </div>
                    </Group>
                  </Paper>
                </Stack>
              </Paper>
            </MotionReveal>
          </Grid.Col>

          {/* Solution Column */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <MotionReveal direction="left" delay={0.2} style={{ height: '100%' }}>
              <Paper p="xl" radius="lg" withBorder bg="#f0fdf4" style={{ borderColor: '#bbf7d0', height: '100%' }}>
                <Group gap="xs" mb="md">
                  <ThemeIcon size={36} radius="md" color="teal" variant="light">
                    <IconBolt size={20} />
                  </ThemeIcon>
                  <div>
                    <Text fw={700} size="lg" c="teal.9">
                      The Solution: Hardman & Reed
                    </Text>
                    <Text size="xs" c="teal.7">
                      Intelligent, continuous, and automated
                    </Text>
                  </div>
                </Group>

                <Stack gap="md" mt="lg">
                  <Paper p="md" radius="md" bg="#ffffff" withBorder>
                    <Group align="flex-start" wrap="nowrap">
                      <ThemeIcon color="teal" variant="light" size="sm" mt={2}>
                        <IconCpu size={14} />
                      </ThemeIcon>
                      <div>
                        <Text fw={700} size="sm">
                          AI-Powered Loan Origination
                        </Text>
                        <Text size="xs" c="dimmed" mt={2}>
                          Connect your bank or accounting feed in 60 seconds with bank-grade e-KYC and automated document scanning.
                        </Text>
                      </div>
                    </Group>
                  </Paper>

                  <Paper p="md" radius="md" bg="#ffffff" withBorder>
                    <Group align="flex-start" wrap="nowrap">
                      <ThemeIcon color="teal" variant="light" size="sm" mt={2}>
                        <IconDeviceAnalytics size={14} />
                      </ThemeIcon>
                      <div>
                        <Text fw={700} size="sm">
                          Real-Time Credit Decisioning
                        </Text>
                        <Text size="xs" c="dimmed" mt={2}>
                          Proprietary multi-bureau synthesis evaluating actual cash velocity, vendor track records, and operational stability.
                        </Text>
                      </div>
                    </Group>
                  </Paper>

                  <Paper p="md" radius="md" bg="#ffffff" withBorder>
                    <Group align="flex-start" wrap="nowrap">
                      <ThemeIcon color="teal" variant="light" size="sm" mt={2}>
                        <IconCoins size={14} />
                      </ThemeIcon>
                      <div>
                        <Text fw={700} size="sm">
                          24-Hour Automated Wire Disbursement
                        </Text>
                        <Text size="xs" c="dimmed" mt={2}>
                          Digital contract execution with instant same-day Fedwire or ACH deposit straight into your corporate account.
                        </Text>
                      </div>
                    </Group>
                  </Paper>
                </Stack>
              </Paper>
            </MotionReveal>
          </Grid.Col>
        </Grid>
      </Container>

      {/* SECTION 4: HOW IT WORKS */}
      <Box py={{ base: 40, md: 70 }} bg="#fbfcfd" style={{ borderTop: '1px solid #f1f3f5' }}>
        <Container size="xl">
          <MotionReveal direction="up" delay={0.1}>
            <Box ta="center" mb={50}>
              <Badge color="blue" variant="light" size="md">
                Streamlined Process
              </Badge>
              <Title order={2} fw={800} mt="xs" c="#094067">
                How Hardman & Reed Works
              </Title>
              <Text size="md" c="dimmed" mt="xs">
                From application to wired funds in 4 seamless, transparent milestones.
              </Text>
            </Box>
          </MotionReveal>

          <MotionStaggerContainer staggerDelay={0.12}>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
              {[
                {
                  step: '01',
                  title: 'Apply Digitally',
                  desc: 'Upload basic entity details or link your accounting software (QuickBooks, Xero) in 3 minutes.',
                  icon: IconFileText,
                  color: 'blue',
                },
                {
                  step: '02',
                  title: 'Credit Scoring',
                  desc: 'Our AI engine pulls Experian/Equifax/CIBIL data and maps your true operating liquidity.',
                  icon: IconCpu,
                  color: 'indigo',
                },
                {
                  step: '03',
                  title: 'Automated Decision',
                  desc: 'Receive transparent loan offers with clear repayment schedules, zero hidden charges, and fixed APRs.',
                  icon: IconShieldCheck,
                  color: 'teal',
                },
                {
                  step: '04',
                  title: 'Funds Disbursed',
                  desc: 'E-sign terms and receive funds wired directly to your commercial account within 24 hours.',
                  icon: IconCoins,
                  color: 'cyan',
                },
              ].map((st) => (
                <MotionStaggerItem key={st.step}>
                  <Paper p="lg" radius="md" withBorder className="card-hover" bg="#ffffff" style={{ height: '100%' }}>
                    <Group justify="space-between" mb="md">
                      <Badge color={st.color} size="lg" variant="light">
                        Step {st.step}
                      </Badge>
                      <ThemeIcon color={st.color} variant="subtle" size={36}>
                        <st.icon size={24} />
                      </ThemeIcon>
                    </Group>
                    <Title order={4} mb="xs">
                      {st.title}
                    </Title>
                    <Text size="sm" c="dimmed" lh={1.5}>
                      {st.desc}
                    </Text>
                  </Paper>
                </MotionStaggerItem>
              ))}
            </SimpleGrid>
          </MotionStaggerContainer>
        </Container>
      </Box>

      {/* SECTION 5: STATS CARDS */}
      <Container size="xl" py={{ base: 40, md: 60 }}>
        <MotionReveal direction="up" delay={0.1}>
          <StatsCard />
        </MotionReveal>
      </Container>

      {/* SECTION 6: CTA BANNER */}
      <Container size="xl" pb={{ base: 50, md: 80 }}>
        <MotionReveal direction="up" delay={0.15}>
          <Paper
            p={{ base: 'xl', md: 50 }}
            radius="lg"
            withBorder
            style={{
              background: 'linear-gradient(135deg, #094067 0%, #172554 100%)',
              color: '#ffffff',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <Badge color="cyan" variant="filled" size="md" mb="md">
              Capital At The Speed Of Business
            </Badge>
            <Title order={2} fw={800} c="white" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}>
              Get your business funded in 24 hours
            </Title>
            <Text size="md" c="blue.1" mt="sm" mb="xl" style={{ maxWidth: 600, margin: '16px auto' }}>
              Join thousands of small and medium businesses powering operations, upgrading equipment, and scaling revenue with Hardman & Reed.
            </Text>

            <Group justify="center" gap="md">
              <Button
                size="lg"
                color="cyan"
                c="dark.9"
                fw={700}
                onClick={onOpenApply}
                rightSection={<IconArrowRight size={18} />}
              >
                Start Free Application
              </Button>
              <Button size="lg" variant="white" color="dark" onClick={onOpenDemo}>
                Schedule Platform Demo
              </Button>
            </Group>
          </Paper>
        </MotionReveal>

        <Box mt="xl">
          <MotionReveal direction="up" delay={0.2}>
            <EmailBanner />
          </MotionReveal>
        </Box>
      </Container>
    </Box>
  );
};
