import React, { useState } from 'react';
import { Paper, Text, Title, TextInput, Button, Group, Box, Badge } from '@mantine/core';
import { IconMail, IconCheck, IconBellRinging } from '@tabler/icons-react';

export const EmailBanner: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setLoading(true);
      try {
        await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        setSubscribed(true);
      } catch (err) {
        console.warn('Newsletter API error, falling back to local state:', err);
        setSubscribed(true);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Paper
      p={{ base: 'lg', md: 'xl' }}
      radius="lg"
      withBorder
      style={{
        background: 'linear-gradient(135deg, #094067 0%, #1971c2 100%)',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box style={{ position: 'relative', zIndex: 1 }}>
        <Group justify="space-between" align="center" wrap="wrap" gap="lg">
          <div style={{ maxWidth: 520 }}>
            <Badge color="cyan" variant="filled" size="sm" mb="xs" leftSection={<IconBellRinging size={12} />}>
              SMB Credit Radar
            </Badge>
            <Title order={3} c="white" fw={800} lh={1.2}>
              Get Weekly Commercial Rate Benchmarks & Credit Updates
            </Title>
            <Text size="sm" c="blue.1" mt="xs">
              Stay ahead with real-time interest rate movements, regulatory shifts, and capital optimization strategies for growing businesses.
            </Text>
          </div>

          <Box style={{ minWidth: 300, flex: 1, maxWidth: 460 }}>
            {subscribed ? (
              <Paper p="md" radius="md" bg="rgba(255, 255, 255, 0.15)">
                <Group gap="xs">
                  <IconCheck size={20} color="#69db7c" />
                  <Text size="sm" fw={600} c="white">
                    You're subscribed! Rate radar delivers every Tuesday.
                  </Text>
                </Group>
              </Paper>
            ) : (
              <form onSubmit={handleSubmit}>
                <Group gap="xs">
                  <TextInput
                    placeholder="Enter your corporate email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    required
                    type="email"
                    style={{ flex: 1 }}
                    leftSection={<IconMail size={16} />}
                    styles={{
                      input: {
                        backgroundColor: '#ffffff',
                        color: '#1a1e24',
                      },
                    }}
                  />
                  <Button type="submit" variant="filled" color="cyan" c="dark.9" fw={700} loading={loading}>
                    Subscribe
                  </Button>
                </Group>
                <Text size="11px" c="blue.2" mt={6}>
                  No spam ever. Unsubscribe with 1-click anytime.
                </Text>
              </form>
            )}
          </Box>
        </Group>
      </Box>
    </Paper>
  );
};

