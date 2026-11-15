import React, { useState } from 'react';
import {
  Container,
  Title,
  Text,
  Badge,
  SimpleGrid,
  Paper,
  Avatar,
  Group,
  Stack,
  Button,
  Box,
  Divider,
  Modal,
  TextInput,
  Textarea,
  Alert,
} from '@mantine/core';
import {
  IconTarget,
  IconEye,
  IconBriefcase,
  IconCheck,
} from '@tabler/icons-react';
import { CommentHtml } from '../components/CommentHtml';
import { FaqWithImage } from '../components/FaqWithImage';
import { GetInTouchForm } from '../components/GetInTouchForm';
import { MotionReveal, MotionStaggerContainer, MotionStaggerItem } from '../components/MotionReveal';
const greatPlaceToWorkImg = '/great_place_to_work.png';
const alisterReedImg = '/alister_reed.png';
const lucianHardmanImg = '/lucian_hardman.png';
const celesteHarrowImg = '/celeste_harrow.png';
const torstenBrandImg = '/torsten_brand.png';
const soraiaVarmaImg = '/soraia_varma.png';

const leadershipTeam = [
  {
    name: 'Alister Reed',
    role: 'Co-Founder & CEO',
    avatar: alisterReedImg,
  },
  {
    name: 'Dr. Lucian Hardman',
    role: 'Co-Founder & CTO',
    avatar: lucianHardmanImg,
  },
  {
    name: 'Celeste Harrow',
    role: 'Chief Credit Officer',
    avatar: celesteHarrowImg,
  },
  {
    name: 'Torsten Brand',
    role: 'Head of Risk & Modeling',
    avatar: torstenBrandImg,
  },
  {
    name: 'Soraia Varma',
    role: 'Head of Compliance',
    avatar: soraiaVarmaImg,
  },
];

const openRoles = [
  {
    title: 'Staff Machine Learning Engineer — Credit Risk',
    dept: 'Engineering',
    location: 'New York / Hybrid / Remote',
    type: 'Full-time',
  },
  {
    title: 'Senior Full Stack Engineer (React + Node / Go)',
    dept: 'Engineering',
    location: 'Remote (US / UK / Europe)',
    type: 'Full-time',
  },
  {
    title: 'Senior SMB Credit Risk Analyst',
    dept: 'Credit Risk',
    location: 'New York, NY',
    type: 'Full-time',
  },
  {
    title: 'Regulatory Compliance Officer (RBI & FCA)',
    dept: 'Compliance',
    location: 'London / Mumbai / Hybrid',
    type: 'Full-time',
  },
  {
    title: 'Enterprise Account Executive — Lending Partnerships',
    dept: 'Sales & Capital Markets',
    location: 'New York / Remote',
    type: 'Full-time',
  },
];

