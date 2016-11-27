import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableNativeFeedback,
  Image,
  TouchableOpacity,
} from 'react-native';
import LoadingView from '../components/loadingview';
//import TabNavigator from 'react-native-tab-navigator';
import Communications from 'react-native-communications';

export default class ClubEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasData: false,
            data: []
        };
    }

    render() {
        var clubData = this.props.route.state.clubData;
        var user = this.props.route.state.user;


        var TouchableElement = TouchableNativeFeedback;
        return <View><Text>TODO: club event page</Text></View>;
    }

    componentDidMount() {
        /* fetch
    }
    _onDeleteEvent() {
        /* confirm the deletion */
    }

    _onGoEditEvent(event) {
        var nextState = Object.assign({}, this.props.route.state, {event: event});
        this.props.navigator.push({
            type: "editEvent",
            index: this.props.route.index+1,
            state: nextState
        });
    }

    _onGoCreateEvent() {
        this.props.navigator.push({
            type: "createEvent",
            index: this.props.route.index+1,
            state: this.props.route.state
        });
    }

    _onGoEvent(event) {
        var nextState = Object.assign({}, this.props.route.state, {event: event});
        this.props.navigator.push({
            type: "event",
            index: this.props.route.index+1,
            state: nextState
        });
    }
}
