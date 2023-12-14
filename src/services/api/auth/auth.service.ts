import { AxiosResponse } from "axios";
import { ILoginData, IRegisterData } from "../../../interfaces/auth/auth.interface";
import axios from "../../axios";

class AuthService {
  async signUp(body: IRegisterData): Promise<AxiosResponse> {
    const response: Awaited<AxiosResponse> = await axios.post("/signup", body);
    return response;
  }

  async signIn(body: ILoginData): Promise<AxiosResponse> {
    const response: Awaited<AxiosResponse> = await axios.post("/signin", body);
    return response;
  }
}

export const authService = new AuthService();
