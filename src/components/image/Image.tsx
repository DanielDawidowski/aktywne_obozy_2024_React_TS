import React, { useState, ReactElement } from "react";
import type { FC } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

interface IImage {
  src: string;
  alt: string;
}

const Image: FC<IImage> = ({ src, alt }): ReactElement => {
  const [imageLoading, setImageLoading] = useState(true);
  const [pulsing, setPulsing] = useState(true);

  const imageLoaded = (): void => {
    setImageLoading(false);
    setTimeout(() => setPulsing(false), 600);
  };

  return (
    <motion.div>
      <motion.img
        initial={{ height: "50%", opacity: 0 }}
        // style={{ height: imageLoading ? "6rem" : "auto" }}
        animate={{
          height: imageLoading ? "100%" : "auto",
          opacity: imageLoading ? 0 : 1
        }}
        transition={{ duration: 0.6 }}
        onLoad={imageLoaded}
        src={src}
        alt={alt}
        loading="lazy"
      />
    </motion.div>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};

export default Image;
