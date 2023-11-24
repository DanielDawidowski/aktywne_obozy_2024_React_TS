import React, { useState, useEffect, useCallback, ReactElement } from "react";
import type { FC } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Carousel from "../../components/carousel/Carousel";
import { EventUtils } from "../../utils/event-utils.service";
import Calendar from "../../assets/SVG/calendar";
import { IEvent } from "../../interfaces/event/event.interface";
import { eventService } from "../../services/api/events/events.service";
import Layout from "../../components/layout/Layout";
import { timeAgo } from "../../utils/timeago.utils";
import { Container, Grid } from "../../components/globalStyles/global.styles";
import transition from "../../utils/transition";
import { AxiosResponse } from "axios";
import {
  ActiveEventStyles,
  EventCarouselInnerStyles,
  EventsCarouselStyles,
  EventsInnerStyles,
  EventsListItemBodyStyles,
  EventsListItemCalendarStyles,
  EventsListItemCalendarsStyles,
  EventsListItemFooterStyles,
  EventsListItemInnerStyles,
  EventsListItemStyles,
  EventsListStyles,
  EventsListWrapperStyles,
  EventsStyles,
  NotActiveEventStyles
} from "./Events.styles";

const Events: FC = (): ReactElement => {
  const [events, setEvents] = useState<IEvent[]>([] as IEvent[]);
  const [currentPage] = useState<number>(1);
  const [toggle, setToggle] = useState<string | null>();

  const getAllEvents = useCallback(async () => {
    try {
      const response: AxiosResponse = await eventService.getAllEvents(currentPage);
      setEvents(response.data.events);
      // console.log("response", response.data.events);
    } catch (error) {
      console.log("error", error);
    }
  }, [currentPage]);

  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  const handleToggle = (name: string | null): void => {
    setToggle(toggle !== name ? name : null);
  };

  return (
    <Layout>
      <EventsStyles
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
        exit={{ opacity: 0, x: 10, transition: { duration: 0.5 } }}
      >
        <Container>
          <EventsInnerStyles>
            <EventsListStyles>
              <EventsListWrapperStyles>
                {events.map((event: IEvent) => (
                  <EventsListItemStyles
                    key={event._id}
                    style={{ background: EventUtils.showEventColor(event.eventType) }}
                  >
                    <EventsListItemInnerStyles>
                      {toggle !== event.name && (
                        <motion.div onClick={() => handleToggle(event.name)} className="events__list--item--header">
                          <img src={EventUtils.emitEventIcon(event.eventType)} alt={event.name} />
                          <Grid>
                            <h2>{event.name}</h2>
                            <h3>
                              {event.status === "active" ? (
                                <ActiveEventStyles>Aktualne</ActiveEventStyles>
                              ) : (
                                <NotActiveEventStyles>Nieaktualne</NotActiveEventStyles>
                              )}
                            </h3>
                          </Grid>
                        </motion.div>
                      )}
                      {toggle === event.name && (
                        <EventsListItemBodyStyles
                          initial={{ opacity: 0, height: "0%" }}
                          animate={{ opacity: 1, height: "100%", transition: { duration: 1.5 } }}
                          exit={{ opacity: 0, height: "0%", transition: { duration: 1.5 } }}
                        >
                          <img src={event.image} alt={event.name} onClick={() => handleToggle(event.name)} />

                          <h2 onClick={() => handleToggle(event.name)}>{event.name}</h2>
                          <EventsListItemCalendarsStyles>
                            <EventsListItemCalendarStyles>
                              <Calendar color="#5cb85c" />
                              <div>
                                <h3 style={{ color: "green" }}>Zaczynamy</h3>
                                <h3>{timeAgo.dayMonthYear(event.startDate)}</h3>
                              </div>
                            </EventsListItemCalendarStyles>
                            <EventsListItemCalendarStyles>
                              <Calendar color="#f94144" />
                              <div>
                                <h3 style={{ color: "red" }}>Kończymy</h3>
                                <h3>{timeAgo.dayMonthYear(event.endDate)}</h3>
                              </div>
                            </EventsListItemCalendarStyles>
                          </EventsListItemCalendarsStyles>
                        </EventsListItemBodyStyles>
                      )}
                    </EventsListItemInnerStyles>
                    {toggle === event.name && (
                      <EventsListItemFooterStyles>
                        <img src={EventUtils.emitEventIcon(event.eventType)} alt={event.name} />
                        <Link to={`/event/${event._id}`}>Zobacz</Link>
                      </EventsListItemFooterStyles>
                    )}
                  </EventsListItemStyles>
                ))}
              </EventsListWrapperStyles>
            </EventsListStyles>
            <EventsCarouselStyles>
              <EventCarouselInnerStyles>
                <Carousel />
              </EventCarouselInnerStyles>
            </EventsCarouselStyles>
          </EventsInnerStyles>
        </Container>
      </EventsStyles>
    </Layout>
  );
};

export default transition(Events);
