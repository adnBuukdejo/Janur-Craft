import React from 'react';
import { StepVisualType } from '../types/janur';

interface StepIllustrationProps {
  visualType: StepVisualType;
  alt: string;
}

export const StepIllustration: React.FC<StepIllustrationProps> = ({
  visualType,
  alt,
}) => {
  return (
    <div className="w-full sm:w-44 shrink-0 bg-[#EDF4EC] border border-[#C3D6C1] rounded-lg p-2.5">
      <svg
        viewBox="0 0 180 110"
        className="w-full h-auto"
        role="img"
        aria-label={alt}
      >
        <rect x="0" y="0" width="180" height="110" rx="6" fill="#F7FAF6" />

        {visualType === 'strip-lidi' && (
          <g>
            <path d="M 16 42 C 60 22, 120 22, 164 42 L 16 42 Z" fill="#8CC06E" stroke="#17422B" strokeWidth="1.2" />
            <path d="M 16 68 C 60 88, 120 88, 164 68 L 16 68 Z" fill="#5D9B5E" stroke="#17422B" strokeWidth="1.2" />
            <line x1="12" y1="55" x2="168" y2="55" stroke="#7A5A3A" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 85 24 L 95 55" stroke="#17422B" strokeWidth="2" strokeDasharray="3 2" />
          </g>
        )}

        {visualType === 'coil-three' && (
          <g>
            {[36, 54, 72].map((x) => (
              <rect key={x} x={x} y="16" width="12" height="78" rx="4" fill="#589A5B" stroke="#17422B" strokeWidth="1.2" />
            ))}
            {[100, 118, 136].map((x) => (
              <rect key={x} x={x} y="16" width="12" height="78" rx="4" fill="#A6CE72" stroke="#3A7D44" strokeWidth="1.2" />
            ))}
            <text x="59" y="103" textAnchor="middle" fontSize="8" fill="#17422B">Left (Up)</text>
            <text x="123" y="103" textAnchor="middle" fontSize="8" fill="#17422B">Right (Down)</text>
          </g>
        )}

        {visualType === 'weave-cross' && (
          <g transform="translate(46, 12)">
            {[16, 40, 64].map((x) => (
              <rect key={x} x={x} y="4" width="14" height="78" fill="#589A5B" stroke="#17422B" strokeWidth="1" />
            ))}
            {[16, 40, 64].map((y, r) => (
              <React.Fragment key={y}>
                <rect x="4" y={y} width="78" height="14" fill="#A6CE72" stroke="#17422B" strokeWidth="1" opacity="0.92" />
                {[16, 40, 64].map((x, c) =>
                  (r + c) % 2 === 1 ? (
                    <rect key={`${r}-${c}`} x={x} y={y} width="14" height="14" fill="#589A5B" stroke="#17422B" strokeWidth="1" />
                  ) : null
                )}
              </React.Fragment>
            ))}
          </g>
        )}

        {visualType === 'wrap-tails' && (
          <g transform="translate(90, 55)">
            <rect x="-26" y="-26" width="52" height="52" transform="rotate(45)" fill="#8CC06E" stroke="#17422B" strokeWidth="1.4" />
            <path d="M -38 0 C -55 18, -32 46, -6 46" fill="none" stroke="#3A7D44" strokeWidth="5" strokeLinecap="round" />
            <path d="M 38 0 C 55 18, 32 46, 6 46" fill="none" stroke="#589A5B" strokeWidth="5" strokeLinecap="round" />
          </g>
        )}

        {visualType === 'tuck-tips' && (
          <g transform="translate(90, 58)">
            <rect x="-26" y="-26" width="52" height="52" transform="rotate(45)" fill="#8CC06E" stroke="#17422B" strokeWidth="1.4" />
            <path d="M -30 -8 C -42 -28, -16 -46, -2 -48" fill="none" stroke="#A6CE72" strokeWidth="4" strokeLinecap="round" />
            <path d="M 30 -8 C 42 -28, 16 -46, 2 -48" fill="none" stroke="#589A5B" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}

        {visualType === 'tighten-ketupat' && (
          <g transform="translate(90, 55)">
            <line x1="-6" y1="-34" x2="-14" y2="-48" stroke="#8CC06E" strokeWidth="3" />
            <line x1="6" y1="-34" x2="14" y2="-48" stroke="#589A5B" strokeWidth="3" />
            <line x1="-5" y1="34" x2="-10" y2="48" stroke="#4E8D52" strokeWidth="4" />
            <line x1="5" y1="34" x2="10" y2="48" stroke="#8CC06E" strokeWidth="4" />
            <g transform="rotate(45)">
              <rect x="-26" y="-26" width="52" height="52" rx="4" fill="#589A5B" stroke="#17422B" strokeWidth="1.6" />
              <rect x="-25" y="-25" width="25" height="25" fill="#A6CE72" stroke="#17422B" strokeWidth="1" />
              <rect x="0" y="0" width="25" height="25" fill="#A6CE72" stroke="#17422B" strokeWidth="1" />
            </g>
          </g>
        )}

        {visualType === 'trim-petal' && (
          <g>
            <path d="M 28 36 L 146 36 L 160 48 L 146 60 L 28 60 L 16 48 Z" fill="#A6CE72" stroke="#17422B" strokeWidth="1.4" />
            <line x1="146" y1="26" x2="164" y2="54" stroke="#7A5A3A" strokeWidth="1.2" strokeDasharray="3 2" />
          </g>
        )}

        {visualType === 'notch-edge' && (
          <g>
            <path
              d="M 20 34 L 160 34 L 160 66 L 146 50 L 132 68 L 118 50 L 104 68 L 90 50 L 76 68 L 62 50 L 48 68 L 34 50 L 20 66 Z"
              fill="#8CC06E"
              stroke="#17422B"
              strokeWidth="1.4"
            />
          </g>
        )}

        {visualType === 'pleat-fan' && (
          <g transform="translate(90, 86)">
            <path
              d="M 0 0 L -50 -48 L -32 -56 L 0 0 L -14 -62 L 6 -62 L 0 0 L 24 -58 L 42 -50 Z"
              fill="#A6CE72"
              stroke="#17422B"
              strokeWidth="1.3"
            />
          </g>
        )}

        {visualType === 'pin-rosette' && (
          <g transform="translate(90, 55)">
            {Array.from({ length: 8 }).map((_, i) => (
              <ellipse
                key={i}
                cx="0"
                cy="-22"
                rx="7"
                ry="18"
                fill={i % 2 === 0 ? '#A6CE72' : '#6AA862'}
                stroke="#17422B"
                strokeWidth="1"
                transform={`rotate(${i * 45})`}
              />
            ))}
            <circle cx="0" cy="0" r="6" fill="#7A5A3A" />
          </g>
        )}

        {visualType === 'cross-knot' && (
          <g transform="translate(90, 55)">
            <rect x="-48" y="-10" width="96" height="20" rx="3" fill="#8CC06E" stroke="#17422B" strokeWidth="1.2" />
            <rect x="-10" y="-42" width="20" height="84" rx="3" fill="#589A5B" stroke="#17422B" strokeWidth="1.2" />
            <rect x="-11" y="-11" width="22" height="22" fill="#A6CE72" stroke="#17422B" strokeWidth="1.4" />
          </g>
        )}

        {visualType === 'box-braid' && (
          <g transform="translate(36, 36)">
            {[0, 1, 2, 3, 4].map((i) => (
              <rect
                key={i}
                x={i * 21}
                y={i * 1.5}
                width="19"
                height={28 - i * 2}
                rx="3"
                fill={i % 2 === 0 ? '#589A5B' : '#A6CE72'}
                stroke="#17422B"
                strokeWidth="1.2"
              />
            ))}
          </g>
        )}

        {visualType === 'fold-legs' && (
          <g transform="translate(30, 26)">
            <rect x="20" y="34" width="70" height="16" rx="4" fill="#589A5B" stroke="#17422B" strokeWidth="1.2" />
            <path d="M 65 36 L 96 10 L 122 58" fill="none" stroke="#3A7D44" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}

        {visualType === 'curl-antennae' && (
          <g transform="translate(46, 30)">
            <rect x="38" y="32" width="60" height="18" rx="4" fill="#589A5B" stroke="#17422B" strokeWidth="1.2" />
            <path d="M 38 38 C 18 24, 14 10, 26 8" fill="none" stroke="#17422B" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 38 44 C 14 40, 8 28, 16 20" fill="none" stroke="#3A7D44" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        )}

        {visualType === 'wrap-hilt' && (
          <g transform="translate(30, 55)">
            <line x1="16" y1="0" x2="132" y2="0" stroke="#7A5A3A" strokeWidth="3" />
            <rect x="22" y="-12" width="32" height="24" rx="4" fill="#589A5B" stroke="#17422B" strokeWidth="1.4" />
            <line x1="30" y1="-12" x2="38" y2="12" stroke="#A6CE72" strokeWidth="2" />
            <line x1="40" y1="-12" x2="48" y2="12" stroke="#A6CE72" strokeWidth="2" />
          </g>
        )}

        {visualType === 'crossguard' && (
          <g transform="translate(35, 55)">
            <line x1="16" y1="0" x2="120" y2="0" stroke="#7A5A3A" strokeWidth="3" />
            <path d="M 46 -28 Q 58 0 46 28 L 58 24 Q 68 0 58 -24 Z" fill="#A6CE72" stroke="#17422B" strokeWidth="1.4" />
          </g>
        )}

        {visualType === 'zig-blade' && (
          <g transform="translate(22, 55)">
            <line x1="10" y1="0" x2="136" y2="0" stroke="#7A5A3A" strokeWidth="2.5" />
            <path
              d="M 24 0 L 42 -16 L 60 0 L 78 -14 L 96 0 L 114 -10 L 134 0 L 114 10 L 96 0 L 78 14 L 60 0 L 42 16 Z"
              fill="#8CC06E"
              stroke="#17422B"
              strokeWidth="1.3"
            />
          </g>
        )}

        {visualType === 'lock-tip' && (
          <g transform="translate(32, 55)">
            <path d="M 18 -14 L 106 0 L 18 14 Z" fill="#589A5B" stroke="#17422B" strokeWidth="1.4" />
            <line x1="94" y1="-12" x2="112" y2="12" stroke="#7A5A3A" strokeWidth="1.4" strokeDasharray="3 2" />
          </g>
        )}
      </svg>
    </div>
  );
};
