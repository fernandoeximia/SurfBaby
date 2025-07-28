import React from 'react';
import { View, StyleSheet } from 'react-native';

interface CompassRoseProps {
  size?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const CompassRose: React.FC<CompassRoseProps> = ({ 
  size = 80, 
  position = 'top-right' 
}) => {
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

  return (
    <View style={[styles.container, getPositionStyle(), { width: size, height: size }]}>
      {/* SVG será renderizado diferentemente no React Native */}
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
            <View style={styles.labelText}>N</View>
          </View>
          <View style={[styles.label, styles.labelSouth]}>
            <View style={styles.labelText}>S</View>
          </View>
          <View style={[styles.label, styles.labelEast]}>
            <View style={styles.labelText}>E</View>
          </View>
          <View style={[styles.label, styles.labelWest]}>
            <View style={styles.labelText}>O</View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
    borderColor: '#333',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  direction: {
    position: 'absolute',
    width: 2,
    height: 30,
    backgroundColor: '#333',
  },
  north: {
    top: 5,
    backgroundColor: '#FF0000', // Vermelho para Norte
  },
  south: {
    bottom: 5,
    backgroundColor: '#333',
  },
  east: {
    right: 5,
    width: 30,
    height: 2,
    backgroundColor: '#333',
  },
  west: {
    left: 5,
    width: 30,
    height: 2,
    backgroundColor: '#333',
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
    borderTopColor: '#333',
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
    borderLeftColor: '#333',
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
    borderRightColor: '#333',
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
    color: '#333',
  },
});

export default CompassRose;

