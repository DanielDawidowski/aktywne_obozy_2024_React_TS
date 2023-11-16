import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user/user.reducer";
import themeReducer from "./reducers/theme/theme.reducer";
import notificationsReducer from "./reducers/notifications/notifications.reducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    notifications: notificationsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
