import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableNativeFeedback,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {textOp: 1, boxOp: 0};
    }
    render() {
        var TouchableElement = TouchableNativeFeedback;
        return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Image style = {styles.profilepic} source={require('./sponge.jpeg')} />
                <View style={styles.longBox}>
                    <Text style={styles.welcome}>
                    Spongebob Squarepants
                    </Text>
                    <Text style = {styles.instructions}>sponge@bob.com</Text>


                </View>

            </View>
            <TouchableHighlight onPress={()=>this._onGoEditProfile()}>
                <View><Image style = {styles.edit} source={require('./edit.png')} /></View>
            </TouchableHighlight>
            <Text style = {styles.welcome}>Clubs:</Text>
            <Text style = {styles.instructions}>Krusty Krab Cooks</Text>
            <Text style = {styles.instructions}>Bubble Blowers</Text>
            <Text style = {styles.instructions}>Jellyfishing Club</Text>
            <Text style = {styles.welcome}>Events:</Text>
            <Text style = {styles.instructions}>Jellyfishing practice [Tues. 6:00 pm]</Text>
            <Text style = {styles.instructions}>Bubble Party           [Fri. 8:00 pm] </Text>
        </View>
        );
        }
    _onGoEditProfile() {
        this.props.navigator.push({
            type: "editProfile",
            index: this.props.route.index+1,
            user: this.props.route.user
        })
    }
}

module.exports = Profile;

// module.exports = React.createClass({
//  render() {

//     var TouchableElement = TouchableNativeFeedback;


//     return (
//       <View style={styles.container}>
//         <View style={styles.box}>
//             <Image style = {styles.profilepic} source={require('./sponge.jpeg')} />
//             <View style={styles.longBox}>
//                 <Text style={styles.welcome}>
//                 Spongebob Squarepants
//                 </Text>
//                 <Text style = {styles.instructions}>sponge@bob.com</Text>


//             </View>

//         </View>
//          <TouchableElement style = {styles.button} onPress = {()=>{alert("u")}}>
//                     <View><Image style = {styles.edit} source={require('./edit.png')} /></View>
//                 </TouchableElement>
//       </View>
//     );
//     }
//  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  profilepic: {
      height: 100,
      width: 100

  },
  edit: {
      height: 25,
      width: 25,

  },
  textEdit: {
    height: 40,
    width: 200,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1
  },
  box: {
      flexDirection: 'row',
      flexWrap: 'wrap'

  },
  longBox: {
      height: 125

  }
});
