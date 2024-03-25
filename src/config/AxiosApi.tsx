import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';

export const baseURL =
  'https://6601591187c91a11641aa7a0.mockapi.io/myapp/photos';

export interface IPhoto {
  id: string;
  uri: string;
  location: string;
  latitude: number;
  longitude: number;
}

let photosData: IPhoto[] = [];

export const addPhoto = async (photoUri: string) => {
  try {
    Geolocation.getCurrentPosition(
      async position => {
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyA9VuLDd9-gCTm3zpgpXe0L9fb3T39HHkw`,
          );

          if (
            response.data &&
            response.data.results &&
            response.data.results.length > 0
          ) {
            const locationName = response.data.results[0].formatted_address;
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            console.log('Location name:', locationName);

            const photoData = {
              uri: photoUri,
              location: locationName,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };

            const dataResponse = await axios.post(baseURL, photoData);
            console.log('Photo added:', dataResponse.data);

            // Update the local state with the new photo
            const newPhoto: IPhoto = {
              id: dataResponse.data.id,
              uri: photoUri,
              location: locationName,
              latitude: latitude,
              longitude: longitude,
            };
            photosData = [...photosData, newPhoto];
            console.log('Photos updated:', photosData);
          } else {
            console.error('No results found in the Google Maps API response');
          }
        } catch (error) {
          console.error('Failed to process Google Maps API response:', error);
        }
      },
      error => {
        console.error('Failed to get location:', error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  } catch (error) {
    console.error('Failed to add photo:', error);
  }
};

export const deletePhoto = async (id: string) => {
  try {
    const response = await axios.delete(`${baseURL}/${id}`);
    photosData = photosData.filter(photo => photo.id !== id);
    console.log('Photo deleted:', response.data);
  } catch (error) {
    console.error('Failed to delete photo:', error);
  }
};

export const getAllPhotos = async () => {
  try {
    const response = await axios.get(baseURL);
    photosData = response.data;
    console.log('All photos:', photosData);
    return photosData;
  } catch (error) {
    console.error('Failed to get photos:', error);
    throw error;
  }
};

export const getPhotosData = () => {
  return photosData;
};
