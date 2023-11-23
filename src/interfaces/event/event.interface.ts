export interface IEvent {
  _id?: string;
  name: string;
  eventType: EventTypes;
  price: string;
  discountPrice: string;
  startDate: Date;
  endDate: Date;
  image?: string;
  address: IAddress;
  energyland: boolean;
  attractions: string[];
  extraAttractions: string[];
  status?: string;
  message?: string;
}

export interface IAddress {
  hotel: string;
  street: string;
  web: string;
}

export enum EventType {
  mountains = "Góry",
  kayaking = "Spływy",
  summerCamp = "Półkolonie",
  sea = "Morze"
}

export type EventTypes = EventType.mountains | EventType.kayaking | EventType.summerCamp | EventType.sea;
