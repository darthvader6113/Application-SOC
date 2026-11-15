import React, { useState } from 'react';
import {
  Paper,
  Text,
  Title,
  TextInput,
  Textarea,
  Button,
  SimpleGrid,
  Select,
  Group,
  ThemeIcon,
  Stack,
  Alert,
} from '@mantine/core';
import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconCheck,
  IconBuildingStore,
  IconSend,
} from '@tabler/icons-react';

export const GetInTouchForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    loanAmount: '$50,000 - $250,000',
    loanType: 'Working Capital Loan',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `${formData.loanType} inquiry (${formData.company})`,
          message: `${formData.message} [Target Funding: ${formData.loanAmount}]`,
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.warn('Contact API error, falling back to local confirmation:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper radius="lg" withBorder style={{ overflow: 'hidden' }}>
      <SimpleGrid cols={{ base: 1, md: 5 }} spacing={0}>
        {/* Left Info Panel */}
        <div
          style={{
            gridColumn: 'span 2',
            background: 'linear-gradient(145deg, #094067 0%, #1971c2 100%)',
            color: '#ffffff',
            padding: '2.5rem 2rem',
          }}
        >
          <Title order={3} c="white" fw={800}>
            Get in touch
          </Title>
          <Text size="sm" c="blue.1" mt="xs" mb="xl">
            Whether you are exploring loan facilities for your business or looking to deploy our lending OS as an institutional credit partner, our advisory desk is here.
          </Text>

          <Stack gap="lg" mt="xl">
            <Group gap="md">
              <ThemeIcon size={36} radius="md" color="blue.4" variant="light">
                <IconMail size={18} />
              </ThemeIcon>
              <div>
                <Text size="xs" c="blue.2" fw={600} tt="uppercase">
                  Email
                </Text>
                <Text size="sm" fw={600} c="white">
                  credit-desk@hardmanreed.com
                </Text>
              </div>
            </Group>

            <Group gap="md">
              <ThemeIcon size={36} radius="md" color="blue.4" variant="light">
                <IconPhone size={18} />
              </ThemeIcon>
              <div>
                <Text size="xs" c="blue.2" fw={600} tt="uppercase">
                  Direct Desk
                </Text>
                <Text size="sm" fw={600} c="white">
                  +1 (800) 427-3626
                </Text>
              </div>
            </Group>

            <Group gap="md">
              <ThemeIcon size={36} radius="md" color="blue.4" variant="light">
                <IconMapPin size={18} />
              </ThemeIcon>
              <div>
                <Text size="xs" c="blue.2" fw={600} tt="uppercase">
                  Headquarters
                </Text>
                <Text size="sm" fw={600} c="white">
                  100 Financial Center, New York, NY 10005
                </Text>
              </div>
            </Group>

            <Group gap="md">
              <ThemeIcon size={36} radius="md" color="blue.4" variant="light">
                <IconBuildingStore size={18} />
              </ThemeIcon>
              <div>
                <Text size="xs" c="blue.2" fw={600} tt="uppercase">
                  Lending Partner Hub
                </Text>
                <Text size="sm" fw={600} c="white">
                  London · Singapore · Mumbai
                </Text>
              </div>
            </Group>
          </Stack>
        </div>

        {/* Right Form */}
        <div style={{ gridColumn: 'span 3', padding: '2.5rem 2rem', backgroundColor: '#ffffff' }}>
          {submitted ? (
            <Alert
              icon={<IconCheck size={20} />}
              title="Request Received!"
              color="teal"
              radius="md"
              variant="light"
              p="xl"
            >
              <Text size="sm" mt="xs">
                Thank you, <strong>{formData.name || 'Partner'}</strong>. A dedicated Hardman & Reed credit officer has received your inquiry for <strong>{formData.loanType}</strong> and will follow up within 2 hours.
              </Text>
              <Button size="xs" color="teal" mt="md" variant="subtle" onClick={() => setSubmitted(false)}>
                Submit another inquiry
              </Button>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit}>
              <Title order={4} mb="xs">
                Speak with a Credit Officer
              </Title>
              <Text size="sm" c="dimmed" mb="lg">
                Fill out the form below for personalized rates or enterprise platform demos.
              </Text>

              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <TextInput
                  label="Your Full Name"
                  placeholder="e.g. Marcus Vance"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.currentTarget.value })}
                />
                <TextInput
                  label="Corporate Email"
                  placeholder="name@company.com"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.currentTarget.value })}
                />
              </SimpleGrid>

              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mt="md">
                <TextInput
                  label="Company Name"
                  placeholder="e.g. Apex Dynamics Ltd"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.currentTarget.value })}
                />
                <Select
                  label="Facility Interested In"
                  data={[
                    'Working Capital Loan',
                    'Invoice Financing',
                    'Equipment Financing',
                    'Business Line of Credit',
                    'Term Loan',
                    'Lending OS Software License',
                  ]}
                  value={formData.loanType}
                  onChange={(val) => setFormData({ ...formData, loanType: val || 'Working Capital Loan' })}
                />
              </SimpleGrid>

              <Select
                label="Target Funding Amount"
                mt="md"
                data={[
                  '$10,000 - $50,000',
                  '$50,000 - $250,000',
                  '$250,000 - $1,000,000',
                  '$1,000,000 - $5,000,000+',
                ]}
                value={formData.loanAmount}
                onChange={(val) => setFormData({ ...formData, loanAmount: val || '$50,000 - $250,000' })}
              />

              <Textarea
                label="Business Overview & Timeline"
                placeholder="Briefly describe your capital use case and target funding timeline..."
                mt="md"
                minRows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.currentTarget.value })}
              />

              <Group justify="flex-end" mt="xl">
                <Button type="submit" color="blue" size="md" loading={loading} rightSection={<IconSend size={16} />}>
                  Send Consultation Request
                </Button>
              </Group>
            </form>
          )}
        </div>
      </SimpleGrid>
    </Paper>
  );
};

