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

export default class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasData: false,
            data: {}
        };
        this.type = this.props.type || ""; //expecting "edit" or "create"
    }

    render() {
        var TouchableElement = TouchableNativeFeedback;
        return "";
    }

    _onSubmit() {

    }

    _makePostRequest() {

    }

    _makeUpdateRequest() {

    }

    _onCancel() {

    }
}
