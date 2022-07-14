/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  BackHandler,
  Platform,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';

import DropDownPicker from '@nectr-rn/react-native-dropdown-picker';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import Database from '../screens/Database';
import NetInfo from '@react-native-community/netinfo';

var intervalNumber,
  rowNum1,
  rowNum2,
  rowNum3,
  rowNum4,
  rowNum5,
  rowNum6,
  rowNum7,
  rowNum8,
  rowNum9,
  rowNum10,
  rowNum11,
  rowNum12,
  rowNum13,
  rowNum14,
  rowNum15,
  rowNum16,
  rowNum17,
  rowNum18,
  rowNum19,
  rowNum20,
  rowNum21,
  rowNum22,
  rowNum23,
  rowNum24,
  rowNum25,
  rowNum26,
  rowNum27,
  rowNum28,
  rowNum29,
  rowNum30,
  rowNum31,
  rowNum32,
  rowNum33,
  rowNum34,
  rowNum35,
  rowNum36,
  rowNum37,
  rowNum38,
  rowNum39,
  rowNum40,
  rowNum41,
  rowNum42,
  rowNum43,
  rowNum44,
  rowNum45,
  rowNum46,
  rowNum47,
  rowNum48,
  rowNum49,
  rowNum50,
  rowNum51,
  rowNum52,
  rowNum53,
  rowNum54,
  rowNum55,
  rowNum56,
  rowNum57,
  rowNum58,
  rowNum59,
  rowNum60,
  rowNum61;
var scouting1st,
  scouting2nd,
  scouting3rd,
  scouting4th,
  scouting5th,
  scouting6th,
  scouting7th,
  scouting8th,
  scouting9th,
  scouting10th,
  scouting11th,
  scouting12th,
  scouting13th,
  scouting14th,
  scouting15th,
  scouting16th,
  scouting17th,
  scouting18th,
  scouting19th,
  scouting20th,
  scouting21th,
  scouting22th,
  scouting23th,
  scouting24th,
  scouting25th,
  scouting26th,
  scouting27th,
  scouting28th,
  scouting29th,
  scouting30th,
  scouting31th,
  scouting32th,
  scouting33th,
  scouting34th,
  scouting35th,
  scouting36th,
  scouting37th,
  scouting38th,
  scouting39th,
  scouting40th,
  scouting41th,
  scouting42th,
  scouting43th,
  scouting44th,
  scouting45th,
  scouting46th,
  scouting47th,
  scouting48th,
  scouting49th,
  scouting50th,
  scouting51th,
  scouting52th,
  scouting53th,
  scouting54th,
  scouting55th,
  scouting56th,
  scouting57th,
  scouting58th,
  scouting59th,
  scouting60th,
  scouting61th;

var screenWidth = Dimensions.get('window').width / 1.6;
const db = new Database();
var houseSelected;

