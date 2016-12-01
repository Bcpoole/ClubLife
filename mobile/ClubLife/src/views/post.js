import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
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
        var TouchableElement = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

        let headerText = `Post by ${this.authorName} in ${this.club.name}:`;
        let timeText = `Posted ${new Date(this.post.created).toString()}`;

        var goToEdit = <Text></Text>;
        var userId = this.props.route.state.user.id;
        if(this.club.leaders.includes(userId) || this.club.officers.includes(userId)) {
            goToEdit = (
                      <TouchableElement onPress = {()=>this._onGoEditPost()}>
                <View style = {styles.topBox}>
                    <Text>Edit Post</Text>
                </View>
            </TouchableElement>
            );
        }

        return (
          <View style={{paddingTop: 40}}>
            <View>
                <Text style={{fontSize: 25, color:'#800000', textAlign: 'center',marginTop:20, marginBottom:40}}>{this.club.name}</Text>
            </View>
            <Text style={{marginLeft:10,marginTop:10,color:'#800000',fontSize:20}}>Author:</Text>
            <TouchableElement onPress = {()=>this._onGoProfile()}>
                <View style = {styles.topBox}>
                    <Text style={{borderWidth:1, borderRadius:5,padding:3, marginRight:5, fontSize:15, fontWeight:'bold',borderColor:'grey'}}>{this.authorName}</Text>
                </View>
            </TouchableElement>
            {goToEdit}
            <Text style={{marginLeft:10,marginTop:10,color:'#800000',fontSize:20}}>{this.post.subject}:</Text>

            <View style={[styles.topBox,{borderWidth:1, minHeight:100}]}>
                <Text style={{fontSize:15}}>{this.post.content}</Text>
            </View>
            <View>
                <Text style = {{marginLeft:10}}>{timeText}</Text>
            </View>
            <View>

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

      _onGoProfile() {
          this.props.navigator.push({
              type: 'memberPage',
              index: this.props.route.index+1,
              state: Object.assign({}, this.props.route.state, {memberId: this.post.author})
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
      //marginTop:20,
      flexWrap: 'wrap',
      paddingLeft:10,
      paddingTop:10,
      paddingBottom:10
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
