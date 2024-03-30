import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {
  IPhoto,
  LIMIT,
  getAllPhotos,
  getPhotosData,
} from '../../config/AxiosApi';
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
  }, [page]);

  const loadPhotos = useCallback(async () => {
    const newPhotos = await getAllPhotos(page);
    if (newPhotos?.length === 0) {
      setRefreshing(false);
      setLoadingMore(false);
      return;
    }

    const updatedPhotos = [...photos, ...newPhotos];
    setPhotos(updatedPhotos);

    const locations: {[key: string]: IPhoto[]} = {};
    updatedPhotos.forEach((photo: IPhoto) => {
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

    setPhotosByLocation(sections);
    setRefreshing(false);
    setLoadingMore(false);
  }, [page]);

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const onEndReached = () => {
    if (!loadingMore && photos.length % LIMIT === 0) {
      setLoadingMore(true);
      const pageToFetch = Math.ceil(photos.length / LIMIT) + 1;
      setPage(pageToFetch);
    }
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
              numColumns={4}
              keyExtractor={item => item.id.toString()}
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
        onEndReached={onEndReached}
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
