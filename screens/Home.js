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

var intervalNumber, rowNum1, rowNum2, rowNum3, rowNum4, rowNum5, rowNum6, rowNum7, rowNum8, rowNum9, rowNum10, rowNum11;
var scouting1st, scouting2nd, scouting3rd, scouting4th, scouting5th, scouting6th, scouting7th, scouting8th, scouting9th, scouting10th, scouting11th;


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

            //GET interval
            try {

                AsyncStorage.getItem("intervals" + type).then((text2Value) => {

                    intervalNumber = JSON.parse(text2Value)

                }).done();
            } catch (error) {

            }

            //END

            //GET row1
            try {

                AsyncStorage.getItem(type + "" + "rowNumberScouting").then((rowNumber1) => {

                    rowNum1 = JSON.parse(rowNumber1);

                }).done();

            } catch (error) {

            }

            //END

            //GET row2
            try {

                AsyncStorage.getItem(type + "" + "rowNumberScouting1").then((rowNumber2) => {

                    rowNum2 = JSON.parse(rowNumber2);

                }).done();

            } catch (error) {

            }

            //END

            //GET row3
            try {

                AsyncStorage.getItem(type + "" + "rowNumberScouting2").then((rowNumber3) => {

                    rowNum3 = JSON.parse(rowNumber3);

                }).done();

            } catch (error) {

            }

            //END

            //GET row4
            try {

                AsyncStorage.getItem(type + "" + "rowNumberScouting3").then((rowNumber4) => {

                    rowNum4 = JSON.parse(rowNumber4);

                }).done();

            } catch (error) {

            }

            //END

            //GET row5
            try {

                AsyncStorage.getItem(type + "" + "rowNumberScouting4").then((rowNumber5) => {

                    rowNum5 = JSON.parse(rowNumber5);

                }).done();

            } catch (error) {

            }

            //END

            //GET row6
            try {

                AsyncStorage.getItem(type + "" + "rowNumberScouting5").then((rowNumber6) => {

                    rowNum6 = JSON.parse(rowNumber6);

                }).done();

            } catch (error) {

            }

            //END

            //GET row7
            try {

                AsyncStorage.getItem(type + "" + "rowNumberScouting6").then((rowNumber7) => {

                    rowNum7 = JSON.parse(rowNumber7);

                }).done();

            } catch (error) {

            }

            //END

            //GET row8
            try {

                AsyncStorage.getItem(type + "" + "rowNumberScouting7").then((rowNumber8) => {

                    rowNum8 = JSON.parse(rowNumber8);

                }).done();

            } catch (error) {

            }

            //END

            //GET row9
            try {

                AsyncStorage.getItem(type + "" + "rowNumberScouting8").then((rowNumber9) => {

                    rowNum9 = JSON.parse(rowNumber9);

                }).done();

            } catch (error) {

            }

            //END

            //GET row10
            try {

                AsyncStorage.getItem(type + "" + "rowNumberScouting9").then((rowNumber10) => {

                    rowNum10 = JSON.parse(rowNumber10);

                }).done();

            } catch (error) {

            }

            //END

            //GET row11
            try {

                AsyncStorage.getItem(type + "" + "rowNumberScouting10").then((rowNumber11) => {

                    rowNum11 = JSON.parse(rowNumber11);

                }).done();

            } catch (error) {

            }

            //END

            try {

                AsyncStorage.getItem(type + "" + "ScoutingYes").then((dataEntered) => {

                    scouting1st = JSON.parse(dataEntered);

                    console.log("1st:  " + scouting1st);


                }).done();

                AsyncStorage.getItem(type + "" + "Scouting1Yes").then((dataEntered1) => {

                    console.log("2nd:  " + JSON.parse(dataEntered1));

                    scouting2nd = JSON.parse(dataEntered1);



                }).done();

                AsyncStorage.getItem(type + "" + "Scouting2Yes").then((dataEntered2) => {

                    console.log("3rd:  " + JSON.parse(dataEntered2));

                    scouting3rd = JSON.parse(dataEntered2);



                }).done();

                AsyncStorage.getItem(type + "" + "Scouting3Yes").then((dataEntered3) => {

                    console.log("4th:  " + JSON.parse(dataEntered3));

                    scouting4th = JSON.parse(dataEntered3);



                }).done();

                AsyncStorage.getItem(type + "" + "Scouting4Yes").then((dataEntered4) => {

                    console.log("5th:  " + JSON.parse(dataEntered4));

                    scouting5th = JSON.parse(dataEntered4);



                }).done();

                AsyncStorage.getItem(type + "" + "Scouting5Yes").then((dataEntered5) => {

                    console.log("6th:  " + JSON.parse(dataEntered5));

                    scouting6th = JSON.parse(dataEntered5);


                }).done();

                AsyncStorage.getItem(type + "" + "Scouting6Yes").then((dataEntered6) => {

                    console.log("7th:  " + JSON.parse(dataEntered6));

                    scouting7th = JSON.parse(dataEntered6);


                }).done();

                AsyncStorage.getItem(type + "" + "Scouting7Yes").then((dataEntered7) => {

                    console.log("8th:  " + JSON.parse(dataEntered7));

                    scouting8th = JSON.parse(dataEntered7);


                }).done();

                AsyncStorage.getItem(type + "" + "Scouting8Yes").then((dataEntered8) => {

                    console.log("9th:  " + JSON.parse(dataEntered8));

                    scouting9th = JSON.parse(dataEntered8);


                }).done();

                AsyncStorage.getItem(type + "" + "Scouting9Yes").then((dataEntered9) => {

                    console.log("10th:  " + JSON.parse(dataEntered9));

                    scouting10th = JSON.parse(dataEntered9);


                }).done();

                AsyncStorage.getItem(type + "" + "Scouting10Yes").then((dataEntered10) => {

                    console.log("11th:  " + JSON.parse(dataEntered10));

                    scouting11th = JSON.parse(dataEntered10);

                    this.navigateToScreens();

                }).done();

            } catch (error) {

            }



        } else {


        }

    }

    navigateToScreens = () => {

        console.log("Navigation");

        if (scouting1st === 'Yes') {

            if (scouting2nd === 'Yes') {

                if (scouting3rd === 'Yes') {

                    if (scouting4th === 'Yes') {

                        if (scouting5th === 'Yes') {

                            if (scouting6th === 'Yes') {

                                if (scouting7th === 'Yes') {

                                    if (scouting8th === 'Yes') {

                                        if (scouting9th === 'Yes') {

                                            if (scouting10th === 'Yes') {

                                                if (scouting11th === 'Yes') {

                                                    alert('Need to add more rows. Please get in touch with the developer')

                                                } else {

                                                    this.props.navigation.push('Scouting10', { startNumber: rowNum10, inter: intervalNumber })

                                                }
                                            } else {

                                                this.props.navigation.push('Scouting9', { startNumber: rowNum9, inter: intervalNumber })

                                            }
                                        } else {

                                            this.props.navigation.push('Scouting8', { startNumber: rowNum8, inter: intervalNumber })

                                        }
                                    } else {

                                        this.props.navigation.push('Scouting7', { startNumber: rowNum7, inter: intervalNumber })


                                    }
                                } else {

                                    this.props.navigation.push('Scouting6', { startNumber: rowNum6, inter: intervalNumber })


                                }
                            } else {

                                this.props.navigation.push('Scouting5', { startNumber: rowNum5, inter: intervalNumber })


                            }
                        } else {

                            this.props.navigation.push('Scouting4', { startNumber: rowNum4, inter: intervalNumber })


                        }


                    } else {

                        this.props.navigation.push('Scouting3', { startNumber: rowNum3, inter: intervalNumber })


                    }

                } else {

                    this.props.navigation.push('Scouting2', { startNumber: rowNum2, inter: intervalNumber })


                }


            } else {

                this.props.navigation.push('Scouting1', { startNumber: rowNum1, inter: intervalNumber })


            }

        } else {

            this.props.navigation.push("Scouting")

        }

        /*if (scouting1st === 'Yes') {

            this.props.navigation.push('Scouting1', { startNumber: rowNum1, inter: intervalNumber })

        } else if (scouting2nd === 'Yes') {

            this.props.navigation.push('Scouting2', { startNumber: rowNum2, inter: intervalNumber })

        } else if (scouting3rd === 'Yes') {

            this.props.navigation.push('Scouting3', { startNumber: rowNum3, inter: intervalNumber })

        } else if (scouting4th === 'Yes') {

            this.props.navigation.push('Scouting4', { startNumber: rowNum4, inter: intervalNumber })

        } else if (scouting5th === 'Yes') {

            this.props.navigation.push('Scouting5', { startNumber: rowNum5, inter: intervalNumber })

        } else {

            this.props.navigation.push("Scouting")

        }*/

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
                                    { label: 'Chaminda Perera', value: 'Chaminda Perera' },
                                    { label: 'Nicholas Wallace', value: 'Nicholas Wallace' },
                                    { label: 'Chris Cowie', value: 'Chris Cowie' },

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

                        <Text style={styles.titleHeadingText}>Scouting Type</Text>

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
                                    { label: 'Plant Head', value: 'Plant Head' },
                                    { label: 'Plant Middle', value: 'Plant Middle' },
                                    { label: 'Plant Ground', value: 'Plant Ground' },
                                    

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