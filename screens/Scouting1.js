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
    TextInput

} from 'react-native';

import DropDownPicker from '@nectr-rn/react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler';
var width = Dimensions.get('window').width / 2.5; //full width
import AsyncStorage from '@react-native-community/async-storage';


var intervalsOffline, startRowsOffline



export default class Scouting1 extends Component {

    constructor(props) {
        super(props);

        this.state = {

            rowNumber: '',
            intervals: '',
            startingRowNumber: '',
            scoutingType: '',
            header1: '',
            header2: '',
            header3: '',
            header4: '',




        };


    }


    componentDidMount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);


        //Get data from previous page

        if (this.props.route.params.startNumber !== undefined) {
            var number = this.props.route.params.startNumber;
            startRowsOffline = number;
 
            console.log("<<<<<<<<<<< :" + startRowsOffline);


        } else {

        }


        if (this.props.route.params.inter !== undefined) {
            var inter1 = this.props.route.params.inter;
            intervalsOffline = inter1

            console.log("<<<<<<<<<<< :" + intervalsOffline);


        } else {

        }

        //END


         //Get async data from SETTINGS page

         try {
            AsyncStorage.getItem("scoutType").then((text1Value) => {
                var opt1 = JSON.parse(text1Value);

                try {

                    console.log();
                    AsyncStorage.getItem("intervals"+opt1).then((text2Value) => {
                        var opt2 = JSON.parse(text2Value);
                        this.setState({ intervals: opt2 });
        
                    }).done();
                } catch (error) {
        
                }

                try {

                    AsyncStorage.getItem("column1"+opt1).then((text3Value) => {
                        var opt3 = JSON.parse(text3Value);
                        this.setState({ header1: opt3 });
        
                    }).done();
                } catch (error) {
        
                }


                try {

                    AsyncStorage.getItem("column2"+opt1).then((text4Value) => {
                        var opt4 = JSON.parse(text4Value);
                        this.setState({ header2: opt4 });
        
                    }).done();
                } catch (error) {
        
                }

                try {

                    AsyncStorage.getItem("column3"+opt1).then((text5Value) => {
                        var opt5 = JSON.parse(text5Value);
                        this.setState({ header3: opt5 });
        
                    }).done();
                } catch (error) {
        
                }

                try {

                    AsyncStorage.getItem("column4"+opt1).then((text6Value) => {
                        var opt6 = JSON.parse(text6Value);
                        this.setState({ header4: opt6 });
        
                    }).done();
                } catch (error) {
        
                }

            }).done();
        } catch (error) {

        }

       
        //END



        //Calculations

    
        var actualRowNumber = parseInt(startRowsOffline) + parseInt(intervalsOffline);

        console.log("Next Number is : " +  actualRowNumber);

        this.setState({rowNumber: actualRowNumber})

    }

    componentWillUnmount() {

        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
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
        this.setItem(field, text)
        const state = this.state
        state[field] = text;
        this.setState(state);
    }

    handleNextButtonPress = () => {

        this.props.navigation.navigate('Scouting2', { startNumber2: this.state.rowNumber, inter2: this.state.intervals})
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
                                        onChangeText={(text) => this.updateTextInput(text, 'rowNumber')}
                                        blurOnSubmit={true}
                                        value={this.state.rowNumber.toString()}

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
                                    <Text style={styles.textLineItemGreen}>{this.state.header1}</Text>
                                </View>

                                <View style={{
                                    borderRightColor: '#F1EEEC',
                                    borderRightWidth: 1,
                                }}></View>

                                <View style={styles.tableColumnTotals}>
                                    <Text style={styles.textLineItemGreen}>{this.state.header2}</Text>
                                </View>

                                <View style={{
                                    borderRightColor: '#F1EEEC',
                                    borderRightWidth: 1,
                                }}></View>

                                <View style={styles.tableColumnTotals}>
                                    <Text style={styles.textLineItemGreen}>{this.state.header3}</Text>
                                </View>

                                <View style={{
                                    borderRightColor: '#F1EEEC',
                                    borderRightWidth: 1,
                                }}></View>

                                <View style={styles.tableColumnTotals}>
                                    <Text style={styles.textLineItemGreen}>{this.state.header4}</Text>
                                </View>

                            </View>

                            <View style={{
                                borderTopColor: '#F1EEEC',
                                borderTopWidth: 1,
                            }}></View>


                            <View style={styles.tableRow}>
                                <View style={styles.tableColumnClockInOutTimes}>
                                    <Text style={styles.textLineItemGreen}>A</Text>
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
                                    />
                                </View>

                            </View>




                            <View style={{
                                borderTopColor: '#F1EEEC',
                                borderTopWidth: 1,
                            }}></View>

                            <View style={styles.tableRow}>
                                <View style={styles.tableColumnClockInOutTimes}>
                                    <Text style={styles.textLineItemGreen}>B-D</Text>
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
                                    />
                                </View>

                            </View>



                            <View style={{
                                borderTopColor: '#F1EEEC',
                                borderTopWidth: 1,
                            }}></View>

                            <View style={styles.tableRow}>
                                <View style={styles.tableColumnClockInOutTimes}>
                                    <Text style={styles.textLineItemGreen}>E-G</Text>
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
                                    />
                                </View>

                            </View>





                            <View style={{
                                borderTopColor: '#F1EEEC',
                                borderTopWidth: 1,
                            }}></View>

                            <View style={styles.tableRow}>
                                <View style={styles.tableColumnClockInOutTimes}>
                                    <Text style={styles.textLineItemGreen}>H-J</Text>
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
                                    />
                                </View>

                            </View>




                            <View style={{
                                borderTopColor: '#F1EEEC',
                                borderTopWidth: 1,
                            }}></View>

                            <View style={styles.tableRow}>
                                <View style={styles.tableColumnClockInOutTimes}>
                                    <Text style={styles.textLineItemGreen}>K-M</Text>
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
                                    />
                                </View>

                            </View>




                            <View style={{
                                borderTopColor: '#F1EEEC',
                                borderTopWidth: 1,
                            }}></View>

                            <View style={styles.tableRow}>
                                <View style={styles.tableColumnClockInOutTimes}>
                                    <Text style={styles.textLineItemGreen}>N-P</Text>
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
                                    />
                                </View>

                            </View>





                            <View style={{
                                borderTopColor: '#F1EEEC',
                                borderTopWidth: 1,
                            }}></View>

                            <View style={styles.tableRow}>
                                <View style={styles.tableColumnClockInOutTimes}>
                                    <Text style={styles.textLineItemGreen}>Q-T</Text>
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
                                    />
                                </View>

                            </View>






                            <View style={{
                                borderTopColor: '#F1EEEC',
                                borderTopWidth: 1,
                            }}></View>

                            <View style={styles.tableRow}>
                                <View style={styles.tableColumnClockInOutTimes}>
                                    <Text style={styles.textLineItemGreen}>U-V</Text>
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
                                    />
                                </View>

                            </View>




                            <View style={{
                                borderTopColor: '#F1EEEC',
                                borderTopWidth: 1,
                            }}></View>

                            <View style={styles.tableRow}>
                                <View style={styles.tableColumnClockInOutTimes}>
                                    <Text style={styles.textLineItemGreen}>W</Text>
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
                                    />
                                </View>

                            </View>





                            <View style={{
                                borderTopColor: '#F1EEEC',
                                borderTopWidth: 1,
                            }}></View>

                            <View style={styles.tableRow}>
                                <View style={styles.tableColumnClockInOutTimes}>
                                    <Text style={styles.textLineItemGreen}>X</Text>
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
                                    />
                                </View>

                            </View>


                            <View style={{
                                borderTopColor: '#F1EEEC',
                                borderTopWidth: 1,
                            }}></View>

                            <View style={styles.tableRow}>
                                <View style={styles.tableColumnClockInOutTimes}>
                                    <Text style={styles.textLineItemGreen}>Y-Z</Text>
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
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
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
                                    />
                                </View>

                            </View>
                        </View>

                        <View style={styles.marginBetweenTop}></View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>

                            <TouchableOpacity
                                style={styles.buttonContainer}
                                disabled={false}
                                onPress={() => this.handleButtonPress()}>
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>

                            <View style={{ marginRight: 12 }}></View>

                            <TouchableOpacity
                                style={styles.buttonContainer}
                                disabled={false}
                                onPress={() => this.handleNextButtonPress()}>
                                <Text style={styles.buttonText}>Next</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={styles.marginBetweenTop}></View>

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

    textLineItem: {

        color: "#000000",
        fontFamily: "times_new_roman",
    },

    textLineItemGreen: {

        color: "#87B26A",
        fontFamily: "times_new_roman",
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
        fontFamily: "times_new_roman",
        flexShrink: 1,
        textAlign: 'center',

    },

    titleBlackText: {

        color: '#000000',
        fontSize: 17,
        fontFamily: "times_new_roman",
        flexShrink: 1,

    },

    titleGreenText: {

        color: '#7DBD5C',
        fontSize: 24,
        fontFamily: "times_new_roman",
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
        fontFamily: "times_new_roman",


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











    buttonContainer: {
        backgroundColor: '#7DBD5C',
        borderRadius: 10,
        padding: 10,
        height: 50,
        width: 171,
        justifyContent: 'center',
        alignItems: 'center'

    },

    buttonText: {
        fontSize: 16,
        color: '#ffffff',
        fontFamily: "times_new_roman",

    },



    weekText1: {
        fontSize: 18,
        fontFamily: "times_new_roman",
        color: '#87B26A'
    },

    weekText2: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: "times_new_roman",
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