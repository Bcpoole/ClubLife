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
        this._onSuccessfulLogin = this._onSuccessfulLogin.bind(this);
        this._onGoSignup = this._onGoSignup.bind(this);
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
        /*
            Forgive me, Father, for I have sinned.
            In an effort to graduate on time, we have decided to delay our final spirit bomb for user authentication implementation for right before the demo, and
                in the interest of having something work for the demo in case our spirit bomb falls short, we are going to spoof user authentication.
            May this application never be published anywhere, and let's make user auth the very first thing we get working (correctly)
                on any future personal projects.

            So, the basic idea is that the password field doesn't do anything useful, but if the user email exists for some user in the DB, go ahead and exist as that user.
            TODO: NEVER this in our careers
        */
        this.setState({
            authenticated: false,
            isAuthenticating: true,
            hasMadeAuthenticatonAttempt: true,
            user: null
        }, ()=> {
            var email = this.state.emailPlainText;
            var pass = this._hashString(this.state.passwordPlainText); // :(
            var endpoint = "http://skeleton20161103012840.azurewebsites.net/api/Users/username?username="+email;
            fetch(endpoint)
                .then(res=> {
                    if(res.status !== 200) {
                        this.setState({
                            isAuthenticating: false
                        });
                        return Promise.reject(new Error(res.statusText));
                    }
                    else {
                        return res.json();
                    }
                })
                .then(json=> {
                    this.setState({
                        isAuthenticating: false,
                        authenticated: true,
                        user: json
                    }, ()=>this._onSuccessfulLogin(this.state.user));
                })
                .catch(e => {
                    console.log(e);
                });
        });
    }

    render() {
        var TouchableElement = TouchableNativeFeedback;

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

                <Text style={{paddingTop: 3}}></Text>

                <TextInput
                    style={styles.textEdit}
                    onChangeText={(moreText) => this.setState({passwordPlainText: moreText})}
                    placeholder="password"
                    secureTextEntry={true}
                />

                <Text style={{paddingTop: 3}}></Text>

                <TouchableElement style = {styles.button} onPress = {() => {this._authenticate()}}>
                    <View><Text>Submit</Text></View>
                </TouchableElement>

                <Text style={{paddingTop: 3}}></Text>

                <TouchableElement style = {styles.button} onPress = {()=>this._onGoSignup()}>
                    <View><Text>Not currently registered? Sign up!</Text></View>
                </TouchableElement>

                <Text style={{paddingTop: 3}}></Text>

                {(this.state.hasMadeAuthenticatonAttempt && !this.state.isAuthenticating && !this.state.authenticated) ?
                    <View><Text>authentication attempt failed</Text></View> : <Text></Text>}
            </View>
        );
    }

    _onSuccessfulLogin(user) {
        this.props.navigator.push({
            type: "homepage",
            index: this.props.route.index+1,
            state: Object.assign({}, this.props.route.state, {user: user})
        });
    }

    _onGoSignup() {
        this.props.navigator.push({
            type: "signup",
            index: this.props.route.index+1,
            state: this.props.route.state
        });
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
