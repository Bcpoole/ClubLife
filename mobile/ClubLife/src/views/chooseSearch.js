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
  Platform,
} from 'react-native';
import Communications from 'react-native-communications';

export default class ChooseSearch extends Component {
    constructor(props) {
        super(props);
        this._onGoFindAClub = this._onGoFindAClub.bind(this);
        this._onGoFindAnEvent = this._onGoFindAnEvent.bind(this);
    }

    render() {
        return (
            <View style={{backgroundColor: '#F5FCFF', marginTop: 40}}>
                <Text style={styles.title}>Which would you like to search?</Text>

                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', paddingLeft: 10}}>
                    <Image style={styles.pictures} source={require('./images/Club-Icon.jpeg')} />
                    <Image style={styles.pictures} source={require('./images/Events-Icon.jpeg')} />
                </View>

                <View style={{width: 365, height: 100, flexDirection: 'row', justifyContent: 'space-around', paddingLeft: 13, paddingTop: 75}}>
                    <TouchableHighlight onPress={()=>this._onGoFindAClub()}><Text style={styles.subtitles}>Search Clubs</Text></TouchableHighlight>
                    <TouchableHighlight onPress={()=>this._onGoFindAnEvent()}><Text style={styles.subtitles}>Search Events</Text></TouchableHighlight>
                </View>
            </View>
        );
    }

    _onGoFindAClub() {
        this.props.navigator.push({
            type: "findaclub",
            index: this.props.route.index+1,
            state: this.props.route.state
        });
    }

    _onGoFindAnEvent() {
        this.props.navigator.push({
            type: "findanevent",
            index: this.props.route.index+1,
            state: this.props.route.state
        });
    }
}

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
        color: '#800000',
        fontWeight: 'bold',
    },

    title: {
        ...Platform.select({
            android: {textAlign: 'center'},
        }),
        fontWeight: 'bold',
        color: '#800000',
        fontSize: 20,
        paddingTop: 50,
        paddingBottom: 50,
    },
});
