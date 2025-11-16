'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { AuthGuard } from '@/components/AuthGuard';
import { useProviderProfile } from '@/features/provider/hooks';
import { ProviderPendingNotice } from '@/components/ProviderPendingNotice';
import { useLogout } from '@/features/auth/hooks';

// Mock data for provider dashboard
const stats = {
  totalSpaces: 8,
  activeBookings: 12,
  totalRevenue: 2450,
  pendingApprovals: 2,
  rating: 4.8,
  totalReviews: 42,
};

const recentBookings = [
  { id: 1, space: 'Downtown Central', customer: 'John Doe', date: '2024-02-20', time: '10:00 AM - 2:00 PM', amount: 20, status: 'Active' },
  { id: 2, space: 'Shopping Mall Parking', customer: 'Jane Smith', date: '2024-02-19', time: '9:00 AM - 5:00 PM', amount: 24, status: 'Completed' },
  { id: 3, space: 'Business District', customer: 'Mike Johnson', date: '2024-02-18', time: '11:00 AM - 3:00 PM', amount: 16, status: 'Completed' },
  { id: 4, space: 'Downtown Central', customer: 'Sarah Williams', date: '2024-02-17', time: '2:00 PM - 6:00 PM', amount: 16, status: 'Completed' },
];

const quickActions = [
  {
    title: 'Add New Space',
    description: 'List a new parking space',
    icon: '➕',
    href: '/provider/spaces/new',
    bgGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.1) 100%)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  {
    title: 'Manage Spaces',
    description: 'View and edit your parking spaces',
    icon: '🚗',
    href: '/provider/spaces',
    bgGradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(124, 58, 237, 0.1) 100%)',
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  {
    title: 'Profile Settings',
    description: 'Update your provider profile',
    icon: '⚙️',
    href: '/provider/profile',
    bgGradient: 'linear-gradient(135deg, rgba(20, 184, 166, 0.2) 0%, rgba(13, 148, 136, 0.1) 100%)',
    borderColor: 'rgba(20, 184, 166, 0.3)',
  },
];

