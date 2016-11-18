import React, { Component } from 'react';
import { Navigator, Text, StyleSheet, View, TouchableNativeFeedback } from 'react-native';


import HomePage from '../views/HomePageView';
import Signup from '../views/signup';
import Login from '../views/login';
import Club from '../views/club';
import Profile from '../views/profile';
import FindAClub from '../views/findaclub';
//import FindAnEvent from '../views/findanevent';
import AllViews from '../views/allviews.js';
import EditClub from '../views/EditClub';
import ClubPage from '../views/clubPage';
import ClubInfo from '../views/clubInfo';
import EditProfile from '../views/editProfile';

var TouchableElement = TouchableNativeFeedback; //TODO: not this


export default class ClubLifeNavigator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            clubList: null
        };
    }

    _fetchClubInfo() {
        const url = "http://skeleton20161103012840.azurewebsites.net/api/organizations";
        fetch(url)
            .then(res=>res.json())
            .then(json => {
                this.setState({
                    clubList: json
                })
            })
            .catch(e => {
                console.error(e);
                //TODO: figure out how to navigate back out if something went wrong
            })
    }

    componentDidMount() {
        this._fetchClubInfo();
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
                        <Signup navigator={navigator} route={route} />
                    );
                    break;
                case "login":
                    scene = (
                        <Login navigator={navigator} route={route} />
                    );
                    break;
                case "homepage":
                    scene = (
                        <HomePage navigator={navigator} route={route} />
                    );
                    break;
                case "club":
                    scene = (
                        <Club navigator={navigator} route={route} />
                    );
                    break;
                case "profile":
                    scene = (
                        <Profile navigator={navigator} route={route} />
                    );
                    break;
                case "editProfile":
                    scene = (
                        <EditProfile navigator={navigator} route={route} />
                    );
                    break;
                case "findaclub":
                    scene = (
                        <FindAClub navigator={navigator} route={route}
                            clubList={this.state.clubList}
                        />
                    );
                    break;
                case "findanevent":
                    scene = (
                        <FindAnEvent navigator={navigator} route={route} />
                    );
                    break;
                case "allviews":
                    //link to all views debug page TODO: add all the views lmao
                    scene = (
                        <AllViews navigator={navigator} route={route}
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
                        <ClubPage navigator={navigator} route={route} />
                    );
                    break;
                case "EditClub":
                    scene = (
                        <EditClub navigator = {navigator} route={route} />
                    );
                    break;

                case "clubInfo":
                    scene = (
                        <ClubInfo navigator = {navigator} route={route} />
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
                button = (route.index ?
                    <TouchableElement onPress={()=>{navigator.pop()}}>
                        <View>
                            <Text>⤾</Text>
                        </View>
                    </TouchableElement> :
                    <View>
                        <Text>⚾</Text>
                    </View>
                );
                return button;
            },
            RightButton: (route, navigator, index, navState) => {
                var button = "";
                switch(route.type) {
                    case "login":
                        // if we're on the login page, the snowman button takes you to allviews aka merk's super secret sexy debug menu
                         button = (
                            <TouchableElement onPress={()=>{navigator.resetTo({type: "allviews", index: 0})}}>
                                <View>
                                    <Text>☃</Text>
                                </View>
                            </TouchableElement>
                         );
                         break;
                    default:
                        button = (
                            <View><Text>☃</Text></View>
                        )
                }
                return button;
            },
            Title: (route, navigator, index, navState) => {
                return (<View><Text>ClubLife</Text></View>);
            },
        }}
        style={styles.navbar}
    />
);
