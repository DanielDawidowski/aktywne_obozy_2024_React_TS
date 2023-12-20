import { AxiosResponse } from "axios";
import axios from "../../axios";
import { IEvent } from "../../../interfaces/event/event.interface";

class EventService {
  async createEvent(body: IEvent): Promise<AxiosResponse> {
    const response: Awaited<AxiosResponse> = await axios.post("/event", body);
    return response;
  }

  async getAllEvents(): Promise<AxiosResponse> {
    const response: Awaited<AxiosResponse> = await axios.get(`/events`);
    return response;
  }

  async getEvent(eventId: string): Promise<AxiosResponse> {
    const response: Awaited<AxiosResponse> = await axios.get(`/event/${eventId}`);
    return response;
  }

  async updateEvent(eventId: string, body: IEvent): Promise<AxiosResponse> {
    const response: Awaited<AxiosResponse> = await axios.put(`/event/${eventId}`, body);
    return response;
  }

  async deleteEvent(eventId: string): Promise<AxiosResponse> {
    const response: Awaited<AxiosResponse> = await axios.delete(`/event/${eventId}`);
    return response;
  }
}

export const eventService = new EventService();
