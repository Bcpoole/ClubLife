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
            <View style={{paddingTop: 40, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center', paddingTop: 40, paddingBottom: 40}}>My Events feature coming soon!</Text>
                            <TouchableElement onPress={()=>{this._onGoBack()}}>
                                <View style={{backgroundColor: '#D3D3D3', borderWidth: 1.5, borderColor: 'black', height: 40, width: 75}}>
                                    <Text style={{fontSize: 15, color: 'black', fontWeight: 'bold', paddingTop: 5, ...Platform.select({android: {textAlignVertical: 'center'}}), ...Platform.select({android: {textAlign: 'center'}})}}>Go Back</Text>
                                </View>
                            </TouchableElement>
                        </View>
        )
    }

    _onGoBack() {
        this.props.navigator.pop();
    }
}
