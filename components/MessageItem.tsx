
import React from 'react';
import { Message } from '../types';

interface MessageItemProps {
  message: Message;
  onDelete?: (id: string) => void;
}

const TrashIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.56 0c.342.052.682.107 1.022.166m0 0a48.108 48.108 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
);

const MessageItem: React.FC<MessageItemProps> = ({ message, onDelete }) => {
  const formattedDate = new Date(message.createdAt).toLocaleString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-slate-700 p-4 rounded-lg shadow-md flex justify-between items-start gap-4 hover:shadow-lg transition-shadow duration-150 ease-in-out">
      <div className="flex-grow">
        <p className="text-slate-100 text-base break-words">{message.text}</p>
        <p className="text-xs text-slate-400 mt-2">{formattedDate}</p>
      </div>
      {onDelete && (
        <button
          onClick={() => onDelete(message.id)}
          className="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-red-500 hover:bg-opacity-20 transition-all duration-150 ease-in-out flex-shrink-0"
          aria-label="メッセージを削除 (Delete message)"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default MessageItem;
