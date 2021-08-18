/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'
import MainStackNavigator from './navigation/MainStackNavigator'



export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {



    };


  }
  async componentDidMount() {

    SplashScreen.hide();


  }




  render() {
    return (

        <MainStackNavigator />

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontFamily: "times_new_roman"
  },

});