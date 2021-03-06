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
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback

} from 'react-native';

import DropDownPicker from '@nectr-rn/react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler';
var width = Dimensions.get('window').width / 2.5; //full width
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment'
import Database from '../screens/Database'

const db = new Database();

var widthText = Dimensions.get('window').width/1.3;


var intervalsOffline, startRowsOffline



export default class Scouting26 extends Component {

    constructor(props) {
        super(props);

        this.state = {

            rowNumberScouting26: '',
            intervals: '',
            startingRowNumber: '',
            scoutingType: '',
            noRows: '',
            header1Scouting26: '',
            header2Scouting26: '',
            header3Scouting26: '',
            header4Scouting26: '',

            miniBay1Scouting26: '',
            bay1Text1Scouting26: '',
            bay1Text2Scouting26: '',
            bay1Text3Scouting26: '',
            bay1Text4Scouting26: '',

            miniBay2Scouting26: '',
            bay2Text1Scouting26: '',
            bay2Text2Scouting26: '',
            bay2Text3Scouting26: '',
            bay2Text4Scouting26: '',

            miniBay3Scouting26: '',
            bay3Text1Scouting26: '',
            bay3Text2Scouting26: '',
            bay3Text3Scouting26: '',
            bay3Text4Scouting26: '',

            miniBay4Scouting26: '',
            bay4Text1Scouting26: '',
            bay4Text2Scouting26: '',
            bay4Text3Scouting26: '',
            bay4Text4Scouting26: '',

            miniBay5Scouting26: '',
            bay5Text1Scouting26: '',
            bay5Text2Scouting26: '',
            bay5Text3Scouting26: '',
            bay5Text4Scouting26: '',

            miniBay6Scouting26: '',
            bay6Text1Scouting26: '',
            bay6Text2Scouting26: '',
            bay6Text3Scouting26: '',
            bay6Text4Scouting26: '',

            miniBay7Scouting26: '',
            bay7Text1Scouting26: '',
            bay7Text2Scouting26: '',
            bay7Text3Scouting26: '',
            bay7Text4Scouting26: '',


            miniBay8Scouting26: '',
            bay8Text1Scouting26: '',
            bay8Text2Scouting26: '',
            bay8Text3Scouting26: '',
            bay8Text4Scouting26: '',


            miniBay9Scouting26: '',
            bay9Text1Scouting26: '',
            bay9Text2Scouting26: '',
            bay9Text3Scouting26: '',
            bay9Text4Scouting26: '',


            miniBay10Scouting26: '',
            bay10Text1Scouting26: '',
            bay10Text2Scouting26: '',
            bay10Text3Scouting26: '',
            bay10Text4Scouting26: '',


            miniBay11Scouting26: '',
            bay11Text1Scouting26: '',
            bay11Text2Scouting26: '',
            bay11Text3Scouting26: '',
            bay11Text4Scouting26: '',

            scoutersName: '',
            location: '',
            weekNum: '',
            siteName: '',
            dataEntered: '',



        };


    }


