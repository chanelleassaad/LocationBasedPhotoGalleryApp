import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

type ButtonProps = {
  onPress: () => void;
  title: string;
  disabled?: boolean;
};

const Button = ({onPress, title, disabled = false}: ButtonProps) => {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={styles.button}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    marginVertical: 10,
  },
  title: {
    color: 'white',
  },
});
