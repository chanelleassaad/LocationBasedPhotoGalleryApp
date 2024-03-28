import React from 'react';
import {TouchableOpacity, Animated, Image, StyleSheet} from 'react-native';
import {IPhoto} from '../../config/AxiosApi';

interface PhotoItemProps {
  item: IPhoto;
  animation: Animated.Value;
  onPress: () => void;
}

const PhotoItem: React.FC<PhotoItemProps> = ({item, animation, onPress}) => {
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
      style={styles.imageTouch}
      onLongPress={onPress}
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
  },
  image: {width: 50, height: 70, borderRadius: 5},
});
