import React, { ReactElement } from "react";
import type { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { AnimatedLettersStyles } from "./AnimatedLettersStyles";
import { letterVariants, wordVariants } from "./AnimatedLettersVariants";

interface IWord {
  sentence: string;
}

const AnimatedLetters: FC<IWord> = ({ sentence }): ReactElement => {
  return (
    <AnimatePresence initial>
      <AnimatedLettersStyles variants={wordVariants} initial="initial" animate="animate">
        {[...sentence].map((letter: string, i) => (
          <motion.span key={i} variants={letterVariants}>
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </AnimatedLettersStyles>
    </AnimatePresence>
  );
};

AnimatedLetters.propTypes = {
  sentence: PropTypes.string.isRequired
};

export default AnimatedLetters;
