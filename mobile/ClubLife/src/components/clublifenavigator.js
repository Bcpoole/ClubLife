import React, { Component } from 'react';
import { Navigator, Text, StyleSheet, View, TouchableNativeFeedback } from 'react-native';


import HomePage from '../views/HomePageView';
import Signup from '../views/signup';
var Login = require('../views/login');
import TestPage from '../views/testpage';
import OtherTestPage from '../views/othertestpage';
import Club from '../views/club';
import Profile from '../views/profile';
//import FindAClub from '../views/findaclub';
//import FindAClubResults from '../views/findaclubresults';
//import FindAnEvent from '../views/findanevent';
//import FindAnEventResults from '../views/findaneventresults';
import AllViews from '../views/allviews.js';
import EditClub from '../views/EditClub';
import ClubPage from '../views/clubPage';
import ClubInfo from '../views/clubInfo';

var TouchableElement = TouchableNativeFeedback; //TODO: not this


export default class ClubLifeNavigator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: ""
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
                case "signup":
                    scene = (
                        <Signup
                            navigator={navigator}
                            onSignup={()=>{
                                const leIndex = route.index+1;
                                navigator.push({
                                    "type": "login",
                                    index: leIndex
                                });
                            }}
                        />
                    );
                    break;
                case "login":
                    scene = (
                        <Login
                            navigator={navigator}
                            callbackOnSuccessfulLogin={(userId)=>{
                                const leIndex = route.index+1;
                                this.setState({
                                    userId: userId
                                });
                                navigator.push({
                                    "type": "homepage",
                                    index: leIndex
                                });
                            }}
                            onGoSignup={()=>{
                                const leIndex = route.index+1;
                                navigator.push({
                                    "type": "signup",
                                    index: leIndex
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
                                    index: leIndex
                                })
                            }}
                            onGoProfile={()=>{
                                const leIndex = route.index + 1;
                                navigator.push({
                                    "type": "profile",
                                    index: leIndex
                                })
                            }}
                            onGoFindAnEvent={()=>{
                                const leIndsex = route.index + 1;
                                navigator.push({
                                    "type": "findanevent",
                                    index: leIndsex
                                })
                            }}
                            onGoClubList={()=>{
                                const leIndsex = route.index + 1;
                                navigator.push({
                                    "type": "clubPage",
                                    index: leIndsex
                                })
                            }}
                            onGoFindAClub={()=>{
                                const leIndsex = route.index + 1;
                                navigator.push({
                                    "type": "findaclub",
                                    index: leIndsex
                                })
                            }}
                        />
                    );
                    break;
                case "club":
                    scene = (
                        <Club
                            onGoEditClub={()=>{
                                const leIndex = route.index+1;
                                navigator.push({
                                    "type": "EditClub",
                                    index: leIndex,
                                })
                            }}
                            onGoClubInfo={()=>{
                                const leIndex = route.index+1;
                                navigator.push({
                                    "type": "clubInfo",
                                    index: leIndex,
                                })
                            }}
                        />
                      
                    ); //TODO later: integrate props in meaningful fashion
                    break;
                case "profile":
                    scene = (
                        <Profile

                        />
                    );
                    break;
                case "findaclub":
                    scene = (
                        <FindAClub

                        />
                    );
                    break;
                case "findanevent":
                    scene = (
                        <FindAnEvent

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
                case "allviews":
                    //link to all views debug page
                    scene = (
                        <AllViews
                            views={[{
                                name: "login",
                                pressCallback: ()=> {navigator.resetTo({type: 'login', index: 0});}
                            }, {
                                name: "signup",
                                pressCallback: ()=> {navigator.resetTo({type: "signup", index: 0});}
                            }, {
                                name: "homepage",
                                pressCallback: ()=> {navigator.resetTo({type: "homepage", index: 0});}
                            }, {
                                name: "findaclub",
                                pressCallback: ()=> {navigator.resetTo({type: "findaclub", index: 0});}
                            }]}
                        />
                    );
                    break;
                case "clubPage":
                    scene = (
                        <ClubPage
                            navigator = {navigator}
                            onGoClub={()=>{
                                const leIndex = route.index + 1;
                                navigator.push({
                                    type: "club",
                                    index: leIndex
                                })
                            }}
                        />
                        
                    );
                    break;  
                    
                case "EditClub":
                    scene = (
                        <EditClub
                            navigator = {navigator}
                            onGoClub={()=>{
                                const leIndex = route.index + 1;
                                navigator.push({
                                    type: "club",
                                    index: leIndex
                                })
                            }}
                        />
                        
                    );
                    break;
                    
                case "clubInfo":
                    scene = (
                        <ClubInfo
                            onGoClub={()=>{
                                const leIndex = route.index + 1;
                                navigator.push({
                                    type: "club",
                                    index: leIndex
                                })
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
                var button = "";
                switch(route.type) {
                    case "login":
                         button = (
                             <TouchableElement onPress={()=>{navigator.resetTo({type: "allviews", index: 0})}}><View><Text>ALLVIEWS</Text></View></TouchableElement>
                         );
                         break;
                    default:
                        button = (
                            <Text>☃</Text>
                        )
                }
                return button;
            },
            Title: (route, navigator, index, navState) => {
                return (<Text style={{flex: 1, justifyContent: 'center'}}>ClubLife</Text>);
            },
        }}
        style={styles.navbar}
    />
);
