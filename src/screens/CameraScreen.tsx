import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {useCameraDevice, Camera} from 'react-native-vision-camera';
import CloseButton from '../components/atoms/CloseButton';
import Button from '../components/atoms/Button';
import {useNavigation} from '@react-navigation/native';
import {MainNavigatorNavigationProp} from '../navigation/MainNavigator.types';
import {addPhoto} from '../config/AxiosApi';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
      setIsActive(true);
    })();
  }, []);

  const takePicture = async () => {
    if (camera.current) {
      try {
        const photo = await camera.current.takePhoto();
        setPhotoUri(photo.path);
      } catch (error) {
        console.error('Failed to take photo:', error);
      }
    }
  };

  const saveToApp = async () => {
    if (photoUri) {
      addPhoto(photoUri);
      navigation.navigate('Library');
    }
  };

  const retakePicture = () => {
    setPhotoUri(null);
  };

  const navigation = useNavigation<MainNavigatorNavigationProp>();

  const onClose = () => {
    navigation.navigate('Library');
  };

  return (
    <View style={{flex: 1}}>
      {device != null && hasPermission && (
        <>
          {photoUri ? (
            <Image
              source={{uri: `file://${photoUri}`}}
              style={StyleSheet.absoluteFill}
            />
          ) : (
            <Camera
              photo={true}
              style={StyleSheet.absoluteFill}
              isActive={isActive}
              device={device}
              pixelFormat="yuv"
              ref={camera}
            />
          )}
          {!photoUri && (
            <>
              <CloseButton onPress={onClose} />
              <View style={styles.buttonContainer}>
                <Button title="Take Picture" onPress={takePicture} />
              </View>
            </>
          )}
          {photoUri && (
            <>
              <CloseButton onPress={onClose} />
              <View style={styles.buttonContainer2}>
                <Button onPress={saveToApp} title="Save" />
                <Button onPress={retakePicture} title="Retake" />
              </View>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer2: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});
