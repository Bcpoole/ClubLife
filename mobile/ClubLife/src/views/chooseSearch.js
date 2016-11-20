import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableNativeFeedback,
  Image,
  TouchableOpacity,
} from 'react-native';


//import TabNavigator from 'react-native-tab-navigator';
import Communications from 'react-native-communications';

export default class ChooseSearch extends Component {
    constructor(props) {
        super(props);
        }

        render() {

        return(
        <View style={{backgroundColor: '#F5FCFF'}}>
            <Text style={styles.title}>Which would you like to search?</Text>

            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', paddingLeft: 10}}>
                <Image style={styles.pictures} source={require('./Club-Icon.jpeg')} />
                <Image style={styles.pictures} source={require('./Events-Icon.jpeg')} />
            </View>

            <View style={{width: 365, height: 100, flexDirection: 'row', justifyContent: 'space-around', paddingLeft: 13, paddingTop: 75}}>
                <TouchableHighlight onPress={this.props.onGoFindAClub}><Text style={styles.subtitles}>Search Clubs</Text></TouchableHighlight>
                <TouchableHighlight onPress={this.props.onGoFindAnEvent}><Text style={styles.subtitles}>Search Events</Text></TouchableHighlight>
            </View>
        </View>
        );
    }
}

    module.exports = ChooseSearch;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    options: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F5FCFF',
    },

    icons: {
        flex: 1,
        flexDirection: 'column',
        height: 100,
        width: 100,
        justifyContent: 'space-between',
        backgroundColor: '#F5FCFF',
    },

    pictures: {
        height: 80,
        width: 80,
    },

    subtitles: {
        fontSize: 15,
        fontWeight: 'bold',
    },

    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: 50,
        paddingBottom: 50,
    },
});