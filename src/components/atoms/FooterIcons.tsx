import React from 'react';
import {Image, StyleSheet} from 'react-native';

interface FooterIconsProps {
  url: any;
}

const FooterIcons = ({url}: FooterIconsProps) => {
  return <Image source={url} style={style.image} />;
};

export default FooterIcons;

const style = StyleSheet.create({
  image: {
    width: 24,
    height: 24,
  },
});
