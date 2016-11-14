import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableNativeFeedback
} from 'react-native';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMadeAuthenticatonAttempt: false,
            isAuthenticating: false,
            authenticated: false,
            emailPlainText: '',
            passwordPlainText: '',
            user: '',
        };

        this._hashString = this._hashString.bind(this);
        this._authenticate = this._authenticate.bind(this);
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

    _authenticate() {
        //TODO: remove the snippet below and have real authentication
        this.setState({
            authenticated: true,
            isAuthenticating: false,
            user: 'bcpoole@crimson.ua.edu'
        }, () => {this.props.callbackOnSuccessfulLogin(this.state.user);});
        return;


        //TODO: make a GET request on an authentication api endpoint with the user's email and hash of the password
        this.setState({
            isAuthenticating: true,
            authenticated: false
        });
        var email = this.state.emailPlainText;
        var pass = this._hashString(this.state.passwordPlainText);
        fetch("TODO: ENDPOINT WITH SENDING INFORMATION OF USER EMAIL AND PASSWORD HASH")
            .then(res => res.json())
            .then(json => {
                var authenticated = /* some function of the json */ true; //TODO: do not auto-authenticate lmao
                if(authenticated) {
                    this.setState({
                        isAuthenticating: false,
                        hasMadeAuthenticatonAttempt: true,
                        authenticated: true,
                        user: json //TODO: what user are we? how do we get that info? need endpoint
                    }, () => {this.props.callbackOnSuccessfulLogin(this.state.user);});
                }
                else {
                    this.setState({
                        isAuthenticating: false,
                        hasMadeAuthenticatonAttempt: true,
                        authenticated: false
                    });
                }
            })
            .catch(e => {
                //TODO: handle authentication error properly
            })
    }

    render() {

        var TouchableElement = TouchableNativeFeedback;
        //TODO: successful login callback has a static user ID of "bcpoole@crimson.ua.edu". We'll eventually do some hacky user auth stuff and pass a real value

        var authenticationStatus = '';
        if(this.state.authenticated) {
            authenticationStatus = (<Text>\\`You are authenticated with ${}`</Text>);
        }


        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Login:
                </Text>
                <TextInput
                    style={styles.textEdit}
                    onChangeText={(moreText) => this.setState({emailPlainText: moreText})}
                    keyboardType="email-address"
                    placeholder="email"
                />
                <TextInput
                    style={styles.textEdit}
                    onChangeText={(moreText) => this.setState({passwordPlainText: moreText})}
                    placeholder="password"
                    secureTextEntry={true}
                />
                <TouchableElement style = {styles.button} onPress = {() => {this._authenticate()}}>
                    <View><Text>Submit</Text></View>
                </TouchableElement>
                <TouchableElement style = {styles.button} onPress = {this.props.onGoSignup}>
                    <View><Text>Not currently registered? Sign up!</Text></View>
                </TouchableElement>
                {authenticationStatus}
            </View>
        );
    }
}





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
