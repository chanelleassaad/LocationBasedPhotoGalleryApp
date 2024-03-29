import React from 'react';
import {TouchableOpacity, Animated, Image, StyleSheet} from 'react-native';
import {IPhoto} from '../../config/AxiosApi';

interface PhotoItemProps {
  item: IPhoto;
  animation: Animated.Value;
  onLongPress: () => void;
}

const PhotoItem = ({item, animation, onLongPress}: PhotoItemProps) => {
  const handlePressIn = () => {
    Animated.spring(animation, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      testID="photo-test"
      style={styles.imageTouch}
      onLongPress={onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}>
      <Animated.View
        style={{
          transform: [{scale: animation}],
        }}>
        <Image source={{uri: item.uri}} style={styles.image} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default PhotoItem;

const styles = StyleSheet.create({
  imageTouch: {
    marginHorizontal: 5,
    padding: 4,
  },
  image: {width: 66, height: 90, borderRadius: 5},
});
