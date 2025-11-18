'use client';

import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useCurrentUser } from '@/features/auth/hooks';
import { useAuthStore } from '@/stores/authStore';

export default function AboutPage() {
  useCurrentUser();
  const { isAuthenticated } = useAuthStore();
  const features = [
    {
      icon: '🎯',
      title: 'Our Mission',
      description: 'To revolutionize parking by connecting space owners with drivers, making parking accessible, affordable, and convenient for everyone.',
    },
    {
      icon: '👥',
      title: 'Our Team',
      description: 'A dedicated team of developers, designers, and parking experts working together to create the best parking experience.',
    },
    {
      icon: '🌱',
      title: 'Our Values',
      description: 'Transparency, security, and user satisfaction are at the core of everything we do. We believe in building trust through innovation.',
    },
    {
      icon: '🚀',
      title: 'Our Vision',
      description: 'To become the leading platform for parking space management, helping cities become more efficient and sustainable.',
    },
  ];

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '5K+', label: 'Parking Spaces' },
    { number: '50+', label: 'Cities' },
    { number: '99%', label: 'Satisfaction Rate' },
  ];

  return (
    <div className="min-h-screen py-12 sm:py-16 px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full">
      <div className="w-full">
        {/* Hero Section */}
        <section className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            About ParkSpace
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            We&apos;re on a mission to transform the way people find and rent parking spaces,
            making urban mobility more convenient and accessible.
          </p>
        </section>

        {/* Stats Section */}
        <section className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-4 hover:scale-105">
                <div className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: '#ffffff' }}>
                  {stat.number}
                </div>
                <div className="text-white/80 text-sm font-semibold">{stat.label}</div>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card key={index} hover className="p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className="mb-12">
          <Card className="p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
              Our Story
            </h2>
            <div className="space-y-4 text-white/80 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
              <p>
                ParkSpace was founded in 2024 with a simple vision: to solve the parking problem
                that millions of people face every day. We recognized that finding a parking space
                shouldn&apos;t be a stressful experience, and space owners should be able to monetize
                their unused parking spots.
              </p>
              <p>
                Our platform connects parking space owners (providers) with drivers (consumers)
                looking for convenient and affordable parking. Through our innovative technology,
                we&apos;ve created a seamless experience that benefits both parties.
              </p>
              <p>
                Today, ParkSpace is trusted by thousands of users and continues to grow, expanding
                to new cities and adding innovative features to make parking even more convenient.
              </p>
            </div>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
              Join Us on This Journey
            </h2>
            <p className="text-base sm:text-lg text-white/80 mb-6 max-w-2xl mx-auto leading-relaxed">
              Whether you&apos;re a space owner or a driver, ParkSpace is here to make your
              parking experience better.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 justify-center">
              {!isAuthenticated && (
                <Link href="/register">
                  <Button size="lg" className="min-w-[320px] px-12 py-6 text-xl">
                    Get Started
                  </Button>
                </Link>
              )}
              <Link href="/contact">
                <Button variant="outline" size="lg" className="min-w-[320px] px-12 py-6 text-xl">
                  Contact Us
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
