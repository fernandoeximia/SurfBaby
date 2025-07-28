import React, { useState } from 'react';
import { View, StyleSheet, PanGestureHandler, State } from 'react-native';

interface CompassRoseProps {
  size?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const CompassRose: React.FC<CompassRoseProps> = ({ 
  size = 80, 
  position = 'top-right' 
}) => {
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  const getPositionStyle = () => {
    const baseStyle = {
      position: 'absolute' as const,
      zIndex: 1000,
    };

    switch (position) {
      case 'top-left':
        return { ...baseStyle, top: 20, left: 20 };
      case 'top-right':
        return { ...baseStyle, top: 20, right: 20 };
      case 'bottom-left':
        return { ...baseStyle, bottom: 20, left: 20 };
      case 'bottom-right':
        return { ...baseStyle, bottom: 20, right: 20 };
      default:
        return { ...baseStyle, top: 20, right: 20 };
    }
  };

  const onGestureEvent = (event: any) => {
    setTranslateX(event.nativeEvent.translationX);
    setTranslateY(event.nativeEvent.translationY);
  };

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      // Aqui você pode implementar lógica para salvar a posição final
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <View style={[
        styles.container, 
        getPositionStyle(), 
        { 
          width: size, 
          height: size,
          transform: [
            { translateX },
            { translateY }
          ]
        }
      ]}>
        <View style={styles.compassContainer}>
          <View style={[styles.compassCircle, { width: size, height: size }]}>
            {/* Norte */}
            <View style={[styles.direction, styles.north]}>
              <View style={styles.northArrow} />
            </View>
            
            {/* Sul */}
            <View style={[styles.direction, styles.south]}>
              <View style={styles.southArrow} />
            </View>
            
            {/* Leste */}
            <View style={[styles.direction, styles.east]}>
              <View style={styles.eastArrow} />
            </View>
            
            {/* Oeste */}
            <View style={[styles.direction, styles.west]}>
              <View style={styles.westArrow} />
            </View>
            
            {/* Labels */}
            <View style={[styles.label, styles.labelNorth]}>
              <View style={styles.labelText} />
            </View>
            <View style={[styles.label, styles.labelSouth]}>
              <View style={styles.labelText} />
            </View>
            <View style={[styles.label, styles.labelEast]}>
              <View style={styles.labelText} />
            </View>
            <View style={[styles.label, styles.labelWest]}>
              <View style={styles.labelText} />
            </View>
          </View>
        </View>
      </View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent', // Fundo transparente
    borderRadius: 50,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  compassContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compassCircle: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'rgba(51, 51, 51, 0.8)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Fundo muito transparente
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  direction: {
    position: 'absolute',
    width: 2,
    height: 30,
    backgroundColor: 'rgba(51, 51, 51, 0.8)',
  },
  north: {
    top: 5,
    backgroundColor: '#FF0000', // Vermelho para Norte
  },
  south: {
    bottom: 5,
    backgroundColor: 'rgba(51, 51, 51, 0.8)',
  },
  east: {
    right: 5,
    width: 30,
    height: 2,
    backgroundColor: 'rgba(51, 51, 51, 0.8)',
  },
  west: {
    left: 5,
    width: 30,
    height: 2,
    backgroundColor: 'rgba(51, 51, 51, 0.8)',
  },
  northArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FF0000',
    position: 'absolute',
    top: -8,
    left: -3,
  },
  southArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'rgba(51, 51, 51, 0.8)',
    position: 'absolute',
    bottom: -8,
    left: -3,
  },
  eastArrow: {
    width: 0,
    height: 0,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderLeftWidth: 8,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'rgba(51, 51, 51, 0.8)',
    position: 'absolute',
    right: -8,
    top: -3,
  },
  westArrow: {
    width: 0,
    height: 0,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderRightWidth: 8,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'rgba(51, 51, 51, 0.8)',
    position: 'absolute',
    left: -8,
    top: -3,
  },
  label: {
    position: 'absolute',
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelNorth: {
    top: -8,
  },
  labelSouth: {
    bottom: -8,
  },
  labelEast: {
    right: -8,
  },
  labelWest: {
    left: -8,
  },
  labelText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'rgba(51, 51, 51, 0.8)',
  },
});

export default CompassRose;

