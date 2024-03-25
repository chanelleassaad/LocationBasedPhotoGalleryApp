import {View} from 'react-native';
import React from 'react';
import AddPhoto from '../components/template/AddPhoto';
import PhotosList from '../components/organisms/PhotosList';

const Library = () => {
  return (
    <View>
      <AddPhoto />
      <PhotosList />
    </View>
  );
};

export default Library;
