import React from 'react';

export const KetupatDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`flex items-center justify-center gap-3 py-2 select-none ${className}`}
    aria-hidden="true"
  >
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#B5D2AF] to-[#0F764A]/45" />
    <svg width="88" height="20" viewBox="0 0 88 20" className="shrink-0">
      {/* Left leaf */}
      <path
        d="M 10 10 C 18 4, 28 5, 33 10 C 28 15, 18 16, 10 10 Z"
        fill="#A4CF7A"
        stroke="#143D28"
        strokeWidth="1.1"
      />
      {/* Center woven ketupat diamond */}
      <g transform="translate(44, 10) rotate(45)">
        <rect x="-6.5" y="-6.5" width="13" height="13" rx="1.5" fill="#E2B334" stroke="#143D28" strokeWidth="1.2" />
        <rect x="-6.5" y="-6.5" width="6.5" height="6.5" fill="#3B8E47" />
        <rect x="0" y="0" width="6.5" height="6.5" fill="#3B8E47" />
      </g>
      {/* Small terracotta & orange accent dots */}
      <circle cx="35.5" cy="10" r="1.8" fill="#DD7930" />
      <circle cx="52.5" cy="10" r="1.8" fill="#B65236" />
      {/* Right leaf */}
      <path
        d="M 78 10 C 70 4, 60 5, 55 10 C 60 15, 70 16, 78 10 Z"
        fill="#4CA156"
        stroke="#143D28"
        strokeWidth="1.1"
      />
    </svg>
    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#B5D2AF] to-[#0F764A]/45" />
  </div>
);

export const AnyamanCornerAccent: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 180 140"
    className={`pointer-events-none select-none ${className}`}
    aria-hidden="true"
  >
    {/* Subtle coconut palm leaf silhouette */}
    <path
      d="M 175 8 C 125 22, 82 60, 48 122"
      fill="none"
      stroke="#0F764A"
      strokeWidth="2.2"
      strokeOpacity="0.24"
    />
    <path
      d="M 148 20 C 120 12, 92 22, 74 42 C 102 36, 128 32, 148 20 Z"
      fill="#3B8E47"
      fillOpacity="0.16"
    />
    <path
      d="M 124 38 C 92 34, 64 48, 46 72 C 76 62, 102 54, 124 38 Z"
      fill="#E2B334"
      fillOpacity="0.18"
    />
    <path
      d="M 100 62 C 68 62, 42 78, 28 104 C 58 92, 82 80, 100 62 Z"
      fill="#0F764A"
      fillOpacity="0.14"
    />
    {/* Subtle ketupat diamond */}
    <g transform="translate(142, 92) rotate(45)" opacity="0.22">
      <rect x="-14" y="-14" width="28" height="28" rx="3" fill="#E2B334" stroke="#143D28" strokeWidth="1.5" />
      <rect x="-14" y="-14" width="14" height="14" fill="#3B8E47" />
      <rect x="0" y="0" width="14" height="14" fill="#3B8E47" />
      <line x1="-14" y1="0" x2="14" y2="0" stroke="#143D28" strokeWidth="1.2" />
      <line x1="0" y1="-14" x2="0" y2="14" stroke="#143D28" strokeWidth="1.2" />
    </g>
    <circle cx="106" cy="112" r="4" fill="#DD7930" fillOpacity="0.22" />
    <circle cx="164" cy="54" r="3" fill="#B65236" fillOpacity="0.22" />
  </svg>
);

export const KetupatDiamondIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <g transform="translate(12, 12) rotate(45)">
      <rect x="-7" y="-7" width="14" height="14" rx="2" fill="#E2B334" stroke="#143D28" strokeWidth="1.5" />
      <rect x="-7" y="-7" width="7" height="7" fill="#3B8E47" />
      <rect x="0" y="0" width="7" height="7" fill="#3B8E47" />
    </g>
    <line x1="12" y1="1.5" x2="12" y2="4" stroke="#143D28" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="12" y1="20" x2="12" y2="22.5" stroke="#B65236" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const JanurLeafIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      d="M 4 19 C 5 10, 11 5, 20 4 C 19 13, 14 19, 4 19 Z"
      fill="#82BC5E"
      stroke="#143D28"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M 4 19 C 9 14, 14 9, 20 4" fill="none" stroke="#E2B334" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

export const WovenAccentBar: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex h-1 w-full overflow-hidden ${className}`} aria-hidden="true">
    <div className="flex-1 bg-[#143D28]" />
    <div className="w-16 bg-[#0F764A]" />
    <div className="w-12 bg-[#3B8E47]" />
    <div className="w-10 bg-[#E2B334]" />
    <div className="w-8 bg-[#DD7930]" />
    <div className="w-8 bg-[#B65236]" />
    <div className="flex-1 bg-[#0F764A]" />
  </div>
);
