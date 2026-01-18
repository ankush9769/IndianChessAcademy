'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { TrendingUp, Target, Award, BookOpen } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ratingHistory = [
  { date: 'Jan', rating: 1200 },
  { date: 'Feb', rating: 1250 },
  { date: 'Mar', rating: 1280 },
  { date: 'Apr', rating: 1320 },
  { date: 'May', rating: 1350 },
];

const accuracyData = [
  { category: 'Openings', score: 85 },
  { category: 'Tactics', score: 92 },
  { category: 'Strategy', score: 78 },
  { category: 'Endgames', score: 88 },
  { category: 'Time Management', score: 75 },
];

const skillsRadar = [
  { skill: 'Openings', value: 85 },
  { skill: 'Tactics', value: 92 },
  { skill: 'Strategy', value: 78 },
  { skill: 'Endgames', value: 88 },
  { skill: 'Calculation', value: 80 },
  { skill: 'Positional', value: 82 },
];

const recentFeedback = [
  {
    id: 1,
    coach: 'IM Ramesh Kumar',
    date: '2026-01-14',
    rating: 5,
    comment: 'Excellent progress in tactical awareness. Keep practicing the puzzles!',
  },
  {
    id: 2,
    coach: 'FM Priya Sharma',
    date: '2026-01-12',
    rating: 4,
    comment: 'Good understanding of opening principles. Work on time management.',
  },
];

export default function ProgressPage() {
  return (
    <div className="flex min-h-screen bg-primary-offwhite">
      <Sidebar role="parent" />
      
      <div className="flex-1">
        <DashboardHeader userName="Rajesh Kumar" userRole="Parent" />
        
        <main className="p-6">
          <h1 className="text-3xl font-heading font-bold text-primary-blue mb-6">
            Student Progress
          </h1>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Current Rating</p>
                  <p className="text-3xl font-bold text-primary-blue">1350</p>
                  <p className="text-green-600 text-sm flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +150 overall
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-orange bg-opacity-10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary-orange" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Avg Accuracy</p>
                  <p className="text-3xl font-bold text-primary-blue">84%</p>
                  <p className="text-gray-500 text-sm mt-1">Across all areas</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Achievements</p>
                  <p className="text-3xl font-bold text-primary-blue">12</p>
                  <p className="text-gray-500 text-sm mt-1">Badges earned</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Study Hours</p>
                  <p className="text-3xl font-bold text-primary-blue">124</p>
                  <p className="text-gray-500 text-sm mt-1">Total hours</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Rating Progress */}
            <Card>
              <h3 className="text-xl font-heading font-semibold mb-4">Rating Progress</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={ratingHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[1100, 1400]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="rating" 
                    stroke="#FC8A24" 
                    strokeWidth={3}
                    dot={{ fill: '#FC8A24', r: 6 }}
                    name="Chess Rating"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Skills Radar */}
            <Card>
              <h3 className="text-xl font-heading font-semibold mb-4">Skills Assessment</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={skillsRadar}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar 
                    name="Skill Level" 
                    dataKey="value" 
                    stroke="#FC8A24" 
                    fill="#FC8A24" 
                    fillOpacity={0.6} 
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Performance by Category */}
          <Card className="mb-6">
            <h3 className="text-xl font-heading font-semibold mb-4">Performance by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={accuracyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#FC8A24" radius={[8, 8, 0, 0]} name="Accuracy %" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Strengths & Weaknesses */}
            <Card>
              <h3 className="text-xl font-heading font-semibold mb-4">Strengths & Weaknesses</h3>
              
              <div className="mb-6">
                <h4 className="font-semibold text-green-700 mb-3">Strengths</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span>Tactical Vision</span>
                    <Badge variant="success">92%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span>Endgame Technique</span>
                    <Badge variant="success">88%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span>Opening Knowledge</span>
                    <Badge variant="success">85%</Badge>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-orange-700 mb-3">Areas for Improvement</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <span>Time Management</span>
                    <Badge variant="warning">75%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <span>Strategic Planning</span>
                    <Badge variant="warning">78%</Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Coach Feedback */}
            <Card>
              <h3 className="text-xl font-heading font-semibold mb-4">Recent Coach Feedback</h3>
              
              <div className="space-y-4">
                {recentFeedback.map((feedback) => (
                  <div key={feedback.id} className="p-4 bg-primary-offwhite rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold">{feedback.coach}</p>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={`text-lg ${
                              i < feedback.rating ? 'text-yellow-500' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {new Date(feedback.date).toLocaleDateString('en-IN', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="text-gray-700">{feedback.comment}</p>
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
