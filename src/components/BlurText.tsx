"use client";

import { motion, MotionConfig } from "motion/react";
import { Fragment } from "react";

// Les mots apparaissent un par un, en sortant du flou (version simple du BlurText de Wardd).
export function BlurText({
  text,
  className = "",
  wordClassName,
  delay = 0,
  stagger = 0.08,
  onView = false,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  onView?: boolean;
}) {
  const words = text.split(" ");
  const from = { opacity: 0, filter: "blur(12px)", y: 28 };
  const to = { opacity: 1, filter: "blur(0px)", y: 0 };

  return (
    <MotionConfig reducedMotion="user">
      <span className={className}>
        <span className="sr-only">{text}</span>
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <motion.span
              aria-hidden="true"
              className={`inline-block will-change-[transform,filter,opacity] ${wordClassName ?? ""}`}
              initial={from}
              {...(onView ? { whileInView: to, viewport: { once: true, margin: "-40px" } } : { animate: to })}
              transition={{ duration: 0.7, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && <span aria-hidden="true"> </span>}
          </Fragment>
        ))}
      </span>
    </MotionConfig>
  );
}
