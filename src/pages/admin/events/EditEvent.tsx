import React, { useState, useCallback, useRef, ReactElement } from "react";
import type { ChangeEvent, FC, FormEvent } from "react";
import { NavigateProps, useNavigate, useParams } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import { IEvent } from "../../../interfaces/event/event.interface";
import { useAppDispatch } from "../../../redux-toolkit/hooks";
import { Dispatch } from "@reduxjs/toolkit";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import { EventUtils } from "../../../utils/event-utils.service";
import useEffectOnce from "../../../hooks/useEffectOnce";
import { Utils } from "../../../utils/utils.service";
import { INotificationType } from "../../../interfaces/notification/notification.interface";
import { eventService } from "../../../services/api/events/events.service";
import { AxiosResponse } from "axios";
import Layout from "../../../components/layout/Layout";

const initialState: IEvent = {
  name: "",
  eventType: "",
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
  extraAttractions: [],
  status: "active"
};

const EditEvent: FC = (): ReactElement => {
  const [values, setValues] = useState<IEvent>(initialState);
  const [event, setEvent] = useState<IEvent>({} as IEvent);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [attraction, setAttraction] = useState<string[]>([]);
  const [attractionValue, setAttractionValue] = useState<string>("");
  const [extraAttraction, setExtraAttraction] = useState<string[]>([]);
  const [extraAttractionValue, setExtraAttractionValue] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch: Dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { eventId } = useParams();

  const { name, eventType, price, discountPrice, startDate, endDate, address, energyland, image, status } = values;
  const { hotel, street, web } = address;

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
    values.attractions = attraction;
    values.extraAttractions = extraAttraction;
    try {
      const response: AxiosResponse<IEvent> = await eventService.updateEvent(eventId as string, values);
      setLoading(false);
      setHasError(false);
      setValues(initialState);
      setAttraction([]);
      setExtraAttraction([]);
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
    if (e.target.name === "energyland") {
      setValues({ ...values, energyland: !energyland });
    }
    console.log("e.target.value", e);
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
    <Layout>
      {event.name}
      <div style={{ marginTop: "20px" }}>
        <div style={{ marginTop: "20px" }}>
          {!image && event.image && <img src={event.image} alt="event" style={{ width: "100px", height: "100px" }} />}
        </div>
        <div style={{ marginTop: "20px" }}>
          {image && <img src={image} alt="event" style={{ width: "100px", height: "100px" }} />}
        </div>

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
            value={startDate.toISOString().substr(0, 10)}
            labelText="Data rozpoczęcia"
            placeholder="---"
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
            handleChange={handleChange}
          />
          <Input
            id="endDate"
            name="endDate"
            type="date"
            value={endDate.toISOString().substr(0, 10)}
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
            <Input
              id="energyland"
              name="energyland"
              type="checkbox"
              value={energyland ? "true" : "false"}
              labelText="Energylandia"
              placeholder="---"
              style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
              handleChange={handleChange}
              checked={energyland}
            />
          </div>

          <div
            style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}
            onClick={handleAttraction}
          >
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
              handleChange={(e) => setExtraAttractionValue(e.target.value)}
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

          <div style={{ marginTop: "20px" }}>
            <label>Status</label>
            <select name="status" className="form-control" onChange={handleChange} value={status} required>
              <option defaultChecked value="">
                Wybierz
              </option>
              <option value="active">Aktywny</option>
              <option value="inactive">Nieaktywny</option>
            </select>
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>Kategoria</label>
            <select name="eventType" className="form-control" onChange={handleChange} value={eventType} required>
              <option defaultChecked value="">
                Wybierz
              </option>
              <option value="Góry">Góry</option>
              <option value="Spływy">Spływy</option>
              <option value="Morze">Morze</option>
              <option value="Półkolonie">Półkolonie</option>
            </select>
          </div>
          <div style={{ margin: "40px 0px" }}>
            <Button
              className="auth-button button"
              disabled={!name || !eventType || !price || !startDate || !endDate}
              onClick={updateEvent}
            >
              {loading ? "Wysyłanie..." : "Utwórz"}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditEvent;
