'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Send, Search, User, Paperclip } from 'lucide-react';

const conversations = [
  {
    id: 1,
    name: 'IM Ramesh Kumar',
    role: 'Coach',
    lastMessage: 'Great progress in today\'s lesson!',
    timestamp: '2 hours ago',
    unread: 2,
    avatar: '',
  },
  {
    id: 2,
    name: 'ICA Support',
    role: 'Admin',
    lastMessage: 'Your payment has been processed',
    timestamp: '1 day ago',
    unread: 0,
    avatar: '',
  },
  {
    id: 3,
    name: 'FM Priya Sharma',
    role: 'Coach',
    lastMessage: 'Let\'s schedule the next session',
    timestamp: '2 days ago',
    unread: 1,
    avatar: '',
  },
];

const messages = [
  {
    id: 1,
    senderId: '1',
    senderName: 'IM Ramesh Kumar',
    content: 'Hello! How is Arjun doing with the homework I assigned?',
    timestamp: '10:30 AM',
    isOwn: false,
  },
  {
    id: 2,
    senderId: 'me',
    senderName: 'You',
    content: 'He\'s doing great! He solved 8 out of 10 tactical puzzles correctly.',
    timestamp: '10:35 AM',
    isOwn: true,
  },
  {
    id: 3,
    senderId: '1',
    senderName: 'IM Ramesh Kumar',
    content: 'Excellent! That\'s really good progress. We\'ll work on the remaining concepts in our next lesson.',
    timestamp: '10:37 AM',
    isOwn: false,
  },
  {
    id: 4,
    senderId: 'me',
    senderName: 'You',
    content: 'Thank you! Looking forward to it.',
    timestamp: '10:40 AM',
    isOwn: true,
  },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim()) {
      // Handle send message
      setMessageText('');
    }
  };

  return (
    <div className="flex min-h-screen bg-primary-offwhite">
      <Sidebar role="parent" />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader userName="Rajesh Kumar" userRole="Parent" />
        
        <div className="flex-1 flex overflow-hidden">
          {/* Conversations List */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-all text-left ${
                    selectedConversation.id === conv.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-primary-blue rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold truncate">{conv.name}</p>
                        {conv.unread > 0 && (
                          <span className="bg-primary-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{conv.role}</p>
                      <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                      <p className="text-xs text-gray-400 mt-1">{conv.timestamp}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-blue rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold">{selectedConversation.name}</p>
                  <p className="text-sm text-gray-600">{selectedConversation.role}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-md px-4 py-3 rounded-lg ${
                      message.isOwn
                        ? 'bg-primary-orange text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm mb-1">{message.content}</p>
                    <p
                      className={`text-xs ${
                        message.isOwn ? 'text-white text-opacity-80' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <Paperclip className="w-5 h-5 text-gray-600" />
                </button>
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"
                />
                <Button type="submit" disabled={!messageText.trim()}>
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
