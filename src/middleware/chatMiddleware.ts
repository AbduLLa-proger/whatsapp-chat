import { Middleware } from "@reduxjs/toolkit";
import { addMessage } from "../slices/chatSlice";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const chatMiddleware: Middleware = (_store) => (next) => (action: unknown) => {
  if (typeof action === 'object' && action !== null && 'type' in action && action.type === addMessage.type) {
    console.log('New message:', action)
  }
  return next(action)
}