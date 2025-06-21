
import { Message } from '../types';

const STORAGE_KEY = 'appMessages';

export const getMessages = (): Message[] => {
  try {
    const storedMessages = localStorage.getItem(STORAGE_KEY);
    if (storedMessages) {
      const parsedMessages = JSON.parse(storedMessages) as Message[];
      // Basic validation for message structure
      return parsedMessages.filter(msg => msg && typeof msg.id === 'string' && typeof msg.text === 'string' && typeof msg.createdAt === 'number');
    }
  } catch (error) {
    console.error("Error parsing messages from localStorage:", error);
  }
  return [];
};

export const saveMessages = (messages: Message[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (error) {
    console.error("Error saving messages to localStorage:", error);
  }
};

export const addMessage = (text: string): Message => {
  const messages = getMessages();
  const newMessage: Message = {
    id: crypto.randomUUID(),
    text: text.trim(),
    createdAt: Date.now(),
  };
  const updatedMessages = [...messages, newMessage];
  saveMessages(updatedMessages);
  return newMessage;
};

export const deleteMessage = (id: string): void => {
  const messages = getMessages();
  const updatedMessages = messages.filter(msg => msg.id !== id);
  saveMessages(updatedMessages);
};
