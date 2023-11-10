import React, { useEffect, useState, ReactElement, useCallback } from "react";
import type { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import PropTypes from "prop-types";
import { IEventSlide } from "../../interfaces/event/event.interface";

const carouselVariants: Variants = {
  initial: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
      // scale: 0.5,
    };
  },
  animate: {
    x: 0,
    opacity: 1,
    // scale: 1,
    // transition: 'ease-in',
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    }
  },
  exit: (direction: number) => {
    return {
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      // scale: 0.5,
      // transition: 'ease-in',
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    };
  }
};

interface CarouselProps {
  slides: IEventSlide[];
}

const Carousel: FC<CarouselProps> = ({ slides }): ReactElement => {
  const [index, setIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);

  const nextStep: () => void = useCallback((): void => {
    setDirection(1);
    if (index === slides.length - 1) {
      setIndex(0);
      return;
    }
    setIndex(index + 1);
  }, [index, slides.length]);

  const prevStep: () => void = useCallback((): void => {
    setDirection(-1);
    if (index === 0) {
      setIndex(slides.length - 1);
      return;
    }
    setIndex(index - 1);
  }, [index, slides.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextStep();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextStep]);

  return (
    <motion.div className="carousel">
      <motion.div className="carousel__inner">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div className="carousel__inner--title">
            <motion.h3 initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.4 } }}>
              {slides[index].title}
            </motion.h3>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div className="carousel__inner--slider">
            <motion.img
              whileTap={{ cursor: "grabbing" }}
              variants={carouselVariants}
              animate="animate"
              initial="initial"
              exit="exit"
              src={slides[index].image}
              alt="slides"
              className="carousel__slide"
              key={slides[index].id}
              custom={direction}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              dragTransition={{ bounceStiffness: 800, bounceDamping: 10 }}
              onDragEnd={(e, { offset }) => {
                // console.log("velocity", velocity);
                if (offset.x > 10) {
                  nextStep();
                } else if (offset.x < -10) {
                  prevStep();
                }
              }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

Carousel.propTypes = {
  slides: PropTypes.array.isRequired
};

export default Carousel;
