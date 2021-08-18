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


const Stack = createStackNavigator();

function MainStackNavigator() {


    return (


        <NavigationContainer>



            <Stack.Navigator
                initialRouteName='Home'

            
                screenOptions={{
                    //gestureEnabled: true,
                    headerStyle: {
                        backgroundColor: '#7DBD5C',
                        height: 68
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontFamily: Platform.OS == 'android'? "times_new_roman" : null,
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