import React, { Component } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, Platform, Alert, Linking, View } from 'react-native'


import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import SiteSelection from '../screens/SiteSelection'
import ScreenNavigator from '../screens/ScreenNavigator'

import Home from '../screens/Home'
import Settings from '../screens/Settings'
import Scouting from '../screens/Scouting'
import Scouting1 from '../screens/Scouting1'
import Scouting2 from '../screens/Scouting2'
import Scouting3 from '../screens/Scouting3'
import Scouting4 from '../screens/Scouting4'
import Scouting5 from '../screens/Scouting5'
import Scouting6 from '../screens/Scouting6'
import Scouting7 from '../screens/Scouting7'
import Scouting8 from '../screens/Scouting8'
import Scouting9 from '../screens/Scouting9'
import Scouting10 from '../screens/Scouting10'
import Scouting11 from '../screens/Scouting11'
import Scouting12 from '../screens/Scouting12'
import Scouting13 from '../screens/Scouting13'
import Scouting14 from '../screens/Scouting14'
import Scouting15 from '../screens/Scouting15'
import Scouting16 from '../screens/Scouting16'
import Scouting17 from '../screens/Scouting17'
import Scouting18 from '../screens/Scouting18'
import Scouting19 from '../screens/Scouting19'
import Scouting20 from '../screens/Scouting20'
import Scouting21 from '../screens/Scouting21'
import Scouting22 from '../screens/Scouting22'
import Scouting23 from '../screens/Scouting23'
import Scouting24 from '../screens/Scouting24'
import Scouting25 from '../screens/Scouting25'
import Scouting26 from '../screens/Scouting26'
import Scouting27 from '../screens/Scouting27'
import Scouting28 from '../screens/Scouting28'
import Scouting29 from '../screens/Scouting29'
import Scouting30 from '../screens/Scouting30'
import Scouting31 from '../screens/Scouting31'
import Scouting32 from '../screens/Scouting32'
import Scouting33 from '../screens/Scouting33'
import Scouting34 from '../screens/Scouting34'
import Scouting35 from '../screens/Scouting35'
import Scouting36 from '../screens/Scouting36'
import Scouting37 from '../screens/Scouting37'
import Scouting38 from '../screens/Scouting38'
import Scouting39 from '../screens/Scouting39'
import Scouting40 from '../screens/Scouting40'
import Scouting41 from '../screens/Scouting41'
import Scouting42 from '../screens/Scouting42'
import Scouting43 from '../screens/Scouting43'
import Scouting44 from '../screens/Scouting44'
import Scouting45 from '../screens/Scouting45'
import Scouting46 from '../screens/Scouting46'
import Scouting47 from '../screens/Scouting47'
import Scouting48 from '../screens/Scouting48'
import Scouting49 from '../screens/Scouting49'
import Scouting50 from '../screens/Scouting50'
import Scouting51 from '../screens/Scouting51'
import Scouting52 from '../screens/Scouting52'
import Scouting53 from '../screens/Scouting53'
import Scouting54 from '../screens/Scouting54'
import Scouting55 from '../screens/Scouting55'
import Scouting56 from '../screens/Scouting56'
import Scouting57 from '../screens/Scouting57'
import Scouting58 from '../screens/Scouting58'
import Scouting59 from '../screens/Scouting59'
import Scouting60 from '../screens/Scouting60'

import ViewScoutingDetails from '../screens/ViewScoutingDetails'


const Stack = createStackNavigator();

