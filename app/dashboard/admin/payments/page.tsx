'use client';

import Link from 'next/link';
import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { ChevronLeft, Search, DollarSign, Download, Calendar, Pause, Play, XCircle, Eye, RefreshCw } from 'lucide-react';

// Mock subscriptions with control
const initialSubscriptions = [
  { 
    id: 1, 
    student: 'Arjun Patel', 
    parent: 'Vikram Patel',
    amount: 5000, 
    plan: 'Monthly - Group', 
    status: 'active', 
    nextBilling: '2026-02-10',
    startDate: '2026-01-10',
    paymentMethod: 'UPI',
    sessionsUsed: 12,
    sessionsTotal: 16,
  },
  { 
    id: 2, 
    student: 'Priya Singh', 
    parent: 'Rajesh Singh',
    amount: 8000, 
    plan: 'Monthly - 1-1', 
    status: 'active', 
    nextBilling: '2026-02-12',
    startDate: '2026-01-12',
    paymentMethod: 'Credit Card',
    sessionsUsed: 6,
    sessionsTotal: 8,
  },
  { 
    id: 3, 
    student: 'Rohan Kumar', 
    parent: 'Sunita Kumar',
    amount: 8000, 
    plan: 'Monthly - 1-1', 
    status: 'paused', 
    nextBilling: 'Paused',
    startDate: '2026-01-08',
    paymentMethod: 'Net Banking',
    sessionsUsed: 4,
    sessionsTotal: 8,
  },
  { 
    id: 4, 
    student: 'Sneha Reddy', 
    parent: 'Anand Reddy',
    amount: 5000, 
    plan: 'Monthly - Group', 
    status: 'paused', 
    nextBilling: 'Paused',
    startDate: '2025-12-15',
    paymentMethod: 'UPI',
    sessionsUsed: 10,
    sessionsTotal: 16,
  },
  { 
    id: 5, 
    student: 'Aditya Sharma', 
    parent: 'Meera Sharma',
    amount: 5000, 
    plan: 'Monthly - Group', 
    status: 'cancelled', 
    nextBilling: 'Cancelled',
    startDate: '2025-11-20',
    paymentMethod: 'UPI',
    sessionsUsed: 12,
    sessionsTotal: 16,
  },
];

// Mock payment transactions
const initialTransactions = [
  { id: 1, student: 'Arjun Patel', amount: 5000, date: '2026-01-10', method: 'UPI', status: 'completed', type: 'Subscription', invoice: 'INV-001' },
  { id: 2, student: 'Priya Singh', amount: 8000, date: '2026-01-12', method: 'Credit Card', status: 'completed', type: 'Subscription', invoice: 'INV-002' },
  { id: 3, student: 'Rohan Kumar', amount: 8000, date: '2026-01-08', method: 'Net Banking', status: 'completed', type: 'Subscription', invoice: 'INV-003' },
  { id: 4, student: 'Sneha Reddy', amount: 5000, date: '2025-12-15', method: 'UPI', status: 'completed', type: 'Subscription', invoice: 'INV-004' },
  { id: 5, student: 'Aditya Sharma', amount: 5000, date: '2025-11-20', method: 'UPI', status: 'completed', type: 'Subscription', invoice: 'INV-005' },
];

