import axios from 'axios';

const baseURL =
  'https://crudcrud.com/api/e8f7d8d217184096b78284642d4d6de4/photos';

export const addPhoto = async (photoUri: string) => {
  try {
    const photoData = {
      uri: photoUri,
    };

    const response = await axios.post(baseURL, photoData);

    console.log('Photo added :', response.data);
  } catch (error) {
    console.error('Failed to add photo:', error);
  }
};

// export const deletePhoto = async (id: number) => {
//   try {
//     const response = await axios.delete(`${baseURL}/photos/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error('Failed to delete photo:', error);
//     throw error;
//   }
// };

// export const getAllPhotos = async () => {
//   try {
//     const response = await axios.get(`${baseURL}/photos`);
//     return response.data;
//   } catch (error) {
//     console.error('Failed to get photos:', error);
//     throw error;
//   }
// };
