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

export default class PostToClubOptions extends Component {
    //choose between making a post and making an event
    constructor(props) {
        super(props);
    }

    render() {
        var TouchableElement = TouchableNativeFeedback;
        var clubData = this.props.route.state.clubData;
        var user = this.props.route.state.user;

        var info = "User\n"+JSON.stringify(user)+"\nClubData\n"+JSON.stringify(clubData);

        var content = (
            <View>
                <View>
                    <Text>Choose an action:</Text>
                </View>
                <TouchableElement onPress={()=>this._onGoMakePost()}>
                    <View>
                        <Text>Make a post!</Text>
                    </View>
                </TouchableElement>
                <TouchableElement onPress={()=>this._onGoMakeEvent()}>
                    <View>
                        <Text>Make an event!</Text>
                    </View>
                </TouchableElement>
                <View>
                    <Text>Note that events may be better configured from the club events page.</Text>
                </View>
                <View>
                    <Text>{info}</Text>
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
