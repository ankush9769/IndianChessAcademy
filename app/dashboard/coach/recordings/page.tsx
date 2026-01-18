'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Play, Download, Search, Calendar, Clock, Video } from 'lucide-react';

const recordings = [
  {
    id: 1,
    title: 'Sicilian Defense - Advanced Concepts',
    student: 'Arjun Patel',
    date: '2026-01-14',
    time: '10:00 AM',
    duration: '45 mins',
    size: '245 MB',
    thumbnail: '/api/placeholder/320/180',
    views: 2,
    recordingUrl: 'https://zoom.us/rec/share/abc123'
  },
  {
    id: 2,
    title: 'Rook Endgames Masterclass',
    student: 'Priya Singh',
    date: '2026-01-13',
    time: '02:00 PM',
    duration: '50 mins',
    size: '280 MB',
    thumbnail: '/api/placeholder/320/180',
    views: 1,
    recordingUrl: 'https://zoom.us/rec/share/def456'
  },
  {
    id: 3,
    title: 'Opening Principles for Beginners',
    student: 'Ananya Sharma',
    date: '2026-01-12',
    time: '04:00 PM',
    duration: '40 mins',
    size: '210 MB',
    thumbnail: '/api/placeholder/320/180',
    views: 3,
    recordingUrl: 'https://zoom.us/rec/share/ghi789'
  },
  {
    id: 4,
    title: 'Tactical Patterns Workshop',
    student: 'Rohan Kumar',
    date: '2026-01-11',
    time: '11:00 AM',
    duration: '55 mins',
    size: '295 MB',
    thumbnail: '/api/placeholder/320/180',
    views: 2,
    recordingUrl: 'https://zoom.us/rec/share/jkl012'
  },
  {
    id: 5,
    title: 'Queen\'s Gambit Deep Dive',
    student: 'Vikram Mehta',
    date: '2026-01-10',
    time: '03:00 PM',
    duration: '48 mins',
    size: '260 MB',
    thumbnail: '/api/placeholder/320/180',
    views: 1,
    recordingUrl: 'https://zoom.us/rec/share/mno345'
  },
];

export default function CoachRecordingsPage() {
  return (
    <div className="flex min-h-screen bg-primary-offwhite">
      <Sidebar role="coach" />
      
      <div className="flex-1">
        <DashboardHeader userName="IM Ramesh Kumar" userRole="coach" />
        
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-heading font-bold text-primary-blue">
                Zoom Recordings
              </h1>
              <p className="text-gray-600 mt-1">Access and manage your lesson recordings</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search recordings..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Recordings</p>
                  <p className="text-3xl font-bold text-primary-blue">24</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Video className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">This Month</p>
                  <p className="text-3xl font-bold text-primary-blue">8</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Views</p>
                  <p className="text-3xl font-bold text-primary-blue">42</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Storage Used</p>
                  <p className="text-3xl font-bold text-primary-blue">5.2 GB</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Download className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </Card>
          </div>

          {/* Recordings Grid */}
          <Card>
            <h3 className="text-xl font-heading font-semibold mb-4">Recent Recordings</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recordings.map((recording) => (
                <div key={recording.id} className="bg-primary-offwhite rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Thumbnail */}
                  <div className="relative bg-gray-800 h-40 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-blue to-primary-olive opacity-80"></div>
                    <Play className="w-16 h-16 text-white relative z-10 opacity-80" />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {recording.duration}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <h4 className="font-semibold text-primary-blue mb-1">{recording.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{recording.student}</p>
                    
                    <div className="flex items-center text-xs text-gray-500 space-x-3 mb-3">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(recording.date).toLocaleDateString('en-IN')}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {recording.time}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="info">{recording.size}</Badge>
                      <span className="text-xs text-gray-500">{recording.views} views</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <a href={recording.recordingUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button size="sm" className="w-full">
                          <Play className="w-4 h-4 mr-2" />
                          Watch
                        </Button>
                      </a>
                      <a href={recording.recordingUrl} download>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
