import React, { useState } from 'react'
import { useSendMessageMutation, useLazyGetMessagesQuery, useDeleteNotificationMutation } from '../../services/api';
import './Chat.css'

interface IMessages {
  sender: string;
  text: string;
}

interface IFetchMessages {
  text: string;
}

export const Chat = () => {
  const [message, setMessage] = useState('');
  const [inComingMessage, setIncomingMessage] = useState<IMessages[]>([]);
  const [messageChatId, setMessageChatId] = useState('')
  const [sendMessage] = useSendMessageMutation();
  const [deleteNotification] = useDeleteNotificationMutation();
  const [getMessages, { data, error, isLoading }] = useLazyGetMessagesQuery();

  const handleSendMessage = async () => {

    if (!messageChatId || !message) return;

    try {
      await sendMessage({ chatId: `${messageChatId}@c.us`, message }).unwrap();
      console.log('message sent');
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  const fetchMessages = async () => {
    const response = await getMessages({}).unwrap();
    if (response?.body?.typeWebhook === 'incomingMessageReceived') {
      const newMessage = {
        sender: response.body.senderData.senderName,
        text: response.body.messageData.textMessageData.textMessage
      }

      setIncomingMessage((prev) => [...prev, newMessage])

      await deleteNotification(response.receiptId)
    }
  }

  return (
    <>
      <div>
        <input type="number" name="phoneNumber" placeholder='Input phone number or chat id' value={messageChatId} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessageChatId(e.target.value)} />
        <input type="text" name="message" placeholder='Type a message ...' value={message} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      {isLoading && <p>Loading ...</p>}
      {error && <p>Error fetching messages</p>}
      {data && (
        <ul>
          {data.messages.map((msg: IFetchMessages, index: number) => (
            <li key={index}>{msg.text}</li>
          ))}
        </ul>
      )}
      <div className="chat-container">
        <button onClick={fetchMessages}>Get notification</button>
        <div className="messages">
          {inComingMessage.map((msg, index) => (
            <div key={index} className="message">
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}