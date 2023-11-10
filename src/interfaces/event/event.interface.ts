export interface IEvent {
  _id?: string;
  name: string;
  eventType: string;
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

export interface IEventSlide {
  id: number;
  title?: string;
  image: string;
}
