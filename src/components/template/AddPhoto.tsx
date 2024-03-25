import React, {useState} from 'react';
import {Alert, Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useCameraPermission} from 'react-native-vision-camera';
import {MainNavigatorNavigationProp} from '../../navigation/MainNavigator.types';
import Button from '../atoms/Button';
import PhotoOptionsModal from '../organisms/PhotoOptionsModal';

const AddPhoto = () => {
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const {requestPermission} = useCameraPermission();

  const navigation = useNavigation<MainNavigatorNavigationProp>();

  const openCamera = () => {
    setShowOptionsModal(false);
    navigation.navigate('CameraScreen');
  };

  const handleCameraPermission = async () => {
    const isAccessGranted = await requestPermission();

    if (!isAccessGranted) {
      Alert.alert('Permission required', 'Open settings to grant permission', [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Open settings',
          style: 'default',
          onPress: async () => {
            await Linking.openSettings();
          },
        },
      ]);
      return;
    }

    openCamera();
  };

  return (
    <>
      <Button title="Add Photo" onPress={() => setShowOptionsModal(true)} />

      <PhotoOptionsModal
        visible={showOptionsModal}
        onClose={() => setShowOptionsModal(false)}
        onTakePhoto={handleCameraPermission}
      />
    </>
  );
};

export default AddPhoto;
