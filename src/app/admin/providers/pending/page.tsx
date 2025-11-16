'use client';

import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const mockPendingProviders = [
  {
    id: '1',
    businessName: 'Downtown Parking Co.',
    contactName: 'Alex Morgan',
    email: 'alex@downtownparking.com',
    phone: '+1 (555) 123-4567',
    submittedAt: '2025-11-16T10:15:00Z',
    address: '123 Market Street, San Francisco, CA 94103',
    spacesListed: 4,
  },
  {
    id: '2',
    businessName: 'City Center Garage',
    contactName: 'Jamie Lee',
    email: 'jamie@citygarage.io',
    phone: '+1 (555) 987-6543',
    submittedAt: '2025-11-16T08:42:00Z',
    address: '456 Pine Avenue, Los Angeles, CA 90014',
    spacesListed: 2,
  },
  {
    id: '3',
    businessName: 'Harbor Parking Solutions',
    contactName: 'Chris Rivera',
    email: 'chris@harborparking.com',
    phone: '+1 (555) 222-7788',
    submittedAt: '2025-11-15T17:10:00Z',
    address: '789 Harbor Blvd, Seattle, WA 98101',
    spacesListed: 6,
  },
];

export default function PendingProvidersPage() {
  return (
    <div className="min-h-screen py-8 sm:py-12 lg:py-16 px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full">
      <div className="mb-8 sm:mb-12">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center text-blue-300 hover:text-blue-400 mb-4 transition-colors"
        >
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl sm:Text-4xl md:text-5xl font-bold text-white mb-2">
          Pending Provider Approvals
        </h1>
        <p className="text-base sm:text-lg text-white/70">
          Review provider applications and approve or reject them to control marketplace access.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {mockPendingProviders.map((provider) => (
          <Card key={provider.id} className="p-6 space-y-5" hover>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">
                  {provider.businessName}
                </h2>
                <p className="text-sm text-white/70">Contact: {provider.contactName}</p>
              </div>
              <span className="text-xs text-yellow-300 bg-yellow-500/20 border border-yellow-400/30 px-3 py-1 rounded-full">
                Submitted {new Date(provider.submittedAt).toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white/80">
              <div>
                <p className="uppercase text-xs text-white/50">Email</p>
                <p className="font-medium">{provider.email}</p>
              </div>
              <div>
                <p className="uppercase text-xs text-white/50">Phone</p>
                <p className="font-medium">{provider.phone}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="uppercase text-xs text-white/50">Address</p>
                <p className="font-medium">{provider.address}</p>
              </div>
              <div>
                <p className="uppercase text-xs text-white/50">Spaces Listed</p>
                <p className="font-medium">{provider.spacesListed}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-white/10">
              <div className="text-xs text-white/60">
                Approve the provider to allow listings, or reject if details look suspicious.
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="border-red-500/40 text-red-200 hover:bg-red-500/10">
                  Reject
                </Button>
                <Button>
                  Approve
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {mockPendingProviders.length === 0 && (
        <Card className="p-10 text-center mt-10">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-white mb-2">No pending approvals</h2>
          <p className="text-white/70">
            All providers have been reviewed. New applications will appear here automatically.
          </p>
        </Card>
      )}
    </div>
  );
}
