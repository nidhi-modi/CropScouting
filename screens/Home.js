/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    BackHandler,
    Platform,
    TouchableOpacity,
    Dimensions,
    Alert

} from 'react-native';

import DropDownPicker from '@nectr-rn/react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment'
import Database from '../screens/Database'
import NetInfo from "@react-native-community/netinfo";



var screenWidth = (Dimensions.get('window').width) / 1.6;
const db = new Database();



export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {

            scoutersName: '',
            location: '',
            scoutType: '',
            open: false,
            buttonCondition: true,
            weekNumber: '',
            listScoutingData: [],
            isItConnected: '',


        };


    }

    setOpen(open) {
        this.setState({
            open
        });
    }

    CheckConnectivity = () => {
        // For Android devices
        if (Platform.OS === "android") {
          NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected) {
              Alert.alert("You are online!");
            } else {
              Alert.alert("You are offline!");
            }
          });
        } else {
          // For iOS devices
          NetInfo.isConnected.addEventListener(
            "connectionChange",
            this.handleFirstConnectivityChange
          );
        }
      };
    
      handleFirstConnectivityChange = isConnected => {
        NetInfo.isConnected.removeEventListener(
          "connectionChange",
          this.handleFirstConnectivityChange
        );
    
        if (isConnected === false) {
          Alert.alert("You are offline!");
        } else {
          Alert.alert("You are online!");
        }
      };
    
      handleConnectivityChange = state => {
        if (state.isConnected) {
    
          this.setState({ isItConnected: 'Online' });
    
        } else {
    
          this.setState({ isItConnected: 'Offline' });
        }
      };
    
      checkInternetConnection = () => {
    
        if (this.state.isItConnected == 'Online') {
    
            this.setState({
                scoutersName: null,
                location: null,
                scoutType: null
            })
    
            this.props.navigation.navigate('ViewScoutingDetails')
    
    
        } else {
    
          this.errorMessage();
    
        }
      }
    
      errorMessage = () => {
    
        Alert.alert(
          'No Internet Connection',
          'Make sure your device is connected to the internet',
          [
    
            { text: 'OK', onPress: () => console.log('No button clicked'), style: 'cancel' },
    
          ],
          {
            cancelable: true
          }
        );
    
    
      }

    componentDidMount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        NetInfo.addEventListener(this.handleConnectivityChange);

        this.focusListener = this.props.navigation.addListener('focus',
            () => {
                this.getDatabase();
            }
        );

        var weekNumber = moment().week() - 1;
        var yearNumber = moment().year();
        var toText = yearNumber.toString(); //convert to string
        var lastChar = toText.slice(-2); //gets last character
        var lastDigit = +(lastChar); //convert last character to number
        var weekNumberText = lastDigit + '00';
        var convertWeekNumber = +(weekNumberText)
        var completeWeekNumber = convertWeekNumber + weekNumber;

        this.setState({ weekNumber: completeWeekNumber })

        this.getAsyncItem();


    }

    componentWillUnmount() {

        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    getDatabase = () => {

        db.listScoutData()
            .then(data => {

                this.setState({ listScoutingData: data })
                console.log('data from local database', this.state.listScoutingData.length);

            })
            .catch(err => {
                console.log(err);
            });
    }

    getAsyncItem = () => {

        try {
            AsyncStorage.getItem('scoutersName').then((text1Value) => {

                console.log("Name : " + JSON.parse(text1Value));
                this.setState({ scoutersName: JSON.parse(text1Value) });

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem('location').then((text2Value) => {
                this.setState({ location: JSON.parse(text2Value) });

            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('scoutType').then((text3Value) => {
                this.setState({ scoutType: JSON.parse(text3Value) });


            }).done();
        } catch (error) {
        }
    }

    //ASYNC METHOD

    async setItem(myKey, value) {
        try {
            this.setState({
                isDataSend: false,

            });

            return await AsyncStorage.setItem(myKey, JSON.stringify(value));
        } catch (error) {
            // console.error('AsyncStorage#setItem error: ' + error.message);
        }
    }

    handleBackButton = () => {

        BackHandler.exitApp();

    }

    handleButtonPress = () => {

        var name = this.state.scoutersName;
        var loc = this.state.location;
        var type = this.state.scoutType;

        if (name != '' && loc != '' && type != '') {

            this.props.navigation.navigate("Scouting")

        } else {


        }

    }

    onButtonPress = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        // then navigate
        navigate('NewScreen');
    }

    updateTextInput = (text, field) => {
        this.setItem(field, text)
        const state = this.state
        state[field] = text;
        this.setState(state);
    }

  
    render() {

        return (

            <View style={styles.container}>

                <ScrollView keyboardShouldPersistTaps='handled'>
                    <View style={styles.flexboxWeeknumbers}>

                        <Image source={require('../assets/week_number_logo.png')} style={styles.FloatingButtonStyle2} />
                        <View style={styles.marginRightStyle}></View>
                        <Text style={styles.weekText1}>Current Week Number : <Text style={styles.weekText2}>{this.state.weekNumber}</Text></Text>

                    </View>

                    <View style={styles.mainPageContainer}>

                        <Text style={styles.titleHeadingText}>Select Scouter's Name</Text>

                        <View style={styles.marginTopStyle}></View>


                        <View
                            style={{

                                // The solution: Apply zIndex to any device except Android
                                ...(Platform.OS !== 'android' && {
                                    zIndex: 30
                                })

                            }}
                        >


                            <DropDownPicker
                                items={[
                                    { label: 'A', value: 'A' },
                                    { label: 'B', value: 'B' },
                                    { label: 'C', value: 'C' },
                                    { label: 'D', value: 'D' },

                                ]}
                                placeholder=""
                                containerStyle={{ height: 50 }}
                                style={{
                                    borderColor: '#F1EEEC',
                                    borderWidth: 1
                                }}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                labelStyle={{
                                    fontSize: 14,
                                    textAlign: 'left',
                                    color: '#000000',


                                }}
                                dropDownStyle={{ backgroundColor: '#fafafa' }}
                                onChangeItem={(item) => this.updateTextInput(item.value, 'scoutersName')}
                                defaultValue={this.state.scoutersName}


                            />

                        </View>

                        <View style={styles.marginContainerTop}></View>

                        <Text style={styles.titleHeadingText}>Select Location</Text>

                        <View style={styles.marginTopStyle}></View>


                        <View
                            style={{

                                // The solution: Apply zIndex to any device except Android
                                ...(Platform.OS !== 'android' && {
                                    zIndex: 20
                                })

                            }}
                        >

                            <DropDownPicker
                                items={[
                                    { label: 'REP 1', value: 'REP 1' },

                                ]}
                                placeholder=""
                                containerStyle={{ height: 50 }}
                                style={{
                                    borderColor: '#F1EEEC',
                                    borderWidth: 1
                                }}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                labelStyle={{
                                    fontSize: 14,
                                    textAlign: 'left',
                                    color: '#000000',


                                }}
                                dropDownStyle={{ backgroundColor: '#fafafa' }}
                                onChangeItem={(item) => this.updateTextInput(item.value, 'location')}
                                defaultValue={this.state.location}


                            />

                        </View>

                        <View style={styles.marginContainerTop}></View>

                        <Text style={styles.titleHeadingText}>Select Pests &amp; Diseases to Scout</Text>

                        <View style={styles.marginTopStyle}></View>


                        <View
                            style={{

                                // The solution: Apply zIndex to any device except Android
                                ...(Platform.OS !== 'android' && {
                                    zIndex: 10
                                })

                            }}
                        >
                            <DropDownPicker
                                items={[
                                    { label: 'Psyllid', value: 'Psyllid' },
                                    { label: 'Whitefly Adults', value: 'Whitefly Adults' },
                                    { label: 'Whitefly Nymphs', value: 'Whitefly Nymphs' },
                                    { label: 'Encarsia Scale', value: 'Encarsia Scale' },
                                    { label: 'Engytatus', value: 'Engytatus' },
                                    { label: 'Lacewing', value: 'Lacewing' },
                                    { label: 'Yellow Heads', value: 'Yellow Heads' },
                                    { label: 'Botrytis', value: 'Botrytise' },
                                    { label: 'Disease Plants', value: 'Disease Plants' },
                                    { label: 'Russet Mite', value: 'Russet Mite' },
                                    { label: 'Caterpillar', value: 'Caterpillar' },
                                    { label: 'Butterfly', value: 'Butterfly' },

                                ]}
                                placeholder=""
                                containerStyle={{ height: 50 }}
                                style={{
                                    borderColor: '#F1EEEC',
                                    borderWidth: 1
                                }}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                labelStyle={{
                                    fontSize: 14,
                                    textAlign: 'left',
                                    color: '#000000',


                                }}
                                dropDownStyle={{ backgroundColor: '#fafafa' }}
                                onChangeItem={(item) => this.updateTextInput(item.value, 'scoutType')}
                                defaultValue={this.state.scoutType}


                            />

                        </View>

                        <View style={styles.marginContainerTop}></View>

                        <Text style={styles.titleGreenText}>Select from the options below to start the app:</Text>

                        <View style={styles.marginBetweenTop}></View>


                        <Text style={styles.titleBlackText}>Before you start, please make sure all the above data has been entered correctly.</Text>

                        <View style={styles.marginBetweenTop}></View>

                        <View style={styles.marginBetweenTop}></View>

                        {(this.state.scoutersName !== null && this.state.location !== null && this.state.scoutType !== null) ?
                            <TouchableOpacity
                                style={styles.buttonContainer}
                                disabled={false}
                                onPress={() => this.handleButtonPress()}>
                                <Text style={styles.buttonText}>Start Crop Scouting</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity
                                style={styles.buttonContainer}
                                disabled={true}
                                onPress={() => this.handleButtonPress()}>
                                <Text style={styles.buttonText}>Start Crop Scouting</Text>
                            </TouchableOpacity>}

                        <View style={styles.marginBetweenTop}></View>

                        {this.state.listScoutingData.length !== 0 ?

                            <View>
                                <View style={styles.marginTopStyle}></View>

                                <View style={styles.borderStyle}>
                                    <Text style={styles.titleBlackText}>Press submit button to send scouting data to the server</Text>
                                    <View style={styles.marginBetweenTop}></View>

                                    <TouchableOpacity
                                        style={styles.buttonContainerRed}
                                        disabled={false}
                                        onPress={() => this.checkInternetConnection()}>
                                        <Text style={styles.buttonText}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.marginBetweenTop}></View>
                            </View>
                            : null}



                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: '#ffffff'
    },

    borderStyle: {

        borderColor: '#F1EEEC',
        borderWidth: 1,
        padding: 8,
        borderRadius: 8

    },

    textBottom: {

        fontSize: 20,
        width: screenWidth,
        color: '#2C3E50',
        fontWeight: 'bold',
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center'



    },


    mainPageContainer: {

        flex: 1,
        marginRight: 20,
        marginLeft: 20,
        marginTop: 40

    },

    headerImage2: {

        resizeMode: 'cover',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 18,

    },

    buttonContainer: {
        backgroundColor: '#7DBD5C',
        borderRadius: 10,
        padding: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'

    },

    buttonContainerRed: {
        backgroundColor: '#B11B0A',
        borderRadius: 10,
        padding: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'

    },

    buttonText: {
        fontSize: 16,
        color: '#ffffff',


    },

    buttonTextIOS: {
        fontSize: 16,
        color: '#ffffff',

    },

    marginRightStyle: {

        marginRight: 12

    },

    marginContainerTop: {

        marginTop: 40,

    },

    marginBetweenTop: {

        marginTop: 28,

    },

    marginTopStyle: {

        marginTop: 10,

    },

    weekText1: {
        fontSize: 18,

        color: '#87B26A'
    },

    weekText1IOS: {
        fontSize: 18,
        color: '#87B26A'
    },

    weekText2: {
        fontSize: 20,
        fontWeight: 'bold',

        textDecorationLine: 'underline',

    },

    weekText2IOS: {
        fontSize: 20,
        fontWeight: 'bold',
        textDecorationLine: 'underline',

    },

    flexboxWeeknumbers: {

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,


    },
    FloatingButtonStyle2: {

        resizeMode: 'contain',
        width: 30,
        height: 30,
    },

    titleHeadingText: {

        color: 'black',
        fontSize: 16,


    },


    titleHeadingTextIOS: {

        color: 'black',
        fontSize: 16,

    },

    titleGreenText: {

        color: '#87B26A',
        fontSize: 18,
        flexShrink: 1,
        textAlign: 'center',
        fontWeight: 'bold',


    },

    titleGreenTextIOS: {

        color: '#87B26A',
        fontSize: 18,
        flexShrink: 1,
        textAlign: 'center',
        fontWeight: 'bold',


    },

    titleBlackText: {

        color: '#000000',
        fontSize: 15,
        flexShrink: 1,
        textAlign: 'center',
        marginRight: 30,
        marginLeft: 30


    },

    titleBlackTextIOS: {

        color: '#000000',
        fontSize: 15,
        flexShrink: 1,
        textAlign: 'center',
        marginRight: 30,
        marginLeft: 30


    },


});