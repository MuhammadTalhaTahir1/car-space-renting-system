import SpaceCard from '@/components/ui/SpaceCard';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Link from 'next/link';

// Mock data for car spaces
const mockSpaces = [
  {
    id: '1',
    location: 'Downtown Central',
    price: 5,
    description: 'Secure covered parking space in the heart of downtown. 24/7 access with CCTV monitoring.',
    available: true,
  },
  {
    id: '2',
    location: 'Shopping Mall Parking',
    price: 3,
    description: 'Convenient parking near shopping district. Perfect for day visitors and shoppers.',
    available: true,
  },
  {
    id: '3',
    location: 'Airport Terminal',
    price: 8,
    description: 'Premium parking space near airport terminal. Ideal for travelers and airport staff.',
    available: true,
  },
  {
    id: '4',
    location: 'Residential Area',
    price: 4,
    description: 'Spacious parking in quiet residential neighborhood. Long-term rental available.',
    available: false,
  },
  {
    id: '5',
    location: 'Business District',
    price: 6,
    description: 'Prime location in business district. Close to offices and restaurants.',
    available: true,
  },
  {
    id: '6',
    location: 'Sports Stadium',
    price: 10,
    description: 'Event parking near sports stadium. Perfect for game days and concerts.',
    available: true,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full">
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(17, 24, 39, 0.25) 50%, rgba(15, 23, 42, 0.2) 100%)',
        }}></div>
        <div className="relative w-full text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Find Your Perfect
              <br />
              <span style={{ color: '#ffffff' }}>
                Parking Space
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover convenient and affordable parking spaces across the city. 
              Book instantly and park with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/register">
                <Button size="lg" >
                  Get Started Free
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full">
        <div className="w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose ParkSpace?
            </h2>
            <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
              Experience the future of parking with our innovative platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: '🔒',
                title: 'Secure & Safe',
                description: 'All spaces are verified and monitored for your safety. Advanced security measures ensure peace of mind.',
              },
              {
                icon: '💰',
                title: 'Affordable Rates',
                description: 'Competitive prices with flexible payment options. Find the perfect space that fits your budget.',
              },
              {
                icon: '⚡',
                title: 'Instant Booking',
                description: 'Book your space in seconds, no waiting required. Real-time availability updates keep you informed.',
              },
            ].map((feature, index) => (
              <Card key={index} hover className="p-6 text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Available Spaces Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full" style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(0, 0, 0, 0.03) 100%)',
      }}>
        <div className="w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                Available Spaces
              </h2>
              <p className="text-base sm:text-lg text-white/70">
                {mockSpaces.filter(s => s.available).length} spaces available now
              </p>
            </div>
          </div>
          <div style={{
            display: 'flex',
            gap: '1rem',
            overflowX: 'auto',
            paddingBottom: '1rem',
            scrollbarWidth: 'thin',
          }} className="scrollbar-hide">
            {mockSpaces.map((space) => (
              <div key={space.id} style={{ minWidth: '320px', flexShrink: 0 }}>
                <SpaceCard {...space} />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/register">
              <Button variant="secondary" size="lg">
                View All Spaces
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full">
        <div className="w-full max-w-4xl mx-auto">
          <Card className="text-center p-10 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              Ready to Get Started?
            </h2>
            <p className="text-base sm:text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of users who are already using ParkSpace to find and rent parking spaces.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" style={{ padding: '0.875rem 1.75rem' }}>
                  Create Account
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" style={{ padding: '0.875rem 1.75rem' }}>
                  Contact Us
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
