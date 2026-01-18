'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Toast, { ToastType } from '@/components/ui/Toast';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Demo credentials for testing
    const demoAccounts: Record<string, { password: string; hasStudent: boolean; dashboard: string }> = {
      // Customer with demo-only access (no student created yet)
      'demo@example.com': { password: 'demo123', hasStudent: false, dashboard: '/dashboard/customer' },
      // Customer with full access (student created after payment)
      'parent@demo.com': { password: 'parent123', hasStudent: true, dashboard: '/dashboard/parent' },
      // Coach account
      'coach@demo.com': { password: 'coach123', hasStudent: false, dashboard: '/dashboard/coach' },
      // Admin account
      'admin@demo.com': { password: 'admin123', hasStudent: false, dashboard: '/dashboard/admin' },
    };

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Normalize email to lowercase for comparison
      const normalizedEmail = formData.email.toLowerCase().trim();
      const account = demoAccounts[normalizedEmail];
      
      if (account && formData.password === account.password) {
        setToast({ message: 'Login successful!', type: 'success' });
        setTimeout(() => {
          router.push(account.dashboard);
        }, 1000);
      } else {
        setToast({ message: 'Invalid email or password. Try demo accounts below.', type: 'error' });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-blue to-primary-olive py-12 px-4 sm:px-6 lg:px-8">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <img 
            src="/imgs.png" 
            alt="Indian Chess Academy" 
            className="mx-auto w-20 h-20 mb-4 object-contain"
          />
          <h1 className="text-3xl font-heading font-bold text-primary-blue mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to your ICA account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                className="w-4 h-4 text-primary-orange border-gray-300 rounded focus:ring-primary-orange"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>

            <Link href="/auth/forgot-password" className="text-sm text-primary-orange hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            New to ICA?{' '}
            <Link href="/booking/demo" className="text-primary-orange font-semibold hover:underline">
              Book a free demo
            </Link>
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-3 text-center">Demo Accounts (For Testing)</p>
          <div className="space-y-2 text-xs">
            <div className="p-2 bg-yellow-50 rounded border border-yellow-200">
              <p className="font-semibold text-yellow-900">Customer (Demo Only - Before Payment):</p>
              <p className="text-yellow-700">Email: demo@example.com</p>
              <p className="text-yellow-700">Password: demo123</p>
              <p className="text-xs text-yellow-600 mt-1">Limited access - demo session only</p>
            </div>
            <div className="p-2 bg-green-50 rounded border border-green-200">
              <p className="font-semibold text-green-900">Parent (Full Access - After Payment):</p>
              <p className="text-green-700">Email: parent@demo.com</p>
              <p className="text-green-700">Password: parent123</p>
              <p className="text-xs text-green-600 mt-1">Student created - all features unlocked</p>
            </div>
            <div className="p-2 bg-purple-50 rounded">
              <p className="font-semibold text-purple-900">Coach:</p>
              <p className="text-purple-700">Email: coach@demo.com</p>
              <p className="text-purple-700">Password: coach123</p>
            </div>
            <div className="p-2 bg-orange-50 rounded">
              <p className="font-semibold text-orange-900">Admin:</p>
              <p className="text-orange-700">Email: admin@demo.com</p>
              <p className="text-orange-700">Password: admin123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
