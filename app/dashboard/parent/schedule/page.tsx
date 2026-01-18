'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Calendar, Clock, Video, MapPin, User } from 'lucide-react';

const upcomingLessons = [
  {
    id: 1,
    date: '2026-01-16',
    time: '10:00 AM',
    duration: 60,
    coach: 'IM Ramesh Kumar',
    topic: 'Sicilian Defense - Najdorf Variation',
    type: 'online',
    status: 'confirmed',
    meetingLink: 'https://meet.example.com/abc123',
  },
  {
    id: 2,
    date: '2026-01-18',
    time: '03:00 PM',
    duration: 60,
    coach: 'FM Priya Sharma',
    topic: 'Endgame Techniques - Rook Endgames',
    type: 'online',
    status: 'confirmed',
    meetingLink: 'https://meet.example.com/def456',
  },
  {
    id: 3,
    date: '2026-01-20',
    time: '11:00 AM',
    duration: 90,
    coach: 'IM Ramesh Kumar',
    topic: 'Tactical Patterns - Pins and Forks',
    type: 'online',
    status: 'pending',
    meetingLink: 'https://meet.example.com/ghi789',
  },
  {
    id: 4,
    date: '2026-01-22',
    time: '04:00 PM',
    duration: 60,
    coach: 'FM Priya Sharma',
    topic: 'Opening Repertoire - Queen\'s Gambit',
    type: 'online',
    status: 'confirmed',
    meetingLink: 'https://meet.example.com/jkl012',
  },
];

const pastLessons = [
  {
    id: 5,
    date: '2026-01-14',
    time: '10:00 AM',
    duration: 60,
    coach: 'IM Ramesh Kumar',
    topic: 'Opening Principles',
    type: 'online',
    status: 'completed',
    rating: 5,
  },
  {
    id: 6,
    date: '2026-01-12',
    time: '03:00 PM',
    duration: 60,
    coach: 'FM Priya Sharma',
    topic: 'Tactical Awareness',
    type: 'online',
    status: 'completed',
    rating: 5,
  },
  {
    id: 7,
    date: '2026-01-10',
    time: '11:00 AM',
    duration: 60,
    coach: 'IM Ramesh Kumar',
    topic: 'Endgame Basics',
    type: 'online',
    status: 'missed',
    rating: 0,
  },
];

