import React, { Component } from 'react';
import { Navigator, Text, StyleSheet, View, TouchableNativeFeedback } from 'react-native';
import HomePage from '../views/HomePageView';
var Login =require('../views/login');
import TestPage from '../views/testpage';
import OtherTestPage from '../views/othertestpage';
import Club from '../views/club';
import Profile from '../views/profile';
import EditProfile from '../views/editProfile';

var TouchableElement = TouchableNativeFeedback; //TODO: not this


export default class ClubLifeNavigator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ""
        };
    }

    render() {
        //initial route for navigation
        var initialRoute = this.props.initialRoute || {
            type: 'login',
            index: 0
        }

        //determine which scene to render based on route information.
        var renderScene = (route, navigator) => {
            var scene = "";
            switch(route.type) {
                case "login":

                    scene = (
                        <Login
                            navigator={navigator}
                            onSuccessfulLogin={()=>{
                                const leIndex = route.index+1;
                                navigator.push({
                                    "type": "homepage",
                                    index: leIndex,
                                    userId: "1"
                                })
                            }}
                        />
                    );
                    break;
                case "homepage":
                    scene = (
                        <HomePage
                            onGoHome={()=>{
                                const leIndex = route.index+1;
                                navigator.push({
                                    "type": "homepage",
                                    index: leIndex,
                                })
                            }}
                            onGoProfile={()=>{
                                const leIndex = route.index + 1;
                                navigator.push({
                                    "type": "profile",
                                    index: leIndex
                                })
                            }}
                            onGoEvents={()=>{
                                const leIndex = route.index + 1;
                                navigator.push({
                                    "type": "testpage",
                                    index: leIndex
                                })
                            }}
                        />
                    );
                    break;
                case "club":
                    scene = (
                        <Club

                        />
                    ); //TODO later: integrate props in meaningful fashion
                    break;
                case "profile":
                    scene = (
                        <Profile
                            onGoEditProfile={()=>{
                                const leIndex = route.index + 1;
                                navigator.push({
                                    "type": "editProfile",
                                    index: leIndex
                                })
                            }}
                        />
                    );
                    break;
                case "editProfile":
                    scene = (
                        <EditProfile
                            onGoProfile={()=>{
                                if(route.index > 0) {
                                    navigator.pop();
                                }
                            }}
                        />
                    );
                    break;
                case "testpage":
                    scene = (
                        <TestPage
                            navigator={navigator}
                            onGoOther={()=>{
                                const leIndex = route.index + 1;
                                navigator.push({
                                    "type": "othertestpage",
                                    index: leIndex
                                });
                            }}
                            onGoBack={()=>{
                                if(route.index > 0) {
                                    navigator.pop();
                                }
                            }}
                            onGoForward={()=>{
                                
                            }}
                        />
                    );
                    break;
                case "othertestpage":
                    scene = (
                        <OtherTestPage
                            navigator={navigator}
                            onGoOther={()=>{
                                const leIndex = route.index + 1;
                                navigator.push({
                                    type: "testpage",
                                    index: leIndex
                                })
                            }}
                            onGoBack={()=>{
                                if(route.index > 0) {
                                    navigator.pop();
                                }
                            }}
                            onGoForward={()=>{

                            }}
                        />

                    );
                    break;
                default:
                    //oh shi-
                    scene = (
                        <View><Text>Something went horribly wrong with routing.</Text></View>
                    );
            }
            return scene;
        };

        //conigure the scene transition based on route information.
        var configureScene = (route, routeStack) => {
            return Navigator.SceneConfigs.FloatFromBottom; //TODO: different transitions based on different routes?
        };

        return (
            <Navigator
                initialRoute={initialRoute}
                renderScene={renderScene}
                configureScene={configureScene}
                navigationBar={navbar}
            />
        );
    }
}

/*
    Styles
*/

const styles = StyleSheet.create({
    navbar: {
        marginBottom: 40
    }
});

var navbar = (
    <Navigator.NavigationBar
        routeMapper={{
            LeftButton: (route, navigator, index, navState) => {
                var button = "";
                switch(route.type) {
                        case "login":
                            button = (
                                <Text></Text> //empty
                            );
                            break;
                        case "profile":
                            button = (
                                <TouchableElement onPress={()=>{navigator.pop()}}><Text>BABYGOTBACK</Text></TouchableElement>
                            );
                        default:
                            button = <Text>⚾</Text>;

                }
                return button;
            },
            RightButton: (route, navigator, index, navState) => {
                return (<Text>☃</Text>);
            },
            Title: (route, navigator, index, navState) => {
                return (<Text style={{flex: 1, justifyContent: 'center'}}>ClubLife</Text>);
            },
        }}
        style={styles.navbar}
    />
);
