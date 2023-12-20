import React, { useState, useEffect, useCallback, ReactElement } from "react";
import type { FC } from "react";
import { Link } from "react-router-dom";
import Carousel from "../../components/carousel/Carousel";
import { EventUtils } from "../../utils/event-utils.service";
import Calendar from "../../assets/SVG/calendar";
import { IEvent } from "../../interfaces/event/event.interface";
import { eventService } from "../../services/api/events/events.service";
import Layout from "../../components/layout/Layout";
import { Container, Grid } from "../../components/globalStyles/global.styles";
import transition from "../../utils/transition";
import axios from "axios";
import {
  ActiveEventStyles,
  EventCarouselInnerStyles,
  EventListItemHeaderStyles,
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
import { TimeAgo } from "../../utils/timeago.utils";
import { Utils } from "../../utils/utils.service";
import { ValidationError } from "../../interfaces/error/Error.interface";
import Spinner from "../../components/spinner/Spinner";

const Events: FC = (): ReactElement => {
  const [events, setEvents] = useState<IEvent[]>([] as IEvent[]);
  const [loading, setLoading] = useState<boolean>(false);
  const [toggle, setToggle] = useState<string | null>();

  const getAllEvents = useCallback(async () => {
    try {
      const response = await eventService.getAllEvents();
      setEvents(response.data.events);
      // console.log("response", response.data.events);
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error) && error.response) {
        setLoading(false);
      } else {
        console.error(error);
      }
    }
  }, []);

  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  const handleToggle = (index: string): void => {
    if (toggle === index) {
      setToggle("");
    } else {
      setToggle(index);
      setTimeout(() => {
        Utils.scrollToElement(index, 200);
      }, 500);
    }
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
                {loading ? (
                  <Spinner />
                ) : (
                  events.map((event: IEvent) => (
                    <EventsListItemStyles key={event._id} style={{ background: EventUtils.showEventColor(event.eventType) }}>
                      <EventsListItemInnerStyles>
                        {toggle !== event.name && (
                          <EventListItemHeaderStyles onClick={() => handleToggle(event.name)}>
                            <img src={EventUtils.emitEventIcon(event.eventType)} alt={event.name} />
                            <Grid>
                              <h2>{event.name}</h2>
                              {event.status === "active" ? (
                                <ActiveEventStyles>
                                  <b>Aktualne</b>
                                </ActiveEventStyles>
                              ) : (
                                <NotActiveEventStyles>
                                  <b>Nieaktualne</b>
                                </NotActiveEventStyles>
                              )}
                            </Grid>
                          </EventListItemHeaderStyles>
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
                              <Grid>
                                <EventsListItemCalendarStyles>
                                  <Calendar color="#5cb85c" />
                                  <div>
                                    <h3 style={{ color: "green" }}>Zaczynamy</h3>
                                    <h3>{TimeAgo.dayMonthYear(event.startDate as Date)}</h3>
                                  </div>
                                </EventsListItemCalendarStyles>
                                <EventsListItemCalendarStyles>
                                  <Calendar color="#f94144" />
                                  <div>
                                    <h3 style={{ color: "red" }}>Kończymy</h3>
                                    <h3>{TimeAgo.dayMonthYear(event.endDate as Date)}</h3>
                                  </div>
                                </EventsListItemCalendarStyles>
                              </Grid>
                            </EventsListItemCalendarsStyles>
                          </EventsListItemBodyStyles>
                        )}
                      </EventsListItemInnerStyles>
                      {toggle === event.name && (
                        <EventsListItemFooterStyles>
                          <img src={EventUtils.emitEventIcon(event.eventType)} alt={event.name} />
                          {event.status === "active" ? (
                            <Link to={`/event/${event._id}`}>Zobacz</Link>
                          ) : (
                            <NotActiveEventStyles>
                              <b>Nieaktualne</b>
                            </NotActiveEventStyles>
                          )}
                        </EventsListItemFooterStyles>
                      )}
                    </EventsListItemStyles>
                  ))
                )}
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
