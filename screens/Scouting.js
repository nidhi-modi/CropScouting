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
    Dimensions,
    BackHandler,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Alert,


} from 'react-native';

import DropDownPicker from '@nectr-rn/react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler';
var width = Dimensions.get('window').width / 2.5; //full width
import AsyncStorage from '@react-native-community/async-storage';
import Database from '../screens/Database'
import moment from 'moment'


const db = new Database();

var widthText = Dimensions.get('window').width / 1.3;




export default class Scouting extends Component {

    constructor(props) {
        super(props);

        this.state = {

            rowNumberScouting: '',
            intervals: '',
            scoutingType: '',
            weekNum: '',
            header1Scouting: '',
            header2Scouting: '',
            header3Scouting: '',
            header4Scouting: '',

            miniBay1Scouting: 'A',
            bay1Text1Scouting: '',
            bay1Text2Scouting: '',
            bay1Text3Scouting: '',
            bay1Text4Scouting: '',

            miniBay2Scouting: 'B-D',
            bay2Text1Scouting: '',
            bay2Text2Scouting: '',
            bay2Text3Scouting: '',
            bay2Text4Scouting: '',

            miniBay3Scouting: 'E-G',
            bay3Text1Scouting: '',
            bay3Text2Scouting: '',
            bay3Text3Scouting: '',
            bay3Text4Scouting: '',

            miniBay4Scouting: 'H-J',
            bay4Text1Scouting: '',
            bay4Text2Scouting: '',
            bay4Text3Scouting: '',
            bay4Text4Scouting: '',

            miniBay5Scouting: 'K-M',
            bay5Text1Scouting: '',
            bay5Text2Scouting: '',
            bay5Text3Scouting: '',
            bay5Text4Scouting: '',

            miniBay6Scouting: 'N-P',
            bay6Text1Scouting: '',
            bay6Text2Scouting: '',
            bay6Text3Scouting: '',
            bay6Text4Scouting: '',

            miniBay7Scouting: 'Q-T',
            bay7Text1Scouting: '',
            bay7Text2Scouting: '',
            bay7Text3Scouting: '',
            bay7Text4Scouting: '',


            miniBay8Scouting: 'U-V',
            bay8Text1Scouting: '',
            bay8Text2Scouting: '',
            bay8Text3Scouting: '',
            bay8Text4Scouting: '',


            miniBay9Scouting: 'W',
            bay9Text1Scouting: '',
            bay9Text2Scouting: '',
            bay9Text3Scouting: '',
            bay9Text4Scouting: '',


            miniBay10Scouting: 'X',
            bay10Text1Scouting: '',
            bay10Text2Scouting: '',
            bay10Text3Scouting: '',
            bay10Text4Scouting: '',


            miniBay11Scouting: 'Y-Z',
            bay11Text1Scouting: '',
            bay11Text2Scouting: '',
            bay11Text3Scouting: '',
            bay11Text4Scouting: '',

            scoutersName: '',
            location: '',
            dataEntered: '',

        };


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

    componentDidMount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);



        var weekNumber = moment().week() - 1;
        var yearNumber = moment().year();
        var toText = yearNumber.toString(); //convert to string
        var lastChar = toText.slice(-2); //gets last character
        var lastDigit = +(lastChar); //convert last character to number
        var weekNumberText = lastDigit + '00';
        var convertWeekNumber = +(weekNumberText)
        var completeWeekNumber = convertWeekNumber + weekNumber;

        this.setState({ weekNum: completeWeekNumber })

        try {
            AsyncStorage.getItem('scoutersName').then((name1) => {
                this.setState({ scoutersName: JSON.parse(name1) });


            }).done();
        } catch (error) {
        }

        try {
            AsyncStorage.getItem('location').then((location1) => {
                this.setState({ location: JSON.parse(location1) });


            }).done();
        } catch (error) {
        }

        //Get async data from SETTINGS page

        try {
            AsyncStorage.getItem("scoutType").then((text1Value) => {
                var opt1 = JSON.parse(text1Value);
                this.setState({ scoutingType: opt1 });



                try {

                    AsyncStorage.getItem("intervals" + opt1).then((text2Value) => {
                        var opt2 = JSON.parse(text2Value);
                        this.setState({ intervals: opt2 });

                    }).done();
                } catch (error) {

                }

                try {

                    AsyncStorage.getItem("column1" + opt1).then((text3Value) => {
                        var opt3 = JSON.parse(text3Value);
                        this.setState({ header1Scouting: opt3 });

                    }).done();
                } catch (error) {

                }


                try {

                    AsyncStorage.getItem("column2" + opt1).then((text4Value) => {
                        var opt4 = JSON.parse(text4Value);
                        this.setState({ header2Scouting: opt4 });

                    }).done();
                } catch (error) {

                }

                try {

                    AsyncStorage.getItem("column3" + opt1).then((text5Value) => {
                        var opt5 = JSON.parse(text5Value);
                        this.setState({ header3Scouting: opt5 });

                    }).done();
                } catch (error) {

                }

                try {

                    AsyncStorage.getItem("column4" + opt1).then((text6Value) => {
                        var opt6 = JSON.parse(text6Value);
                        this.setState({ header4Scouting: opt6 });

                    }).done();
                } catch (error) {

                }

                try {

                    AsyncStorage.getItem(opt1 + "" + "ScoutingYes").then((dataEntered) => {

                        var opt7 = JSON.parse(dataEntered);

                        this.setState({ dataEntered: opt7 })


                    }).done();
                } catch (error) {

                }

                this.getAsyncData(opt1);



            }).done();
        } catch (error) {

        }


