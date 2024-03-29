import AsyncStorage from '@react-native-async-storage/async-storage';
import {IPhoto} from '../config/AxiosApi';

export const setPhotoStorage = async (value: IPhoto[]) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('MY_PHOTOS', jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getPhotoStorage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('MY_PHOTOS');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export const deleteFromPhotoStorage = async (id: string) => {
  try {
    const storedPhotosData = await getPhotoStorage();
    if (storedPhotosData) {
      const updatedPhotosData = storedPhotosData.filter(
        (photo: {id: string}) => photo.id !== id,
      );
      await setPhotoStorage(updatedPhotosData);
    }
  } catch (error) {
    console.error('Failed to delete photo from storage:', error);
    throw error;
  }
};

export const addPhotoStorage = async (photo: IPhoto) => {
  try {
    const storedPhotosData = await getPhotoStorage();
    if (storedPhotosData) {
      const updatedPhotosData = [...storedPhotosData, photo];
      await setPhotoStorage(updatedPhotosData);
      console.log('Photo added to storage');
    } else {
      await setPhotoStorage([photo]);
      console.log('Photo added to storage');
    }
  } catch (error) {
    console.error('Failed to add photo to storage:', error);
    throw error;
  }
};
