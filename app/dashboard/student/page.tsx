'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { TrendingUp, Calendar, Video, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ratingData = [
  { month: 'Jan', rating: 1200 },
  { month: 'Feb', rating: 1250 },
  { month: 'Mar', rating: 1280 },
  { month: 'Apr', rating: 1320 },
  { month: 'May', rating: 1350 },
];

const upcomingLessons = [
  { id: 1, date: '2026-01-16', time: '10:00 AM', coach: 'IM Ramesh Kumar', topic: 'Sicilian Defense' },
  { id: 2, date: '2026-01-18', time: '03:00 PM', coach: 'FM Priya Sharma', topic: 'Endgame Techniques' },
];

const recentHomework = [
  { id: 1, title: 'Tactical Puzzles Set 5', dueDate: '2026-01-17', status: 'pending', completed: 7, total: 10 },
  { id: 2, title: 'Opening Analysis', dueDate: '2026-01-19', status: 'pending', completed: 0, total: 5 },
  { id: 3, title: 'Endgame Practice', dueDate: '2026-01-14', status: 'completed', completed: 8, total: 8 },
];

// Attendance and progress calculations
const totalLessons = 40;
const attendedLessons = 35;
const attendancePercentage = ((attendedLessons / totalLessons) * 100).toFixed(0);
const studyMaterialsAccessed = 17;
const studyMaterialsTotal = 20;
const overallProgress = (((attendedLessons / totalLessons) + (studyMaterialsAccessed / studyMaterialsTotal)) / 2 * 100).toFixed(0);

export default function StudentDashboard() {
  return (
    <div className="flex min-h-screen bg-primary-offwhite">
      <Sidebar role="student" />
      
      <div className="flex-1">
        <DashboardHeader userName="Arjun Patel" userRole="Student" />
        
        <main className="p-3 sm:p-4 lg:p-6">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary-blue mb-4 sm:mb-6">
            My Dashboard
          </h1>

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
                  <p className="text-gray-600 text-xs sm:text-sm truncate">Attendance</p>
                  <p className="text-2xl sm:text-3xl font-bold text-primary-blue">{attendancePercentage}%</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">{attendedLessons} of {totalLessons} lessons</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-gray-600 text-xs sm:text-sm truncate">Overall Progress</p>
                  <p className="text-2xl sm:text-3xl font-bold text-primary-blue">{overallProgress}%</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">Combined score</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-orange bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary-orange" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-gray-600 text-xs sm:text-sm truncate">Lessons Attended</p>
                  <p className="text-2xl sm:text-3xl font-bold text-primary-blue">{attendedLessons}</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">Total sessions</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
              </div>
            </Card>

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
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
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
                        <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-sm sm:text-base truncate">{lesson.topic}</p>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{lesson.coach}</p>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {new Date(lesson.date).toLocaleDateString('en-IN', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })} at {lesson.time}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" className="w-full sm:w-auto">Join</Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Homework */}
            <Card>
              <h3 className="text-lg sm:text-xl font-heading font-semibold mb-4">Homework</h3>
              <div className="space-y-3">
                {recentHomework.map((hw) => (
                  <div key={hw.id} className="p-3 bg-primary-offwhite rounded-lg">
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <p className="font-semibold text-xs sm:text-sm flex-1 min-w-0 truncate">{hw.title}</p>
                      <Badge variant={hw.status === 'completed' ? 'success' : 'warning'} className="flex-shrink-0">
                        {hw.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">Due: {new Date(hw.dueDate).toLocaleDateString('en-IN')}</p>
                    <div className="flex items-center justify-between text-xs gap-2">
                      <span className="flex-shrink-0">{hw.completed}/{hw.total} completed</span>
                      <div className="flex-1 max-w-[80px] bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-orange h-2 rounded-full"
                          style={{ width: `${(hw.completed / hw.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Rating Progress */}
          <Card>
            <h3 className="text-lg sm:text-xl font-heading font-semibold mb-4">My Rating Progress</h3>
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
        </main>
      </div>
    </div>
  );
}
