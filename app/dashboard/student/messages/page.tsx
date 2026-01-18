'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Search, Send, Paperclip } from 'lucide-react';
import { useState } from 'react';

const conversations = [
  { 
    id: 1, 
    name: 'IM Ramesh Kumar (Coach)', 
    lastMessage: 'Great progress in today\'s lesson!',
    time: '2:30 PM',
    unread: 1,
    avatar: 'R'
  },
  { 
    id: 2, 
    name: 'FM Priya Sharma (Coach)', 
    lastMessage: 'Don\'t forget your homework',
    time: '11:15 AM',
    unread: 0,
    avatar: 'P'
  },
  { 
    id: 3, 
    name: 'Admin Team', 
    lastMessage: 'Your next tournament is scheduled',
    time: 'Yesterday',
    unread: 0,
    avatar: 'A'
  },
];

const messages = [
  { 
    id: 1, 
    sender: 'IM Ramesh Kumar', 
    text: 'Hi Arjun! How are you doing with the Sicilian Defense practice?',
    time: '2:15 PM',
    isMe: false
  },
  { 
    id: 2, 
    sender: 'Me', 
    text: 'Hi Coach! I\'ve been practicing daily. I feel more confident now.',
    time: '2:20 PM',
    isMe: true
  },
  { 
    id: 3, 
    sender: 'IM Ramesh Kumar', 
    text: 'Excellent! Keep up the good work. See you in tomorrow\'s lesson.',
    time: '2:30 PM',
    isMe: false
  },
];

export default function StudentMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageText, setMessageText] = useState('');

  return (
    <div className="flex min-h-screen bg-primary-offwhite">
      <Sidebar role="student" />
      
      <div className="flex-1">
        <DashboardHeader userName="Arjun Patel" userRole="student" />
        
        <main className="p-6">
          <h1 className="text-3xl font-heading font-bold text-primary-blue mb-6">
            Messages
          </h1>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Conversations List */}
            <Card className="lg:col-span-1">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation.id === conv.id
                        ? 'bg-primary-orange text-white'
                        : 'bg-primary-offwhite hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          selectedConversation.id === conv.id
                            ? 'bg-white text-primary-orange'
                            : 'bg-primary-blue text-white'
                        }`}>
                          {conv.avatar}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{conv.name}</p>
                          <p className={`text-xs truncate ${
                            selectedConversation.id === conv.id
                              ? 'text-white opacity-90'
                              : 'text-gray-600'
                          }`}>
                            {conv.lastMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${
                        selectedConversation.id === conv.id
                          ? 'text-white opacity-75'
                          : 'text-gray-500'
                      }`}>
                        {conv.time}
                      </span>
                      {conv.unread > 0 && (
                        <Badge variant="error" className="text-xs">
                          {conv.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Chat Area */}
            <div className="lg:col-span-2">
              <Card className="flex flex-col h-[600px]">
                {/* Chat Header */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-blue rounded-full flex items-center justify-center text-white font-bold">
                      {selectedConversation.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{selectedConversation.name}</p>
                      <p className="text-xs text-gray-500">Active now</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto py-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isMe
                            ? 'bg-primary-orange text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.isMe ? 'text-white opacity-75' : 'text-gray-500'
                          }`}
                        >
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Paperclip className="w-5 h-5 text-gray-600" />
                    </button>
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                    />
                    <Button>
                      <Send className="w-4 h-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
