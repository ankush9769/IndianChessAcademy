'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Bell, MessageSquare, Mail } from 'lucide-react';

const broadcasts = [
  { id: 1, title: 'Tournament Registration Open', sender: 'Admin', date: 'Jan 14, 2026', time: '10:00 AM', type: 'Email', message: 'Dear parents, registration for the upcoming Inter-Academy Chess Tournament is now open. Please register your child by January 20th to secure their spot. This is a great opportunity for them to test their skills against players from other academies!' },
  { id: 2, title: 'New Coach Introduction', sender: 'Admin', date: 'Jan 12, 2026', time: '3:00 PM', type: 'Notification', message: 'We are excited to welcome FM Priya Sharma to our coaching team! She specializes in endgame strategies and will be available for advanced students.' },
  { id: 3, title: 'Holiday Schedule Update', sender: 'Admin', date: 'Jan 10, 2026', time: '9:00 AM', type: 'Email', message: 'Please note that the academy will be closed on January 26th for Republic Day. All lessons scheduled for that day will be rescheduled. Your child\'s coach will contact you individually.' },
  { id: 4, title: 'Payment Reminder', sender: 'Admin', date: 'Jan 8, 2026', time: '11:00 AM', type: 'SMS', message: 'This is a friendly reminder that your monthly subscription payment is due on January 15th. Please ensure timely payment to avoid any interruption in your child\'s lessons.' },
  { id: 5, title: 'Progress Report Available', sender: 'IM Ramesh Kumar', date: 'Jan 5, 2026', time: '2:00 PM', type: 'Notification', message: 'Your child\'s monthly progress report is now available in the Progress section. Please review it and feel free to reach out if you have any questions.' },
  { id: 6, title: 'Practice Session Reminder', sender: 'Admin', date: 'Jan 3, 2026', time: '11:00 AM', type: 'SMS', message: 'Reminder: Weekly practice sessions are every Saturday at 4 PM. Please ensure your child joins their batch for group practice and analysis.' },
];

export default function ParentBroadcastPage() {
  return (
    <div className="flex min-h-screen bg-primary-offwhite">
      <Sidebar role="parent" />
      
      <div className="flex-1">
        <DashboardHeader userName="Rajesh Kumar" userRole="parent" />
        
        <main className="p-4 sm:p-6">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary-blue">Announcements</h1>
            <p className="text-sm sm:text-base text-gray-600">View important announcements from coaches and admin</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Announcements</p>
                  <p className="text-2xl sm:text-3xl font-bold text-primary-blue">24</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">This Month</p>
                  <p className="text-2xl sm:text-3xl font-bold text-primary-blue">6</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
              </div>
            </Card>
            <Card className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Unread</p>
                  <p className="text-2xl sm:text-3xl font-bold text-primary-orange">2</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary-orange" />
                </div>
              </div>
            </Card>
          </div>

          {/* Announcements List */}
          <div className="space-y-4">
            {broadcasts.map((broadcast) => (
              <Card key={broadcast.id} className="hover:shadow-lg transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-blue rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {broadcast.sender.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 break-words">{broadcast.title}</h3>
                      <p className="text-sm text-gray-600">From: {broadcast.sender}</p>
                    </div>
                  </div>
                  <Badge variant="info" className="self-start sm:self-auto">{broadcast.type}</Badge>
                </div>
                
                <p className="text-sm sm:text-base text-gray-700 mb-3 break-words">{broadcast.message}</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-3 border-t border-gray-200">
                  <div className="flex items-center space-x-4 text-xs sm:text-sm text-gray-500">
                    <span>{broadcast.date}</span>
                    <span>{broadcast.time}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