export default function AdminPaymentsPage() {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [transactions] = useState(initialTransactions);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesStatus = filterStatus === 'all' || sub.status === filterStatus;
    const matchesSearch = 
      sub.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.parent.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handlePauseSubscription = (id: number) => {
    setSubscriptions(subscriptions.map(sub => 
      sub.id === id ? { ...sub, status: 'paused', nextBilling: 'Paused' } : sub
    ));
  };

  const handleResumeSubscription = (id: number) => {
    const sub = subscriptions.find(s => s.id === id);
    if (sub) {
      const nextBilling = new Date();
      nextBilling.setMonth(nextBilling.getMonth() + 1);
      setSubscriptions(subscriptions.map(s => 
        s.id === id ? { ...s, status: 'active', nextBilling: nextBilling.toISOString().split('T')[0] } : s
      ));
    }
  };

  const handleCancelSubscription = (id: number) => {
    if (confirm('Cancel this subscription? This cannot be undone.')) {
      setSubscriptions(subscriptions.map(sub => 
        sub.id === id ? { ...sub, status: 'cancelled', nextBilling: 'Cancelled' } : sub
      ));
    }
  };

  const totalRevenue = transactions.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);
  const activeSubscriptions = subscriptions.filter(s => s.status === 'active').length;
  const pausedSubscriptions = subscriptions.filter(s => s.status === 'paused').length;

  return (
    <div className="flex min-h-screen bg-primary-offwhite">
      <Sidebar role="admin" />
      
      <div className="flex-1">
        <DashboardHeader userName="Admin" userRole="System Owner" />
        
        <main className="p-3 sm:p-4 lg:p-6">
          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <Link href="/dashboard/admin">
              <Button variant="ghost" size="sm" className="mb-3">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary-blue mb-1">Payment & Subscriptions</h1>
                <p className="text-gray-600 text-sm">Control subscriptions, track payments, manage billing</p>
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-xs sm:text-sm mb-1">Total Revenue</p>
                <p className="text-xl sm:text-2xl font-bold text-primary-blue">₹{totalRevenue.toLocaleString()}</p>
              </div>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <div className="text-center">
                <p className="text-gray-600 text-xs sm:text-sm mb-1">Active</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">{activeSubscriptions}</p>
              </div>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <div className="text-center">
                <p className="text-gray-600 text-xs sm:text-sm mb-1">Paused</p>
                <p className="text-xl sm:text-2xl font-bold text-orange-600">{pausedSubscriptions}</p>
              </div>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <div className="text-center">
                <p className="text-gray-600 text-xs sm:text-sm mb-1">This Month</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">₹26,000</p>
              </div>
            </Card>
          </div>

          {/* Subscription Management Section */}
          <Card className="mb-4 sm:mb-6">
            <h3 className="text-lg font-semibold text-primary-blue mb-4">Subscription Management</h3>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by student or parent..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Subscriptions List */}
            <div className="space-y-3">
              {filteredSubscriptions.map(sub => (
                <div key={sub.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="min-w-0">
                          <h4 className="font-semibold text-primary-blue truncate">{sub.student}</h4>
                          <p className="text-sm text-gray-600">Parent: {sub.parent}</p>
                        </div>
                        <Badge 
                          variant={
                            sub.status === 'active' ? 'success' :
                            sub.status === 'paused' ? 'warning' : 'danger'
                          }
                          className="ml-2 flex-shrink-0"
                        >
                          {sub.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-2">
                        <div><span className="font-medium">Plan:</span> {sub.plan}</div>
                        <div><span className="font-medium">Amount:</span> ₹{sub.amount}/month</div>
                        <div><span className="font-medium">Next Billing:</span> {sub.nextBilling}</div>
                        <div><span className="font-medium">Method:</span> {sub.paymentMethod}</div>
                      </div>

                      {/* Session Progress */}
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-blue rounded-full h-2" 
                            style={{ width: `${(sub.sessionsUsed / sub.sessionsTotal) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600 whitespace-nowrap">
                          {sub.sessionsUsed}/{sub.sessionsTotal} sessions
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="sm:w-40 flex-shrink-0 space-y-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full text-xs"
                        onClick={() => {
                          setSelectedSubscription(sub);
                          setDetailsModalOpen(true);
                        }}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Details
                      </Button>

                      {sub.status === 'active' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="w-full text-xs text-orange-600 hover:bg-orange-50"
                          onClick={() => handlePauseSubscription(sub.id)}
                        >
                          <Pause className="w-3 h-3 mr-1" />
                          Pause
                        </Button>
                      )}

                      {sub.status === 'paused' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="w-full text-xs text-green-600 hover:bg-green-50"
                          onClick={() => handleResumeSubscription(sub.id)}
                        >
                          <Play className="w-3 h-3 mr-1" />
                          Resume
                        </Button>
                      )}

                      {sub.status !== 'cancelled' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="w-full text-xs text-red-600 hover:bg-red-50"
                          onClick={() => handleCancelSubscription(sub.id)}
                        >
                          <XCircle className="w-3 h-3 mr-1" />
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <h3 className="text-lg font-semibold text-primary-blue mb-4">Recent Transactions</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Invoice</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Student</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Amount</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Method</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.slice(0, 5).map(txn => (
                    <tr key={txn.id} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-700">{txn.invoice}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{txn.student}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">₹{txn.amount}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{txn.method}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{txn.date}</td>
                      <td className="px-4 py-3">
                        <Badge variant={txn.status === 'completed' ? 'success' : 'warning'}>
                          {txn.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </main>
      </div>

      {/* Details Modal */}
      {detailsModalOpen && selectedSubscription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-lg w-full">
            <h3 className="text-xl font-heading font-bold text-primary-blue mb-4">Subscription Details</h3>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-gray-600">Student</p>
                  <p className="font-medium">{selectedSubscription.student}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Parent</p>
                  <p className="font-medium">{selectedSubscription.parent}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Plan</p>
                  <p className="font-medium">{selectedSubscription.plan}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className="font-medium">₹{selectedSubscription.amount}/month</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <Badge 
                    variant={
                      selectedSubscription.status === 'active' ? 'success' :
                      selectedSubscription.status === 'paused' ? 'warning' : 'danger'
                    }
                  >
                    {selectedSubscription.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="font-medium">{selectedSubscription.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Start Date</p>
                  <p className="font-medium">{selectedSubscription.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Next Billing</p>
                  <p className="font-medium">{selectedSubscription.nextBilling}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Session Usage</p>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-primary-blue rounded-full h-3" 
                      style={{ width: `${(selectedSubscription.sessionsUsed / selectedSubscription.sessionsTotal) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">
                    {selectedSubscription.sessionsUsed}/{selectedSubscription.sessionsTotal}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setDetailsModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
