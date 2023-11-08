import React, { ReactElement, useRef, useState, ChangeEvent } from "react";
import type { FC, FormEvent } from "react";
import { AxiosResponse } from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { AiFillDelete } from "react-icons/ai";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import { eventService } from "../../../services/api/events/events.service";
import { IEvent } from "../../../interfaces/event/event.interface";
import { EventUtils } from "../../../utils/event-utils.service";
import { Utils } from "../../../utils/utils.service";
import { INotificationType } from "../../../interfaces/notification/notification.interface";

const initialState: IEvent = {
  name: "",
  eventType: "",
  price: "",
  discountPrice: "",
  startDate: "",
  endDate: "",
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
  const [attraction, setAttraction] = useState<string[]>([]);
  const [attractionValue, setAttractionValue] = useState<string>("");
  const [extraAttraction, setExtraAttraction] = useState<string[]>([]);
  const [extraAttractionValue, setExtraAttractionValue] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch: Dispatch = useDispatch();

  const { name, eventType, price, discountPrice, startDate, endDate, image, address, energyland = false } = values;
  const { hotel, street, web } = address;

  const createEvent = async (e: FormEvent): Promise<IEvent | undefined> => {
    e.preventDefault();
    values.attractions = attraction;
    values.extraAttractions = extraAttraction;
    try {
      const response: AxiosResponse<IEvent> =
        image === "" ? await eventService.createEvent(values) : await eventService.createEventWithImage(values);
      setLoading(false);
      setHasError(false);
      setValues(initialState);
      setAttraction([]);
      setExtraAttraction([]);
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
    // console.log(e.target.name, " ---- ", e.target.value);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const fileValue = await EventUtils.readAsBase64(file);
        setValues({ ...values, image: fileValue });
      } catch (error) {
        // Handle or log the error if necessary
        console.error("Error reading file as base64:", error);
      }
    }
  };

  const handleAttraction = (): void => {
    if (attractionValue.trim() !== "") {
      setAttraction([...attraction, attractionValue]);
      setAttractionValue("");
    }
  };

  const deleteAttraction = (index: number): void => {
    const updatedAttractions = [...attraction];
    updatedAttractions.splice(index, 1);
    setAttraction(updatedAttractions);
  };

  const handleExtraAttraction = (): void => {
    if (extraAttractionValue.trim() !== "") {
      setExtraAttraction([...extraAttraction, extraAttractionValue]);
      setExtraAttractionValue("");
    }
  };

  const deleteExtraAttraction = (index: number): void => {
    const updatedExtraAttractions = [...extraAttraction];
    updatedExtraAttractions.splice(index, 1);
    setExtraAttraction(updatedExtraAttractions);
  };

  return (
    <>
      {hasError && errorMessage && <h4>{errorMessage}</h4>}
      <form>
        <Input
          name="image"
          type="file"
          className="file-input"
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
          value={startDate}
          labelText="Data rozpoczęcia"
          placeholder="---"
          style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          handleChange={handleChange}
        />
        <Input
          id="endDate"
          name="endDate"
          type="date"
          value={endDate}
          labelText="Data zakonczenia"
          placeholder="---"
          style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          handleChange={handleChange}
        />
        <h5>Dane Hotelu</h5>
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
          <Input
            id="energyland"
            name="energyland"
            type="checkbox"
            value={energyland ? "true" : "false"}
            labelText="Energylandia"
            placeholder="---"
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
            handleChange={handleChange}
            checked={false}
          />
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
            handleChange={(e: ChangeEvent<HTMLInputElement>) => setAttractionValue(e.target.value)}
          />

          <BsFillBookmarkPlusFill style={{ fill: "green", marginLeft: "30px" }} onClick={handleAttraction} />
        </div>
        {attraction.length > 0 && (
          <div className="create__event--attractions">
            <h6>Max 8 atrakcjii</h6>
            <ul style={{ width: "100%" }}>
              {attraction.map((attr, i) => (
                <li key={i} style={{ display: "flex", width: "100%" }}>
                  <h4>{attr}</h4>
                  <AiFillDelete style={{ fill: "red" }} onClick={() => deleteAttraction(i)} />
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
            handleChange={(e: ChangeEvent<HTMLInputElement>) => setExtraAttractionValue(e.target.value)}
          />

          <BsFillBookmarkPlusFill style={{ fill: "green", marginLeft: "30px" }} onClick={handleExtraAttraction} />
        </div>
        {extraAttraction.length > 0 && (
          <div className="create__event--attractions">
            <h6>Max 8 atrakcjii</h6>
            <ul style={{ width: "100%" }}>
              {extraAttraction.map((attr, i) => (
                <li key={i} style={{ display: "flex", width: "100%" }}>
                  <h4>{attr}</h4>
                  <AiFillDelete style={{ fill: "red" }} onClick={() => deleteExtraAttraction(i)} />
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ margin: "20px 0" }}>
          <label>Kategoria</label>
          <select
            name="eventType"
            className="form-control"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChange(e)}
            defaultValue={eventType}
            required
          >
            <option defaultChecked value="">
              Wybierz
            </option>
            <option value="Góry">Góry</option>
            <option value="Spływy">Spływy</option>
            <option value="Morze">Morze</option>
            <option value="Półkolonie">Półkolonie</option>
          </select>
        </div>
        <div style={{ margin: "20px 0" }}>
          <Button
            className="auth-button button"
            disabled={!name || !eventType || !price || !startDate || !endDate}
            onClick={createEvent}
          >
            {loading ? "Wysyłanie..." : "Utwórz"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateEvent;
