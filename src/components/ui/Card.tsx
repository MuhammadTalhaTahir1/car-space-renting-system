'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: 'default' | 'dark';
}

export default function Card({ children, className = '', hover = false, variant = 'default' }: CardProps) {
  const isDark = variant === 'dark';
  
  const baseStyle: React.CSSProperties = isDark ? {
    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(51, 65, 85, 0.85) 100%)',
    backdropFilter: 'blur(16px)',
    borderRadius: '1rem',
    border: '1px solid rgba(100, 116, 139, 0.3)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    padding: '1.5rem',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
  } : {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(0, 0, 0, 0.05) 100%)',
    backdropFilter: 'blur(16px)',
    borderRadius: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 4px 16px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    padding: '1.5rem',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
  };

  const hoverStyle: React.CSSProperties = hover ? (isDark ? {
    background: 'linear-gradient(135deg, rgba(15, 23, 42, 1) 0%, rgba(30, 41, 59, 0.95) 50%, rgba(51, 65, 85, 0.9) 100%)',
    boxShadow: '0 16px 48px rgba(0, 0, 0, 0.6), 0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
    transform: 'scale(1.02) translateY(-4px)',
    borderColor: 'rgba(148, 163, 184, 0.5)',
    cursor: 'pointer',
  } : {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(0, 0, 0, 0.05) 100%)',
    boxShadow: '0 16px 48px rgba(0, 0, 0, 0.3), 0 8px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
    transform: 'scale(1.02) translateY(-4px)',
    borderColor: 'rgba(255, 255, 255, 0.4)',
    cursor: 'pointer',
  }) : {};

  return (
    <div
      className={className}
      style={{
        ...baseStyle,
        willChange: hover ? 'transform, box-shadow' : 'auto',
      }}
      onMouseEnter={hover ? (e) => {
        Object.assign(e.currentTarget.style, baseStyle, hoverStyle);
      } : undefined}
      onMouseLeave={hover ? (e) => {
        Object.assign(e.currentTarget.style, baseStyle);
      } : undefined}
    >
      {/* Premium gradient overlay */}
      {!isDark && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(0, 0, 0, 0.3) 100%)',
          opacity: 0.6,
        }} />
      )}
      {isDark && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, rgba(100, 116, 139, 0.6) 0%, rgba(148, 163, 184, 0.5) 50%, rgba(100, 116, 139, 0.6) 100%)',
          opacity: 0.8,
        }} />
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
