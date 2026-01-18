'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Send, Users, Paperclip } from 'lucide-react';

interface BatchChatProps {
  userRole: 'coach' | 'admin' | 'student';
  userName: string;
}

// Batch data
const batches = [
  { 
    id: 1, 
    name: 'Beginner Batch A', 
    students: 8,
    lastMessage: 'Great session today everyone!',
    time: '2:30 PM',
    unread: 2,
    color: 'bg-blue-500'
  },
  { 
    id: 2, 
    name: 'Intermediate Batch B', 
    students: 12,
    lastMessage: 'Homework due tomorrow',
    time: '11:45 AM',
    unread: 0,
    color: 'bg-green-500'
  },
  { 
    id: 3, 
    name: 'Advanced Batch C', 
    students: 6,
    lastMessage: 'Tournament prep starts next week',
    time: 'Yesterday',
    unread: 1,
    color: 'bg-purple-500'
  },
  { 
    id: 4, 
    name: 'Weekend Warriors', 
    students: 10,
    lastMessage: 'See you all on Saturday!',
    time: 'Jan 14',
    unread: 0,
    color: 'bg-orange-500'
  },
];

// Sample messages for selected batch
const batchMessages = [
  {
    id: 1,
    sender: 'IM Ramesh Kumar',
    role: 'Coach',
    message: 'Good morning everyone! Today we will focus on the Sicilian Defense.',
    time: '10:00 AM',
    isCurrentUser: false
  },
  {
    id: 2,
    sender: 'Arjun Patel',
    role: 'Student',
    message: 'Excited for today\'s lesson, Coach!',
    time: '10:05 AM',
    isCurrentUser: false
  },
  {
    id: 3,
    sender: 'Priya Singh',
    role: 'Student',
    message: 'I have a question about the Najdorf variation',
    time: '10:10 AM',
    isCurrentUser: false
  },
  {
    id: 4,
    sender: 'You',
    role: 'Coach',
    message: 'Great question Priya! We\'ll cover that in detail today.',
    time: '10:12 AM',
    isCurrentUser: true
  },
  {
    id: 5,
    sender: 'Admin',
    role: 'Admin',
    message: 'Reminder: Tournament registration closes this Friday!',
    time: '2:30 PM',
    isCurrentUser: false
  },
];

// Student list for selected batch
const batchStudents = [
  { id: 1, name: 'Arjun Patel', rating: 1350, status: 'online' },
  { id: 2, name: 'Priya Singh', rating: 1280, status: 'online' },
  { id: 3, name: 'Rohan Kumar', rating: 1420, status: 'offline' },
  { id: 4, name: 'Ananya Sharma', rating: 1190, status: 'online' },
  { id: 5, name: 'Vikram Mehta', rating: 1310, status: 'offline' },
  { id: 6, name: 'Sneha Reddy', rating: 1100, status: 'online' },
  { id: 7, name: 'Aditya Verma', rating: 1380, status: 'offline' },
  { id: 8, name: 'Kavya Iyer', rating: 1250, status: 'online' },
];

export default function BatchChat({ userRole, userName }: BatchChatProps) {
  // Students only see their assigned batch (Intermediate Batch B for demo student Arjun Patel)
  const studentBatch = batches[1]; // Intermediate Batch B
  const visibleBatches = userRole === 'student' ? [studentBatch] : batches;
  
  const [selectedBatch, setSelectedBatch] = useState(visibleBatches[0]);
  const [messageText, setMessageText] = useState('');
  const [showStudentList, setShowStudentList] = useState(false);

  return (
    <div className="grid lg:grid-cols-4 gap-6">
      {/* Batch List */}
      <Card className="lg:col-span-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold">
            {userRole === 'student' ? 'My Batch' : 'Batches'}
          </h3>
          <Badge variant="info">{visibleBatches.length}</Badge>
        </div>

        <div className="space-y-2">
          {visibleBatches.map((batch) => (
            <div
              key={batch.id}
              onClick={() => setSelectedBatch(batch)}
              className={`p-3 rounded-lg cursor-pointer transition-all ${
                selectedBatch.id === batch.id
                  ? 'bg-primary-orange text-white'
                  : 'bg-primary-offwhite hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`w-10 h-10 ${batch.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                  {batch.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{batch.name}</p>
                  <p className={`text-xs flex items-center ${
                    selectedBatch.id === batch.id ? 'text-white opacity-90' : 'text-gray-600'
                  }`}>
                    <Users className="w-3 h-3 mr-1" />
                    {batch.students} students
                  </p>
                </div>
              </div>
              <p className={`text-xs truncate ${
                selectedBatch.id === batch.id ? 'text-white opacity-75' : 'text-gray-500'
              }`}>
                {batch.lastMessage}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className={`text-xs ${
                  selectedBatch.id === batch.id ? 'text-white opacity-75' : 'text-gray-500'
                }`}>
                  {batch.time}
                </span>
                {batch.unread > 0 && (
                  <Badge variant="error" className="text-xs">
                    {batch.unread}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Chat Area */}
      <Card className={`${showStudentList ? 'lg:col-span-2' : 'lg:col-span-3'} flex flex-col h-[700px]`}>
        {/* Chat Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 ${selectedBatch.color} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
              {selectedBatch.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-lg">{selectedBatch.name}</p>
              <p className="text-xs text-gray-500 flex items-center">
                <Users className="w-3 h-3 mr-1" />
                {selectedBatch.students} students
              </p>
            </div>
          </div>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setShowStudentList(!showStudentList)}
          >
            <Users className="w-4 h-4 mr-2" />
            {showStudentList ? 'Hide' : 'Show'} Students
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {batchMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-md ${msg.isCurrentUser ? 'text-right' : 'text-left'}`}>
                <div className="flex items-center space-x-2 mb-1">
                  {!msg.isCurrentUser && (
                    <div className="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {msg.sender.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-semibold text-gray-700">
                      {msg.sender}
                      <Badge variant="info" className="ml-2 text-xs">
                        {msg.role}
                      </Badge>
                    </p>
                  </div>
                </div>
                <div
                  className={`px-4 py-2 rounded-lg ${
                    msg.isCurrentUser
                      ? 'bg-primary-orange text-white'
                      : msg.role === 'Admin'
                      ? 'bg-red-50 text-red-900 border border-red-200'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.isCurrentUser ? 'text-white opacity-75' : 'text-gray-500'
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
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
              placeholder="Type your message to the batch..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
            />
            <Button>
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </Card>

      {/* Student List (Collapsible) */}
      {showStudentList && (
        <Card className="lg:col-span-1">
          <h3 className="text-lg font-heading font-semibold mb-4">Students</h3>
          <div className="space-y-2">
            {batchStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-2 bg-primary-offwhite rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <div className="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {student.name.charAt(0)}
                    </div>
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      student.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{student.name}</p>
                    <p className="text-xs text-gray-500">Rating: {student.rating}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
