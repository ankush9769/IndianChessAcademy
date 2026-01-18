'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { DollarSign, TrendingUp, Calendar, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const earningsData = [
  { month: 'Jan', earnings: 45000 },
  { month: 'Feb', earnings: 52000 },
  { month: 'Mar', earnings: 48000 },
  { month: 'Apr', earnings: 58000 },
  { month: 'May', earnings: 62000 },
];

const studentEarnings = [
  { id: 1, student: 'Arjun Patel', lessons: 12, rate: 1500, total: 18000 },
  { id: 2, student: 'Priya Singh', lessons: 10, rate: 1500, total: 15000 },
  { id: 3, student: 'Rohan Kumar', lessons: 15, rate: 1500, total: 22500 },
  { id: 4, student: 'Ananya Sharma', lessons: 8, rate: 1500, total: 12000 },
];

const payoutHistory = [
  { id: 1, date: '2026-01-01', amount: 58000, status: 'paid', method: 'Bank Transfer' },
  { id: 2, date: '2025-12-01', amount: 52000, status: 'paid', method: 'Bank Transfer' },
  { id: 3, date: '2025-11-01', amount: 48000, status: 'paid', method: 'Bank Transfer' },
];

export default function CoachEarningsPage() {
  return (
    <div className="flex min-h-screen bg-primary-offwhite">
      <Sidebar role="coach" />
      
      <div className="flex-1">
        <DashboardHeader userName="IM Ramesh Kumar" userRole="coach" />
        
        <main className="p-6">
          <h1 className="text-3xl font-heading font-bold text-primary-blue mb-6">
            Earnings & Payments
          </h1>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">This Month</p>
                  <p className="text-3xl font-bold text-primary-blue">₹62,000</p>
                  <p className="text-green-600 text-sm flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +12% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Lessons</p>
                  <p className="text-3xl font-bold text-primary-blue">48</p>
                  <p className="text-gray-500 text-sm mt-1">This month</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Avg Per Lesson</p>
                  <p className="text-3xl font-bold text-primary-blue">₹1,500</p>
                  <p className="text-gray-500 text-sm mt-1">Standard rate</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Next Payout</p>
                  <p className="text-3xl font-bold text-primary-blue">₹62K</p>
                  <p className="text-gray-500 text-sm mt-1">Feb 1, 2026</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </Card>
          </div>

          {/* Earnings Chart */}
          <Card className="mb-6">
            <h3 className="text-xl font-heading font-semibold mb-4">Monthly Earnings</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="earnings" fill="#FC8A24" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Earnings Per Student */}
            <Card>
              <h3 className="text-xl font-heading font-semibold mb-4">Earnings Per Student</h3>
              <div className="space-y-3">
                {studentEarnings.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-primary-offwhite rounded-lg">
                    <div>
                      <p className="font-semibold">{item.student}</p>
                      <p className="text-sm text-gray-600">
                        {item.lessons} lessons × ₹{item.rate}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-primary-blue">₹{item.total.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Payout History */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-heading font-semibold">Payout History</h3>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
              <div className="space-y-3">
                {payoutHistory.map((payout) => (
                  <div key={payout.id} className="flex items-center justify-between p-3 bg-primary-offwhite rounded-lg">
                    <div>
                      <p className="font-semibold">₹{payout.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(payout.date).toLocaleDateString('en-IN', { 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </p>
                      <p className="text-xs text-gray-500">{payout.method}</p>
                    </div>
                    <Badge variant="success">{payout.status}</Badge>
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
