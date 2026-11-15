import React from 'react';
import { Card, Text, Group, RingProgress, SimpleGrid, Badge, Box } from '@mantine/core';
import { IconArrowUpRight, IconClock, IconCoins, IconShieldCheck } from '@tabler/icons-react';

interface StatProps {
  label: string;
  stats: string;
  progress: number;
  color: string;
  icon: any;
  description: string;
  badge: string;
}

const statsData: StatProps[] = [
  {
    label: 'Total Capital Disbursed',
    stats: '$485M+',
    progress: 88,
    color: 'blue',
    icon: IconCoins,
    description: 'Across 12,400+ SMB borrowers nationwide',
    badge: '+42% YoY',
  },
  {
    label: 'Decision Speed',
    stats: '< 24 Hours',
    progress: 96,
    color: 'teal',
    icon: IconClock,
    description: 'Instant algorithmic pre-score in 180 seconds',
    badge: '10x Faster',
  },
  {
    label: 'Automated Origination',
    stats: '94.2%',
    progress: 94,
    color: 'indigo',
    icon: IconShieldCheck,
    description: 'Zero manual paperwork touches needed',
    badge: 'Real-time eKYC',
  },
  {
    label: 'SMB Approval Rate',
    stats: '78.5%',
    progress: 79,
    color: 'cyan',
    icon: IconArrowUpRight,
    description: 'Fair risk profiling factoring actual cash flow',
    badge: 'Alternative Data',
  },
];

export const StatsCard: React.FC = () => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
      {statsData.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} p="lg" radius="md" withBorder className="card-hover">
            <Group justify="space-between" align="flex-start">
              <div>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700} lts={0.5}>
                  {stat.label}
                </Text>
                <Text fw={800} size="xl" mt={4} c="dark.8">
                  {stat.stats}
                </Text>
              </div>
              <RingProgress
                size={64}
                roundCaps
                thickness={6}
                sections={[{ value: stat.progress, color: stat.color }]}
                label={
                  <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={18} stroke={2} color={`var(--mantine-color-${stat.color}-6)`} />
                  </Box>
                }
              />
            </Group>

            <Group justify="space-between" mt="md">
              <Text size="xs" c="dimmed" style={{ maxWidth: '75%' }}>
                {stat.description}
              </Text>
              <Badge color={stat.color} variant="light" size="sm">
                {stat.badge}
              </Badge>
            </Group>
          </Card>
        );
      })}
    </SimpleGrid>
  );
};

