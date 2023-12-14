import React, { ReactElement, useState } from "react";
import type { FC, FormEvent } from "react";
import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { eventService } from "../../../services/api/events/events.service";
import { EventType, IEvent } from "../../../interfaces/event/event.interface";
import { Utils } from "../../../utils/utils.service";
import { INotificationType } from "../../../interfaces/notification/notification.interface";
import { useAppDispatch } from "../../../redux-toolkit/hooks";
import Layout from "../../../components/layout/Layout";
import transition from "../../../utils/transition";
import EventForm from "../../../components/form/event/Event.form";
import { Container } from "../../../components/globalStyles/global.styles";
import { ValidationError } from "../../../interfaces/error/Error.interface";

const initialState: IEvent = {
  name: "",
  eventType: EventType.mountains,
  price: "",
  discountPrice: "",
  startDate: new Date(),
  endDate: new Date(),
  image: "",
  address: {
    hotel: "",
    street: "",
    web: ""
  },
  energyland: false,
  attractions: [],
  extraAttractions: []
};

const CreateEvent: FC = (): ReactElement => {
  const [values, setValues] = useState<IEvent>(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [attractions, setAttractions] = useState<string[]>([]);
  const [attractionValue, setAttractionValue] = useState<string>("");
  const [extraAttractions, setExtraAttractions] = useState<string[]>([]);
  const [extraAttractionValue, setExtraAttractionValue] = useState<string>("");
  const dispatch: Dispatch = useAppDispatch();

  const createEvent = async (e: FormEvent): Promise<void | undefined> => {
    e.preventDefault();
    setLoading(true);
    values.attractions = attractions;
    values.extraAttractions = extraAttractions;
    try {
      const response = await eventService.createEvent(values);
      setLoading(false);
      setHasError(false);
      setAttractions([]);
      setExtraAttractions([]);
      setValues(initialState);
      Utils.dispatchNotification(response?.data?.message as string, INotificationType.SUCCESS, dispatch);
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

  return (
    <Layout>
      <Container $small>
        {hasError && errorMessage && <h4>{errorMessage}</h4>}

        <EventForm
          values={values}
          dispatch={dispatch}
          setValues={setValues}
          eventAction={createEvent}
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
        />
      </Container>
    </Layout>
  );
};

export default transition(CreateEvent);
