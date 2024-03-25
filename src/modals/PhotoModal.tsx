import React from 'react';
import {Modal, View, Image, StyleSheet} from 'react-native';
import {IPhoto} from '../config/AxiosApi';
import CloseButton from '../components/atoms/CloseButton';
import DetailsText from '../components/atoms/DetailsText';

interface PhotoModalProps {
  photo: IPhoto | null;
  onClose: () => void;
  onDelete: (photo: IPhoto) => void;
}

const PhotoModal: React.FC<PhotoModalProps> = ({photo, onClose, onDelete}) => {
  return (
    <Modal visible={photo !== null} animationType="slide">
      <View style={styles.modalContent}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: `file://${photo?.uri}`}}
            style={styles.modalImage}
          />
        </View>

        <DetailsText title="id" text={photo?.id} />
        <DetailsText title="id" text={photo?.location} />
        <DetailsText title="id" text={photo?.uri} />
        <CloseButton onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  modalImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  imageWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
  },
});

export default PhotoModal;
