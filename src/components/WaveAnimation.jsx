import React from 'react';

const WaveAnimation = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
      <svg className="w-full h-24" viewBox="0 0 1440 54" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
          </linearGradient>
        </defs>
        <path
          d="M0,0 C320,54 420,0 740,18 C1060,36 1120,54 1440,36 L1440,54 L0,54 Z"
          fill="url(#wave-gradient)"
        >
          <animate
            attributeName="d"
            dur="10s"
            repeatCount="indefinite"
            values="
              M0,0 C320,54 420,0 740,18 C1060,36 1120,54 1440,36 L1440,54 L0,54 Z;
              M0,36 C320,0 420,54 740,18 C1060,0 1120,36 1440,18 L1440,54 L0,54 Z;
              M0,0 C320,54 420,0 740,18 C1060,36 1120,54 1440,36 L1440,54 L0,54 Z
            "
          />
        </path>
      </svg>
    </div>
  );
};

export default WaveAnimation;