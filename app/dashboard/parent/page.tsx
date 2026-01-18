'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Calendar, TrendingUp, Clock, Video, CheckCircle, XCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ratingData = [
  { month: 'Jan', rating: 1200 },
  { month: 'Feb', rating: 1250 },
  { month: 'Mar', rating: 1280 },
  { month: 'Apr', rating: 1320 },
  { month: 'May', rating: 1350 },
];

const upcomingLessons = [
  { id: 1, date: '2026-01-16', time: '10:00 AM', coach: 'IM Ramesh Kumar', status: 'scheduled' },
  { id: 2, date: '2026-01-18', time: '03:00 PM', coach: 'FM Priya Sharma', status: 'scheduled' },
];

const recentAttendance = [
  { id: 1, date: '2026-01-14', lesson: 'Opening Principles', status: 'attended' },
  { id: 2, date: '2026-01-12', lesson: 'Tactical Patterns', status: 'attended' },
  { id: 3, date: '2026-01-10', lesson: 'Endgame Basics', status: 'missed' },
  { id: 4, date: '2026-01-08', lesson: 'Middle Game Strategy', status: 'attended' },
];

export default function ParentDashboard() {
  return (
    <div className="flex min-h-screen bg-primary-offwhite">
      <Sidebar role="parent" />
      
      <div className="flex-1">
        <DashboardHeader userName="Rajesh Kumar" userRole="Parent" />
        
        <main className="p-3 sm:p-4 lg:p-6">
          {/* Account Status Banner - Shows Student is Active */}
          <Card className="mb-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-green-900">Full Access Unlocked</p>
                  <p className="text-sm text-green-700">Student account is active with all features enabled</p>
                </div>
              </div>
              <Badge variant="success">Active Subscription</Badge>
            </div>
          </Card>

          {/* Live Class Tracker */}
          <Card className="mb-4 sm:mb-6 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-600 rounded-full flex items-center justify-center animate-pulse flex-shrink-0">
                  <Video className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="inline-block w-2 h-2 sm:w-3 sm:h-3 bg-green-600 rounded-full animate-pulse flex-shrink-0"></span>
                    <p className="text-xs sm:text-sm font-semibold text-green-900">LIVE CLASS IN PROGRESS</p>
                  </div>
                  <h3 className="text-base sm:text-xl font-heading font-bold text-green-900 truncate">Sicilian Defense - Najdorf Variation</h3>
                  <p className="text-xs sm:text-base text-green-700 truncate">with IM Ramesh Kumar • Started 15 mins ago</p>
                </div>
              </div>
              <Button size="md" className="bg-green-600 hover:bg-green-700 w-full sm:w-auto flex-shrink-0">
                <Video className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Join Now
              </Button>
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
            <Card>
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-gray-600 text-xs sm:text-sm truncate">Current Rating</p>
                  <p className="text-2xl sm:text-3xl font-bold text-primary-blue">1350</p>
                  <p className="text-green-600 text-xs sm:text-sm flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                    +30 this month
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-orange bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary-orange" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-gray-600 text-xs sm:text-sm truncate">Lessons This Month</p>
                  <p className="text-2xl sm:text-3xl font-bold text-primary-blue">8</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">4 remaining</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-gray-600 text-xs sm:text-sm truncate">Attendance Rate</p>
                  <p className="text-2xl sm:text-3xl font-bold text-primary-blue">87%</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">7 of 8 attended</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-gray-600 text-xs sm:text-sm truncate">Practice Hours</p>
                  <p className="text-2xl sm:text-3xl font-bold text-primary-blue">24</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">This month</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {/* Upcoming Lessons */}
            <Card className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-heading font-semibold">Upcoming Lessons</h3>
                <Button variant="ghost" size="sm">View All</Button>
              </div>

              <div className="space-y-3">
                {upcomingLessons.map((lesson) => (
                  <div key={lesson.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 sm:p-4 bg-primary-offwhite rounded-lg">
                    <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-blue rounded-lg flex items-center justify-center flex-shrink-0">
                        <Video className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-sm sm:text-base truncate">{lesson.coach}</p>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {new Date(lesson.date).toLocaleDateString('en-IN', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })} at {lesson.time}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" className="w-full sm:w-auto">Join Now</Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card>
              <h3 className="text-lg sm:text-xl font-heading font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full" variant="primary">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Lesson
                </Button>
                <Button className="w-full" variant="outline">
                  <Video className="w-4 h-4 mr-2" />
                  View Recordings
                </Button>
                <Button className="w-full" variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Progress Report
                </Button>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm font-semibold text-blue-900 mb-1">Next Payment Due</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-900">₹4,999</p>
                <p className="text-xs sm:text-sm text-blue-700">Due on Jan 25, 2026</p>
                <Button size="sm" className="w-full mt-3">Pay Now</Button>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Rating Progress */}
            <Card>
              <h3 className="text-lg sm:text-xl font-heading font-semibold mb-4">Rating Progress</h3>
              <div className="w-full h-[200px] sm:h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ratingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="rating" 
                      stroke="#FC8A24" 
                      strokeWidth={3}
                      dot={{ fill: '#FC8A24', r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Recent Attendance */}
            <Card>
              <h3 className="text-lg sm:text-xl font-heading font-semibold mb-4">Recent Attendance</h3>
              <div className="space-y-3">
                {recentAttendance.map((record) => (
                  <div key={record.id} className="flex items-center justify-between gap-3 p-3 bg-primary-offwhite rounded-lg">
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      {record.status === 'attended' ? (
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm sm:text-base truncate">{record.lesson}</p>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {new Date(record.date).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    </div>
                    <Badge variant={record.status === 'attended' ? 'success' : 'error'} className="flex-shrink-0">
                      {record.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
