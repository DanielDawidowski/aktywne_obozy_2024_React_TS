import React, { ReactElement, useRef } from "react";
import type { ChangeEvent, FC, FormEvent } from "react";
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
import { Dispatch } from "@reduxjs/toolkit";

interface CreateEventFormProps {
  values: IEvent;
  dispatch: Dispatch;
  setValues: (values: IEvent) => void;
  loading: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  createEvent: (e: FormEvent) => Promise<void | undefined>;
  hasError: boolean;
  handleCheckboxChange: (isChecked: boolean) => void;
  attractions: string[];
  attractionValue: string;
  setAttractionValue: (value: string) => void;
  extraAttractions: string[];
  setExtraAttractionValue: (value: string) => void;
  extraAttractionValue: string;
  handleAttraction: (attractionType: string) => void;
  deleteAttraction: (index: number, attractionType: string) => void;
  showStatus?: boolean;
}

const EventForm: FC<CreateEventFormProps> = (props): ReactElement => {
  const {
    values,
    dispatch,
    setValues,
    loading,
    handleChange,
    createEvent,
    hasError,
    handleCheckboxChange,
    attractions,
    attractionValue,
    setAttractionValue,
    extraAttractions,
    extraAttractionValue,
    setExtraAttractionValue,
    handleAttraction,
    deleteAttraction,
    showStatus = false
  } = props;
  const { name, eventType, price, discountPrice, startDate, endDate, address } = values;

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

  return (
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

      {showStatus && (
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
          onClick={createEvent}
        >
          {loading ? <Spinner size={20} /> : "Utwórz"}
        </Button>
      </div>
    </form>
  );
};

// Define propTypes for the CreateEventForm component
EventForm.propTypes = {
  setValues: propTypes.func.isRequired,
  loading: propTypes.bool.isRequired,
  handleChange: propTypes.func.isRequired,
  createEvent: propTypes.func.isRequired,
  hasError: propTypes.bool.isRequired,
  handleCheckboxChange: propTypes.func.isRequired,
  attractions: propTypes.array.isRequired,
  attractionValue: propTypes.string.isRequired,
  setAttractionValue: propTypes.func.isRequired,
  extraAttractions: propTypes.array.isRequired,
  setExtraAttractionValue: propTypes.func.isRequired,
  extraAttractionValue: propTypes.string.isRequired,
  handleAttraction: propTypes.func.isRequired,
  deleteAttraction: propTypes.func.isRequired,
  showStatus: propTypes.bool
};

export default EventForm;
