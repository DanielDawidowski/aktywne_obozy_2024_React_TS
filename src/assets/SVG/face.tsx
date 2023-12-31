import React from "react";
import type { FC, ReactElement } from "react";

const FaceSVG: FC = (): ReactElement => {
  return (
    <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="face">
        <path
          id="head"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23.0074 0C35.7146 0 46.0148 10.3008 46.0148 23.0079C46.0148 35.7145 35.7146 46.0154 23.0074 46.0154C10.3008 46.0154 0 35.7145 0 23.0079C0 10.3008 10.3008 0 23.0074 0Z"
          fill="url(#paint0_radial_1632_36)"
        />
        <g id="Group 406">
          <path
            id="mounth"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24.0074 23.4123C19.0192 25.8551 23.6571 34.0149 32.0488 32.1902C40.0606 30.4473 41.2453 21.3716 36.3255 20.8203C34.1698 20.5788 32.2544 22.3467 30.0166 22.7881C27.9754 23.1913 25.8179 22.5255 24.0074 23.4123Z"
            fill="#282829"
          />
          <path
            id="tounge"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M28.4552 32.6179C30.3757 32.8053 34.0715 32.2676 32.0798 29.6591C31.4231 28.8002 30.378 28.0951 28.9354 27.955C27.5417 27.8189 26.4162 28.2672 25.5773 28.8845C22.5143 31.1365 26.4806 32.426 28.4552 32.6179Z"
            fill="url(#paint1_linear_1632_36)"
          />
          <path
            id="lips"
            d="M24.258 23.9222C23.2032 24.4388 22.6582 25.2453 22.5448 26.1384C22.4662 26.7631 22.591 27.4415 22.8946 28.1044C23.2084 28.7902 23.7119 29.4565 24.3794 30.0352C26.0328 31.4676 28.6743 32.3402 31.9298 31.6322C34.9877 30.9675 36.9845 29.1797 37.9681 27.2564C38.4045 26.4032 38.6402 25.5244 38.6795 24.71C38.7171 23.9268 38.5719 23.2081 38.2467 22.6396C37.8582 21.9607 37.1947 21.4903 36.2647 21.386C35.1495 21.2613 34.0343 21.7836 32.8895 22.3195C32.0073 22.7324 31.1085 23.1534 30.1266 23.3476C29.2427 23.5219 28.3559 23.5082 27.4822 23.494C26.3329 23.4763 25.2063 23.4581 24.258 23.9222ZM21.4171 25.9959C21.5772 24.7327 22.3227 23.605 23.7591 22.9016C24.9529 22.3173 26.2133 22.3372 27.4999 22.3577C28.3075 22.3702 29.1265 22.3833 29.9085 22.229C30.7634 22.0598 31.5932 21.6714 32.4083 21.2898C33.7017 20.6844 34.9615 20.0943 36.3888 20.2544C37.7176 20.403 38.671 21.0854 39.2365 22.0735C39.6694 22.8304 39.8647 23.7639 39.8163 24.7635C39.7697 25.7329 39.4923 26.7711 38.9797 27.7735C37.8582 29.9668 35.6034 32.0001 32.1702 32.7468C28.5205 33.5402 25.527 32.5344 23.6355 30.8952C22.8427 30.2089 22.2407 29.4081 21.8602 28.5772C21.4696 27.724 21.3118 26.8344 21.4171 25.9959Z"
            fill="#FED788"
          />
        </g>
        <path
          id="left-eye"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.9542 14.6482C22.8615 14.4962 23.7386 15.2167 23.9123 16.2578C24.0872 17.2989 23.4926 18.266 22.5853 18.4175C21.6774 18.5696 20.8003 17.8491 20.626 16.808C20.4518 15.7668 21.0464 14.8003 21.9542 14.6482Z"
          fill="#282829"
        />
        <path
          id="right-eye"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M34.8365 12.0829C35.7437 11.9308 36.6208 12.6518 36.7951 13.6924C36.9694 14.7335 36.3748 15.7007 35.4675 15.8527C34.5597 16.0042 33.6832 15.2837 33.5089 14.2426C33.3346 13.202 33.9286 12.235 34.8365 12.0829Z"
          fill="#282829"
        />
      </g>
      <defs>
        <radialGradient
          id="paint0_radial_1632_36"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(25.3345 15.6175) scale(72.9321 72.9304)"
        >
          <stop stopColor="#FFE28E" />
          <stop offset="1" stopColor="#FAC07D" />
        </radialGradient>
        <linearGradient id="paint1_linear_1632_36" x1="28.748" y1="28.2153" x2="27.5656" y2="37.528" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EE7B78" />
          <stop offset="1" stopColor="#65221D" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default FaceSVG;
