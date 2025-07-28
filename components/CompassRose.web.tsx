import React, { useState, useRef } from 'react';

interface CompassRoseProps {
  size?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const CompassRose: React.FC<CompassRoseProps> = ({ 
  size = 80, 
  position = 'top-right' 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const compassRef = useRef<HTMLDivElement>(null);

  const getInitialPosition = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      zIndex: 1000,
      backgroundColor: 'rgba(255, 255, 255, 0.1)', // Fundo semi-transparente para visibilidade
      borderRadius: '50%',
      padding: '4px',
      cursor: isDragging ? 'grabbing' : 'grab',
      userSelect: 'none',
      transition: isDragging ? 'none' : 'all 0.2s ease',
      border: '1px solid rgba(0,0,0,0.2)', // Borda sutil para visibilidade
    };

    // Se já foi movido, usar posição atual
    if (currentPosition.x !== 0 || currentPosition.y !== 0) {
      return {
        ...baseStyle,
        left: currentPosition.x,
        top: currentPosition.y,
      };
    }

    // Posição inicial baseada na prop position
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

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = compassRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const mapContainer = compassRef.current?.parentElement;
    if (!mapContainer) return;
    
    const mapRect = mapContainer.getBoundingClientRect();
    const newX = e.clientX - mapRect.left - dragOffset.x;
    const newY = e.clientY - mapRect.top - dragOffset.y;
    
    // Limitar dentro dos bounds do mapa
    const maxX = mapRect.width - size;
    const maxY = mapRect.height - size;
    
    setCurrentPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <div 
      ref={compassRef}
      style={{ ...getInitialPosition(), width: size, height: size }}
      onMouseDown={handleMouseDown}
    >
      <svg
        width={size - 8}
        height={size - 8}
        viewBox="0 0 100 100"
        style={{ 
          display: 'block',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))', // Sombra mais forte
        }}
      >
        {/* Círculo externo com fundo mais visível */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="rgba(255, 255, 255, 0.3)"
          stroke="#333"
          strokeWidth="2"
        />
        
        {/* Círculo interno */}
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="rgba(102, 102, 102, 0.8)"
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
          <line x1="50" y1="50" x2="75" y2="25" stroke="rgba(102, 102, 102, 1)" strokeWidth="1" />
          <text x="78" y="22" textAnchor="middle" fontSize="8" fill="rgba(102, 102, 102, 1)">NE</text>
        </g>
        
        {/* Noroeste */}
        <g>
          <line x1="50" y1="50" x2="25" y2="25" stroke="rgba(102, 102, 102, 1)" strokeWidth="1" />
          <text x="22" y="22" textAnchor="middle" fontSize="8" fill="rgba(102, 102, 102, 1)">NO</text>
        </g>
        
        {/* Sudeste */}
        <g>
          <line x1="50" y1="50" x2="75" y2="75" stroke="rgba(102, 102, 102, 1)" strokeWidth="1" />
          <text x="78" y="82" textAnchor="middle" fontSize="8" fill="rgba(102, 102, 102, 1)">SE</text>
        </g>
        
        {/* Sudoeste */}
        <g>
          <line x1="50" y1="50" x2="25" y2="75" stroke="rgba(102, 102, 102, 1)" strokeWidth="1" />
          <text x="22" y="82" textAnchor="middle" fontSize="8" fill="rgba(102, 102, 102, 1)">SO</text>
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
              stroke="rgba(153, 153, 153, 0.8)"
              strokeWidth="1"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default CompassRose;

