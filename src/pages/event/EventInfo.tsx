import React, { ReactElement } from "react";
import type { FC } from "react";
import propTypes from "prop-types";
import { ButtonColor } from "../../components/button/Button.interface";
import { Flex, Grid } from "../../components/globalStyles/global.styles";
import { EventRightElementStyles, PriceStyles } from "./Event.styles";
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
          <EventRightElementStyles>
            <Flex $align="center" $justify="flex-start">
              <Calendar color="#03C988" />
              <Flex $align="flex-start" $justify="flex-start" $direction="column">
                <h4>
                  <b>Zaczynamy</b>
                </h4>
                <h4>{TimeAgo.dayMonthYear(event.startDate as Date)}</h4>
              </Flex>
            </Flex>
          </EventRightElementStyles>
          <EventRightElementStyles>
            <Flex $align="center" $justify="flex-start">
              <Calendar color="#F05454" />
              <Flex $align="flex-start" $justify="flex-start" $direction="column">
                <h4>
                  <b>Kończymy</b>
                </h4>
                <h4>{TimeAgo.dayMonthYear(event.endDate as Date)}</h4>
              </Flex>
            </Flex>
          </EventRightElementStyles>
        </Grid>
        <Logo width="65px" height="85px" />
      </Flex>
      <EventRightElementStyles>
        <Flex $align="center" $justify="center">
          <PriceStyles>
            <b>{checked === "price" ? event.price : event.discountPrice} PLN</b>
          </PriceStyles>
        </Flex>
      </EventRightElementStyles>
      <EventRightElementStyles>
        <Grid>
          <h4>
            hotel: <b>{event?.address?.hotel}</b>
          </h4>
        </Grid>
      </EventRightElementStyles>
      {showBtn && (
        <EventRightElementStyles>
          <Grid>
            <Button color={ButtonColor.auth} onClick={openModalClient}>
              Zapisz się
            </Button>
          </Grid>
        </EventRightElementStyles>
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
