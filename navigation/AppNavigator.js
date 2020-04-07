import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import Loading from '../screens/Loading'
import SignUp from '../screens/SignUp'
import Login from '../screens/Login'

import MapContainer from '../container/MapContainer';

export default createAppContainer(
  createSwitchNavigator({
    Loading: Loading,
    SignUp: SignUp,
    Login: Login,
    Main: MainTabNavigator,
  })
);
