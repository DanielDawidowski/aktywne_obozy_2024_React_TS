import React, { useState, useCallback, ReactElement } from "react";
import type { ChangeEvent, FC, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IEvent } from "../../../interfaces/event/event.interface";
import { useAppDispatch } from "../../../redux-toolkit/hooks";
import { Dispatch } from "@reduxjs/toolkit";
import useEffectOnce from "../../../hooks/useEffectOnce";
import { Utils } from "../../../utils/utils.service";
import { INotificationType } from "../../../interfaces/notification/notification.interface";
import { eventService } from "../../../services/api/events/events.service";
import { AxiosResponse } from "axios";
import Layout from "../../../components/layout/Layout";
import transition from "../../../utils/transition";

import EventForm from "../../../components/form/EventForm";
import { EventUtils } from "../../../utils/event-utils.service";

const initialState: IEvent = {
  name: "zakopane",
  eventType: "",
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
      console.log("error", error);
    }
  }, [eventId]);

  const updateEvent = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    values.attractions = attractions;
    values.extraAttractions = extraAttractions;
    try {
      const response: AxiosResponse<IEvent> = await eventService.updateEvent(eventId as string, values);
      setLoading(false);
      setHasError(false);
      setValues(initialState);
      setAttractions([]);
      setExtraAttractions([]);
      Utils.dispatchNotification(response?.data?.message as string, INotificationType.SUCCESS, dispatch);
      navigate("/admin/events/list");
    } catch (error: any) {
      setLoading(false);
      setHasError(true);
      setErrorMessage(error?.response?.data.message);
      Utils.dispatchNotification(error?.response?.data.message, INotificationType.ERROR, dispatch);
    }
  };

  useEffectOnce(() => {
    getEvent();
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    setValues({ ...values, [e.target.name]: e.target.value });
    if (e.target.name === "hotel" || e.target.name === "street" || e.target.name === "web") {
      setValues({ ...values, address: { ...values.address, [e.target.name]: e.target.value } });
    }
  };

  return (
    <Layout>
      {event.name}
      {hasError && errorMessage && <h4>{errorMessage}</h4>}
      <EventForm
        values={values}
        dispatch={dispatch}
        setValues={setValues}
        handleChange={handleChange}
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
    </Layout>
  );
};

export default transition(EditEvent);
