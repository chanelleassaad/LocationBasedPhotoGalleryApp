import React from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import Button from '../components/atoms/Button';
import CloseButton from '../components/atoms/CloseButton';

interface PhotoOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  onTakePhoto: () => void;
  onChooseFromLibrary: () => void;
}

const PhotoOptionsModal: React.FC<PhotoOptionsModalProps> = ({
  visible,
  onClose,
  onTakePhoto,
  onChooseFromLibrary,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <CloseButton onPress={onClose} />
        <Button title="Take Photo" onPress={onTakePhoto} />
        <Button title="Choose from Library" onPress={onChooseFromLibrary} />
      </View>
    </Modal>
  );
};

export default PhotoOptionsModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
