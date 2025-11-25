import React from 'react';

const ApproveRiderSVG = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background circle - success green */}
      <circle cx="90" cy="90" r="88" fill="#E3F9E5" stroke="#46BE54" strokeWidth="4"/>

      {/* Big approval checkmark */}
      <path
        d="M52 90 L78 116 L128 66"
        stroke="#46BE54"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Rider body (exact same as your big version) */}
      <rect x="65" y="95" width="50" height="35" rx="12" fill="#46BE54"/>
      <circle cx="90" cy="80" r="22" fill="#46BE54"/>
      <circle cx="90" cy="80" r="17" fill="#F8F9FA"/>
      <ellipse cx="90" cy="88" rx="5" ry="7" fill="#46BE54"/>

      {/* Arms */}
      <rect x="48" y="108" width="20" height="8" rx="4" fill="#FFD05A"/>
      <rect x="112" y="108" width="20" height="8" rx="4" fill="#FFD05A"/>

      {/* Thumbs up hands */}
      <g transform="translate(38,115)">
        <rect width="18" height="22" rx="6" fill="#FFD05A" stroke="#FFC928" strokeWidth="3"/>
        <rect x="3" y="3" width="12" height="10" rx="3" fill="#F8F9FA"/>
      </g>
      <g transform="translate(124,115)">
        <rect width="18" height="22" rx="6" fill="#FFD05A" stroke="#FFC928" strokeWidth="3"/>
        <rect x="3" y="3" width="12" height="10" rx="3" fill="#F8F9FA"/>
      </g>

      {/* Helmet */}
      <ellipse cx="90" cy="68" rx="14" ry="9" fill="#46BE54" stroke="#23A52C" strokeWidth="2"/>
      <ellipse cx="88" cy="66" rx="4" ry="3" fill="#FFFFFF" opacity="0.4"/>

      {/* Happy face */}
      <ellipse cx="85" cy="81" rx="2.5" ry="2" fill="#333"/>
      <ellipse cx="95" cy="81" rx="2.5" ry="2" fill="#333"/>
      <path d="M84,86 Q90,92 96,86" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
};

export default ApproveRiderSVG;
