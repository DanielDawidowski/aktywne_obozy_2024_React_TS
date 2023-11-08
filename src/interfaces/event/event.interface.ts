export interface IEvent {
  name: string;
  eventType: string;
  price: string;
  discountPrice: string;
  startDate: string;
  endDate: string;
  image?: string;
  address: IAddress;
  energyland: boolean;
  attractions: string[];
  extraAttractions: string[];
  message?: string;
}

export interface IAddress {
  hotel: string;
  street: string;
  web: string;
}
