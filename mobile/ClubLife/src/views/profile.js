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
} from 'react-native';

export default class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            textOp: 1,
            boxOp: 0
        };
        this._onGoEditProfile = this._onGoEditProfile.bind(this);
        this._onGoFindAClub = this._onGoFindAClub.bind(this);
        this._onGoClub = this._onGoClub.bind(this);
    }
    render() {
        var user = this.props.route.state.user;
        var clubList = this.props.clubList;
        var userClubIds = user.clubs;
        var userClubs = [];
        for(let userClubId in userClubIds) {
            //in the interest of saving coding time, this code is obviously slow...TODO: optimize later? (e.g. presort clubs by id and binary search?)
            for(let club in clubList) {
                if(club.id === userClubId) {
                    userClubs.push(club);
                    break;
                }
            }
        }

        var TouchableElement = TouchableNativeFeedback;
        return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Image style = {styles.profilepic} source={require('./images/sponge.jpeg')} />
                <View style={styles.longBox}>
                    <Text style={styles.welcome}>
                        {user.name}
                    </Text>
                    <Text style = {styles.instructions}>{user.username}</Text>
                </View>

            </View>
            <TouchableHighlight onPress={()=>this._onGoEditProfile()}>
                <View><Image style = {styles.edit} source={require('./images/edit.png')} /></View>
            </TouchableHighlight>
            <Text style = {styles.welcome}>Clubs:</Text>
            {
                userClubs.length ? (
                    userClubs.map(club => {
                        return (
                            <TouchableElement onPress={()=>this._onGoClub(club)}>
                                <Text style={styles.instructions}>
                                    {club.name}
                                </Text>
                            </TouchableElement>
                        );
                    })
                ) :
                <TouchableElement onPress={()=>this._onGoFindAClub()}>
                    <View><Text style={styles.instructions}>You aren't in any clubs! How about finding a club?</Text></View>
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
