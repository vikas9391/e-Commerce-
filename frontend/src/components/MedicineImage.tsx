import { useState } from 'react';

// Category-based visual fallbacks for when medicines have no image
const CATEGORY_FALLBACKS: Record<string, { emoji: string; bg: string; label: string }> = {
  'pain relief':      { emoji: '💊', bg: 'from-red-50 to-red-100',    label: 'Pain Relief' },
  'antibiotic':       { emoji: '🔬', bg: 'from-blue-50 to-blue-100',  label: 'Antibiotic' },
  'antibiotics':      { emoji: '🔬', bg: 'from-blue-50 to-blue-100',  label: 'Antibiotic' },
  'vitamin':          { emoji: '🌿', bg: 'from-green-50 to-green-100', label: 'Vitamins' },
  'vitamins':         { emoji: '🌿', bg: 'from-green-50 to-green-100', label: 'Vitamins' },
  'supplement':       { emoji: '🌿', bg: 'from-green-50 to-green-100', label: 'Supplement' },
  'supplements':      { emoji: '🌿', bg: 'from-green-50 to-green-100', label: 'Supplement' },
  'skincare':         { emoji: '✨', bg: 'from-pink-50 to-pink-100',   label: 'Skincare' },
  'skin care':        { emoji: '✨', bg: 'from-pink-50 to-pink-100',   label: 'Skincare' },
  'diabetes':         { emoji: '🩺', bg: 'from-purple-50 to-purple-100', label: 'Diabetes' },
  'diabetic':         { emoji: '🩺', bg: 'from-purple-50 to-purple-100', label: 'Diabetes' },
  'cardiac':          { emoji: '❤️', bg: 'from-rose-50 to-rose-100',   label: 'Cardiac' },
  'heart':            { emoji: '❤️', bg: 'from-rose-50 to-rose-100',   label: 'Cardiac' },
  'allergy':          { emoji: '🤧', bg: 'from-yellow-50 to-yellow-100', label: 'Allergy' },
  'allergies':        { emoji: '🤧', bg: 'from-yellow-50 to-yellow-100', label: 'Allergy' },
  'cough':            { emoji: '🍯', bg: 'from-amber-50 to-amber-100', label: 'Cough & Cold' },
  'cold':             { emoji: '🍯', bg: 'from-amber-50 to-amber-100', label: 'Cough & Cold' },
  'digestive':        { emoji: '🫁', bg: 'from-teal-50 to-teal-100',  label: 'Digestive' },
  'stomach':          { emoji: '🫁', bg: 'from-teal-50 to-teal-100',  label: 'Digestive' },
  'eye':              { emoji: '👁️', bg: 'from-cyan-50 to-cyan-100',   label: 'Eye Care' },
  'ear':              { emoji: '👂', bg: 'from-indigo-50 to-indigo-100', label: 'Ear Care' },
  'prescription':     { emoji: '📋', bg: 'from-orange-50 to-orange-100', label: 'Prescription' },
  'general':          { emoji: '💊', bg: 'from-gray-50 to-gray-100',   label: 'Medicine' },
};

const DEFAULT_FALLBACK = { emoji: '💊', bg: 'from-blue-50 to-blue-100', label: 'Medicine' };

function getFallback(categoryName?: string) {
  if (!categoryName) return DEFAULT_FALLBACK;
  const key = categoryName.toLowerCase();
  // exact match first
  if (CATEGORY_FALLBACKS[key]) return CATEGORY_FALLBACKS[key];
  // partial match
  for (const [k, v] of Object.entries(CATEGORY_FALLBACKS)) {
    if (key.includes(k) || k.includes(key)) return v;
  }
  return DEFAULT_FALLBACK;
}

interface MedicineImageProps {
  src?: string | null;
  alt: string;
  categoryName?: string;
  className?: string;
  /** Size variant: 'card' (default) | 'detail' | 'thumb' */
  size?: 'card' | 'detail' | 'thumb';
}

const MedicineImage = ({
  src,
  alt,
  categoryName,
  className = '',
  size = 'card',
}: MedicineImageProps) => {
  const [imgError, setImgError] = useState(false);
  const fallback = getFallback(categoryName);

  const sizeClasses = {
    thumb:  { wrapper: 'w-16 h-16',   emoji: 'text-2xl', text: 'text-[10px]' },
    card:   { wrapper: 'w-full h-48 sm:h-52', emoji: 'text-5xl', text: 'text-xs' },
    detail: { wrapper: 'w-full min-h-[300px] sm:min-h-[400px]', emoji: 'text-8xl', text: 'text-sm' },
  }[size];

  if (!imgError && src) {
    return (
      <img
        src={src}
        alt={alt}
        onError={() => setImgError(true)}
        className={`${sizeClasses.wrapper} object-contain ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses.wrapper} bg-gradient-to-br ${fallback.bg} flex flex-col items-center justify-center gap-1 rounded-lg ${className}`}
    >
      <span className={sizeClasses.emoji} role="img" aria-label={fallback.label}>
        {fallback.emoji}
      </span>
      {size !== 'thumb' && (
        <span className={`${sizeClasses.text} font-semibold text-gray-500 text-center px-2`}>
          {fallback.label}
        </span>
      )}
    </div>
  );
};

export default MedicineImage;