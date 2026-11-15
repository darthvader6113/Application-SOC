import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface MotionRevealProps extends HTMLMotionProps<'div'> {
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
}

export const MotionReveal: React.FC<MotionRevealProps> = ({
  children,
  delay = 0,
  duration = 0.55,
  direction = 'up',
  distance = 30,
  style,
  ...props
}) => {
  const getOffset = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const MotionStaggerContainer: React.FC<HTMLMotionProps<'div'> & { staggerDelay?: number }> = ({
  children,
  staggerDelay = 0.1,
  style,
  ...props
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const MotionStaggerItem: React.FC<HTMLMotionProps<'div'>> = ({ children, style, ...props }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.21, 0.47, 0.32, 0.98],
          },
        },
      }}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
};

