'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import BatchChat from '@/components/dashboard/BatchChat';

export default function AdminBatchesPage() {
  return (
    <div className="flex min-h-screen bg-primary-offwhite">
      <Sidebar role="admin" />
      
      <div className="flex-1">
        <DashboardHeader userName="Admin" userRole="admin" />
        
        <main className="p-6">
          <h1 className="text-3xl font-heading font-bold text-primary-blue mb-6">
            Batch Chat
          </h1>
          <p className="text-gray-600 mb-6">
            Monitor and communicate with all student batches
          </p>

          <BatchChat userRole="admin" userName="Admin" />
        </main>
      </div>
    </div>
  );
}
