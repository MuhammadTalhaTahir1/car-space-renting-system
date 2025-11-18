'use client';

import Link from 'next/link';

import Card from './Card';
import Button from './Button';
import Image from 'next/image';

interface SpaceCardProps {
  id: string;
  title: string;
  hourlyRate: number;
  currency: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  amenities?: string[];
  image?: string;
  isActive?: boolean;
  providerBadge?: string | null;
  ratingAverage?: number;
  ratingCount?: number;
  href?: string;
  ctaLabel?: string;
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

export default function SpaceCard({
  title,
  hourlyRate,
  currency,
  description,
  address,
  city,
  state,
  amenities = [],
  image,
  isActive = true,
  providerBadge,
  ratingAverage,
  ratingCount,
  href,
  ctaLabel = 'View Details',
}: SpaceCardProps) {
  const location = [address, city, state].filter(Boolean).join(', ');

  return (
    <Card hover variant="dark" className="overflow-hidden flex flex-col h-full">
      <div
        style={{
          position: 'relative',
          height: '12rem',
          width: '100%',
          marginBottom: '1rem',
          borderRadius: '0.5rem',
          overflow: 'hidden',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}
      >
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.8) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '3.75rem' }}>🚗</span>
          </div>
        )}
        {!isActive && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                color: 'white',
                fontWeight: 700,
                fontSize: '0.875rem',
                backgroundColor: 'rgba(239, 68, 68, 0.8)',
                padding: '0.375rem 0.75rem',
                borderRadius: '0.25rem',
              }}
            >
              Inactive
            </span>
          </div>
        )}
        {isActive && (
          <div
            style={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              backgroundColor: 'rgba(34, 197, 94, 0.9)',
              backdropFilter: 'blur(4px)',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.25rem 0.5rem',
              borderRadius: '9999px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
          >
            Available
          </div>
        )}
        {providerBadge && (
          <div
            style={{
              position: 'absolute',
              top: '0.5rem',
              left: '0.5rem',
              backgroundColor: 'rgba(59, 130, 246, 0.9)',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '0.25rem 0.5rem',
              borderRadius: '9999px',
            }}
          >
            {providerBadge}
          </div>
        )}
      </div>

      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <h3
          style={{
            color: 'white',
            fontWeight: 700,
            fontSize: '1.125rem',
            marginBottom: '0.5rem',
            lineHeight: 1.25,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.875rem',
            marginBottom: '0.75rem',
          }}
        >
          {location || 'City location coming soon'}
        </p>
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.875rem',
            marginBottom: '1rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.625,
            flexGrow: 1,
          }}
        >
          {description || 'More details available after admin review.'}
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div>
            <span
              style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                display: 'block',
                marginBottom: '0.25rem',
              }}
            >
              Price
            </span>
            <p
              style={{
                color: 'white',
                fontWeight: 700,
                fontSize: '1.25rem',
              }}
            >
              {formatCurrency(hourlyRate, currency)}
              <span style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>/hr</span>
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            {typeof ratingAverage === 'number' && ratingCount !== undefined && ratingCount > 0 ? (
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.75rem' }}>
                ⭐ {ratingAverage.toFixed(1)} ({ratingCount})
              </p>
            ) : (
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.75rem' }}>No reviews yet</p>
            )}
            {href ? (
              <Link href={href}>
                <Button variant="outline" size="sm" className="mt-2">
                  {ctaLabel}
                </Button>
              </Link>
            ) : (
              <Button variant="outline" size="sm" className="mt-2">
                {ctaLabel}
              </Button>
            )}
          </div>
        </div>

        {amenities.length > 0 && (
          <div
            style={{
              marginTop: '1rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            {amenities.slice(0, 4).map((amenity) => (
              <span
                key={amenity}
                style={{
                  fontSize: '0.625rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'rgba(255, 255, 255, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '9999px',
                  padding: '0.25rem 0.75rem',
                }}
              >
                {amenity}
              </span>
            ))}
            {amenities.length > 4 && (
              <span
                style={{
                  fontSize: '0.625rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'rgba(255, 255, 255, 0.7)',
                }}
              >
                +{amenities.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
