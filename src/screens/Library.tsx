import {View} from 'react-native';
import React from 'react';
import AddPhoto from '../components/template/AddPhoto';
import PhotosList from '../components/template/PhotosList';

const Library = () => {
  return (
    <View style={{marginHorizontal: 10, marginBottom: 120}}>
      <AddPhoto />
      <PhotosList />
    </View>
  );
};

export default Library;
