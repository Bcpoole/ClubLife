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
                <Text style={{fontWeight: '500', ...Platform.select({android: {textAlign: 'center'}}), fontSize: 30}}>Events feature coming soon</Text>
                <TouchableElement onPress={()=>{this._onGoBack()}}>
                    <View>
                        <Text style={{...Platform.select({android: {textAlign: 'center'}}), color: 'blue'}}>Go back</Text>
                    </View>
                </TouchableElement>
            </View>
        )
    }

    _onGoBack() {
        this.props.navigator.pop();
    }
}
