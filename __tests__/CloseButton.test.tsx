import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CloseButton from '../src/components/atoms/CloseButton';

describe('CloseButton', () => {
  test('it should call onPress when pressed', () => {
    const onPress = jest.fn();
    const {getByText} = render(<CloseButton onPress={onPress} />);
    fireEvent.press(getByText('X'));
    expect(onPress).toHaveBeenCalled();
  });
});
