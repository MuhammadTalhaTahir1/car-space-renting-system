'use client';

import { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Handle registration logic here
      console.log('Register:', formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 sm:py-16 px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full">
      <div className="w-full max-w-3xl space-y-8 animate-fade-in-up">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Create Your Account
          </h1>
          <p className="text-base sm:text-lg text-white/80">Join ParkSpace and start booking parking spaces</p>
        </div>

        <Card className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="First Name"
                type="text"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                error={errors.firstName}
              />

              <Input
                label="Last Name"
                type="text"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                error={errors.lastName}
              />
            </div>

            <Input
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              error={errors.phone}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Minimum 8 characters"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              error={errors.confirmPassword}
            />

            <div className="flex items-start pt-2">
              <input
                type="checkbox"
                className="mt-1 w-4 h-4 rounded bg-white/10 border border-white/20 text-blue-600 focus:ring-blue-500 focus:ring-1 cursor-pointer"
                required
              />
              <label className="ml-2 text-sm text-white/80 leading-relaxed">
                I agree to the{' '}
                <Link href="/terms" className="text-white font-semibold hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-white font-semibold hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button type="submit" fullWidth size="lg" className="mt-4">
              Create Account
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/20 text-center">
            <p className="text-white/80 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-white font-semibold hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
