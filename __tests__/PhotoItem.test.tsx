import React from 'react';
import {Animated} from 'react-native';
import {render} from '@testing-library/react-native';
import PhotoItem from '../src/components/organisms/PhotoItem';
import {IPhoto} from '../src/config/AxiosApi';

describe('PhotoItem', () => {
  it('renders PhotoItem component correctly', () => {
    const item: IPhoto = {
      id: '1',
      location: 'Some Location',
      latitude: 123.456,
      longitude: 789.012,
      uri: 'https://example.com/image.jpg',
    };
    const animation = new Animated.Value(1);
    const onPress = jest.fn();

    const tree = render(
      <PhotoItem item={item} animation={animation} onPress={onPress} />,
    ).toJSON;

    expect(tree).toMatchSnapshot();
  });
});
