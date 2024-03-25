import React, {useEffect, useState} from 'react';
import {Image, SectionList, Text, View} from 'react-native';
import {IPhoto, getAllPhotos, getPhotosData} from '../../config/AxiosApi';

const PhotosList: React.FC = () => {
  const [photosByLocation, setPhotosByLocation] = useState<
    {title: string; data: IPhoto[]}[]
  >([]);

  useEffect(() => {
    // Load all photos data
    getAllPhotos().then(() => {
      const photosData = getPhotosData();

      // Organize photos by location
      const locations: {[key: string]: IPhoto[]} = {};
      photosData.forEach(photo => {
        if (!locations[photo.location]) {
          locations[photo.location] = [];
        }
        locations[photo.location].push(photo);
      });

      // Convert locations object to an array of sections for SectionList
      const sections = Object.keys(locations).map(location => ({
        title: location,
        data: locations[location],
      }));

      setPhotosByLocation(sections);
    });
  }, []);

  const renderPhoto = ({item}: {item: IPhoto}) => (
    <View style={{padding: 10}}>
      <Image source={{uri: `file://${item.uri}`}} width={50} height={70} />
    </View>
  );

  const renderSectionHeader = ({
    section: {title},
  }: {
    section: {title: string};
  }) => (
    <View style={{backgroundColor: 'lightgray', padding: 10}}>
      <Text style={{fontWeight: 'bold'}}>{title}</Text>
    </View>
  );

  return (
    <SectionList
      sections={photosByLocation}
      keyExtractor={item => item.id}
      renderItem={renderPhoto}
      renderSectionHeader={renderSectionHeader}
    />
  );
};

export default PhotosList;