function MainStackNavigator() {


    return (


        <NavigationContainer independent={true}>


            <Stack.Navigator
                initialRouteName='SiteSelection'


                screenOptions={{
                    gestureEnabled: false,

                    headerStyle: {
                        backgroundColor: '#7DBD5C',
                        //height: Platform.OS === 'android'? 68 : null
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,

                    },

                    headerTintColor: 'white',
                    headerBackTitleVisible: false,
                    headerTitleAlign: 'center',
                    headerMode: 'float'

                }

                }
            >


                <Stack.Screen name='SiteSelection' component={SiteSelection} options={{ headerShown: false, title: 'T&G Global' }} />

                <Stack.Screen name='ScreenNavigator' component={ScreenNavigator} options={{ headerLeft: () => null, headerShown: false, title: 'T&G Global' }} />

                <Stack.Screen name='Home' component={Home} options={({ navigation }) => ({
                    headerLeft: () => null, title: 'Tomato Crop IPM App', headerRight: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityStyle2}
                            onPress={() => navigation.navigate('Settings')}>

                            <Image source={require('../assets/settings.png')} style={styles.FloatingButtonStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Settings' component={Settings} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Settings', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting' component={Scouting} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />


                <Stack.Screen name='Scouting1' component={Scouting1} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting2' component={Scouting2} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting3' component={Scouting3} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting4' component={Scouting4} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting5' component={Scouting5} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />


                <Stack.Screen name='Scouting6' component={Scouting6} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting7' component={Scouting7} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />


                <Stack.Screen name='Scouting8' component={Scouting8} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting9' component={Scouting9} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting10' component={Scouting10} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting11' component={Scouting11} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting12' component={Scouting12} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />


                <Stack.Screen name='Scouting13' component={Scouting13} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting14' component={Scouting14} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting15' component={Scouting15} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting16' component={Scouting16} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting17' component={Scouting17} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />


                <Stack.Screen name='Scouting18' component={Scouting18} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting19' component={Scouting19} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting20' component={Scouting20} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting21' component={Scouting21} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting22' component={Scouting22} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting23' component={Scouting23} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting24' component={Scouting24} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting25' component={Scouting25} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting26' component={Scouting26} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting27' component={Scouting27} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting28' component={Scouting28} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting29' component={Scouting29} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting30' component={Scouting30} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting31' component={Scouting31} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />


                <Stack.Screen name='Scouting32' component={Scouting32} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting33' component={Scouting33} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting34' component={Scouting34} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting35' component={Scouting35} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting36' component={Scouting36} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting37' component={Scouting37} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting38' component={Scouting38} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting39' component={Scouting39} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting40' component={Scouting40} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting41' component={Scouting41} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting42' component={Scouting42} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting43' component={Scouting43} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting44' component={Scouting44} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting45' component={Scouting45} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting46' component={Scouting46} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting47' component={Scouting47} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting48' component={Scouting48} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting49' component={Scouting49} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting50' component={Scouting50} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting51' component={Scouting51} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting52' component={Scouting52} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting53' component={Scouting53} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting54' component={Scouting54} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting55' component={Scouting55} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting56' component={Scouting56} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting57' component={Scouting57} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting58' component={Scouting58} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting59' component={Scouting59} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />

                <Stack.Screen name='Scouting60' component={Scouting60} options={({ navigation }) => ({
                    headerRight: () => null, title: 'Crop Scouting', headerLeft: () =>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.TouchableOpacityLeftStyle2}
                            onPress={() => navigation.navigate('Home')}>

                            <Image source={require('../assets/back.png')} style={styles.FloatingButtonLeftStyle2} />

                        </TouchableOpacity>
                })} />
                <Stack.Screen name='ViewScoutingDetails' component={ViewScoutingDetails} options={{ headerShown: false, headerLeft: false }} />





            </Stack.Navigator>

        </NavigationContainer >



    )
}

const styles = StyleSheet.create({


    headerLeftStyle: {
        color: '#ffffff',
        fontSize: 28,
        fontWeight: 'bold',
        marginLeft: 8,

    },

    TouchableOpacityStyle2: {

        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,

    },

    TouchableOpacityLeftStyle2: {

        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,

    },

    FloatingButtonStyle2: {

        resizeMode: 'contain',
        width: 26,
        height: 26,
    },

    FloatingButtonLeftStyle2: {

        resizeMode: 'contain',
        width: 20,
        height: 20,
    },

})



export default MainStackNavigator