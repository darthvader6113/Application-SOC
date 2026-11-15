import React, { useState } from 'react';
import {
  Group,
  Button,
  UnstyledButton,
  Text,
  ThemeIcon,
  Divider,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  HoverCard,
  SimpleGrid,
  Badge,
  Container,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconChartPie,
  IconShieldCheck,
  IconCoin,
  IconReceipt2,
  IconTruckLoading,
  IconBriefcase,
  IconChevronDown,
  IconCpu,
  IconUsers,
  IconSparkles,
  IconBuildingStore,
} from '@tabler/icons-react';
const logoImg = '/logo.png';

interface HeaderMegaMenuProps {
  activePage: string;
  setActivePage: (page: string) => void;
  onOpenApply: () => void;
  onOpenDemo: () => void;
}

const mockdataProduct = [
  {
    icon: IconCpu,
    title: 'Loan Origination',
    description: 'Digital application, instant document upload & e-KYC',
    page: 'product',
  },
  {
    icon: IconSparkles,
    title: 'Credit Decisioning',
    description: 'AI credit scoring, multi-bureau synthesis & risk profiling',
    page: 'product',
  },
  {
    icon: IconShieldCheck,
    title: 'Underwriting Engine',
    description: 'Automated rules engine with analyst manual override',
    page: 'product',
  },
  {
    icon: IconChartPie,
    title: 'Portfolio Reporting',
    description: 'Real-time portfolio health, NPA tracking & audit reports',
    page: 'product',
  },
];

const mockdataLending = [
  {
    icon: IconCoin,
    title: 'Working Capital Loan',
    description: '$10K – $500K · 3–24 months term for operations',
    page: 'lending',
  },
  {
    icon: IconReceipt2,
    title: 'Invoice Financing',
    description: 'Unlock up to 90% of tied-up receivables within 24h',
    page: 'lending',
  },
  {
    icon: IconTruckLoading,
    title: 'Equipment Financing',
    description: '$25K – $1M for modern machinery, fleet & technology',
    page: 'lending',
  },
  {
    icon: IconBriefcase,
    title: 'Business Line of Credit',
    description: 'Flexible revolving credit line from $10K to $250K',
    page: 'lending',
  },
];

