import React, { useEffect, useState, ReactElement, useCallback } from "react";
import type { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import PropTypes from "prop-types";
import useWindowSize from "../../hooks/useWindowSize";
import { homeSlides, homeSlidesBig } from "../../utils/home-utils.service";
import { ICarousel } from "./Carousel.interface";
import { BreakPoint } from "../layout/Layout.interface";
import { Container } from "../globalStyles/global.styles";
import { CarouselContainer, CarouselInner, CarouselSlide, CarouselSlider, CarouselTitle } from "./Carousel.styles";

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

const Carousel: FC = (): ReactElement => {
  const [index, setIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  const size = useWindowSize();

  const showSlides = useCallback((): ICarousel[] => {
    if (size.width < BreakPoint.small) {
      return homeSlides;
    }
    return homeSlidesBig;
  }, [size.width]);

  const nextStep = useCallback((): void => {
    setDirection(1);
    if (index === showSlides().length - 1) {
      setIndex(0);
      return;
    }
    setIndex(index + 1);
  }, [index, showSlides]);

  const prevStep = useCallback((): void => {
    setDirection(-1);
    if (index === 0) {
      setIndex(showSlides().length - 1);
      return;
    }
    setIndex(index - 1);
  }, [index, showSlides]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextStep();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextStep]);

  return (
    <Container>
      <CarouselContainer>
        <CarouselInner>
          <AnimatePresence initial={false} custom={direction}>
            <CarouselTitle>
              <motion.h3 initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.4 } }}>
                {showSlides()[index].title}
              </motion.h3>
            </CarouselTitle>
          </AnimatePresence>
          <AnimatePresence initial={false} custom={direction}>
            <CarouselSlider>
              <CarouselSlide
                whileTap={{ cursor: "grabbing" }}
                variants={carouselVariants}
                animate="animate"
                initial="initial"
                exit="exit"
                src={showSlides()[index].image}
                alt="slides"
                key={showSlides()[index].id}
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
            </CarouselSlider>
          </AnimatePresence>
        </CarouselInner>
      </CarouselContainer>
    </Container>
  );
};

Carousel.propTypes = {
  slides: PropTypes.array.isRequired
};

export default Carousel;
