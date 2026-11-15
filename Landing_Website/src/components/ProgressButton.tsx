import React, { useState } from 'react';
import { Button, Progress, Text, Stack, Group, Paper, Badge } from '@mantine/core';
import { IconCheck, IconPlayerPlay, IconRefresh } from '@tabler/icons-react';

interface ProgressButtonProps {
  label?: string;
  onComplete?: () => void;
}

export const ProgressButton: React.FC<ProgressButtonProps> = ({
  label = 'Run Instant AI Eligibility Check',
  onComplete,
}) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  const startProgress = () => {
    if (loading) return;
    setLoading(true);
    setProgress(0);
    setCompleted(false);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          setCompleted(true);
          if (onComplete) onComplete();
          return 100;
        }
        const step = Math.floor(Math.random() * 20) + 12;
        return Math.min(prev + step, 100);
      });
    }, 220);
  };

  const reset = () => {
    setProgress(0);
    setCompleted(false);
    setLoading(false);
  };

  return (
    <Paper p="md" radius="md" withBorder style={{ backgroundColor: '#f8fafc' }}>
      <Stack gap="xs">
        <Group justify="space-between">
          <Text size="xs" fw={700} c="dimmed" tt="uppercase">
            Interactive Decision Simulation
          </Text>
          {completed && (
            <Badge color="teal" variant="light" leftSection={<IconCheck size={12} />}>
              Eligible for up to $250,000
            </Badge>
          )}
        </Group>

        <Group>
          {!completed ? (
            <Button
              color="blue"
              onClick={startProgress}
              loading={loading}
              loaderProps={{ type: 'dots' }}
              leftSection={<IconPlayerPlay size={16} />}
              style={{ flex: 1 }}
            >
              {loading ? `Evaluating credit models (${progress}%)...` : label}
            </Button>
          ) : (
            <Button
              color="teal"
              variant="light"
              onClick={reset}
              leftSection={<IconRefresh size={16} />}
              style={{ flex: 1 }}
            >
              Test Another Scenario
            </Button>
          )}
        </Group>

        {loading && (
          <div>
            <Progress value={progress} color="blue" size="sm" radius="xl" animated />
            <Text size="xs" c="dimmed" mt={4} ta="center">
              Scanning multi-bureau metrics, cashflow history & debt-service coverage ratio...
            </Text>
          </div>
        )}
      </Stack>
    </Paper>
  );
};

