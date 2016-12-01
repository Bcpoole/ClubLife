import React, { Component } from 'react';
import {
  AppRegistry, StyleSheet, Text, View, TextInput,
  TouchableNativeFeedback, Image, TouchableOpacity,
  Platform
} from 'react-native';

const MIN_PASSWORD_LENGTH = 1;

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            name: '',
            passwordPlainText: '', //not sure how else to store the state...
            confirmPasswordPlainText: ''
        };
        this._onSignup = this._onSignup.bind(this);
        this._navigateSignup = this._navigateSignup.bind(this);
        this._addUser = this._addUser.bind(this);
    }

    /*
        @param more time this semester for better authentication
        ...I wish :'(
    */
    _addUser() {
        let url = "http://skeleton20161103012840.azurewebsites.net/api/Users/new";
        let body = {
            "username": this.state.email,
            "name": this.state.name,
            //password: "pls do not look at this code",
            "clubs": []
        };
        let parseResponse = res => res.text().then(text => text ? JSON.parse(text) : {});
        fetch(url, {method: "PUT", headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(body)})
            .then(parseResponse)
            .then(json => {
                //console.log("Added user lmao");
            })
            .catch(e => console.error(e));
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

    _navigateSignup() {
        this.props.navigator.push({
            "type": "login",
            index: this.props.route.index+1,
            state: this.props.route.state
        });
    }

    _onSignup() {
        if((this.state.passwordPlainText.length >= MIN_PASSWORD_LENGTH) &&
            (this.state.passwordPlainText === this.state.confirmPasswordPlainText) && this.state.email) {
                this._addUser();
                this._navigateSignup();
        }
    }

    render() {
        var TouchableElement = Platform.select({
            android: TouchableNativeFeedback,
            ios: TouchableOpacity
        });

        var passwordsValid = (this.state.passwordPlainText === this.state.confirmPasswordPlainText) &&
            this.state.passwordPlainText.length >= MIN_PASSWORD_LENGTH;

        var validMatchingPasswordsText = "Password and confirm password field " +
            (passwordsValid ? "" : "do not ") +
            "match and meet the requirements";

        return (
        <View style={styles.container}>
            <View>
                <Text style={{fontWeight: "500", fontSize: 20, ...Platform.select({android: {textAlign: 'center'}})}}>Signup Page:</Text>
                <Text>Email:</Text>
                <TextInput
                    style={{height: 40}}
                    onChangeText={(text)=>{this.setState({email: text})}}
                    value={this.state.email}
                    keyboardType={"email-address"}
                />
                <Text>Name:</Text>
                <TextInput
                    style={{height: 40}}
                    onChangeText={(text)=>{this.setState({name: text})}}
                    value={this.state.name}
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
                <Text style={{...Platform.select({android: {textAlign: 'center', color: passwordsValid ? 'green' : 'red'}})}}>{validMatchingPasswordsText}</Text>
                <TouchableElement onPress={()=>this._onSignup()}>
                    <View><Text style={{fontWeight: "600", fontSize: 16, ...Platform.select({android: {textAlign: 'center'}}), color: passwordsValid ? 'black' : '#F5FCFF'}}>SIGN ME UP!</Text></View>
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
    marginTop: 40
  },
  welcome: {
    fontSize: 20,
    ...Platform.select({android: {textAlign: 'center'}}),
    margin: 10,
  },
  instructions: {
    ...Platform.select({android: {textAlign: 'center'}}),
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    ...Platform.select({android: {textAlign: 'center'}}),
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
