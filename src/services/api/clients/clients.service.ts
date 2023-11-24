import { AxiosResponse } from "axios";
import axios from "../../axios";
import { IClient } from "../../../interfaces/client/client.interface";

class ClientService {
  async createClient(body: IClient): Promise<AxiosResponse<IClient>> {
    const response = await axios.post("/client", body);
    return response;
  }

  async getAllClients(page: number): Promise<AxiosResponse> {
    const response = await axios.get(`/client/all/${page}`);
    return response;
  }

  async getClient(clientId: string): Promise<AxiosResponse<IClient>> {
    const response = await axios.get(`/client/${clientId}`);
    return response;
  }

  async updateClient(clientId: string, body: IClient): Promise<AxiosResponse<IClient>> {
    const response = await axios.put(`/client/${clientId}`, body);
    return response;
  }

  async deleteClient(clientId: string): Promise<AxiosResponse> {
    const response = await axios.delete(`/client/${clientId}`);
    return response;
  }
}

export const clientService = new ClientService();
