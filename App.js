import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View, DrawerLayoutAndroid, Text, SafeAreaView, Image, Icon, Button} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RNRestart } from 'react-native-restart';
import { Root } from "native-base";
import Spinner from 'react-native-loading-spinner-overlay';
console.disableYellowBox = true;


import * as firebase from 'firebase';

import AppNavigator from './navigation/AppNavigator';

const firebaseConfig = {
  apiKey: "AIzaSyDKwejiIOKMFxPv7BcGeBo-AkiX3YRWroQ",
  authDomain: "dindarepo.firebaseapp.com",
  databaseURL: "https://dindarepo.firebaseio.com",
  storageBucket: "dindarepo.appspot.com"
};

firebase.initializeApp(firebaseConfig)

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = { loading: true };
  }

  signOut(){
    firebase.auth().signOut();
    alert("Signed Out");
  }

  async componentWillMount() {
        await Expo.Font.loadAsync({
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
          'rajdhani': require('./assets/fonts/Rajdhani-Regular.ttf'),
          'rajdhani_semibold': require('./assets/fonts/Rajdhani-SemiBold.ttf'),
          'questrial-regular': require('./assets/fonts/Questrial-Regular.ttf'),
          'raleway-black': require('./assets/fonts/Raleway-Black.ttf'),
          'raleway-extra-bold': require('./assets/fonts/Raleway-ExtraBold.ttf'),
          'raleway-medium': require('./assets/fonts/Raleway-Medium.ttf'),
        });
  }

  render(){
    return  (
      <Root>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
      </Root>
    )
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'rajdhani': require('./assets/fonts/Rajdhani-Regular.ttf'),
      'rajdhani_semibold': require('./assets/fonts/Rajdhani-SemiBold.ttf'),
      'questrial-regular': require('./assets/fonts/Questrial-Regular.ttf'),
      'raleway-black': require('./assets/fonts/Raleway-Black.ttf'),
      'raleway-extra-bold': require('./assets/fonts/Raleway-ExtraBold.ttf'),
      'raleway-medium': require('./assets/fonts/Raleway-Medium.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  menu_button: {

  }
});
