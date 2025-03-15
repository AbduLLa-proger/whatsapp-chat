import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_WHATS_APP_CHAT_API_URL;
const INSTANCE_ID = import.meta.env.VITE_WHATS_APP_CHAT_INSTANCE_ID;
const API_TOKEN = import.meta.env.VITE_WHATS_APP_CHAT_API_TOKEN;


export const whatsappApi = createApi({
  reducerPath: 'whatsappApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/waInstance${INSTANCE_ID}`,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => ({
        url: `/receiveNotification/${API_TOKEN}`,
        method: 'GET',
      })
    }),
    sendMessage: builder.mutation({
      query: ({ chatId, message }: Record<string, string>) => ({
        url: `/sendMessage/${API_TOKEN}`,
        method: 'POST',
        body: { chatId, message },
      }),
    }),
    deleteNotification: builder.mutation({
      query: (receiptId) => ({
        url: `/deleteNotification/${API_TOKEN}/${receiptId}`,
        method: 'DELETE',
      })
    })
  })
})

export const { useLazyGetMessagesQuery, useSendMessageMutation, useDeleteNotificationMutation } = whatsappApi;