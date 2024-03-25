import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type MainNavigatorStackParamList = {
  Library: undefined;
  Map: undefined;
  CameraScreen: undefined;
};

export type MainNavigatorNavigationProp =
  NativeStackNavigationProp<MainNavigatorStackParamList>;

export type MainNavigatorRouteProp = RouteProp<MainNavigatorStackParamList>;
