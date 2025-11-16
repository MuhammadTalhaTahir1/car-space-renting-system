'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { AuthGuard } from '@/components/AuthGuard';
import { useProviderProfile } from '@/features/provider/hooks';
import { ProviderPendingNotice } from '@/components/ProviderPendingNotice';
import { useLogout } from '@/features/auth/hooks';

export default function ProviderProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: 'ABC Parking Inc.',
    contactName: 'John Doe',
    email: 'john@abcparking.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    businessType: 'company',
    bankAccount: '**** **** **** 1234',
    taxId: '12-3456789',
  });

  const [isEditing, setIsEditing] = useState(false);
  const { data, isLoading, isError } = useProviderProfile();
  const logoutMutation = useLogout();
  const status = data?.profile.status;

  if (isLoading) {
    return (
      <AuthGuard allowedRoles={['provider']}>
        <div className="min-h-screen flex items-center justify-center text-white/80">
          Loading provider profile...
        </div>
      </AuthGuard>
    );
  }

  if (isError || !status) {
    return (
      <AuthGuard allowedRoles={['provider']}>
        <div className="min-h-screen flex items-center justify-center text-white/80">
          Unable to load provider profile. Please try again later.
        </div>
      </AuthGuard>
    );
  }

  if (status !== 'approved') {
    return (
      <AuthGuard allowedRoles={['provider']}>
        <ProviderPendingNotice
          onLogout={() =>
            logoutMutation.mutate(undefined, {
              onSuccess: () => router.push('/'),
            })
          }
          isLoggingOut={logoutMutation.isPending}
        />
      </AuthGuard>
    );
  }

  return (
    <AuthGuard allowedRoles={['provider']}>
      <div className="min-h-screen py-8 sm:py-12 lg:py-16 px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full">
      <div className="mb-8 sm:mb-12">
        <Link href="/provider/dashboard" className="inline-flex items-center text-blue-300 hover:text-blue-400 mb-4 transition-colors">
          ← Back to Dashboard
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
              Provider Profile
            </h1>
            <p className="text-base sm:text-lg text-white/70">
              Manage your provider account information
            </p>
          </div>
          <Button 
            variant={isEditing ? "outline" : "secondary"} 
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>
      </div>

      {/* Account Status */}
      <Card className="p-6 mb-8" style={{ borderColor: 'rgba(34, 197, 94, 0.3)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-3xl">✅</div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Account Status: Approved</h3>
              <p className="text-sm text-white/70">
                Your provider account is active. You can now manage listings, bookings, and payouts from your dashboard.
              </p>
            </div>
          </div>
          <div className="px-4 py-2 rounded-lg bg-green-500/20 border border-green-400/30">
            <span className="text-green-400 text-sm font-semibold">Approved</span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Company Information */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-white mb-6">Company Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-white/95 text-sm font-semibold mb-2">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    disabled={!isEditing}
                    onClick={() => setFormData({ ...formData, businessType: 'individual' })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.businessType === 'individual'
                        ? 'border-blue-500/50 bg-blue-500/20'
                        : 'border-white/20 bg-white/5'
                    } text-white ${!isEditing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'}`}
                  >
                    <div className="text-2xl mb-2">👤</div>
                    <div className="font-semibold text-sm">Individual</div>
                  </button>
                  <button
                    type="button"
                    disabled={!isEditing}
                    onClick={() => setFormData({ ...formData, businessType: 'company' })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.businessType === 'company'
                        ? 'border-blue-500/50 bg-blue-500/20'
                        : 'border-white/20 bg-white/5'
                    } text-white ${!isEditing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'}`}
                  >
                    <div className="text-2xl mb-2">🏢</div>
                    <div className="font-semibold text-sm">Company</div>
                  </button>
                </div>
              </div>

              <Input
                label={formData.businessType === 'company' ? 'Company Name' : 'Full Name'}
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                disabled={!isEditing}
              />

              <Input
                label="Contact Name"
                type="text"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                disabled={!isEditing}
              />

              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
              />

              <Input
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </Card>

          {/* Business Location */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-white mb-6">Business Location</h2>
            <div className="space-y-4">
              <Input
                label="Street Address"
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                disabled={!isEditing}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="City"
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  disabled={!isEditing}
                />

                <Input
                  label="State"
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  disabled={!isEditing}
                />

                <Input
                  label="Zip Code"
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </Card>

          {/* Payment Details */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-white mb-6">Payment Details</h2>
            <div className="space-y-4">
              <Input
                label="Bank Account Number"
                type="text"
                value={formData.bankAccount}
                onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                disabled={!isEditing}
              />

              <Input
                label="Tax ID / EIN"
                type="text"
                value={formData.taxId}
                onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                disabled={!isEditing}
              />

              <div className="bg-blue-500/20 border-2 border-blue-400/30 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-white/90 text-sm leading-relaxed flex items-start gap-3">
                  <span className="text-xl">🔒</span>
                  <span>Your payment details are securely encrypted and stored. Funds will be transferred to your account after each successful booking.</span>
                </p>
              </div>
            </div>
          </Card>

          {isEditing && (
            <div className="flex gap-4">
              <Button variant="secondary" size="lg">Save Changes</Button>
              <Button variant="outline" size="lg" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Completion */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">Profile Completion</h3>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/70">Overall</span>
                <span className="text-sm font-bold text-white">85%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: '85%' }}
                />
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Company Info</span>
                <span className="text-white">✓</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Location</span>
                <span className="text-white">✓</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Payment Details</span>
                <span className="text-white">✓</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Verification</span>
                <span className="text-yellow-400">⏳</span>
              </div>
            </div>
          </Card>

          {/* Account Information */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">Account Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-white/70">Account Status</span>
                <span className="text-green-400">Approved</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Member Since</span>
                <span className="text-white">Jan 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Total Spaces</span>
                <span className="text-white">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Total Revenue</span>
                <span className="text-white">$2,450</span>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 mt-4">
            <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3 mt-4">
              <Link href="/provider/spaces/new" >
                <Button variant="outline" fullWidth className="w-full mb-4">Add New Space</Button>
              </Link>
              <Link href="/provider/spaces">
                <Button variant="outline" fullWidth className="w-full mb-4">Manage Spaces</Button>
              </Link>
              <Link href="/provider/settings">
                <Button variant="outline" fullWidth>Settings</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
      </div>
    </AuthGuard>
  );
}

