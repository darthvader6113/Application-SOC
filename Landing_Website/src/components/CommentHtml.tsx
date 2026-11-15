import React from 'react';
import { Paper, Text, Avatar, Group, Badge, SimpleGrid, Box, Rating } from '@mantine/core';
import { IconBuildingStore, IconBuildingFactory2, IconTruck, IconUser } from '@tabler/icons-react';

export interface TestimonialItem {
  author: string;
  role: string;
  company: string;
  industry: 'Retail' | 'Manufacturing' | 'Logistics';
  avatar: string;
  facility: string;
  amount: string;
  rating: number;
  htmlContent: string;
}

export const testimonialsData: TestimonialItem[] = [
  {
    author: 'Elena Rostova',
    role: 'Founder & CEO',
    company: 'Lumina Boutique Stores',
    industry: 'Retail',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    facility: 'Working Capital Loan',
    amount: '$180,000',
    rating: 5,
    htmlContent: `
      <p>Traditional high street banks took <strong>6 agonizing weeks</strong> just to review our inventory projections. With <em>Hardman & Reed</em>, we plugged in our Shopify and accounting feeds and had <strong>$180K deposited within 22 hours</strong>.</p>
      <p style="margin-top: 8px; color: #495057;">This agility allowed us to stock seasonal inventory early, yielding a <strong>34% gross margin increase</strong>.</p>
    `,
  },
  {
    author: 'David Sterling',
    role: 'Managing Director',
    company: 'Precision Tooling & Fabrication LLC',
    industry: 'Manufacturing',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    facility: 'Equipment Financing',
    amount: '$650,000',
    rating: 5,
    htmlContent: `
      <p>When a Tier-1 automotive contract landed, we urgently needed <strong>5-axis CNC machining centers</strong>. The automated equipment financing program had clear terms, zero predatory covenants, and automated vendor disbursements.</p>
      <p style="margin-top: 8px; color: #495057;">Hands down the <em>most transparent commercial lending platform</em> we've partnered with in 20 years.</p>
    `,
  },
  {
    author: 'Marcus Holloway',
    role: 'VP Operations',
    company: 'CrossContinental Freight Logistics',
    industry: 'Logistics',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    facility: 'Invoice Financing',
    amount: '$340,000',
    rating: 5,
    htmlContent: `
      <p>Waiting 90 to 120 days for enterprise enterprise invoices to clear was throttling our fleet expansion. <strong>Hardman & Reed invoice factoring unlocked 90% liquidity immediately</strong> without disrupting our client relationships.</p>
      <p style="margin-top: 8px; color: #495057;">Automated remittance and portal tracking give our finance team complete peace of mind.</p>
    `,
  },
];

const getIndustryIcon = (industry: string) => {
  switch (industry) {
    case 'Retail':
      return <IconBuildingStore size={14} />;
    case 'Manufacturing':
      return <IconBuildingFactory2 size={14} />;
    case 'Logistics':
      return <IconTruck size={14} />;
    default:
      return null;
  }
};

export const CommentHtml: React.FC = () => {
  return (
    <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
      {testimonialsData.map((item) => (
        <Paper key={item.author} p="xl" radius="md" withBorder className="card-hover" bg="#ffffff">
          <Group justify="space-between" align="center" mb="md">
            <Badge
              variant="light"
              color={item.industry === 'Retail' ? 'teal' : item.industry === 'Manufacturing' ? 'blue' : 'indigo'}
              leftSection={getIndustryIcon(item.industry)}
            >
              {item.industry}
            </Badge>
            <Rating value={item.rating} fractions={2} readOnly size="xs" color="yellow" />
          </Group>

          {/* HTML Rendered Content */}
          <Box
            style={{ minHeight: 140, fontSize: '13.5px', lineHeight: '1.6' }}
            dangerouslySetInnerHTML={{ __html: item.htmlContent }}
          />

          <Box mt="lg" pt="md" style={{ borderTop: '1px solid #f1f3f5' }}>
            <Group justify="space-between" align="center">
              <Group gap="sm">
                <Avatar radius="xl" size="md" color="blue" variant="light">
                  <IconUser size={18} stroke={1.8} />
                </Avatar>
                <div>
                  <Text size="sm" fw={700} c="dark.8">
                    {item.author}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {item.role}, {item.company}
                  </Text>
                </div>
              </Group>
            </Group>

            <Group gap="xs" mt="xs">
              <Text size="11px" c="dimmed">
                Facility:
              </Text>
              <Badge size="xs" variant="outline" color="gray">
                {item.facility} ({item.amount})
              </Badge>
            </Group>
          </Box>
        </Paper>
      ))}
    </SimpleGrid>
  );
};

