import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

type ButtonProps = {
  onPress: () => void;
};

const CloseButton: React.FC<ButtonProps> = ({onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.title}>X</Text>
    </Pressable>
  );
};

export default CloseButton;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    position: 'absolute',
    top: 0,
    right: 20,
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
});
