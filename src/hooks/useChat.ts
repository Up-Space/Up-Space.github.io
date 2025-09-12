'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
  isUser: boolean;
}

const formatTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      const savedMessages = localStorage.getItem('chat-messages');
      if (savedMessages) {
        return JSON.parse(savedMessages);
      }
    }
    return [];
  });
  const [inputMessage, setInputMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'failed'>('connecting');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  // New ResizeObserver for smoother scrolling
  useEffect(() => {
    const chatContainer = messagesEndRef.current?.parentElement;
    if (!chatContainer) return;

    let isUserScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      isUserScrolling = true;
      scrollTimeout = setTimeout(() => {
        isUserScrolling = false;
      }, 500);
    };

    chatContainer.addEventListener('scroll', handleScroll);

    const observer = new ResizeObserver(() => {
      if (!isUserScrolling) {
        scrollToBottom();
      }
    });

    observer.observe(chatContainer);
    scrollToBottom();

    return () => {
      chatContainer.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [messages]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chat-messages', JSON.stringify(messages));
    }
  }, [messages]);

  const connectWebSocket = () => {
    try {
      const wsUrl = `ws://${window.location.hostname}:${process.env.NEXT_PUBLIC_WS_PORT}`;
      ws.current = new WebSocket(wsUrl);
      
      ws.current.onopen = () => {
        setIsConnected(true);
        setConnectionStatus('connected');
        console.log('Connected to chat server');
      };

      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'message') {
            setMessages(prev => [...prev, {
              id: Date.now(),
              text: data.message,
              sender: data.sender || 'Support',
              timestamp: formatTime(new Date()),
              isUser: false
            }]);
          } else if (data.type === 'typing') {
            setIsTyping(data.isTyping);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.current.onclose = () => {
        setIsConnected(false);
        setConnectionStatus('failed');
        console.log('Disconnected from chat server');
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
        setConnectionStatus('failed');
        initializeMockChat();
      };
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
      setConnectionStatus('failed');
      initializeMockChat();
    }
  };

  const initializeMockChat = () => {
    setIsConnected(true);
    setConnectionStatus('connected');
    const existingMessages = localStorage.getItem('chat-messages');
    if (!existingMessages) {
      setMessages([{
        id: 1,
        text: "Hi! I'm here to help you navigate QSpace. How can I assist you today?",
        sender: 'Support Bot',
        timestamp: formatTime(new Date()),
        isUser: false
      }]);
    }
  };

  const sendMessage = () => {
    if (!inputMessage.trim() || isOnCooldown) return;

    setIsOnCooldown(true);
    setTimeout(() => {
      setIsOnCooldown(false);
    }, 2000);

    const message: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'You',
      timestamp: formatTime(new Date()),
      isUser: true
    };

    setMessages(prev => [...prev, message]);

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const wsMessage = {
        type: 'message',
        message: inputMessage,
        sender: 'User',
        timestamp: new Date().toISOString()
      };
      ws.current.send(JSON.stringify(wsMessage));
    } else {
      setTimeout(() => {
        const responses = [
          "Thanks for your message! Our team will get back to you shortly.",
          "I understand your concern. Let me assist you with that.",
          "That's a great question! Here's what I can tell you...",
          "I'll need a moment to look that up for you.",
          "Is there anything specific you'd like to know about our services?"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        setMessages(prev => [...prev, {
          id: Date.now(),
          text: randomResponse,
          sender: 'Support Bot',
          timestamp: formatTime(new Date()),
          isUser: false
        }]);
      }, 1000);
    }

    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return {
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
  };
};
