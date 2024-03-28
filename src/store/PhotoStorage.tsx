import AsyncStorage from '@react-native-async-storage/async-storage';
import {IPhoto} from '../config/AxiosApi';

export const setPhotoStorage = async (value: IPhoto[]) => {
  try {
    console.log('hi', await getPhotoStorage());

    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('MY_PHOTOS', jsonValue);
    console.log('hi', await getPhotoStorage());
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
    // Get the current stored photos from AsyncStorage
    const storedPhotosData = await getPhotoStorage();
    if (storedPhotosData) {
      // Filter out the photo with the given id
      const updatedPhotosData = storedPhotosData.filter(
        (photo: {id: string}) => photo.id !== id,
      );
      // Save the updated photos data back to AsyncStorage
      await setPhotoStorage(updatedPhotosData);
      console.log('Photo deleted from storage');
    }
  } catch (error) {
    console.error('Failed to delete photo from storage:', error);
    throw error;
  }
};

export const addPhotoStorage = async (photo: IPhoto) => {
  try {
    // Get the current stored photos from AsyncStorage
    const storedPhotosData = await getPhotoStorage();
    if (storedPhotosData) {
      // Add the new photo to the existing photos data
      const updatedPhotosData = [...storedPhotosData, photo];
      // Save the updated photos data back to AsyncStorage
      await setPhotoStorage(updatedPhotosData);
      console.log('Photo added to storage');
    } else {
      // If there are no stored photos, add the new photo as the only one
      await setPhotoStorage([photo]);
      console.log('Photo added to storage');
    }
  } catch (error) {
    console.error('Failed to add photo to storage:', error);
    throw error;
  }
};
