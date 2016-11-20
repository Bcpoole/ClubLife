import React, { Component } from 'react';
import {
  AppRegistry, Alert, Button, StyleSheet, Text, View, TextInput, ScrollView,
  TouchableNativeFeedback, Image, TouchableOpacity, TouchableHighlight,
} from 'react-native';

class EditProfile extends Component {
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
                    <TextInput
                        style={styles.textEdit}
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({text})}
                        placeholder="Spongebob Squarepants"/>
                    <Text style = {{paddingTop: 10}}></Text>
                    <TextInput
                        style={styles.textEdit}
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({text})}
                        placeholder="spongebob@gmail.com"/>


                </View>

            </View>
            <Text style = {styles.welcome}>Clubs:</Text>
            <ScrollView>
                <View style = {styles.clubs}>
                    <Text style = {styles.instructions}>Krusty Krab Cooks</Text>
                    <TouchableHighlight onPress = {()=>{Alert.alert("Leave Club?", "Are you sure you want to leave this club?",[{text: 'Yes', onPress: () => console.log('Yes Pressed!')}, {text: 'No', onPress: () => console.log('No Pressed')}])}}>
                        <Image style = {styles.deleteButton} source={require('./delete.jpg')} />
                    </TouchableHighlight>
                </View>
                <View style = {styles.clubs}>
                    <Text style = {styles.instructions}>Bubble Blowers</Text>
                    <TouchableHighlight onPress = {()=>{Alert.alert("Leave Club?", "Are you sure you want to leave this club?",[{text: 'Yes', onPress: () => console.log('Yes Pressed!')}, {text: 'No', onPress: () => console.log('No Pressed')}])}}>
                        <Image style = {styles.deleteButton} source={require('./delete.jpg')} />
                    </TouchableHighlight>
                </View>
                <View style = {styles.clubs}>
                    <Text style = {styles.instructions}>Jellyfishing</Text>
                    <TouchableHighlight onPress = {()=>{Alert.alert("Leave Club?", "Are you sure you want to leave this club?",[{text: 'Yes', onPress: () => console.log('Yes Pressed!')}, {text: 'No', onPress: () => console.log('No Pressed')}])}}>
                        <Image style = {styles.deleteButton} source={require('./delete.jpg')} />
                    </TouchableHighlight>
                </View>
            </ScrollView>

            <Text style = {styles.welcome}>Events:</Text>
            <ScrollView>
                <View style = {styles.events}>
                    <Text style = {styles.instructions}>Jellyfishing Practice</Text>
                    <Text style = {styles.instructions}>[Tues. 6:00 pm]</Text>
                    <TouchableHighlight onPress = {()=>{Alert.alert("Leave Event?", "Are you sure you want to leave this event?",[{text: 'Yes', onPress: () => console.log('Yes Pressed!')}, {text: 'No', onPress: () => console.log('No Pressed')}])}}>
                        <Image style = {styles.deleteButton} source={require('./delete.jpg')} />
                    </TouchableHighlight>
                </View>
                <View style = {styles.events}>
                    <Text style = {styles.instructions}>Bubble Party</Text>
                    <Text style = {styles.instructions}>[Fri. 8:00 pm]</Text>
                    <TouchableHighlight onPress = {()=>{Alert.alert("Leave Event?", "Are you sure you want to leave this event?",[{text: 'Yes', onPress: () => console.log('Yes Pressed!')}, {text: 'No', onPress: () => console.log('No Pressed')}])}}>
                        <Image style = {styles.deleteButton} source={require('./delete.jpg')} />
                    </TouchableHighlight>
                </View>
            </ScrollView>
            <View style = {styles.finalize}>
                <TouchableHighlight onPress={()=>this._onGoProfile()}>
                    <View style = {styles.bottomConfirm}>
                        <Text style = {{color: 'black', fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}>Confirm</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={()=>this._onGoProfile()}>
                    <View style = {styles.bottomCancel}>
                        <Text style = {{color: 'black', fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}>Cancel</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>

        );
        }

        _onGoProfile() {
            if(this.props.route.index > 1) {
                //assume we came here from the profile, but sanity check
                this.props.navigator.pop();
            }
        }

}

module.exports = EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    justifyContent: 'center',
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
  deleteButton: {
      height: 15,
      width: 15,

  },
  textEdit: {
    height: 40,
    width: 200,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
  },
  box: {
      paddingTop: 25,
      flexDirection: 'row',
      flexWrap: 'wrap',

  },
  longBox: {
      height: 125,
      flexDirection: 'column',
      alignItems: 'center',
      paddingLeft: 25,
  },
  finalize: {
      bottom: 1,
      height: 125,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
  },
  bottomConfirm: {
      height: 50,
      width: 100,
      backgroundColor: 'chartreuse',
      borderColor: 'black',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  bottomCancel: {
        height: 50,
        width: 100,
        backgroundColor: 'red',
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
  clubs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: 100,
        marginRight: 125,
        marginBottom: 2,
        height: 25,
  },
  events: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 2,
        height: 25,
    },
});
