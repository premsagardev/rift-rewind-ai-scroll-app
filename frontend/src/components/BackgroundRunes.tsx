import React from 'react';

const BackgroundRunes: React.FC = () => {
  const runes = ['✦', '⚡', '✧', '◆', '⟐', '⟡', '◇', '✶'];
  
  // Reduce rune count on mobile for performance
  const runeCount = window.innerWidth < 640 ? 6 : 12;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: runeCount }).map((_, index) => (
        <div
          key={index}
          className="absolute text-3xl sm:text-4xl md:text-6xl animate-drift-rune opacity-10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${20 + Math.random() * 10}s`,
          }}
        >
          <span className="animate-color-shift">
            {runes[Math.floor(Math.random() * runes.length)]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default BackgroundRunes;