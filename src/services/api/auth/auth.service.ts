import { AxiosResponse } from "axios";
import { ILoginData, IRegisterData, ISignUpData } from "../../../interfaces/auth/auth.interface";
import axios from "../../axios";

class AuthService {
  async signUp(body: IRegisterData): Promise<AxiosResponse> {
    const response = await axios.post("/signup", body);
    return response;
  }

  async signIn(body: ILoginData): Promise<AxiosResponse> {
    const response = await axios.post("/signin", body);
    return response;
  }

  async forgotPassword(email: string): Promise<AxiosResponse<ISignUpData>> {
    const response = await axios.post("/forgot-password", { email });
    return response;
  }
}

export const authService = new AuthService();
