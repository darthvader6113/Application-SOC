import React from 'react';
import { Container, Group, Text, Paper, Badge, SimpleGrid, ThemeIcon, Box } from '@mantine/core';
import {
  IconShieldCheck,
  IconCertificate,
  IconLock,
  IconBuildingBank,
  IconChecklist,
} from '@tabler/icons-react';
const socTypeIIImg = '/soc_type_II.png';
const iso27001Img = '/iso_27001.png';

const badges = [
  {
    icon: IconShieldCheck,
    image: socTypeIIImg,
    title: 'SOC 2 Type II',
    subtitle: 'Audited & Verified',
    color: 'blue',
  },
  {
    icon: IconCertificate,
    image: iso27001Img,
    title: 'ISO 27001',
    subtitle: 'InfoSec Certified',
    color: 'teal',
  },
  {
    icon: IconBuildingBank,
    title: 'RBI / FCA Compliant',
    subtitle: 'Tier-1 Lending Partners',
    color: 'indigo',
  },
  {
    icon: IconLock,
    title: '256-Bit Encryption',
    subtitle: 'End-to-End In Transit & Rest',
    color: 'cyan',
  },
  {
    icon: IconChecklist,
    title: 'Automated Bureau Check',
    subtitle: 'Experian · Equifax · CIBIL',
    color: 'violet',
  },
];

export const TrustBadges: React.FC = () => {
  return (
    <Box py="xl" style={{ borderTop: '1px solid #f1f3f5', borderBottom: '1px solid #f1f3f5', backgroundColor: '#fcfdfe' }}>
      <Container size="lg">
        <Text ta="center" size="xs" fw={700} c="dimmed" tt="uppercase" lts={1.2} mb="lg">
          Institutional Security & Global Compliance Standards
        </Text>
        <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }} spacing="md">
          {badges.map((b) => (
            <Paper
              key={b.title}
              p="sm"
              radius="md"
              withBorder
              className="card-hover"
              style={{
                backgroundColor: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              {b.image ? (
                <img
                  src={b.image}
                  alt={b.title}
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: b.title === 'ISO 27001' ? '50%' : undefined,
                    objectFit: 'cover',
                    marginBottom: 8,
                  }}
                />
              ) : (
                <ThemeIcon size={40} radius="xl" variant="light" color={b.color} mb="xs">
                  <b.icon size={22} stroke={1.8} />
                </ThemeIcon>
              )}
              <Text fw={700} size="sm" c="dark.8">
                {b.title}
              </Text>
              <Text size="xs" c="dimmed">
                {b.subtitle}
              </Text>
            </Paper>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

