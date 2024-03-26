import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Map from '../screens/Map';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Library from '../screens/Library';
import {MainNavigatorStackParamList} from './MainNavigator.types';
import CameraScreen from '../screens/CameraScreen';
import FooterIcons from '../components/atoms/FooterIcons';

const MainStackNavigator = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator<MainNavigatorStackParamList>();

const Icons = ({route}) => {
  if (route.name === 'Library') {
    return () => <FooterIcons url={require('../assets/images/library.png')} />;
  } else if (route.name === 'Map') {
    return () => <FooterIcons url={require('../assets/images/map.png')} />;
  }
  return null;
};

const PhotoGallery = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: Icons({route}),
      })}>
      <BottomTabs.Screen name="Library" component={Library} />
      <BottomTabs.Screen name="Map" component={Map} />
    </BottomTabs.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <MainStackNavigator.Navigator initialRouteName="Library">
      <MainStackNavigator.Screen
        name="PhotoGallery"
        component={PhotoGallery}
        options={{headerShown: false}}
      />
      <MainStackNavigator.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{headerShown: false}}
      />
    </MainStackNavigator.Navigator>
  );
};

export default MainNavigator;
