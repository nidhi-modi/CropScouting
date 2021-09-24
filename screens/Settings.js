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
    Platform,
    TextInput,


} from 'react-native';

import DropDownPicker from '@nectr-rn/react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler';
var width = Dimensions.get('window').width / 2.5; //full width
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native';






export default class Settings extends Component {

    constructor(props) {
        super(props);

        this.state = {

            settingType: '',
            column1: '',
            column2: '',
            column3: '',
            column4: '',
            rows: '',
            intervals: '',



        };


    }


    componentDidMount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);


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
        console.log(field + "" + this.state.settingType);
        this.setItem(field + "" + this.state.settingType, text)
        const state = this.state
        state[field] = text;
        this.setState(state);
    }

    updateDropTextInput = (text, field) => {
        this.setItem(field + "" + this.state.settingType, text)
        const state = this.state
        state[field] = text;
        this.setState(state);

        if (this.state.settingType !== '') {

            console.log("Not Null");

            try {
                AsyncStorage.getItem("settingType").then((text1Value) => {
                    var opt1 = JSON.parse(text1Value);
                    this.setState({ settingType: opt1 });
                    console.log(opt1);

                }).done();
            } catch (error) {

            }

            try {

                console.log();
                AsyncStorage.getItem("column1" + this.state.settingType).then((text2Value) => {
                    var opt2 = JSON.parse(text2Value);
                    this.setState({ column1: opt2 });
                    console.log(opt2);

                }).done();
            } catch (error) {

            }

            try {
                AsyncStorage.getItem("column2" + this.state.settingType).then((text3Value) => {
                    var opt3 = JSON.parse(text3Value);
                    this.setState({ column2: opt3 });
                    console.log(opt3);

                }).done();
            } catch (error) {

            }

            try {
                AsyncStorage.getItem("column3" + this.state.settingType).then((text4Value) => {
                    var opt4 = JSON.parse(text4Value);
                    this.setState({ column3: opt4 });
                    console.log(opt4);

                }).done();
            } catch (error) {

            }

            try {
                AsyncStorage.getItem("column4" + this.state.settingType).then((text5Value) => {
                    var opt5 = JSON.parse(text5Value);
                    this.setState({ column4: opt5 });
                    console.log(opt5);

                }).done();
            } catch (error) {

            }


            try {
                AsyncStorage.getItem("rows" + this.state.settingType).then((text7Value) => {
                    var opt7 = JSON.parse(text7Value);
                    this.setState({ rows: opt7 });
                    console.log(opt7);

                }).done();
            } catch (error) {

            }

            try {
                AsyncStorage.getItem("intervals" + this.state.settingType).then((text8Value) => {
                    var opt8 = JSON.parse(text8Value);
                    this.setState({ intervals: opt8 });
                    console.log(opt8);

                }).done();
            } catch (error) {

            }
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

    render() {

        return (

            <View style={styles.container}>

                <ScrollView keyboardShouldPersistTaps='handled'>

                    <View style={styles.mainPageContainer}>

                        <Text style={styles.titleHeadingText}>Select from the dropdown list to change the setting</Text>

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
                                    borderWidth: 1,
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
                                onChangeItem={(item) => this.updateDropTextInput(item.value, 'settingType')}
                                value={this.state.scoutersName}


                            />
                        </View>


                        <View style={styles.marginContainerTop}></View>

                        {(this.state.settingType != '') ?

                            <View>
                                <Text style={styles.titleGreenText}>{this.state.settingType}</Text>

                                <View style={styles.marginBetweenTop}></View>

                                <Text style={styles.titleBlackText}>Enter Column Names Below</Text>

                                <View style={styles.marginBetweenTextTop}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        multiline={false}
                                        autoCorrect={false}
                                        returnKeyType={'done'}
                                        enablesReturnKeyAutomatically={true}
                                        editable={true}
                                        keyboardType={'default'}
                                        onChangeText={(text) => this.updateTextInput(text, 'column1')}
                                        blurOnSubmit={true}
                                        value={this.state.column1}
                                    />
                                </View>

                                <View style={styles.marginBetweenTextTop}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        multiline={false}
                                        autoCorrect={false}
                                        returnKeyType={'done'}
                                        enablesReturnKeyAutomatically={true}
                                        editable={true}
                                        keyboardType={'default'}
                                        onChangeText={(text) => this.updateTextInput(text, 'column2')}
                                        blurOnSubmit={true}
                                        value={this.state.column2}

                                    />

                                </View>

                                <View style={styles.marginBetweenTextTop}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        multiline={false}
                                        autoCorrect={false}
                                        returnKeyType={'done'}
                                        enablesReturnKeyAutomatically={true}
                                        editable={true}
                                        keyboardType={'default'}
                                        onChangeText={(text) => this.updateTextInput(text, 'column3')}
                                        blurOnSubmit={true}
                                        value={this.state.column3}

                                    />

                                </View>

                                <View style={styles.marginBetweenTextTop}></View>

                                <View style={styles.borderEdit}>
                                    <TextInput style={styles.textInputStyle}
                                        multiline={false}
                                        autoCorrect={false}
                                        returnKeyType={'done'}
                                        enablesReturnKeyAutomatically={true}
                                        editable={true}
                                        keyboardType={'default'}
                                        onChangeText={(text) => this.updateTextInput(text, 'column4')}
                                        blurOnSubmit={true}
                                        value={this.state.column4}

                                    />

                                </View>


                                <View style={styles.marginContainerTop}></View>

                                <View style={{ flexDirection: 'row' }}>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                        <Text style={styles.titleBlackText}>Number of Rows:</Text>
                                    </View>

                                    <View style={{ flexDirection: 'column', alignItems: 'center', flex: 1 }}>

                                        <View style={styles.borderEdit}>
                                            <TextInput style={styles.textInputStyle2}
                                                multiline={false}
                                                returnKeyType={'done'}
                                                placeholder={"Max rows are 10"}
                                                autoCorrect={false}
                                                enablesReturnKeyAutomatically={true}
                                                editable={true}
                                                keyboardType={'numeric'}
                                                onChangeText={(text) => this.updateTextInput(text, 'rows')}
                                                blurOnSubmit={true}
                                                value={this.state.rows}

                                            />

                                        </View>

                                    </View>

                                </View>


                                <View style={styles.marginContainerTop}></View>

                                <View style={{ flexDirection: 'row' }}>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                        <Text style={styles.titleBlackText}>Row Interval:</Text>
                                    </View>

                                    <View style={{ flexDirection: 'column', alignItems: 'center', flex: 1 }}>

                                        <View style={styles.borderEdit}>
                                            <TextInput style={styles.textInputStyle2}
                                                multiline={false}
                                                autoCorrect={false}
                                                returnKeyType={'done'}
                                                enablesReturnKeyAutomatically={true}
                                                editable={true}
                                                keyboardType={'numeric'}
                                                onChangeText={(text) => this.updateTextInput(text, 'intervals')}
                                                blurOnSubmit={true}
                                                value={this.state.intervals}

                                            />

                                        </View>

                                    </View>

                                </View>

                            </View>

                            : null}

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

    flexArrangement: {

        flexDirection: 'row'

    },

    mainPageContainer: {

        flex: 1,
        marginRight: 20,
        marginLeft: 20,
        marginTop: 30

    },

    titleHeadingText: {

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

    titleRedText: {

        color: '#ff0000',
        fontSize: 15,
        flexShrink: 1,
        fontWeight: 'bold',


    },

    titleGreenText: {

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
        height: 50,
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



    weekText1: {
        fontSize: 18,
        color: '#87B26A'
    },

    weekText2: {
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