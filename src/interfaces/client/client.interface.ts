export interface IClient {
  _id?: string;
  eventId: string;
  eventName: string;
  name: string;
  email: string;
  tel: string;
  birthDate: string;
  price: string;
  createdAt?: Date;
  message?: string;
}