export const HeaderMegaMenu: React.FC<HeaderMegaMenuProps> = ({
  activePage,
  setActivePage,
  onOpenApply,
  onOpenDemo,
}) => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [productOpened, { toggle: toggleProduct }] = useDisclosure(false);
  const [lendingOpened, { toggle: toggleLending }] = useDisclosure(false);

  const productLinks = mockdataProduct.map((item) => (
    <UnstyledButton
      key={item.title}
      p="sm"
      style={{ borderRadius: '8px', transition: 'background-color 0.15s ease' }}
      className="card-hover"
      onClick={() => {
        setActivePage(item.page);
        closeDrawer();
      }}
    >
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={38} radius="md" variant="light" color="blue">
          <item.icon style={{ width: rem(20), height: rem(20) }} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={600} c="dark.8">
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  const lendingLinks = mockdataLending.map((item) => (
    <UnstyledButton
      key={item.title}
      p="sm"
      style={{ borderRadius: '8px', transition: 'background-color 0.15s ease' }}
      className="card-hover"
      onClick={() => {
        setActivePage(item.page);
        closeDrawer();
      }}
    >
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={38} radius="md" variant="light" color="teal">
          <item.icon style={{ width: rem(20), height: rem(20) }} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={600} c="dark.8">
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box
      component="header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #e9ecef',
      }}
    >
      <Container size="xl" h={70}>
        <Group justify="space-between" h="100%">
          {/* Logo */}
          <UnstyledButton onClick={() => setActivePage('home')}>
            <Group gap="xs" align="center">
              <img
                src={logoImg}
                alt="Hardman & Reed Logo"
                style={{ height: 38, width: 38, objectFit: 'contain', borderRadius: 6 }}
              />
              <div>
                <Group gap={6} align="center">
                  <Text fw={800} size="lg" style={{ letterSpacing: '-0.3px', color: '#094067' }}>
                    HARDMAN & REED
                  </Text>
                  <Badge size="xs" variant="light" color="blue">
                    SMB
                  </Badge>
                </Group>
                <Text size="10px" c="dimmed" fw={600} style={{ textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  Lending & Credit Platform
                </Text>
              </div>
            </Group>
          </UnstyledButton>

          {/* Desktop Nav */}
          <Group gap={8} visibleFrom="md">
            <Button
              variant={activePage === 'home' ? 'light' : 'subtle'}
              color="blue"
              onClick={() => setActivePage('home')}
              size="sm"
            >
              Home
            </Button>

            {/* Product Mega Menu */}
            <HoverCard width={620} position="bottom" radius="md" withinPortal>
              <HoverCard.Target>
                <Button
                  variant={activePage === 'product' ? 'light' : 'subtle'}
                  color="blue"
                  size="sm"
                  rightSection={<IconChevronDown size={14} />}
                  onClick={() => setActivePage('product')}
                >
                  Product
                </Button>
              </HoverCard.Target>
              <HoverCard.Dropdown p="md">
                <Group justify="space-between" px="xs" pb="xs">
                  <Text fw={700} size="sm" c="dark.7">
                    Intelligent Credit & Lending OS
                  </Text>
                  <Button variant="subtle" size="xs" onClick={() => setActivePage('product')}>
                    Explore all features →
                  </Button>
                </Group>
                <Divider my="xs" />
                <SimpleGrid cols={2} spacing="xs">
                  {productLinks}
                </SimpleGrid>
                <Box mt="sm" p="xs" style={{ backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
                  <Group justify="space-between">
                    <div>
                      <Text size="xs" fw={600}>
                        Enterprise Core Integrations
                      </Text>
                      <Text size="xs" c="dimmed">
                        Plaid, Experian, CIBIL, Equifax, Salesforce & SAP
                      </Text>
                    </div>
                    <Badge color="green" size="sm" variant="light">
                      99.99% Uptime
                    </Badge>
                  </Group>
                </Box>
              </HoverCard.Dropdown>
            </HoverCard>

            {/* Lending Mega Menu */}
            <HoverCard width={620} position="bottom" radius="md" withinPortal>
              <HoverCard.Target>
                <Button
                  variant={activePage === 'lending' ? 'light' : 'subtle'}
                  color="blue"
                  size="sm"
                  rightSection={<IconChevronDown size={14} />}
                  onClick={() => setActivePage('lending')}
                >
                  Lending Products
                </Button>
              </HoverCard.Target>
              <HoverCard.Dropdown p="md">
                <Group justify="space-between" px="xs" pb="xs">
                  <Text fw={700} size="sm" c="dark.7">
                    Flexible Financing Tailored to SMBs
                  </Text>
                  <Button variant="subtle" size="xs" onClick={() => setActivePage('lending')}>
                    View rate calculator →
                  </Button>
                </Group>
                <Divider my="xs" />
                <SimpleGrid cols={2} spacing="xs">
                  {lendingLinks}
                </SimpleGrid>
                <Box mt="sm" p="xs" style={{ backgroundColor: '#e7f5ff', borderRadius: '6px' }}>
                  <Group justify="space-between">
                    <div>
                      <Text size="xs" fw={700} c="blue.9">
                        Pre-approval in under 3 minutes
                      </Text>
                      <Text size="xs" c="blue.7">
                        No impact to your personal credit score
                      </Text>
                    </div>
                    <Button size="xs" variant="filled" color="blue" onClick={onOpenApply}>
                      Check Rates
                    </Button>
                  </Group>
                </Box>
              </HoverCard.Dropdown>
            </HoverCard>

            <Button
              variant={activePage === 'company' ? 'light' : 'subtle'}
              color="blue"
              onClick={() => setActivePage('company')}
              size="sm"
            >
              Company
            </Button>
          </Group>

          {/* Action CTAs */}
          <Group visibleFrom="sm" gap="xs">
            <Button variant="default" size="sm" onClick={onOpenDemo}>
              Book Demo
            </Button>
            <Button
              size="sm"
              color="blue"
              onClick={onOpenApply}
            >
              Apply Now
            </Button>
          </Group>

          {/* Mobile Hamburger */}
          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="md" size="sm" />
        </Group>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={
          <Group gap="xs" align="center">
            <img
              src={logoImg}
              alt="Hardman & Reed Logo"
              style={{ height: 30, width: 30, objectFit: 'contain', borderRadius: 4 }}
            />
            <Text fw={700} size="sm">
              Hardman & Reed
            </Text>
          </Group>
        }
        hiddenFrom="md"
        zIndex={1000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />
          <UnstyledButton
            p="sm"
            w="100%"
            onClick={() => {
              setActivePage('home');
              closeDrawer();
            }}
          >
            <Text fw={600} c={activePage === 'home' ? 'blue' : 'dark.7'}>
              Home
            </Text>
          </UnstyledButton>

          <UnstyledButton p="sm" w="100%" onClick={toggleProduct}>
            <Group justify="space-between">
              <Text fw={600} c={activePage === 'product' ? 'blue' : 'dark.7'}>
                Product
              </Text>
              <IconChevronDown size={16} />
            </Group>
          </UnstyledButton>
          <Collapse expanded={productOpened} px="sm">
            {productLinks}
          </Collapse>

          <UnstyledButton p="sm" w="100%" onClick={toggleLending}>
            <Group justify="space-between">
              <Text fw={600} c={activePage === 'lending' ? 'blue' : 'dark.7'}>
                Lending Products
              </Text>
              <IconChevronDown size={16} />
            </Group>
          </UnstyledButton>
          <Collapse expanded={lendingOpened} px="sm">
            {lendingLinks}
          </Collapse>

          <UnstyledButton
            p="sm"
            w="100%"
            onClick={() => {
              setActivePage('company');
              closeDrawer();
            }}
          >
            <Text fw={600} c={activePage === 'company' ? 'blue' : 'dark.7'}>
              Company
            </Text>
          </UnstyledButton>

          <Divider my="md" />

          <Group justify="center" grow pb="xl" px="md">
            <Button
              variant="default"
              onClick={() => {
                closeDrawer();
                onOpenDemo();
              }}
            >
              Book Demo
            </Button>
            <Button
              color="blue"
              onClick={() => {
                closeDrawer();
                onOpenApply();
              }}
            >
              Apply Now
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};
