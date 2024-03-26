import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import {IPhoto, getAllPhotos, getPhotosData} from '../../config/AxiosApi';
import PhotoModal from '../../modals/PhotoModal';

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
    setRefreshing(true);
    await getAllPhotos();
    const photosData = getPhotosData();

    const locations: {[key: string]: IPhoto[]} = {'No Location': []};
    photosData.forEach(photo => {
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
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.imageTouch}
                  onPress={() => setSelectedPhoto(item)}>
                  <Image source={{uri: item.uri}} style={styles.image} />
                </TouchableOpacity>
              )}
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
  imageTouch: {
    marginHorizontal: 5,
  },
  image: {width: 50, height: 70, borderRadius: 5},
  loadingMore: {
    marginVertical: 10,
  },
});
