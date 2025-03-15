import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { whatsappApi } from "../services/api";
import { rootReducer } from "../slices";
import { chatMiddleware } from "../middleware/chatMiddleware";
import { errorLoggingMiddleware } from "../middleware/errorLoggingMiddleware";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ["auth", "chat"]
}

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat([whatsappApi.middleware, chatMiddleware, errorLoggingMiddleware])
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;