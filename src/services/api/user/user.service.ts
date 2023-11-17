import { AxiosResponse } from "axios";
import { ISignUpData } from "../../../interfaces/auth/auth.interface";
import axios from "../../axios";

class UserService {
  async logoutUser(): Promise<AxiosResponse> {
    const response = await axios.get("/signout");
    return response;
  }

  async checkCurrentUser(): Promise<AxiosResponse> {
    const response = await axios.get("/currentuser");
    return response;
  }

  async checkCurrentUserAdmin(): Promise<AxiosResponse> {
    const response = await axios.get("/currentuser/admin");
    return response;
  }

  async getUserProfileByUserId(userId: string): Promise<AxiosResponse<ISignUpData>> {
    const response = await axios.get(`/user/profile/${userId}`);
    return response;
  }

  async getAdmin(): Promise<AxiosResponse> {
    const response = await axios.get("/admins");
    return response;
  }
}

export const userService = new UserService();
