'use client';

import { useState } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

// Mock data for dashboard
const stats = {
  totalUsers: 1248,
  totalSpaces: 342,
  activeBookings: 89,
  revenue: 12450,
  pendingApprovals: 12,
  systemStatus: 'Operational',
};

const recentActivities = [
  { id: 1, type: 'booking', user: 'John Doe', action: 'Booked space', location: 'Downtown Central', time: '2 minutes ago' },
  { id: 2, type: 'registration', user: 'Jane Smith', action: 'New user registered', location: '-', time: '15 minutes ago' },
  { id: 3, type: 'space', user: 'Mike Johnson', action: 'New space listed', location: 'Business District', time: '1 hour ago' },
  { id: 4, type: 'payment', user: 'Sarah Williams', action: 'Payment processed', location: 'Shopping Mall', time: '2 hours ago' },
  { id: 5, type: 'review', user: 'David Brown', action: 'Left a review', location: 'Airport Terminal', time: '3 hours ago' },
];

const quickAccessItems = [
  {
    title: 'Reports',
    description: 'View detailed analytics and reports',
    icon: '📊',
    href: '/admin/reports',
    bgGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.1) 100%)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  {
    title: 'User Activities',
    description: 'Monitor user actions and activities',
    icon: '👥',
    href: '/admin/users',
    bgGradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(124, 58, 237, 0.1) 100%)',
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  {
    title: 'System Settings',
    description: 'Manage system configuration',
    icon: '⚙️',
    href: '/admin/settings',
    bgGradient: 'linear-gradient(135deg, rgba(20, 184, 166, 0.2) 0%, rgba(13, 148, 136, 0.1) 100%)',
    borderColor: 'rgba(20, 184, 166, 0.3)',
  },
];

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  return (
    <div className="min-h-screen py-8 sm:py-12 lg:py-16 px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full">
      {/* Header Section */}
      <div className="mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-base sm:text-lg text-white/70">
              Monitor and manage operations efficiently
            </p>
          </div>
          <div className="flex items-center gap-8">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
              }}
            >
              <option value="today" className="bg-slate-900">Today</option>
              <option value="week" className="bg-slate-900">This Week</option>
              <option value="month" className="bg-slate-900">This Month</option>
              <option value="year" className="bg-slate-900">This Year</option>
            </select>
            <Link href="/admin/login">
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 mb-8 sm:mb-12">
        <Card hover className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl sm:text-3xl">👥</div>
            <div className="text-xs sm:text-sm text-white/60">Users</div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stats.totalUsers.toLocaleString()}</div>
          <div className="text-xs text-green-400">+12% from last month</div>
        </Card>

        <Card hover className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl sm:text-3xl">🚗</div>
            <div className="text-xs sm:text-sm text-white/60">Spaces</div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stats.totalSpaces}</div>
          <div className="text-xs text-green-400">+8% from last month</div>
        </Card>

        <Card hover className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl sm:text-3xl">📅</div>
            <div className="text-xs sm:text-sm text-white/60">Bookings</div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stats.activeBookings}</div>
          <div className="text-xs text-blue-400">Active now</div>
        </Card>

        <Card hover className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl sm:text-3xl">💰</div>
            <div className="text-xs sm:text-sm text-white/60">Revenue</div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white mb-1">${stats.revenue.toLocaleString()}</div>
          <div className="text-xs text-green-400">+24% from last month</div>
        </Card>

        <Card hover className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl sm:text-3xl">⏳</div>
            <div className="text-xs sm:text-sm text-white/60">Pending</div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stats.pendingApprovals}</div>
          <div className="text-xs text-yellow-400">Requires attention</div>
        </Card>

        <Card hover className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl sm:text-3xl">✅</div>
            <div className="text-xs sm:text-sm text-white/60">Status</div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white mb-1">Online</div>
          <div className="text-xs text-green-400">{stats.systemStatus}</div>
        </Card>
      </div>

      {/* Quick Access Cards */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickAccessItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <Card hover className="p-6 cursor-pointer" style={{
                borderColor: item.borderColor,
              }}>
                <div className="flex items-start gap-4">
                  <div 
                    className="text-4xl sm:text-5xl p-3 rounded-xl"
                    style={{
                      background: item.bgGradient,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activities and System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Recent Activities */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Activities</h2>
            <Link 
              href="/admin/users"
              className="text-sm text-blue-300 hover:text-blue-400 transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="p-4 rounded-lg border border-white/10 hover:border-white/20 transition-all"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">
                        {activity.type === 'booking' && '📅'}
                        {activity.type === 'registration' && '👤'}
                        {activity.type === 'space' && '🚗'}
                        {activity.type === 'payment' && '💳'}
                        {activity.type === 'review' && '⭐'}
                      </span>
                      <span className="font-semibold text-white text-sm">{activity.user}</span>
                    </div>
                    <p className="text-sm text-white/80 mb-1">{activity.action}</p>
                    {activity.location !== '-' && (
                      <p className="text-xs text-white/60">📍 {activity.location}</p>
                    )}
                  </div>
                  <span className="text-xs text-white/90 whitespace-nowrap">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* System Monitoring */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-white mb-6">System Monitoring</h2>
          <div className="space-y-6">
            {/* System Status */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-white">System Health</span>
                <span className="text-xs text-white bg-green-500/20 px-2 py-1 rounded">Healthy</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: '98%' }}
                />
              </div>
            </div>

            {/* Server Status */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-white">Server Uptime</span>
                <span className="text-xs text-white/60">99.9%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: '99.9%' }}
                />
              </div>
            </div>

            {/* Database Status */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-white">Database</span>
                <span className="text-xs text-white bg-green-500/20 px-2 py-1 rounded">Connected</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-teal-500 h-2 rounded-full transition-all"
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            {/* API Response Time */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-white">API Response Time</span>
                <span className="text-xs text-white/60">120ms</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all"
                  style={{ width: '95%' }}
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-white/10">
              <h3 className="text-sm font-semibold text-white mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-8">
                <Link href="/admin/reports">
                  <button
                    className="w-full px-4 py-2 rounded-lg text-sm font-medium text-white transition-all"
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
                    Generate Report
                  </button>
                </Link>
                <Link href="/admin/settings">
                  <button
                    className="w-full px-4 py-2 rounded-lg text-sm font-medium text-white transition-all"
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
                    System Settings
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

