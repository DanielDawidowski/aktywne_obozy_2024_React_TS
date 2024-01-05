import React, { ReactElement, useRef } from "react";
import type { ChangeEvent, FC, FormEvent, SetStateAction, Dispatch as DispatchReact } from "react";
import { Dispatch as DispatchRedux } from "@reduxjs/toolkit";
import { AiFillDelete } from "react-icons/ai";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import propTypes from "prop-types";
import Input from "../../input/Input";
import { EventType, EventTypes, IEvent } from "../../../interfaces/event/event.interface";
import Spinner from "../../spinner/Spinner";
import Button from "../../button/Button";
import Select from "../../select/Select";
import Checkbox from "../../checkbox/Checkbox";
import { ButtonColor } from "../../button/Button.interface";
import { EventUtils } from "../../../utils/event-utils.service";
import { Utils } from "../../../utils/utils.service";
import { INotificationType } from "../../../interfaces/notification/notification.interface";
import { validateForm } from "../Form.validation";
import { FormAttractionStyles, FormImageStyles, FormItemStyles, FormStyles } from "../Form.styles";
import { Flex } from "../../globalStyles/global.styles";

interface CreateEventFormProps {
  values: IEvent;
  dispatch: DispatchRedux;
  setValues: (values: IEvent) => void;
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
  const { name, price, discountPrice, startDate, endDate, address, image } = values;

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleCheckboxChange = (isChecked: boolean): void => {
    setValues({ ...values, energyland: isChecked });
  };

  const showAttractionsLeft = (attractionType: string): number => {
    const total = 8;
    if (attractionType === "attractions") {
      return total - attractions.length;
    } else {
      return total - extraAttractions.length;
    }
  };

  const handleAttraction = (attractionType: string): void => {
    if (showAttractionsLeft(attractionType) === 0) {
      return;
    } else {
      EventUtils.handleAttraction(
        attractionType,
        attractionValue,
        extraAttractionValue,
        setAttractions,
        setExtraAttractions,
        setAttractionValue,
        setExtraAttractionValue
      );
    }
  };

  const deleteAttraction = (index: number, attractionType: string): void => {
    EventUtils.deleteAttraction(index, attractionType, setAttractions, setExtraAttractions, attractions, extraAttractions);
  };

  return (
    <>
      {!image && event?.image ? (
        <FormImageStyles>
          <img src={event.image} alt="event" />
        </FormImageStyles>
      ) : null}
      {image && (
        <FormImageStyles>
          <img src={image} alt="event" />
        </FormImageStyles>
      )}

      <FormStyles>
        <FormItemStyles>
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
        </FormItemStyles>

        <FormItemStyles>
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
        </FormItemStyles>

        <FormItemStyles>
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
        </FormItemStyles>

        <FormItemStyles>
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
        </FormItemStyles>

        <FormItemStyles>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            value={startDate?.toString()}
            labelText="Data rozpoczęcia"
            placeholder="---"
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
            handleChange={handleChange}
          />
        </FormItemStyles>

        <FormItemStyles>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            value={endDate?.toString()}
            labelText="Data zakonczenia"
            placeholder="---"
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
            handleChange={handleChange}
          />
        </FormItemStyles>

        <FormItemStyles>
          <h2>Dane Hotelu</h2>
        </FormItemStyles>

        <FormItemStyles>
          <Input
            id="hotel"
            name="hotel"
            type="text"
            value={address?.hotel}
            labelText="Nazwa Hotelu"
            placeholder="---"
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
            handleChange={handleChange}
          />
        </FormItemStyles>

        <FormItemStyles>
          <Input
            id="street"
            name="street"
            type="text"
            value={address?.street}
            labelText="Ulica Hotelu"
            placeholder="---"
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
            handleChange={handleChange}
          />
        </FormItemStyles>

        <FormItemStyles>
          <Input
            id="web"
            name="web"
            type="text"
            value={address?.web}
            labelText="Strona www Hotelu"
            placeholder="---"
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
            handleChange={handleChange}
          />
        </FormItemStyles>

        {event && (
          <FormItemStyles>
            <Select label="Status" options={["active", "inactive"]} onSelect={(option: string) => setValues({ ...values, status: option })} />
          </FormItemStyles>
        )}

        <FormItemStyles>
          <Select
            label="Kategoria"
            options={[EventType.mountains, EventType.kayaking, EventType.summerCamp, EventType.sea]}
            onSelect={(option: string) => setValues({ ...values, eventType: option as EventTypes })}
          />
        </FormItemStyles>

        <FormItemStyles>
          <Checkbox label="Energylandia" onChange={handleCheckboxChange} />
        </FormItemStyles>

        <FormItemStyles $attracion>
          <Input
            id="attraction"
            name="attraction"
            type="text"
            value={attractionValue}
            labelText="Zapewnione atrakcje"
            placeholder="---"
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
            handleChange={(e: ChangeEvent<HTMLInputElement>) => setAttractionValue(e.target.value)}
          />

          <BsFillBookmarkPlusFill style={{ fill: "green" }} onClick={() => handleAttraction("attractions")} />
        </FormItemStyles>

        {attractions.length > 0 && (
          <FormItemStyles>
            <h4>Pozostałych atrakcji (max: {showAttractionsLeft("attractions")} )</h4>
            <ul>
              {attractions.map((attr: string, i: number) => (
                <FormAttractionStyles key={i}>
                  <Flex $align="center" $justify="space-between">
                    <h4>{attr}</h4>
                    <AiFillDelete style={{ fill: "red" }} onClick={() => deleteAttraction(i, "attractions")} />
                  </Flex>
                </FormAttractionStyles>
              ))}
            </ul>
          </FormItemStyles>
        )}

        <FormItemStyles $attracion>
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

          <BsFillBookmarkPlusFill style={{ fill: "green" }} onClick={() => handleAttraction("extrAttractions")} />
        </FormItemStyles>

        {extraAttractions.length > 0 && (
          <FormItemStyles>
            <h4>Pozostałych atrakcji (max: {showAttractionsLeft("extraAttraction")} )</h4>
            <ul>
              {extraAttractions.map((attr: string, i: number) => (
                <FormAttractionStyles key={i}>
                  <Flex $align="center" $justify="space-between">
                    <h4>{attr}</h4>
                    <AiFillDelete style={{ fill: "red" }} onClick={() => deleteAttraction(i, "extraAttraction")} />
                  </Flex>
                </FormAttractionStyles>
              ))}
            </ul>
          </FormItemStyles>
        )}

        <FormItemStyles>
          <Button color={ButtonColor.primary} disabled={!validateForm(values)} onClick={eventAction}>
            {loading ? (
              <Flex>
                <Spinner size={20} />
                Wysyłanie...
              </Flex>
            ) : (
              "Utwórz"
            )}
          </Button>
        </FormItemStyles>
      </FormStyles>
    </>
  );
};

EventForm.propTypes = {
  setValues: propTypes.func.isRequired,
  loading: propTypes.bool.isRequired,
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
