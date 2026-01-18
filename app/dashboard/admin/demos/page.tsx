'use client';

import Link from 'next/link';
import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { ChevronLeft, Plus, Search, Filter, Edit, Calendar, CheckCircle, XCircle, Clock, Video, User, DollarSign, Download } from 'lucide-react';

// Mock coaches
const coaches = [
  { id: 1, name: 'IM Ramesh Kumar' },
  { id: 2, name: 'FM Priya Sharma' },
  { id: 3, name: 'CM Aditya Verma' },
];

// Mock admin owners
const adminOwners = [
  { id: 1, name: 'Admin A' },
  { id: 2, name: 'Admin B' },
  { id: 3, name: 'Admin C' },
];

// Mock demos - Complete lifecycle
const initialDemos = [
  {
    id: 1,
    student: 'Arjun Patel',
    parent: 'Vikram Patel',
    parentPhone: '+91 98765 43210',
    parentEmail: 'vikram@email.com',
    studentAge: 12,
    date: '2026-01-18',
    time: '10:00 AM',
    coach: 'IM Ramesh Kumar',
    coachId: 1,
    adminOwner: 'Admin A',
    adminOwnerId: 1,
    status: 'scheduled',
    attendance: null,
    outcome: null,
    outcomeNotes: '',
    paymentStatus: 'pending',
    meetingLink: 'https://zoom.us/j/123456789',
    notes: 'Interested in competitive chess',
  },
  {
    id: 2,
    student: 'Priya Singh',
    parent: 'Rajesh Singh',
    parentPhone: '+91 98765 43211',
    parentEmail: 'rajesh@email.com',
    studentAge: 10,
    date: '2026-01-20',
    time: '03:00 PM',
    coach: 'FM Priya Sharma',
    coachId: 2,
    adminOwner: 'Admin B',
    adminOwnerId: 2,
    status: 'scheduled',
    attendance: null,
    outcome: null,
    outcomeNotes: '',
    paymentStatus: 'pending',
    meetingLink: null,
    notes: 'Complete beginner',
  },
  {
    id: 3,
    student: 'Rohan Kumar',
    parent: 'Sunita Kumar',
    parentPhone: '+91 98765 43212',
    parentEmail: 'sunita@email.com',
    studentAge: 14,
    date: '2026-01-15',
    time: '11:00 AM',
    coach: 'IM Ramesh Kumar',
    coachId: 1,
    adminOwner: 'Admin A',
    adminOwnerId: 1,
    status: 'completed',
    attendance: 'attended',
    outcome: 'interested',
    outcomeNotes: 'Very interested, wants 1-1 sessions, budget ₹15k/month',
    paymentStatus: 'pending',
    meetingLink: 'https://zoom.us/j/987654321',
    notes: 'Has basic knowledge',
  },
  {
    id: 4,
    student: 'Sneha Reddy',
    parent: 'Anand Reddy',
    parentPhone: '+91 98765 43213',
    parentEmail: 'anand@email.com',
    studentAge: 9,
    date: '2026-01-16',
    time: '02:00 PM',
    coach: 'CM Aditya Verma',
    coachId: 3,
    adminOwner: 'Admin B',
    adminOwnerId: 2,
    status: 'completed',
    attendance: 'attended',
    outcome: 'converted',
    outcomeNotes: 'Enrolled in Beginners Batch A, paid ₹12,000',
    paymentStatus: 'paid',
    meetingLink: 'https://zoom.us/j/456789123',
    notes: 'Parents want structured learning',
  },
  {
    id: 5,
    student: 'Aditya Sharma',
    parent: 'Meera Sharma',
    parentPhone: '+91 98765 43214',
    parentEmail: 'meera@email.com',
    studentAge: 11,
    date: '2026-01-17',
    time: '04:30 PM',
    coach: 'IM Ramesh Kumar',
    coachId: 1,
    adminOwner: 'Admin C',
    adminOwnerId: 3,
    status: 'completed',
    attendance: 'attended',
    outcome: null,
    outcomeNotes: '',
    paymentStatus: 'pending',
    meetingLink: 'https://zoom.us/j/321654987',
    notes: 'School chess club member',
  },
  {
    id: 6,
    student: 'Kavya Nair',
    parent: 'Suresh Nair',
    parentPhone: '+91 98765 43215',
    parentEmail: 'suresh@email.com',
    studentAge: 13,
    date: '2026-01-14',
    time: '10:00 AM',
    coach: 'FM Priya Sharma',
    coachId: 2,
    adminOwner: 'Admin A',
    adminOwnerId: 1,
    status: 'completed',
    attendance: 'no_show',
    outcome: 'not_interested',
    outcomeNotes: 'Parent not responding to follow-up calls',
    paymentStatus: 'na',
    meetingLink: 'https://zoom.us/j/147258369',
    notes: 'Rescheduled twice',
  },
];

