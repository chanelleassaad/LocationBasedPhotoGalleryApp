import {useCameraPermission as useCameraPermissionInternal} from 'react-native-vision-camera';

export const useCameraPermission = () => {
  return useCameraPermissionInternal();
};
