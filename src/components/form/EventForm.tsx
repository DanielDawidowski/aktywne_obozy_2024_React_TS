import React, { ReactElement, useRef } from "react";
import type { ChangeEvent, FC, FormEvent, SetStateAction, Dispatch as DispatchReact } from "react";
import { Dispatch as DispatchRedux } from "@reduxjs/toolkit";
import { AiFillDelete } from "react-icons/ai";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import propTypes from "prop-types";
import Input from "../input/Input";
import { IEvent } from "../../interfaces/event/event.interface";

import Spinner from "../spinner/Spinner";
import Button from "../button/Button";
import Select from "../select/Select";
import Checkbox from "../checkbox/Checkbox";
import { ButtonColor } from "../button/Button.interface";
import { EventUtils } from "../../utils/event-utils.service";
import { Utils } from "../../utils/utils.service";
import { INotificationType } from "../../interfaces/notification/notification.interface";

interface CreateEventFormProps {
  values: IEvent;
  dispatch: DispatchRedux;
  setValues: (values: IEvent) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  eventAction: (e: FormEvent) => Promise<void | undefined>;
  attractions: string[];
  setAttractions: DispatchReact<SetStateAction<string[]>>;
  extraAttractions: string[];
  setExtraAttractions: DispatchReact<SetStateAction<string[]>>;
  attractionValue: string;
  setAttractionValue: DispatchReact<SetStateAction<string>>;
  extraAttractionValue: string;
  setExtraAttractionValue: DispatchReact<SetStateAction<string>>;
  loading: boolean;
  hasError: boolean;
  event?: IEvent;
}

const EventForm: FC<CreateEventFormProps> = (props): ReactElement => {
  const {
    values,
    dispatch,
    setValues,
    loading,
    handleChange,
    eventAction,
    hasError,
    attractions,
    setAttractions,
    attractionValue,
    setAttractionValue,
    extraAttractions,
    setExtraAttractions,
    extraAttractionValue,
    setExtraAttractionValue,
    event
  } = props;
  const { name, eventType, price, discountPrice, startDate, endDate, address, image } = values;

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleCheckboxChange = (isChecked: boolean): void => {
    setValues({ ...values, energyland: isChecked });
  };

  const handleAttraction = (attractionType: string): void => {
    EventUtils.handleAttraction(
      attractionType,
      attractionValue,
      extraAttractionValue,
      setAttractions,
      setExtraAttractions,
      setAttractionValue,
      setExtraAttractionValue
    );
  };

  const deleteAttraction = (index: number, attractionType: string): void => {
    EventUtils.deleteAttraction(
      index,
      attractionType,
      setAttractions,
      setExtraAttractions,
      attractions,
      extraAttractions
    );
  };

  return (
    <>
      <div style={{ marginTop: "20px" }}>
        {!image && event?.image && <img src={event.image} alt="event" style={{ width: "100px", height: "100px" }} />}
      </div>
      <div style={{ marginTop: "20px" }}>
        {image && <img src={image} alt="event" style={{ width: "100px", height: "100px" }} />}
      </div>

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
        <h5>Dane Hotelu</h5>
        <Input
          id="hotel"
          name="hotel"
          type="text"
          value={address.hotel}
          labelText="Nazwa Hotelu"
          placeholder="---"
          style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          handleChange={handleChange}
        />
        <Input
          id="street"
          name="street"
          type="text"
          value={address.street}
          labelText="Ulica Hotelu"
          placeholder="---"
          style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          handleChange={handleChange}
        />
        <Input
          id="web"
          name="web"
          type="text"
          value={address.web}
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
            handleChange={(e: ChangeEvent<HTMLInputElement>) => setAttractionValue(e.target.value)}
          />

          <BsFillBookmarkPlusFill
            style={{ fill: "green", marginLeft: "30px" }}
            onClick={() => handleAttraction("attractions")}
          />
        </div>
        {attractions.length > 0 && (
          <div className="create__event--attractions">
            <h6>Max 8 atrakcjii</h6>
            <ul>
              {attractions.map((attr: string, i: number) => (
                <li key={i}>
                  <h4>{attr}</h4>
                  <AiFillDelete style={{ fill: "red" }} onClick={() => deleteAttraction(i, "attractions")} />
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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

          <BsFillBookmarkPlusFill
            style={{ fill: "green", marginLeft: "30px" }}
            onClick={() => handleAttraction("extrAttractions")}
          />
        </div>
        {extraAttractions.length > 0 && (
          <div className="create__event--attractions">
            <h6>Max 8 atrakcjii</h6>
            <ul style={{ width: "100%" }}>
              {extraAttractions.map((attr: string, i: number) => (
                <li key={i} style={{ display: "flex", width: "100%" }}>
                  <h4>{attr}</h4>
                  <AiFillDelete style={{ fill: "red" }} onClick={() => deleteAttraction(i, "extraAttraction")} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {event && (
          <div style={{ margin: "20px 0" }}>
            <Select
              label="Status"
              options={["Aktywny", "Nieaktywny"]}
              onSelect={(option: string) => setValues({ ...values, status: option })}
            />
          </div>
        )}

        <div style={{ margin: "20px 0" }}>
          <Select
            label="Kategoria"
            options={["Góry", "Spływy", "Morze", "Półkolonie"]}
            onSelect={(option: string) => setValues({ ...values, eventType: option })}
          />
        </div>
        <div style={{ margin: "20px 0" }}>
          <Button
            color={ButtonColor.primary}
            disabled={!name || !eventType || !price || !startDate || !endDate}
            onClick={eventAction}
          >
            {loading ? <Spinner size={20} /> : "Utwórz"}
          </Button>
        </div>
      </form>
    </>
  );
};

// Define propTypes for the CreateEventForm component
EventForm.propTypes = {
  setValues: propTypes.func.isRequired,
  loading: propTypes.bool.isRequired,
  handleChange: propTypes.func.isRequired,
  eventAction: propTypes.func.isRequired,
  hasError: propTypes.bool.isRequired,
  attractions: propTypes.array.isRequired,
  attractionValue: propTypes.string.isRequired,
  setAttractionValue: propTypes.func.isRequired,
  extraAttractions: propTypes.array.isRequired,
  setExtraAttractionValue: propTypes.func.isRequired,
  extraAttractionValue: propTypes.string.isRequired
};

export default EventForm;
