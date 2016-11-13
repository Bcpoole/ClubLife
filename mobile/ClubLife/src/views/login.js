

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableNativeFeedback
} from 'react-native';



module.exports = React.createClass({

    //TODO: 4 spaces are better than 2
 render() {

    var TouchableElement = TouchableNativeFeedback;
    //TODO: successful login callback has a static user ID of "Glorybound". We'll eventually do some hacky user auth stuff and pass a real value


    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
         Login:
        </Text>
        <TextInput
            style={styles.textEdit}
            onChangeText={(moreText) => this.setState({moreText})}
            keyboardType="email-address"
            placeholder="email">
        </TextInput>
          <TextInput
            style={styles.textEdit}
            onChangeText={(moreText) => this.setState({moreText})}
            placeholder="password">
        </TextInput>
        <TouchableElement style = {styles.button} onPress = {() => {this.props.callbackOnSuccessfulLogin("Glorybound")}}>
            <View><Text>Submit</Text></View>
        </TouchableElement>
        <TouchableElement style = {styles.button} onPress = {this.props.onGoSignup}>
            <View><Text>Not currently registered? Sign up!</Text></View>
        </TouchableElement>

      </View>
    );
    }
 });





const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  textEdit: {
    height: 40,
    width: 200,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1
  },
});
