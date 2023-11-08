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
  attractions: string[]; // You might want to replace `any` with a specific type if you have a predefined structure for attractions
  extraAttractions: string[]; // Same as above, replace `any` with a specific type if applicable
}

export interface IAddress {
  hotel: string;
  street: string;
  web: string;
}
