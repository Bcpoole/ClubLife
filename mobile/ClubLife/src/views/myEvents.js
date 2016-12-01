import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableNativeFeedback,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

export default class MyEvents extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var TouchableElement = Platform.select({
            ios: TouchableOpacity,
            android: TouchableNativeFeedback
        });
        return (
            <View style={{paddingTop: 40}}>
                <Text>Events feature coming soon</Text>
                <TouchableElement onPress={()=>{this._onGoBack()}}>
                    <View>
                        <Text>Go back</Text>
                    </View>
                </TouchableElement>
            </View>
        )
    }

    _onGoBack() {
        this.props.navigator.pop();
    }
}
