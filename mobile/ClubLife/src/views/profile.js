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
  TouchableHighlight,
  Platform,
} from 'react-native';
import LoadingView from '../components/loadingview';

export default class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            textOp: 1,
            boxOp: 0,
            hasMemberData: false, //when we use Profile as arbitrary Member page, need to load data asynchronous
            memberData: {}
        };
        this.type = this.props.type || ""; //expecting "profile" or "memberPage"
        this._onGoEditProfile = this._onGoEditProfile.bind(this);
        this._onGoFindAClub = this._onGoFindAClub.bind(this);
        this._onGoClub = this._onGoClub.bind(this);
    }

    render() {
        var user = this.props.route.state.user;
        var clubList = this.props.clubList;
        var userClubIds = user.clubs;
        var userClubs = [];
        for(let userClubId of userClubIds) {
            //in the interest of saving coding time, this code is obviously slow...TODO: optimize later? (e.g. presort clubs by id and binary search?)
            for(let club of clubList) {
                if(club.id === userClubId) {
                    userClubs.push(club);
                    break;
                }
            }
        }
        var memberId = this.props.route.state.memberId || "";
        //default to "profile" settings, but override if we're a member page
        var name = user.name;
        var username = user.username;
        if(this.type === "memberPage") {
            if(!this.state.hasMemberData) {
                return <LoadingView/>;
            }
            name = this.state.memberData.name;
            username = this.state.memberData.username;
        }

        var TouchableElement = Platform.select({
            ios: TouchableOpacity,
            android: TouchableNativeFeedback
        });
        return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Image style = {styles.profilepic} source={require('./images/sponge.jpeg')} />
                <View style={styles.longBox}>
                    <Text style={styles.welcome}>
                        {name}
                    </Text>
                    <Text style = {styles.instructions}>{username}</Text>
                </View>

            </View>
            {
            this.type === "profile" ?
                <TouchableHighlight onPress={()=>this._onGoEditProfile()}>
                    <View><Image style = {styles.edit} source={require('./images/edit.png')} /></View>
                </TouchableHighlight>
                : <View/>
            }
            <Text style = {styles.welcome}>Clubs:</Text>
            {
                userClubs.length ? (
                    userClubs.map((club) => {
                        return (
                            <TouchableElement onPress={()=>this._onGoClub(club)} key={"club-"+club.id}>
                                <View>
                                    <Text style={styles.instructions}>
                                        {club.name}
                                    </Text>
                                </View>
                            </TouchableElement>
                        );
                    })
                ) :
                <TouchableElement onPress={()=>{
                    if(this.type==="profile") {
                        this._onGoFindAClub()
                    }
                }}>
                    <View><Text style={styles.instructions}>{
                        this.type === "profile" ?
                            "You aren't in any clubs! How about finding a club?"
                            : "Not in any clubs."
                    }</Text></View>
                </TouchableElement>
            }
        </View>
        );
    }

    _onGoEditProfile() {
        this.props.navigator.push({
            type: "editProfile",
            index: this.props.route.index+1,
            state: this.props.route.state
        });
    }

    _onGoFindAClub() {
        this.props.navigator.push({
            type: "findaclub",
            index: this.props.route.index+1,
            state: this.props.route.state
        });
    }

    _onGoClub(club) {
        this.props.navigator.push({
            type: "club",
            index: this.props.route.index+1,
            state: Object.assign({}, this.props.route.state, {club: club})
        });
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 40
  },
  welcome: {
    fontSize: 20,
    ...Platform.select({android: {textAlign: 'center'}}),
    margin: 10,
    color: '#800000',
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
  profilepic: {
      height: 100,
      width: 100

  },
  edit: {
      height: 25,
      width: 25,

  },
  textEdit: {
    height: 40,
    width: 200,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1
  },
  box: {
      flexDirection: 'row',
      flexWrap: 'wrap'

  },
  longBox: {
      height: 125

  }
});
