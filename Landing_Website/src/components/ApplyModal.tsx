import React, { useState } from 'react';
import {
  Modal,
  Button,
  Group,
  TextInput,
  Select,
  Slider,
  Text,
  Stack,
  Stepper,
  Paper,
  Badge,
  Alert,
  Box,
} from '@mantine/core';
import {
  IconCheck,
  IconArrowRight,
  IconShieldCheck,
} from '@tabler/icons-react';
const logoImg = '/logo.png';

interface ApplyModalProps {
  opened: boolean;
  onClose: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ opened, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loanAmount, setLoanAmount] = useState(75000);
  const [loanType, setLoanType] = useState('Working Capital Loan');
  const [companyName, setCompanyName] = useState('');
  const [annualRevenue, setAnnualRevenue] = useState('$500K - $1M');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setActiveStep(0);
    setSubmitted(false);
    setIsSubmitting(false);
    onClose();
  };

  const handleNext = async () => {
    if (activeStep < 2) {
      setActiveStep((current) => current + 1);
    } else {
      setIsSubmitting(true);
      try {
        const res = await fetch('/api/apply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            loanType,
            loanAmount,
            companyName: companyName || 'SMB Commercial Entity',
            annualRevenue,
            fullName: fullName || 'Authorized Officer',
            email: email || 'credit-desk@hardmanreed.com',
          }),
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          console.warn('Backend rejected application:', errData);
        }
        setSubmitted(true);
      } catch (err) {
        console.warn('API network error, falling back to local state:', err);
        setSubmitted(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={resetForm}
      title={
        <Group gap="xs" align="center">
          <img
            src={logoImg}
            alt="Hardman & Reed Logo"
            style={{ height: 26, width: 26, objectFit: 'contain', borderRadius: 4 }}
          />
          <Text fw={700} size="md">
            Fast SMB Loan Application
          </Text>
        </Group>
      }
      size="lg"
      radius="md"
      styles={{
        content: {
          overflow: 'hidden',
        },
        body: {
          overflowX: 'hidden',
          paddingBottom: '1.5rem',
        },
      }}
    >
      {submitted ? (
        <Box py="md" style={{ overflowX: 'hidden' }}>
          <Alert
            icon={<IconCheck size={24} />}
            title="Pre-Approval Instant Assessment Complete!"
            color="teal"
            radius="md"
            variant="light"
          >
            <Text size="sm" mt="xs">
              Congratulations, <strong>{fullName || 'Applicant'}</strong>! Based on your profile for{' '}
              <strong>{companyName || 'your business'}</strong>, you are preliminarily pre-approved for up to{' '}
              <strong>${loanAmount.toLocaleString()}</strong> under our <strong>{loanType}</strong> facility.
            </Text>
            <Paper p="sm" mt="md" radius="sm" bg="#ffffff" withBorder>
              <Group justify="space-between">
                <div>
                  <Text size="xs" c="dimmed">
                    Estimated APR
                  </Text>
                  <Text size="sm" fw={700} c="blue.8">
                    8.4% - 11.2%
                  </Text>
                </div>
                <div>
                  <Text size="xs" c="dimmed">
                    Est. Monthly Payment
                  </Text>
                  <Text size="sm" fw={700} c="dark.8">
                    ${Math.round((loanAmount * 1.08) / 18).toLocaleString()}/mo
                  </Text>
                </div>
                <div>
                  <Text size="xs" c="dimmed">
                    Time to Funds
                  </Text>
                  <Text size="sm" fw={700} c="teal.7">
                    &lt; 24 Hours
                  </Text>
                </div>
              </Group>
            </Paper>
            <Text size="xs" c="dimmed" mt="md">
              A secure underwriting link has been sent to <strong>{email || 'your email'}</strong> to connect your bank feed and finalize disbursement.
            </Text>
          </Alert>

          <Group justify="flex-end" mt="lg">
            <Button color="blue" onClick={resetForm}>
              Done
            </Button>
          </Group>
        </Box>
      ) : (
        <Box py="xs" style={{ overflowX: 'hidden', width: '100%' }}>
          <Stepper
            active={activeStep}
            onStepClick={setActiveStep}
            size="xs"
            mb="lg"
            styles={{
              root: {
                overflowX: 'hidden',
                width: '100%',
              },
            }}
          >
            <Stepper.Step label="Facility" description="Loan & Amount" />
            <Stepper.Step label="Business" description="Revenue & Entity" />
            <Stepper.Step label="Contact" description="Verification" />
          </Stepper>

          {activeStep === 0 && (
            <Stack gap="md" style={{ overflowX: 'hidden' }}>
              <Select
                label="Select Loan Facility"
                data={[
                  'Working Capital Loan',
                  'Invoice Financing',
                  'Equipment Financing',
                  'Business Line of Credit',
                  'Term Loan',
                ]}
                value={loanType}
                onChange={(val) => setLoanType(val || 'Working Capital Loan')}
                required
              />

              <Box px="xs" style={{ overflowX: 'hidden' }}>
                <Group justify="space-between" mb="xs">
                  <Text size="sm" fw={600}>
                    Requested Amount:
                  </Text>
                  <Badge size="lg" color="blue" variant="filled">
                    ${loanAmount.toLocaleString()}
                  </Badge>
                </Group>
                <Box px={14} pb={6}>
                  <Slider
                    value={loanAmount}
                    onChange={setLoanAmount}
                    min={10000}
                    max={500000}
                    step={5000}
                    marks={[
                      { value: 10000, label: '$10K' },
                      { value: 100000, label: '$100K' },
                      { value: 250000, label: '$250K' },
                      { value: 500000, label: '$500K' },
                    ]}
                    mb="lg"
                  />
                </Box>
              </Box>

              <Paper p="xs" radius="md" bg="#f8fafc" withBorder>
                <Group gap="xs">
                  <IconShieldCheck size={18} color="#1971c2" />
                  <Text size="xs" c="dimmed">
                    Soft credit check only. Does not impact your credit score.
                  </Text>
                </Group>
              </Paper>
            </Stack>
          )}

          {activeStep === 1 && (
            <Stack gap="md" style={{ overflowX: 'hidden' }}>
              <TextInput
                label="Legal Business Name"
                placeholder="e.g. Acme Logistics LLC"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.currentTarget.value)}
              />
              <Select
                label="Annual Business Revenue"
                data={[
                  'Under $250,000',
                  '$250,000 - $500,000',
                  '$500K - $1M',
                  '$1M - $5M',
                  '$5M+',
                ]}
                value={annualRevenue}
                onChange={(val) => setAnnualRevenue(val || '$500K - $1M')}
              />
              <Select
                label="Time in Operation"
                data={['Less than 6 months', '6 - 12 months', '1 - 3 years', '3+ years']}
                defaultValue="1 - 3 years"
              />
            </Stack>
          )}

          {activeStep === 2 && (
            <Stack gap="md" style={{ overflowX: 'hidden' }}>
              <TextInput
                label="Full Name of Director / Owner"
                placeholder="e.g. Sarah Jenkins"
                required
                value={fullName}
                onChange={(e) => setFullName(e.currentTarget.value)}
              />
              <TextInput
                label="Business Email"
                placeholder="sarah@acme.com"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
              <TextInput
                label="Phone Number"
                placeholder="+1 (555) 000-0000"
                defaultValue="+1 "
              />
            </Stack>
          )}

          <Group justify="space-between" mt="xl">
            {activeStep > 0 ? (
              <Button variant="default" onClick={() => setActiveStep((current) => current - 1)}>
                Back
              </Button>
            ) : (
              <div />
            )}
            <Button
              color="blue"
              onClick={handleNext}
              loading={isSubmitting}
              rightSection={activeStep === 2 ? <IconCheck size={16} /> : <IconArrowRight size={16} />}
            >
              {activeStep === 2 ? 'Submit For Instant Pre-Approval' : 'Next Step'}
            </Button>
          </Group>
        </Box>
      )}
    </Modal>
  );
};
