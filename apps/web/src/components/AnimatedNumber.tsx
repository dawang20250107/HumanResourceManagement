'use client';

import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { formatNumber } from '@/lib/format';

export function AnimatedNumber({ value, decimals }: { value: number; decimals: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => formatNumber(v, decimals));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration: 1.1, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, value, mv]);

  return <motion.span ref={ref}>{text}</motion.span>;
}
