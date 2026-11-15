import React, { useState } from 'react';
import { Paper, Text, Group, Button, CloseButton, Transition, Box } from '@mantine/core';
import { IconCookie } from '@tabler/icons-react';

export const CookiesBanner: React.FC = () => {
  const [opened, setOpened] = useState(true);

  if (!opened) return null;

  return (
    <Box
      style={{
        position: 'fixed',
        bottom: 20,
        left: 20,
        maxWidth: 420,
        zIndex: 990,
      }}
    >
      <Paper p="md" radius="md" withBorder style={{ backgroundColor: '#ffffff' }}>
        <Group justify="space-between" align="flex-start" mb="xs">
          <Group gap="xs">
            <IconCookie size={22} color="#1971c2" />
            <Text fw={700} size="sm">
              Cookies & Financial Data Security
            </Text>
          </Group>
          <CloseButton size="sm" onClick={() => setOpened(false)} aria-label="Close cookies banner" />
        </Group>

        <Text size="xs" c="dimmed" mb="md" lh={1.4}>
          We utilize essential cookies and encrypted telemetry to guarantee loan session security, authenticate identity, and optimize SMB risk underwriting performance.
        </Text>

        <Group justify="flex-end" gap="xs">
          <Button variant="default" size="xs" onClick={() => setOpened(false)}>
            Essential Only
          </Button>
          <Button color="blue" size="xs" onClick={() => setOpened(false)}>
            Accept All
          </Button>
        </Group>
      </Paper>
    </Box>
  );
};

