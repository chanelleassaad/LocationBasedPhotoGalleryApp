import {View, StyleSheet} from 'react-native';
import React from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const Map = () => {
  return (
    <View style={styles.mapcontainer}>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
        />
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  mapcontainer: {
    height: 610,
    width: 'auto',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
