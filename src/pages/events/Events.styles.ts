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

export const Inner = styled.div`
  display: grid;
  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    display: grid;
    grid-template-columns: 1fr 2fr;
    height: 100%;
    padding-bottom: 17%;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4px;
`;

export const Wrapper = styled.div`
  width: 100%;
`;

export const Loading = styled.div`
  margin: ${(props) => props.theme.size4} ${(props) => props.theme.size1};
  border: 1px solid ${(props) => props.theme.text};
  border-radius: ${(props) => props.theme.size1};
  padding: ${(props) => props.theme.size7};
`;

export const ListItem = styled.div`
  padding: ${(props) => props.theme.size3};
  margin: ${(props) => props.theme.size3} ${(props) => props.theme.size4};
  border-radius: 18px;
  box-shadow: 1px 3px 2px ${(props) => props.theme.secondaryColor};
  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    margin: ${(props) => props.theme.size4} 0;
  }
`;

export const ListItemHeader = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  padding: ${(props) => props.theme.size1};
  img {
    width: 80px;
    height: 80px;
  }
`;

export const ListItemInner = styled.div`
  background: ${(props) => props.theme.body};
  border-radius: 18px;
  h3 {
    padding: ${(props) => props.theme.size1};
  }

  h3 {
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

export const ListItemBody = styled(motion.div)`
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
    padding: ${(props) => props.theme.size1};
  }
`;

export const CalendarsStyles = styled.ul`
  padding: ${(props) => props.theme.size1} 0;
`;

export const CalendarStyles = styled.li`
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

export const ListItemFooter = styled.div`
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

export const CarouselStyles = styled.div`
  overflow: hidden;
  padding: ${(props) => props.theme.size1};
  img {
    border-radius: 18px;
  }
  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    margin-top: ${(props) => props.theme.size3};
  }
`;

export const CarouselInner = styled.div`
  ${CarouselContainer} {
    max-width: 800px;
  }
  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    position: fixed;
  }
`;

export const Active = styled.h3`
  b {
    color: ${(props) => props.theme.green};
    font-family: BlinkMacSystemFont;
  }
`;

export const NotActive = styled.h3`
  b {
    color: ${(props) => props.theme.red};
    font-family: BlinkMacSystemFont;
  }
`;
