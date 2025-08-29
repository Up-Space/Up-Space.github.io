'use client';

import { useState, useEffect } from 'react';
import { useChat } from '@/src/hooks/useChat';

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    messages,
    inputMessage,
    setInputMessage,
    isConnected,
    connectionStatus,
    isTyping,
    isOnCooldown,
    sendMessage,
    handleKeyPress,
    messagesEndRef,
    connectWebSocket
  } = useChat();

  useEffect(() => {
    if (isOpen && !isConnected && connectionStatus !== 'failed') {
      connectWebSocket();
    }
  }, [isOpen, isConnected, connectionStatus, connectWebSocket]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 transform hover:scale-110"
          aria-label="Open live chat"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      <div className={`bg-white rounded-lg shadow-xl w-full sm:w-80 h-96 flex flex-col ${isOpen ? 'block' : 'hidden'}`}>
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span className="font-semibold">Live Support</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {connectionStatus === 'failed' && (
            <div className="text-red-600 text-sm p-2 text-center bg-red-50">
              Unable to connect to live chat. You're using a mock assistant.
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3" role="log">            
            {messages.map((message, index) => {
              const prevMessage = messages[index - 1];
              const showAvatar = !prevMessage || prevMessage.isUser !== message.isUser;
              
              return (
                <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} items-start`}>
                  {/* Support Avatar (only for support messages) */}
                  {!message.isUser && showAvatar && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm mr-2 flex-shrink-0">
                      SS
                    </div>
                  )}

                  <div className={`flex flex-col max-w-[75%] ${message.isUser ? 'items-end' : 'items-start'}`}>
                    <div className={`px-3 py-2 rounded-lg ${
                      message.isUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                    </div>
                    {/* Timestamp is conditionally rendered to avoid visual noise */}
                    {showAvatar && (
                        <p className="text-xs opacity-70 mt-1 text-gray-500">{message.timestamp}</p>
                    )}
                  </div>
                  
                  {/* User Avatar (only for user messages) */}
                  {message.isUser && showAvatar && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm ml-2 flex-shrink-0">
                      Me
                    </div>
                  )}
                </div>
              );
            })}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isConnected ? (isOnCooldown ? "Sending..." : "Type a message...") : connectionStatus === 'failed' ? "Failed to connect. Using a mock chat." : "Connecting..."}
                disabled={!isConnected || isOnCooldown}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 text-sm"
              />
              <button
                onClick={sendMessage}
                disabled={!isConnected || !inputMessage.trim() || isOnCooldown}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
                aria-label="Send message"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}
