import { configureStore } from "@reduxjs/toolkit";

import { api } from "../services/api";

import chatReducer from "../features/chat/chatSlice";

export const store = configureStore({
  reducer: {

    [api.reducerPath]: api.reducer,

    chat: chatReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});