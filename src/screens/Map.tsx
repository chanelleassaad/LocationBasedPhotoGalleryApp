import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {getAllPhotos, getPhotosData, IPhoto} from '../config/AxiosApi';

const Map = () => {
  const [photos, setPhotos] = useState<IPhoto[]>([]);

  useEffect(() => {
    getAllPhotos().then(() => {
      const photosData = getPhotosData();
      setPhotos(photosData);
    });
  }, []);

  return (
    <View style={styles.mapcontainer}>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {photos.map(photo => (
          <Marker
            key={photo.id}
            coordinate={{
              latitude: photo.latitude,
              longitude: photo.longitude,
            }}
            description={'This is a marker in React Natve'}>
            <Image
              source={{uri: `file://${photo?.uri}`}}
              style={styles.image}
            />
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  mapcontainer: {
    height: '100%',
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  image: {
    height: 35,
    width: 35,
  },
});
