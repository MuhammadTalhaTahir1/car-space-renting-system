'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation
    const newErrors: { username?: string; password?: string } = {};
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Handle admin login logic here
      console.log('Admin Login:', formData);
      // Redirect to admin dashboard
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-28 sm:py-36 px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full">
      <div className="w-full max-w-lg space-y-16 animate-fade-in-up">
        <div className="text-center">
          <div className="inline-block p-6 rounded-2xl bg-red-500 mb-10 shadow-2xl shadow-red-500/30">
            <span className="text-white text-5xl">🔐</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-8">
            Admin Portal
          </h1>
          <p className="text-2xl sm:text-3xl text-white/80">Secure admin access</p>
        </div>

        <Card className="p-14 sm:p-16 lg:p-20 border-red-500/30">
          <form onSubmit={handleSubmit} className="space-y-10">
            <Input
              label="Admin Username"
              type="text"
              placeholder="admin"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              error={errors.username}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter admin password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
            />

            <div className="flex items-center pt-6">
              <input
                type="checkbox"
                className="w-6 h-6 rounded bg-white/10 border-2 border-white/20 text-red-600 focus:ring-red-500 focus:ring-2 cursor-pointer"
              />
              <span className="ml-4 text-base text-white/80">Remember me</span>
            </div>

            <Button type="submit" fullWidth size="lg" variant="secondary" className="mt-12">
              Sign In as Admin
            </Button>
          </form>

          <div className="mt-12 text-center">
            <Link
              href="/login"
              className="text-base text-white/80 hover:text-white transition-colors font-semibold"
            >
              ← Back to User Login
            </Link>
          </div>

          <div className="mt-12 pt-12 border-t-2 border-white/20">
            <div className="bg-red-500/20 border-2 border-red-400/30 rounded-2xl p-6 backdrop-blur-sm">
              <p className="text-white/90 text-base text-center leading-relaxed">
                ⚠️ This is a restricted area. Unauthorized access is prohibited.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

