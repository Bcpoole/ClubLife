
 
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
 render() {
    
    var TouchableElement = TouchableNativeFeedback;
    
    
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
         Login:
        </Text>
        <TextInput 
            style={styles.textEdit}
            onChangeText={(moreText) => this.setState({moreText})}
            placeholder="email">
        </TextInput>
          <TextInput 
            style={styles.textEdit}
            onChangeText={(moreText) => this.setState({moreText})}
            placeholder="password">
        </TextInput>
        <TouchableElement style = {styles.button} onPress = {()=>{alert("u")}}>
            <View><Text>Submit</Text></View>
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



 
