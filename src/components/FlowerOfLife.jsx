import React from 'react';

const FlowerOfLife = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <pattern id="flower-of-life" x="0" y="0" width="33.33" height="33.33" patternUnits="userSpaceOnUse">
            <circle cx="16.67" cy="16.67" r="16.67" fill="none" stroke="currentColor" strokeWidth="0.5" className="animate-flower-dance">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; 0.5 0.5; 0 0"
                dur="5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="0" cy="16.67" r="16.67" fill="none" stroke="currentColor" strokeWidth="0.5" className="animate-flower-dance">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; -0.5 0.5; 0 0"
                dur="6s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="33.33" cy="16.67" r="16.67" fill="none" stroke="currentColor" strokeWidth="0.5" className="animate-flower-dance">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; 0.5 -0.5; 0 0"
                dur="5.5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="16.67" cy="0" r="16.67" fill="none" stroke="currentColor" strokeWidth="0.5" className="animate-flower-dance">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; -0.5 -0.5; 0 0"
                dur="5.8s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="16.67" cy="33.33" r="16.67" fill="none" stroke="currentColor" strokeWidth="0.5" className="animate-flower-dance">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; 0.5 0.5; 0 0"
                dur="6.2s"
                repeatCount="indefinite"
              />
            </circle>
          </pattern>
        </defs>
        <rect x="0" y="0" width="100" height="100" fill="url(#flower-of-life)"/>
      </svg>
    </div>
  );
};

export default FlowerOfLife;
