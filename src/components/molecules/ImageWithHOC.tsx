import {Image, StyleSheet} from 'react-native';
import React from 'react';
import {
  gestureHandlerRootHOC,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  runOnJS,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {IPhoto, deletePhoto} from '../../config/AxiosApi';

const ImageWithHOC = gestureHandlerRootHOC(
  ({photo, onClose}: {photo: IPhoto | undefined; onClose: () => void}) => {
    const offset = useSharedValue({x: 0, y: 0});
    const start = useSharedValue({x: 0, y: 0});

    const gesture = Gesture.Pan()
      .onUpdate(e => {
        offset.value = {
          x: e.translationX + start.value.x,
          y: e.translationY + start.value.y,
        };
      })
      .onEnd(e => {
        console.log(e.translationX);
        if (e.translationX > 100) {
          let pId = photo?.id;
          console.log(pId);

          if (pId) {
            const deletePhotoId = pId;
            runOnJS(deletePhoto)(deletePhotoId);
          }
          runOnJS(onClose)();
        } else {
          start.value = {x: 0, y: 0};
          offset.value = {x: 0, y: 0};
        }
      });

    const animatedStyles = useAnimatedStyle(() => {
      return {
        transform: [{translateX: offset.value.x}, {translateY: offset.value.y}],
      };
    });

    return (
      <Animated.View style={[animatedStyles]} testID="image">
        <GestureDetector gesture={gesture}>
          <Image source={{uri: photo?.uri}} style={[styles.modalImage]} />
        </GestureDetector>
      </Animated.View>
    );
  },
);

export default ImageWithHOC;

const styles = StyleSheet.create({
  modalImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginTop: 150,
  },
});
