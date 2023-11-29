import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { chatService } from "../../services/api/chat/chat.service";
import { IChatMessage } from "../../interfaces/chat/chat.interface";

export interface IConversationList {
  list: IChatMessage[];
}

const getConversationList = createAsyncThunk<IConversationList>("chat/getUserChatList", async (name, { dispatch }) => {
  try {
    const response: AxiosResponse = await chatService.getConversationList();
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export { getConversationList };
