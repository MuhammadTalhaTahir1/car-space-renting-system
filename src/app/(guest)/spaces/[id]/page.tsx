'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { usePublicSpace } from '@/features/spaces/hooks';

function formatCurrency(value: number | null | undefined, currency: string) {
  if (typeof value !== 'number') {
    return '—';
  }

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

function PublicSpaceDetailContent({ spaceId }: { spaceId: string }) {
  const router = useRouter();
  const { data: space, isLoading, isError } = usePublicSpace(spaceId);
  const [currentImage, setCurrentImage] = useState(0);

  if (!spaceId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white/80">
        Invalid space identifier.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white/80">
        Loading space details...
      </div>
    );
  }

  if (isError || !space) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-white/80">
        Unable to load this space.
        <Button variant="secondary" onClick={() => router.push('/spaces')}>
          Back to spaces
        </Button>
      </div>
    );
  }

  const images = space.images ?? [];
  const imageCount = images.length;
  const safeCurrentIndex = imageCount === 0 ? 0 : Math.min(currentImage, imageCount - 1);
  const hasMultipleImages = imageCount > 1;
  const currentImageSrc = imageCount > 0 ? images[safeCurrentIndex] : '';

  const handlePreviousImage = () => {
    if (!hasMultipleImages) return;
    setCurrentImage((prev) => (prev - 1 + imageCount) % imageCount);
  };

  const handleNextImage = () => {
    if (!hasMultipleImages) return;
    setCurrentImage((prev) => (prev + 1) % imageCount);
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 lg:py-16 px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href="/spaces"
            className="inline-flex items-center text-blue-300 hover:text-blue-200 mb-2 transition-colors"
          >
            ← Back to spaces
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">{space.title}</h1>
          <p className="text-white/70">
            {[space.address, space.city, space.state].filter(Boolean).join(', ') || 'Location not provided'}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 text-sm text-white/70">
          <span>Verified listing</span>
          <span>Updated {new Date(space.updatedAt).toLocaleString('en-AU')}</span>
        </div>
      </div>

      {imageCount > 0 ? (
        <div className="relative flex justify-center">
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-xl border border-white/10"
            style={{ paddingBottom: '56%' }}
          >
            <Image
              key={currentImageSrc}
              src={currentImageSrc}
              alt={`${space.title} photo ${safeCurrentIndex + 1}`}
              fill
              className="object-cover transition-opacity duration-300"
              sizes="(max-width: 768px) 95vw, (max-width: 1280px) 75vw, 960px"
              priority={safeCurrentIndex === 0}
              unoptimized={process.env.NODE_ENV !== 'production'}
            />
          </div>

          {hasMultipleImages && (
            <>
              <button
                type="button"
                onClick={handlePreviousImage}
                className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition"
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={handleNextImage}
                className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition"
                aria-label="Next photo"
              >
                ›
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 text-white text-xs font-medium">
                {safeCurrentIndex + 1} / {imageCount}
              </div>
            </>
          )}
        </div>
      ) : (
        <Card className="p-6 text-white/70 border-white/10 bg-white/5">
          This provider hasn’t uploaded photos yet. Check back soon!
        </Card>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="p-6 xl:col-span-2 space-y-6 border-white/10 bg-white/5">
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">About this space</h2>
            <p className="text-white/70 leading-relaxed">
              {space.description?.trim() ? space.description : 'The provider has not added a detailed description yet.'}
            </p>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-white/10 rounded-lg p-4 bg-white/5">
              <p className="uppercase text-xs text-white/50 mb-1">Hourly Rate</p>
              <p className="text-lg font-semibold text-white">{formatCurrency(space.hourlyRate, space.currency)}</p>
            </div>
            {space.dailyRate !== null && space.dailyRate !== undefined ? (
              <div className="border border-white/10 rounded-lg p-4 bg-white/5">
                <p className="uppercase text-xs text-white/50 mb-1">Daily Rate</p>
                <p className="text-lg font-semibold text-white">{formatCurrency(space.dailyRate, space.currency)}</p>
              </div>
            ) : null}
            <div className="border border-white/10 rounded-lg p-4 bg-white/5">
              <p className="uppercase text-xs text-white/50 mb-1">Capacity</p>
              <p className="text-lg font-semibold text-white">
                {typeof space.capacity === 'number' ? `${space.capacity} vehicles` : 'Not specified'}
              </p>
            </div>
            <div className="border border-white/10 rounded-lg p-4 bg-white/5">
              <p className="uppercase text-xs text-white/50 mb-1">Availability</p>
              <p className="text-lg font-semibold text-white">
                {space.availabilityType === '24_7'
                  ? '24 / 7 Access'
                  : space.availabilityType === 'business_hours'
                    ? 'Business hours'
                    : 'Custom schedule'}
              </p>
            </div>
          </section>

          {space.availabilityType === 'custom' && space.customAvailability.length > 0 ? (
            <section>
              <h3 className="text-lg font-semibold text-white mb-3">Custom availability</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {space.customAvailability.map((entry, index) => (
                  <div key={`${entry.day}-${index}`} className="border border-white/10 rounded-lg p-3 bg-white/5">
                    <p className="text-sm font-medium text-white">{entry.day}</p>
                    <p className="text-sm text-white/70">
                      {entry.startTime} – {entry.endTime}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section>
            <h3 className="text-lg font-semibold text-white mb-3">Amenities</h3>
            {space.amenities.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {space.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="px-3 py-1 rounded-full text-xs uppercase tracking-wide bg-white/10 text-white/80 border border-white/10"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-white/70">No amenities listed.</p>
            )}
          </section>
        </Card>

        <div className="space-y-6">
          <Card className="p-6 border-white/10 bg-white/5 space-y-4">
            <h2 className="text-xl font-semibold text-white">Ready to reserve?</h2>
            <p className="text-sm text-white/70">
              Booking is coming soon. Create an account to stay updated when reservations open for this space.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/register" className="flex-1">
                <Button fullWidth>Register</Button>
              </Link>
              <Link href="/login" className="flex-1">
                <Button variant="outline" fullWidth>
                  Sign In
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="p-6 border-white/10 bg-white/5 space-y-2 text-sm text-white/70">
            <div>
              <span className="text-white/50 uppercase text-xs block">Added</span>
              {new Date(space.createdAt).toLocaleString('en-AU')}
            </div>
            <div>
              <span className="text-white/50 uppercase text-xs block">Last Updated</span>
              {new Date(space.updatedAt).toLocaleString('en-AU')}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function PublicSpaceDetailPage() {
  const params = useParams<{ id: string }>();
  const rawId = params?.id;
  const spaceId = Array.isArray(rawId) ? rawId[0] : rawId ?? '';

  return <PublicSpaceDetailContent key={spaceId} spaceId={spaceId} />;
}


