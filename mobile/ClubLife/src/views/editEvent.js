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

export default class EditEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasData: false,
            data: {}
        };

    }

    render() {
        var TouchableElement = TouchableNativeFeedback;

        var subjectInput = (
            <View>
                <TextInput />
            </View>
        );

        return (
            <View>
                <View>
                    <Text>Subject:</Text>
                    {subjectInput}
                </View>
                <View>
                    <Text>Content:</Text>
                    <TextInput />
                </View>
            </View>
        );
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
