import { IEvent } from "../../interfaces/event/event.interface";

export const validateForm = (values: IEvent): boolean => {
  const { name, eventType, price, startDate, endDate, address, image, attractions, extraAttractions } = values;

  // Perform your specific validation checks
  const isNameValid = Boolean(name);
  const isEventTypeValid = Boolean(eventType);
  const isPriceValid = Boolean(price);
  const isStartDateValid = Boolean(startDate);
  const isEndDateValid = Boolean(endDate);
  const isAddressValid = Boolean(address && address.hotel && address.street && address.web);
  const isImageValid = Boolean(image);
  const areAttractionsValid = attractions.length <= 8 && attractions.every((attr) => Boolean(attr));
  const areExtraAttractionsValid =
    extraAttractions.length <= 8 && extraAttractions.every((extraAttr) => Boolean(extraAttr));

  // Return true if all validation checks pass
  return (
    isNameValid &&
    isEventTypeValid &&
    isPriceValid &&
    isStartDateValid &&
    isEndDateValid &&
    isAddressValid &&
    isImageValid &&
    areAttractionsValid &&
    areExtraAttractionsValid
  );
};
