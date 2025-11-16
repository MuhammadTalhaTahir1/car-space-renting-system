'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { AuthGuard } from '@/components/AuthGuard';
import { useProviderProfile } from '@/features/provider/hooks';
import { ProviderPendingNotice } from '@/components/ProviderPendingNotice';
import { useLogout } from '@/features/auth/hooks';

const mockSpaces = [
  { 
    id: 1, 
    location: 'Downtown Central', 
    price: 5, 
    status: 'Active', 
    bookings: 12, 
    revenue: 240,
    description: 'Secure covered parking space in the heart of downtown.',
  },
  { 
    id: 2, 
    location: 'Shopping Mall Parking', 
    price: 3, 
    status: 'Active', 
    bookings: 8, 
    revenue: 96,
    description: 'Convenient parking near shopping district.',
  },
  { 
    id: 3, 
    location: 'Business District', 
    price: 6, 
    status: 'Pending', 
    bookings: 0, 
    revenue: 0,
    description: 'Prime location in business district.',
  },
  { 
    id: 4, 
    location: 'Residential Area', 
    price: 4, 
    status: 'Active', 
    bookings: 5, 
    revenue: 80,
    description: 'Spacious parking in quiet residential neighborhood.',
  },
];

export default function SpacesPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'pending' | 'inactive'>('all');

  const filteredSpaces = filter === 'all' 
    ? mockSpaces 
    : mockSpaces.filter(space => space.status.toLowerCase() === filter);
  const router = useRouter();
  const { data, isLoading, isError } = useProviderProfile();
  const logoutMutation = useLogout();
  const status = data?.profile.status;

  return (
    <AuthGuard allowedRoles={['provider']}>
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center text-white/80">
          Loading provider spaces...
        </div>
      ) : isError || !status ? (
        <div className="min-h-screen flex items-center justify-center text-white/80">
          Unable to load provider profile. Please try again later.
        </div>
      ) : status !== 'approved' ? (
        <ProviderPendingNotice
          onLogout={() =>
            logoutMutation.mutate(undefined, { onSuccess: () => router.push('/') })
          }
          isLoggingOut={logoutMutation.isPending}
        />
      ) : (
      <div className="min-h-screen py-8 sm:py-12 lg:py-16 px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full">
      <div className="mb-8 sm:mb-12">
        <Link href="/provider/dashboard" className="inline-flex items-center text-blue-300 hover:text-blue-400 mb-4 transition-colors">
          ← Back to Dashboard
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
              Manage Parking Spaces
            </h1>
            <p className="text-base sm:text-lg text-white/70">
              View and manage your parking space listings
            </p>
          </div>
          <Link href="/provider/spaces/new">
            <Button variant="secondary">Add New Space</Button>
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-8 overflow-x-auto">
        {[
          { key: 'all', label: 'All Spaces', count: mockSpaces.length },
          { key: 'active', label: 'Active', count: mockSpaces.filter(s => s.status === 'Active').length },
          { key: 'pending', label: 'Pending', count: mockSpaces.filter(s => s.status === 'Pending').length },
          { key: 'inactive', label: 'Inactive', count: mockSpaces.filter(s => s.status === 'Inactive').length },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as typeof filter)}
            className={`p-2 px-6 py-3 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
              filter === tab.key
                ? 'bg-blue-500 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/15'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Spaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpaces.map((space) => (
          <Card key={space.id} hover className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{space.location}</h3>
                <p className="text-sm text-white/70 mb-3 line-clamp-2">{space.description}</p>
              </div>
              <span 
                className="px-3 py-1 rounded text-xs font-medium whitespace-nowrap p-4"
                style={{
                  background: space.status === 'Active' 
                    ? 'rgba(34, 197, 94, 0.2)' 
                    : space.status === 'Pending'
                    ? 'rgba(251, 191, 36, 0.2)'
                    : 'rgba(239, 68, 68, 0.2)',
                  color: space.status === 'Active' 
                    ? '#86efac' 
                    : space.status === 'Pending'
                    ? '#fde047'
                    : '#fca5a5',
                }}
              >
                {space.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-xs text-white/60 mb-1">Price</div>
                <div className="text-lg font-bold text-white">${space.price}/hr</div>
              </div>
              <div>
                <div className="text-xs text-white/60 mb-1">Bookings</div>
                <div className="text-lg font-bold text-white">{space.bookings}</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-xs text-white/60 mb-1">Revenue</div>
              <div className="text-lg font-bold text-green-400">${space.revenue}</div>
            </div>

            <div className="flex gap-6 pt-4 border-t border-white/10">
              <Link href={`/provider/spaces/${space.id}/edit`} className="flex-1">
                <Button variant="outline" fullWidth size="sm">Edit</Button>
              </Link>
              <button
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all"
                style={{
                  background: space.status === 'Active' 
                    ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, rgba(220, 38, 38, 0.2) 100%)'
                    : 'linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(22, 163, 74, 0.2) 100%)',
                  border: `1px solid ${space.status === 'Active' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`,
                }}
              >
                {space.status === 'Active' ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredSpaces.length === 0 && (
        <Card className="p-12 text-center">
          <div className="text-5xl mb-4">🚗</div>
          <h3 className="text-xl font-bold text-white mb-2">No spaces found</h3>
          <p className="text-white/70 mb-6">
            {filter === 'all' 
              ? "You haven't listed any parking spaces yet."
              : `No ${filter} spaces found.`}
          </p>
          <Link href="/provider/spaces/new">
            <Button variant="secondary">Add Your First Space</Button>
          </Link>
        </Card>
      )}
      </div>
      )}
    </AuthGuard>
  );
}

