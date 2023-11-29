import styled from "styled-components";
import { motion } from "framer-motion";
import EventBG from "../../assets/Images/events/eventsBG.png";
import { CarouselContainer } from "../../components/carousel/Carousel.styles";

export const EventsStyles = styled(motion.section)`
  background: url(${EventBG});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: bottom right;
`;

export const EventsInnerStyles = styled.div`
  display: grid;
  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    display: grid;
    grid-template-columns: 1fr 2fr;
    height: 100%;
    padding-bottom: 17%;
  }
`;

export const EventsListStyles = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EventsListWrapperStyles = styled.div`
  width: 100%;
`;

export const EventsListItemStyles = styled.div`
  padding: ${(props) => props.theme.size3};
  margin: ${(props) => props.theme.size3} ${(props) => props.theme.size4};
  border-radius: 18px;
  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    margin: ${(props) => props.theme.size4} 0;
  }
`;

export const EventListItemHeaderStyles = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-width: 200px;
`;

export const EventsListItemInnerStyles = styled.div`
  background: ${(props) => props.theme.body};
  border-radius: 18px;
  h2 {
    padding: ${(props) => props.theme.size1};
  }

  h3 {
    font-family: Oswald;
    span {
      letter-spacing: 5px;
      font-weight: 700;
      font-size: ${(props) => props.theme.size5};
      @media (min-width: ${(props) => props.theme.breakpoint_small}) {
        margin: ${(props) => props.theme.size7};
      }
    }
  }
`;

export const EventsListItemBodyStyles = styled(motion.div)`
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 18px 18px 0 0;
    @media (min-width: ${(props) => props.theme.breakpoint_small}) {
      height: 300px;
    }
  }

  h2 {
    text-align: center;
    margin: ${(props) => props.theme.size1} 0;
  }
`;

export const EventsListItemCalendarsStyles = styled.ul`
  padding: ${(props) => props.theme.size1} 0;
`;

export const EventsListItemCalendarStyles = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: ${(props) => props.theme.size1};
  svg {
    width: 55px;
    height: 55px;
    margin-right: ${(props) => props.theme.size1};
    @media (min-width: ${(props) => props.theme.breakpoint_small}) {
      margin-right: ${(props) => props.theme.size5};
    }
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    h3 {
      padding: ${(props) => props.theme.size1};
    }
  }
`;

export const EventsListItemFooterStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.size5} 0;
  img {
    width: 100px;
    height: 100px;
  }
  a {
    color: ${(props) => props.theme.text};
    font-size: ${(props) => props.theme.size5};
    letter-spacing: 0.05em;
    margin-left: ${(props) => props.theme.size5};
  }
`;

export const EventsCarouselStyles = styled.div`
  overflow: hidden;
  padding: ${(props) => props.theme.size1};
  img {
    border-radius: 18px;
  }
  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    margin-top: ${(props) => props.theme.size3};
  }
`;

export const EventCarouselInnerStyles = styled.div`
  ${CarouselContainer} {
    max-width: 800px;
  }
  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    position: fixed;
  }
`;

export const ActiveEventStyles = styled.h3`
  b {
    color: ${(props) => props.theme.green};
  }
`;

export const NotActiveEventStyles = styled.h3`
  b {
    color: ${(props) => props.theme.red};
  }
`;
