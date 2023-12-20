import React, { ReactElement, useCallback, useState } from "react";
import type { FC } from "react";
import axios from "axios";
import { Grid } from "../../components/globalStyles/global.styles";
import Logo from "../../components/logo/Logo";
import { userService } from "../../services/api/user/user.service";
import { ISignUpData } from "../../interfaces/auth/auth.interface";
import useEffectOnce from "../../hooks/useEffectOnce";
import { IEvent } from "../../interfaces/event/event.interface";
import { eventService } from "../../services/api/events/events.service";
import { ValidationError } from "../../interfaces/error/Error.interface";

const Temp: FC = (): ReactElement => {
  const [userData, setUserData] = useState<ISignUpData | null>(null);
  const [events, setEvents] = useState<IEvent[]>([] as IEvent[]);
  const [loading, setLoading] = useState<boolean>(false);

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

  const checkUser = useCallback(async () => {
    try {
      const response = await userService.checkCurrentUser();
      setUserData(response.data.user);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffectOnce(() => {
    checkUser();
    getAllEvents();
  });
  return (
    <div style={{ height: "800px", width: "100vw" }}>
      <Grid>
        <Logo width="85px" height="125px" />
        <h1>Strona tymczasowo nieczynna</h1>
        <h3>{userData?.username}</h3>
        {events.map((event: IEvent) => (
          <h1 key={event._id}>{event.name}</h1>
        ))}
      </Grid>
    </div>
  );
};

export default Temp;
