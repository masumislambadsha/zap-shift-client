import React from 'react';

const DeliveryRiderSVG = () => {
  return (
    <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
    <circle cx="90" cy="90" r="88" fill="#E3F9E5"/>
    <ellipse cx="90" cy="140" rx="42" ry="13" fill="#46BE54" opacity="0.3"/>
    <rect x="65" y="95" width="50" height="35" rx="12" fill="#46BE54"/>
    <circle cx="90" cy="80" r="22" fill="#46BE54"/>
    <circle cx="90" cy="80" r="17" fill="#F8F9FA"/>
    <ellipse cx="90" cy="88" rx="5" ry="7" fill="#46BE54"/>
    {/* Arm Left */}
    <rect x="44" y="110" width="18" height="8" rx="4" fill="#FFD05A"/>
    {/* Arm Right */}
    <rect x="118" y="110" width="18" height="8" rx="4" fill="#FFD05A"/>
    {/* Parcel Left */}
    <rect x="33" y="115" width="20" height="15" rx="3" fill="#FFD05A" stroke="#FFC928" strokeWidth="2"/>
    {/* Parcel Right */}
    <rect x="127" y="115" width="20" height="15" rx="3" fill="#FFD05A" stroke="#FFC928" strokeWidth="2"/>
    {/* Helmet */}
    <ellipse cx="90" cy="68" rx="14" ry="9" fill="#46BE54" stroke="#23A52C" strokeWidth="2"/>
    {/* Eyes */}
    <ellipse cx="85" cy="81" rx="2" ry="1.5" fill="#333"/>
    <ellipse cx="95" cy="81" rx="2" ry="1.5" fill="#333"/>
    {/* Smile */}
    <path d="M87,87 Q90,90 93,87" stroke="#333" strokeWidth="1.5" fill="none"/>
  </svg>
  );
};

export default DeliveryRiderSVG;