export default function ProviderDashboard() {
  const router = useRouter();
  const { data, isLoading, isError } = useProviderProfile();
  const logoutMutation = useLogout();
  const profileStatus = data?.profile.status;

  return (
    <AuthGuard allowedRoles={['provider']}>
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center text-white/80">
          Loading your provider account...
        </div>
      ) : isError || !profileStatus ? (
        <div className="min-h-screen flex items-center justify-center text-white/80">
          Unable to load provider profile. Please try again later.
        </div>
      ) : profileStatus !== 'approved' ? (
        <ProviderPendingNotice
          onLogout={() =>
            logoutMutation.mutate(undefined, {
              onSuccess: () => router.push('/'),
            })
          }
          isLoggingOut={logoutMutation.isPending}
        />
      ) : (
        <div className="min-h-screen py-8 sm:py-12 lg:py-16 px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full">
      {/* Header Section */}
      <div className="mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
              Provider Dashboard
            </h1>
            <p className="text-base sm:text-lg text-white/70">
              Manage your parking spaces and bookings
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-lg bg-green-500/20 border border-green-400/30">
              <span className="text-green-400 text-sm font-semibold">✅ Approved</span>
            </div>
            <Link href="/provider/profile">
              <Button variant="outline" size="sm">
                View Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Account Status Banner */}
      {/* Account Status Banner removed for approved */}
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 mb-8 sm:mb-12">
        <Card hover className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl sm:text-3xl">🚗</div>
            <div className="text-xs sm:text-sm text-white/60">Total Spaces</div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stats.totalSpaces}</div>
          <div className="text-xs text-blue-400">Active listings</div>
        </Card>

        <Card hover className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl sm:text-3xl">📅</div>
            <div className="text-xs sm:text-sm text-white/60">Active Bookings</div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stats.activeBookings}</div>
          <div className="text-xs text-green-400">This month</div>
        </Card>

        <Card hover className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl sm:text-3xl">💰</div>
            <div className="text-xs sm:text-sm text-white/60">Total Revenue</div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white mb-1">${stats.totalRevenue.toLocaleString()}</div>
          <div className="text-xs text-green-400">+18% from last month</div>
        </Card>

        <Card hover className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl sm:text-3xl">⏳</div>
            <div className="text-xs sm:text-sm text-white/60">Pending</div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stats.pendingApprovals}</div>
          <div className="text-xs text-yellow-400">Awaiting approval</div>
        </Card>

        <Card hover className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl sm:text-3xl">⭐</div>
            <div className="text-xs sm:text-sm text-white/60">Rating</div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stats.rating}</div>
          <div className="text-xs text-yellow-400">{stats.totalReviews} reviews</div>
        </Card>

        <Card hover className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl sm:text-3xl">📊</div>
            <div className="text-xs sm:text-sm text-white/60">Occupancy</div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white mb-1">78%</div>
          <div className="text-xs text-blue-400">This week</div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Card hover className="p-6 cursor-pointer" style={{
                borderColor: action.borderColor,
              }}>
                <div className="flex items-start gap-4">
                  <div 
                    className="text-4xl sm:text-5xl p-3 rounded-xl"
                    style={{
                      background: action.bgGradient,
                    }}
                  >
                    {action.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{action.title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{action.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Bookings and Profile Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Recent Bookings */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Bookings</h2>
            <Link 
              href="/provider/bookings"
              className="text-sm text-blue-300 hover:text-blue-400 transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="p-4 rounded-lg border border-white/10 hover:border-white/20 transition-all"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-white text-sm">{booking.space}</span>
                      <span 
                        className="px-2 py-1 rounded text-xs font-medium"
                        style={{
                          background: booking.status === 'Active' 
                            ? 'rgba(34, 197, 94, 0.2)' 
                            : 'rgba(100, 116, 139, 0.2)',
                          color: booking.status === 'Active' ? '#86efac' : '#cbd5e1',
                        }}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-xs text-white/70 mb-1">👤 {booking.customer}</p>
                    <p className="text-xs text-white/60">📅 {booking.date} • {booking.time}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">${booking.amount}</div>
                    <div className="text-xs text-white/60">Earned</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Profile Status */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Profile Status</h2>
          <div className="space-y-6">
            {/* Profile Completion */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-white">Profile Completion</span>
                <span className="text-xs text-white/60">85%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: '85%' }}
                />
              </div>
            </div>

            {/* Verification Status */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-white">Account Verification</span>
                <span className="text-xs text-white bg-green-500/20 px-2 py-1 rounded">Approved</span>
              </div>
              <p className="text-xs text-white/60 mt-2">
                Your documents are verified and you&apos;re ready to accept bookings.
              </p>
            </div>

            {/* Quick Profile Actions */}
            <div className="pt-4 border-t border-white/10">
              <h3 className="text-sm font-semibold text-white mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-8">
                <Link href="/provider/profile">
                  <button
                    className="w-full px-4 py-2 rounded-lg text-sm font-medium text-white transition-all text-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(37, 99, 235, 0.2) 100%)',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(37, 99, 235, 0.3) 100%)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(37, 99, 235, 0.2) 100%)';
                    }}
                  >
                    Complete Profile
                  </button>
                </Link>
                <Link href="/provider/spaces/new">
                  <button
                    className="w-full px-4 py-2 rounded-lg text-sm font-medium text-white transition-all text-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.3) 0%, rgba(13, 148, 136, 0.2) 100%)',
                      border: '1px solid rgba(20, 184, 166, 0.3)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(20, 184, 166, 0.4) 0%, rgba(13, 148, 136, 0.3) 100%)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(20, 184, 166, 0.3) 0%, rgba(13, 148, 136, 0.2) 100%)';
                    }}
                  >
                    Add New Space
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
        </div>
      </div>
      )}
    </AuthGuard>
  );
}

