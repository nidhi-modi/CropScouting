import React, { useEffect, useState } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client/react';
import { StyleSheet, Text, View, ScrollView, Platform, ActivityIndicator, Modal, TouchableOpacity, Image, Animated } from 'react-native';
import { INSERT_SCOUTING_DETAILS } from '../graphql/mutation';
import { GET_PLANT_DETAILS, GET_TRUSS_DETAILS } from '../graphql/queries';
import Database from './Database';
import AsyncStorage from '@react-native-community/async-storage';


var loading = true;


export const ViewScoutingDetails = (props) => {
  const db = new Database();

  const [scoutData, setScoutData] = useState([]);
  const [scoutDataAws, setScoutDataAws] = useState([]);
  const [insertScoutingDetails] = useMutation(INSERT_SCOUTING_DETAILS);


  useEffect(() => {
    db.listScoutData()
      .then(data => {
        console.log('data from local database', data);

        setScoutData(data);
        //AsyncStorage.clear();

      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let objs = [];
    if (scoutData?.length > 0) {
      scoutData?.map(
        obj => {
          delete obj.scoutID;
          delete obj?.__typename;
          delete obj?.id
          objs.push(obj);
          for (var key in obj) {
            if (obj[key] == '' || obj[key] == "NaN") {
              obj[key] = null
            }
          }
        });
      console.log("here objs in plant", objs)
      insertScoutingDetails({
        variables: {
          objects: objs,
        },
      })
        .then(res => {
          console.log('res in scouting mutation', res);

          //delete data from database

          db.deleteAllData().then(data => {

            console.log("Scouting data deleted from local database");
          })
            .catch(err => {

              console.log(err);
            });

          getKeys();

          loading = false;
          props.navigation.pop();

        })
        .catch(e => {
          console.log('error in scouting mutation', e);
        });

    }
  }, [scoutData]);


  const getKeys = () => {

    try {

      if (Platform.OS == 'ios') {

        AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);

      }

      if (Platform.OS == 'android') {

        AsyncStorage.clear();

      }

    } catch (error) {

      console.error('Error clearing app data');
    }

  }



  return (

    <View style={styles.container}>

      <Modal
        transparent={loading}
        animationType={'slide'}
        visible={loading}
        onRequestClose={() => { console.log("Cannot close") }}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator
              animating={loading}
              size="large"
              color="#87B26A"
            />
          </View>
        </View>
      </Modal>

      {Platform.OS === 'ios' ?

        <View style={{ marginTop: 40 }}></View>

        : null}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20 }}>

        <View style={styles.headerImage1}>

        

        </View>


        <View style={{ height: 20, width: 20 }}>
          <Text style={{ alignSelf: 'center' }}></Text>
        </View>

      </View>



      <View style={styles.marginSmallDimensionTop}></View>

      <View style={styles.marginSmallDimensionTop}></View>

      <View style={styles.marginSmallDimensionTop}></View>

      <View style={styles.marginSmallDimensionTop}></View>


      <Text
        style={styles.textBottom}>Uploading data {'\n'} Please wait...</Text>

      <View style={styles.marginSmallDimensionTop}></View>

      <View style={styles.marginSmallDimensionTop}></View>


      <Image source={require('../assets/submit_tomato.png')} style={styles.backgroundImage} />

    </View>



  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F9FF'
  },

  fadingContainer: {
    paddingVertical: 5,
    paddingHorizontal: 25,

  },

  text: {
    margin: 6,
    margin: 20,
    fontSize: 30,
    color: '#2C3E50',
    fontWeight: 'bold',
    alignSelf: 'center'

  },

  backgroundImage: {

    alignSelf: 'center'

  },

  headerImage1: {

    resizeMode: 'cover',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',

  },

  headerImage2: {

    resizeMode: 'cover',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 18,

  },

  textBottom: {

    fontSize: 24,
    paddingBottom: 20,
    color: '#87B26A',
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center'



  },

  textContainer: {

    flexShrink: 1

  },


  marginDimensionTop: {

    marginTop: 44,

  },

  marginSmallDimensionTop: {

    marginTop: 18,

  },

  containerView: {

    marginLeft: 95,
    marginRight: 95,

  },

  buttonContainer: {
    backgroundColor: '#2C3E50',
    borderRadius: 8,
    padding: 10,
    margin: 20,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center'

  },

  buttonText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    //fontStyle: 'italic'

  },

  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default ViewScoutingDetails;