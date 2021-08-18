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
    TouchableOpacity

} from 'react-native';

import DropDownPicker from '@nectr-rn/react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment'





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


        };


    }

    setOpen(open) {
        this.setState({
            open
        });
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

        this.setState({ weekNumber: completeWeekNumber })

        //this.getAsyncItem();


    }

    componentWillUnmount() {

        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
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

                            {Platform.OS == 'ios' ? <DropDownPicker
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
                                value={this.state.scoutersName}


                            /> :
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
                                    value={this.state.scoutersName}


                                />}

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

                            {Platform.OS == 'ios' ? <DropDownPicker
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
                                value={this.state.location}


                            /> :
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
                                    value={this.state.location}


                                />}

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

                            {Platform.OS == 'ios' ? <DropDownPicker
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
                                value={this.state.scoutType}


                            /> : <DropDownPicker
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
                                value={this.state.scoutType}


                            />}

                        </View>

                        <View style={styles.marginContainerTop}></View>

                        <Text style={styles.titleGreenText}>Select from the options below to start the app:</Text>

                        <View style={styles.marginBetweenTop}></View>


                        <Text style={styles.titleBlackText}>Before you start, please make sure all the above data has been entered correctly.</Text>

                        <View style={styles.marginBetweenTop}></View>

                        <View style={styles.marginBetweenTop}></View>

                        {(this.state.scoutersName != '' && this.state.location != '' && this.state.scoutType != '') ? <TouchableOpacity
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

    mainPageContainer: {

        flex: 1,
        marginRight: 20,
        marginLeft: 20,
        marginTop: 40

    },

    buttonContainer: {
        backgroundColor: '#7DBD5C',
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