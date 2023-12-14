import React, { useState, useCallback, ReactElement } from "react";
import type { FC, FormEvent } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { EventType, IEvent } from "../../../interfaces/event/event.interface";
import { useAppDispatch } from "../../../redux-toolkit/hooks";
import { Dispatch } from "@reduxjs/toolkit";
import useEffectOnce from "../../../hooks/useEffectOnce";
import { Utils } from "../../../utils/utils.service";
import { INotificationType } from "../../../interfaces/notification/notification.interface";
import { eventService } from "../../../services/api/events/events.service";
import Layout from "../../../components/layout/Layout";
import transition from "../../../utils/transition";
import EventForm from "../../../components/form/event/Event.form";
import { Container } from "../../../components/globalStyles/global.styles";
import { ValidationError } from "../../../interfaces/error/Error.interface";

const initialState: IEvent = {
  name: "zakopane",
  eventType: EventType.mountains,
  price: "1400",
  discountPrice: "900",
  startDate: new Date(),
  endDate: new Date(),
  image: "",
  address: {
    hotel: "galicowka",
    street: "male ciche",
    web: "www.wp.pl"
  },
  energyland: false,
  attractions: [],
  extraAttractions: [],
  status: ""
};

const EditEvent: FC = (): ReactElement => {
  const [values, setValues] = useState<IEvent>(initialState);
  const [event, setEvent] = useState<IEvent>({} as IEvent);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [attractions, setAttractions] = useState<string[]>([]);
  const [attractionValue, setAttractionValue] = useState<string>("");
  const [extraAttractions, setExtraAttractions] = useState<string[]>([]);
  const [extraAttractionValue, setExtraAttractionValue] = useState<string>("");
  const dispatch: Dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { eventId } = useParams();

  const getEvent = useCallback(async () => {
    try {
      const response = await eventService.getEvent(eventId as string);
      setEvent(response.data.event);
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error) && error.response) {
        setLoading(false);
        setHasError(true);
        setErrorMessage(error?.response?.data.message as string);
        Utils.dispatchNotification(errorMessage, INotificationType.ERROR, dispatch);
      } else {
        console.error(error);
      }
    }
  }, [eventId, dispatch, errorMessage]);

  const updateEvent = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    values.attractions = attractions;
    values.extraAttractions = extraAttractions;
    try {
      const response = await eventService.updateEvent(eventId as string, values);
      setLoading(false);
      setHasError(false);
      setValues(initialState);
      setAttractions([]);
      setExtraAttractions([]);
      Utils.dispatchNotification(response?.data?.message as string, INotificationType.SUCCESS, dispatch);
      navigate("/admin/events/list");
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error) && error.response) {
        setLoading(false);
        setHasError(true);
        setErrorMessage(error?.response?.data.message as string);
        Utils.dispatchNotification(errorMessage, INotificationType.ERROR, dispatch);
      } else {
        console.error(error);
      }
    }
  };

  useEffectOnce(() => {
    getEvent();
  });

  return (
    <Layout>
      <Container $small>
        {event.name}
        {hasError && errorMessage && <h4>{errorMessage}</h4>}
        <EventForm
          values={values}
          dispatch={dispatch}
          setValues={setValues}
          eventAction={updateEvent}
          attractions={attractions}
          setAttractions={setAttractions}
          extraAttractions={extraAttractions}
          setExtraAttractions={setExtraAttractions}
          attractionValue={attractionValue}
          setAttractionValue={setAttractionValue}
          extraAttractionValue={extraAttractionValue}
          setExtraAttractionValue={setExtraAttractionValue}
          loading={loading}
          hasError={hasError}
          event={event}
        />
      </Container>
    </Layout>
  );
};

export default transition(EditEvent);