        //END




    }


    getAsyncData(type) {


        try {
            AsyncStorage.getItem(type + "" + 'rowNumberScouting').then((text1Value) => {

                console.log("Row number : " + JSON.parse(text1Value));
                this.setState({ rowNumberScouting: JSON.parse(text1Value) });


                /*if (this.state.dataEntered == 'Yes') {

                    this.props.navigation.push('Scouting1', { startNumber: this.state.rowNumberScouting, inter: this.state.intervals })

                } else {

                    console.log("Data not submitted");

                }*/

            }).done();
        } catch (error) {

        }


        try {
            AsyncStorage.getItem(type + "" + 'header1Scouting').then((text2Value) => {

                if (JSON.parse(text2Value) !== null) {

                    this.setState({ header1Scouting: JSON.parse(text2Value) });

                }


            }).done();
        } catch (error) {

        }


        try {
            AsyncStorage.getItem(type + "" + 'header2Scouting').then((text3Value) => {

                if (JSON.parse(text3Value) !== null) {

                    this.setState({ header2Scouting: JSON.parse(text3Value) });

                }


            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'header3Scouting').then((text4Value) => {

                if (JSON.parse(text4Value) !== null) {

                    this.setState({ header3Scouting: JSON.parse(text4Value) });

                }



            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'header4Scouting').then((text5Value) => {

                if (JSON.parse(text5Value) !== null) {

                    this.setState({ header4Scouting: JSON.parse(text5Value) });

                }

            }).done();
        } catch (error) {

        }


        //BAY 1

        try {
            AsyncStorage.getItem(type + "" + 'miniBay1Scouting').then((text6Value) => {

                if (JSON.parse(text6Value) !== null) {

                    this.setState({ miniBay1Scouting: JSON.parse(text6Value) });

                }


            }).done();
        } catch (error) {

        }


        try {
            AsyncStorage.getItem(type + "" + 'bay1Text1Scouting').then((text7Value) => {


                if (JSON.parse(text7Value) !== null) {

                    console.log("bay1Text1Scouting : " + JSON.parse(text7Value));
                    this.setState({ bay1Text1Scouting: JSON.parse(text7Value) });


                }

            }).done();
        } catch (error) {

        }


        try {
            AsyncStorage.getItem(type + "" + 'bay1Text2Scouting').then((text8Value) => {

                if (JSON.parse(text8Value) !== null) {

                    this.setState({ bay1Text2Scouting: JSON.parse(text8Value) });

                }


            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay1Text3Scouting').then((text9Value) => {

                if (JSON.parse(text9Value) !== null) {

                    this.setState({ bay1Text3Scouting: JSON.parse(text9Value) });

                }



            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay1Text4Scouting').then((text10Value) => {

                if (JSON.parse(text10Value) !== null) {

                    this.setState({ bay1Text4Scouting: JSON.parse(text10Value) });

                }


            }).done();
        } catch (error) {

        }

        //


        //BAY 1

        try {
            AsyncStorage.getItem(type + "" + 'miniBay2Scouting').then((text11Value) => {

                if (JSON.parse(text11Value) !== null) {

                    this.setState({ miniBay2Scouting: JSON.parse(text11Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay2Text1Scouting').then((text12Value) => {

                if (JSON.parse(text12Value) !== null) {

                    this.setState({ bay2Text1Scouting: JSON.parse(text12Value) });

                }


            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay2Text2Scouting').then((text13Value) => {

                if (JSON.parse(text13Value) !== null) {

                    this.setState({ bay2Text2Scouting: JSON.parse(text13Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay2Text3Scouting').then((text60Value) => {

                if (JSON.parse(text60Value) !== null) {

                    this.setState({ bay2Text3Scouting: JSON.parse(text60Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay2Text4Scouting').then((text61Value) => {

                if (JSON.parse(text61Value) !== null) {

                    this.setState({ bay2Text4Scouting: JSON.parse(text61Value) });

                }


            }).done();
        } catch (error) {

        }

        //

        //BAY 2

        try {
            AsyncStorage.getItem(type + "" + 'miniBay3Scouting').then((text14Value) => {

                if (JSON.parse(text14Value) !== null) {

                    this.setState({ miniBay3Scouting: JSON.parse(text14Value) });

                }



            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay3Text1Scouting').then((text15Value) => {

                if (JSON.parse(text15Value) !== null) {

                    this.setState({ bay3Text1Scouting: JSON.parse(text15Value) });

                }



            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay3Text2Scouting').then((text16Value) => {

                if (JSON.parse(text16Value) !== null) {

                    this.setState({ bay3Text2Scouting: JSON.parse(text16Value) });


                }


            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay3Text3Scouting').then((text17Value) => {

                if (JSON.parse(text17Value) !== null) {

                    this.setState({ bay3Text3Scouting: JSON.parse(text17Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay3Text4Scouting').then((text18Value) => {

                if (JSON.parse(text18Value) !== null) {

                    this.setState({ bay3Text4Scouting: JSON.parse(text18Value) });

                }


            }).done();
        } catch (error) {

        }

        //

        //BAY 3

        try {
            AsyncStorage.getItem(type + "" + 'miniBay4Scouting').then((text19Value) => {

                if (JSON.parse(text19Value) !== null) {


                    this.setState({ miniBay4Scouting: JSON.parse(text19Value) });

                }



            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay4Text1Scouting').then((text20Value) => {

                if (JSON.parse(text20Value) !== null) {

                    this.setState({ bay4Text1Scouting: JSON.parse(text20Value) });

                }


            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay4Text2Scouting').then((text21Value) => {

                if (JSON.parse(text21Value) !== null) {

                    this.setState({ bay4Text2Scouting: JSON.parse(text21Value) });

                }


            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay4Text3Scouting').then((text22Value) => {

                if (JSON.parse(text22Value) !== null) {

                    this.setState({ bay4Text3Scouting: JSON.parse(text22Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay4Text4Scouting').then((text23Value) => {

                if (JSON.parse(text23Value) !== null) {

                    this.setState({ bay4Text4Scouting: JSON.parse(text23Value) });

                }

            }).done();
        } catch (error) {

        }

        //

        //BAY 4

        try {
            AsyncStorage.getItem(type + "" + 'miniBay5Scouting').then((text24Value) => {

                if (JSON.parse(text24Value) !== null) {

                    this.setState({ miniBay5Scouting: JSON.parse(text24Value) });

                }


            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay5Text1Scouting').then((text25Value) => {


                if (JSON.parse(text25Value) !== null) {

                    this.setState({ bay5Text1Scouting: JSON.parse(text25Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay5Text2Scouting').then((text26Value) => {

                if (JSON.parse(text26Value) !== null) {

                    this.setState({ bay5Text2Scouting: JSON.parse(text26Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay5Text3Scouting').then((text27Value) => {


                if (JSON.parse(text27Value) !== null) {

                    this.setState({ bay5Text3Scouting: JSON.parse(text27Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay5Text4Scouting').then((text28Value) => {


                if (JSON.parse(text28Value) !== null) {

                    this.setState({ bay5Text4Scouting: JSON.parse(text28Value) });

                }

            }).done();
        } catch (error) {

        }

        //

        //BAY 5

        try {
            AsyncStorage.getItem(type + "" + 'miniBay6Scouting').then((text29Value) => {

                if (JSON.parse(text29Value) !== null) {

                    this.setState({ miniBay6Scouting: JSON.parse(text29Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay6Text1Scouting').then((text30Value) => {


                if (JSON.parse(text30Value) !== null) {

                    this.setState({ bay6Text1Scouting: JSON.parse(text30Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay6Text2Scouting').then((text31Value) => {


                if (JSON.parse(text31Value) !== null) {

                    this.setState({ bay6Text2Scouting: JSON.parse(text31Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay6Text3Scouting').then((text32Value) => {


                if (JSON.parse(text32Value) !== null) {

                    this.setState({ bay6Text3Scouting: JSON.parse(text32Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay6Text4Scouting').then((text33Value) => {

                if (JSON.parse(text33Value) !== null) {

                    this.setState({ bay6Text4Scouting: JSON.parse(text33Value) });

                }

            }).done();
        } catch (error) {

        }

        //

        //BAY 6

        try {
            AsyncStorage.getItem(type + "" + 'miniBay7Scouting').then((text34Value) => {


                if (JSON.parse(text34Value) !== null) {

                    this.setState({ miniBay7Scouting: JSON.parse(text34Value) });

                }


            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay7Text1Scouting').then((text35Value) => {

                this.setState({ bay7Text1Scouting: JSON.parse(text35Value) });

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay7Text2Scouting').then((text36Value) => {


                if (JSON.parse(text36Value) !== null) {

                    this.setState({ bay7Text2Scouting: JSON.parse(text36Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay7Text3Scouting').then((text37Value) => {


                if (JSON.parse(text37Value) !== null) {

                    this.setState({ bay7Text3Scouting: JSON.parse(text37Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay7Text4Scouting').then((text38Value) => {


                if (JSON.parse(text38Value) !== null) {

                    this.setState({ bay7Text4Scouting: JSON.parse(text38Value) });

                }

            }).done();
        } catch (error) {

        }

        //

        //BAY 7

        try {
            AsyncStorage.getItem(type + "" + 'miniBay8Scouting').then((text39Value) => {


                if (JSON.parse(text39Value) !== null) {

                    this.setState({ miniBay8Scouting: JSON.parse(text39Value) });

                }


            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay8Text1Scouting').then((text40Value) => {

                if (JSON.parse(text40Value) !== null) {

                    this.setState({ bay8Text1Scouting: JSON.parse(text40Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay8Text2Scouting').then((text41Value) => {

                if (JSON.parse(text41Value) !== null) {

                    this.setState({ bay8Text2Scouting: JSON.parse(text41Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay8Text3Scouting').then((text42Value) => {


                if (JSON.parse(text42Value) !== null) {

                    this.setState({ bay8Text3Scouting: JSON.parse(text42Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay8Text4Scouting').then((text43Value) => {


                if (JSON.parse(text43Value) !== null) {

                    this.setState({ bay8Text4Scouting: JSON.parse(text43Value) });

                }

            }).done();
        } catch (error) {

        }

        //


        //BAY 8

        try {
            AsyncStorage.getItem(type + "" + 'miniBay9Scouting').then((text44Value) => {


                if (JSON.parse(text44Value) !== null) {

                    this.setState({ miniBay9Scouting: JSON.parse(text44Value) });

                }


            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay9Text1Scouting').then((text45Value) => {


                if (JSON.parse(text45Value) !== null) {

                    this.setState({ bay9Text1Scouting: JSON.parse(text45Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay9Text2Scouting').then((text46Value) => {


                if (JSON.parse(text46Value) !== null) {

                    this.setState({ bay9Text2Scouting: JSON.parse(text46Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay9Text3Scouting').then((text47Value) => {


                if (JSON.parse(text47Value) !== null) {

                    this.setState({ bay9Text3Scouting: JSON.parse(text47Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay9Text4Scouting').then((text48Value) => {


                if (JSON.parse(text48Value) !== null) {

                    this.setState({ bay9Text4Scouting: JSON.parse(text48Value) });

                }

            }).done();
        } catch (error) {

        }

        //

        //BAY 9

        try {
            AsyncStorage.getItem(type + "" + 'miniBay10Scouting').then((text49Value) => {


                if (JSON.parse(text49Value) !== null) {

                    this.setState({ miniBay10Scouting: JSON.parse(text49Value) });

                }


            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay10Text1Scouting').then((text50Value) => {


                if (JSON.parse(text50Value) !== null) {

                    this.setState({ bay10Text1Scouting: JSON.parse(text50Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay10Text2Scouting').then((text51Value) => {


                if (JSON.parse(text51Value) !== null) {

                    this.setState({ bay10Text2Scouting: JSON.parse(text51Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay10Text3Scouting').then((text52Value) => {


                if (JSON.parse(text52Value) !== null) {

                    this.setState({ bay10Text3Scouting: JSON.parse(text52Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay10Text4Scouting').then((text53Value) => {


                if (JSON.parse(text53Value) !== null) {

                    this.setState({ bay10Text4Scouting: JSON.parse(text53Value) });

                }

            }).done();
        } catch (error) {

        }

        //

        //BAY 10

        try {
            AsyncStorage.getItem(type + "" + 'miniBay11Scouting').then((text54Value) => {


                if (JSON.parse(text54Value) !== null) {

                    this.setState({ miniBay11Scouting: JSON.parse(text54Value) });

                }


            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay11Text1Scouting').then((text55Value) => {


                if (JSON.parse(text55Value) !== null) {

                    this.setState({ bay11Text1Scouting: JSON.parse(text55Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay11Text2Scouting').then((text56Value) => {


                if (JSON.parse(text56Value) !== null) {

                    this.setState({ bay11Text2Scouting: JSON.parse(text56Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay11Text3Scouting').then((text57Value) => {


                if (JSON.parse(text57Value) !== null) {

                    this.setState({ bay11Text3Scouting: JSON.parse(text57Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type + "" + 'bay11Text4Scouting').then((text58Value) => {

                if (JSON.parse(text58Value) !== null) {

                    this.setState({ bay11Text4Scouting: JSON.parse(text58Value) });

                }

            }).done();
        } catch (error) {

        }
        //



    }

    componentWillUnmount() {

        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleEmptyCells = () => {

        //BAY 1
        if (this.state.bay1Text1Scouting === null || this.state.bay1Text1Scouting === "") {

            this.setState({ bay1Text1Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay1Text1Scouting", '0')

        }

        if (this.state.bay1Text2Scouting === null || this.state.bay1Text2Scouting === "") {

            this.setState({ bay1Text2Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay1Text2Scouting", '0')

        }

        if (this.state.bay1Text3Scouting === null || this.state.bay1Text3Scouting === "") {

            this.setState({ bay1Text3Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay1Text3Scouting", '0')

        }

        if (this.state.bay1Text4Scouting === null || this.state.bay1Text4Scouting === "") {

            this.setState({ bay1Text4Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay1Text4Scouting", '0')

        }

        //BAY 2
        if (this.state.bay2Text1Scouting === null || this.state.bay2Text1Scouting === "") {

            this.setState({ bay2Text1Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay2Text1Scouting", '0')

        }

        if (this.state.bay2Text2Scouting === null || this.state.bay2Text2Scouting === "") {

            this.setState({ bay2Text2Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay2Text2Scouting", '0')

        }

        if (this.state.bay2Text3Scouting === null || this.state.bay2Text3Scouting === "") {

            this.setState({ bay2Text3Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay2Text3Scouting", '0')

        }

        if (this.state.bay2Text4Scouting === null || this.state.bay2Text4Scouting === "") {

            this.setState({ bay2Text4Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay2Text4Scouting", '0')

        }

        //BAY 3
        if (this.state.bay3Text1Scouting === null || this.state.bay3Text1Scouting === "") {

            this.setState({ bay3Text1Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay3Text1Scouting", '0')

        }

        if (this.state.bay3Text2Scouting === null || this.state.bay3Text2Scouting === "") {

            this.setState({ bay3Text2Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay3Text2Scouting", '0')

        }

        if (this.state.bay3Text3Scouting === null || this.state.bay3Text3Scouting === "") {

            this.setState({ bay3Text3Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay3Text3Scouting", '0')

        }

        if (this.state.bay3Text4Scouting === null || this.state.bay3Text4Scouting === "") {

            this.setState({ bay3Text4Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay3Text4Scouting", '0')

        }

        //BAY 4
        if (this.state.bay4Text1Scouting === null || this.state.bay4Text1Scouting === "") {

            this.setState({ bay4Text1Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay4Text1Scouting", '0')

        }

        if (this.state.bay4Text2Scouting === null || this.state.bay4Text2Scouting === "") {

            this.setState({ bay4Text2Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay4Text2Scouting", '0')

        }

        if (this.state.bay4Text3Scouting === null || this.state.bay4Text3Scouting === "") {

            this.setState({ bay4Text3Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay4Text3Scouting", '0')

        }

        if (this.state.bay4Text4Scouting === null || this.state.bay4Text4Scouting === "") {

            this.setState({ bay4Text4Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay4Text4Scouting", '0')

        }


        //BAY 5
        if (this.state.bay5Text1Scouting === null || this.state.bay5Text1Scouting === "") {

            this.setState({ bay5Text1Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay5Text1Scouting", '0')

        }

        if (this.state.bay5Text2Scouting === null || this.state.bay5Text2Scouting === "") {

            this.setState({ bay5Text2Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay5Text2Scouting", '0')

        }

        if (this.state.bay5Text3Scouting === null || this.state.bay5Text3Scouting === "") {

            this.setState({ bay5Text3Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay5Text3Scouting", '0')

        }

        if (this.state.bay5Text4Scouting === null || this.state.bay5Text4Scouting === "") {

            this.setState({ bay5Text4Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay5Text4Scouting", '0')

        }


        //BAY 6
        if (this.state.bay6Text1Scouting === null || this.state.bay6Text1Scouting === "") {

            this.setState({ bay6Text1Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay6Text1Scouting", '0')

        }

        if (this.state.bay6Text2Scouting === null || this.state.bay6Text2Scouting === "") {

            this.setState({ bay6Text2Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay6Text2Scouting", '0')

        }

        if (this.state.bay6Text3Scouting === null || this.state.bay6Text3Scouting === "") {

            this.setState({ bay6Text3Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay6Text3Scouting", '0')

        }

        if (this.state.bay6Text4Scouting === null || this.state.bay6Text4Scouting === "") {

            this.setState({ bay6Text4Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay6Text4Scouting", '0')

        }


        //BAY 7
        if (this.state.bay7Text1Scouting === null || this.state.bay7Text1Scouting === "") {

            this.setState({ bay7Text1Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay7Text1Scouting", '0')

        }

        if (this.state.bay7Text2Scouting === null || this.state.bay7Text2Scouting === "") {

            this.setState({ bay7Text2Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay7Text2Scouting", '0')

        }

        if (this.state.bay7Text3Scouting === null || this.state.bay7Text3Scouting === "") {

            this.setState({ bay7Text3Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay7Text3Scouting", '0')

        }

        if (this.state.bay7Text4Scouting === null || this.state.bay7Text4Scouting === "") {

            this.setState({ bay7Text4Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay7Text4Scouting", '0')

        }


        //BAY 8
        if (this.state.bay8Text1Scouting === null || this.state.bay8Text1Scouting === "") {

            this.setState({ bay8Text1Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay8Text1Scouting", '0')

        }

        if (this.state.bay8Text2Scouting === null || this.state.bay8Text2Scouting === "") {

            this.setState({ bay8Text2Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay8Text2Scouting", '0')

        }

        if (this.state.bay8Text3Scouting === null || this.state.bay8Text3Scouting === "") {

            this.setState({ bay8Text3Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay8Text3Scouting", '0')

        }

        if (this.state.bay8Text4Scouting === null || this.state.bay8Text4Scouting === "") {

            this.setState({ bay8Text4Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay8Text4Scouting", '0')

        }

        //BAY 9
        if (this.state.bay9Text1Scouting === null || this.state.bay9Text1Scouting === "") {

            this.setState({ bay9Text1Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay9Text1Scouting", '0')

        }

        if (this.state.bay9Text2Scouting === null || this.state.bay9Text2Scouting === "") {

            this.setState({ bay9Text2Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay9Text2Scouting", '0')

        }

        if (this.state.bay9Text3Scouting === null || this.state.bay9Text3Scouting === "") {

            this.setState({ bay9Text3Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay9Text3Scouting", '0')

        }

        if (this.state.bay9Text4Scouting === null || this.state.bay9Text4Scouting === "") {

            this.setState({ bay9Text4Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay9Text4Scouting", '0')

        }

        //BAY 10
        if (this.state.bay10Text1Scouting === null || this.state.bay10Text1Scouting === "") {

            this.setState({ bay10Text1Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay10Text1Scouting", '0')

        }

        if (this.state.bay10Text2Scouting === null || this.state.bay10Text2Scouting === "") {

            this.setState({ bay10Text2Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay10Text2Scouting", '0')

        }

        if (this.state.bay10Text3Scouting === null || this.state.bay10Text3Scouting === "") {

            this.setState({ bay10Text3Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay10Text3Scouting", '0')

        }

        if (this.state.bay10Text4Scouting === null || this.state.bay10Text4Scouting === "") {

            this.setState({ bay10Text4Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay10Text4Scouting", '0')

        }

        //BAY 11
        if (this.state.bay11Text1Scouting === null || this.state.bay11Text1Scouting === "") {

            this.setState({ bay11Text1Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay11Text1Scouting", '0')

        }

        if (this.state.bay11Text2Scouting === null || this.state.bay11Text2Scouting === "") {

            this.setState({ bay11Text2Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay11Text2Scouting", '0')

        }

        if (this.state.bay11Text3Scouting === null || this.state.bay11Text3Scouting === "") {

            this.setState({ bay11Text3Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay11Text3Scouting", '0')

        }

        if (this.state.bay11Text4Scouting === null || this.state.bay11Text4Scouting === "") {

            this.setState({ bay11Text4Scouting: '0' })

            this.setItem(this.state.scoutingType + "" + "bay11Text4Scouting", '0')

        }
    }

    checkRowNumber = () => {

        var that = this;

        const { rowNumberScouting } = this.state;

        if(rowNumberScouting){

            this.handleNextButtonPress();

        }else{

            alert('Please enter row number')
        }

    }

    handleNextButtonPress = () => {

        this.setItem(this.state.scoutingType + "" + "ScoutingYes", 'Yes')

        if (this.state.miniBay1Scouting !== null) {

          
            let data = {
                weekNumber: this.state.weekNum,
                scouterName: this.state.scoutersName,
                siteName: 'REP',
                location: this.state.location,
                scoutType: this.state.scoutingType,
                rowNumber: this.state.rowNumberScouting,
                header1: this.state.header1Scouting,
                header2: this.state.header2Scouting,
                header3: this.state.header3Scouting,
                header4: this.state.header4Scouting,
                miniBay: this.state.miniBay1Scouting,
                text1: this.state.bay1Text1Scouting,
                text2: this.state.bay1Text2Scouting,
                text3: this.state.bay1Text3Scouting,
                text4: this.state.bay1Text4Scouting,


            }


        
                db.addScoutingDetails(data).then((result) => {

                    console.log(result);

                    if (this.state.miniBay2Scouting !== '' && this.state.miniBay2Scouting !== null) {

                        this.saveScoutingDetails2();

                    } else {


                        this.props.navigation.push('Scouting1', { startNumber: this.state.rowNumberScouting, inter: this.state.intervals })




                    }


                })

           
        } else {

            console.log("No Data");
        }

    }

    saveScoutingDetails2 = () => {


        if (this.state.miniBay2Scouting !== null) {

            let data2 = {
                weekNumber: this.state.weekNum,
                scouterName: this.state.scoutersName,
                siteName: 'REP',
                location: this.state.location,
                scoutType: this.state.scoutingType,
                rowNumber: this.state.rowNumberScouting,
                header1: this.state.header1Scouting,
                header2: this.state.header2Scouting,
                header3: this.state.header3Scouting,
                header4: this.state.header4Scouting,
                miniBay: this.state.miniBay1Scouting,
                text1: this.state.bay2Text1Scouting,
                text2: this.state.bay2Text2Scouting,
                text3: this.state.bay2Text3Scouting,
                text4: this.state.bay2Text4Scouting,


            }


            db.addScoutingDetails(data2).then((result) => {

                console.log(result);

                if (this.state.miniBay3Scouting !== '' && this.state.miniBay3Scouting !== null) {

                    this.saveScoutingDetails3();

                } else {


                    this.props.navigation.push('Scouting1', { startNumber: this.state.rowNumberScouting, inter: this.state.intervals })


                }


            })
        } else {

            console.log("No Data");
        }


    }

    saveScoutingDetails3 = () => {

        if (this.state.miniBay3Scouting !== null) {

            let data3 = {
                weekNumber: this.state.weekNum,
                scouterName: this.state.scoutersName,
                siteName: 'REP',
                location: this.state.location,
                scoutType: this.state.scoutingType,
                rowNumber: this.state.rowNumberScouting,
                header1: this.state.header1Scouting,
                header2: this.state.header2Scouting,
                header3: this.state.header3Scouting,
                header4: this.state.header4Scouting,
                miniBay: this.state.miniBay1Scouting,
                text1: this.state.bay3Text1Scouting,
                text2: this.state.bay3Text2Scouting,
                text3: this.state.bay3Text3Scouting,
                text4: this.state.bay3Text4Scouting,


            }


            db.addScoutingDetails(data3).then((result) => {

                console.log(result);

                if (this.state.miniBay4Scouting !== '' && this.state.miniBay4Scouting !== null) {

                    this.saveScoutingDetails4();

                } else {


                    this.props.navigation.push('Scouting1', { startNumber: this.state.rowNumberScouting, inter: this.state.intervals })


                }


            })

        } else {

            console.log("No Data");
        }


    }

    saveScoutingDetails4 = () => {

        if (this.state.miniBay4Scouting !== null) {

            let data4 = {
                weekNumber: this.state.weekNum,
                scouterName: this.state.scoutersName,
                siteName: 'REP',
                location: this.state.location,
                scoutType: this.state.scoutingType,
                rowNumber: this.state.rowNumberScouting,
                header1: this.state.header1Scouting,
                header2: this.state.header2Scouting,
                header3: this.state.header3Scouting,
                header4: this.state.header4Scouting,
                miniBay: this.state.miniBay1Scouting,
                text1: this.state.bay4Text1Scouting,
                text2: this.state.bay4Text2Scouting,
                text3: this.state.bay4Text3Scouting,
                text4: this.state.bay4Text4Scouting,


            }


            db.addScoutingDetails(data4).then((result) => {

                console.log(result);

                if (this.state.miniBay5Scouting !== '' && this.state.miniBay5Scouting !== null) {

                    this.saveScoutingDetails5();

                } else {


                    this.props.navigation.push('Scouting1', { startNumber: this.state.rowNumberScouting, inter: this.state.intervals })


                }


            })

        } else {

            console.log("No Data");
        }

    }

    saveScoutingDetails5 = () => {

        if (this.state.miniBay5Scouting !== null) {

            let data5 = {
                weekNumber: this.state.weekNum,
                scouterName: this.state.scoutersName,
                siteName: 'REP',
                location: this.state.location,
                scoutType: this.state.scoutingType,
                rowNumber: this.state.rowNumberScouting,
                header1: this.state.header1Scouting,
                header2: this.state.header2Scouting,
                header3: this.state.header3Scouting,
                header4: this.state.header4Scouting,
                miniBay: this.state.miniBay1Scouting,
                text1: this.state.bay5Text1Scouting,
                text2: this.state.bay5Text2Scouting,
                text3: this.state.bay5Text3Scouting,
                text4: this.state.bay5Text4Scouting,


            }


            db.addScoutingDetails(data5).then((result) => {

                console.log(result);

                if (this.state.miniBay6Scouting !== '' && this.state.miniBay6Scouting !== null) {

                    this.saveScoutingDetails6();

                } else {


                    this.props.navigation.push('Scouting1', { startNumber: this.state.rowNumberScouting, inter: this.state.intervals })


                }


            })

        } else {

            console.log("No Data");
        }


    }

    saveScoutingDetails6 = () => {

        if (this.state.miniBay6Scouting !== null) {

            let data6 = {
                weekNumber: this.state.weekNum,
                scouterName: this.state.scoutersName,
                siteName: 'REP',
                location: this.state.location,
                scoutType: this.state.scoutingType,
                rowNumber: this.state.rowNumberScouting,
                header1: this.state.header1Scouting,
                header2: this.state.header2Scouting,
                header3: this.state.header3Scouting,
                header4: this.state.header4Scouting,
                miniBay: this.state.miniBay1Scouting,
                text1: this.state.bay6Text1Scouting,
                text2: this.state.bay6Text2Scouting,
                text3: this.state.bay6Text3Scouting,
                text4: this.state.bay6Text4Scouting,


            }


            db.addScoutingDetails(data6).then((result) => {

                console.log(result);

                if (this.state.miniBay7Scouting !== '' && this.state.miniBay7Scouting !== null) {

                    this.saveScoutingDetails7();

                } else {


                    this.props.navigation.push('Scouting1', { startNumber: this.state.rowNumberScouting, inter: this.state.intervals })


                }


            })

        } else {

            console.log("No Data");
        }

    }


    saveScoutingDetails7 = () => {

        if (this.state.miniBay7Scouting !== null) {

            let data7 = {
                weekNumber: this.state.weekNum,
                scouterName: this.state.scoutersName,
                siteName: 'REP',
                location: this.state.location,
                scoutType: this.state.scoutingType,
                rowNumber: this.state.rowNumberScouting,
                header1: this.state.header1Scouting,
                header2: this.state.header2Scouting,
                header3: this.state.header3Scouting,
                header4: this.state.header4Scouting,
                miniBay: this.state.miniBay1Scouting,
                text1: this.state.bay7Text1Scouting,
                text2: this.state.bay7Text2Scouting,
                text3: this.state.bay7Text3Scouting,
                text4: this.state.bay7Text4Scouting,


            }


            db.addScoutingDetails(data7).then((result) => {

                console.log(result);

                if (this.state.miniBay8Scouting !== '' && this.state.miniBay8Scouting !== null) {

                    this.saveScoutingDetails8();

                } else {


                    this.props.navigation.push('Scouting1', { startNumber: this.state.rowNumberScouting, inter: this.state.intervals })

                }


            })

        } else {

            console.log("No Data");
        }

    }

    saveScoutingDetails8 = () => {

        if (this.state.miniBay8Scouting !== null) {

            let data8 = {
                weekNumber: this.state.weekNum,
                scouterName: this.state.scoutersName,
                siteName: 'REP',
                location: this.state.location,
                scoutType: this.state.scoutingType,
                rowNumber: this.state.rowNumberScouting,
                header1: this.state.header1Scouting,
                header2: this.state.header2Scouting,
                header3: this.state.header3Scouting,
                header4: this.state.header4Scouting,
                miniBay: this.state.miniBay1Scouting,
                text1: this.state.bay8Text1Scouting,
                text2: this.state.bay8Text2Scouting,
                text3: this.state.bay8Text3Scouting,
                text4: this.state.bay8Text4Scouting,


            }


            db.addScoutingDetails(data8).then((result) => {

                console.log(result);

                if (this.state.miniBay9Scouting !== '' && this.state.miniBay9Scouting !== null) {

                    this.saveScoutingDetails9();

                } else {


                    this.props.navigation.push('Scouting1', { startNumber: this.state.rowNumberScouting, inter: this.state.intervals })


                }


            })

        } else {

            console.log("No Data");
        }

    }

    saveScoutingDetails9 = () => {

        if (this.state.miniBay9Scouting !== null) {

            let data9 = {
                weekNumber: this.state.weekNum,
                scouterName: this.state.scoutersName,
                siteName: 'REP',
                location: this.state.location,
                scoutType: this.state.scoutingType,
                rowNumber: this.state.rowNumberScouting,
                header1: this.state.header1Scouting,
                header2: this.state.header2Scouting,
                header3: this.state.header3Scouting,
                header4: this.state.header4Scouting,
                miniBay: this.state.miniBay1Scouting,
                text1: this.state.bay9Text1Scouting,
                text2: this.state.bay9Text2Scouting,
                text3: this.state.bay9Text3Scouting,
                text4: this.state.bay9Text4Scouting,


            }


            db.addScoutingDetails(data9).then((result) => {

                console.log(result);

                if (this.state.miniBay10Scouting !== '' && this.state.miniBay10Scouting !== null) {

                    this.saveScoutingDetails10();

                } else {


                    this.props.navigation.push('Scouting1', { startNumber: this.state.rowNumberScouting, inter: this.state.intervals })


                }


            })

        } else {

            console.log("No Data");

        }

    }

    saveScoutingDetails10 = () => {

        if (this.state.miniBay10Scouting !== null) {

            let data10 = {
                weekNumber: this.state.weekNum,
                scouterName: this.state.scoutersName,
                siteName: 'REP',
                location: this.state.location,
                scoutType: this.state.scoutingType,
                rowNumber: this.state.rowNumberScouting,
                header1: this.state.header1Scouting,
                header2: this.state.header2Scouting,
                header3: this.state.header3Scouting,
                header4: this.state.header4Scouting,
                miniBay: this.state.miniBay1Scouting,
                text1: this.state.bay10Text1Scouting,
                text2: this.state.bay10Text2Scouting,
                text3: this.state.bay10Text3Scouting,
                text4: this.state.bay10Text4Scouting,


            }


            db.addScoutingDetails(data10).then((result) => {

                console.log(result);

                if (this.state.miniBay11Scouting !== '' && this.state.miniBay11Scouting !== null) {

                    this.saveScoutingDetails11();

                } else {


                    this.props.navigation.push('Scouting1', { startNumber: this.state.rowNumberScouting, inter: this.state.intervals })


                }


            })

        } else {

            console.log("No Data");

        }

    }

    saveScoutingDetails11 = () => {

        if (this.state.miniBay11Scouting !== null) {

            let data11 = {
                weekNumber: this.state.weekNum,
                scouterName: this.state.scoutersName,
                siteName: 'REP',
                location: this.state.location,
                scoutType: this.state.scoutingType,
                rowNumber: this.state.rowNumberScouting,
                header1: this.state.header1Scouting,
                header2: this.state.header2Scouting,
                header3: this.state.header3Scouting,
                header4: this.state.header4Scouting,
                miniBay: this.state.miniBay1Scouting,
                text1: this.state.bay11Text1Scouting,
                text2: this.state.bay11Text2Scouting,
                text3: this.state.bay11Text3Scouting,
                text4: this.state.bay11Text4Scouting,


            }


            db.addScoutingDetails(data11).then((result) => {

                console.log(result);

                this.props.navigation.push('Scouting1', { startNumber: this.state.rowNumberScouting, inter: this.state.intervals })



            })

        } else {

            console.log("No Data");

        }


    }

    handleBackButton = () => {

        BackHandler.exitApp();

    }

    onButtonPress = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        // then navigate
        navigate('NewScreen');
    }

    updateTextInput = (text, field) => {

        console.log("WHAT SHOULD BE THE FIELD NAME IN ASYNC STORANGE : " + this.state.scoutingType + "" + field);
        this.setItem(this.state.scoutingType + "" + field, text)
        const state = this.state
        state[field] = text;
        this.setState(state);
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

    render() {

        return (

            <View style={styles.container}>

                <ScrollView keyboardShouldPersistTaps='handled'>

                    <View pointerEvents={this.state.dataEntered == "Yes" ? 'none' : 'auto'}>

                        <View style={styles.mainPageContainer}>

                            <View style={{ flexDirection: 'row' }}>

                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                    <Text style={styles.titleBlackText}>Enter Row Number:</Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>

                                    <View style={styles.borderEdit}>
                                        <TextInput style={styles.textInputStyle2}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'rowNumberScouting')}
                                            blurOnSubmit={true}
                                            value={this.state.rowNumberScouting}

                                        />

                                    </View>

                                </View>

                            </View>


                            <View style={styles.marginBetweenTop}></View>
                            <View style={styles.tableContainer}>

                                <View style={styles.tableRow}>
                                    <View style={styles.tableColumnClockInOutTimes}>
                                        <Text style={styles.textLineItem}></Text>
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,

                                    }}></View>

                                    <View style={styles.tableColumnTotals}>
                                        <Text style={styles.textLineItemGreen}>{this.state.header1Scouting}</Text>
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotals}>
                                        <Text style={styles.textLineItemGreen}>{this.state.header2Scouting}</Text>
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotals}>
                                        <Text style={styles.textLineItemGreen}>{this.state.header3Scouting}</Text>
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotals}>
                                        <Text style={styles.textLineItemGreen}>{this.state.header4Scouting}</Text>
                                    </View>

                                </View>

                                <View style={{
                                    borderTopColor: '#F1EEEC',
                                    borderTopWidth: 1,
                                }}></View>


                                <View style={styles.tableRow}>
                                    <View style={styles.tableColumnClockInOutTimes}>
                                        <Text style={styles.textLineItemGreen}>{this.state.miniBay1Scouting}</Text>
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay1Text1Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay1Text1Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay1Text2Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay1Text2Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay1Text3Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay1Text3Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay1Text4Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay1Text4Scouting}
                                        />
                                    </View>

                                </View>




                                <View style={{
                                    borderTopColor: '#F1EEEC',
                                    borderTopWidth: 1,
                                }}></View>

                                <View style={styles.tableRow}>
                                    <View style={styles.tableColumnClockInOutTimes}>
                                        <Text style={styles.textLineItemGreen}>{this.state.miniBay2Scouting}</Text>
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay2Text1Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay2Text1Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay2Text2Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay2Text2Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay2Text3Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay2Text3Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay2Text4Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay2Text4Scouting}
                                        />
                                    </View>

                                </View>



                                <View style={{
                                    borderTopColor: '#F1EEEC',
                                    borderTopWidth: 1,
                                }}></View>

                                <View style={styles.tableRow}>
                                    <View style={styles.tableColumnClockInOutTimes}>
                                        <Text style={styles.textLineItemGreen}>{this.state.miniBay3Scouting}</Text>
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay3Text1Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay3Text1Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay3Text2Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay3Text2Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay3Text3Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay3Text3Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay3Text4Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay3Text4Scouting}
                                        />
                                    </View>

                                </View>





                                <View style={{
                                    borderTopColor: '#F1EEEC',
                                    borderTopWidth: 1,
                                }}></View>

                                <View style={styles.tableRow}>
                                    <View style={styles.tableColumnClockInOutTimes}>
                                        <Text style={styles.textLineItemGreen}>{this.state.miniBay4Scouting}</Text>
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay4Text1Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay4Text1Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay4Text2Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay4Text2Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay4Text3Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay4Text3Scouting}

                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay4Text4Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay4Text4Scouting}
                                        />
                                    </View>

                                </View>




                                <View style={{
                                    borderTopColor: '#F1EEEC',
                                    borderTopWidth: 1,
                                }}></View>

                                <View style={styles.tableRow}>
                                    <View style={styles.tableColumnClockInOutTimes}>
                                        <Text style={styles.textLineItemGreen}>{this.state.miniBay5Scouting}</Text>
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay5Text1Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay5Text1Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay5Text2Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay5Text2Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay5Text3Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay5Text3Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay5Text4Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay5Text4Scouting}
                                        />
                                    </View>

                                </View>




                                <View style={{
                                    borderTopColor: '#F1EEEC',
                                    borderTopWidth: 1,
                                }}></View>

                                <View style={styles.tableRow}>
                                    <View style={styles.tableColumnClockInOutTimes}>
                                        <Text style={styles.textLineItemGreen}>{this.state.miniBay6Scouting}</Text>
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay6Text1Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay6Text1Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay6Text2Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay6Text2Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay6Text3Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay6Text3Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay6Text4Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay6Text4Scouting}
                                        />
                                    </View>

                                </View>





                                <View style={{
                                    borderTopColor: '#F1EEEC',
                                    borderTopWidth: 1,
                                }}></View>

                                <View style={styles.tableRow}>
                                    <View style={styles.tableColumnClockInOutTimes}>
                                        <Text style={styles.textLineItemGreen}>{this.state.miniBay7Scouting}</Text>
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay7Text1Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay7Text1Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay7Text2Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay7Text2Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay7Text3Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay7Text3Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay7Text4Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay7Text4Scouting}
                                        />
                                    </View>

                                </View>






                                <View style={{
                                    borderTopColor: '#F1EEEC',
                                    borderTopWidth: 1,
                                }}></View>

                                <View style={styles.tableRow}>
                                    <View style={styles.tableColumnClockInOutTimes}>
                                        <Text style={styles.textLineItemGreen}>{this.state.miniBay8Scouting}</Text>
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay8Text1Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay8Text1Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay8Text2Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay8Text2Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay8Text3Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay8Text3Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay8Text4Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay8Text4Scouting}
                                        />
                                    </View>

                                </View>




                                <View style={{
                                    borderTopColor: '#F1EEEC',
                                    borderTopWidth: 1,
                                }}></View>

                                <View style={styles.tableRow}>
                                    <View style={styles.tableColumnClockInOutTimes}>
                                        <Text style={styles.textLineItemGreen}>{this.state.miniBay9Scouting}</Text>
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay9Text1Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay9Text1Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay9Text2Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay9Text2Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay9Text3Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay9Text3Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay9Text4Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay9Text4Scouting}
                                        />
                                    </View>

                                </View>





                                <View style={{
                                    borderTopColor: '#F1EEEC',
                                    borderTopWidth: 1,
                                }}></View>

                                <View style={styles.tableRow}>
                                    <View style={styles.tableColumnClockInOutTimes}>
                                        <Text style={styles.textLineItemGreen}>{this.state.miniBay10Scouting}</Text>
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay10Text1Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay10Text1Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay10Text2Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay10Text2Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay10Text3Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay10Text3Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay10Text4Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay10Text4Scouting}
                                        />
                                    </View>

                                </View>


                                <View style={{
                                    borderTopColor: '#F1EEEC',
                                    borderTopWidth: 1,
                                }}></View>

                                <View style={styles.tableRow}>
                                    <View style={styles.tableColumnClockInOutTimes}>
                                        <Text style={styles.textLineItemGreen}>{this.state.miniBay11Scouting}</Text>
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay11Text1Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay11Text1Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay11Text2Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay11Text2Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay11Text3Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay11Text3Scouting}
                                        />
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay11Text4Scouting')}
                                            blurOnSubmit={true}
                                            value={this.state.bay11Text4Scouting}
                                        />
                                    </View>

                                </View>
                            </View>

                            <View style={styles.marginBetweenTop}></View>

                            <TouchableOpacity onPress={() => this.handleEmptyCells()}>
                                <Text style={styles.copyText}>Click here to set empty cells with 0(zero)</Text>
                            </TouchableOpacity>

                            <View style={styles.marginBetweenTop}></View>

                            <View style={styles.alignButton}>
                                <TouchableOpacity
                                    style={styles.buttonContainer}
                                    disabled={false}
                                    onPress={() => this.checkRowNumber()}>
                                    <Text style={styles.buttonText}>Next</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.marginBetweenTop}></View>

                        </View>

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

    copyText: {

        alignSelf: 'center',
        fontSize: 18,
        color: '#ff0000',

    },

    textLineItem: {

        color: "#000000",
    },

    textLineItemIOS: {

        color: "#000000",
    },

    textLineItemGreen: {

        color: "#87B26A",
        flexShrink: 1,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    textLineItemGreenIOS: {

        color: "#87B26A",
        flexShrink: 1,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    tableContainer: {
        backgroundColor: "#ffffff",
        borderRadius: 5,
        flex: 1,
        marginTop: 0,
        borderColor: '#F1EEEC',
        borderWidth: 1,
    },

    tableRow: {
        flex: 5,
        flexDirection: "row",
        maxHeight: 50
    },

    tableColumnTotals: {
        alignItems: "center",
        flex: 3,
        justifyContent: "center",
        margin: 1,
        padding: 5,

    },

    tableColumnTotalsEdit: {
        alignItems: "center",
        flex: 3,
        justifyContent: "center",
        margin: 1,
        padding: 5,

    },

    tableColumnClockInOutTimes: {
        alignItems: "center",
        flex: 2,
        justifyContent: "center",
        margin: 1,
        padding: 10,

    },

    flexArrangement: {

        flexDirection: 'row'

    },

    mainPageContainer: {

        flex: 1,
        marginRight: 20,
        marginLeft: 20,
        marginTop: 10

    },

    titleHeadingText: {

        color: 'black',
        fontSize: 17,
        flexShrink: 1,
        textAlign: 'center',

    },


    titleHeadingTextIOS: {

        color: 'black',
        fontSize: 17,
        flexShrink: 1,
        textAlign: 'center',

    },

    titleBlackText: {

        color: '#000000',
        fontSize: 17,
        flexShrink: 1,

    },


    titleBlackTextIOS: {

        color: '#000000',
        fontSize: 17,
        flexShrink: 1,

    },

    titleGreenText: {

        color: '#7DBD5C',
        fontSize: 24,
        flexShrink: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        textDecorationLine: 'underline'

    },

    titleGreenTextIOS: {

        color: '#7DBD5C',
        fontSize: 24,
        flexShrink: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        textDecorationLine: 'underline'

    },

    borderEdit: {
        marginTop: 8,
        borderColor: '#F1EEEC',
        borderWidth: 1,
        borderRadius: 10,
    },

    textInputStyle: {
        fontSize: 14,
        color: 'black',
        marginLeft: 10,
        marginRight: 10,
        height: 60,
        backgroundColor: "transparent",


    },

    textInputStyleIOS: {
        fontSize: 14,
        color: 'black',
        marginLeft: 10,
        marginRight: 10,
        height: 60,
        backgroundColor: "transparent",


    },

    textInputStyle2: {
        fontSize: 14,
        color: 'black',
        marginLeft: 10,
        height: 50,
        width: width,
        marginRight: 10,

        backgroundColor: "transparent",

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

    alignButton: {

        alignItems: 'center',


    },

    marginBetweenTextTop: {

        marginTop: 10,

    },

    marginTopStyle: {

        marginTop: 10,

    },

    buttonContainer: {
        backgroundColor: '#7DBD5C',
        borderRadius: 10,
        padding: 10,
        height: 50,
        width: widthText,
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


    weekText2Ios: {
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






});