export default function AdminDemosPage() {
  const [demos, setDemos] = useState(initialDemos);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDemo, setSelectedDemo] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'outcome'>('create');

  const [demoForm, setDemoForm] = useState({
    student: '',
    parent: '',
    parentPhone: '',
    parentEmail: '',
    studentAge: '',
    date: '',
    time: '',
    coachId: 1,
    adminOwnerId: 1,
    notes: '',
  });

  const [outcomeForm, setOutcomeForm] = useState({
    attendance: 'attended',
    outcome: 'interested',
    outcomeNotes: '',
    paymentStatus: 'pending',
  });

  const filteredDemos = demos.filter(demo => {
    const matchesStatus = filterStatus === 'all' || demo.status === filterStatus;
    const matchesSearch = 
      demo.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      demo.parent.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleCreateDemo = () => {
    const newDemo = {
      id: demos.length + 1,
      student: demoForm.student,
      parent: demoForm.parent,
      parentPhone: demoForm.parentPhone,
      parentEmail: demoForm.parentEmail,
      studentAge: Number(demoForm.studentAge),
      date: demoForm.date,
      time: demoForm.time,
      coach: coaches.find(c => c.id === demoForm.coachId)?.name || '',
      coachId: demoForm.coachId,
      adminOwner: adminOwners.find(a => a.id === demoForm.adminOwnerId)?.name || '',
      adminOwnerId: demoForm.adminOwnerId,
      status: 'scheduled',
      attendance: null,
      outcome: null,
      outcomeNotes: '',
      paymentStatus: 'pending',
      meetingLink: null,
      notes: demoForm.notes,
    };

    setDemos([newDemo, ...demos]);
    setModalOpen(false);
    setDemoForm({ student: '', parent: '', parentPhone: '', parentEmail: '', studentAge: '', date: '', time: '', coachId: 1, adminOwnerId: 1, notes: '' });
  };

  const handleEditDemo = () => {
    if (!selectedDemo) return;

    const updated = demos.map(d => 
      d.id === selectedDemo.id 
        ? {
            ...d,
            student: demoForm.student,
            parent: demoForm.parent,
            parentPhone: demoForm.parentPhone,
            parentEmail: demoForm.parentEmail,
            studentAge: Number(demoForm.studentAge),
            date: demoForm.date,
            time: demoForm.time,
            coach: coaches.find(c => c.id === demoForm.coachId)?.name || '',
            coachId: demoForm.coachId,
            adminOwner: adminOwners.find(a => a.id === demoForm.adminOwnerId)?.name || '',
            adminOwnerId: demoForm.adminOwnerId,
            notes: demoForm.notes,
          }
        : d
    );

    setDemos(updated);
    setModalOpen(false);
    setSelectedDemo(null);
  };

  const handleSubmitOutcome = () => {
    if (!selectedDemo) return;

    const updated = demos.map(d => 
      d.id === selectedDemo.id 
        ? {
            ...d,
            status: 'completed',
            attendance: outcomeForm.attendance,
            outcome: outcomeForm.outcome,
            outcomeNotes: outcomeForm.outcomeNotes,
            paymentStatus: outcomeForm.paymentStatus,
          }
        : d
    );

    setDemos(updated);
    setModalOpen(false);
    setSelectedDemo(null);
  };

  const openCreateModal = () => {
    setModalMode('create');
    setDemoForm({ student: '', parent: '', parentPhone: '', parentEmail: '', studentAge: '', date: '', time: '', coachId: 1, adminOwnerId: 1, notes: '' });
    setModalOpen(true);
  };

  const openEditModal = (demo: any) => {
    setModalMode('edit');
    setSelectedDemo(demo);
    setDemoForm({
      student: demo.student,
      parent: demo.parent,
      parentPhone: demo.parentPhone,
      parentEmail: demo.parentEmail,
      studentAge: demo.studentAge.toString(),
      date: demo.date,
      time: demo.time,
      coachId: demo.coachId,
      adminOwnerId: demo.adminOwnerId,
      notes: demo.notes,
    });
    setModalOpen(true);
  };

  const openOutcomeModal = (demo: any) => {
    setModalMode('outcome');
    setSelectedDemo(demo);
    setOutcomeForm({
      attendance: demo.attendance || 'attended',
      outcome: demo.outcome || 'interested',
      outcomeNotes: demo.outcomeNotes || '',
      paymentStatus: demo.paymentStatus || 'pending',
    });
    setModalOpen(true);
  };

  const exportDemos = () => {
    // Mock CSV export
    const csv = filteredDemos.map(d => 
      `${d.student},${d.parent},${d.date},${d.time},${d.coach},${d.status},${d.attendance || ''},${d.outcome || ''}`
    ).join('\n');
    console.log('Exporting:', csv);
    alert('Demo data exported! (Mock functionality)');
  };

  const pendingOutcomes = demos.filter(d => d.status === 'completed' && !d.outcome).length;

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
                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary-blue mb-1">Demo Pipeline Management</h1>
                <p className="text-gray-600 text-sm">Full demo lifecycle control - Admin owns demos end-to-end</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={exportDemos}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button onClick={openCreateModal}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Demo
                </Button>
              </div>
            </div>
          </div>

          {/* Pending Outcomes Alert */}
          {pendingOutcomes > 0 && (
            <Card className="mb-4 bg-red-50 border-red-200">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-900 mb-1">⚠️ {pendingOutcomes} Demo Outcomes Pending</h4>
                  <p className="text-sm text-red-700">
                    <strong>Demo outcomes are MANDATORY.</strong> Submit outcomes for all completed demos immediately.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Filters & Search */}
          <Card className="mb-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by student or parent name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm"
                >
                  <option value="all">All Demos ({demos.length})</option>
                  <option value="scheduled">Scheduled ({demos.filter(d => d.status === 'scheduled').length})</option>
                  <option value="completed">Completed ({demos.filter(d => d.status === 'completed').length})</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-4">
            <Card className="bg-yellow-50 border-yellow-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-700">{demos.filter(d => d.status === 'scheduled').length}</p>
                <p className="text-xs text-gray-700 mt-1">Scheduled</p>
              </div>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-700">{demos.filter(d => d.status === 'completed').length}</p>
                <p className="text-xs text-gray-700 mt-1">Completed</p>
              </div>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-700">{demos.filter(d => d.attendance === 'attended').length}</p>
                <p className="text-xs text-gray-700 mt-1">Attended</p>
              </div>
            </Card>
            <Card className="bg-red-50 border-red-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-700">{demos.filter(d => d.attendance === 'no_show').length}</p>
                <p className="text-xs text-gray-700 mt-1">No-Show</p>
              </div>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-700">{demos.filter(d => d.outcome === 'interested').length}</p>
                <p className="text-xs text-gray-700 mt-1">Interested</p>
              </div>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-700">{demos.filter(d => d.paymentStatus === 'pending' && d.outcome === 'interested').length}</p>
                <p className="text-xs text-gray-700 mt-1">Payment Pending</p>
              </div>
            </Card>
          </div>

          {/* Demos Table */}
          {filteredDemos.length > 0 ? (
            <div className="space-y-3">
              {filteredDemos.map(demo => (
                <Card key={demo.id} className="hover:shadow-lg transition-shadow">
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Left: Student & Parent Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-base text-primary-blue truncate">{demo.student}</h4>
                          <p className="text-sm text-gray-600">Age: {demo.studentAge}</p>
                          <p className="text-sm text-gray-600">Parent: {demo.parent}</p>
                          <p className="text-xs text-gray-500">{demo.parentPhone}</p>
                        </div>
                        <Badge 
                          variant={demo.status === 'scheduled' ? 'warning' : 'success'}
                          className="flex-shrink-0 ml-2"
                        >
                          {demo.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-2">
                        <div>
                          <span className="font-medium">Date:</span> {new Date(demo.date).toLocaleDateString('en-IN')}
                        </div>
                        <div>
                          <span className="font-medium">Time:</span> {demo.time}
                        </div>
                        <div>
                          <span className="font-medium">Coach:</span> {demo.coach}
                        </div>
                        <div>
                          <span className="font-medium">Admin:</span> {demo.adminOwner}
                        </div>
                      </div>

                      {demo.notes && (
                        <p className="text-xs text-gray-600 italic bg-gray-50 p-2 rounded">{demo.notes}</p>
                      )}
                    </div>

                    {/* Right: Status & Actions */}
                    <div className="lg:w-64 flex-shrink-0 space-y-2">
                      {/* Attendance */}
                      {demo.status === 'completed' && (
                        <div className="text-xs">
                          <p className="text-gray-600 mb-1">Attendance:</p>
                          <Badge variant={demo.attendance === 'attended' ? 'success' : 'danger'}>
                            {demo.attendance === 'attended' ? 'Attended' : 'No-Show'}
                          </Badge>
                        </div>
                      )}

                      {/* Outcome */}
                      {demo.status === 'completed' && demo.outcome && (
                        <div className="text-xs">
                          <p className="text-gray-600 mb-1">Outcome:</p>
                          <Badge 
                            variant={
                              demo.outcome === 'converted' ? 'success' :
                              demo.outcome === 'interested' ? 'info' :
                              demo.outcome === 'not_interested' ? 'danger' : 'warning'
                            }
                          >
                            {demo.outcome === 'converted' ? 'Converted' :
                             demo.outcome === 'interested' ? 'Interested' :
                             demo.outcome === 'not_interested' ? 'Not Interested' : 'Pending'}
                          </Badge>
                          {demo.outcomeNotes && (
                            <p className="text-xs text-gray-600 mt-1 bg-gray-50 p-1 rounded">{demo.outcomeNotes}</p>
                          )}
                        </div>
                      )}

                      {/* Payment Status */}
                      {demo.status === 'completed' && demo.outcome === 'interested' && (
                        <div className="text-xs">
                          <p className="text-gray-600 mb-1">Payment:</p>
                          <Badge variant={demo.paymentStatus === 'paid' ? 'success' : 'warning'}>
                            {demo.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                          </Badge>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="space-y-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full text-xs"
                          onClick={() => openEditModal(demo)}
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit Demo
                        </Button>

                        {demo.status === 'completed' && !demo.outcome && (
                          <Button 
                            size="sm" 
                            className="w-full text-xs bg-red-600 hover:bg-red-700"
                            onClick={() => openOutcomeModal(demo)}
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Submit Outcome (Required)
                          </Button>
                        )}

                        {demo.status === 'completed' && demo.outcome && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="w-full text-xs"
                            onClick={() => openOutcomeModal(demo)}
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit Outcome
                          </Button>
                        )}

                        {demo.meetingLink && (
                          <a href={demo.meetingLink} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline" className="w-full text-xs">
                              <Video className="w-3 h-3 mr-1" />
                              Join Meeting
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Demos Found</h3>
              <p className="text-gray-600 mb-4">Create your first demo to get started</p>
              <Button onClick={openCreateModal}>
                <Plus className="w-4 h-4 mr-2" />
                Create Demo
              </Button>
            </Card>
          )}
        </main>
      </div>

      {/* Modal - Create/Edit Demo or Submit Outcome */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <Card className="max-w-2xl w-full my-8">
            <h3 className="text-xl font-heading font-bold text-primary-blue mb-4">
              {modalMode === 'create' ? 'Create New Demo' : 
               modalMode === 'edit' ? 'Edit Demo' : 
               'Submit Demo Outcome (MANDATORY)'}
            </h3>

            {modalMode !== 'outcome' ? (
              /* Create/Edit Form */
              <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Student Name *</label>
                    <input
                      type="text"
                      value={demoForm.student}
                      onChange={(e) => setDemoForm({ ...demoForm, student: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Student Age *</label>
                    <input
                      type="number"
                      value={demoForm.studentAge}
                      onChange={(e) => setDemoForm({ ...demoForm, studentAge: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Parent Name *</label>
                    <input
                      type="text"
                      value={demoForm.parent}
                      onChange={(e) => setDemoForm({ ...demoForm, parent: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Parent Phone *</label>
                    <input
                      type="tel"
                      value={demoForm.parentPhone}
                      onChange={(e) => setDemoForm({ ...demoForm, parentPhone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parent Email *</label>
                  <input
                    type="email"
                    value={demoForm.parentEmail}
                    onChange={(e) => setDemoForm({ ...demoForm, parentEmail: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                    <input
                      type="date"
                      value={demoForm.date}
                      onChange={(e) => setDemoForm({ ...demoForm, date: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                    <input
                      type="time"
                      value={demoForm.time}
                      onChange={(e) => setDemoForm({ ...demoForm, time: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assign Coach *</label>
                    <select
                      value={demoForm.coachId}
                      onChange={(e) => setDemoForm({ ...demoForm, coachId: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    >
                      {coaches.map(coach => (
                        <option key={coach.id} value={coach.id}>{coach.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assign Admin Owner *</label>
                    <select
                      value={demoForm.adminOwnerId}
                      onChange={(e) => setDemoForm({ ...demoForm, adminOwnerId: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    >
                      {adminOwners.map(admin => (
                        <option key={admin.id} value={admin.id}>{admin.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={demoForm.notes}
                    onChange={(e) => setDemoForm({ ...demoForm, notes: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    placeholder="Student interests, parent requirements, etc."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setModalOpen(false);
                      setSelectedDemo(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={modalMode === 'create' ? handleCreateDemo : handleEditDemo}
                    disabled={
                      !demoForm.student || !demoForm.parent || !demoForm.parentPhone || 
                      !demoForm.parentEmail || !demoForm.date || !demoForm.time || !demoForm.studentAge
                    }
                  >
                    {modalMode === 'create' ? 'Create Demo' : 'Update Demo'}
                  </Button>
                </div>
              </div>
            ) : (
              /* Outcome Form */
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Attendance *</label>
                  <select
                    value={outcomeForm.attendance}
                    onChange={(e) => setOutcomeForm({ ...outcomeForm, attendance: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  >
                    <option value="attended">Attended</option>
                    <option value="no_show">No-Show</option>
                  </select>
                </div>

                {outcomeForm.attendance === 'attended' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Demo Outcome * (MANDATORY)</label>
                      <select
                        value={outcomeForm.outcome}
                        onChange={(e) => setOutcomeForm({ ...outcomeForm, outcome: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                      >
                        <option value="interested">Interested</option>
                        <option value="converted">Converted (Paid)</option>
                        <option value="not_interested">Not Interested</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Outcome Notes * (MANDATORY)</label>
                      <textarea
                        value={outcomeForm.outcomeNotes}
                        onChange={(e) => setOutcomeForm({ ...outcomeForm, outcomeNotes: e.target.value })}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                        placeholder="Student interest level, parent feedback, pricing discussion, next steps, etc."
                      />
                    </div>

                    {outcomeForm.outcome === 'interested' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                        <select
                          value={outcomeForm.paymentStatus}
                          onChange={(e) => setOutcomeForm({ ...outcomeForm, paymentStatus: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                        >
                          <option value="pending">Pending</option>
                          <option value="following_up">Following Up</option>
                        </select>
                      </div>
                    )}

                    {outcomeForm.outcome === 'converted' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                        <select
                          value={outcomeForm.paymentStatus}
                          onChange={(e) => setOutcomeForm({ ...outcomeForm, paymentStatus: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                        >
                          <option value="paid">Paid</option>
                        </select>
                      </div>
                    )}
                  </>
                )}

                {outcomeForm.attendance === 'no_show' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No-Show Reason</label>
                    <textarea
                      value={outcomeForm.outcomeNotes}
                      onChange={(e) => setOutcomeForm({ ...outcomeForm, outcomeNotes: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                      placeholder="Parent not responding, rescheduled, etc."
                    />
                  </div>
                )}

                <div className="flex space-x-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setModalOpen(false);
                      setSelectedDemo(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={handleSubmitOutcome}
                    disabled={
                      outcomeForm.attendance === 'attended' && !outcomeForm.outcomeNotes.trim()
                    }
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Submit Outcome
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
