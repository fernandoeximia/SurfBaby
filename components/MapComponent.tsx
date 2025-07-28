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
  // Coordenadas da Praia do Forte, Cabo Frio, RJ
  const praiaDoForte = {
    latitude: -22.8808,
    longitude: -42.0186,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const markerCoordinate = {
    latitude: -22.8808,
    longitude: -42.0186,
  };

  return (
    <View style={[styles.container, { width, height }]}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={praiaDoForte}
        mapType="hybrid"
        showsUserLocation={true}
        showsMyLocationButton={true}
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
          }
        ]}
      >
        <Marker
          coordinate={markerCoordinate}
          title="🏄‍♂️ Praia do Forte"
          description="Cabo Frio, RJ - Ideal para surf, kitesurf e windsurf"
          pinColor="#00BCD4"
        />
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

