import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import CompassRose from './CompassRose';
import WindArrows from './WindArrows';

interface MapComponentProps {
  width?: number | string;
  height?: number | string;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  width = '100%', 
  height = 400 
}) => {
  // Coordenadas específicas fornecidas pelo usuário
  const coordenadas = {
    latitude: -22.8948315,
    longitude: -42.0285161,
    latitudeDelta: 0.012, // Aumentado de 0.006 para 0.012 para mostrar mais área
    longitudeDelta: 0.012, // Aumentado de 0.006 para 0.012 para mostrar mais área
  };

  return (
    <View style={[styles.container, { width, height }]}>
      <MapView
        style={styles.map}
        initialRegion={coordenadas}
        mapType="standard"
        showsUserLocation={false}
        showsMyLocationButton={false}
        showsCompass={false}
        showsScale={false}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={false}
        showsPointsOfInterest={false}
        customMapStyle={[
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#00BCD4' }]
          },
          {
            featureType: 'landscape.natural',
            elementType: 'geometry',
            stylers: [{ color: '#E8F5E8' }]
          },
          {
            featureType: 'poi',
            stylers: [{ visibility: 'off' }]
          }
        ]}
      />
      
      {/* Rosa dos ventos */}
      <CompassRose size={80} position="top-right" />
      
      {/* Setas de vento animadas */}
      <WindArrows
        lat={-22.8948315}
        lng={-42.0285161}
        mapWidth={typeof width === 'number' ? width : 400}
        mapHeight={typeof height === 'number' ? height : 400}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  map: {
    flex: 1,
  },
});

export default MapComponent;

