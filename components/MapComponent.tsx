import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

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
    latitudeDelta: 0.006, // Ajustado para zoom 15.76
    longitudeDelta: 0.006,
  };

  return (
    <View style={[styles.container, { width, height }]}>
      <MapView
        provider={PROVIDER_GOOGLE}
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
      >
        {/* Sem marcadores para visual limpo */}
      </MapView>
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

