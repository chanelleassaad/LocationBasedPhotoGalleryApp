import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {IPhoto, getAllPhotos, getPhotosData} from '../../config/AxiosApi';
import PhotoModal from '../../modals/PhotoModal';
import PhotoItem from '../organisms/PhotoItem';

const PhotosList = () => {
  const [photosByLocation, setPhotosByLocation] = useState<
    {title: string; data: IPhoto[]}[]
  >([]);
  const [selectedPhoto, setSelectedPhoto] = useState<IPhoto | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState<IPhoto[]>([]);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    setLoadingMore(true);

    await getAllPhotos(page);
    const photosData = getPhotosData();
    setPhotos(prev => [...prev, ...photosData]);

    const locations: {[key: string]: IPhoto[]} = {};

    photos.forEach((photo: IPhoto) => {
      const location = photo.location || 'No Location';
      if (!locations[location]) {
        locations[location] = [];
      }
      locations[location].push(photo);
    });

    const sections = Object.keys(locations).map(location => ({
      title: location,
      data: locations[location],
    }));

    setPhotosByLocation([...sections]);
    setRefreshing(false);
    setLoadingMore(false);
    setPage(prev => prev + 1);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <View>
      <FlatList
        data={photosByLocation}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View key={item.title}>
            <Text style={styles.text}>{item.title}</Text>
            <FlatList
              data={item.data}
              keyExtractor={item => item.id.toString()}
              numColumns={4}
              renderItem={({item}) => {
                const animation = new Animated.Value(1);
                return (
                  <PhotoItem
                    item={item}
                    onLongPress={() => setSelectedPhoto(item)}
                    animation={animation}
                  />
                );
              }}
            />
          </View>
        )}
        onRefresh={loadPhotos}
        refreshing={refreshing}
        onEndReached={loadPhotos}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          loadingMore && <ActivityIndicator style={styles.loadingMore} />
        }
      />
      <PhotoModal photo={selectedPhoto} onClose={closeModal} />
    </View>
  );
};

export default PhotosList;

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    marginVertical: 10,
    padding: 5,
    backgroundColor: 'grey',
    color: 'white',
  },
  loadingMore: {
    marginVertical: 10,
  },
});
