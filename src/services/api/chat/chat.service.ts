import { AxiosResponse } from "axios";
import { IChatMessage, IMessageData } from "../../../interfaces/chat/chat.interface";
import axios from "../../axios";

class ChatService {
  async getConversationList(): Promise<AxiosResponse> {
    const response = await axios.get("/chat/message/conversation-list");
    return response;
  }

  async getChatMessages(receiverId: string): Promise<AxiosResponse<IChatMessage>> {
    const response = await axios.get(`/chat/message/user/${receiverId}`);
    return response;
  }

  async saveChatMessage(body: IMessageData): Promise<AxiosResponse<IChatMessage>> {
    const response = await axios.post("/chat/message", body);
    return response;
  }
}

export const chatService = new ChatService();
