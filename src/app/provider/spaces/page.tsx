'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { AuthGuard } from '@/components/AuthGuard';
import { useProviderProfile, useProviderSpaces } from '@/features/provider/hooks';
import { ProviderPendingNotice } from '@/components/ProviderPendingNotice';
import { useLogout } from '@/features/auth/hooks';
import type { ProviderSpaceSummary } from '@/features/provider/api';

type FilterKey = 'all' | 'active' | 'pending' | 'inactive';

function getStatusMeta(space: ProviderSpaceSummary) {
  if (!space.isActive) {
    return {
      label: 'Inactive',
      bg: 'rgba(148, 163, 184, 0.2)',
      color: '#cbd5f5',
    };
  }

  switch (space.status) {
    case 'approved':
      return {
        label: 'Active',
        bg: 'rgba(34, 197, 94, 0.2)',
        color: '#86efac',
      };
    case 'pending':
      return {
        label: 'Pending approval',
        bg: 'rgba(251, 191, 36, 0.2)',
        color: '#fde047',
      };
    case 'rejected':
      return {
        label: 'Rejected',
        bg: 'rgba(239, 68, 68, 0.2)',
        color: '#fca5a5',
      };
    default:
      return {
        label: space.status,
        bg: 'rgba(148, 163, 184, 0.2)',
        color: '#cbd5f5',
      };
  }
}

function formatCurrency(value: number, currency: string) {
  try {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(value);
  } catch {
    return `$${value}`;
  }
}

export default function SpacesPage() {
  const [filter, setFilter] = useState<FilterKey>('all');
  const router = useRouter();
  const { data, isLoading, isError } = useProviderProfile();
  const spacesQuery = useProviderSpaces();
  const logoutMutation = useLogout();

  const status = data?.profile.status;
  const spaces = spacesQuery.data ?? [];

  const filteredSpaces = useMemo(() => {
    switch (filter) {
      case 'active':
        return spaces.filter((space) => space.status === 'approved' && space.isActive);
      case 'pending':
        return spaces.filter((space) => space.status === 'pending');
      case 'inactive':
        return spaces.filter((space) => !space.isActive);
      default:
        return spaces;
    }
  }, [spaces, filter]);

  const filterTabs: Array<{ key: FilterKey; label: string; count: number }> = useMemo(() => {
    const counts: Record<FilterKey, number> = {
      all: spaces.length,
      active: spaces.filter((space) => space.status === 'approved' && space.isActive).length,
      pending: spaces.filter((space) => space.status === 'pending').length,
      inactive: spaces.filter((space) => !space.isActive).length,
    };

    return [
      { key: 'all', label: 'All Spaces', count: counts.all },
      { key: 'active', label: 'Active', count: counts.active },
      { key: 'pending', label: 'Pending', count: counts.pending },
      { key: 'inactive', label: 'Inactive', count: counts.inactive },
    ];
  }, [spaces]);

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
            <Link
              href="/provider/dashboard"
              className="inline-flex items-center text-blue-300 hover:text-blue-400 mb-4 transition-colors"
            >
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
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
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

          {spacesQuery.isLoading ? (
            <div className="min-h-[200px] flex items-center justify-center text-white/70">
              Loading spaces...
            </div>
          ) : spacesQuery.isError ? (
            <Card className="p-8 text-center text-red-200 border-red-500/40 bg-red-500/10">
              Unable to load spaces. Please try again later.
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSpaces.map((space) => {
                  const statusMeta = getStatusMeta(space);
                  return (
                    <Card key={space.id} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1 pr-4">
                          <h3 className="text-xl font-bold text-white mb-2">
                            {space.title}
                          </h3>
                          <p className="text-sm text-white/60">
                            {[space.city, space.state].filter(Boolean).join(', ') || 'Location TBD'}
                          </p>
                        </div>
                        <span
                          className="px-3 py-1 rounded text-xs font-medium whitespace-nowrap"
                          style={{
                            background: statusMeta.bg,
                            color: statusMeta.color,
                          }}
                        >
                          {statusMeta.label}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-xs text-white/60 mb-1">Hourly rate</div>
                          <div className="text-lg font-bold text-white">
                            {formatCurrency(space.hourlyRate, space.currency)}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-white/60 mb-1">Created</div>
                          <div className="text-sm font-medium text-white/80">
                            {new Date(space.createdAt).toLocaleDateString('en-AU', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-6 pt-4 border-t border-white/10">
                        <Link href={`/provider/spaces/${space.id}/edit`} className="flex-1">
                          <Button variant="outline" fullWidth size="sm">
                            Edit
                          </Button>
                        </Link>
                        <button
                          className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all"
                          style={{
                            background: space.isActive
                              ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, rgba(220, 38, 38, 0.2) 100%)'
                              : 'linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(22, 163, 74, 0.2) 100%)',
                            border: `1px solid ${
                              space.isActive
                                ? 'rgba(239, 68, 68, 0.3)'
                                : 'rgba(34, 197, 94, 0.3)'
                            }`,
                            opacity: 0.6,
                            cursor: 'not-allowed',
                          }}
                          title="Activation toggles coming soon"
                        >
                          {space.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {filteredSpaces.length === 0 && (
                <Card className="p-12 text-center mt-10">
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
            </>
          )}
        </div>
      )}
    </AuthGuard>
  );
}

