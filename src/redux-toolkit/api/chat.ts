import { createAsyncThunk } from "@reduxjs/toolkit";
import { chatService } from "../../services/api/chat/chat.service";
import { IChatMessage } from "../../interfaces/chat/chat.interface";

export interface IConversationList {
  list: IChatMessage[];
}

const getConversationList = createAsyncThunk<IConversationList>(
  "chat/getUserChatList",
  async (name, { dispatch }) => {
    try {
      const response = await chatService.getConversationList();
      console.log("response", response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export { getConversationList };
