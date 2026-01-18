'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect after 3 seconds
    const timer = setTimeout(() => {
      router.push('/booking/demo');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-blue to-primary-olive py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <img 
            src="/imgs.png" 
            alt="Indian Chess Academy" 
            className="mx-auto w-20 h-20 mb-4 object-contain"
          />
          <h1 className="text-3xl font-heading font-bold text-primary-blue mb-4">
            Welcome to ICA! 👋
          </h1>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <p className="text-gray-700 mb-4">
              Accounts are created automatically when you <strong className="text-primary-blue">book your free demo session</strong>.
            </p>
            <div className="space-y-2 text-sm text-gray-600 text-left">
              <p className="flex items-start">
                <span className="text-primary-orange font-bold mr-2">1.</span>
                Book a free demo session
              </p>
              <p className="flex items-start">
                <span className="text-primary-orange font-bold mr-2">2.</span>
                Your account is created instantly
              </p>
              <p className="flex items-start">
                <span className="text-primary-orange font-bold mr-2">3.</span>
                Choose login method (Magic Link or Password)
              </p>
              <p className="flex items-start">
                <span className="text-primary-orange font-bold mr-2">4.</span>
                Access your demo dashboard
              </p>
            </div>
          </div>

          <Button 
            onClick={() => router.push('/booking/demo')}
            className="w-full mb-4"
          >
            Book Free Demo & Create Account
          </Button>

          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button 
              onClick={() => router.push('/auth/login')}
              className="text-primary-orange font-semibold hover:underline"
            >
              Sign in
            </button>
          </p>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Redirecting to demo booking in <span className="font-semibold text-primary-orange">3 seconds</span>...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />

          <div>
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              required
            />
            {formData.password && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded ${
                        i < passwordStrength ? strengthColors[passwordStrength - 1] : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-600">
                  Password strength: {strengthLabels[passwordStrength - 1] || 'Too weak'}
                </p>
              </div>
            )}
          </div>

          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary-orange font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
