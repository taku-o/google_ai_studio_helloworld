
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Message } from './types';
import * as messageService from './services/messageService';
import AdminView from './components/AdminView';
import MessageItem from './components/MessageItem';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showAdminPanel, setShowAdminPanel] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadedMessages = messageService.getMessages();
    setMessages(loadedMessages);
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Load messages once on mount

  const handleAddMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    const newMessage = messageService.addMessage(text);
    setMessages(prevMessages => [...prevMessages, newMessage]);
  }, []);

  const handleDeleteMessage = useCallback((id: string) => {
    messageService.deleteMessage(id);
    setMessages(prevMessages => prevMessages.filter(msg => msg.id !== id));
  }, []);
  
  const sortedMessages = useMemo(() => {
    return [...messages].sort((a, b) => b.createdAt - a.createdAt);
  }, [messages]);


  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center">
            <svg className="animate-spin h-10 w-10 text-emerald-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-xl text-slate-300">読み込み中... (Loading...)</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-slate-200 p-4 sm:p-8 font-sans antialiased">
      <div className="container mx-auto max-w-3xl bg-slate-800 bg-opacity-80 backdrop-blur-md shadow-2xl rounded-xl p-6 sm:p-10 border border-slate-700">
        
        <header className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-3">
            ハローワールド・メッセージ管理
          </h1>
          <p className="text-slate-400 text-lg">
            (Hello World & Message Management)
          </p>
        </header>

        <div className="text-center mb-10">
          <button
            onClick={() => setShowAdminPanel(!showAdminPanel)}
            className="px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-opacity-50"
          >
            {showAdminPanel ? 'メイン表示に戻る (Back to Main View)' : '管理画面を開く (Open Admin Panel)'}
          </button>
        </div>

        {showAdminPanel ? (
          <AdminView
            messages={sortedMessages}
            onAddMessage={handleAddMessage}
            onDeleteMessage={handleDeleteMessage}
          />
        ) : (
          <div className="mt-8">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-emerald-300 mb-8 text-center tracking-tight">
              ハローワールド！
              <span className="block text-2xl text-emerald-400 mt-1">(Hello World!)</span>
            </h2>
            <div className="bg-slate-700/50 p-6 rounded-lg shadow-xl backdrop-blur-sm border border-slate-600">
              <h3 className="text-2xl font-semibold text-cyan-300 mb-5">登録されたメッセージ (Stored Messages):</h3>
              {sortedMessages.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-slate-400 italic text-lg">まだメッセージはありません。</p>
                  <p className="text-slate-400 italic mt-1">管理画面から追加してください。</p>
                  <p className="text-slate-500 italic text-sm mt-2">(No messages yet. Add some from the admin panel!)</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  {sortedMessages.map(msg => (
                    <MessageItem key={msg.id} message={msg} /> 
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
       <footer className="text-center mt-12 mb-4 text-slate-500 text-sm">
        <p>© ${new Date().getFullYear()} シンプルReactデモ</p>
        <p>(Simple React & Tailwind CSS Demo Application)</p>
      </footer>
    </div>
  );
};

export default App;
