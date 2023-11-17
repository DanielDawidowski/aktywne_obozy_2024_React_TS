import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user/user.reducer";
import themeReducer from "./reducers/theme/theme.reducer";
import notificationsReducer from "./reducers/notifications/notifications.reducer";
import chatReducer from "./reducers/chat/chat.reducer";
import adminReducer from "./reducers/admin/admin.reducer";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    user: userReducer,
    admin: adminReducer,
    theme: themeReducer,
    notifications: notificationsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
