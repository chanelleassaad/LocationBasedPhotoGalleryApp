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

  useEffect(() => {
    // Load all photos data
    getAllPhotos().then(() => {
      const photosData = getPhotosData();

      // Organize photos by location
      const locations: {[key: string]: IPhoto[]} = {'No Location': []};
      photosData.forEach(photo => {
        const location = photo.location || 'No Location';
        if (!locations[location]) {
          locations[location] = [];
        }
        locations[location].push(photo);
      });

      // Convert locations object to an array of sections for SectionList
      const sections = Object.keys(locations).map(location => ({
        title: location,
        data: locations[location],
      }));

      setPhotosByLocation(sections);
    });
  }, []);

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <View>
      {photosByLocation.map(({title, data}) => (
        <View key={title}>
          <Text style={styles.text}>{title}</Text>
          <FlatList
            horizontal
            data={data}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.imageTouch}
                onPress={() => setSelectedPhoto(item)}>
                <Image source={{uri: item.uri}} style={styles.image} />
              </TouchableOpacity>
            )}
          />
        </View>
      ))}
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
});