export default class Home extends React.Component {
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
      selected: '',
    };
  }

  setOpen(open) {
    this.setState({
      open,
    });
  }

  CheckConnectivity = () => {
    // For Android devices
    if (Platform.OS === 'android') {
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
          Alert.alert('You are online!');
        } else {
          Alert.alert('You are offline!');
        }
      });
    } else {
      // For iOS devices
      NetInfo.isConnected.addEventListener(
        'connectionChange',
        this.handleFirstConnectivityChange,
      );
    }
  };

  handleFirstConnectivityChange = isConnected => {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange,
    );

    if (isConnected === false) {
      Alert.alert('You are offline!');
    } else {
      Alert.alert('You are online!');
    }
  };

  handleConnectivityChange = state => {
    if (state.isConnected) {
      this.setState({isItConnected: 'Online'});
    } else {
      this.setState({isItConnected: 'Offline'});
    }
  };

  checkInternetConnection = () => {
    if (this.state.isItConnected == 'Online') {
      this.setState({
        scoutersName: null,
        location: null,
        scoutType: null,
      });

      this.props.navigation.navigate('ViewScoutingDetails');
    } else {
      this.errorMessage();
    }
  };

  errorMessage = () => {
    Alert.alert(
      'No Internet Connection',
      'Make sure your device is connected to the internet',
      [
        {
          text: 'OK',
          onPress: () => console.log('No button clicked'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    NetInfo.addEventListener(this.handleConnectivityChange);

    try {
      AsyncStorage.getItem('house')
        .then(text1Value => {
          houseSelected = JSON.parse(text1Value);
          this.setState({selected: text1Value});

          console.log('HOUSE : ' + this.state.selected);

          this.handleScoutersName();
          this.handleLocationItem();
        })
        .done();
    } catch (error) {}

    console.log('Data Saved successfully : ' + JSON.stringify(houseSelected));

    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getDatabase();
    });

    var weekNumber = moment().week() - 1;
    var yearNumber = moment().year();
    var toText = yearNumber.toString(); //convert to string
    var lastChar = toText.slice(-2); //gets last character
    var lastDigit = +lastChar; //convert last character to number
    var weekNumberText = lastDigit + '00';
    var convertWeekNumber = +weekNumberText;
    var completeWeekNumber = convertWeekNumber + weekNumber;

    this.setState({weekNumber: completeWeekNumber});

    this.getAsyncItem();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  getDatabase = () => {
    db.listScoutData()
      .then(data => {
        this.setState({listScoutingData: data});
        console.log(
          'data from local database',
          this.state.listScoutingData.length,
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  getAsyncItem = () => {
    try {
      AsyncStorage.getItem('scoutersName')
        .then(text1Value => {
          console.log('Name : ' + JSON.parse(text1Value));
          this.setState({scoutersName: JSON.parse(text1Value)});
        })
        .done();
    } catch (error) {}

    try {
      AsyncStorage.getItem('location')
        .then(text2Value => {
          this.setState({location: JSON.parse(text2Value)});
        })
        .done();
    } catch (error) {}

    try {
      AsyncStorage.getItem('scoutType')
        .then(text3Value => {
          this.setState({scoutType: JSON.parse(text3Value)});
        })
        .done();
    } catch (error) {}
  };

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
  };

  handleButtonPress = () => {
    var name = this.state.scoutersName;
    var loc = this.state.location;
    var type = this.state.scoutType;

    if (name != '' && loc != '' && type != '') {
      //GET interval
      try {
        AsyncStorage.getItem('intervals' + type)
          .then(text2Value => {
            intervalNumber = JSON.parse(text2Value);
          })
          .done();
      } catch (error) {}

      //END

      //GET row1
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting')
          .then(rowNumber1 => {
            rowNum1 = JSON.parse(rowNumber1);
          })
          .done();
      } catch (error) {}

      //END

      //GET row2
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting1')
          .then(rowNumber2 => {
            rowNum2 = JSON.parse(rowNumber2);
          })
          .done();
      } catch (error) {}

      //END

      //GET row3
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting2')
          .then(rowNumber3 => {
            rowNum3 = JSON.parse(rowNumber3);
          })
          .done();
      } catch (error) {}

      //END

      //GET row4
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting3')
          .then(rowNumber4 => {
            rowNum4 = JSON.parse(rowNumber4);
          })
          .done();
      } catch (error) {}

      //END

      //GET row5
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting4')
          .then(rowNumber5 => {
            rowNum5 = JSON.parse(rowNumber5);
          })
          .done();
      } catch (error) {}

      //END

      //GET row6
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting5')
          .then(rowNumber6 => {
            rowNum6 = JSON.parse(rowNumber6);
          })
          .done();
      } catch (error) {}

      //END

      //GET row7
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting6')
          .then(rowNumber7 => {
            rowNum7 = JSON.parse(rowNumber7);
          })
          .done();
      } catch (error) {}

      //END

      //GET row8
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting7')
          .then(rowNumber8 => {
            rowNum8 = JSON.parse(rowNumber8);
          })
          .done();
      } catch (error) {}

      //END

      //GET row9
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting8')
          .then(rowNumber9 => {
            rowNum9 = JSON.parse(rowNumber9);
          })
          .done();
      } catch (error) {}

      //END

      //GET row10
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting9')
          .then(rowNumber10 => {
            rowNum10 = JSON.parse(rowNumber10);
          })
          .done();
      } catch (error) {}

      //END

      //GET row11
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting10')
          .then(rowNumber11 => {
            rowNum11 = JSON.parse(rowNumber11);
          })
          .done();
      } catch (error) {}

      //END

      //GET row12
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting11')
          .then(rowNumber12 => {
            rowNum12 = JSON.parse(rowNumber12);
          })
          .done();
      } catch (error) {}

      //END

      //GET row12
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting12')
          .then(rowNumber13 => {
            rowNum13 = JSON.parse(rowNumber13);
          })
          .done();
      } catch (error) {}

      //END

      //GET row13
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting13')
          .then(rowNumber14 => {
            rowNum14 = JSON.parse(rowNumber14);
          })
          .done();
      } catch (error) {}

      //END

      //GET row14
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting14')
          .then(rowNumber15 => {
            rowNum15 = JSON.parse(rowNumber15);
          })
          .done();
      } catch (error) {}

      //END

      //GET row15
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting15')
          .then(rowNumber16 => {
            rowNum16 = JSON.parse(rowNumber16);
          })
          .done();
      } catch (error) {}

      //END

      //GET row16
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting16')
          .then(rowNumber66 => {
            rowNum17 = JSON.parse(rowNumber66);
          })
          .done();
      } catch (error) {}

      //END

      //GET row17
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting17')
          .then(rowNumber17 => {
            rowNum18 = JSON.parse(rowNumber17);
          })
          .done();
      } catch (error) {}

      //END

      //GET row19
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting18')
          .then(rowNumber18 => {
            rowNum19 = JSON.parse(rowNumber18);
          })
          .done();
      } catch (error) {}

      //END

      //GET row20
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting19')
          .then(rowNumber19 => {
            rowNum20 = JSON.parse(rowNumber19);
          })
          .done();
      } catch (error) {}

      //END

      //GET row21
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting20')
          .then(rowNumber20 => {
            rowNum21 = JSON.parse(rowNumber20);
          })
          .done();
      } catch (error) {}

      //END

      //GET row22
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting21')
          .then(rowNumber21 => {
            rowNum22 = JSON.parse(rowNumber21);
          })
          .done();
      } catch (error) {}

      //END

      //GET row23
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting22')
          .then(rowNumber22 => {
            rowNum23 = JSON.parse(rowNumber22);
          })
          .done();
      } catch (error) {}

      //END

      //GET row24
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting23')
          .then(rowNumber23 => {
            rowNum24 = JSON.parse(rowNumber23);
          })
          .done();
      } catch (error) {}

      //END

      //GET row25
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting24')
          .then(rowNumber24 => {
            rowNum25 = JSON.parse(rowNumber24);
          })
          .done();
      } catch (error) {}

      //END

      //GET row26
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting25')
          .then(rowNumber25 => {
            rowNum26 = JSON.parse(rowNumber25);
          })
          .done();
      } catch (error) {}

      //END

      //GET row27
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting26')
          .then(rowNumber26 => {
            rowNum27 = JSON.parse(rowNumber26);
          })
          .done();
      } catch (error) {}

      //END

      //GET row28
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting27')
          .then(rowNumber27 => {
            rowNum28 = JSON.parse(rowNumber27);
          })
          .done();
      } catch (error) {}

      //END

      //GET row29
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting28')
          .then(rowNumber28 => {
            rowNum29 = JSON.parse(rowNumber28);
          })
          .done();
      } catch (error) {}

      //END

      //GET row30
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting29')
          .then(rowNumber29 => {
            rowNum30 = JSON.parse(rowNumber29);
          })
          .done();
      } catch (error) {}

      //END

      //GET row31
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting30')
          .then(rowNumber30 => {
            rowNum31 = JSON.parse(rowNumber30);
          })
          .done();
      } catch (error) {}

      //END

      //GET row32
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting31')
          .then(rowNumber31 => {
            rowNum32 = JSON.parse(rowNumber31);
          })
          .done();
      } catch (error) {}

      //END

      //GET row33
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting32')
          .then(rowNumber32 => {
            rowNum33 = JSON.parse(rowNumber32);
          })
          .done();
      } catch (error) {}

      //END

      //GET row34
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting33')
          .then(rowNumber33 => {
            rowNum34 = JSON.parse(rowNumber33);
          })
          .done();
      } catch (error) {}

      //END

      //GET row35
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting34')
          .then(rowNumber34 => {
            rowNum35 = JSON.parse(rowNumber34);
          })
          .done();
      } catch (error) {}

      //END

      //GET row36
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting35')
          .then(rowNumber35 => {
            rowNum36 = JSON.parse(rowNumber35);
          })
          .done();
      } catch (error) {}

      //END

      //GET row37
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting36')
          .then(rowNumber36 => {
            rowNum37 = JSON.parse(rowNumber36);
          })
          .done();
      } catch (error) {}

      //END

      //GET row38
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting37')
          .then(rowNumber37 => {
            rowNum38 = JSON.parse(rowNumber37);
          })
          .done();
      } catch (error) {}

      //END

      //GET row39
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting38')
          .then(rowNumber38 => {
            rowNum39 = JSON.parse(rowNumber38);
          })
          .done();
      } catch (error) {}

      //END

      //GET row40
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting39')
          .then(rowNumber39 => {
            rowNum40 = JSON.parse(rowNumber39);
          })
          .done();
      } catch (error) {}

      //END

      //GET row41
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting40')
          .then(rowNumber40 => {
            rowNum41 = JSON.parse(rowNumber40);
          })
          .done();
      } catch (error) {}

      //END

      //GET row42
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting41')
          .then(rowNumber41 => {
            rowNum42 = JSON.parse(rowNumber41);
          })
          .done();
      } catch (error) {}

      //END

      //GET row42
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting42')
          .then(rowNumber42 => {
            rowNum43 = JSON.parse(rowNumber42);
          })
          .done();
      } catch (error) {}

      //END

      //GET row43
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting43')
          .then(rowNumber43 => {
            rowNum44 = JSON.parse(rowNumber43);
          })
          .done();
      } catch (error) {}

      //END

      //GET row44
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting44')
          .then(rowNumber44 => {
            rowNum45 = JSON.parse(rowNumber44);
          })
          .done();
      } catch (error) {}

      //END

      //GET row45
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting45')
          .then(rowNumber45 => {
            rowNum46 = JSON.parse(rowNumber45);
          })
          .done();
      } catch (error) {}

      //END

      //GET row46
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting46')
          .then(rowNumber46 => {
            rowNum47 = JSON.parse(rowNumber46);
          })
          .done();
      } catch (error) {}

      //END

      //GET row47
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting47')
          .then(rowNumber47 => {
            rowNum48 = JSON.parse(rowNumber47);
          })
          .done();
      } catch (error) {}

      //END

      //GET row48
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting48')
          .then(rowNumber48 => {
            rowNum49 = JSON.parse(rowNumber48);
          })
          .done();
      } catch (error) {}

      //END

      //GET row49
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting49')
          .then(rowNumber49 => {
            rowNum50 = JSON.parse(rowNumber49);
          })
          .done();
      } catch (error) {}

      //END

      //GET row50
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting50')
          .then(rowNumber50 => {
            rowNum51 = JSON.parse(rowNumber50);
          })
          .done();
      } catch (error) {}

      //END

      //GET row51
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting51')
          .then(rowNumber51 => {
            rowNum52 = JSON.parse(rowNumber51);
          })
          .done();
      } catch (error) {}

      //END

      //GET row52
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting52')
          .then(rowNumber52 => {
            rowNum53 = JSON.parse(rowNumber52);
          })
          .done();
      } catch (error) {}

      //END

      //GET row53
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting53')
          .then(rowNumber53 => {
            rowNum54 = JSON.parse(rowNumber53);
          })
          .done();
      } catch (error) {}

      //END

      //GET row54
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting54')
          .then(rowNumber54 => {
            rowNum55 = JSON.parse(rowNumber54);
          })
          .done();
      } catch (error) {}

      //END

      //GET row55
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting55')
          .then(rowNumber55 => {
            rowNum56 = JSON.parse(rowNumber55);
          })
          .done();
      } catch (error) {}

      //END

      //GET row56
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting56')
          .then(rowNumber56 => {
            rowNum57 = JSON.parse(rowNumber56);
          })
          .done();
      } catch (error) {}

      //END

      //GET row57
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting57')
          .then(rowNumber57 => {
            rowNum58 = JSON.parse(rowNumber57);
          })
          .done();
      } catch (error) {}

      //END

      //GET row58
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting58')
          .then(rowNumber58 => {
            rowNum59 = JSON.parse(rowNumber58);
          })
          .done();
      } catch (error) {}

      //END

      //GET row59
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting59')
          .then(rowNumber59 => {
            rowNum60 = JSON.parse(rowNumber59);
          })
          .done();
      } catch (error) {}

      //END

      //GET row60
      try {
        AsyncStorage.getItem(type + '' + 'rowNumberScouting60')
          .then(rowNumber60 => {
            rowNum61 = JSON.parse(rowNumber60);
          })
          .done();
      } catch (error) {}

      //END

      try {
        AsyncStorage.getItem(type + '' + 'ScoutingYes')
          .then(dataEntered => {
            scouting1st = JSON.parse(dataEntered);

            console.log('1st:  ' + scouting1st);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting1Yes')
          .then(dataEntered1 => {
            console.log('2nd:  ' + JSON.parse(dataEntered1));

            scouting2nd = JSON.parse(dataEntered1);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting2Yes')
          .then(dataEntered2 => {
            console.log('3rd:  ' + JSON.parse(dataEntered2));

            scouting3rd = JSON.parse(dataEntered2);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting3Yes')
          .then(dataEntered3 => {
            console.log('4th:  ' + JSON.parse(dataEntered3));

            scouting4th = JSON.parse(dataEntered3);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting4Yes')
          .then(dataEntered4 => {
            console.log('5th:  ' + JSON.parse(dataEntered4));

            scouting5th = JSON.parse(dataEntered4);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting5Yes')
          .then(dataEntered5 => {
            console.log('6th:  ' + JSON.parse(dataEntered5));

            scouting6th = JSON.parse(dataEntered5);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting6Yes')
          .then(dataEntered6 => {
            console.log('7th:  ' + JSON.parse(dataEntered6));

            scouting7th = JSON.parse(dataEntered6);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting7Yes')
          .then(dataEntered7 => {
            console.log('8th:  ' + JSON.parse(dataEntered7));

            scouting8th = JSON.parse(dataEntered7);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting8Yes')
          .then(dataEntered8 => {
            console.log('9th:  ' + JSON.parse(dataEntered8));

            scouting9th = JSON.parse(dataEntered8);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting9Yes')
          .then(dataEntered9 => {
            console.log('10th:  ' + JSON.parse(dataEntered9));

            scouting10th = JSON.parse(dataEntered9);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting10Yes')
          .then(dataEntered10 => {
            console.log('11th:  ' + JSON.parse(dataEntered10));

            scouting11th = JSON.parse(dataEntered10);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting11Yes')
          .then(dataEntered11 => {
            console.log('12th:  ' + JSON.parse(dataEntered11));

            scouting12th = JSON.parse(dataEntered11);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting12Yes')
          .then(dataEntered12 => {
            console.log('13th:  ' + JSON.parse(dataEntered12));

            scouting13th = JSON.parse(dataEntered12);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting13Yes')
          .then(dataEntered13 => {
            console.log('14th:  ' + JSON.parse(dataEntered13));

            scouting14th = JSON.parse(dataEntered13);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting14Yes')
          .then(dataEntered14 => {
            console.log('15th:  ' + JSON.parse(dataEntered14));

            scouting15th = JSON.parse(dataEntered14);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting15Yes')
          .then(dataEntered15 => {
            console.log('16th:  ' + JSON.parse(dataEntered15));

            scouting16th = JSON.parse(dataEntered15);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting16Yes')
          .then(dataEntered16 => {
            console.log('17th:  ' + JSON.parse(dataEntered16));

            scouting17th = JSON.parse(dataEntered16);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting17Yes')
          .then(dataEntered17 => {
            console.log('18th:  ' + JSON.parse(dataEntered17));

            scouting18th = JSON.parse(dataEntered17);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting18Yes')
          .then(dataEntered18 => {
            console.log('19th:  ' + JSON.parse(dataEntered18));

            scouting19th = JSON.parse(dataEntered18);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting19Yes')
          .then(dataEntered19 => {
            console.log('20th:  ' + JSON.parse(dataEntered19));

            scouting20th = JSON.parse(dataEntered19);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting20Yes')
          .then(dataEntered20 => {
            console.log('21th:  ' + JSON.parse(dataEntered20));

            scouting21th = JSON.parse(dataEntered20);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting21Yes')
          .then(dataEntered21 => {
            console.log('22th:  ' + JSON.parse(dataEntered21));

            scouting22th = JSON.parse(dataEntered21);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting22Yes')
          .then(dataEntered22 => {
            console.log('23th:  ' + JSON.parse(dataEntered22));

            scouting23th = JSON.parse(dataEntered22);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting23Yes')
          .then(dataEntered23 => {
            console.log('24th:  ' + JSON.parse(dataEntered23));

            scouting24th = JSON.parse(dataEntered23);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting24Yes')
          .then(dataEntered24 => {
            console.log('25th:  ' + JSON.parse(dataEntered24));

            scouting25th = JSON.parse(dataEntered24);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting25Yes')
          .then(dataEntered25 => {
            console.log('26th:  ' + JSON.parse(dataEntered25));

            scouting26th = JSON.parse(dataEntered25);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting26Yes')
          .then(dataEntered26 => {
            console.log('27th:  ' + JSON.parse(dataEntered26));

            scouting27th = JSON.parse(dataEntered26);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting27Yes')
          .then(dataEntered27 => {
            console.log('28th:  ' + JSON.parse(dataEntered27));

            scouting28th = JSON.parse(dataEntered27);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting28Yes')
          .then(dataEntered28 => {
            console.log('29th:  ' + JSON.parse(dataEntered28));

            scouting29th = JSON.parse(dataEntered28);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting29Yes')
          .then(dataEntered29 => {
            console.log('30th:  ' + JSON.parse(dataEntered29));

            scouting30th = JSON.parse(dataEntered29);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting30Yes')
          .then(dataEntered30 => {
            console.log('31th:  ' + JSON.parse(dataEntered30));

            scouting31th = JSON.parse(dataEntered30);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting31Yes')
          .then(dataEntered31 => {
            console.log('32th:  ' + JSON.parse(dataEntered31));

            scouting32th = JSON.parse(dataEntered31);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting32Yes')
          .then(dataEntered32 => {
            console.log('33th:  ' + JSON.parse(dataEntered32));

            scouting33th = JSON.parse(dataEntered32);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting33Yes')
          .then(dataEntered33 => {
            console.log('34th:  ' + JSON.parse(dataEntered33));

            scouting34th = JSON.parse(dataEntered33);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting34Yes')
          .then(dataEntered34 => {
            console.log('35th:  ' + JSON.parse(dataEntered34));

            scouting35th = JSON.parse(dataEntered34);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting35Yes')
          .then(dataEntered35 => {
            console.log('36th:  ' + JSON.parse(dataEntered35));

            scouting36th = JSON.parse(dataEntered35);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting36Yes')
          .then(dataEntered36 => {
            console.log('37th:  ' + JSON.parse(dataEntered36));

            scouting37th = JSON.parse(dataEntered36);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting37Yes')
          .then(dataEntered37 => {
            console.log('38th:  ' + JSON.parse(dataEntered37));

            scouting38th = JSON.parse(dataEntered37);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting38Yes')
          .then(dataEntered38 => {
            console.log('39th:  ' + JSON.parse(dataEntered38));

            scouting39th = JSON.parse(dataEntered38);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting39Yes')
          .then(dataEntered39 => {
            console.log('40th:  ' + JSON.parse(dataEntered39));

            scouting40th = JSON.parse(dataEntered39);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting40Yes')
          .then(dataEntered40 => {
            console.log('41th:  ' + JSON.parse(dataEntered40));

            scouting41th = JSON.parse(dataEntered40);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting41Yes')
          .then(dataEntered41 => {
            console.log('42th:  ' + JSON.parse(dataEntered41));

            scouting42th = JSON.parse(dataEntered41);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting42Yes')
          .then(dataEntered43 => {
            console.log('43th:  ' + JSON.parse(dataEntered43));

            scouting43th = JSON.parse(dataEntered43);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting43Yes')
          .then(dataEntered42 => {
            console.log('44th:  ' + JSON.parse(dataEntered42));

            scouting44th = JSON.parse(dataEntered42);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting44Yes')
          .then(dataEntered44 => {
            console.log('45th:  ' + JSON.parse(dataEntered44));

            scouting45th = JSON.parse(dataEntered44);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting45Yes')
          .then(dataEntered45 => {
            console.log('46th:  ' + JSON.parse(dataEntered45));

            scouting46th = JSON.parse(dataEntered45);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting46Yes')
          .then(dataEntered46 => {
            console.log('47th:  ' + JSON.parse(dataEntered46));

            scouting47th = JSON.parse(dataEntered46);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting47Yes')
          .then(dataEntered47 => {
            console.log('48th:  ' + JSON.parse(dataEntered47));

            scouting48th = JSON.parse(dataEntered47);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting48Yes')
          .then(dataEntered48 => {
            console.log('49th:  ' + JSON.parse(dataEntered48));

            scouting49th = JSON.parse(dataEntered48);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting49Yes')
          .then(dataEntered49 => {
            console.log('50th:  ' + JSON.parse(dataEntered49));

            scouting50th = JSON.parse(dataEntered49);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting50Yes')
          .then(dataEntered50 => {
            console.log('51th:  ' + JSON.parse(dataEntered50));

            scouting51th = JSON.parse(dataEntered50);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting51Yes')
          .then(dataEntered51 => {
            console.log('52th:  ' + JSON.parse(dataEntered51));

            scouting52th = JSON.parse(dataEntered51);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting52Yes')
          .then(dataEntered52 => {
            console.log('53th:  ' + JSON.parse(dataEntered52));

            scouting53th = JSON.parse(dataEntered52);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting53Yes')
          .then(dataEntered53 => {
            console.log('54th:  ' + JSON.parse(dataEntered53));

            scouting54th = JSON.parse(dataEntered53);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting54Yes')
          .then(dataEntered54 => {
            console.log('55th:  ' + JSON.parse(dataEntered54));

            scouting55th = JSON.parse(dataEntered54);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting55Yes')
          .then(dataEntered55 => {
            console.log('56th:  ' + JSON.parse(dataEntered55));

            scouting56th = JSON.parse(dataEntered55);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting56Yes')
          .then(dataEntered56 => {
            console.log('57th:  ' + JSON.parse(dataEntered56));

            scouting57th = JSON.parse(dataEntered56);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting57Yes')
          .then(dataEntered57 => {
            console.log('58th:  ' + JSON.parse(dataEntered57));

            scouting58th = JSON.parse(dataEntered57);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting58Yes')
          .then(dataEntered58 => {
            console.log('59th:  ' + JSON.parse(dataEntered58));

            scouting59th = JSON.parse(dataEntered58);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting59Yes')
          .then(dataEntered59 => {
            console.log('60th:  ' + JSON.parse(dataEntered59));

            scouting60th = JSON.parse(dataEntered59);
          })
          .done();

        AsyncStorage.getItem(type + '' + 'Scouting60Yes')
          .then(dataEntered60 => {
            console.log('61th:  ' + JSON.parse(dataEntered60));

            scouting61th = JSON.parse(dataEntered60);

            this.navigateToScreens();
          })
          .done();
      } catch (error) {}
    } else {
    }
  };

  navigateToScreens = () => {
    console.log('Navigation');

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
                          if (scouting12th === 'Yes') {
                            if (scouting13th === 'Yes') {
                              if (scouting14th === 'Yes') {
                                if (scouting15th === 'Yes') {
                                  if (scouting16th === 'Yes') {
                                    if (scouting17th === 'Yes') {
                                      if (scouting18th === 'Yes') {
                                        if (scouting19th === 'Yes') {
                                          if (scouting20th === 'Yes') {
                                            if (scouting21th === 'Yes') {
                                              if (scouting22th === 'Yes') {
                                                if (scouting23th === 'Yes') {
                                                  if (scouting24th === 'Yes') {
                                                    if (
                                                      scouting25th === 'Yes'
                                                    ) {
                                                      if (
                                                        scouting26th === 'Yes'
                                                      ) {
                                                        if (
                                                          scouting27th === 'Yes'
                                                        ) {
                                                          if (
                                                            scouting28th ===
                                                            'Yes'
                                                          ) {
                                                            if (
                                                              scouting29th ===
                                                              'Yes'
                                                            ) {
                                                              if (
                                                                scouting30th ===
                                                                'Yes'
                                                              ) {
                                                                if (
                                                                  scouting31th ===
                                                                  'Yes'
                                                                ) {
                                                                  if (
                                                                    scouting32th ===
                                                                    'Yes'
                                                                  ) {
                                                                    if (
                                                                      scouting33th ===
                                                                      'Yes'
                                                                    ) {
                                                                      if (
                                                                        scouting34th ===
                                                                        'Yes'
                                                                      ) {
                                                                        if (
                                                                          scouting35th ===
                                                                          'Yes'
                                                                        ) {
                                                                          if (
                                                                            scouting36th ===
                                                                            'Yes'
                                                                          ) {
                                                                            if (
                                                                              scouting37th ===
                                                                              'Yes'
                                                                            ) {
                                                                              if (
                                                                                scouting38th ===
                                                                                'Yes'
                                                                              ) {
                                                                                if (
                                                                                  scouting39th ===
                                                                                  'Yes'
                                                                                ) {
                                                                                  if (
                                                                                    scouting40th ===
                                                                                    'Yes'
                                                                                  ) {
                                                                                    if (
                                                                                      scouting41th ===
                                                                                      'Yes'
                                                                                    ) {
                                                                                      if (
                                                                                        scouting42th ===
                                                                                        'Yes'
                                                                                      ) {
                                                                                        if (
                                                                                          scouting43th ===
                                                                                          'Yes'
                                                                                        ) {
                                                                                          if (
                                                                                            scouting44th ===
                                                                                            'Yes'
                                                                                          ) {
                                                                                            if (
                                                                                              scouting45th ===
                                                                                              'Yes'
                                                                                            ) {
                                                                                              if (
                                                                                                scouting46th ===
                                                                                                'Yes'
                                                                                              ) {
                                                                                                if (
                                                                                                  scouting47th ===
                                                                                                  'Yes'
                                                                                                ) {
                                                                                                  if (
                                                                                                    scouting48th ===
                                                                                                    'Yes'
                                                                                                  ) {
                                                                                                    if (
                                                                                                      scouting49th ===
                                                                                                      'Yes'
                                                                                                    ) {
                                                                                                      if (
                                                                                                        scouting50th ===
                                                                                                        'Yes'
                                                                                                      ) {
                                                                                                        if (
                                                                                                          scouting51th ===
                                                                                                          'Yes'
                                                                                                        ) {
                                                                                                          if (
                                                                                                            scouting52th ===
                                                                                                            'Yes'
                                                                                                          ) {
                                                                                                            if (
                                                                                                              scouting53th ===
                                                                                                              'Yes'
                                                                                                            ) {
                                                                                                              if (
                                                                                                                scouting54th ===
                                                                                                                'Yes'
                                                                                                              ) {
                                                                                                                if (
                                                                                                                  scouting55th ===
                                                                                                                  'Yes'
                                                                                                                ) {
                                                                                                                  if (
                                                                                                                    scouting56th ===
                                                                                                                    'Yes'
                                                                                                                  ) {
                                                                                                                    if (
                                                                                                                      scouting57th ===
                                                                                                                      'Yes'
                                                                                                                    ) {
                                                                                                                      if (
                                                                                                                        scouting58th ===
                                                                                                                        'Yes'
                                                                                                                      ) {
                                                                                                                        if (
                                                                                                                          scouting59th ===
                                                                                                                          'Yes'
                                                                                                                        ) {
                                                                                                                          if (
                                                                                                                            scouting60th ===
                                                                                                                            'Yes'
                                                                                                                          ) {
                                                                                                                            if (
                                                                                                                              scouting61th ===
                                                                                                                              'Yes'
                                                                                                                            ) {
                                                                                                                              alert(
                                                                                                                                'Need to add more rows. Please get in touch with the developer',
                                                                                                                              );
                                                                                                                            } else {
                                                                                                                              this.props.navigation.push(
                                                                                                                                'Scouting60',
                                                                                                                                {
                                                                                                                                  startNumber:
                                                                                                                                    rowNum60,
                                                                                                                                  inter:
                                                                                                                                    intervalNumber,
                                                                                                                                },
                                                                                                                              );
                                                                                                                            }
                                                                                                                          } else {
                                                                                                                            this.props.navigation.push(
                                                                                                                              'Scouting59',
                                                                                                                              {
                                                                                                                                startNumber:
                                                                                                                                  rowNum59,
                                                                                                                                inter:
                                                                                                                                  intervalNumber,
                                                                                                                              },
                                                                                                                            );
                                                                                                                          }
                                                                                                                        } else {
                                                                                                                          this.props.navigation.push(
                                                                                                                            'Scouting58',
                                                                                                                            {
                                                                                                                              startNumber:
                                                                                                                                rowNum58,
                                                                                                                              inter:
                                                                                                                                intervalNumber,
                                                                                                                            },
                                                                                                                          );
                                                                                                                        }
                                                                                                                      } else {
                                                                                                                        this.props.navigation.push(
                                                                                                                          'Scouting57',
                                                                                                                          {
                                                                                                                            startNumber:
                                                                                                                              rowNum57,
                                                                                                                            inter:
                                                                                                                              intervalNumber,
                                                                                                                          },
                                                                                                                        );
                                                                                                                      }
                                                                                                                    } else {
                                                                                                                      this.props.navigation.push(
                                                                                                                        'Scouting56',
                                                                                                                        {
                                                                                                                          startNumber:
                                                                                                                            rowNum56,
                                                                                                                          inter:
                                                                                                                            intervalNumber,
                                                                                                                        },
                                                                                                                      );
                                                                                                                    }
                                                                                                                  } else {
                                                                                                                    this.props.navigation.push(
                                                                                                                      'Scouting55',
                                                                                                                      {
                                                                                                                        startNumber:
                                                                                                                          rowNum55,
                                                                                                                        inter:
                                                                                                                          intervalNumber,
                                                                                                                      },
                                                                                                                    );
                                                                                                                  }
                                                                                                                } else {
                                                                                                                  this.props.navigation.push(
                                                                                                                    'Scouting54',
                                                                                                                    {
                                                                                                                      startNumber:
                                                                                                                        rowNum54,
                                                                                                                      inter:
                                                                                                                        intervalNumber,
                                                                                                                    },
                                                                                                                  );
                                                                                                                }
                                                                                                              } else {
                                                                                                                this.props.navigation.push(
                                                                                                                  'Scouting53',
                                                                                                                  {
                                                                                                                    startNumber:
                                                                                                                      rowNum53,
                                                                                                                    inter:
                                                                                                                      intervalNumber,
                                                                                                                  },
                                                                                                                );
                                                                                                              }
                                                                                                            } else {
                                                                                                              this.props.navigation.push(
                                                                                                                'Scouting52',
                                                                                                                {
                                                                                                                  startNumber:
                                                                                                                    rowNum52,
                                                                                                                  inter:
                                                                                                                    intervalNumber,
                                                                                                                },
                                                                                                              );
                                                                                                            }
                                                                                                          } else {
                                                                                                            this.props.navigation.push(
                                                                                                              'Scouting51',
                                                                                                              {
                                                                                                                startNumber:
                                                                                                                  rowNum51,
                                                                                                                inter:
                                                                                                                  intervalNumber,
                                                                                                              },
                                                                                                            );
                                                                                                          }
                                                                                                        } else {
                                                                                                          this.props.navigation.push(
                                                                                                            'Scouting50',
                                                                                                            {
                                                                                                              startNumber:
                                                                                                                rowNum50,
                                                                                                              inter:
                                                                                                                intervalNumber,
                                                                                                            },
                                                                                                          );
                                                                                                        }
                                                                                                      } else {
                                                                                                        this.props.navigation.push(
                                                                                                          'Scouting49',
                                                                                                          {
                                                                                                            startNumber:
                                                                                                              rowNum49,
                                                                                                            inter:
                                                                                                              intervalNumber,
                                                                                                          },
                                                                                                        );
                                                                                                      }
                                                                                                    } else {
                                                                                                      this.props.navigation.push(
                                                                                                        'Scouting48',
                                                                                                        {
                                                                                                          startNumber:
                                                                                                            rowNum48,
                                                                                                          inter:
                                                                                                            intervalNumber,
                                                                                                        },
                                                                                                      );
                                                                                                    }
                                                                                                  } else {
                                                                                                    this.props.navigation.push(
                                                                                                      'Scouting47',
                                                                                                      {
                                                                                                        startNumber:
                                                                                                          rowNum47,
                                                                                                        inter:
                                                                                                          intervalNumber,
                                                                                                      },
                                                                                                    );
                                                                                                  }
                                                                                                } else {
                                                                                                  this.props.navigation.push(
                                                                                                    'Scouting46',
                                                                                                    {
                                                                                                      startNumber:
                                                                                                        rowNum46,
                                                                                                      inter:
                                                                                                        intervalNumber,
                                                                                                    },
                                                                                                  );
                                                                                                }
                                                                                              } else {
                                                                                                this.props.navigation.push(
                                                                                                  'Scouting45',
                                                                                                  {
                                                                                                    startNumber:
                                                                                                      rowNum45,
                                                                                                    inter:
                                                                                                      intervalNumber,
                                                                                                  },
                                                                                                );
                                                                                              }
                                                                                            } else {
                                                                                              this.props.navigation.push(
                                                                                                'Scouting44',
                                                                                                {
                                                                                                  startNumber:
                                                                                                    rowNum44,
                                                                                                  inter:
                                                                                                    intervalNumber,
                                                                                                },
                                                                                              );
                                                                                            }
                                                                                          } else {
                                                                                            this.props.navigation.push(
                                                                                              'Scouting43',
                                                                                              {
                                                                                                startNumber:
                                                                                                  rowNum43,
                                                                                                inter:
                                                                                                  intervalNumber,
                                                                                              },
                                                                                            );
                                                                                          }
                                                                                        } else {
                                                                                          this.props.navigation.push(
                                                                                            'Scouting42',
                                                                                            {
                                                                                              startNumber:
                                                                                                rowNum42,
                                                                                              inter:
                                                                                                intervalNumber,
                                                                                            },
                                                                                          );
                                                                                        }
                                                                                      } else {
                                                                                        this.props.navigation.push(
                                                                                          'Scouting41',
                                                                                          {
                                                                                            startNumber:
                                                                                              rowNum41,
                                                                                            inter:
                                                                                              intervalNumber,
                                                                                          },
                                                                                        );
                                                                                      }
                                                                                    } else {
                                                                                      this.props.navigation.push(
                                                                                        'Scouting40',
                                                                                        {
                                                                                          startNumber:
                                                                                            rowNum40,
                                                                                          inter:
                                                                                            intervalNumber,
                                                                                        },
                                                                                      );
                                                                                    }
                                                                                  } else {
                                                                                    this.props.navigation.push(
                                                                                      'Scouting39',
                                                                                      {
                                                                                        startNumber:
                                                                                          rowNum39,
                                                                                        inter:
                                                                                          intervalNumber,
                                                                                      },
                                                                                    );
                                                                                  }
                                                                                } else {
                                                                                  this.props.navigation.push(
                                                                                    'Scouting38',
                                                                                    {
                                                                                      startNumber:
                                                                                        rowNum38,
                                                                                      inter:
                                                                                        intervalNumber,
                                                                                    },
                                                                                  );
                                                                                }
                                                                              } else {
                                                                                this.props.navigation.push(
                                                                                  'Scouting37',
                                                                                  {
                                                                                    startNumber:
                                                                                      rowNum37,
                                                                                    inter:
                                                                                      intervalNumber,
                                                                                  },
                                                                                );
                                                                              }
                                                                            } else {
                                                                              this.props.navigation.push(
                                                                                'Scouting36',
                                                                                {
                                                                                  startNumber:
                                                                                    rowNum36,
                                                                                  inter:
                                                                                    intervalNumber,
                                                                                },
                                                                              );
                                                                            }
                                                                          } else {
                                                                            this.props.navigation.push(
                                                                              'Scouting35',
                                                                              {
                                                                                startNumber:
                                                                                  rowNum35,
                                                                                inter:
                                                                                  intervalNumber,
                                                                              },
                                                                            );
                                                                          }
                                                                        } else {
                                                                          this.props.navigation.push(
                                                                            'Scouting34',
                                                                            {
                                                                              startNumber:
                                                                                rowNum34,
                                                                              inter:
                                                                                intervalNumber,
                                                                            },
                                                                          );
                                                                        }
                                                                      } else {
                                                                        this.props.navigation.push(
                                                                          'Scouting33',
                                                                          {
                                                                            startNumber:
                                                                              rowNum33,
                                                                            inter:
                                                                              intervalNumber,
                                                                          },
                                                                        );
                                                                      }
                                                                    } else {
                                                                      this.props.navigation.push(
                                                                        'Scouting32',
                                                                        {
                                                                          startNumber:
                                                                            rowNum32,
                                                                          inter:
                                                                            intervalNumber,
                                                                        },
                                                                      );
                                                                    }
                                                                  } else {
                                                                    this.props.navigation.push(
                                                                      'Scouting31',
                                                                      {
                                                                        startNumber:
                                                                          rowNum31,
                                                                        inter:
                                                                          intervalNumber,
                                                                      },
                                                                    );
                                                                  }
                                                                } else {
                                                                  this.props.navigation.push(
                                                                    'Scouting30',
                                                                    {
                                                                      startNumber:
                                                                        rowNum30,
                                                                      inter:
                                                                        intervalNumber,
                                                                    },
                                                                  );
                                                                }
                                                              } else {
                                                                this.props.navigation.push(
                                                                  'Scouting29',
                                                                  {
                                                                    startNumber:
                                                                      rowNum29,
                                                                    inter:
                                                                      intervalNumber,
                                                                  },
                                                                );
                                                              }
                                                            } else {
                                                              this.props.navigation.push(
                                                                'Scouting28',
                                                                {
                                                                  startNumber:
                                                                    rowNum28,
                                                                  inter:
                                                                    intervalNumber,
                                                                },
                                                              );
                                                            }
                                                          } else {
                                                            this.props.navigation.push(
                                                              'Scouting27',
                                                              {
                                                                startNumber:
                                                                  rowNum27,
                                                                inter:
                                                                  intervalNumber,
                                                              },
                                                            );
                                                          }
                                                        } else {
                                                          this.props.navigation.push(
                                                            'Scouting26',
                                                            {
                                                              startNumber:
                                                                rowNum26,
                                                              inter:
                                                                intervalNumber,
                                                            },
                                                          );
                                                        }
                                                      } else {
                                                        this.props.navigation.push(
                                                          'Scouting25',
                                                          {
                                                            startNumber:
                                                              rowNum25,
                                                            inter:
                                                              intervalNumber,
                                                          },
                                                        );
                                                      }
                                                    } else {
                                                      this.props.navigation.push(
                                                        'Scouting24',
                                                        {
                                                          startNumber: rowNum24,
                                                          inter: intervalNumber,
                                                        },
                                                      );
                                                    }
                                                  } else {
                                                    this.props.navigation.push(
                                                      'Scouting23',
                                                      {
                                                        startNumber: rowNum23,
                                                        inter: intervalNumber,
                                                      },
                                                    );
                                                  }
                                                } else {
                                                  this.props.navigation.push(
                                                    'Scouting22',
                                                    {
                                                      startNumber: rowNum22,
                                                      inter: intervalNumber,
                                                    },
                                                  );
                                                }
                                              } else {
                                                this.props.navigation.push(
                                                  'Scouting21',
                                                  {
                                                    startNumber: rowNum21,
                                                    inter: intervalNumber,
                                                  },
                                                );
                                              }
                                            } else {
                                              this.props.navigation.push(
                                                'Scouting20',
                                                {
                                                  startNumber: rowNum20,
                                                  inter: intervalNumber,
                                                },
                                              );
                                            }
                                          } else {
                                            this.props.navigation.push(
                                              'Scouting19',
                                              {
                                                startNumber: rowNum19,
                                                inter: intervalNumber,
                                              },
                                            );
                                          }
                                        } else {
                                          this.props.navigation.push(
                                            'Scouting18',
                                            {
                                              startNumber: rowNum18,
                                              inter: intervalNumber,
                                            },
                                          );
                                        }
                                      } else {
                                        this.props.navigation.push(
                                          'Scouting17',
                                          {
                                            startNumber: rowNum17,
                                            inter: intervalNumber,
                                          },
                                        );
                                      }
                                    } else {
                                      this.props.navigation.push('Scouting16', {
                                        startNumber: rowNum16,
                                        inter: intervalNumber,
                                      });
                                    }
                                  } else {
                                    this.props.navigation.push('Scouting15', {
                                      startNumber: rowNum15,
                                      inter: intervalNumber,
                                    });
                                  }
                                } else {
                                  this.props.navigation.push('Scouting14', {
                                    startNumber: rowNum14,
                                    inter: intervalNumber,
                                  });
                                }
                              } else {
                                this.props.navigation.push('Scouting13', {
                                  startNumber: rowNum13,
                                  inter: intervalNumber,
                                });
                              }
                            } else {
                              this.props.navigation.push('Scouting12', {
                                startNumber: rowNum12,
                                inter: intervalNumber,
                              });
                            }
                          } else {
                            this.props.navigation.push('Scouting11', {
                              startNumber: rowNum11,
                              inter: intervalNumber,
                            });
                          }
                        } else {
                          this.props.navigation.push('Scouting10', {
                            startNumber: rowNum10,
                            inter: intervalNumber,
                          });
                        }
                      } else {
                        this.props.navigation.push('Scouting9', {
                          startNumber: rowNum9,
                          inter: intervalNumber,
                        });
                      }
                    } else {
                      this.props.navigation.push('Scouting8', {
                        startNumber: rowNum8,
                        inter: intervalNumber,
                      });
                    }
                  } else {
                    this.props.navigation.push('Scouting7', {
                      startNumber: rowNum7,
                      inter: intervalNumber,
                    });
                  }
                } else {
                  this.props.navigation.push('Scouting6', {
                    startNumber: rowNum6,
                    inter: intervalNumber,
                  });
                }
              } else {
                this.props.navigation.push('Scouting5', {
                  startNumber: rowNum5,
                  inter: intervalNumber,
                });
              }
            } else {
              this.props.navigation.push('Scouting4', {
                startNumber: rowNum4,
                inter: intervalNumber,
              });
            }
          } else {
            this.props.navigation.push('Scouting3', {
              startNumber: rowNum3,
              inter: intervalNumber,
            });
          }
        } else {
          this.props.navigation.push('Scouting2', {
            startNumber: rowNum2,
            inter: intervalNumber,
          });
        }
      } else {
        this.props.navigation.push('Scouting1', {
          startNumber: rowNum1,
          inter: intervalNumber,
        });
      }
    } else {
      this.props.navigation.push('Scouting');
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
  };

  handleScoutersName() {
    if (houseSelected === 'OHA') {
      return (
        <DropDownPicker
          items={[
            {label: 'Dave Naicker', value: 'Dave Naicker'},
            {label: 'Ravi Sarju', value: 'Ravi Sarju'},
            {label: 'Missy Brown', value: 'Missy Brown'},
            {label: 'Stuart Thom', value: 'Stuart Thom'},
            {label: 'Scouter 1', value: 'Scouter 1'},
            {label: 'Scouter 2', value: 'Scouter 2'},
            {label: 'Scouter 3', value: 'Scouter 3'},
          ]}
          placeholder=""
          containerStyle={{height: 50}}
          style={{
            borderColor: '#F1EEEC',
            borderWidth: 1,
          }}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          labelStyle={{
            fontSize: 14,
            textAlign: 'left',
            color: '#000000',
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={item =>
            this.updateTextInput(item.value, 'scoutersName')
          }
          defaultValue={this.state.scoutersName}
        />
      );
    } else if (houseSelected === 'REP') {
      return (
        <DropDownPicker
          items={[
            {label: 'Chaminda Perera', value: 'Chaminda Perera'},
            {label: 'Nicholas Wallace', value: 'Nicholas Wallace'},
            {label: 'Chris Cowie', value: 'Chris Cowie'},
            {label: 'Scouter 1', value: 'Scouter 1'},
            {label: 'Scouter 2', value: 'Scouter 2'},
            {label: 'Scouter 3', value: 'Scouter 3'},
          ]}
          placeholder=""
          containerStyle={{height: 50}}
          style={{
            borderColor: '#F1EEEC',
            borderWidth: 1,
          }}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          labelStyle={{
            fontSize: 14,
            textAlign: 'left',
            color: '#000000',
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={item =>
            this.updateTextInput(item.value, 'scoutersName')
          }
          defaultValue={this.state.scoutersName}
        />
      );
    } else {
    }
  }

  handleLocationItem() {
    if (houseSelected === 'OHA') {
      return (
        <DropDownPicker
          items={[
            {label: 'OHA 1', value: 'OHA 1'},
            {label: 'OHA 2', value: 'OHA 2'},
          ]}
          placeholder=""
          containerStyle={{height: 50}}
          style={{
            borderColor: '#F1EEEC',
            borderWidth: 1,
          }}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          labelStyle={{
            fontSize: 14,
            textAlign: 'left',
            color: '#000000',
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={item => this.updateTextInput(item.value, 'location')}
          defaultValue={this.state.location}
        />
      );
    } else if (houseSelected === 'REP') {
      return (
        <DropDownPicker
          items={[{label: 'REP 1', value: 'REP 1'}]}
          placeholder=""
          containerStyle={{height: 50}}
          style={{
            borderColor: '#F1EEEC',
            borderWidth: 1,
          }}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          labelStyle={{
            fontSize: 14,
            textAlign: 'left',
            color: '#000000',
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={item => this.updateTextInput(item.value, 'location')}
          defaultValue={this.state.location}
        />
      );
    } else {
    }
  }

  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // then navigate
    navigate('NewScreen');
  };

  updateTextInput = (text, field) => {
    this.setItem(field, text);
    const state = this.state;
    state[field] = text;
    this.setState(state);
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.flexboxWeeknumbers}>
            <Image
              source={require('../assets/week_number_logo.png')}
              style={styles.FloatingButtonStyle2}
            />
            <View style={styles.marginRightStyle}></View>
            <Text style={styles.weekText1}>
              Current Week Number :{' '}
              <Text style={styles.weekText2}>{this.state.weekNumber}</Text>
            </Text>
          </View>

          <View style={styles.mainPageContainer}>
            <Text style={styles.titleHeadingText}>Select Scouter's Name</Text>

            <View style={styles.marginTopStyle}></View>

            <View
              style={{
                // The solution: Apply zIndex to any device except Android
                ...(Platform.OS !== 'android' && {
                  zIndex: 30,
                }),
              }}>
              {this.handleScoutersName()}
            </View>

            <View style={styles.marginContainerTop}></View>

            <Text style={styles.titleHeadingText}>Select Location</Text>

            <View style={styles.marginTopStyle}></View>

            <View
              style={{
                // The solution: Apply zIndex to any device except Android
                ...(Platform.OS !== 'android' && {
                  zIndex: 20,
                }),
              }}>
              {this.handleLocationItem()}
            </View>

            <View style={styles.marginContainerTop}></View>

            <Text style={styles.titleHeadingText}>Scouting Type</Text>

            <View style={styles.marginTopStyle}></View>

            <View
              style={{
                // The solution: Apply zIndex to any device except Android
                ...(Platform.OS !== 'android' && {
                  zIndex: 10,
                }),
              }}>
              <DropDownPicker
                items={[
                  {label: 'Plant Head', value: 'Plant Head'},
                  {label: 'Plant Middle', value: 'Plant Middle'},
                  {label: 'Plant Ground', value: 'Plant Ground'},
                ]}
                placeholder=""
                containerStyle={{height: 50}}
                style={{
                  borderColor: '#F1EEEC',
                  borderWidth: 1,
                }}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                labelStyle={{
                  fontSize: 14,
                  textAlign: 'left',
                  color: '#000000',
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item =>
                  this.updateTextInput(item.value, 'scoutType')
                }
                defaultValue={this.state.scoutType}
              />
            </View>

            <View style={styles.marginContainerTop}></View>

            <Text style={styles.titleGreenText}>
              Select from the options below to start the app:
            </Text>

            <View style={styles.marginBetweenTop}></View>

            <Text style={styles.titleBlackText}>
              Before you start, please make sure all the above data has been
              entered correctly.
            </Text>

            <View style={styles.marginBetweenTop}></View>

            <View style={styles.marginBetweenTop}></View>

            {this.state.scoutersName !== null &&
            this.state.location !== null &&
            this.state.scoutType !== null ? (
              <TouchableOpacity
                style={styles.buttonContainer}
                disabled={false}
                onPress={() => this.handleButtonPress()}>
                <Text style={styles.buttonText}>Start Crop Scouting</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.buttonContainer}
                disabled={true}
                onPress={() => this.handleButtonPress()}>
                <Text style={styles.buttonText}>Start Crop Scouting</Text>
              </TouchableOpacity>
            )}

            <View style={styles.marginBetweenTop}></View>

            {this.state.listScoutingData.length !== 0 ? (
              <View>
                <View style={styles.marginTopStyle}></View>

                <View style={styles.borderStyle}>
                  <Text style={styles.titleBlackText}>
                    Press submit button to send scouting data to the server
                  </Text>
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
            ) : null}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  borderStyle: {
    borderColor: '#F1EEEC',
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
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
    textAlign: 'center',
  },

  mainPageContainer: {
    flex: 1,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 40,
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
    alignItems: 'center',
  },

  buttonContainerRed: {
    backgroundColor: '#B11B0A',
    borderRadius: 10,
    padding: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginRight: 12,
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
    color: '#87B26A',
  },

  weekText1IOS: {
    fontSize: 18,
    color: '#87B26A',
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
    marginLeft: 30,
  },

  titleBlackTextIOS: {
    color: '#000000',
    fontSize: 15,
    flexShrink: 1,
    textAlign: 'center',
    marginRight: 30,
    marginLeft: 30,
  },
});
