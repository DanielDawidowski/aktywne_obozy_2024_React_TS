import React, { ReactElement } from "react";
import type { FC } from "react";
import propTypes from "prop-types";
import { ButtonColor } from "../../components/button/Button.interface";
import { Flex, Grid } from "../../components/globalStyles/global.styles";
import { EventRightElement, Price } from "./Event.styles";
import Calendar from "../../assets/SVG/calendar";
import { TimeAgo } from "../../utils/timeago.utils";
import Logo from "../../components/logo/Logo";
import Button from "../../components/button/Button";
import { IEvent } from "../../interfaces/event/event.interface";

interface EventInfoProps {
  event: IEvent;
  openModalClient: () => void;
  showBtn?: boolean;
  checked?: string;
}

const EventInfo: FC<EventInfoProps> = (props): ReactElement => {
  const { event, openModalClient, showBtn = false, checked } = props;
  return (
    <>
      <Grid>
        <h3>
          <b>{event.name}</b>
        </h3>
      </Grid>
      <Flex $align="center" $justify="space-around">
        <Grid>
          <EventRightElement>
            <Flex $align="center" $justify="flex-start">
              <Calendar color="#03C988" />
              <Flex $align="flex-start" $justify="flex-start" $direction="column">
                <h4>
                  <b>Zaczynamy</b>
                </h4>
                <h4>{TimeAgo.dayMonthYear(event.startDate as Date)}</h4>
              </Flex>
            </Flex>
          </EventRightElement>
          <EventRightElement>
            <Flex $align="center" $justify="flex-start">
              <Calendar color="#F05454" />
              <Flex $align="flex-start" $justify="flex-start" $direction="column">
                <h4>
                  <b>Kończymy</b>
                </h4>
                <h4>{TimeAgo.dayMonthYear(event.endDate as Date)}</h4>
              </Flex>
            </Flex>
          </EventRightElement>
        </Grid>
        <Logo width="65px" height="85px" />
      </Flex>
      <EventRightElement>
        <Flex $align="center" $justify="center">
          <Price>
            <b>{checked === "price" ? event.price : event.discountPrice} PLN</b>
          </Price>
        </Flex>
      </EventRightElement>
      <EventRightElement>
        <Grid>
          <h4>
            hotel: <b>{event?.address?.hotel}</b>
          </h4>
        </Grid>
      </EventRightElement>
      {showBtn && (
        <EventRightElement>
          <Grid>
            <Button color={ButtonColor.auth} onClick={openModalClient}>
              Zapisz się
            </Button>
          </Grid>
        </EventRightElement>
      )}
    </>
  );
};

EventInfo.propTypes = {
  openModalClient: propTypes.func.isRequired,
  showBtn: propTypes.bool,
  checked: propTypes.string
};

export default EventInfo;
