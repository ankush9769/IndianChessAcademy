'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { CreditCard, Download, AlertCircle, CheckCircle } from 'lucide-react';

const currentPlan = {
  name: 'Club',
  price: 4999,
  lessonsPerMonth: 8,
  lessonsUsed: 4,
  nextBillingDate: '2026-01-25',
};

const paymentHistory = [
  { id: 1, date: '2025-12-25', amount: 4999, status: 'paid', invoice: 'INV-2025-12' },
  { id: 2, date: '2025-11-25', amount: 4999, status: 'paid', invoice: 'INV-2025-11' },
  { id: 3, date: '2025-10-25', amount: 4999, status: 'paid', invoice: 'INV-2025-10' },
  { id: 4, date: '2025-09-25', amount: 2999, status: 'paid', invoice: 'INV-2025-09' },
];

const upcomingPayment = {
  amount: 4999,
  dueDate: '2026-01-25',
  daysRemaining: 10,
};

export default function BillingPage() {
  return (
    <div className="flex min-h-screen bg-primary-offwhite">
      <Sidebar role="parent" />
      
      <div className="flex-1">
        <DashboardHeader userName="Rajesh Kumar" userRole="Parent" />
        
        <main className="p-6">
          <h1 className="text-3xl font-heading font-bold text-primary-blue mb-6">
            Billing & Payments
          </h1>

          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Current Plan */}
            <Card className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-heading font-semibold">Current Plan</h3>
                <Badge variant="success">Active</Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-gray-600 mb-2">Plan Details</p>
                  <p className="text-3xl font-bold text-primary-blue mb-1">{currentPlan.name}</p>
                  <p className="text-gray-600">₹{currentPlan.price}/month</p>
                </div>

                <div>
                  <p className="text-gray-600 mb-2">Lessons Usage</p>
                  <div className="flex items-end space-x-2 mb-2">
                    <span className="text-3xl font-bold text-primary-blue">
                      {currentPlan.lessonsUsed}
                    </span>
                    <span className="text-gray-600 mb-1">/ {currentPlan.lessonsPerMonth}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-orange h-2 rounded-full"
                      style={{ width: `${(currentPlan.lessonsUsed / currentPlan.lessonsPerMonth) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-primary-offwhite rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-1">Next Billing Date</p>
                <p className="text-lg font-semibold">
                  {new Date(currentPlan.nextBillingDate).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline">Change Plan</Button>
                <Button variant="ghost">Cancel Subscription</Button>
              </div>
            </Card>

            {/* Upcoming Payment */}
            <Card>
              <h3 className="text-xl font-heading font-semibold mb-4">Upcoming Payment</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-900">Payment Due Soon</p>
                    <p className="text-sm text-blue-700">
                      {upcomingPayment.daysRemaining} days remaining
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-600 text-sm mb-1">Amount Due</p>
                <p className="text-3xl font-bold text-primary-blue">₹{upcomingPayment.amount}</p>
              </div>

              <div className="mb-4">
                <p className="text-gray-600 text-sm mb-1">Due Date</p>
                <p className="font-semibold">
                  {new Date(upcomingPayment.dueDate).toLocaleDateString('en-IN', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>

              <Button className="w-full">Pay Now</Button>

              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-green-800">
                  <CheckCircle className="w-3 h-3 inline mr-1" />
                  Auto-pay enabled
                </p>
              </div>
            </Card>
          </div>

          {/* Payment History */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-heading font-semibold">Payment History</h3>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export All
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Invoice</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment) => (
                    <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        {new Date(payment.date).toLocaleDateString('en-IN')}
                      </td>
                      <td className="py-4 px-4 font-mono text-sm">{payment.invoice}</td>
                      <td className="py-4 px-4 font-semibold">₹{payment.amount}</td>
                      <td className="py-4 px-4">
                        <Badge variant="success">
                          <CheckCircle className="w-3 h-3 mr-1 inline" />
                          {payment.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Payment Method */}
          <Card className="mt-6">
            <h3 className="text-xl font-heading font-semibold mb-4">Payment Method</h3>
            
            <div className="flex items-center justify-between p-4 bg-primary-offwhite rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-blue rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold">•••• •••• •••• 4242</p>
                  <p className="text-sm text-gray-600">Expires 12/2027</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Update</Button>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
