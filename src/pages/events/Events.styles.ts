import styled from "styled-components";
import { motion } from "framer-motion";
import BGIcons from "../../assets/Images/events/eventsBg.jpg";

export const EventsStyles = styled(motion.section)`
  background: url(${BGIcons});
  background-position: top;
  background-attachment: fixed;
`;

export const EventsInnerStyles = styled.div`
  display: grid;

  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
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

export const EventsListItemInnerStyles = styled.div`
  background: ${(props) => props.theme.body};
  border-radius: 18px;
  h2 {
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

export const EventsListItemBodyStyles = styled(motion.div)`
  img {
    object-fit: cover;
    border-radius: 18px 18px 0 0;
  }
  h2 {
    text-align: center;
    margin: ${(props) => props.theme.size3} 0;
  }
`;

export const EventsListItemCalendarsStyles = styled.ul`
  display: grid;
  padding: ${(props) => props.theme.size3} ${(props) => props.theme.size4};
`;

export const EventsListItemCalendarStyles = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: ${(props) => props.theme.size2} ${(props) => props.theme.size3};
  svg {
    width: 55px;
    height: 55px;
    margin-right: ${(props) => props.theme.size5};
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    h3 {
      padding: ${(props) => props.theme.size1} ${(props) => props.theme.size3};
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
  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    margin-top: ${(props) => props.theme.size3};
  }
`;

export const EventCarouselInnerStyles = styled.div`
  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    position: fixed;
  }
`;

export const ActiveEventStyles = styled.span`
  color: ${(props) => props.theme.orange};
`;

export const NotActiveEventStyles = styled.span`
  color: ${(props) => props.theme.red};
`;
