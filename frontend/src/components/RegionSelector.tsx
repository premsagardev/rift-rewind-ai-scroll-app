import React from 'react';

interface RegionSelectorProps {
  value: string;
  onChange: (region: string) => void;
  disabled?: boolean;
}

const regions = [
  { code: 'na1', name: 'North America', flag: '🇺🇸' },
  { code: 'euw1', name: 'Europe West', flag: '🇪🇺' },
  { code: 'eun1', name: 'Europe Nordic & East', flag: '🇪🇺' },
  { code: 'kr', name: 'Korea', flag: '🇰🇷' },
  { code: 'jp1', name: 'Japan', flag: '🇯🇵' },
  { code: 'br1', name: 'Brazil', flag: '🇧🇷' },
  { code: 'la1', name: 'Latin America North', flag: '🌎' },
  { code: 'la2', name: 'Latin America South', flag: '🌎' },
  { code: 'tr1', name: 'Turkey', flag: '🇹🇷' },
  { code: 'ru', name: 'Russia', flag: '🇷🇺' }
];

const RegionSelector: React.FC<RegionSelectorProps> = ({ value, onChange, disabled = false }) => {
  return (
    <div className="relative">
      <label className="block text-parchment/80 font-body text-sm mb-2">
        Region
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full px-4 py-3 bg-navy/90 border-2 border-purple/30 rounded-xl text-parchment focus:outline-none focus:border-gold transition-all duration-500 font-body backdrop-blur-sm appearance-none cursor-pointer disabled:opacity-50"
      >
        {regions.map((region) => (
          <option key={region.code} value={region.code} className="bg-navy text-parchment">
            {region.flag} {region.name}
          </option>
        ))}
      </select>
      
      {/* Custom dropdown arrow */}
      <div className="absolute right-3 top-9 pointer-events-none text-gold">
        ▼
      </div>
    </div>
  );
};

export default RegionSelector;