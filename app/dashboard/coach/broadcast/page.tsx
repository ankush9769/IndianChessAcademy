'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Send, Users, Mail, MessageSquare, Bell } from 'lucide-react';

const previousBroadcasts = [
  { id: 1, title: 'New Study Material Available', recipients: 'My Students', date: 'Jan 5, 2026', time: '2:00 PM', status: 'sent', type: 'Notification' },
  { id: 2, title: 'Practice Session Tomorrow', recipients: 'Intermediate Batch B', date: 'Jan 3, 2026', time: '4:00 PM', status: 'sent', type: 'Email' },
  { id: 3, title: 'Homework Reminder', recipients: 'All My Students', date: 'Dec 28, 2024', time: '11:00 AM', status: 'sent', type: 'SMS' },
  { id: 4, title: 'Tournament Preparation', recipients: 'Advanced Students', date: 'Dec 20, 2024', time: '3:00 PM', status: 'sent', type: 'Email' },
];

export default function CoachBroadcastPage() {
  const [messageType, setMessageType] = useState('email');
  const [recipients, setRecipients] = useState('my-students');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className="flex min-h-screen bg-primary-offwhite">
      <Sidebar role="coach" />
      
      <div className="flex-1">
        <DashboardHeader userName="IM Ramesh Kumar" userRole="coach" />
        
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-heading font-bold text-primary-blue">Broadcast Messages</h1>
            <p className="text-gray-600">Send announcements to your students</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Compose Message */}
            <div className="lg:col-span-2">
              <Card>
                <h2 className="text-xl font-heading font-semibold text-primary-blue mb-4">
                  Compose New Broadcast
                </h2>

                {/* Message Type */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message Type
                  </label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setMessageType('email')}
                      className={`flex items-center px-4 py-2 rounded-lg border-2 transition-all ${
                        messageType === 'email'
                          ? 'border-primary-orange bg-primary-orange text-white'
                          : 'border-gray-300 text-gray-700 hover:border-primary-orange'
                      }`}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </button>
                    <button
                      onClick={() => setMessageType('notification')}
                      className={`flex items-center px-4 py-2 rounded-lg border-2 transition-all ${
                        messageType === 'notification'
                          ? 'border-primary-orange bg-primary-orange text-white'
                          : 'border-gray-300 text-gray-700 hover:border-primary-orange'
                      }`}
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      Notification
                    </button>
                    <button
                      onClick={() => setMessageType('sms')}
                      className={`flex items-center px-4 py-2 rounded-lg border-2 transition-all ${
                        messageType === 'sms'
                          ? 'border-primary-orange bg-primary-orange text-white'
                          : 'border-gray-300 text-gray-700 hover:border-primary-orange'
                      }`}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      SMS
                    </button>
                  </div>
                </div>

                {/* Recipients */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Recipients
                  </label>
                  <select
                    value={recipients}
                    onChange={(e) => setRecipients(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  >
                    <option value="my-students">All My Students</option>
                    <option value="beginner-batch">Beginner Batch A</option>
                    <option value="intermediate-batch">Intermediate Batch B</option>
                    <option value="advanced-batch">Advanced Batch C</option>
                    <option value="weekend-batch">Weekend Warriors</option>
                  </select>
                </div>

                {/* Subject */}
                {messageType === 'email' && (
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Enter email subject..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                    />
                  </div>
                )}

                {/* Message */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`Enter your ${messageType} message...`}
                    rows={messageType === 'sms' ? 4 : 8}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent resize-none"
                  />
                  {messageType === 'sms' && (
                    <p className="text-xs text-gray-500 mt-1">
                      {message.length}/160 characters
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <Button>
                    <Send className="w-4 h-4 mr-2" />
                    Send Broadcast
                  </Button>
                  <Button variant="outline">
                    Schedule for Later
                  </Button>
                  <Button variant="ghost">
                    Save as Draft
                  </Button>
                </div>
              </Card>
            </div>

            {/* Stats & Quick Info */}
            <div className="space-y-6">
              <Card>
                <h3 className="text-lg font-heading font-semibold mb-4">Recipient Count</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">All My Students</span>
                    <Badge variant="info">28</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Beginner Batch A</span>
                    <Badge variant="info">8</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Intermediate Batch B</span>
                    <Badge variant="info">12</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Advanced Batch C</span>
                    <Badge variant="info">6</Badge>
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-heading font-semibold mb-4">Broadcast Stats</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">This Month</p>
                    <p className="text-2xl font-bold text-primary-blue">3</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Sent</p>
                    <p className="text-2xl font-bold text-primary-blue">24</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Avg. Open Rate</p>
                    <p className="text-2xl font-bold text-green-600">82%</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Previous Broadcasts */}
          <Card className="mt-6">
            <h2 className="text-xl font-heading font-semibold text-primary-blue mb-4">
              Recent Broadcasts
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Title</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Recipients</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date & Time</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {previousBroadcasts.map((broadcast) => (
                    <tr key={broadcast.id} className="border-b border-gray-100 hover:bg-primary-offwhite">
                      <td className="py-3 px-4">
                        <p className="font-semibold text-gray-900">{broadcast.title}</p>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-600">{broadcast.recipients}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm text-gray-900">{broadcast.date}</p>
                        <p className="text-xs text-gray-500">{broadcast.time}</p>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="info">{broadcast.type}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="success">{broadcast.status}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button size="sm" variant="outline">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
