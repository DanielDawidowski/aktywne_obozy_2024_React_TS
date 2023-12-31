import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { orderBy } from "lodash";
import { IConversationList, getConversationList } from "../../api/chat";
import { IChatListUser } from "../../../interfaces/chat/chat.interface";

export interface IChatProps {
  chatList: IChatListUser[];
  isOpenChat: boolean;
  isLoading: boolean;
  selectedChatUser: IChatListUser;
}

const loadUserFromLocalStorage = (): IChatListUser => {
  const selectedChatUser = localStorage.getItem("selectedChatUser");
  return selectedChatUser ? JSON.parse(selectedChatUser) : null;
};

const initialState: IChatProps = {
  chatList: [],
  isOpenChat: false,
  isLoading: false,
  selectedChatUser: loadUserFromLocalStorage()
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setOpenChat: (state, action) => {
      const { isLoading, isOpenChat } = action.payload;
      state.isOpenChat = isOpenChat;
      state.isLoading = isLoading;
      localStorage.setItem("isOpenChat", JSON.stringify(!isOpenChat));
    },
    setSelectedChatUser: (state, action: PayloadAction<IChatListUser>) => {
      state.selectedChatUser = action.payload;
      localStorage.setItem("selectedChatUser", JSON.stringify(action.payload));
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getConversationList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getConversationList.fulfilled, (state, action: PayloadAction<IConversationList>) => {
      state.isLoading = false;
      const { list } = action.payload;
      state.chatList = orderBy(list, ["createdAt"], ["desc"]);
    });
    builder.addCase(getConversationList.rejected, (state) => {
      state.isLoading = false;
    });
  }
});

export const { setOpenChat, setSelectedChatUser } = chatSlice.actions;
export default chatSlice.reducer;
