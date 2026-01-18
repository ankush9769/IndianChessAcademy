'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Toast, { ToastType } from '@/components/ui/Toast';
import { Calendar, Clock, User, Globe } from 'lucide-react';

const coaches = [
  { id: 'any', name: 'Any Available Coach', rating: 0 },
  { id: '1', name: 'GM Viswanathan Anand', rating: 2800 },
  { id: '2', name: 'IM Ramesh Kumar', rating: 2500 },
  { id: '3', name: 'FM Priya Sharma', rating: 2400 },
];

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
];

const timezones = [
  'Asia/Kolkata (IST)',
  'America/New_York (EST)',
  'Europe/London (GMT)',
  'Asia/Dubai (GST)',
];

export default function DemoBookingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    parentEmail: '',
    parentPhone: '',
    preferredDate: '',
    preferredTime: '',
    coachId: 'any',
    timezone: 'Asia/Kolkata (IST)',
    studentAge: '',
    currentRating: '',
    authMethod: 'magic-link', // 'magic-link' or 'password'
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password if password method selected
    if (formData.authMethod === 'password') {
      if (formData.password.length < 8) {
        setToast({ message: 'Password must be at least 8 characters', type: 'error' });
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setToast({ message: 'Passwords do not match', type: 'error' });
        return;
      }
    }
    
    setIsLoading(true);

    // Simulate API call - creates Account with role=CUSTOMER
    setTimeout(() => {
      setIsLoading(false);
      setToast({ 
        message: formData.authMethod === 'magic-link' 
          ? 'Account created! Check your email for login link' 
          : 'Account created successfully!', 
        type: 'success' 
      });
      setTimeout(() => {
        router.push('/booking/demo/success');
      }, 1500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-primary-offwhite py-12 px-4">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading font-bold text-primary-blue mb-2">
            Book Your Free Demo
          </h1>
          <p className="text-gray-600">Experience world-class chess coaching</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            {[
              { num: 1, label: 'Info' },
              { num: 2, label: 'Schedule' },
              { num: 3, label: 'Coach' },
              { num: 4, label: 'Account' }
            ].map((s, idx, arr) => (
              <div key={s.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base ${
                      step >= s.num ? 'bg-primary-orange text-white' : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {s.num}
                  </div>
                  <span className={`text-xs mt-1 ${step >= s.num ? 'text-primary-orange font-semibold' : 'text-gray-500'}`}>
                    {s.label}
                  </span>
                </div>
                {idx < arr.length - 1 && (
                  <div
                    className={`w-8 sm:w-16 h-1 mx-1 ${step > s.num ? 'bg-primary-orange' : 'bg-gray-200'}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-heading font-semibold mb-4">Parent & Student Information</h2>
                
                <Input
                  label="Parent Name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  required
                />

                <Input
                  label="Student Name"
                  type="text"
                  placeholder="Enter student's full name"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  required
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Student Age"
                    type="number"
                    placeholder="Age"
                    value={formData.studentAge}
                    onChange={(e) => setFormData({ ...formData, studentAge: e.target.value })}
                    required
                  />

                  <Input
                    label="Current Chess Rating (if any)"
                    type="number"
                    placeholder="e.g., 1200"
                    value={formData.currentRating}
                    onChange={(e) => setFormData({ ...formData, currentRating: e.target.value })}
                  />
                </div>

                <Input
                  label="Parent Email"
                  type="email"
                  placeholder="parent@example.com"
                  value={formData.parentEmail}
                  onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                  required
                />

                <Input
                  label="Parent Phone"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.parentPhone}
                  onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                  required
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-heading font-semibold mb-4">Schedule Your Demo</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="inline w-4 h-4 mr-1" />
                    Timezone
                  </label>
                  <select
                    value={formData.timezone}
                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                    className="input-field"
                  >
                    {timezones.map((tz) => (
                      <option key={tz} value={tz}>{tz}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Clock className="inline w-4 h-4 mr-1" />
                    Preferred Time
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredTime: time })}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                          formData.preferredTime === time
                            ? 'bg-primary-orange text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-heading font-semibold mb-4">Choose Your Coach</h2>

                <div className="space-y-3">
                  {coaches.map((coach) => (
                    <button
                      key={coach.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, coachId: coach.id })}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        formData.coachId === coach.id
                          ? 'border-primary-orange bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <User className="w-10 h-10 text-primary-blue" />
                          <div>
                            <p className="font-semibold">{coach.name}</p>
                            {coach.rating > 0 && (
                              <p className="text-sm text-gray-600">Rating: {coach.rating}</p>
                            )}
                          </div>
                        </div>
                        {formData.coachId === coach.id && (
                          <div className="w-6 h-6 bg-primary-orange rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-primary-blue mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Your Account Will Be Created
                  </h3>
                  <p className="text-sm text-gray-700">
                    An account will be created for <strong>{formData.parentEmail}</strong> to access your demo session and future dashboard.
                  </p>
                </div>

                <h2 className="text-2xl font-heading font-semibold mb-4">Setup Your Login</h2>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Choose Authentication Method
                  </label>

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, authMethod: 'magic-link' })}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        formData.authMethod === 'magic-link'
                          ? 'border-primary-orange bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                          formData.authMethod === 'magic-link' ? 'border-primary-orange bg-primary-orange' : 'border-gray-300'
                        }`}>
                          {formData.authMethod === 'magic-link' && (
                            <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-primary-blue">Magic Link (Recommended)</p>
                          <p className="text-sm text-gray-600 mt-1">
                            Receive a secure login link via email. No password to remember.
                          </p>
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, authMethod: 'password' })}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        formData.authMethod === 'password'
                          ? 'border-primary-orange bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                          formData.authMethod === 'password' ? 'border-primary-orange bg-primary-orange' : 'border-gray-300'
                        }`}>
                          {formData.authMethod === 'password' && (
                            <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-primary-blue">Set Password</p>
                          <p className="text-sm text-gray-600 mt-1">
                            Create a password for traditional email/password login.
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>

                  {formData.authMethod === 'password' && (
                    <div className="space-y-4 mt-6 pt-6 border-t">
                      <Input
                        label="Create Password"
                        type="password"
                        placeholder="Minimum 8 characters"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                      <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="Re-enter password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                      />
                      {formData.password && (
                        <div className="text-sm">
                          <p className="text-gray-600 mb-2">Password strength:</p>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                formData.password.length >= 12
                                  ? 'bg-green-600 w-full'
                                  : formData.password.length >= 8
                                  ? 'bg-yellow-500 w-2/3'
                                  : 'bg-red-500 w-1/3'
                              }`}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6 border-t">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                >
                  Previous
                </Button>
              )}
              
              {step < 4 ? (
                <Button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="ml-auto"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="ml-auto"
                >
                  Create Account & Book Demo
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
