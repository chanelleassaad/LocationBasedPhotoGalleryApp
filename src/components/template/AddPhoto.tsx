import React, {useState} from 'react';
import {Alert, Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {MainNavigatorNavigationProp} from '../../navigation/MainNavigator.types';
import Button from '../atoms/Button';
import PhotoOptionsModal from '../../modals/PhotoOptionsModal';
import {useCameraPermission} from 'react-native-vision-camera';
import {requestLocationPermission} from '../../permissions/useLocationPermission';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import PhotoSelectionModal from '../../modals/PhotoSelectionModal';
import {addPhotoFromGallery} from '../../config/AxiosApi';

const AddPhoto = () => {
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showPhotoSelectionModal, setShowPhotoSelectionModal] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  const [photos, setPhotos] = useState([]);
  const {requestPermission} = useCameraPermission();
  const navigation = useNavigation<MainNavigatorNavigationProp>();

  const openCamera = () => {
    setShowOptionsModal(false);
    navigation.navigate('CameraScreen');
  };

  const handleCameraPermission = async () => {
    const isAccessGranted = await requestPermission();

    if (!isAccessGranted) {
      Alert.alert(
        'Camera Permission Required',
        'Please grant camera permission to use this feature.',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Open Settings',
            style: 'default',
            onPress: async () => {
              await Linking.openSettings();
            },
          },
        ],
      );
      return;
    }

    if (!locationPermission) {
      const granted = await requestLocationPermission();
      setLocationPermission(granted);
    }

    openCamera();
  };

  const handleLibraryPermission = async () => {
    const params = {first: 20};
    try {
      const result = await CameraRoll.getPhotos(params);

      const extractedPhotos = result.edges.map(edge => ({
        uri: edge.node.image.uri,
        location: edge.node.location?.heading,
        latitude: edge.node.location?.latitude,
        longitude: edge.node.location?.longitude,
      }));

      setPhotos(extractedPhotos);
      setShowOptionsModal(false);
      setShowPhotoSelectionModal(true);
    } catch (error) {
      console.error('Failed to get photos from library:', error);
    }
  };

  const handleSelectPhoto = (photo: any) => {
    addPhotoFromGallery(photo);
    setShowPhotoSelectionModal(false);
  };

  return (
    <>
      <Button title="Add Photo" onPress={() => setShowOptionsModal(true)} />

      <PhotoOptionsModal
        visible={showOptionsModal}
        onClose={() => setShowOptionsModal(false)}
        onTakePhoto={handleCameraPermission}
        onChooseFromLibrary={handleLibraryPermission}
      />

      <PhotoSelectionModal
        visible={showPhotoSelectionModal}
        photos={photos}
        onSelectPhoto={handleSelectPhoto}
        onClose={() => setShowPhotoSelectionModal(false)}
      />
    </>
  );
};

export default AddPhoto;
