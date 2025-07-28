import React, { useEffect, useState } from 'react';
import StormGlassService, { WindData } from '../services/stormGlassApi';

// Instância do serviço
const stormGlassService = new StormGlassService('05fea5a4-6ae1-11f0-bc20-0242ac130006-05fea630-6ae1-11f0-bc20-0242ac130006');

interface WindArrowsProps {
  lat: number;
  lng: number;
  mapWidth: number;
  mapHeight: number;
}

interface WindArrowProps {
  direction: number;
  speed: number;
  intensity: {
    scale: number;
    description: string;
    color: string;
  };
  x: number;
  y: number;
  size?: number;
}

const WindArrow: React.FC<WindArrowProps> = ({ 
  direction, 
  speed, 
  intensity, 
  x, 
  y, 
  size = 40 
}) => {
  const arrowStyle: React.CSSProperties = {
    position: 'absolute',
    left: x - size / 2,
    top: y - size / 2,
    width: size,
    height: size,
    transform: `rotate(${direction}deg)`,
    transformOrigin: 'center',
    animation: 'windPulse 2s ease-in-out infinite',
    zIndex: 999,
  };

  const arrowLength = Math.min(size * 0.8, 10 + speed * 2); // Tamanho baseado na velocidade

  return (
    <div style={arrowStyle}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ 
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
        }}
      >
        {/* Seta principal */}
        <line
          x1={size / 2}
          y1={size / 2}
          x2={size / 2}
          y2={size / 2 - arrowLength / 2}
          stroke={intensity.color}
          strokeWidth="3"
          strokeLinecap="round"
        />
        
        {/* Ponta da seta */}
        <polygon
          points={`${size / 2},${size / 2 - arrowLength / 2} ${size / 2 - 4},${size / 2 - arrowLength / 2 + 8} ${size / 2 + 4},${size / 2 - arrowLength / 2 + 8}`}
          fill={intensity.color}
        />
        
        {/* Cauda da seta (barbelas para indicar intensidade) */}
        {speed > 5 && (
          <>
            <line
              x1={size / 2}
              y1={size / 2 + arrowLength / 4}
              x2={size / 2 - 3}
              y2={size / 2 + arrowLength / 4 + 6}
              stroke={intensity.color}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1={size / 2}
              y1={size / 2 + arrowLength / 4}
              x2={size / 2 + 3}
              y2={size / 2 + arrowLength / 4 + 6}
              stroke={intensity.color}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </>
        )}
        
        {/* Barbelas adicionais para ventos mais fortes */}
        {speed > 10 && (
          <>
            <line
              x1={size / 2}
              y1={size / 2 + arrowLength / 6}
              x2={size / 2 - 2}
              y2={size / 2 + arrowLength / 6 + 4}
              stroke={intensity.color}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1={size / 2}
              y1={size / 2 + arrowLength / 6}
              x2={size / 2 + 2}
              y2={size / 2 + arrowLength / 6 + 4}
              stroke={intensity.color}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
    </div>
  );
};

const WindArrows: React.FC<WindArrowsProps> = ({ lat, lng, mapWidth, mapHeight }) => {
  const [windData, setWindData] = useState<WindData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showWindArrows, setShowWindArrows] = useState(true); // Estado para toggle

  useEffect(() => {
    const fetchWindData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await stormGlassService.getWindData(lat, lng);
        if (data) {
          setWindData(data);
        } else {
          setError('Não foi possível obter dados de vento');
        }
      } catch (err) {
        setError('Erro ao carregar dados de vento');
        console.error('Erro:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWindData();
    
    // Atualizar dados a cada 10 minutos
    const interval = setInterval(fetchWindData, 10 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [lat, lng]);

  if (loading) {
    return (
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '12px',
        zIndex: 1000,
      }}>
        Carregando dados de vento...
      </div>
    );
  }

  if (error || !windData) {
    return (
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        background: 'rgba(255,0,0,0.7)',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '12px',
        zIndex: 1000,
      }}>
        {error || 'Dados de vento indisponíveis'}
      </div>
    );
  }

  const intensity = StormGlassService.getWindIntensity(windData.speed);
  const speedKmh = StormGlassService.msToKmh(windData.speed);
  const cardinal = StormGlassService.degreesToCardinal(windData.direction);

  // Múltiplas posições das setas distribuídas por todo o mapa
  const arrowPositions = [
    { x: mapWidth * 0.15, y: mapHeight * 0.25 },
    { x: mapWidth * 0.35, y: mapHeight * 0.15 },
    { x: mapWidth * 0.55, y: mapHeight * 0.20 },
    { x: mapWidth * 0.75, y: mapHeight * 0.30 },
    { x: mapWidth * 0.85, y: mapHeight * 0.45 },
    { x: mapWidth * 0.25, y: mapHeight * 0.50 },
    { x: mapWidth * 0.45, y: mapHeight * 0.60 },
    { x: mapWidth * 0.65, y: mapHeight * 0.70 },
    { x: mapWidth * 0.80, y: mapHeight * 0.80 },
    { x: mapWidth * 0.20, y: mapHeight * 0.75 },
  ];

  return (
    <>
      {/* CSS para animação */}
      <style>
        {`
          @keyframes windPulse {
            0%, 100% { opacity: 0.8; transform: scale(1) rotate(${windData.direction}deg); }
            50% { opacity: 1; transform: scale(1.1) rotate(${windData.direction}deg); }
          }
        `}
      </style>
      
      {/* Informações do vento com botão toggle */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: '12px',
        borderRadius: '8px',
        minWidth: '200px',
        zIndex: 1000,
        color: 'white',
        fontSize: '12px'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '8px'
        }}>
          <div style={{ fontWeight: 'bold' }}>🌬️ Vento Atual</div>
          <button
            onClick={() => setShowWindArrows(!showWindArrows)}
            style={{
              backgroundColor: showWindArrows ? '#00BCD4' : '#666',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '4px 8px',
              fontSize: '10px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            {showWindArrows ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
        <div>Direção: {cardinal} ({windData.direction}°)</div>
        <div>Velocidade: {speedKmh.toFixed(1)} km/h</div>
        <div>Intensidade: {intensity.description}</div>
        <div style={{ fontSize: '10px', opacity: 0.8, marginTop: '4px' }}>
          Atualizado: {new Date(windData.timestamp).toLocaleTimeString('pt-BR')}
        </div>
      </div>

      {/* Múltiplas setas de vento distribuídas - condicionadas ao toggle */}
      {showWindArrows && arrowPositions.map((pos, index) => (
        <WindArrow
          key={index}
          direction={windData.direction}
          speed={windData.speed}
          intensity={intensity}
          x={pos.x}
          y={pos.y}
          size={50 + windData.speed * 2} // Tamanho médio baseado na velocidade
        />
      ))}
    </>
  );
};

export default WindArrows;

