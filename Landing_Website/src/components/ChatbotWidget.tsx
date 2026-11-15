import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Text,
  ActionIcon,
  Group,
  UnstyledButton,
} from '@mantine/core';
import {
  IconArrowUp,
  IconX,
  IconRotateClockwise,
  IconArrowRight,
} from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
const logoImg = '/logo.png';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  action?: 'apply' | 'demo' | 'contact';
}

interface ChatbotWidgetProps {
  onOpenApply?: () => void;
  onOpenDemo?: () => void;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'bot',
    text: "Welcome to Hardman & Reed. Ask anything about credit limits, underwriting turnaround, or capital requirements.",
    timestamp: 'Just now',
  },
];

const SUGGESTED_QUESTIONS = [
  'Rates & Limits',
  'Approval Speed',
  'Required Documents',
  'Apply for Loan',
];

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ onOpenApply, onOpenDemo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping]);

  const generateResponse = (userText: string): { reply: string; action?: 'apply' | 'demo' | 'contact' } => {
    const text = userText.toLowerCase();

    if (text.includes('rate') || text.includes('apr') || text.includes('interest') || text.includes('cost')) {
      return {
        reply: "Rates start at 7.9% APR based on automated cash flow telemetry. Zero origination surprises, transparent amortizations, and no prepayment penalties.",
        action: 'apply',
      };
    }

    if (text.includes('limit') || text.includes('amount') || text.includes('how much') || text.includes('size')) {
      return {
        reply: "Credit facilities range from $10,000 to $5,000,000 for standard SMB facilities, and up to $25M for syndicated credit lines.",
        action: 'apply',
      };
    }

    if (text.includes('fast') || text.includes('speed') || text.includes('timeline') || text.includes('time') || text.includes('approval')) {
      return {
        reply: "Decisions in 180 seconds via our digital underwriting engine. Capital is typically disbursed within 24 to 48 hours.",
        action: 'apply',
      };
    }

    if (text.includes('document') || text.includes('require') || text.includes('criteria') || text.includes('qualif')) {
      return {
        reply: "Requirements:\n• 6+ months active operating history\n• $15k+ monthly revenue\n• 3 months business bank statements\nNo rigid personal credit score cutoffs.",
        action: 'apply',
      };
    }

    if (text.includes('apply') || text.includes('borrow') || text.includes('start')) {
      return {
        reply: "You can complete your application online in ~3 minutes without impacting your credit score.",
        action: 'apply',
      };
    }

    if (text.includes('demo') || text.includes('platform')) {
      return {
        reply: "We offer private walkthroughs of our Lending OS underwriting platform for institutional lenders and capital partners.",
        action: 'demo',
      };
    }

    if (text.includes('contact') || text.includes('email') || text.includes('human') || text.includes('underwriter') || text.includes('desk')) {
      return {
        reply: "You can reach our Credit Desk directly at credit-desk@hardmanreed.com or call +1 (800) 482-9170 (Mon–Fri, 8 AM–7 PM EST).",
        action: 'contact',
      };
    }

    return {
      reply: "We provide $10K–$5M SMB capital facilities with 180-second decisions. Would you like to check pre-qualification or start an application?",
      action: 'apply',
    };
  };

  const handleSend = (textToSend?: string) => {
    const raw = textToSend !== undefined ? textToSend : inputValue;
    const trimmed = raw.trim();
    if (!trimmed) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const responseData = generateResponse(trimmed);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: responseData.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: responseData.action,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 450);
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
    setIsTyping(false);
  };

  return (
    <>
      {/* Minimalist Floating Trigger Button with Logo */}
      <motion.div
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 999,
        }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        <UnstyledButton
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close assistant' : 'Open Credit Desk assistant'}
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            cursor: 'pointer',
            padding: 0,
            transition: 'border-color 0.2s ease',
          }}
        >
          {isOpen ? (
            <IconX size={20} color="#0f172a" stroke={1.8} />
          ) : (
            <>
              <img
                src={logoImg}
                alt="Hardman & Reed"
                style={{
                  width: 32,
                  height: 32,
                  objectFit: 'contain',
                  borderRadius: '50%',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: 2,
                  right: 2,
                  width: 9,
                  height: 9,
                  backgroundColor: '#10b981',
                  border: '1.5px solid #ffffff',
                  borderRadius: '50%',
                }}
              />
            </>
          )}
        </UnstyledButton>
      </motion.div>

      {/* Minimalist Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              bottom: 86,
              right: 24,
              width: 'min(350px, calc(100vw - 32px))',
              height: 'min(490px, calc(100vh - 110px))',
              backgroundColor: '#ffffff',
              borderRadius: 14,
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 1000,
              overflow: 'hidden',
            }}
          >
            {/* Minimal Header */}
            <Box
              px="md"
              py="xs"
              style={{
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #f1f5f9',
              }}
            >
              <Group justify="space-between" align="center" wrap="nowrap">
                <Group gap={8} wrap="nowrap">
                  <img
                    src={logoImg}
                    alt="Hardman & Reed"
                    style={{ width: 22, height: 22, objectFit: 'contain' }}
                  />
                  <div>
                    <Text size="xs" fw={600} c="#0f172a" lh={1.2}>
                      Credit Desk
                    </Text>
                    <Group gap={4} align="center">
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          backgroundColor: '#10b981',
                          borderRadius: '50%',
                          display: 'inline-block',
                        }}
                      />
                      <Text size="10px" c="#64748b" lh={1}>
                        Direct Underwriting
                      </Text>
                    </Group>
                  </div>
                </Group>

                <Group gap={2}>
                  <ActionIcon
                    size="xs"
                    variant="subtle"
                    c="#94a3b8"
                    title="Reset chat"
                    onClick={handleReset}
                  >
                    <IconRotateClockwise size={14} />
                  </ActionIcon>
                  <ActionIcon
                    size="xs"
                    variant="subtle"
                    c="#94a3b8"
                    title="Close"
                    onClick={() => setIsOpen(false)}
                  >
                    <IconX size={15} />
                  </ActionIcon>
                </Group>
              </Group>
            </Box>

            {/* Messages Body */}
            <Box
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '14px',
                backgroundColor: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              {messages.map((msg) => (
                <Box
                  key={msg.id}
                  style={{
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '86%',
                  }}
                >
                  <Box
                    style={{
                      backgroundColor: msg.sender === 'user' ? '#0f172a' : '#f8fafc',
                      color: msg.sender === 'user' ? '#ffffff' : '#1e293b',
                      borderRadius: 12,
                      padding: '8px 12px',
                      border: msg.sender === 'user' ? 'none' : '1px solid #f1f5f9',
                      whiteSpace: 'pre-line',
                      fontSize: 12.5,
                      lineHeight: 1.45,
                    }}
                  >
                    {msg.text}
                  </Box>

                  {/* Contextual Action Button */}
                  {msg.action === 'apply' && onOpenApply && (
                    <UnstyledButton
                      onClick={() => {
                        onOpenApply();
                        setIsOpen(false);
                      }}
                      style={{
                        marginTop: 6,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        padding: '4px 10px',
                        borderRadius: 14,
                        backgroundColor: '#0f172a',
                        color: '#ffffff',
                        fontSize: 11,
                        fontWeight: 500,
                        cursor: 'pointer',
                      }}
                    >
                      <span>Apply online ($10k–$5M)</span>
                      <IconArrowRight size={11} />
                    </UnstyledButton>
                  )}

                  {msg.action === 'demo' && onOpenDemo && (
                    <UnstyledButton
                      onClick={() => {
                        onOpenDemo();
                        setIsOpen(false);
                      }}
                      style={{
                        marginTop: 6,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        padding: '4px 10px',
                        borderRadius: 14,
                        backgroundColor: '#0f172a',
                        color: '#ffffff',
                        fontSize: 11,
                        fontWeight: 500,
                        cursor: 'pointer',
                      }}
                    >
                      <span>Schedule demo</span>
                      <IconArrowRight size={11} />
                    </UnstyledButton>
                  )}

                  {msg.action === 'contact' && (
                    <Text size="10px" c="#64748b" mt={4}>
                      credit-desk@hardmanreed.com
                    </Text>
                  )}
                </Box>
              ))}

              {/* Minimal Typing indicator */}
              {isTyping && (
                <Box
                  style={{
                    alignSelf: 'flex-start',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #f1f5f9',
                    borderRadius: 12,
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <span
                    style={{
                      width: 4,
                      height: 4,
                      backgroundColor: '#94a3b8',
                      borderRadius: '50%',
                      display: 'inline-block',
                      animation: 'pulse 1s infinite alternate',
                    }}
                  />
                  <span
                    style={{
                      width: 4,
                      height: 4,
                      backgroundColor: '#94a3b8',
                      borderRadius: '50%',
                      display: 'inline-block',
                      animation: 'pulse 1s infinite alternate 0.2s',
                    }}
                  />
                  <span
                    style={{
                      width: 4,
                      height: 4,
                      backgroundColor: '#94a3b8',
                      borderRadius: '50%',
                      display: 'inline-block',
                      animation: 'pulse 1s infinite alternate 0.4s',
                    }}
                  />
                </Box>
              )}

              <div ref={messagesEndRef} />
            </Box>

            {/* Quick suggested chips */}
            {messages.length <= 2 && !isTyping && (
              <Box
                px="sm"
                pb="xs"
                style={{
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  gap: 6,
                  flexWrap: 'wrap',
                }}
              >
                {SUGGESTED_QUESTIONS.map((q) => (
                  <UnstyledButton
                    key={q}
                    onClick={() => handleSend(q)}
                    style={{
                      padding: '3px 8px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: 12,
                      fontSize: 11,
                      color: '#475569',
                      cursor: 'pointer',
                      transition: 'border-color 0.15s ease',
                    }}
                  >
                    {q}
                  </UnstyledButton>
                ))}
              </Box>
            )}

            {/* Minimalist Input Footer */}
            <Box
              p="xs"
              style={{
                backgroundColor: '#ffffff',
                borderTop: '1px solid #f1f5f9',
              }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 20,
                  padding: '4px 6px 4px 12px',
                }}
              >
                <input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a question..."
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: 12,
                    color: '#0f172a',
                  }}
                />
                <ActionIcon
                  size={24}
                  radius="xl"
                  variant="filled"
                  color="dark"
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim()}
                  style={{
                    backgroundColor: inputValue.trim() ? '#0f172a' : '#cbd5e1',
                    cursor: inputValue.trim() ? 'pointer' : 'default',
                  }}
                >
                  <IconArrowUp size={13} stroke={2.2} />
                </ActionIcon>
              </form>
              <Text size="9px" c="#94a3b8" ta="center" mt={6}>
                Encrypted session • credit-desk@hardmanreed.com
              </Text>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