export default function SchedulePage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'completed':
        return 'success';
      case 'missed':
        return 'error';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const isToday = (dateString: string) => {
    const today = new Date().toDateString();
    const lessonDate = new Date(dateString).toDateString();
    return today === lessonDate;
  };

  const isTomorrow = (dateString: string) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const lessonDate = new Date(dateString).toDateString();
    return tomorrow.toDateString() === lessonDate;
  };

  return (
    <div className="flex min-h-screen bg-primary-offwhite">
      <Sidebar role="parent" />
      
      <div className="flex-1">
        <DashboardHeader userName="Rajesh Kumar" userRole="Parent" />
        
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-heading font-bold text-primary-blue mb-2">
              Schedule
            </h1>
            <p className="text-gray-600">Manage your student's lessons and appointments</p>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-primary-orange text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Upcoming Lessons
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'past'
                  ? 'bg-primary-orange text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Past Lessons
            </button>
          </div>

          {/* Upcoming Lessons */}
          {activeTab === 'upcoming' && (
            <div className="space-y-4">
              {upcomingLessons.map((lesson) => (
                <Card key={lesson.id} className="hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Date Badge */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-primary-blue rounded-lg flex flex-col items-center justify-center text-white">
                          <span className="text-xs font-medium">
                            {new Date(lesson.date).toLocaleDateString('en-IN', { month: 'short' })}
                          </span>
                          <span className="text-2xl font-bold">
                            {new Date(lesson.date).getDate()}
                          </span>
                        </div>
                      </div>

                      {/* Lesson Details */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-xl font-heading font-semibold">{lesson.topic}</h3>
                          {isToday(lesson.date) && (
                            <Badge variant="error">Today</Badge>
                          )}
                          {isTomorrow(lesson.date) && (
                            <Badge variant="warning">Tomorrow</Badge>
                          )}
                          <Badge variant={getStatusColor(lesson.status)}>
                            {lesson.status}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-600">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2 text-primary-orange" />
                            <span>{lesson.coach}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-primary-orange" />
                            <span>{lesson.time} ({lesson.duration} min)</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-primary-orange" />
                            <span>{formatDate(lesson.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-primary-orange" />
                            <span className="capitalize">{lesson.type}</span>
                          </div>
                        </div>

                        {lesson.meetingLink && lesson.status === 'confirmed' && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-900 mb-2">
                              <Video className="w-4 h-4 inline mr-1" />
                              Meeting Link Ready
                            </p>
                            <a
                              href={lesson.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              {lesson.meetingLink}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-2 ml-4">
                      {lesson.status === 'confirmed' && isToday(lesson.date) && (
                        <Button size="sm">
                          <Video className="w-4 h-4 mr-1" />
                          Join Now
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        Reschedule
                      </Button>
                      <Button size="sm" variant="ghost">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}

              {upcomingLessons.length === 0 && (
                <Card className="text-center py-12">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">No Upcoming Lessons</h3>
                  <p className="text-gray-600 mb-4">You don't have any lessons scheduled yet.</p>
                  <Button>Book a Lesson</Button>
                </Card>
              )}
            </div>
          )}

          {/* Past Lessons */}
          {activeTab === 'past' && (
            <div className="space-y-4">
              {pastLessons.map((lesson) => (
                <Card key={lesson.id} className="hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Date Badge */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gray-400 rounded-lg flex flex-col items-center justify-center text-white">
                          <span className="text-xs font-medium">
                            {new Date(lesson.date).toLocaleDateString('en-IN', { month: 'short' })}
                          </span>
                          <span className="text-2xl font-bold">
                            {new Date(lesson.date).getDate()}
                          </span>
                        </div>
                      </div>

                      {/* Lesson Details */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-xl font-heading font-semibold">{lesson.topic}</h3>
                          <Badge variant={getStatusColor(lesson.status)}>
                            {lesson.status}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-600">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2 text-gray-500" />
                            <span>{lesson.coach}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-gray-500" />
                            <span>{lesson.time} ({lesson.duration} min)</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                            <span>{formatDate(lesson.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                            <span className="capitalize">{lesson.type}</span>
                          </div>
                        </div>

                        {lesson.status === 'completed' && lesson.rating > 0 && (
                          <div className="mt-3 flex items-center">
                            <span className="text-sm text-gray-600 mr-2">Your Rating:</span>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-lg ${
                                    i < lesson.rating ? 'text-yellow-500' : 'text-gray-300'
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-2 ml-4">
                      {lesson.status === 'completed' && (
                        <>
                          <Button size="sm" variant="outline">
                            View Recording
                          </Button>
                          <Button size="sm" variant="ghost">
                            View Notes
                          </Button>
                        </>
                      )}
                      {lesson.status === 'missed' && (
                        <Button size="sm">
                          Reschedule
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}

              {pastLessons.length === 0 && (
                <Card className="text-center py-12">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">No Past Lessons</h3>
                  <p className="text-gray-600">Your lesson history will appear here.</p>
                </Card>
              )}
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mt-8">
            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-1">This Week</p>
                <p className="text-3xl font-bold text-primary-blue">3</p>
                <p className="text-sm text-gray-500">Lessons</p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-1">This Month</p>
                <p className="text-3xl font-bold text-primary-blue">12</p>
                <p className="text-sm text-gray-500">Lessons</p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-1">Attendance</p>
                <p className="text-3xl font-bold text-green-600">87%</p>
                <p className="text-sm text-gray-500">Rate</p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-1">Total Hours</p>
                <p className="text-3xl font-bold text-primary-orange">24</p>
                <p className="text-sm text-gray-500">This Month</p>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
