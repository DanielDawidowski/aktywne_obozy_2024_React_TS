import React, { ReactElement, useState, ChangeEvent } from "react";
import type { FC, FormEvent } from "react";
import { AxiosResponse } from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { eventService } from "../../../services/api/events/events.service";
import { IEvent } from "../../../interfaces/event/event.interface";
import { Utils } from "../../../utils/utils.service";
import { INotificationType } from "../../../interfaces/notification/notification.interface";
import { useAppDispatch } from "../../../redux-toolkit/hooks";
import Layout from "../../../components/layout/Layout";
import transition from "../../../utils/transition";
import EventForm from "../../../components/form/EventForm";

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
      const response: AxiosResponse<IEvent> = await eventService.createEvent(values);
      setLoading(false);
      setHasError(false);
      setValues(initialState);
      setAttractions([]);
      setExtraAttractions([]);
      setValues(initialState);
      Utils.dispatchNotification(response?.data?.message as string, INotificationType.SUCCESS, dispatch);
    } catch (error: any) {
      setLoading(false);
      setHasError(true);
      setErrorMessage(error?.response?.data.message);
      Utils.dispatchNotification(error?.response?.data.message, INotificationType.ERROR, dispatch);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    setValues({ ...values, [e.target.name]: e.target.value });
    if (e.target.name === "hotel" || e.target.name === "street" || e.target.name === "web") {
      setValues({ ...values, address: { ...values.address, [e.target.name]: e.target.value } });
    }
  };

  const handleAttraction = (attractionType: string): void => {
    const currentValue = attractionType === "attractions" ? attractionValue : extraAttractionValue;
    const setter = attractionType === "attractions" ? setAttractions : setExtraAttractions;

    if (currentValue.trim() !== "") {
      setter((prevAttractions) => [...prevAttractions, currentValue]);
      attractionType === "attractions" ? setAttractionValue("") : setExtraAttractionValue("");
    }
  };

  return (
    <Layout>
      {hasError && errorMessage && <h4>{errorMessage}</h4>}

      <EventForm
        values={values}
        dispatch={dispatch}
        setValues={setValues}
        handleChange={handleChange}
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
    </Layout>
  );
};

export default transition(CreateEvent);
