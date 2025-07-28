import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import Svg, { Line, Polygon } from 'react-native-svg';
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
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  const arrowLength = Math.min(size * 0.8, 10 + speed * 2);

  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.1],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  return (
    <Animated.View
      style={[
        styles.arrow,
        {
          left: x - size / 2,
          top: y - size / 2,
          width: size,
          height: size,
          transform: [
            { rotate: `${direction}deg` },
            { scale }
          ],
          opacity,
        }
      ]}
    >
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Seta principal */}
        <Line
          x1={size / 2}
          y1={size / 2}
          x2={size / 2}
          y2={size / 2 - arrowLength / 2}
          stroke={intensity.color}
          strokeWidth="3"
          strokeLinecap="round"
        />
        
        {/* Ponta da seta */}
        <Polygon
          points={`${size / 2},${size / 2 - arrowLength / 2} ${size / 2 - 4},${size / 2 - arrowLength / 2 + 8} ${size / 2 + 4},${size / 2 - arrowLength / 2 + 8}`}
          fill={intensity.color}
        />
        
        {/* Barbelas para ventos mais fortes */}
        {speed > 5 && (
          <>
            <Line
              x1={size / 2}
              y1={size / 2 + arrowLength / 4}
              x2={size / 2 - 3}
              y2={size / 2 + arrowLength / 4 + 6}
              stroke={intensity.color}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <Line
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
      </Svg>
    </Animated.View>
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
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Carregando dados de vento...</Text>
      </View>
    );
  }

  if (error || !windData) {
    return (
      <View style={[styles.infoBox, { backgroundColor: 'rgba(255,0,0,0.7)' }]}>
        <Text style={styles.infoText}>{error || 'Dados de vento indisponíveis'}</Text>
      </View>
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
    <View style={styles.container}>
      {/* Informações do vento com botão toggle */}
      <View style={styles.windInfo}>
        <View style={styles.windHeader}>
          <Text style={styles.windTitle}>🌬️ Vento Atual</Text>
          <TouchableOpacity
            onPress={() => setShowWindArrows(!showWindArrows)}
            style={[
              styles.toggleButton,
              { backgroundColor: showWindArrows ? '#00BCD4' : '#666' }
            ]}
          >
            <Text style={styles.toggleButtonText}>
              {showWindArrows ? 'Ocultar' : 'Mostrar'}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.windText}>Direção: {cardinal} ({windData.direction}°)</Text>
        <Text style={styles.windText}>Velocidade: {speedKmh.toFixed(1)} km/h</Text>
        <Text style={styles.windText}>Intensidade: {intensity.description}</Text>
        <Text style={styles.windTimestamp}>
          Atualizado: {new Date(windData.timestamp).toLocaleTimeString('pt-BR')}
        </Text>
      </View>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  arrow: {
    position: 'absolute',
    zIndex: 999,
  },
  infoBox: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 8,
    borderRadius: 4,
    zIndex: 1000,
  },
  infoText: {
    color: 'white',
    fontSize: 12,
  },
  windInfo: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 12,
    borderRadius: 8,
    minWidth: 200,
    zIndex: 1000,
  },
  windHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  windTitle: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  toggleButton: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  toggleButtonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  windText: {
    color: 'white',
    fontSize: 12,
    marginBottom: 2,
  },
  windTimestamp: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 10,
    marginTop: 4,
  },
});

export default WindArrows;

