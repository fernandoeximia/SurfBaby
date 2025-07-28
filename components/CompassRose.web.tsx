import React from 'react';

interface CompassRoseProps {
  size?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const CompassRose: React.FC<CompassRoseProps> = ({ 
  size = 80, 
  position = 'top-right' 
}) => {
  const getPositionStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      zIndex: 1000,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '50%',
      padding: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      border: '2px solid #333',
    };

    switch (position) {
      case 'top-left':
        return { ...baseStyle, top: '20px', left: '20px' };
      case 'top-right':
        return { ...baseStyle, top: '20px', right: '20px' };
      case 'bottom-left':
        return { ...baseStyle, bottom: '20px', left: '20px' };
      case 'bottom-right':
        return { ...baseStyle, bottom: '20px', right: '20px' };
      default:
        return { ...baseStyle, top: '20px', right: '20px' };
    }
  };

  return (
    <div style={{ ...getPositionStyle(), width: size, height: size }}>
      <svg
        width={size - 16}
        height={size - 16}
        viewBox="0 0 100 100"
        style={{ display: 'block' }}
      >
        {/* Círculo externo */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="#333"
          strokeWidth="2"
        />
        
        {/* Círculo interno */}
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="#666"
          strokeWidth="1"
          strokeDasharray="2,2"
        />
        
        {/* Norte (Vermelho) */}
        <g>
          <line x1="50" y1="50" x2="50" y2="10" stroke="#FF0000" strokeWidth="3" />
          <polygon points="50,5 45,15 55,15" fill="#FF0000" />
          <text x="50" y="8" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#FF0000">N</text>
        </g>
        
        {/* Sul */}
        <g>
          <line x1="50" y1="50" x2="50" y2="90" stroke="#333" strokeWidth="2" />
          <polygon points="50,95 45,85 55,85" fill="#333" />
          <text x="50" y="98" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#333">S</text>
        </g>
        
        {/* Leste */}
        <g>
          <line x1="50" y1="50" x2="90" y2="50" stroke="#333" strokeWidth="2" />
          <polygon points="95,50 85,45 85,55" fill="#333" />
          <text x="97" y="54" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#333">E</text>
        </g>
        
        {/* Oeste */}
        <g>
          <line x1="50" y1="50" x2="10" y2="50" stroke="#333" strokeWidth="2" />
          <polygon points="5,50 15,45 15,55" fill="#333" />
          <text x="3" y="54" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#333">O</text>
        </g>
        
        {/* Nordeste */}
        <g>
          <line x1="50" y1="50" x2="75" y2="25" stroke="#666" strokeWidth="1" />
          <text x="78" y="22" textAnchor="middle" fontSize="8" fill="#666">NE</text>
        </g>
        
        {/* Noroeste */}
        <g>
          <line x1="50" y1="50" x2="25" y2="25" stroke="#666" strokeWidth="1" />
          <text x="22" y="22" textAnchor="middle" fontSize="8" fill="#666">NO</text>
        </g>
        
        {/* Sudeste */}
        <g>
          <line x1="50" y1="50" x2="75" y2="75" stroke="#666" strokeWidth="1" />
          <text x="78" y="82" textAnchor="middle" fontSize="8" fill="#666">SE</text>
        </g>
        
        {/* Sudoeste */}
        <g>
          <line x1="50" y1="50" x2="25" y2="75" stroke="#666" strokeWidth="1" />
          <text x="22" y="82" textAnchor="middle" fontSize="8" fill="#666">SO</text>
        </g>
        
        {/* Centro */}
        <circle cx="50" cy="50" r="3" fill="#00BCD4" />
        
        {/* Marcações de graus */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 30) * (Math.PI / 180);
          const x1 = 50 + 40 * Math.cos(angle - Math.PI / 2);
          const y1 = 50 + 40 * Math.sin(angle - Math.PI / 2);
          const x2 = 50 + 45 * Math.cos(angle - Math.PI / 2);
          const y2 = 50 + 45 * Math.sin(angle - Math.PI / 2);
          
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#999"
              strokeWidth="1"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default CompassRose;

