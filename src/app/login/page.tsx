'use client';

import { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation
    const newErrors: { email?: string; password?: string } = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Handle login logic here
      console.log('Login:', formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 sm:py-16 px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full">
      <div className="w-full max-w-lg space-y-8 animate-fade-in-up">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-base sm:text-lg text-white/80">Sign in to your account</p>
        </div>

        <Card className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
            />

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded bg-white/10 border border-white/20 text-blue-600 focus:ring-blue-500 focus:ring-1 cursor-pointer"
                />
                <span className="ml-2 text-sm text-white/80 group-hover:text-white transition-colors">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-white/80 hover:text-white transition-colors font-semibold"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" fullWidth size="lg" className="mt-4">
              Sign In
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-white/80 text-center text-sm mb-4">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-white font-semibold hover:underline">
                Register here
              </Link>
            </p>

            <div className="grid grid-cols-2 gap-4">
              <Link href="/provider/register">
                <Button variant="outline" fullWidth size="md">
                  Provider
                </Button>
              </Link>
              <Link href="/admin/login">
                <Button variant="outline" fullWidth size="md">
                  Admin
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
