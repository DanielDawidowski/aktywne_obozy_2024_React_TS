import { AxiosResponse } from "axios";
import axios from "../../axios";
import { IEvent } from "../../../interfaces/event/event.interface";

class EventService {
  async createEvent(body: IEvent): Promise<AxiosResponse<IEvent>> {
    const response = await axios.post("/event", body);
    return response;
  }

  async getAllEvents(page: number): Promise<AxiosResponse> {
    const response = await axios.get(`/event/all/${page}`);
    return response;
  }

  async getEvent(eventId: string): Promise<AxiosResponse> {
    const response = await axios.get(`/event/${eventId}`);
    return response;
  }

  async updateEvent(eventId: string, body: IEvent): Promise<AxiosResponse<IEvent>> {
    const response = await axios.put(`/event/${eventId}`, body);
    return response;
  }

  async deleteEvent(eventId: string): Promise<AxiosResponse> {
    const response = await axios.delete(`/event/${eventId}`);
    return response;
  }
}

export const eventService = new EventService();
