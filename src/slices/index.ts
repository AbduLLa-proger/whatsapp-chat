import { combineReducers } from "@reduxjs/toolkit";
import { chatSlice } from "./chatSlice";
import { authSlice } from "./authSlice";
import { whatsappApi } from "../services/api";

export const rootReducer = combineReducers({
  chat: chatSlice.reducer,
  auth: authSlice.reducer,
  [whatsappApi.reducerPath]: whatsappApi.reducer,
})