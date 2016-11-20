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
} from 'react-native';

class ClubPage extends Component {
    constructor(props){
        super(props);
        this.state = {selectedTab: 'home'};
    }

    render (){

        var TouchableElement = TouchableNativeFeedback;
        var clubName = "UA Association for Computing Machinery";
        return(
           <View>

           <Text>{"\n\n"}Mah CLOOBS: </Text>

           <TouchableElement style = {styles.button} onPress = {()=>this._navigateToClub(clubName)}>
              <View><Text>{clubName}</Text></View>
           </TouchableElement>

           </View>


        );

    }

    _navigateToClub(clubName) {
        this.props.navigator.push({
            type: "club",
            index: this.props.route.index+1,
            clubName: clubName
        });
    }

}



module.exports = ClubPage;


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
  pad: {
      justifyContent: 'center',
      alignItems: 'center',

  },
  message: {
      borderWidth: 1,
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
