import React from 'react';

export const KetupatDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`flex items-center justify-center gap-3 py-2 select-none ${className}`}
    aria-hidden="true"
  >
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#B5D2AF] to-[#0F764A]/45" />
    <svg width="108" height="22" viewBox="0 0 108 22" className="shrink-0">
      <path
        d="M 8 11 C 18 4, 30 5, 36 11 C 30 17, 18 18, 8 11 Z"
        fill="#A4CF7A"
        stroke="#143D28"
        strokeWidth="1.1"
      />
      <circle cx="41" cy="11" r="2.1" fill="#DD7930" />
      <g transform="translate(54, 11) rotate(45)">
        <rect x="-7" y="-7" width="14" height="14" rx="1.8" fill="#E2B334" stroke="#143D28" strokeWidth="1.2" />
        <rect x="-7" y="-7" width="7" height="7" fill="#3B8E47" />
        <rect x="0" y="0" width="7" height="7" fill="#3B8E47" />
      </g>
      <circle cx="67" cy="11" r="2.1" fill="#8C6239" />
      <path
        d="M 100 11 C 90 4, 78 5, 72 11 C 78 17, 90 18, 100 11 Z"
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
    viewBox="0 0 190 145"
    className={`pointer-events-none select-none ${className}`}
    aria-hidden="true"
  >
    <path
      d="M 182 8 C 132 22, 86 62, 50 128"
      fill="none"
      stroke="#0F764A"
      strokeWidth="2.2"
      strokeOpacity="0.25"
    />
    <path
      d="M 152 20 C 122 12, 94 22, 76 42 C 106 36, 132 32, 152 20 Z"
      fill="#3B8E47"
      fillOpacity="0.18"
    />
    <path
      d="M 128 40 C 96 36, 66 50, 48 74 C 78 64, 106 56, 128 40 Z"
      fill="#E2B334"
      fillOpacity="0.2"
    />
    <path
      d="M 102 64 C 70 64, 42 80, 28 106 C 58 94, 84 82, 102 64 Z"
      fill="#0F764A"
      fillOpacity="0.16"
    />
    <g transform="translate(148, 96) rotate(45)" opacity="0.24">
      <rect x="-15" y="-15" width="30" height="30" rx="3" fill="#E2B334" stroke="#143D28" strokeWidth="1.5" />
      <rect x="-15" y="-15" width="15" height="15" fill="#3B8E47" />
      <rect x="0" y="0" width="15" height="15" fill="#3B8E47" />
      <line x1="-15" y1="0" x2="15" y2="0" stroke="#143D28" strokeWidth="1.2" />
      <line x1="0" y1="-15" x2="0" y2="15" stroke="#143D28" strokeWidth="1.2" />
    </g>
    <circle cx="110" cy="116" r="4" fill="#8C6239" fillOpacity="0.22" />
    <circle cx="170" cy="54" r="3.5" fill="#DD7930" fillOpacity="0.22" />
  </svg>
);

export const CoconutFrondCornerLeft: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 150 120"
    className={`pointer-events-none select-none ${className}`}
    aria-hidden="true"
  >
    <path d="M 8 108 C 40 72, 74 42, 128 16" fill="none" stroke="#8C6239" strokeWidth="2" strokeOpacity="0.22" />
    <path d="M 32 84 C 24 56, 38 34, 60 24 C 52 48, 46 68, 32 84 Z" fill="#A4CF7A" fillOpacity="0.22" />
    <path d="M 58 60 C 56 32, 74 16, 98 12 C 86 34, 74 50, 58 60 Z" fill="#E2B334" fillOpacity="0.2" />
    <path d="M 82 40 C 86 18, 106 8, 130 10 C 114 26, 98 36, 82 40 Z" fill="#3B8E47" fillOpacity="0.18" />
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
    <line x1="12" y1="20" x2="12" y2="22.5" stroke="#8C6239" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const JanurLeafIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      d="M 4 19 C 5 10, 11 5, 20 4 C 19 13, 14 19, 4 19 Z"
      fill="#A4CF7A"
      stroke="#143D28"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M 4 19 C 9 14, 14 9, 20 4" fill="none" stroke="#8C6239" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const WovenAccentBar: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex h-1.5 w-full overflow-hidden ${className}`} aria-hidden="true">
    <div className="flex-1 bg-[#143D28]" />
    <div className="w-16 bg-[#0F764A]" />
    <div className="w-12 bg-[#3B8E47]" />
    <div className="w-10 bg-[#A4CF7A]" />
    <div className="w-12 bg-[#E2B334]" />
    <div className="w-8 bg-[#DD7930]" />
    <div className="w-10 bg-[#8C6239]" />
    <div className="flex-1 bg-[#0F764A]" />
  </div>
);
