import React, { Component } from 'react';
import { Navigator, Text, StyleSheet, View, TouchableNativeFeedback, Image, TouchableOpacity, Platform } from 'react-native';


import HomePage from '../views/HomePageView';
import Signup from '../views/signup';
import Login from '../views/login';
import Club from '../views/club';
import Profile from '../views/profile';
import FindAClub from '../views/findaclub';
import FindAnEvent from '../views/findAnEvent';
import EditClub from '../views/EditClub';
import ClubPage from '../views/clubPage';
import ClubInfo from '../views/clubInfo';
import EditProfile from '../views/editProfile';
import ChooseSearch from '../views/chooseSearch';
import PendingMembers from '../views/pendingMembers';
import PostToClubOptions from '../views/postToClubOptions';
import EditEvent from '../views/editEvent';
import EditPost from '../views/editPost';
import ClubEvents from '../views/clubEvents';
import MyEvents from '../views/myEvents';
import Event from '../views/event';
import Post from '../views/post';

var TouchableElement = Platform.select({
    android: TouchableNativeFeedback,
    ios: TouchableOpacity
});



export default class ClubLifeNavigator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            clubList: [],
            eventList: []
        };
    }

    _fetchClubInfo() {
        const url = "https://skeleton20161103012840.azurewebsites.net/api/organizations";
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
            index: 0,
            state: {}
        };

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
                    this._fetchClubInfo();
                    scene = (
                        <Login navigator={navigator} route={route} />
                    );
                    break;
                case "homepage":
                    scene = (
                        <HomePage navigator={navigator} route={route}
                            clubList={this.state.clubList}/>
                    );
                    break;
                case "club":
                    scene = (
                        <Club navigator={navigator} route={route} />
                    );
                    break;
                case "event":
                    scene = (
                        <Event navigator={navigator} route={route} />
                    );
                    break;
                case "makeEvent":
                    scene = (
                        <makeEvent navigator={navigator} route={route} />
                    );
                    break;
                case "profile":
                    scene = (
                        <Profile navigator={navigator} route={route}
                            clubList = {this.state.clubList}
                            type={"profile"}/>
                    );
                    break;
                case "editProfile":
                    scene = (
                        <EditProfile navigator={navigator} route={route}
                            clubList = {this.state.clubList}/>
                    );
                    break;
                case "choosesearch":
                    scene = (
                        <ChooseSearch navigator={navigator} route={route} />
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
                        <FindAnEvent navigator={navigator} route={route}
                            eventList={this.state.eventList}/>
                    );
                    break;
                case "clubPage":
                    scene = (
                        <ClubPage navigator={navigator} route={route} clubList={this.state.clubList} />
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
                case "pendingMembers":
                    scene = (
                        <PendingMembers navigator = {navigator} route={route} />
                    );
                    break;
                case "postToClubOptions":
                    scene = (
                        <PostToClubOptions navigator={navigator} route={route} />
                    );
                    break;
                case "editEvent":
                    scene = (
                        <EditEvent navigator={navigator} route={route}
                            type = {"edit"} />
                    );
                    break;
                case "createEvent":
                    scene = (
                        <EditEvent navigator={navigator} route={route}
                            type = {"create"}/>
                    );
                    break;

                case "editPost":
                    scene = (
                        <EditPost navigator={navigator} route={route}
                            type = {"edit"} />
                    );
                    break;

                case "createPost":
                    scene = (
                        <EditPost navigator={navigator} route={route}
                            type={"create"} />
                    );
                    break;

                case "memberPage":
                    scene = (
                        <Profile navigator={navigator} route={route}
                            clubList = {this.state.clubList}
                            type={"memberPage"} />
                    );
                    break;

                case "clubEvents":
                    scene = (
                        <ClubEvents navigator={navigator} route={route} />
                    );
                    break;

                case "myEvents":
                    scene = (
                        <MyEvents navigator={navigator} route={route} />
                    );
                    break;
                case "post":
                    scene = (
                        <Post navigator={navigator} route={route} />
                    );
                    break;
                default:
                    //oh shi-
                    scene = (
                        <View><Text>
                            {`Something went horribly wrong with routing.
                            Maybe you made the route type wrong.
                            Maybe you forgot a break statement.
                            Maybe it's something else.`}
                        </Text></View>
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

const styles = StyleSheet.create({
  navBar: {
      height: 40
  },

  navBarText: {
      marginVertical: 2,
      color: 'gray',
      textAlignVertical: 'center',
  },

  navBarTitleText: {
      color: 'gray',
      fontWeight: '500',
      marginVertical: 1,
      textAlign: 'right',
  },

  navBarLeftButton: {
      paddingLeft: 15,
  },

  navBarRightButton: {
      paddingRight: 15,
  }
});

var navbar = (
    <Navigator.NavigationBar
        routeMapper={{
            LeftButton: (route, navigator, index, navState) => {
                var button = "";
                button = (route.index ?
                    <TouchableElement style={styles.navBarLeftButton} onPress={()=>{navigator.pop()}}>
                        <View style={{height: 10,flexDirection:'row', alignItems: 'center'}}>
                             <Image style={{height:20,width:20,marginLeft:10}} source={require('../views/images/back.jpg')} />
                        </View>
                    </TouchableElement> :
                    <TouchableElement style={styles.navBarLeftButton} onPress={()=>{console.log("Secret")}}>
                        <View>
                            <Text style={styles.navBarText}>Welcome to:</Text>
                        </View>
                    </TouchableElement>
                );
                return button;
            },
            RightButton: (route, navigator, index, navState) => {
                var button = "";
                button = (route.index && route.type !== "signup" ?
                    <TouchableElement style={styles.navBarRightButton} onPress={()=>{navigator.resetTo({type: "login", index: 0, state: {}})}}>
                        <View style={{height: 10,flexDirection:'row', alignItems: 'center'}}>
                             <Image style={{height:20,width:20,marginRight:10}} source={require('../views/images/logout.png')} />
                        </View>
                    </TouchableElement> : ""
                );
                return button;
            },
            Title: (route, navigator, index, navState) => {
                return (<TouchableElement onPress={()=>{route.type !== "login" && route.type !== "signup" && navigator.push({type: "homepage", index: route.index+1, state: route.state})}}>
                    <View><Text style={styles.navBarTitleText}>ClubLife</Text></View>
                </TouchableElement>);
            },
        }}
        style={styles.navBar}
        navigationStyles={Navigator.NavigationBar.StylesIOS}
    />
);
