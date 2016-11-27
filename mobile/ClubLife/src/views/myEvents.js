import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableNativeFeedback,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class MyEvents extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{paddingTop: 40}}>
                <Text>Events feature coming soon</Text>
                <TouchableNativeFeedback onPress={()=>{this._onGoBack()}}>
                    <View>
                        <Text>Go back</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }

    _onGoBack() {
        this.props.navigator.pop();
    }
}
