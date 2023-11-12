import React, { ReactElement, useState, ChangeEvent, useRef } from "react";
import type { FC, FormEvent } from "react";
import { AxiosResponse } from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { eventService } from "../../../services/api/events/events.service";
import { IEvent } from "../../../interfaces/event/event.interface";
import { EventUtils } from "../../../utils/event-utils.service";
import { Utils } from "../../../utils/utils.service";
import { INotificationType } from "../../../interfaces/notification/notification.interface";
import { useAppDispatch } from "../../../redux-toolkit/hooks";
import Layout from "../../../components/layout/Layout";

import transition from "../../../utils/transition";
import { AiFillDelete } from "react-icons/ai";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import Select from "../../../components/select/Select";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Checkbox from "../../../components/checkbox/Checkbox";
import Spinner from "../../../components/spinner/Spinner";
import { Flex } from "../../../components/globalStyles/global.styles";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { name, eventType, price, discountPrice, startDate, endDate, address, energyland, image } = values;
  const { hotel, street, web } = address;

  const createEvent = async (e: FormEvent): Promise<IEvent | undefined> => {
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
      return response.data;
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

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const fileValue = await EventUtils.readAsBase64(file);
        setValues({ ...values, image: fileValue });
      } catch (error) {
        // Handle or log the error if necessary
        Utils.dispatchNotification("Error reading file:", INotificationType.ERROR, dispatch);
      }
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

  const deleteAttraction = (index: number, attractionType: string): void => {
    const attractionsArray = attractionType === "attractions" ? attractions : extraAttractions;
    const setAttractionsArray = attractionType === "attractions" ? setAttractions : setExtraAttractions;

    const updatedAttractions = [...attractionsArray];
    updatedAttractions.splice(index, 1);
    setAttractionsArray(updatedAttractions);
  };

  const handleCheckboxChange = (isChecked: boolean): void => {
    setValues({ ...values, energyland: isChecked });
  };

  return (
    <Layout>
      {hasError && errorMessage && <h4>{errorMessage}</h4>}
      <div style={{ marginTop: "20px" }}>
        <div style={{ marginTop: "20px" }}>
          {image && <img src={image} alt="event" style={{ width: "100px", height: "100px" }} />}
        </div>

        {hasError && errorMessage && <h4>{errorMessage}</h4>}
        <form>
          <Input
            name="image"
            type="file"
            ref={fileInputRef}
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }}
            handleChange={handleFileChange}
          />
          <Input
            id="name"
            name="name"
            type="text"
            value={name}
            labelText="Nazwa wyjazdu"
            placeholder="---"
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
            handleChange={handleChange}
          />
          <Input
            id="price"
            name="price"
            type="text"
            value={price}
            labelText="Cena"
            placeholder="---"
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
            handleChange={handleChange}
          />
          <Input
            id="discountPrice"
            name="discountPrice"
            type="text"
            value={discountPrice}
            labelText="Cena KRUS"
            placeholder="---"
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
            handleChange={handleChange}
          />
          <Input
            id="startDate"
            name="startDate"
            type="date"
            value={startDate.toString()}
            labelText="Data rozpoczęcia"
            placeholder="---"
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
            handleChange={handleChange}
          />
          <Input
            id="endDate"
            name="endDate"
            type="date"
            value={endDate.toString()}
            labelText="Data zakonczenia"
            placeholder="---"
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
            handleChange={handleChange}
          />

          <h3>Dane Hotelu</h3>
          <Input
            id="hotel"
            name="hotel"
            type="text"
            value={hotel}
            labelText="Nazwa Hotelu"
            placeholder="---"
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
            handleChange={handleChange}
          />
          <Input
            id="street"
            name="street"
            type="text"
            value={street}
            labelText="Ulica Hotelu"
            placeholder="---"
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
            handleChange={handleChange}
          />
          <Input
            id="web"
            name="web"
            type="text"
            value={web}
            labelText="Strona www Hotelu"
            placeholder="---"
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
            handleChange={handleChange}
          />

          <div className="event__form--checkbox">
            <Checkbox label="Energylandia" onChange={handleCheckboxChange} />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
            <Input
              id="attraction"
              name="attraction"
              type="text"
              value={attractionValue}
              labelText="Atrakcje"
              placeholder="---"
              style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
              handleChange={(e) => setAttractionValue(e.target.value)}
            />

            <BsFillBookmarkPlusFill
              style={{ fill: "green", marginLeft: "30px" }}
              onClick={() => handleAttraction("attractions")}
            />
          </div>
          {attractions.length > 0 && (
            <div className="create__event--attractions">
              <h6>Max 8 atrakcjii</h6>
              <ul style={{ width: "100%" }}>
                {attractions.map((attr, i) => (
                  <li key={i} style={{ display: "flex", width: "100%" }}>
                    <h4>{attr}</h4>
                    <AiFillDelete style={{ fill: "red" }} onClick={() => deleteAttraction(i, "attractions")} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
            <Input
              id="extraAttraction"
              name="extraAttraction"
              type="text"
              value={extraAttractionValue}
              labelText="Dodatekowe atrakcje"
              placeholder="---"
              style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
              handleChange={(e) => setExtraAttractionValue(e.target.value)}
            />

            <BsFillBookmarkPlusFill
              style={{ fill: "green", marginLeft: "30px" }}
              onClick={() => handleAttraction("extraAttraction")}
            />
          </div>
          {extraAttractions.length > 0 && (
            <div className="create__event--attractions">
              <h6>Max 8 atrakcjii</h6>
              <ul style={{ width: "100%" }}>
                {extraAttractions.map((attr, i) => (
                  <li key={i} style={{ display: "flex", width: "100%" }}>
                    <h4>{attr}</h4>
                    <AiFillDelete style={{ fill: "red" }} onClick={() => deleteAttraction(i, "extraAttraction")} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div style={{ margin: "20px 0" }}>
            <Select
              label="Kategoria"
              options={["Góry", "Spływy", "Morze", "Półkolonie"]}
              onSelect={(option: string) => setValues({ ...values, eventType: option })}
            />
          </div>
          <div style={{ margin: "40px 0px" }}>
            <Button
              className="auth-button button"
              disabled={!name || !eventType || !price || !startDate || !endDate}
              onClick={createEvent}
            >
              {loading ? (
                <Flex $align="center" $justify="space-between">
                  <Spinner size={20} />
                  Wysyłanie...{" "}
                </Flex>
              ) : (
                "Utwórz"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default transition(CreateEvent);
