import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

type DetailsProps = {
  title: string;
  text?: string;
};

const DetailsText = ({title, text}: DetailsProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}:</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 35,
    justifyContent: 'flex-start',
  },
  title: {
    marginRight: 5,
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    color: 'white',
  },
});

export default DetailsText;
