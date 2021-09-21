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
  Platform,
  useColorScheme,
  View,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'
import MainStackNavigator from './navigation/MainStackNavigator'
import Database from '../CropScouting/screens/Database'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


const db = new Database();

//hasura 

const Uri = `https://artistic-amoeba-28.hasura.app/v1/graphql`;
const Headers = {
  "x-hasura-admin-secret": 'M4tbHIrogQEAEHk9C6crpZecT9WomE0MkyWrOuDdIdZhscAe9Ob34B2zsve5YNTb',
};

const client = new ApolloClient({
  uri: Uri,
  cache: new InMemoryCache(),
  headers: Headers
});


export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {



    };


  }
  async componentDidMount() {

    SplashScreen.hide();

    this.getData();


  }


  getData = () => {

    let scoutData = {};
    db.listScoutData().then((data) => {
      console.log("Calling database")
      scoutData = data;

      console.log("Data saved in SQLite : " + scoutData);

    }).catch((err) => {
      console.log(err);

    })


  }


  render() {
    return (
      
      <ApolloProvider client={client}>
        <MainStackNavigator />
      </ApolloProvider>

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
  },

});