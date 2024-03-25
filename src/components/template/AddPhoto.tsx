import React, {useState} from 'react';
import {Alert, Linking, PermissionsAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useCameraPermission} from 'react-native-vision-camera';
import {MainNavigatorNavigationProp} from '../../navigation/MainNavigator.types';
import Button from '../atoms/Button';
import PhotoOptionsModal from '../../modals/PhotoOptionsModal';

const AddPhoto = () => {
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  const {requestPermission} = useCameraPermission();
  const navigation = useNavigation<MainNavigatorNavigationProp>();

  const openCamera = () => {
    setShowOptionsModal(false);
    navigation.navigate('CameraScreen');
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      setLocationPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
    } catch (err) {
      console.error('Failed to request location permission:', err);
      setLocationPermission(false);
    }
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
      await requestLocationPermission();
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
