import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, StyleSheet, Animated} from 'react-native';
import {IPhoto, getAllPhotos, getPhotosData} from '../../config/AxiosApi';
import PhotoModal from '../../modals/PhotoModal';
import PhotoItem from '../organisms/PhotoItem';

const PhotosList: React.FC = () => {
  const [photosByLocation, setPhotosByLocation] = useState<
    {title: string; data: IPhoto[]}[]
  >([]);
  const [selectedPhoto, setSelectedPhoto] = useState<IPhoto | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    let photosData = [];
    // const photoStorage = await getPhotoStorage();
    // if (photoStorage) {
    //   photosData = photoStorage;
    // } else {
    //   await getAllPhotos();
    //   photosData = getPhotosData();
    // }
    await getAllPhotos();
    photosData = getPhotosData();

    const locations: {[key: string]: IPhoto[]} = {'No Location': []};
    photosData.forEach((photo: IPhoto) => {
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
              horizontal
              data={item.data}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => {
                const animation = new Animated.Value(1);
                return (
                  <PhotoItem
                    item={item}
                    onPress={() => setSelectedPhoto(item)}
                    animation={animation}
                  />
                );
              }}
            />
          </View>
        )}
        onRefresh={loadPhotos}
        refreshing={refreshing}
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
