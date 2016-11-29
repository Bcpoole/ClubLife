import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableNativeFeedback
} from 'react-native';
import Button from 'react-native-button';

export default class Post extends Component {
    constructor(props){
        super(props);
        this.post = this.props.route.state.post;
        this.authorName = this.props.route.state.authorName;
        this.club = this.props.route.state.club;
    }
    render() {
        let headerText = `Post by ${this.authorName} in ${this.club.name}:`;
        let timeText = `Posted ${new Date(this.post.created).toString()}`;

        return (
          <View style={{paddingTop: 40}}>
            <View>
                <Text>{headerText}</Text>
            </View>
            <View>
                <Text>{this.post.subject}</Text>
            </View>
            <View>
                <Text>{this.post.content}</Text>
            </View>
            <View>
                <Text>{timeText}</Text>
            </View>
            <Button onPress={()=>this._onGoBack()} style={{fontSize: 20, color: 'green'}}>
                    Go back</Button>
          </View>
        );
      }

      _onGoBack() {
          this.props.navigator.pop();
      }
}


const styles = StyleSheet.create({
  container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
  },
  ClubLife: {
      fontSize: 50,
      textAlign: 'center',
      color: 'white',
      backgroundColor: 'black',
      fontWeight: 'bold',
  },
  announcements: {
      fontSize: 30,
      textAlign: 'center',
      color: 'black',
      backgroundColor: 'powderblue',
      paddingTop: 10,
      paddingBottom: 30,
      fontWeight: 'bold',
  },
  BottomBar: {
      fontSize: 12,
      color: 'black',
      backgroundColor: 'skyblue',
  },
  bottomIcon: {
      width: 25,
      height: 25,
      backgroundColor: 'skyblue',
  },

  description: {
      fontSize: 10,
      textAlign: 'center',
      color: '#FFFFFF'
  },
  newsFeed: {
      fontSize: 25,
      textAlign: 'center',
      justifyContent: 'center',
      color: 'black',
      backgroundColor: 'powderblue',
  },
  bold: {
      fontWeight: 'bold',
  },
  newsFeedPadding: {
      paddingBottom: 20,
  },
});
