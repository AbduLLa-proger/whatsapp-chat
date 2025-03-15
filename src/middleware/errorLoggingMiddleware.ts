import { Middleware, isRejectedWithValue } from "@reduxjs/toolkit";

export const errorLoggingMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.error('An error occurred:', action.payload)
  }

  return next(action)
} 