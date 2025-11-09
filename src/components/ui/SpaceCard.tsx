import Card from './Card';
import Button from './Button';
import Image from 'next/image';

interface SpaceCardProps {
  id: string;
  location: string;
  price: number;
  description: string;
  image?: string;
  available?: boolean;
}

export default function SpaceCard({
  location,
  price,
  description,
  image,
  available = true,
}: SpaceCardProps) {
  return (
    <Card hover variant="dark" className="overflow-hidden flex flex-col h-full">
      <div style={{
        position: 'relative',
        height: '12rem',
        width: '100%',
        marginBottom: '1rem',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}>
        {image ? (
          <Image
            src={image}
            alt={location}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQADAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.8) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '3.75rem' }}>🚗</span>
          </div>
        )}
        {!available && (
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{
              color: 'white',
              fontWeight: 700,
              fontSize: '0.875rem',
              backgroundColor: 'rgba(239, 68, 68, 0.8)',
              padding: '0.375rem 0.75rem',
              borderRadius: '0.25rem',
            }}>Unavailable</span>
          </div>
        )}
        {available && (
          <div style={{
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
          }}>
            Available
          </div>
        )}
      </div>
      
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{
          color: 'white',
          fontWeight: 700,
          fontSize: '1.125rem',
          marginBottom: '0.5rem',
          lineHeight: 1.25,
        }}>{location}</h3>
        <p style={{
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '0.875rem',
          marginBottom: '1rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: 1.625,
          flexGrow: 1,
        }}>{description}</p>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '1rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          <div>
            <span style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              display: 'block',
              marginBottom: '0.25rem',
            }}>Price</span>
            <p style={{
              color: 'white',
              fontWeight: 700,
              fontSize: '1.25rem',
            }}>
              ${price}<span style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>/hr</span>
            </p>
          </div>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
}
