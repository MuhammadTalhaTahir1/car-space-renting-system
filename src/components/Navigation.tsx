'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCurrentUser, useLogout } from '@/features/auth/hooks';
import { useAuthStore } from '@/stores/authStore';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useCurrentUser();
  const { user, isAuthenticated } = useAuthStore();
  const logoutMutation = useLogout();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => pathname === path;
  const profileHref =
    user?.role === 'admin'
      ? '/admin/dashboard'
      : user?.role === 'provider'
      ? '/provider/profile'
      : '/profile';

  const profileLabel = user?.role === 'admin' ? 'Admin' : 'Profile';

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setIsMenuOpen(false);
        router.push('/');
      },
    });
  };

  return (
    <header className="w-full sticky top-0 z-50">
      <nav className="w-full backdrop-blur-md border-b border-white-20 shadow-md" style={{
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(17, 24, 39, 0.9) 50%, rgba(15, 23, 42, 0.95) 100%)',
      }}>
        <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div 
                className="w-10 h-10 rounded-lg border border-white-30 flex items-center justify-center shadow-md group-hover:scale-105 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
                }}
              >
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-white font-bold text-xl hidden sm:block tracking-tight">
                ParkSpace
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-5 py-2-5 rounded-lg text-sm font-medium transition-all duration-300 text-white shadow-md ${
                    isActive(link.href) ? '' : 'text-white-90'
                  }`}
                  style={isActive(link.href) ? {
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.15) 100%)',
                  } : {
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(link.href)) {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(link.href)) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mx-2 h-6 w-px bg-white-30" />
              {!isAuthenticated ? (
                <>
                  <Link
                    href="/login"
                    className="px-5 py-2-5 rounded-lg text-sm font-medium text-white transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.2) 100%)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)';
                    }}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-5 py-2-5 rounded-lg text-sm font-semibold text-white shadow-md transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.9) 0%, rgba(13, 148, 136, 0.8) 100%)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(13, 148, 136, 0.95) 0%, rgba(15, 118, 110, 0.9) 100%)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(20, 184, 166, 0.9) 0%, rgba(13, 148, 136, 0.8) 100%)';
                    }}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href={profileHref}
                    className="px-5 py-2-5 rounded-lg text-sm font-semibold text-white shadow-md transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(37, 99, 235, 0.3) 100%)',
                    }}
                  >
                    {profileLabel}
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                    className="px-5 py-2-5 rounded-lg text-sm font-medium text-white transition-all duration-300 border border-white/30 hover:border-white/60 disabled:opacity-60"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                    }}
                  >
                    {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white-20 transition-all"
              aria-label="Toggle menu"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden pb-6 pt-4 space-y-3 animate-fade-in-up border-t border-white-20 mt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-5 py-2-5 rounded-lg text-sm font-medium transition-all duration-300 text-white shadow-md ${
                    isActive(link.href) ? '' : 'text-white-90'
                  }`}
                  style={isActive(link.href) ? {
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.15) 100%)',
                  } : {
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(link.href)) {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(link.href)) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 space-y-3 border-t border-white-20 mt-4">
                {!isAuthenticated ? (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-5 py-2-5 rounded-lg text-sm font-medium text-white transition-all duration-300 text-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.5) 0%, rgba(168, 85, 247, 0.4) 100%)',
                      }}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-5 py-2-5 rounded-lg text-sm font-semibold text-white shadow-md transition-all duration-300 text-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.9) 0%, rgba(13, 148, 136, 0.8) 100%)',
                      }}
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href={profileHref}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-5 py-2-5 rounded-lg text-sm font-semibold text-white shadow-md transition-all duration-300 text-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(37, 99, 235, 0.3) 100%)',
                      }}
                    >
                      {profileLabel}
                    </Link>
                    <button
                      onClick={handleLogout}
                      disabled={logoutMutation.isPending}
                      className="w-full px-5 py-2-5 rounded-lg text-sm font-medium text-white transition-all duration-300 border border-white/30 hover:border-white/60 disabled:opacity-60"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                      }}
                    >
                      {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

