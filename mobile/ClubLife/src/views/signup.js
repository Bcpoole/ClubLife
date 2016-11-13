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

const MIN_PASSWORD_LENGTH = 1;

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            passwordPlainText: '', //not sure how else to store the state...
            confirmPasswordPlainText: ''
        };
        this.onSignup = this._onSignup.bind(this);
    }

    _hashString(s){
        //do some initial hashing work so we don't send passwords over the network in the clear, I guess

        //ideally we'd be using some other library etc. etc. for user auth
        //but we're running out of time in the semester soOOoooO we're going with quick hacks
        //across the board :(
        var hash = 0, i, chr, len;
        if (s.length === 0) return hash;
        for (i = 0, len = s.length; i < len; i++) {
          chr   = s.charCodeAt(i);
          hash  = ((hash << 5) - hash) + chr;
          hash |= 0; // Convert to 32bit integer
        }
        return hash+""; //Convert final result back to a string
    }

    _onSignup(){
        if(this.state.passwordPlainText && (this.state.passwordPlainText.length >= MIN_PASSWORD_LENGTH) &&
            (this.state.passwordPlainText === this.state.confirmPasswordPlainText) && this.state.email) {
                this.props.onSignup();
        }
    }

    render() {
        var TouchableElement = TouchableNativeFeedback;

        var validMatchingPasswordsText = "Password and confirm password field " + (
            ((this.state.passwordPlainText === this.state.confirmPasswordPlainText) &&
                this.state.passwordPlainText.length >= MIN_PASSWORD_LENGTH) ? "" : "do not ") +
            "match and meet the requirements";

        return (
        <View style={styles.container}>
            <View>
                <Text>(unstyled) signup page</Text>
                <Text>Email:</Text>
                <TextInput
                    style={{height: 40}}
                    onChangeText={(text)=>{this.setState({email: text})}}
                    value={this.state.email}
                    keyboardType={"email-address"}
                />
                <Text>Password:</Text>
                <TextInput
                    style={{height: 40}}
                    onChangeText={(text)=>{this.setState({passwordPlainText: text})}}
                    secureTextEntry={true}
                />
                <Text>Confirm password:</Text>
                <TextInput
                    style={{height: 40}}
                    onChangeText={(text)=>{this.setState({confirmPasswordPlainText: text})}}
                    secureTextEntry={true}
                />
                <Text>...</Text>
                <Text>{validMatchingPasswordsText}</Text>
                <TouchableElement onPress={this.onSignup}>
                    <View><Text>SIGN ME UP</Text></View>
                </TouchableElement>
            </View>
        </View>


        );
        }

}

module.exports = Signup;

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
