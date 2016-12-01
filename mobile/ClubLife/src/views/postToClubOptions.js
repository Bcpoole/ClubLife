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
  Platform,
} from 'react-native';
import Button from 'react-native-button';

export default class PostToClubOptions extends Component {
    //choose between making a post and making an event
    constructor(props) {
        super(props);
    }

    render() {
        var TouchableElement = TouchableOpacity;
        var clubData = this.props.route.state.club;
        var user = this.props.route.state.user;

        var info = "User\n"+JSON.stringify(user)+"\nClubData\n"+JSON.stringify(clubData);

        var content = (
            <View style={{paddingTop: 40}}>
                <View>
                    <Text style={{textAlign: 'center', fontSize: 40, fontWeight: '500', color: 'black'}}>Choose an action:</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', height: 200, width: 360, justifyContent: 'space-around', alignItems: 'center'}}>
                    <Button onPress={()=>this._onGoMakePost()} style={{height: 100, width: 100, fontSize: 20, color: '#800000', borderWidth: 2, borderColor: 'black', textAlign: 'center', textAlignVertical: 'center'}}>
                        Make a post!
                    </Button>
                    <Button onPress={()=>this._onGoMakeEvent()} style={{height: 100, width: 100, fontSize: 20, color: '#800000', borderWidth: 2, borderColor: 'black', textAlign: 'center', textAlignVertical: 'center'}}>
                        Make an event!
                    </Button>
                </View>
            </View>
        );
        return content;
    }

    _onGoBack() {
        this.props.navigator.pop();
    }

    _onGoMakePost() {
        this.props.navigator.push({
            type: "createPost",
            index: this.props.route.index+1,
            state: this.props.route.state
        });
    }

    _onGoMakeEvent() {
        this.props.navigator.push({
            type: "createEvent",
            index: this.props.route.index+1,
            state: this.props.route.state
        });
    }
}
