import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View, FlatList} from 'react-native';
import {
  IPhoto,
  deletePhoto,
  getAllPhotos,
  getPhotosData,
} from '../../config/AxiosApi';
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

  const deleteSelectedPhoto = (photo: IPhoto) => {
    deletePhoto(photo.id);
    setSelectedPhoto(null);
  };

  return (
    <View>
      {photosByLocation.map(({title, data}) => (
        <View key={title}>
          <Text
            style={{
              fontWeight: 'bold',
              marginVertical: 10,
              padding: 5,
              backgroundColor: 'grey',
              color: 'white',
            }}>
            {title}
          </Text>
          <FlatList
            horizontal
            data={data}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{marginHorizontal: 5}}
                onPress={() => setSelectedPhoto(item)}>
                <Image
                  source={{uri: item.uri}}
                  style={{width: 50, height: 70, borderRadius: 5}}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      ))}
      <PhotoModal
        photo={selectedPhoto}
        onClose={closeModal}
        onDelete={() => selectedPhoto && deleteSelectedPhoto(selectedPhoto)}
      />
    </View>
  );
};

export default PhotosList;
