'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type MotionChildrenProps = {
  children: ReactNode;
  className?: string;
};

const revealTransition = { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const };

export function Reveal({ children, className }: MotionChildrenProps) {
  const reduceMotion = useReducedMotion();

  return <motion.div className={className} initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={revealTransition}>{children}</motion.div>;
}

export function Stagger({ children, className }: MotionChildrenProps) {
  const reduceMotion = useReducedMotion();

  return <motion.div className={className} initial={reduceMotion ? false : 'hidden'} whileInView={reduceMotion ? undefined : 'visible'} viewport={{ once: true, amount: 0.2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}>{children}</motion.div>;
}

export function StaggerItem({ children, className }: MotionChildrenProps) {
  const reduceMotion = useReducedMotion();

  return <motion.div className={className} variants={reduceMotion ? undefined : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: revealTransition } }}>{children}</motion.div>;
}

export function HeroIntro({ children, className }: MotionChildrenProps) {
  const reduceMotion = useReducedMotion();

  return <motion.div className={className} initial={reduceMotion ? false : 'hidden'} animate={reduceMotion ? undefined : 'visible'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.12 } } }}>{children}</motion.div>;
}

export function HeroItem({ children, className }: MotionChildrenProps) {
  const reduceMotion = useReducedMotion();

  return <motion.div className={className} variants={reduceMotion ? undefined : { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: revealTransition } }}>{children}</motion.div>;
}
