import Home1 from "../assets/Images/home/filip-mroz-zK049OFP4uI-unsplash 4.jpg";
import Home2 from "../assets/Images/home/sporty_zimowe.jpg";
import Home3 from "../assets/Images/home/tatry.jpg";
import Home1Big from "../assets/Images/home/filip-mroz-zK049OFP4uI-unsplash 4-big.jpg";
import Home2Big from "../assets/Images/home/sporty_zimowe-big.jpg";
import Home3Big from "../assets/Images/home/tatry-big.jpg";
import { ICarousel } from "../components/carousel/Carousel.interface";

export const homeSlides: ICarousel[] = [
  {
    id: 0,
    title: "Organizujemy kolonie nad morzem",
    image: Home1
  },
  {
    id: 1,
    title: "Organizujemy zimowe wyjazdy w góry",
    image: Home2
  },
  {
    id: 2,
    title: "Organizujemy letnie wyjazdy w góry",
    image: Home3
  }
];

export const homeSlidesBig: ICarousel[] = [
  {
    id: 0,
    title: "Organizujemy kolonie nad morzem",
    image: Home1Big
  },
  {
    id: 1,
    title: "Organizujemy zimowe wyjazdy w góry",
    image: Home2Big
  },
  {
    id: 2,
    title: "Organizujemy letnie wyjazdy w góry",
    image: Home3Big
  }
];
