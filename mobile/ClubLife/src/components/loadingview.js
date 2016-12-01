//Universal loading view so I can just import it and type less as time wears on

import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

export default class LoadingView extends Component {
    constructor(props){super(props);}
    render() {
        return (
            <View style={{paddingTop: 40}}>
                <Text>
                    Loading...
                </Text>
            </View>
        );
    }
}