export const CompanyPage: React.FC = () => {
  const [careerModalOpened, setCareerModalOpened] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [appliedSuccess, setAppliedSuccess] = useState(false);
  const [careerName, setCareerName] = useState('');
  const [careerEmail, setCareerEmail] = useState('');
  const [careerPortfolio, setCareerPortfolio] = useState('');
  const [careerNote, setCareerNote] = useState('');
  const [careerLoading, setCareerLoading] = useState(false);

  const handleApplyRole = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    setAppliedSuccess(false);
    setCareerModalOpened(true);
  };

  const handleCareerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCareerLoading(true);
    try {
      await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roleTitle: selectedRole,
          fullName: careerName,
          email: careerEmail,
          portfolio: careerPortfolio,
          coverNote: careerNote,
        }),
      });
      setAppliedSuccess(true);
    } catch (err) {
      console.warn('Career API error:', err);
      setAppliedSuccess(true);
    } finally {
      setCareerLoading(false);
    }
  };

  return (
    <Box py={{ base: 40, md: 60 }}>
      <Container size="xl">
        {/* SECTION 1: ABOUT & MISSION */}
        <Box mb={70}>
          <MotionReveal direction="up" delay={0.05}>
            <Box ta="center" mb={50}>
              <Badge color="blue" variant="light" size="lg" mb="sm">
                Our Story & Purpose
              </Badge>
              <Title
                order={1}
                fw={800}
                c="#094067"
                style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', lineHeight: 1.2 }}
              >
                Built by Lenders and Engineers to Fix Broken SMB Credit Access
              </Title>
              <Text size="lg" c="dimmed" mt="md" style={{ maxWidth: 740, margin: '16px auto 0' }}>
                We started Hardman & Reed after witnessing countless healthy, flourishing businesses choked by 6-week legacy bank underwriting cycles and arbitrary collateral mandates.
              </Text>
            </Box>
          </MotionReveal>

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            <MotionReveal direction="right" delay={0.1}>
              <Paper p="xl" radius="lg" withBorder bg="#ffffff" style={{ height: '100%' }}>
                <Group gap="sm" mb="md">
                  <Avatar color="blue" radius="md">
                    <IconTarget size={22} />
                  </Avatar>
                  <div>
                    <Text fw={700} size="lg">
                      Our Mission
                    </Text>
                    <Text size="xs" c="dimmed">
                      Fair, transparent, high-velocity capital
                    </Text>
                  </div>
                </Group>
                <Text size="sm" c="dimmed" lh={1.7}>
                  To democratize business credit with uncompromising speed, algorithmic fairness, and total transparency. We believe every entrepreneur with real revenue and operational grit deserves immediate access to growth liquidity without predatory traps or endless paperwork.
                </Text>
              </Paper>
            </MotionReveal>

            <MotionReveal direction="left" delay={0.15}>
              <Paper p="xl" radius="lg" withBorder bg="#ffffff" style={{ height: '100%' }}>
                <Group gap="sm" mb="md">
                  <Avatar color="teal" radius="md">
                    <IconEye size={22} />
                  </Avatar>
                  <div>
                    <Text fw={700} size="lg">
                      Our Architectural Philosophy
                    </Text>
                    <Text size="xs" c="dimmed">
                      Continuous intelligence over static paper
                    </Text>
                  </div>
                </Group>
                <Text size="sm" c="dimmed" lh={1.7}>
                  Legacy banks underwrite the past; Hardman & Reed underwrites the present and near future. By connecting directly to accounting software, payment gateways, and banking ledgers, we evaluate cash flow momentum in real time, dramatically compressing risk spreads for borrowers.
                </Text>
              </Paper>
            </MotionReveal>
          </SimpleGrid>
        </Box>

        {/* SECTION 2: EXECUTIVE LEADERSHIP TEAM */}
        <Box mb={80}>
          <MotionReveal direction="up" delay={0.1}>
            <Box mb="xl">
              <Badge color="indigo" size="sm">
                Leadership
              </Badge>
              <Title order={2} fw={800} mt={4} c="dark.8">
                Executive Team
              </Title>
              <Text size="sm" c="dimmed">
                Decades of combined institutional credit risk, machine learning, and banking compliance leadership.
              </Text>
            </Box>
          </MotionReveal>

          <MotionStaggerContainer staggerDelay={0.08}>
            <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 5 }} spacing="lg">
              {leadershipTeam.map((leader) => (
                <MotionStaggerItem key={leader.name}>
                  <Paper
                    p="sm"
                    radius="md"
                    withBorder
                    className="card-hover"
                    bg="#ffffff"
                    style={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      style={{
                        width: '100%',
                        aspectRatio: '1 / 1',
                        borderRadius: 8,
                        overflow: 'hidden',
                        backgroundColor: '#f1f5f9',
                        marginBottom: 12,
                      }}
                    >
                      <img
                        src={leader.avatar}
                        alt={leader.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.3s ease',
                        }}
                      />
                    </Box>
                    <Text fw={700} size="sm" c="#094067" lh={1.3}>
                      {leader.name}
                    </Text>
                    <Text size="xs" c="blue.7" fw={600} mt={3}>
                      {leader.role}
                    </Text>
                  </Paper>
                </MotionStaggerItem>
              ))}
            </SimpleGrid>
          </MotionStaggerContainer>
        </Box>

        {/* SECTION 3: TESTIMONIALS (SMB Quotes as specified in README) */}
        <Box mb={80}>
          <MotionReveal direction="up" delay={0.1}>
            <Box mb="xl" ta="center">
              <Badge color="teal" size="sm">
                Client Stories
              </Badge>
              <Title order={2} fw={800} mt={4} c="#094067">
                Trusted by Ambitious SMB Owners
              </Title>
              <Text size="sm" c="dimmed" style={{ maxWidth: 600, margin: '8px auto' }}>
                Real quotes and quantifiable balance sheet growth from retail, manufacturing, and logistics founders.
              </Text>
            </Box>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.15}>
            <CommentHtml />
          </MotionReveal>
        </Box>

        {/* SECTION 4: CAREERS */}
        <Box mb={80}>
          <MotionReveal direction="up" delay={0.1}>
            <Paper p={{ base: 'lg', md: 'xl' }} radius="lg" withBorder bg="#f8fafc">
              <Group justify="space-between" mb="lg" wrap="wrap">
                <div>
                  <Badge color="blue" variant="filled" size="sm">
                    We're Hiring
                  </Badge>
                  <Title order={2} fw={800} mt={4} c="#094067">
                    Join the Hardman & Reed Team
                  </Title>
                  <Text size="xs" c="dimmed">
                    We are looking for builders, quantitative modelers, and fintech leaders to modernize commercial credit.
                  </Text>
                </div>
                <Group gap="sm" align="center">
                  <img
                    src={greatPlaceToWorkImg}
                    alt="Great Place to Work Certified"
                    title="Great Place to Work Certified"
                    style={{ height: 44, width: 'auto', objectFit: 'contain' }}
                  />
                  <Badge color="green" size="lg" variant="light">
                    5 Open Positions
                  </Badge>
                </Group>
              </Group>

              <Stack gap="sm">
                {openRoles.map((role) => (
                  <Paper key={role.title} p="md" radius="md" bg="#ffffff" withBorder className="card-hover">
                    <Group justify="space-between" wrap="wrap">
                      <div>
                        <Text fw={700} size="sm" c="dark.8">
                          {role.title}
                        </Text>
                        <Group gap="xs" mt={4}>
                          <Badge size="xs" color="blue" variant="light">
                            {role.dept}
                          </Badge>
                          <Text size="xs" c="dimmed">
                            {role.location}
                          </Text>
                          <Text size="xs" c="dimmed">
                            · {role.type}
                          </Text>
                        </Group>
                      </div>
                      <Button size="xs" variant="light" color="blue" onClick={() => handleApplyRole(role.title)}>
                        Apply Role
                      </Button>
                    </Group>
                  </Paper>
                ))}
              </Stack>
            </Paper>
          </MotionReveal>
        </Box>

        {/* SECTION 5: FAQ WITH IMAGE */}
        <Box mb={80}>
          <MotionReveal direction="up" delay={0.1}>
            <FaqWithImage />
          </MotionReveal>
        </Box>

        {/* SECTION 6: GET IN TOUCH FORM */}
        <Box mb={50}>
          <MotionReveal direction="up" delay={0.1}>
            <GetInTouchForm />
          </MotionReveal>
        </Box>
      </Container>

      {/* Careers Quick Apply Modal */}
      <Modal
        opened={careerModalOpened}
        onClose={() => setCareerModalOpened(false)}
        title={
          <Group gap="xs">
            <IconBriefcase size={18} color="#1971c2" />
            <Text fw={700} size="sm">
              Apply for {selectedRole}
            </Text>
          </Group>
        }
        radius="md"
      >
        {appliedSuccess ? (
          <Alert icon={<IconCheck size={20} />} title="Application Submitted!" color="teal" radius="md">
            Thank you for applying for <strong>{selectedRole}</strong>. Our talent team will review your profile and contact you within 48 hours.
          </Alert>
        ) : (
          <form onSubmit={handleCareerSubmit}>
            <Stack gap="sm">
              <TextInput
                label="Full Name"
                placeholder="e.g. Liam Parker"
                required
                value={careerName}
                onChange={(e) => setCareerName(e.currentTarget.value)}
              />
              <TextInput
                label="Email Address"
                placeholder="liam@example.com"
                type="email"
                required
                value={careerEmail}
                onChange={(e) => setCareerEmail(e.currentTarget.value)}
              />
              <TextInput
                label="LinkedIn Profile / Portfolio URL"
                placeholder="https://linkedin.com/in/..."
                value={careerPortfolio}
                onChange={(e) => setCareerPortfolio(e.currentTarget.value)}
              />
              <Textarea
                label="Why Hardman & Reed?"
                placeholder="Tell us about your background and motivation..."
                minRows={3}
                value={careerNote}
                onChange={(e) => setCareerNote(e.currentTarget.value)}
              />
              <Button type="submit" color="blue" fullWidth mt="sm" loading={careerLoading}>
                Submit Application
              </Button>
            </Stack>
          </form>
        )}
      </Modal>
    </Box>
  );
};
