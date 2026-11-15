import React from 'react';
import { Container, Group, Text, ActionIcon, SimpleGrid, Stack, Divider, Box, Badge, Paper } from '@mantine/core';
import {
  IconBrandLinkedin,
  IconShieldLock,
} from '@tabler/icons-react';
const logoImg = '/logo.png';
const greatPlaceToWorkImg = '/great_place_to_work.png';
const socTypeIIImg = '/soc_type_II.png';
const iso27001Img = '/iso_27001.png';

interface FooterSimpleProps {
  setActivePage: (page: string) => void;
  onOpenApply: () => void;
  onOpenDemo: () => void;
}

export const FooterSimple: React.FC<FooterSimpleProps> = ({ setActivePage, onOpenApply, onOpenDemo }) => {
  return (
    <Box component="footer" style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e9ecef', marginTop: 'auto' }}>
      <Container size="xl" py="xl">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 5 }} spacing="xl">
          {/* Col 1: Brand Info */}
          <div style={{ gridColumn: 'span 2' }}>
            <Group gap="xs" mb="xs" align="center">
              <img
                src={logoImg}
                alt="Hardman & Reed Logo"
                style={{ height: 34, width: 34, objectFit: 'contain', borderRadius: 6 }}
              />
              <Text fw={800} size="md" c="#094067">
                HARDMAN & REED
              </Text>
            </Group>
            <Text size="sm" c="dimmed" mb="md" style={{ maxWidth: 360 }} lh={1.6}>
              Next-generation SMB lending and credit intelligence infrastructure. Powering fair, instant capital decisioning for small and mid-market enterprises.
            </Text>
            <Group gap="lg" align="center" mt="md">
              <img
                src={socTypeIIImg}
                alt="SOC 2 Type II Certified"
                title="SOC 2 Type II Certified"
                style={{ height: 58, width: 'auto', objectFit: 'contain' }}
              />
              <img
                src={iso27001Img}
                alt="ISO/IEC 27001 Information Security Certified"
                title="ISO/IEC 27001 Certified"
                style={{
                  height: 58,
                  width: 58,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <img
                src={greatPlaceToWorkImg}
                alt="Great Place to Work Certified"
                title="Great Place to Work Certified"
                style={{ height: 60, width: 'auto', objectFit: 'contain' }}
              />
            </Group>
          </div>

          {/* Col 2: Platform & Products */}
          <div>
            <Text size="sm" fw={700} c="dark.8" mb="sm" tt="uppercase" lts={0.5}>
              Products
            </Text>
            <Stack gap="xs">
              <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }} onClick={() => setActivePage('lending')}>
                Working Capital Loan
              </Text>
              <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }} onClick={() => setActivePage('lending')}>
                Invoice Financing
              </Text>
              <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }} onClick={() => setActivePage('lending')}>
                Equipment Financing
              </Text>
              <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }} onClick={() => setActivePage('lending')}>
                Business Line of Credit
              </Text>
              <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }} onClick={() => setActivePage('lending')}>
                Expansion Term Loan
              </Text>
            </Stack>
          </div>

          {/* Col 3: Technology */}
          <div>
            <Text size="sm" fw={700} c="dark.8" mb="sm" tt="uppercase" lts={0.5}>
              Lending OS
            </Text>
            <Stack gap="xs">
              <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }} onClick={() => setActivePage('product')}>
                Loan Origination
              </Text>
              <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }} onClick={() => setActivePage('product')}>
                AI Credit Decisioning
              </Text>
              <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }} onClick={() => setActivePage('product')}>
                Automated Underwriting
              </Text>
              <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }} onClick={() => setActivePage('product')}>
                Collections Workflow
              </Text>
              <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }} onClick={() => setActivePage('product')}>
                Enterprise Integrations
              </Text>
            </Stack>
          </div>

          {/* Col 4: Company & Legal */}
          <div>
            <Text size="sm" fw={700} c="dark.8" mb="sm" tt="uppercase" lts={0.5}>
              Company
            </Text>
            <Stack gap="xs">
              <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }} onClick={() => setActivePage('company')}>
                About Hardman & Reed
              </Text>
              <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }} onClick={() => setActivePage('company')}>
                Executive Leadership
              </Text>
              <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }} onClick={() => setActivePage('company')}>
                Careers (Hiring!)
              </Text>
              <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }} onClick={onOpenDemo}>
                Book Platform Demo
              </Text>
              <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }} onClick={onOpenApply}>
                Check Loan Eligibility
              </Text>
            </Stack>
          </div>
        </SimpleGrid>

        <Divider my="xl" />

        {/* Regulatory Disclosure as per README */}
        <Paper p="md" radius="md" style={{ backgroundColor: '#f8fafc', border: '1px solid #eef2f6' }} mb="lg">
          <Text size="11px" c="dimmed" lh={1.6}>
            <strong>Regulatory & Lending Licensing Disclosure:</strong> Hardman & Reed Financial Technologies Inc. operates commercial credit underwriting engines and partners with licensed depository institutions, commercial banks, and registered NBFCs across authorized jurisdictions (including RBI in India, FCA authorized credit brokers in the UK, and state-licensed commercial lenders in the United States). All credit applications, interest rates, and loan disbursements are subject to credit bureau validation, fraud screening, and institutional underwriting parameters. Terms and conditions apply.
          </Text>
        </Paper>

        <Group justify="space-between" align="center" wrap="wrap" gap="md">
          <Text size="xs" c="dimmed">
            © {new Date().getFullYear()} Hardman & Reed Inc. All rights reserved. SOC2 Type II Certified.
          </Text>

          <Group gap="md">
            <Text
              size="xs"
              c="dimmed"
              style={{ cursor: 'pointer', transition: 'color 0.15s ease' }}
              className="card-hover"
              onClick={() => setActivePage('privacy')}
            >
              Privacy Policy
            </Text>
            <Text size="xs" c="dimmed">·</Text>
            <Text
              size="xs"
              c="dimmed"
              style={{ cursor: 'pointer', transition: 'color 0.15s ease' }}
              className="card-hover"
              onClick={() => setActivePage('terms')}
            >
              Terms of Service
            </Text>
            <Text size="xs" c="dimmed">·</Text>
            <Text
              size="xs"
              c="dimmed"
              style={{ cursor: 'pointer', transition: 'color 0.15s ease' }}
              className="card-hover"
              onClick={() => setActivePage('security')}
            >
              Security Center
            </Text>
            <Text size="xs" c="dimmed">·</Text>
            <Text
              size="xs"
              c="dimmed"
              style={{ cursor: 'pointer', transition: 'color 0.15s ease' }}
              className="card-hover"
              onClick={() => setActivePage('compliance')}
            >
              Compliance Notice
            </Text>
            <Text size="xs" c="dimmed">·</Text>
            <Text
              size="xs"
              c="dimmed"
              style={{ cursor: 'pointer', transition: 'color 0.15s ease' }}
              className="card-hover"
              onClick={() => setActivePage('compliance')}
            >
              Lending License Notice
            </Text>
          </Group>

          <Group gap="xs">
            <ActionIcon size="md" variant="subtle" color="gray" aria-label="LinkedIn">
              <IconBrandLinkedin size={18} />
            </ActionIcon>
          </Group>
        </Group>
      </Container>
    </Box>
  );
};
