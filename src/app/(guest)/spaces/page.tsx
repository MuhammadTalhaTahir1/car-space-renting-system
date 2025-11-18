'use client';

import Link from 'next/link';

import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import SpaceCard from '@/components/ui/SpaceCard';
import { usePublicSpaces } from '@/features/spaces/hooks';
import { useCurrentUser } from '@/features/auth/hooks';
import { useAuthStore } from '@/stores/authStore';

export default function PublicSpacesPage() {
  const { data, isLoading, isError } = usePublicSpaces();
  const spaces = data ?? [];
  useCurrentUser();
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen py-12 lg:py-16 px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full">
      <header className="mb-10 sm:mb-14">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">Browse Parking Spaces</h1>
        <p className="text-white/70 text-base sm:text-lg max-w-3xl">
          Discover verified spaces available for instant booking. Every listing is approved by our admin team and
          actively managed by providers.
        </p>
      </header>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="p-6 border-white/10 bg-white/5 h-72">
              <div className="w-full h-full animate-pulse bg-white/10 rounded-lg" />
            </Card>
          ))}
        </div>
      ) : isError ? (
        <Card className="p-8 text-center text-red-200 border-red-500/40 bg-red-500/10">
          Unable to load spaces right now. Please try again later.
        </Card>
      ) : spaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {spaces.map((space) => (
            <SpaceCard
              key={space.id}
              id={space.id}
              title={space.title}
              hourlyRate={space.hourlyRate}
              currency={space.currency}
              description={space.description}
              address={space.address}
              city={space.city}
              state={space.state}
              amenities={space.amenities}
              image={space.images?.[0]}
              providerBadge={space.providerBadge}
              ratingAverage={space.ratingAverage}
              ratingCount={space.ratingCount}
              isActive
              href={`/spaces/${space.id}`}
            />
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <div className="text-5xl mb-4">🚗</div>
          <h2 className="text-2xl font-bold text-white mb-2">No spaces available yet</h2>
          <p className="text-white/70 mb-6">
            New parking spaces are added regularly. {!isAuthenticated && 'Create an account to get notified when new listings appear.'}
          </p>
          {!isAuthenticated && (
            <Link href="/register">
              <Button variant="secondary">Create a free account</Button>
            </Link>
          )}
        </Card>
      )}
    </div>
  );
}


