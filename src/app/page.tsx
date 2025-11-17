import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Link from 'next/link';
import AvailableSpacesSection from '@/components/home/AvailableSpacesSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(17, 24, 39, 0.25) 50%, rgba(15, 23, 42, 0.2) 100%)',
          }}
        ></div>
        <div className="relative w-full text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Find Your Perfect
              <br />
              <span style={{ color: '#ffffff' }}>Parking Space</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover convenient and affordable parking spaces across the city. Book instantly and park with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/register">
                <Button size="lg">Get Started Free</Button>
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
                description:
                  'All spaces are verified and monitored for your safety. Advanced security measures ensure peace of mind.',
              },
              {
                icon: '💰',
                title: 'Affordable Rates',
                description:
                  'Competitive prices with flexible payment options. Find the perfect space that fits your budget.',
              },
              {
                icon: '⚡',
                title: 'Instant Booking',
                description:
                  'Book your space in seconds, no waiting required. Real-time availability updates keep you informed.',
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

      <AvailableSpacesSection />

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
