import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uploaded: false,
  sessionId: null,
};

const chatSlice = createSlice({
  name: "chat",

  initialState,

  reducers: {

    setSession(state, action) {
      state.uploaded = true;
      state.sessionId = action.payload;
    },

  },
});

export const {
  setSession,
} = chatSlice.actions;

export default chatSlice.reducer;   