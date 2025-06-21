
import React, { useState } from 'react';
import { Message } from '../types';
import MessageItem from './MessageItem';

interface AdminViewProps {
  messages: Message[]; // Expects messages to be pre-sorted (e.g., newest first)
  onAddMessage: (text: string) => void;
  onDeleteMessage: (id: string) => void;
}

const AdminView: React.FC<AdminViewProps> = ({ messages, onAddMessage, onDeleteMessage }) => {
  const [newMessageText, setNewMessageText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessageText.trim()) {
      onAddMessage(newMessageText.trim());
      setNewMessageText('');
    }
  };

  return (
    <div className="mt-8 p-6 bg-slate-700/50 rounded-lg shadow-xl backdrop-blur-sm">
      <h2 className="text-3xl font-semibold text-cyan-300 mb-6 text-center">
        メッセージ管理 (Message Management)
      </h2>
      <form onSubmit={handleSubmit} className="mb-8 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={newMessageText}
          onChange={(e) => setNewMessageText(e.target.value)}
          placeholder="新しいメッセージを入力..."
          className="flex-grow p-3 border border-slate-600 bg-slate-800 text-slate-200 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all placeholder-slate-500"
          aria-label="New message text"
        />
        <button
          type="submit"
          disabled={!newMessageText.trim()}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
        >
          追加 (Add)
        </button>
      </form>
      <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
        {messages.length === 0 ? (
          <p className="text-slate-400 text-center py-4">登録されているメッセージはありません。(No messages yet.)</p>
        ) : (
          messages.map(msg => (
            <MessageItem key={msg.id} message={msg} onDelete={onDeleteMessage} />
          ))
        )}
      </div>
    </div>
  );
};

export default AdminView;