    componentDidMount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);


        //Get data from previous page

        if (this.props.route.params.startNumber2 !== undefined) {
            var number = this.props.route.params.startNumber2;
            startRowsOffline = number;

            console.log("<<<<<<<<<<< :" + startRowsOffline);


        } else {

        }


        if (this.props.route.params.inter2 !== undefined) {
            var inter1 = this.props.route.params.inter2;
            intervalsOffline = inter1

            console.log("<<<<<<<<<<< :" + intervalsOffline);


        } else {

        }

        //END

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
            AsyncStorage.getItem('house').then((siteee) => {
                houseSelected = JSON.parse(siteee);
                this.setState({ siteName: houseSelected });

                console.log("HOUSE : " + this.state.siteName);

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
                    AsyncStorage.getItem("rows" + opt1).then((textRows) => {
                        var optRows = JSON.parse(textRows);
                        this.setState({ noRows: optRows });

                        this.setUpMiniBays();

                    }).done();
                } catch (error) {

                }

                try {

                    console.log();
                    AsyncStorage.getItem("intervals" + opt1).then((text2Value) => {
                        var opt2 = JSON.parse(text2Value);
                        this.setState({ intervals: opt2 });

                    }).done();
                } catch (error) {

                }

                try {

                    AsyncStorage.getItem("column1" + opt1).then((text3Value) => {
                        var opt3 = JSON.parse(text3Value);
                        this.setState({ header1Scouting26: opt3 });

                    }).done();
                } catch (error) {

                }


                try {

                    AsyncStorage.getItem("column2" + opt1).then((text4Value) => {
                        var opt4 = JSON.parse(text4Value);
                        this.setState({ header2Scouting26: opt4 });

                    }).done();
                } catch (error) {

                }

                try {

                    AsyncStorage.getItem("column3" + opt1).then((text5Value) => {
                        var opt5 = JSON.parse(text5Value);
                        this.setState({ header3Scouting26: opt5 });

                    }).done();
                } catch (error) {

                }

                try {

                    AsyncStorage.getItem("column4" + opt1).then((text6Value) => {
                        var opt6 = JSON.parse(text6Value);
                        this.setState({ header4Scouting26: opt6 });

                    }).done();
                } catch (error) {

                }

                try {

                    AsyncStorage.getItem(opt1 + "" + "Scouting26Yes").then((dataEntered) => {

                        var opt7 = JSON.parse(dataEntered);

                        this.setState({ dataEntered: opt7 })

                        /*if (this.state.dataEntered == 'Yes') {

                            this.props.navigation.navigate('Scouting27', { startNumber2: this.state.rowNumberScouting26, inter2: this.state.intervals })
    
                        } else {
    
                            console.log("Data not submitted");
    
                        }*/
                    }).done();
                } catch (error) {

                }

                this.getAsyncData(opt1);

            }).done();
        } catch (error) {

        }


        //END


        //Calculations


        var actualRowNumber = parseInt(startRowsOffline) + parseInt(intervalsOffline);

        console.log("Next Number is : " + actualRowNumber);

        var finalRowNumber = '' + actualRowNumber;


        this.setState({ rowNumberScouting26: finalRowNumber })

    }

    setUpMiniBays = () => {

        var arrayRows = this.state.noRows
        var list = [];
        for (var i = 1; i <= arrayRows; i++) {
            list.push(i);

        }
        //miniBay1Scouting

        if (!list.length) {

            alert('Please enter number of bays in the settings page')

        } else {

            //1
            if (list[0] === undefined) {

                this.setState({ miniBay1Scouting26: '' })


            } else {

                this.setState({ miniBay1Scouting26: list[0] })


            }

            //2
            if (list[1] === undefined) {

                this.setState({ miniBay2Scouting26: '' })


            } else {

                this.setState({ miniBay2Scouting26: list[1] })


            }

            //3
            if (list[2] === undefined) {

                this.setState({ miniBay3Scouting26: '' })


            } else {

                this.setState({ miniBay3Scouting26: list[2] })


            }

            //4
            if (list[3] === undefined) {

                this.setState({ miniBay4Scouting26: '' })


            } else {

                this.setState({ miniBay4Scouting26: list[3] })


            }

            //5
            if (list[4] === undefined) {

                this.setState({ miniBay5Scouting26: '' })


            } else {

                this.setState({ miniBay5Scouting26: list[4] })


            }

            //6
            if (list[5] === undefined) {

                this.setState({ miniBay6Scouting26: '' })


            } else {

                this.setState({ miniBay6Scouting26: list[5] })


            }
            //7
            if (list[6] === undefined) {

                this.setState({ miniBay7Scouting26: '' })


            } else {

                this.setState({ miniBay7Scouting26: list[6] })


            }

            //8
            if (list[7] === undefined) {

                this.setState({ miniBay8Scouting26: '' })


            } else {

                this.setState({ miniBay8Scouting26: list[7] })


            }

            //9
            if (list[8] === undefined) {

                this.setState({ miniBay9Scouting26: '' })


            } else {

                this.setState({ miniBay9Scouting26: list[8] })


            }

            //10
            if (list[9] === undefined) {

                this.setState({ miniBay10Scouting26: '' })


            } else {

                this.setState({ miniBay10Scouting26: list[9] })


            }

            //11
            if (list[10] === undefined) {

                this.setState({ miniBay11Scouting26: '' })


            } else {

                this.setState({ miniBay11Scouting26: list[10] })


            }


        }

    }

    getAsyncData(type1) {


        try {
            AsyncStorage.getItem(this.state.scoutingType + "" + 'rowNumberScouting26').then((text1Value) => {

                if (JSON.parse(text1Value) !== null) {

                    console.log("Row number : " + JSON.parse(text1Value));
                    this.setState({ rowNumberScouting26: JSON.parse(text1Value) });

                   
                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'header1Scouting26').then((text2Value) => {

                if (JSON.parse(text2Value) !== null) {

                    this.setState({ header1Scouting26: JSON.parse(text2Value) });

                }


            }).done();
        } catch (error) {

        }


        try {
            AsyncStorage.getItem(type1 + "" + 'header2Scouting26').then((text3Value) => {

                if (JSON.parse(text3Value) !== null) {

                    this.setState({ header2Scouting26: JSON.parse(text3Value) });

                }


            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'header3Scouting26').then((text4Value) => {

                if (JSON.parse(text4Value) !== null) {

                    this.setState({ header3Scouting26: JSON.parse(text4Value) });

                }



            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'header4Scouting26').then((text5Value) => {

                if (JSON.parse(text5Value) !== null) {

                    this.setState({ header4Scouting26: JSON.parse(text5Value) });

                }

            }).done();
        } catch (error) {

        }


        //BAY 1

        try {
            AsyncStorage.getItem(type1 + "" + 'miniBay1Scouting26').then((text6Value) => {

                if (JSON.parse(text6Value) !== null) {

                    this.setState({ miniBay1Scouting26: JSON.parse(text6Value) });

                }


            }).done();
        } catch (error) {

        }


        try {
            AsyncStorage.getItem(type1 + "" + 'bay1Text1Scouting26').then((text7Value) => {

                if (JSON.parse(text7Value) !== null) {

                    this.setState({ bay1Text1Scouting26: JSON.parse(text7Value) });

                }

            }).done();
        } catch (error) {

        }


        try {
            AsyncStorage.getItem(type1 + "" + 'bay1Text2Scouting26').then((text8Value) => {

                if (JSON.parse(text8Value) !== null) {

                    this.setState({ bay1Text2Scouting26: JSON.parse(text8Value) });

                }


            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay1Text3Scouting26').then((text9Value) => {

                if (JSON.parse(text9Value) !== null) {

                    this.setState({ bay1Text3Scouting26: JSON.parse(text9Value) });

                }



            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay1Text4Scouting26').then((text10Value) => {

                if (JSON.parse(text10Value) !== null) {

                    this.setState({ bay1Text4Scouting26: JSON.parse(text10Value) });

                }


            }).done();
        } catch (error) {

        }

        //


        //BAY 1

        try {
            AsyncStorage.getItem(type1 + "" + 'miniBay2Scouting26').then((text11Value) => {

                if (JSON.parse(text11Value) !== null) {

                    this.setState({ miniBay2Scouting26: JSON.parse(text11Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay2Text1Scouting26').then((text12Value) => {

                if (JSON.parse(text12Value) !== null) {

                    this.setState({ bay2Text1Scouting26: JSON.parse(text12Value) });

                }


            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay2Text2Scouting26').then((text13Value) => {

                if (JSON.parse(text13Value) !== null) {

                    this.setState({ bay2Text2Scouting26: JSON.parse(text13Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay2Text3Scouting26').then((text60Value) => {

                if (JSON.parse(text60Value) !== null) {

                    this.setState({ bay2Text3Scouting26: JSON.parse(text60Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay2Text4Scouting26').then((text61Value) => {

                if (JSON.parse(text61Value) !== null) {

                    this.setState({ bay2Text4Scouting26: JSON.parse(text61Value) });

                }


            }).done();
        } catch (error) {

        }

        //

        //BAY 2

        try {
            AsyncStorage.getItem(type1 + "" + 'miniBay3Scouting26').then((text14Value) => {

                if (JSON.parse(text14Value) !== null) {

                    this.setState({ miniBay3Scouting26: JSON.parse(text14Value) });

                }



            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay3Text1Scouting26').then((text15Value) => {

                if (JSON.parse(text15Value) !== null) {

                    this.setState({ bay3Text1Scouting26: JSON.parse(text15Value) });

                }



            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay3Text2Scouting26').then((text16Value) => {

                if (JSON.parse(text16Value) !== null) {

                    this.setState({ bay3Text2Scouting26: JSON.parse(text16Value) });


                }


            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay3Text3Scouting26').then((text17Value) => {

                if (JSON.parse(text17Value) !== null) {

                    this.setState({ bay3Text3Scouting26: JSON.parse(text17Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay3Text4Scouting26').then((text18Value) => {

                if (JSON.parse(text18Value) !== null) {

                    this.setState({ bay3Text4Scouting26: JSON.parse(text18Value) });

                }


            }).done();
        } catch (error) {

        }

        //

        //BAY 3

        try {
            AsyncStorage.getItem(type1 + "" + 'miniBay4Scouting26').then((text19Value) => {

                if (JSON.parse(text19Value) !== null) {


                    this.setState({ miniBay4Scouting26: JSON.parse(text19Value) });

                }



            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay4Text1Scouting26').then((text20Value) => {

                if (JSON.parse(text20Value) !== null) {

                    this.setState({ bay4Text1Scouting26: JSON.parse(text20Value) });

                }


            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay4Text2Scouting26').then((text21Value) => {

                if (JSON.parse(text21Value) !== null) {

                    this.setState({ bay4Text2Scouting26: JSON.parse(text21Value) });

                }


            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay4Text3Scouting26').then((text22Value) => {

                if (JSON.parse(text22Value) !== null) {

                    this.setState({ bay4Text3Scouting26: JSON.parse(text22Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay4Text4Scouting26').then((text23Value) => {

                if (JSON.parse(text23Value) !== null) {

                    this.setState({ bay4Text4Scouting26: JSON.parse(text23Value) });

                }

            }).done();
        } catch (error) {

        }

        //

        //BAY 4

        try {
            AsyncStorage.getItem(type1 + "" + 'miniBay5Scouting26').then((text24Value) => {

                if (JSON.parse(text24Value) !== null) {

                    this.setState({ miniBay5Scouting26: JSON.parse(text24Value) });

                }


            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay5Text1Scouting26').then((text25Value) => {


                if (JSON.parse(text25Value) !== null) {

                    this.setState({ bay5Text1Scouting26: JSON.parse(text25Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay5Text2Scouting26').then((text26Value) => {

                if (JSON.parse(text26Value) !== null) {

                    this.setState({ bay5Text2Scouting26: JSON.parse(text26Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay5Text3Scouting26').then((text27Value) => {


                if (JSON.parse(text27Value) !== null) {

                    this.setState({ bay5Text3Scouting26: JSON.parse(text27Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay5Text4Scouting26').then((text28Value) => {


                if (JSON.parse(text28Value) !== null) {

                    this.setState({ bay5Text4Scouting26: JSON.parse(text28Value) });

                }

            }).done();
        } catch (error) {

        }

        //

        //BAY 5

        try {
            AsyncStorage.getItem(type1 + "" + 'miniBay6Scouting26').then((text29Value) => {

                if (JSON.parse(text29Value) !== null) {

                    this.setState({ miniBay6Scouting26: JSON.parse(text29Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay6Text1Scouting26').then((text30Value) => {


                if (JSON.parse(text30Value) !== null) {

                    this.setState({ bay6Text1Scouting26: JSON.parse(text30Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay6Text2Scouting26').then((text31Value) => {


                if (JSON.parse(text31Value) !== null) {

                    this.setState({ bay6Text2Scouting26: JSON.parse(text31Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay6Text3Scouting26').then((text32Value) => {


                if (JSON.parse(text32Value) !== null) {

                    this.setState({ bay6Text3Scouting26: JSON.parse(text32Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay6Text4Scouting26').then((text33Value) => {

                if (JSON.parse(text33Value) !== null) {

                    this.setState({ bay6Text4Scouting26: JSON.parse(text33Value) });

                }

            }).done();
        } catch (error) {

        }

        //

        //BAY 6

        try {
            AsyncStorage.getItem(type1 + "" + 'miniBay7Scouting26').then((text34Value) => {


                if (JSON.parse(text34Value) !== null) {

                    this.setState({ miniBay7Scouting26: JSON.parse(text34Value) });

                }


            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay7Text1Scouting26').then((text35Value) => {

                this.setState({ bay7Text1Scouting26: JSON.parse(text35Value) });

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay7Text2Scouting26').then((text36Value) => {


                if (JSON.parse(text36Value) !== null) {

                    this.setState({ bay7Text2Scouting26: JSON.parse(text36Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay7Text3Scouting26').then((text37Value) => {


                if (JSON.parse(text37Value) !== null) {

                    this.setState({ bay7Text3Scouting26: JSON.parse(text37Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay7Text4Scouting26').then((text38Value) => {


                if (JSON.parse(text38Value) !== null) {

                    this.setState({ bay7Text4Scouting26: JSON.parse(text38Value) });

                }

            }).done();
        } catch (error) {

        }

        //

        //BAY 7

        try {
            AsyncStorage.getItem(type1 + "" + 'miniBay8Scouting26').then((text39Value) => {


                if (JSON.parse(text39Value) !== null) {

                    this.setState({ miniBay8Scouting26: JSON.parse(text39Value) });

                }


            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay8Text1Scouting26').then((text40Value) => {

                if (JSON.parse(text40Value) !== null) {

                    this.setState({ bay8Text1Scouting26: JSON.parse(text40Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay8Text2Scouting26').then((text41Value) => {

                if (JSON.parse(text41Value) !== null) {

                    this.setState({ bay8Text2Scouting26: JSON.parse(text41Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay8Text3Scouting26').then((text42Value) => {


                if (JSON.parse(text42Value) !== null) {

                    this.setState({ bay8Text3Scouting26: JSON.parse(text42Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay8Text4Scouting26').then((text43Value) => {


                if (JSON.parse(text43Value) !== null) {

                    this.setState({ bay8Text4Scouting26: JSON.parse(text43Value) });

                }

            }).done();
        } catch (error) {

        }

        //


        //BAY 8

        try {
            AsyncStorage.getItem(type1 + "" + 'miniBay9Scouting26').then((text44Value) => {


                if (JSON.parse(text44Value) !== null) {

                    this.setState({ miniBay9Scouting26: JSON.parse(text44Value) });

                }


            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay9Text1Scouting26').then((text45Value) => {


                if (JSON.parse(text45Value) !== null) {

                    this.setState({ bay9Text1Scouting26: JSON.parse(text45Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay9Text2Scouting26').then((text46Value) => {


                if (JSON.parse(text46Value) !== null) {

                    this.setState({ bay9Text2Scouting26: JSON.parse(text46Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay9Text3Scouting26').then((text47Value) => {


                if (JSON.parse(text47Value) !== null) {

                    this.setState({ bay9Text3Scouting26: JSON.parse(text47Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay9Text4Scouting26').then((text48Value) => {


                if (JSON.parse(text48Value) !== null) {

                    this.setState({ bay9Text4Scouting26: JSON.parse(text48Value) });

                }

            }).done();
        } catch (error) {

        }

        //

        //BAY 9

        try {
            AsyncStorage.getItem(type1 + "" + 'miniBay10Scouting26').then((text49Value) => {


                if (JSON.parse(text49Value) !== null) {

                    this.setState({ miniBay10Scouting26: JSON.parse(text49Value) });

                }


            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay10Text1Scouting26').then((text50Value) => {


                if (JSON.parse(text50Value) !== null) {

                    this.setState({ bay10Text1Scouting26: JSON.parse(text50Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay10Text2Scouting26').then((text51Value) => {


                if (JSON.parse(text51Value) !== null) {

                    this.setState({ bay10Text2Scouting26: JSON.parse(text51Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay10Text3Scouting26').then((text52Value) => {


                if (JSON.parse(text52Value) !== null) {

                    this.setState({ bay10Text3Scouting26: JSON.parse(text52Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay10Text4Scouting26').then((text53Value) => {


                if (JSON.parse(text53Value) !== null) {

                    this.setState({ bay10Text4Scouting26: JSON.parse(text53Value) });

                }

            }).done();
        } catch (error) {

        }

        //

        //BAY 10

        try {
            AsyncStorage.getItem(type1 + "" + 'miniBay11Scouting26').then((text54Value) => {


                if (JSON.parse(text54Value) !== null) {

                    this.setState({ miniBay11Scouting26: JSON.parse(text54Value) });

                }


            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay11Text1Scouting26').then((text55Value) => {


                if (JSON.parse(text55Value) !== null) {

                    this.setState({ bay11Text1Scouting26: JSON.parse(text55Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay11Text2Scouting26').then((text56Value) => {


                if (JSON.parse(text56Value) !== null) {

                    this.setState({ bay11Text2Scouting26: JSON.parse(text56Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay11Text3Scouting26').then((text57Value) => {


                if (JSON.parse(text57Value) !== null) {

                    this.setState({ bay11Text3Scouting26: JSON.parse(text57Value) });

                }

            }).done();
        } catch (error) {

        }

        try {
            AsyncStorage.getItem(type1 + "" + 'bay11Text4Scouting26').then((text58Value) => {

                if (JSON.parse(text58Value) !== null) {

                    this.setState({ bay11Text4Scouting26: JSON.parse(text58Value) });

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


        var h1 = this.state.header1Scouting26;
        var h2 = this.state.header2Scouting26;
        var h3 = this.state.header3Scouting26;
        var h4 = this.state.header4Scouting26;

        var bay1 = this.state.miniBay1Scouting26;
        var bay2 = this.state.miniBay2Scouting26;
        var bay3 = this.state.miniBay3Scouting26;
        var bay4 = this.state.miniBay4Scouting26;
        var bay5 = this.state.miniBay5Scouting26;
        var bay6 = this.state.miniBay6Scouting26;
        var bay7 = this.state.miniBay7Scouting26;
        var bay8 = this.state.miniBay8Scouting26;
        var bay9 = this.state.miniBay9Scouting26;
        var bay10 = this.state.miniBay10Scouting26;
        var bay11 = this.state.miniBay11Scouting26;



        console.log("H1 : " + h1 + " H2 : " + h2 + " H3 : " + h3 + " H4 : " + h4);

        if (h1 !== null && h2 === null && h3 === null && h4 === null || h1 !== "" && h2 === "" && h3 === "" && h4 === "") {

            console.log("Header 1");

            if (bay1 !== '') {

                if (this.state.bay1Text1Scouting26 === null || this.state.bay1Text1Scouting26 === "") {

                    this.setState({ bay1Text1Scouting26: '0' })

                    this.setItem(this.state.Scouting26Type + "" + "bay1Text1Scouting26", '0')

                }
            }

            if (bay2 !== '') {

                if (this.state.bay2Text1Scouting26 === null || this.state.bay2Text1Scouting26 === "") {

                    this.setState({ bay2Text1Scouting26: '0' })

                    this.setItem(this.state.Scouting26Type + "" + "bay2Text1Scouting26", '0')

                }

            }

            if (bay3 !== '') {
                if (this.state.bay3Text1Scouting26 === null || this.state.bay3Text1Scouting26 === "") {

                    this.setState({ bay3Text1Scouting26: '0' })

                    this.setItem(this.state.Scouting26Type + "" + "bay3Text1Scouting26", '0')

                }

            }

            if (bay4 !== '') {

                if (this.state.bay4Text1Scouting26 === null || this.state.bay4Text1Scouting26 === "") {

                    this.setState({ bay4Text1Scouting26: '0' })

                    this.setItem(this.state.Scouting26Type + "" + "bay4Text1Scouting26", '0')

                }

            }

            if (bay5 !== '') {

                if (this.state.bay5Text1Scouting26 === null || this.state.bay5Text1Scouting26 === "") {

                    this.setState({ bay5Text1Scouting26: '0' })

                    this.setItem(this.state.Scouting26Type + "" + "bay5Text1Scouting26", '0')

                }

            }

            if (bay6 !== '') {

                if (this.state.bay6Text1Scouting26 === null || this.state.bay6Text1Scouting26 === "") {

                    this.setState({ bay6Text1Scouting26: '0' })

                    this.setItem(this.state.Scouting26Type + "" + "bay6Text1Scouting26", '0')

                }

            }

            if (bay7 !== '') {

                if (this.state.bay7Text1Scouting26 === null || this.state.bay7Text1Scouting26 === "") {

                    this.setState({ bay7Text1Scouting26: '0' })

                    this.setItem(this.state.Scouting26Type + "" + "bay7Text1Scouting26", '0')

                }

            }

            if (bay8 !== '') {

                if (this.state.bay8Text1Scouting26 === null || this.state.bay8Text1Scouting26 === "") {

                    this.setState({ bay8Text1Scouting26: '0' })

                    this.setItem(this.state.Scouting26Type + "" + "bay8Text1Scouting26", '0')

                }

            }

            if (bay9 !== '') {

                if (this.state.bay9Text1Scouting26 === null || this.state.bay9Text1Scouting26 === "") {

                    this.setState({ bay9Text1Scouting26: '0' })

                    this.setItem(this.state.Scouting26Type + "" + "bay9Text1Scouting26", '0')

                }

            }

            if (bay10 !== '') {

                if (this.state.bay10Text1Scouting26 === null || this.state.bay10Text1Scouting26 === "") {

                    this.setState({ bay10Text1Scouting26: '0' })

                    this.setItem(this.state.Scouting26Type + "" + "bay10Text1Scouting26", '0')

                }

            }

            if (bay11 !== '') {
                if (this.state.bay11Text1Scouting26 === null || this.state.bay11Text1Scouting26 === "") {

                    this.setState({ bay11Text1Scouting26: '0' })

                    this.setItem(this.state.Scouting26Type + "" + "bay11Text1Scouting26", '0')

                }

            }

        } else {

            if (h1 !== null && h2 !== null && h3 === null && h4 === null || h1 !== "" && h2 !== "" && h3 === "" && h4 === "") {

                console.log("Header1 & Header 2");

                if (bay1 !== '') {

                    if (this.state.bay1Text1Scouting26 === null || this.state.bay1Text1Scouting26 === "") {

                        this.setState({ bay1Text1Scouting26: '0' })

                        this.setItem(this.state.Scouting26Type + "" + "bay1Text1Scouting26", '0')

                    }

                }

                if (bay2 !== '') {

                    if (this.state.bay2Text1Scouting26 === null || this.state.bay2Text1Scouting26 === "") {

                        this.setState({ bay2Text1Scouting26: '0' })

                        this.setItem(this.state.Scouting26Type + "" + "bay2Text1Scouting26", '0')

                    }

                }

                if (bay3 !== '') {

                    if (this.state.bay3Text1Scouting26 === null || this.state.bay3Text1Scouting26 === "") {

                        this.setState({ bay3Text1Scouting26: '0' })

                        this.setItem(this.state.Scouting26Type + "" + "bay3Text1Scouting26", '0')

                    }

                }

                if (bay4 !== '') {

                    if (this.state.bay4Text1Scouting26 === null || this.state.bay4Text1Scouting26 === "") {

                        this.setState({ bay4Text1Scouting26: '0' })

                        this.setItem(this.state.Scouting26Type + "" + "bay4Text1Scouting26", '0')

                    }

                }

                if (bay5 !== '') {
                    if (this.state.bay5Text1Scouting26 === null || this.state.bay5Text1Scouting26 === "") {

                        this.setState({ bay5Text1Scouting26: '0' })

                        this.setItem(this.state.Scouting26Type + "" + "bay5Text1Scouting26", '0')

                    }

                }

                if (bay6 !== '') {
                    if (this.state.bay6Text1Scouting26 === null || this.state.bay6Text1Scouting26 === "") {

                        this.setState({ bay6Text1Scouting26: '0' })

                        this.setItem(this.state.Scouting26Type + "" + "bay6Text1Scouting26", '0')

                    }

                }

                if (bay7 !== '') {
                    if (this.state.bay7Text1Scouting26 === null || this.state.bay7Text1Scouting26 === "") {

                        this.setState({ bay7Text1Scouting26: '0' })

                        this.setItem(this.state.Scouting26Type + "" + "bay7Text1Scouting26", '0')

                    }

                }

                if (bay8 !== '') {
                    if (this.state.bay8Text1Scouting26 === null || this.state.bay8Text1Scouting26 === "") {

                        this.setState({ bay8Text1Scouting26: '0' })

                        this.setItem(this.state.Scouting26Type + "" + "bay8Text1Scouting26", '0')

                    }

                }

                if (bay9 !== '') {
                    if (this.state.bay9Text1Scouting26 === null || this.state.bay9Text1Scouting26 === "") {

                        this.setState({ bay9Text1Scouting26: '0' })

                        this.setItem(this.state.Scouting26Type + "" + "bay9Text1Scouting26", '0')

                    }
                }

                if (bay10 !== '') {
                    if (this.state.bay10Text1Scouting26 === null || this.state.bay10Text1Scouting26 === "") {

                        this.setState({ bay10Text1Scouting26: '0' })

                        this.setItem(this.state.Scouting26Type + "" + "bay10Text1Scouting26", '0')

                    }

                }

                if (bay11 !== '') {
                    if (this.state.bay11Text1Scouting26 === null || this.state.bay11Text1Scouting26 === "") {

                        this.setState({ bay11Text1Scouting26: '0' })

                        this.setItem(this.state.Scouting26Type + "" + "bay11Text1Scouting26", '0')

                    }
                }

                if (bay1 !== '') {
                    if (this.state.bay1Text2Scouting26 === null || this.state.bay1Text2Scouting26 === "") {

                        this.setState({ bay1Text2Scouting26: '0' })

                        this.setItem(this.state.Scouting26Type + "" + "bay1Text2Scouting26", '0')

                    }
                }

                if (bay2 !== '') {
                    if (this.state.bay2Text2Scouting26 === null || this.state.bay2Text2Scouting26 === "") {

                        this.setState({ bay2Text2Scouting26: '0' })

                        this.setItem(this.state.Scouting26Type + "" + "bay2Text2Scouting26", '0')

                    }
                }

                if (bay3 !== '') {
                    if (this.state.bay3Text2Scouting26 === null || this.state.bay3Text2Scouting26 === "") {

                        this.setState({ bay3Text2Scouting26: '0' })

                        this.setItem(this.state.Scouting26Type + "" + "bay3Text2Scouting26", '0')

                    }
                }

                if (bay4 !== '') {
                    if (this.state.bay4Text2Scouting26 === null || this.state.bay4Text2Scouting26 === "") {

                        this.setState({ bay4Text2Scouting26: '0' })

                        this.setItem(this.state.Scouting26Type + "" + "bay4Text2Scouting26", '0')

                    }
                }

                if (bay5 !== '') {
                    if (this.state.bay5Text2Scouting26 === null || this.state.bay5Text2Scouting26 === "") {

                        this.setState({ bay5Text2Scouting26: '0' })

                        this.setItem(this.state.Scouting26Type + "" + "bay5Text2Scouting26", '0')

                    }
                }

                if (bay6 !== '') {
                    if (this.state.bay6Text2Scouting26 === null || this.state.bay6Text2Scouting26 === "") {

                        this.setState({ bay6Text2Scouting26: '0' })

                        this.setItem(this.state.Scouting26Type + "" + "bay6Text2Scouting26", '0')

                    }
                }

                if (bay7 !== '') {
                    if (this.state.bay7Text2Scouting26 === null || this.state.bay7Text2Scouting26 === "") {

                        this.setState({ bay7Text2Scouting26: '0' })

                        this.setItem(this.state.Scouting26Type + "" + "bay7Text2Scouting26", '0')

                    }
                }

                if (bay8 !== '') {
                    if (this.state.bay8Text2Scouting26 === null || this.state.bay8Text2Scouting26 === "") {

                        this.setState({ bay8Text2Scouting26: '0' })

                        this.setItem(this.state.Scouting26Type + "" + "bay8Text2Scouting26", '0')

                    }
                }


                if (bay9 !== '') {
                    if (this.state.bay9Text2Scouting26 === null || this.state.bay9Text2Scouting26 === "") {

                        this.setState({ bay9Text2Scouting26: '0' })

                        this.setItem(this.state.Scouting26Type + "" + "bay9Text2Scouting26", '0')

                    }

                }

                if (bay10 !== '') {
                    if (this.state.bay10Text2Scouting26 === null || this.state.bay10Text2Scouting26 === "") {

                        this.setState({ bay10Text2Scouting26: '0' })

                        this.setItem(this.state.Scouting26Type + "" + "bay10Text2Scouting26", '0')

                    }

                }

                if (bay11 !== '') {
                    if (this.state.bay11Text2Scouting26 === null || this.state.bay11Text2Scouting26 === "") {

                        this.setState({ bay11Text2Scouting26: '0' })

                        this.setItem(this.state.Scouting26Type + "" + "bay11Text2Scouting26", '0')

                    }

                }



            } else {

                if (h1 !== null && h2 !== null && h3 !== null && h4 === null || h1 !== "" && h2 !== "" && h3 !== "" && h4 === "") {

                    console.log("Header 1, Header 2 & Header 3");

                    if (bay1 !== '') {
                        if (this.state.bay1Text1Scouting26 === null || this.state.bay1Text1Scouting26 === "") {

                            this.setState({ bay1Text1Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay1Text1Scouting26", '0')

                        }
                    }

                    if (bay2 !== '') {
                        if (this.state.bay2Text1Scouting26 === null || this.state.bay2Text1Scouting26 === "") {

                            this.setState({ bay2Text1Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay2Text1Scouting26", '0')

                        }

                    }

                    if (bay3 !== '') {
                        if (this.state.bay3Text1Scouting26 === null || this.state.bay3Text1Scouting26 === "") {

                            this.setState({ bay3Text1Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay3Text1Scouting26", '0')

                        }
                    }

                    if (bay4 !== '') {
                        if (this.state.bay4Text1Scouting26 === null || this.state.bay4Text1Scouting26 === "") {

                            this.setState({ bay4Text1Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay4Text1Scouting26", '0')

                        }
                    }

                    if (bay5 !== '') {
                        if (this.state.bay5Text1Scouting26 === null || this.state.bay5Text1Scouting26 === "") {

                            this.setState({ bay5Text1Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay5Text1Scouting26", '0')

                        }
                    }

                    if (bay6 !== '') {
                        if (this.state.bay6Text1Scouting26 === null || this.state.bay6Text1Scouting26 === "") {

                            this.setState({ bay6Text1Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay6Text1Scouting26", '0')

                        }

                    }


                    if (bay7 !== '') {
                        if (this.state.bay7Text1Scouting26 === null || this.state.bay7Text1Scouting26 === "") {

                            this.setState({ bay7Text1Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay7Text1Scouting26", '0')

                        }
                    }

                    if (bay8 !== '') {
                        if (this.state.bay8Text1Scouting26 === null || this.state.bay8Text1Scouting26 === "") {

                            this.setState({ bay8Text1Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay8Text1Scouting26", '0')

                        }
                    }

                    if (bay9 !== '') {
                        if (this.state.bay9Text1Scouting26 === null || this.state.bay9Text1Scouting26 === "") {

                            this.setState({ bay9Text1Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay9Text1Scouting26", '0')

                        }
                    }

                    if (bay10 !== '') {
                        if (this.state.bay10Text1Scouting26 === null || this.state.bay10Text1Scouting26 === "") {

                            this.setState({ bay10Text1Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay10Text1Scouting26", '0')

                        }
                    }

                    if (bay11 !== '') {
                        if (this.state.bay11Text1Scouting26 === null || this.state.bay11Text1Scouting26 === "") {

                            this.setState({ bay11Text1Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay11Text1Scouting26", '0')

                        }
                    }

                    if (bay1 !== '') {
                        if (this.state.bay1Text2Scouting26 === null || this.state.bay1Text2Scouting26 === "") {

                            this.setState({ bay1Text2Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay1Text2Scouting26", '0')

                        }
                    }

                    if (bay2 !== '') {
                        if (this.state.bay2Text2Scouting26 === null || this.state.bay2Text2Scouting26 === "") {

                            this.setState({ bay2Text2Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay2Text2Scouting26", '0')

                        }
                    }

                    if (bay3 !== '') {
                        if (this.state.bay3Text2Scouting26 === null || this.state.bay3Text2Scouting26 === "") {

                            this.setState({ bay3Text2Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay3Text2Scouting26", '0')

                        }
                    }

                    if (bay4 !== '') {
                        if (this.state.bay4Text2Scouting26 === null || this.state.bay4Text2Scouting26 === "") {

                            this.setState({ bay4Text2Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay4Text2Scouting26", '0')

                        }
                    }

                    if (bay5 !== '') {
                        if (this.state.bay5Text2Scouting26 === null || this.state.bay5Text2Scouting26 === "") {

                            this.setState({ bay5Text2Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay5Text2Scouting26", '0')

                        }
                    }

                    if (bay6 !== '') {
                        if (this.state.bay6Text2Scouting26 === null || this.state.bay6Text2Scouting26 === "") {

                            this.setState({ bay6Text2Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay6Text2Scouting26", '0')

                        }
                    }

                    if (bay7 !== '') {
                        if (this.state.bay7Text2Scouting26 === null || this.state.bay7Text2Scouting26 === "") {

                            this.setState({ bay7Text2Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay7Text2Scouting26", '0')

                        }
                    }

                    if (bay8 !== '') {
                        if (this.state.bay8Text2Scouting26 === null || this.state.bay8Text2Scouting26 === "") {

                            this.setState({ bay8Text2Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay8Text2Scouting26", '0')

                        }
                    }

                    if (bay9 !== '') {
                        if (this.state.bay9Text2Scouting26 === null || this.state.bay9Text2Scouting26 === "") {

                            this.setState({ bay9Text2Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay9Text2Scouting26", '0')

                        }
                    }

                    if (bay10 !== '') {
                        if (this.state.bay10Text2Scouting26 === null || this.state.bay10Text2Scouting26 === "") {

                            this.setState({ bay10Text2Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay10Text2Scouting26", '0')

                        }
                    }

                    if (bay11 !== '') {
                        if (this.state.bay11Text2Scouting26 === null || this.state.bay11Text2Scouting26 === "") {

                            this.setState({ bay11Text2Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay11Text2Scouting26", '0')

                        }
                    }

                    if (bay1 !== '') {
                        if (this.state.bay1Text3Scouting26 === null || this.state.bay1Text3Scouting26 === "") {

                            this.setState({ bay1Text3Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay1Text3Scouting26", '0')

                        }
                    }

                    if (bay2 !== '') {
                        if (this.state.bay2Text3Scouting26 === null || this.state.bay2Text3Scouting26 === "") {

                            this.setState({ bay2Text3Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay2Text3Scouting26", '0')

                        }
                    }

                    if (bay3 !== '') {
                        if (this.state.bay3Text3Scouting26 === null || this.state.bay3Text3Scouting26 === "") {

                            this.setState({ bay3Text3Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay3Text3Scouting26", '0')

                        }

                    }

                    if (bay4 !== '') {
                        if (this.state.bay4Text3Scouting26 === null || this.state.bay4Text3Scouting26 === "") {

                            this.setState({ bay4Text3Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay4Text3Scouting26", '0')

                        }
                    }

                    if (bay5 !== '') {
                        if (this.state.bay5Text3Scouting26 === null || this.state.bay5Text3Scouting26 === "") {

                            this.setState({ bay5Text3Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay5Text3Scouting26", '0')

                        }
                    }

                    if (bay6 !== '') {
                        if (this.state.bay6Text3Scouting26 === null || this.state.bay6Text3Scouting26 === "") {

                            this.setState({ bay6Text3Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay6Text3Scouting26", '0')

                        }
                    }

                    if (bay7 !== '') {
                        if (this.state.bay7Text3Scouting26 === null || this.state.bay7Text3Scouting26 === "") {

                            this.setState({ bay7Text3Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay7Text3Scouting26", '0')

                        }
                    }

                    if (bay8 !== '') {
                        if (this.state.bay8Text3Scouting26 === null || this.state.bay8Text3Scouting26 === "") {

                            this.setState({ bay8Text3Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay8Text3Scouting26", '0')

                        }
                    }

                    if (bay9 !== '') {
                        if (this.state.bay9Text3Scouting26 === null || this.state.bay9Text3Scouting26 === "") {

                            this.setState({ bay9Text3Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay9Text3Scouting26", '0')

                        }
                    }

                    if (bay10 !== '') {
                        if (this.state.bay10Text3Scouting26 === null || this.state.bay10Text3Scouting26 === "") {

                            this.setState({ bay10Text3Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay10Text3Scouting26", '0')

                        }
                    }

                    if (bay11 !== '') {
                        if (this.state.bay11Text3Scouting26 === null || this.state.bay11Text3Scouting26 === "") {

                            this.setState({ bay11Text3Scouting26: '0' })

                            this.setItem(this.state.Scouting26Type + "" + "bay11Text3Scouting26", '0')

                        }
                    }


                } else {

                    if (h1 !== null && h2 !== null && h3 !== null && h4 !== null || h1 !== "" && h2 !== "" && h3 !== "" && h4 !== "") {

                        console.log("Header 1, Header 2, Header 3 & Header 4");

                        if (bay1 !== '') {
                            if (this.state.bay1Text1Scouting26 === null || this.state.bay1Text1Scouting26 === "") {

                                this.setState({ bay1Text1Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay1Text1Scouting26", '0')

                            }
                        }

                        if (bay2 !== '') {
                            if (this.state.bay2Text1Scouting26 === null || this.state.bay2Text1Scouting26 === "") {

                                this.setState({ bay2Text1Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay2Text1Scouting26", '0')

                            }
                        }

                        if (bay3 !== '') {
                            if (this.state.bay3Text1Scouting26 === null || this.state.bay3Text1Scouting26 === "") {

                                this.setState({ bay3Text1Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay3Text1Scouting26", '0')

                            }
                        }

                        if (bay4 !== '') {
                            if (this.state.bay4Text1Scouting26 === null || this.state.bay4Text1Scouting26 === "") {

                                this.setState({ bay4Text1Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay4Text1Scouting26", '0')

                            }
                        }

                        if (bay5 !== '') {
                            if (this.state.bay5Text1Scouting26 === null || this.state.bay5Text1Scouting26 === "") {

                                this.setState({ bay5Text1Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay5Text1Scouting26", '0')

                            }
                        }

                        if (bay6 !== '') {
                            if (this.state.bay6Text1Scouting26 === null || this.state.bay6Text1Scouting26 === "") {

                                this.setState({ bay6Text1Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay6Text1Scouting26", '0')

                            }
                        }

                        if (bay7 !== '') {
                            if (this.state.bay7Text1Scouting26 === null || this.state.bay7Text1Scouting26 === "") {

                                this.setState({ bay7Text1Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay7Text1Scouting26", '0')

                            }
                        }

                        if (bay8 !== '') {
                            if (this.state.bay8Text1Scouting26 === null || this.state.bay8Text1Scouting26 === "") {

                                this.setState({ bay8Text1Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay8Text1Scouting26", '0')

                            }
                        }

                        if (bay9 !== '') {
                            if (this.state.bay9Text1Scouting26 === null || this.state.bay9Text1Scouting26 === "") {

                                this.setState({ bay9Text1Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay9Text1Scouting26", '0')

                            }
                        }

                        if (bay10 !== '') {
                            if (this.state.bay10Text1Scouting26 === null || this.state.bay10Text1Scouting26 === "") {

                                this.setState({ bay10Text1Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay10Text1Scouting26", '0')

                            }
                        }

                        if (bay11 !== '') {
                            if (this.state.bay11Text1Scouting26 === null || this.state.bay11Text1Scouting26 === "") {

                                this.setState({ bay11Text1Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay11Text1Scouting26", '0')

                            }
                        }

                        if (bay1 !== '') {
                            if (this.state.bay1Text2Scouting26 === null || this.state.bay1Text2Scouting26 === "") {

                                this.setState({ bay1Text2Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay1Text2Scouting26", '0')

                            }
                        }

                        if (bay2 !== '') {
                            if (this.state.bay2Text2Scouting26 === null || this.state.bay2Text2Scouting26 === "") {

                                this.setState({ bay2Text2Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay2Text2Scouting26", '0')

                            }
                        }

                        if (bay3 !== '') {
                            if (this.state.bay3Text2Scouting26 === null || this.state.bay3Text2Scouting26 === "") {

                                this.setState({ bay3Text2Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay3Text2Scouting26", '0')

                            }
                        }

                        if (bay4 !== '') {
                            if (this.state.bay4Text2Scouting26 === null || this.state.bay4Text2Scouting26 === "") {

                                this.setState({ bay4Text2Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay4Text2Scouting26", '0')

                            }
                        }

                        if (bay5 !== '') {
                            if (this.state.bay5Text2Scouting26 === null || this.state.bay5Text2Scouting26 === "") {

                                this.setState({ bay5Text2Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay5Text2Scouting26", '0')

                            }
                        }

                        if (bay6 !== '') {
                            if (this.state.bay6Text2Scouting26 === null || this.state.bay6Text2Scouting26 === "") {

                                this.setState({ bay6Text2Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay6Text2Scouting26", '0')

                            }
                        }

                        if (bay7 !== '') {
                            if (this.state.bay7Text2Scouting26 === null || this.state.bay7Text2Scouting26 === "") {

                                this.setState({ bay7Text2Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay7Text2Scouting26", '0')

                            }
                        }

                        if (bay8 !== '') {
                            if (this.state.bay8Text2Scouting26 === null || this.state.bay8Text2Scouting26 === "") {

                                this.setState({ bay8Text2Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay8Text2Scouting26", '0')

                            }
                        }

                        if (bay9 !== '') {
                            if (this.state.bay9Text2Scouting26 === null || this.state.bay9Text2Scouting26 === "") {

                                this.setState({ bay9Text2Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay9Text2Scouting26", '0')

                            }
                        }

                        if (bay10 !== '') {
                            if (this.state.bay10Text2Scouting26 === null || this.state.bay10Text2Scouting26 === "") {

                                this.setState({ bay10Text2Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay10Text2Scouting26", '0')

                            }
                        }

                        if (bay11 !== '') {
                            if (this.state.bay11Text2Scouting26 === null || this.state.bay11Text2Scouting26 === "") {

                                this.setState({ bay11Text2Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay11Text2Scouting26", '0')

                            }
                        }

                        if (bay1 !== '') {
                            if (this.state.bay1Text3Scouting26 === null || this.state.bay1Text3Scouting26 === "") {

                                this.setState({ bay1Text3Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay1Text3Scouting26", '0')

                            }
                        }

                        if (bay2 !== '') {
                            if (this.state.bay2Text3Scouting26 === null || this.state.bay2Text3Scouting26 === "") {

                                this.setState({ bay2Text3Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay2Text3Scouting26", '0')

                            }
                        }

                        if (bay3 !== '') {
                            if (this.state.bay3Text3Scouting26 === null || this.state.bay3Text3Scouting26 === "") {

                                this.setState({ bay3Text3Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay3Text3Scouting26", '0')

                            }
                        }

                        if (bay4 !== '') {
                            if (this.state.bay4Text3Scouting26 === null || this.state.bay4Text3Scouting26 === "") {

                                this.setState({ bay4Text3Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay4Text3Scouting26", '0')

                            }
                        }

                        if (bay5 !== '') {
                            if (this.state.bay5Text3Scouting26 === null || this.state.bay5Text3Scouting26 === "") {

                                this.setState({ bay5Text3Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay5Text3Scouting26", '0')

                            }
                        }

                        if (bay6 !== '') {
                            if (this.state.bay6Text3Scouting26 === null || this.state.bay6Text3Scouting26 === "") {

                                this.setState({ bay6Text3Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay6Text3Scouting26", '0')

                            }
                        }

                        if (bay7 !== '') {
                            if (this.state.bay7Text3Scouting26 === null || this.state.bay7Text3Scouting26 === "") {

                                this.setState({ bay7Text3Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay7Text3Scouting26", '0')

                            }
                        }

                        if (bay8 !== '') {
                            if (this.state.bay8Text3Scouting26 === null || this.state.bay8Text3Scouting26 === "") {

                                this.setState({ bay8Text3Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay8Text3Scouting26", '0')

                            }
                        }

                        if (bay9 !== '') {
                            if (this.state.bay9Text3Scouting26 === null || this.state.bay9Text3Scouting26 === "") {

                                this.setState({ bay9Text3Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay9Text3Scouting26", '0')

                            }
                        }

                        if (bay10 !== '') {
                            if (this.state.bay10Text3Scouting26 === null || this.state.bay10Text3Scouting26 === "") {

                                this.setState({ bay10Text3Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay10Text3Scouting26", '0')

                            }
                        }

                        if (bay11 !== '') {
                            if (this.state.bay11Text3Scouting26 === null || this.state.bay11Text3Scouting26 === "") {

                                this.setState({ bay11Text3Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay11Text3Scouting26", '0')

                            }
                        }

                        if (bay1 !== '') {
                            if (this.state.bay1Text4Scouting26 === null || this.state.bay1Text4Scouting26 === "") {

                                this.setState({ bay1Text4Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay1Text4Scouting26", '0')

                            }
                        }

                        if (bay2 !== '') {
                            if (this.state.bay2Text4Scouting26 === null || this.state.bay2Text4Scouting26 === "") {

                                this.setState({ bay2Text4Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay2Text4Scouting26", '0')

                            }
                        }

                        if (bay2 !== '') {
                            if (this.state.bay3Text4Scouting26 === null || this.state.bay3Text4Scouting26 === "") {

                                this.setState({ bay3Text4Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay3Text4Scouting26", '0')

                            }
                        }

                        if (bay4 !== '') {
                            if (this.state.bay4Text4Scouting26 === null || this.state.bay4Text4Scouting26 === "") {

                                this.setState({ bay4Text4Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay4Text4Scouting26", '0')

                            }
                        }

                        if (bay5 !== '') {
                            if (this.state.bay5Text4Scouting26 === null || this.state.bay5Text4Scouting26 === "") {

                                this.setState({ bay5Text4Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay5Text4Scouting26", '0')

                            }
                        }

                        if (bay6 !== '') {
                            if (this.state.bay6Text4Scouting26 === null || this.state.bay6Text4Scouting26 === "") {

                                this.setState({ bay6Text4Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay6Text4Scouting26", '0')

                            }
                        }

                        if (bay7 !== '') {
                            if (this.state.bay7Text4Scouting26 === null || this.state.bay7Text4Scouting26 === "") {

                                this.setState({ bay7Text4Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay7Text4Scouting26", '0')

                            }
                        }

                        if (bay8 !== '') {
                            if (this.state.bay8Text4Scouting26 === null || this.state.bay8Text4Scouting26 === "") {

                                this.setState({ bay8Text4Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay8Text4Scouting26", '0')

                            }
                        }

                        if (bay9 !== '') {
                            if (this.state.bay9Text4Scouting26 === null || this.state.bay9Text4Scouting26 === "") {

                                this.setState({ bay9Text4Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay9Text4Scouting26", '0')

                            }
                        }

                        if (bay10 !== '') {
                            if (this.state.bay10Text4Scouting26 === null || this.state.bay10Text4Scouting26 === "") {

                                this.setState({ bay10Text4Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay10Text4Scouting26", '0')

                            }
                        }

                        if (bay11 !== '') {
                            if (this.state.bay11Text4Scouting26 === null || this.state.bay11Text4Scouting26 === "") {

                                this.setState({ bay11Text4Scouting26: '0' })

                                this.setItem(this.state.Scouting26Type + "" + "bay11Text4Scouting26", '0')

                            }
                        }

                    } else {


                    }

                }

            }

        }


    }

    
    checkRowNumber = () => {

        var that = this;

        const { rowNumberScouting26 } = this.state;

        if(rowNumberScouting26){

            this.handleNextButtonPress();

        }else{

            alert('Please enter row number')
        }

    }


    handleNextButtonPress = () => {

        this.setItem(this.state.scoutingType + "" + "Scouting26Yes", 'Yes')

        if (this.state.miniBay1Scouting26 !== null) {

            let data = {
                weekNumber: this.state.weekNum,
                scouterName: this.state.scoutersName,
                siteName: this.state.siteName,
                location: this.state.location,
                scoutType: this.state.scoutingType,
                rowNumber: this.state.rowNumberScouting26,
                header1: this.state.header1Scouting26,
                header2: this.state.header2Scouting26,
                header3: this.state.header3Scouting26,
                header4: this.state.header4Scouting26,
                miniBay: this.state.miniBay1Scouting26,
                text1: this.state.bay1Text1Scouting26,
                text2: this.state.bay1Text2Scouting26,
                text3: this.state.bay1Text3Scouting26,
                text4: this.state.bay1Text4Scouting26,


            }


            db.addScoutingDetails(data).then((result) => {

                console.log(result);

                if (this.state.miniBay2Scouting26 !== '' && this.state.miniBay2Scouting26 !== null) {

                    this.saveScoutingDetails2();

                } else {

                    this.props.navigation.navigate('Scouting27', { startNumber2: this.state.rowNumberScouting26, inter2: this.state.intervals })

                }


            })
        } else {

            console.log("No Data");
        }

    }

    saveScoutingDetails2 = () => {


        if (this.state.miniBay2Scouting26 !== null) {

            let data2 = {
                weekNumber: this.state.weekNum,
                scouterName: this.state.scoutersName,
                siteName: this.state.siteName,
                location: this.state.location,
                scoutType: this.state.scoutingType,
                rowNumber: this.state.rowNumberScouting26,
                header1: this.state.header1Scouting26,
                header2: this.state.header2Scouting26,
                header3: this.state.header3Scouting26,
                header4: this.state.header4Scouting26,
                miniBay: this.state.miniBay2Scouting26,
                text1: this.state.bay2Text1Scouting26,
                text2: this.state.bay2Text2Scouting26,
                text3: this.state.bay2Text3Scouting26,
                text4: this.state.bay2Text4Scouting26,


            }


            db.addScoutingDetails(data2).then((result) => {

                console.log(result);

                if (this.state.miniBay3Scouting26 !== '' && this.state.miniBay3Scouting26 !== null) {

                    this.saveScoutingDetails3();

                } else {

                    this.props.navigation.navigate('Scouting27', { startNumber2: this.state.rowNumberScouting26, inter2: this.state.intervals })

                }


            })
        } else {

            console.log("No Data");
        }


    }

    saveScoutingDetails3 = () => {

        if (this.state.miniBay3Scouting26 !== null) {

            let data3 = {
                weekNumber: this.state.weekNum,
                scouterName: this.state.scoutersName,
                siteName: this.state.siteName,
                location: this.state.location,
                scoutType: this.state.scoutingType,
                rowNumber: this.state.rowNumberScouting26,
                header1: this.state.header1Scouting26,
                header2: this.state.header2Scouting26,
                header3: this.state.header3Scouting26,
                header4: this.state.header4Scouting26,
                miniBay: this.state.miniBay3Scouting26,
                text1: this.state.bay3Text1Scouting26,
                text2: this.state.bay3Text2Scouting26,
                text3: this.state.bay3Text3Scouting26,
                text4: this.state.bay3Text4Scouting26,


            }


            db.addScoutingDetails(data3).then((result) => {

                console.log(result);

                if (this.state.miniBay4Scouting26 !== '' && this.state.miniBay4Scouting26 !== null) {

                    this.saveScoutingDetails4();

                } else {

                    this.props.navigation.navigate('Scouting27', { startNumber2: this.state.rowNumberScouting26, inter2: this.state.intervals })

                }


            })

        } else {

            console.log("No Data");
        }


    }

    saveScoutingDetails4 = () => {

        if (this.state.miniBay4Scouting26 !== null) {

            let data4 = {
                weekNumber: this.state.weekNum,
                scouterName: this.state.scoutersName,
                siteName: this.state.siteName,
                location: this.state.location,
                scoutType: this.state.scoutingType,
                rowNumber: this.state.rowNumberScouting26,
                header1: this.state.header1Scouting26,
                header2: this.state.header2Scouting26,
                header3: this.state.header3Scouting26,
                header4: this.state.header4Scouting26,
                miniBay: this.state.miniBay4Scouting26,
                text1: this.state.bay4Text1Scouting26,
                text2: this.state.bay4Text2Scouting26,
                text3: this.state.bay4Text3Scouting26,
                text4: this.state.bay4Text4Scouting26,


            }


            db.addScoutingDetails(data4).then((result) => {

                console.log(result);

                if (this.state.miniBay5Scouting26 !== '' && this.state.miniBay5Scouting26 !== null) {

                    this.saveScoutingDetails5();

                } else {

                    this.props.navigation.navigate('Scouting27', { startNumber2: this.state.rowNumberScouting26, inter2: this.state.intervals })

                }


            })

        } else {

            console.log("No Data");
        }

    }

    saveScoutingDetails5 = () => {

        if (this.state.miniBay5Scouting26 !== null) {

            let data5 = {
                weekNumber: this.state.weekNum,
                scouterName: this.state.scoutersName,
                siteName: this.state.siteName,
                location: this.state.location,
                scoutType: this.state.scoutingType,
                rowNumber: this.state.rowNumberScouting26,
                header1: this.state.header1Scouting26,
                header2: this.state.header2Scouting26,
                header3: this.state.header3Scouting26,
                header4: this.state.header4Scouting26,
                miniBay: this.state.miniBay5Scouting26,
                text1: this.state.bay5Text1Scouting26,
                text2: this.state.bay5Text2Scouting26,
                text3: this.state.bay5Text3Scouting26,
                text4: this.state.bay5Text4Scouting26,


            }


            db.addScoutingDetails(data5).then((result) => {

                console.log(result);

                if (this.state.miniBay6Scouting26 !== '' && this.state.miniBay6Scouting26 !== null) {

                    this.saveScoutingDetails6();

                } else {

                    this.props.navigation.navigate('Scouting27', { startNumber2: this.state.rowNumberScouting26, inter2: this.state.intervals })

                }


            })

        } else {

            console.log("No Data");
        }


    }

    saveScoutingDetails6 = () => {

        if (this.state.miniBay6Scouting26 !== null) {

            let data6 = {
                weekNumber: this.state.weekNum,
                scouterName: this.state.scoutersName,
                siteName: this.state.siteName,
                location: this.state.location,
                scoutType: this.state.scoutingType,
                rowNumber: this.state.rowNumberScouting26,
                header1: this.state.header1Scouting26,
                header2: this.state.header2Scouting26,
                header3: this.state.header3Scouting26,
                header4: this.state.header4Scouting26,
                miniBay: this.state.miniBay6Scouting26,
                text1: this.state.bay6Text1Scouting26,
                text2: this.state.bay6Text2Scouting26,
                text3: this.state.bay6Text3Scouting26,
                text4: this.state.bay6Text4Scouting26,


            }


            db.addScoutingDetails(data6).then((result) => {

                console.log(result);

                if (this.state.miniBay7Scouting26 !== '' && this.state.miniBay7Scouting26 !== null) {

                    this.saveScoutingDetails7();

                } else {

                    this.props.navigation.navigate('Scouting27', { startNumber2: this.state.rowNumberScouting26, inter2: this.state.intervals })

                }


            })

        } else {

            console.log("No Data");
        }

    }


    saveScoutingDetails7 = () => {

        if (this.state.miniBay7Scouting26 !== null) {

            let data7 = {
                weekNumber: this.state.weekNum,
                scouterName: this.state.scoutersName,
                siteName: this.state.siteName,
                location: this.state.location,
                scoutType: this.state.scoutingType,
                rowNumber: this.state.rowNumberScouting26,
                header1: this.state.header1Scouting26,
                header2: this.state.header2Scouting26,
                header3: this.state.header3Scouting26,
                header4: this.state.header4Scouting26,
                miniBay: this.state.miniBay7Scouting26,
                text1: this.state.bay7Text1Scouting26,
                text2: this.state.bay7Text2Scouting26,
                text3: this.state.bay7Text3Scouting26,
                text4: this.state.bay7Text4Scouting26,


            }


            db.addScoutingDetails(data7).then((result) => {

                console.log(result);

                if (this.state.miniBay8Scouting26 !== '' && this.state.miniBay8Scouting26 !== null) {

                    this.saveScoutingDetails8();

                } else {

                    this.props.navigation.navigate('Scouting27', { startNumber2: this.state.rowNumberScouting26, inter2: this.state.intervals })

                }


            })

        } else {

            console.log("No Data");
        }

    }

    saveScoutingDetails8 = () => {

        if (this.state.miniBay8Scouting26 !== null) {

            let data8 = {
                weekNumber: this.state.weekNum,
                scouterName: this.state.scoutersName,
                siteName: this.state.siteName,
                location: this.state.location,
                scoutType: this.state.scoutingType,
                rowNumber: this.state.rowNumberScouting26,
                header1: this.state.header1Scouting26,
                header2: this.state.header2Scouting26,
                header3: this.state.header3Scouting26,
                header4: this.state.header4Scouting26,
                miniBay: this.state.miniBay8Scouting26,
                text1: this.state.bay8Text1Scouting26,
                text2: this.state.bay8Text2Scouting26,
                text3: this.state.bay8Text3Scouting26,
                text4: this.state.bay8Text4Scouting26,


            }


            db.addScoutingDetails(data8).then((result) => {

                console.log(result);

                if (this.state.miniBay9Scouting26 !== '' && this.state.miniBay9Scouting26 !== null) {

                    this.saveScoutingDetails9();

                } else {

                    this.props.navigation.navigate('Scouting27', { startNumber2: this.state.rowNumberScouting26, inter2: this.state.intervals })

                }


            })

        } else {

            console.log("No Data");
        }

    }

    saveScoutingDetails9 = () => {

        if (this.state.miniBay9Scouting26 !== null) {

            let data9 = {
                weekNumber: this.state.weekNum,
                scouterName: this.state.scoutersName,
                siteName: this.state.siteName,
                location: this.state.location,
                scoutType: this.state.scoutingType,
                rowNumber: this.state.rowNumberScouting26,
                header1: this.state.header1Scouting26,
                header2: this.state.header2Scouting26,
                header3: this.state.header3Scouting26,
                header4: this.state.header4Scouting26,
                miniBay: this.state.miniBay9Scouting26,
                text1: this.state.bay9Text1Scouting26,
                text2: this.state.bay9Text2Scouting26,
                text3: this.state.bay9Text3Scouting26,
                text4: this.state.bay9Text4Scouting26,


            }


            db.addScoutingDetails(data9).then((result) => {

                console.log(result);

                if (this.state.miniBay10Scouting26 !== '' && this.state.miniBay10Scouting26 !== null) {

                    this.saveScoutingDetails10();

                } else {

                    this.props.navigation.navigate('Scouting27', { startNumber2: this.state.rowNumberScouting26, inter2: this.state.intervals })

                }


            })

        } else {

            console.log("No Data");

        }

    }

    saveScoutingDetails10 = () => {

        if (this.state.miniBay10Scouting26 !== null) {

            let data10 = {
                weekNumber: this.state.weekNum,
                scouterName: this.state.scoutersName,
                siteName: this.state.siteName,
                location: this.state.location,
                scoutType: this.state.scoutingType,
                rowNumber: this.state.rowNumberScouting26,
                header1: this.state.header1Scouting26,
                header2: this.state.header2Scouting26,
                header3: this.state.header3Scouting26,
                header4: this.state.header4Scouting26,
                miniBay: this.state.miniBay10Scouting26,
                text1: this.state.bay10Text1Scouting26,
                text2: this.state.bay10Text2Scouting26,
                text3: this.state.bay10Text3Scouting26,
                text4: this.state.bay10Text4Scouting26,


            }


            db.addScoutingDetails(data10).then((result) => {

                console.log(result);

                if (this.state.miniBay11Scouting26 !== '' && this.state.miniBay11Scouting26 !== null) {

                    this.saveScoutingDetails11();

                } else {

                    this.props.navigation.navigate('Scouting27', { startNumber2: this.state.rowNumberScouting26, inter2: this.state.intervals })

                }


            })

        } else {

            console.log("No Data");

        }

    }

    saveScoutingDetails11 = () => {

        if (this.state.miniBay11Scouting26 !== null) {

            let data11 = {
                weekNumber: this.state.weekNum,
                scouterName: this.state.scoutersName,
                siteName: this.state.siteName,
                location: this.state.location,
                scoutType: this.state.scoutingType,
                rowNumber: this.state.rowNumberScouting26,
                header1: this.state.header1Scouting26,
                header2: this.state.header2Scouting26,
                header3: this.state.header3Scouting26,
                header4: this.state.header4Scouting26,
                miniBay: this.state.miniBay11Scouting26,
                text1: this.state.bay11Text1Scouting26,
                text2: this.state.bay11Text2Scouting26,
                text3: this.state.bay11Text3Scouting26,
                text4: this.state.bay11Text4Scouting26,


            }


            db.addScoutingDetails(data11).then((result) => {

                console.log(result);

                this.props.navigation.navigate('Scouting27', { startNumber2: this.state.rowNumberScouting26, inter2: this.state.intervals })


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

            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? "padding" : "height"}
            style={styles.container}>

            <TouchableWithoutFeedback>

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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'rowNumberScouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.rowNumberScouting26}

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
                                        <Text style={styles.textLineItemGreen}>{this.state.header1Scouting26}</Text>
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotals}>
                                        <Text style={styles.textLineItemGreen}>{this.state.header2Scouting26}</Text>
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotals}>
                                        <Text style={styles.textLineItemGreen}>{this.state.header3Scouting26}</Text>
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                    <View style={styles.tableColumnTotals}>
                                        <Text style={styles.textLineItemGreen}>{this.state.header4Scouting26}</Text>
                                    </View>

                                </View>

                                <View style={{
                                    borderTopColor: '#F1EEEC',
                                    borderTopWidth: 1,
                                }}></View>


<View style={styles.tableRow}>
                                    <View style={styles.tableColumnClockInOutTimes}>
                                        <Text style={styles.textLineItemGreen}>{this.state.miniBay1Scouting26}</Text>
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                   <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay1Text1Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay1Text1Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay1Text2Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay1Text2Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay1Text3Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay1Text3Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay1Text4Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay1Text4Scouting26}
                                        />
                                    </View>

                                </View>




                                <View style={{
                                    borderTopColor: '#F1EEEC',
                                    borderTopWidth: 1,
                                }}></View>

                                <View style={styles.tableRow}>
                                    <View style={styles.tableColumnClockInOutTimes}>
                                        <Text style={styles.textLineItemGreen}>{this.state.miniBay2Scouting26}</Text>
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                   <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay2Text1Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay2Text1Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay2Text2Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay2Text2Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay2Text3Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay2Text3Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay2Text4Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay2Text4Scouting26}
                                        />
                                    </View>

                                </View>



                                <View style={{
                                    borderTopColor: '#F1EEEC',
                                    borderTopWidth: 1,
                                }}></View>

                                <View style={styles.tableRow}>
                                    <View style={styles.tableColumnClockInOutTimes}>
                                        <Text style={styles.textLineItemGreen}>{this.state.miniBay3Scouting26}</Text>
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                   <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay3Text1Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay3Text1Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay3Text2Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay3Text2Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay3Text3Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay3Text3Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay3Text4Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay3Text4Scouting26}
                                        />
                                    </View>

                                </View>





                                <View style={{
                                    borderTopColor: '#F1EEEC',
                                    borderTopWidth: 1,
                                }}></View>

                                <View style={styles.tableRow}>
                                    <View style={styles.tableColumnClockInOutTimes}>
                                        <Text style={styles.textLineItemGreen}>{this.state.miniBay4Scouting26}</Text>
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                   <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay4Text1Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay4Text1Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay4Text2Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay4Text2Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay4Text3Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay4Text3Scouting26}

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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay4Text4Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay4Text4Scouting26}
                                        />
                                    </View>

                                </View>




                                <View style={{
                                    borderTopColor: '#F1EEEC',
                                    borderTopWidth: 1,
                                }}></View>

                                <View style={styles.tableRow}>
                                    <View style={styles.tableColumnClockInOutTimes}>
                                        <Text style={styles.textLineItemGreen}>{this.state.miniBay5Scouting26}</Text>
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                   <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay5Text1Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay5Text1Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay5Text2Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay5Text2Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay5Text3Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay5Text3Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay5Text4Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay5Text4Scouting26}
                                        />
                                    </View>

                                </View>




                                <View style={{
                                    borderTopColor: '#F1EEEC',
                                    borderTopWidth: 1,
                                }}></View>

                                <View style={styles.tableRow}>
                                    <View style={styles.tableColumnClockInOutTimes}>
                                        <Text style={styles.textLineItemGreen}>{this.state.miniBay6Scouting26}</Text>
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                   <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay6Text1Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay6Text1Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay6Text2Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay6Text2Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay6Text3Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay6Text3Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay6Text4Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay6Text4Scouting26}
                                        />
                                    </View>

                                </View>





                                <View style={{
                                    borderTopColor: '#F1EEEC',
                                    borderTopWidth: 1,
                                }}></View>

                                <View style={styles.tableRow}>
                                    <View style={styles.tableColumnClockInOutTimes}>
                                        <Text style={styles.textLineItemGreen}>{this.state.miniBay7Scouting26}</Text>
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                   <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay7Text1Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay7Text1Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay7Text2Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay7Text2Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay7Text3Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay7Text3Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay7Text4Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay7Text4Scouting26}
                                        />
                                    </View>

                                </View>






                                <View style={{
                                    borderTopColor: '#F1EEEC',
                                    borderTopWidth: 1,
                                }}></View>

                                <View style={styles.tableRow}>
                                    <View style={styles.tableColumnClockInOutTimes}>
                                        <Text style={styles.textLineItemGreen}>{this.state.miniBay8Scouting26}</Text>
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                   <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay8Text1Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay8Text1Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay8Text2Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay8Text2Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay8Text3Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay8Text3Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay8Text4Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay8Text4Scouting26}
                                        />
                                    </View>

                                </View>




                                <View style={{
                                    borderTopColor: '#F1EEEC',
                                    borderTopWidth: 1,
                                }}></View>

                                <View style={styles.tableRow}>
                                    <View style={styles.tableColumnClockInOutTimes}>
                                        <Text style={styles.textLineItemGreen}>{this.state.miniBay9Scouting26}</Text>
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                   <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay9Text1Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay9Text1Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay9Text2Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay9Text2Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay9Text3Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay9Text3Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay9Text4Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay9Text4Scouting26}
                                        />
                                    </View>

                                </View>





                                <View style={{
                                    borderTopColor: '#F1EEEC',
                                    borderTopWidth: 1,
                                }}></View>

                                <View style={styles.tableRow}>
                                    <View style={styles.tableColumnClockInOutTimes}>
                                        <Text style={styles.textLineItemGreen}>{this.state.miniBay10Scouting26}</Text>
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                   <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay10Text1Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay10Text1Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay10Text2Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay10Text2Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay10Text3Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay10Text3Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay10Text4Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay10Text4Scouting26}
                                        />
                                    </View>

                                </View>


                                <View style={{
                                    borderTopColor: '#F1EEEC',
                                    borderTopWidth: 1,
                                }}></View>

                                <View style={styles.tableRow}>
                                    <View style={styles.tableColumnClockInOutTimes}>
                                        <Text style={styles.textLineItemGreen}>{this.state.miniBay11Scouting26}</Text>
                                    </View>

                                    <View style={{
                                        borderRightColor: '#F1EEEC',
                                        borderRightWidth: 1,
                                    }}></View>

                                   <View style={styles.tableColumnTotalsEdit}>
                                        <TextInput style={styles.textInputStyle}
                                            multiline={false}
                                            autoCorrect={false}
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay11Text1Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay11Text1Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay11Text2Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay11Text2Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay11Text3Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay11Text3Scouting26}
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
                                            returnKeyType={'done'}
                                            enablesReturnKeyAutomatically={true}
                                            editable={true}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.updateTextInput(text, 'bay11Text4Scouting26')}
                                            blurOnSubmit={true}
                                            value={this.state.bay11Text4Scouting26}
                                        />
                                    </View>

                                </View>
                            </View>

                            <View style={styles.marginBetweenTop}></View>
                            <TouchableOpacity  onPress={() => this.handleEmptyCells()}>
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
                                
                                <View style={styles.marginContainerBottom}></View>

                            </View>

                        </View>

                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: '#ffffff'
    },

    textLineItem: {

        color: "#000000",
    },

    copyText: {

        alignSelf: 'center',
        fontSize: 18,
        color: '#ff0000',

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
        width: 40,
        height: 60,
        textAlign: 'center',
        backgroundColor: "transparent",
        


    },

    marginContainerBottom: {

        marginBottom: 95,

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

    marginBetweenTextTop: {

        marginTop: 10,

    },

    marginTopStyle: {

        marginTop: 10,

    },

    alignButton : {

        alignItems: 'center',


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