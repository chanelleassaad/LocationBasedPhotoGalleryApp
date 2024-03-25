import React, {useEffect, useState} from 'react';
import {Image, SectionList, Text, TouchableOpacity, View} from 'react-native';
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
      <SectionList
        sections={photosByLocation}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={{padding: 10}}>
            <TouchableOpacity onLongPress={() => setSelectedPhoto(item)}>
              <Image source={{uri: item.uri}} style={{width: 50, height: 70}} />
            </TouchableOpacity>
          </View>
        )}
        renderSectionHeader={({section: {title}}) => (
          <View style={{backgroundColor: 'lightgray', padding: 10}}>
            <Text style={{fontWeight: 'bold'}}>{title}</Text>
          </View>
        )}
      />
      <PhotoModal
        photo={selectedPhoto}
        onClose={closeModal}
        onDelete={() => selectedPhoto && deleteSelectedPhoto(selectedPhoto)}
      />
    </View>
  );
};

export default PhotosList;
