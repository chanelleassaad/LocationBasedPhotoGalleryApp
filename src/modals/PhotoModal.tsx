import React from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import {IPhoto} from '../config/AxiosApi';
import CloseButton from '../components/atoms/CloseButton';
import DetailsText from '../components/atoms/DetailsText';
import ImageWithHOC from '../components/molecules/ImageWithHOC';

interface PhotoModalProps {
  photo: IPhoto | null;
  onClose: () => void;
}

const PhotoModal: React.FC<PhotoModalProps> = ({photo, onClose}) => {
  return (
    <Modal visible={photo !== null} animationType="slide">
      <View style={styles.modalContent}>
        {photo && <ImageWithHOC photo={photo} onClose={onClose} />}
        <View style={styles.text}>
          <DetailsText title="Id" text={photo?.id} />
          <DetailsText title="Location" text={photo?.location} />
          <DetailsText title="URI" text={photo?.uri} />
        </View>
        <CloseButton onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  text: {
    marginBottom: 100,
  },
  imageWrapper: {
    left: 0,
    right: 0,
  },
});

export default PhotoModal;
