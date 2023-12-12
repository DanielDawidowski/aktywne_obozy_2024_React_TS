import { AxiosResponse } from "axios";
import { IChatMessage, IChatSettings, IMessageData } from "../../../interfaces/chat/chat.interface";
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

  async deleteChatUser(conversationId: string, userId: string): Promise<AxiosResponse> {
    const response = await axios.delete(`/chat/message/${conversationId}/${userId}`);
    return response;
  }

  async saveSettings(body: IChatSettings): Promise<AxiosResponse<IChatSettings>> {
    const response = await axios.post("/chat/settings", body);
    return response;
  }

  async getChatSettings(): Promise<AxiosResponse<IChatSettings[]>> {
    const response = await axios.get("/chat/settings/list");
    return response;
  }

  async editChatSettings(id: string, body: IChatSettings): Promise<AxiosResponse<IChatSettings>> {
    const response = await axios.put(`/chat/settings/${id}`, body);
    return response;
  }
}

export const chatService = new ChatService();
