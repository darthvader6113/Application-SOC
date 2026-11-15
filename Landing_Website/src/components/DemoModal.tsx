import React, { useState } from 'react';
import {
  Modal,
  Button,
  TextInput,
  Select,
  Text,
  Stack,
  Alert,
  Group,
  Box,
} from '@mantine/core';
import { IconCheck, IconSend } from '@tabler/icons-react';
const logoImg = '/logo.png';

interface DemoModalProps {
  opened: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ opened, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [role, setRole] = useState('Chief Risk Officer / Credit Head');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || 'Institutional Partner',
          email: email || 'partner@hardmanreed.com',
          company: org || 'Commercial Financial Institution',
          volume: role,
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.warn('API error in demo submit:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setLoading(false);
    onClose();
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
            Schedule Lending OS Platform Walkthrough
          </Text>
        </Group>
      }
      size="md"
      radius="md"
      styles={{
        content: {
          overflow: 'hidden',
        },
        body: {
          overflowX: 'hidden',
        },
      }}
    >
      {submitted ? (
        <Box py="md" style={{ overflowX: 'hidden' }}>
          <Alert icon={<IconCheck size={20} />} title="Demo Scheduled!" color="teal" radius="md">
            <Text size="sm" mt="xs">
              Thank you, <strong>{name || 'Partner'}</strong>. We have reserved an executive walkthrough of the Hardman & Reed Lending & Underwriting suite for <strong>{org || 'your team'}</strong>. An invitation with calendar options has been sent to your inbox.
            </Text>
          </Alert>
          <Group justify="flex-end" mt="md">
            <Button color="teal" onClick={resetForm}>
              Close
            </Button>
          </Group>
        </Box>
      ) : (
        <form onSubmit={handleSubmit} style={{ overflowX: 'hidden' }}>
          <Stack gap="md" py="xs" style={{ overflowX: 'hidden' }}>
            <TextInput
              label="Full Name"
              placeholder="e.g. Rachel Chen"
              required
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <TextInput
              label="Work Email"
              placeholder="rachel@fintechbank.com"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <TextInput
              label="Institution / Company Name"
              placeholder="e.g. Meridian Commercial Bank"
              required
              value={org}
              onChange={(e) => setOrg(e.currentTarget.value)}
            />
            <Select
              label="Your Role / Function"
              data={[
                'Chief Risk Officer / Credit Head',
                'Chief Technology Officer',
                'Head of Lending / Underwriting',
                'SMB Founder / CFO',
                'NBFC / Fintech Executive',
              ]}
              value={role}
              onChange={(val) => setRole(val || 'Chief Risk Officer / Credit Head')}
            />
            <Select
              label="Primary Area of Focus"
              data={[
                'Automated Credit Decisioning Engine',
                'Digital Loan Origination & e-KYC',
                'Collections & Delinquency Workflows',
                'Full Lending OS Suite & API Licensing',
              ]}
              defaultValue="Automated Credit Decisioning Engine"
            />

            <Button type="submit" color="teal" fullWidth mt="sm" loading={loading} rightSection={<IconSend size={16} />}>
              Confirm Demo Booking
            </Button>
          </Stack>
        </form>
      )}
    </Modal>
  );
};
