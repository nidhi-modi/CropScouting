import React, { Component } from 'react';
import { StyleSheet, View} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';


var houseSelected;

export default class ScreenNavigator extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            showRealApp: false,
            selected: ''
        }

    }

    componentDidMount() {

        houseSelected = this.props.route.params.site1;

        AsyncStorage.setItem('house', JSON.stringify(houseSelected));

        console.log("Data Saved successfully : " + JSON.stringify(houseSelected));

        if (houseSelected === 'GER') {

            this.props.navigation.navigate('Home');

        }else if(houseSelected === 'HAR'){

            this.props.navigation.navigate('Home');

        }else if(houseSelected === 'OHA'){

            this.props.navigation.navigate('Home');

        }else if(houseSelected === 'REP'){

            this.props.navigation.navigate('Home');

        }

    }




    render() {

        return (

            <View style={styles.container}>


            </View>
        )


    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebebeb'
    },

   
})


