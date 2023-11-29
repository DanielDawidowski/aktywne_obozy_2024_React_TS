import { AxiosResponse } from "axios";
import axios from "../../axios";
import { IEmail } from "../../../interfaces/email/Email.interface";

class EmailService {
  async sendMessage(body: IEmail): Promise<AxiosResponse<IEmail>> {
    const response = await axios.post("/contact", body);
    return response;
  }
}

export const emailService = new EmailService();
