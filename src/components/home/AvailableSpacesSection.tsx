'use client';

import Link from 'next/link';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import SpaceCard from '@/components/ui/SpaceCard';
import { usePublicSpaces } from '@/features/spaces/hooks';

export default function AvailableSpacesSection() {
  const { data, isLoading, isError } = usePublicSpaces();
  const spaces = data ?? [];
  const availableCount = spaces.length;

  return (
    <section
      className="py-16 sm:py-20 lg:py-24 px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full"
      style={{
        background:
          'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(0, 0, 0, 0.03) 100%)',
      }}
    >
      <div className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
              Available Spaces
            </h2>
            <p className="text-base sm:text-lg text-white/70">
              {isLoading
                ? 'Loading spaces...'
                : isError
                ? 'Unable to load spaces right now.'
                : availableCount === 0
                ? 'New spaces coming soon'
                : `${availableCount} spaces available now`}
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="p-6 animate-pulse border-white/10 bg-white/5" />
            ))}
          </div>
        ) : isError ? (
          <Card className="p-6 text-center text-red-200 border-red-500/30 bg-red-500/10">
            Unable to load spaces. Please try again later.
          </Card>
        ) : spaces.length > 0 ? (
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              overflowX: 'auto',
              paddingBottom: '1rem',
              scrollbarWidth: 'thin',
            }}
            className="scrollbar-hide"
          >
            {spaces.map((space) => (
              <div key={space.id} style={{ minWidth: '320px', flexShrink: 0 }}>
                <SpaceCard
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
                />
              </div>
            ))}
          </div>
        ) : (
          <Card className="p-10 text-center">
            <div className="text-5xl mb-4">🚗</div>
            <h3 className="text-2xl font-bold text-white mb-2">No spaces available yet</h3>
            <p className="text-white/70 mb-6">
              Check back soon—new parking spaces are added regularly.
            </p>
          </Card>
        )}

        <div className="text-center mt-8">
          <Link href="/register">
            <Button variant="secondary" size="lg">
              View All Spaces
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
