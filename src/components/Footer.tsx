'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t shadow-md mt-16" style={{
      background: 'linear-gradient(135deg, rgba(0, 0, 0, 1) 0%, rgba(17, 24, 39, 0.95) 50%, rgba(15, 23, 42, 0.9) 100%)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
    }}>
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md border"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.15) 100%)',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                }}
              >
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                ParkSpace
              </span>
            </div>
            <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-4">
              Your trusted platform for finding and renting parking spaces. 
              Making urban mobility more convenient and accessible for everyone.
            </p>
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm transition-all duration-300 hover:scale-105 border"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.15) 100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)';
                }}
              >
                <span>📘</span>
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm transition-all duration-300 hover:scale-105 border"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.15) 100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)';
                }}
              >
                <span>🐦</span>
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm transition-all duration-300 hover:scale-105 border"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.15) 100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)';
                }}
              >
                <span>📷</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4" style={{ color: '#ffffff' }}>Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 transition-colors text-sm font-medium inline-block" style={{}} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#d1d5db'}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-blue-300 transition-colors text-sm font-medium inline-block">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-blue-300 transition-colors text-sm font-medium inline-block">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-300 hover:text-blue-300 transition-colors text-sm font-medium inline-block">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-white font-bold text-base mb-4" style={{ color: '#ffffff' }}>Account</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/login" className="text-gray-300 transition-colors text-sm font-medium inline-block" onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#d1d5db'}>
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-300 transition-colors text-sm font-medium inline-block" onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#d1d5db'}>
                  Sign Up
                </Link>
              </li>
              <li>
                <Link href="/provider/register" className="text-gray-300 transition-colors text-sm font-medium inline-block" onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#d1d5db'}>
                  Become a Provider
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}>
          <p className="text-gray-400 text-sm font-medium">
            © 2024 ParkSpace. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/terms" className="text-gray-400 transition-colors text-sm font-medium" onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}>
              Terms
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-blue-300 transition-colors text-sm font-medium">
              Privacy
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-blue-300 transition-colors text-sm font-medium">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


