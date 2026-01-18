'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { BookOpen, Download, Video, FileText, Target, Puzzle } from 'lucide-react';

const resources = [
  {
    id: 1,
    category: 'Openings',
    title: 'Sicilian Defense - Complete Guide',
    type: 'PDF',
    size: '2.5 MB',
    downloads: 245,
    icon: FileText,
  },
  {
    id: 2,
    category: 'Tactics',
    title: 'Pin and Fork Patterns',
    type: 'Video',
    duration: '45 min',
    views: 1250,
    icon: Video,
  },
  {
    id: 3,
    category: 'Endgames',
    title: 'Rook Endgames Masterclass',
    type: 'PDF',
    size: '3.8 MB',
    downloads: 189,
    icon: FileText,
  },
  {
    id: 4,
    category: 'Strategy',
    title: 'Positional Play Fundamentals',
    type: 'Video',
    duration: '60 min',
    views: 980,
    icon: Video,
  },
  {
    id: 5,
    category: 'Tactics',
    title: '1000 Tactical Puzzles',
    type: 'PDF',
    size: '5.2 MB',
    downloads: 567,
    icon: Puzzle,
  },
  {
    id: 6,
    category: 'Openings',
    title: 'Queen\'s Gambit Repertoire',
    type: 'PDF',
    size: '4.1 MB',
    downloads: 423,
    icon: FileText,
  },
  {
    id: 7,
    category: 'Endgames',
    title: 'King and Pawn Endgames',
    type: 'Video',
    duration: '38 min',
    views: 756,
    icon: Video,
  },
  {
    id: 8,
    category: 'Strategy',
    title: 'Attacking the King',
    type: 'Video',
    duration: '52 min',
    views: 1120,
    icon: Video,
  },
];

const categories = ['All', 'Openings', 'Tactics', 'Endgames', 'Strategy'];

export default function ResourcesPage() {
  return (
    <div className="flex min-h-screen bg-primary-offwhite">
      <Sidebar role="parent" />
      
      <div className="flex-1">
        <DashboardHeader userName="Rajesh Kumar" userRole="Parent" />
        
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-heading font-bold text-primary-blue mb-2">
              Learning Resources
            </h1>
            <p className="text-gray-600">Access study materials, videos, and practice exercises</p>
          </div>

          {/* Category Tabs */}
          <div className="flex space-x-2 mb-6 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all bg-white text-gray-700 hover:bg-gray-50"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary-blue">24</p>
                  <p className="text-sm text-gray-600">Total Resources</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Download className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary-blue">12</p>
                  <p className="text-sm text-gray-600">Downloaded</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Video className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary-blue">8</p>
                  <p className="text-sm text-gray-600">Videos Watched</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary-blue">156</p>
                  <p className="text-sm text-gray-600">Puzzles Solved</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <Card key={resource.id} hover>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      resource.type === 'Video' ? 'bg-purple-100' : 'bg-blue-100'
                    }`}>
                      <resource.icon className={`w-6 h-6 ${
                        resource.type === 'Video' ? 'text-purple-600' : 'text-blue-600'
                      }`} />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="info" className="text-xs">
                        {resource.category}
                      </Badge>
                      <Badge variant={resource.type === 'Video' ? 'default' : 'success'} className="text-xs">
                        {resource.type}
                      </Badge>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {resource.title}
                    </h3>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      {resource.type === 'PDF' ? (
                        <>
                          <span>{resource.size}</span>
                          <span>{resource.downloads} downloads</span>
                        </>
                      ) : (
                        <>
                          <span>{resource.duration}</span>
                          <span>{resource.views} views</span>
                        </>
                      )}
                    </div>

                    <Button 
                      size="sm" 
                      variant={resource.type === 'Video' ? 'primary' : 'outline'}
                      className="w-full"
                    >
                      {resource.type === 'Video' ? (
                        <>
                          <Video className="w-4 h-4 mr-1" />
                          Watch Now
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Recommended Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-heading font-bold text-primary-blue mb-6">
              Recommended for You
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-heading font-semibold mb-2">
                      Daily Tactical Training
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Improve your tactical vision with 10 puzzles daily
                    </p>
                    <Button size="sm">Start Training</Button>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-primary-orange rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-heading font-semibold mb-2">
                      Opening Explorer
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Build your opening repertoire with interactive lessons
                    </p>
                    <Button size="sm">Explore Openings</Button>
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
