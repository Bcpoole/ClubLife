import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableNativeFeedback,
  Platform,
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

        var goToEdit = <Text></Text>;
        var userId = this.props.route.state.user.id;
        if(this.club.leaders.includes(userId) || this.club.officers.includes(userId)) {
            goToEdit = (
                <Button onPress={()=>this._onGoEditPost()} style={{fontSize: 20, color: 'blue'}}>
                    Edit this post
                </Button>
            );
        }

        return (
          <View style={{paddingTop: 40}}>
            <View>
                <Text style={{fontSize: 25, color:'#800000', ...Platform.select({android: {textAlign: 'center'}}),marginTop:20}}>{this.club.name}</Text>
            </View>
            <View style = {styles.topBox}>
                <Text style={{borderWidth:1, borderRadius:5,padding:3, marginRight:5, fontSize:15, fontWeight:'bold',borderColor:'grey'}}>{this.authorName}</Text>

            </View>
            <Text style={{marginLeft:10}}>{this.post.subject}</Text>

            <View style={[styles.topBox,{borderWidth:1}]}>
                <Text>{this.post.content}</Text>
            </View>
            <View>
                <Text>{timeText}</Text>
            </View>
            <View>
                {goToEdit}
            </View>
          </View>
        );
      }

      _onGoBack() {
          this.props.navigator.pop();
      }

      _onGoEditPost() {
          this.props.navigator.push({
              type: 'editPost',
              index: this.props.route.index+1,
              state: Object.assign({}, this.props.route.state, {post: this.post})
          });
      }
}


const styles = StyleSheet.create({
  container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
  },
  topBox:{
     // height:25,
      flexDirection: 'row',
      //borderWidth:1,
      marginRight:10,
      marginLeft:10,
      marginTop:20,
      flexWrap: 'wrap',
      paddingLeft:10,
      paddingTop:10,
      paddingBottom:10
    },

  ClubLife: {
      fontSize: 50,
      ...Platform.select({android: {textAlign: 'center'}}),
      color: 'white',
      backgroundColor: 'black',
      fontWeight: 'bold',
  },
  announcements: {
      fontSize: 30,
      ...Platform.select({android: {textAlign: 'center'}}),
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
      ...Platform.select({android: {textAlign: 'center'}}),
      color: '#FFFFFF'
  },
  newsFeed: {
      fontSize: 25,
      ...Platform.select({android: {textAlign: 'center'}}),
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
