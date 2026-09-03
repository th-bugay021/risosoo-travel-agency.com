'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type MotionChildrenProps = {
  children: ReactNode;
  className?: string;
};

const revealTransition = { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const };

export function Reveal({ children, className }: MotionChildrenProps) {
  const reduceMotion = useReducedMotion();

  return <motion.div className={className} initial={reduceMotion ? false : { opacity: 0, y: 52, scale: 0.95 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={revealTransition}>{children}</motion.div>;
}

export function Stagger({ children, className }: MotionChildrenProps) {
  const reduceMotion = useReducedMotion();

  return <motion.div className={className} initial={reduceMotion ? false : 'hidden'} whileInView={reduceMotion ? undefined : 'visible'} viewport={{ once: true, amount: 0.2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.17 } } }}>{children}</motion.div>;
}

export function StaggerItem({ children, className }: MotionChildrenProps) {
  const reduceMotion = useReducedMotion();

  return <motion.div className={className} variants={reduceMotion ? undefined : { hidden: { opacity: 0, y: 48, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: revealTransition } }}>{children}</motion.div>;
}

export function HeroIntro({ children, className }: MotionChildrenProps) {
  const reduceMotion = useReducedMotion();

  return <motion.div className={className} initial={reduceMotion ? false : 'hidden'} animate={reduceMotion ? undefined : 'visible'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } } }}>{children}</motion.div>;
}

export function HeroItem({ children, className }: MotionChildrenProps) {
  const reduceMotion = useReducedMotion();

  return <motion.div className={className} variants={reduceMotion ? undefined : { hidden: { opacity: 0, y: 48, scale: 0.94 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] } } }}>{children}</motion.div>;
}
