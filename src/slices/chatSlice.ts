import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface IMessage {
  id: string;
  chatId: string;
  text: string;
  timestamp: number;
  sender: 'me' | 'them';
}

interface IChat {
  chatId: string;
  messages: IMessage[];
  lastMessage?: IMessage;

}

export interface IChatState {
  chats: Record<string, IChat>;
}

export const initialState: IChatState = {
  chats: {}
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState: initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<IMessage>) => {
      const { chatId } = action.payload;
      if (!state.chats[chatId]) {
        state.chats[chatId] = { chatId, messages: [] };
      }
      state.chats[chatId].messages.push(action.payload);
      state.chats[chatId].lastMessage = action.payload;
    },

    setChats: (state, action: PayloadAction<IChat[]>) => {
      action.payload.forEach((chat) => {
        state.chats[chat.chatId] = chat
      })
    }

  }
})

export const selectChats = (state: RootState) => state.chat.chats;
export const { addMessage, setChats } = chatSlice.actions;
