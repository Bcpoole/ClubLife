import React, { Component } from 'react';
import {
  AppRegistry, Alert, Button, StyleSheet, Text, View, TextInput, ScrollView,
  TouchableNativeFeedback, Image, TouchableOpacity, TouchableHighlight, Platform,
} from 'react-native';

export default class EditProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            textOp: 1,
            boxOp: 0,
            userState: Object.assign({},this.props.route.state.user), //should work, if we need a deeper copy, investigate later
            nextUserState: Object.assign({}, this.props.route.state.user, {clubs: this.props.route.state.user.clubs.slice()}), //hey, what do you know, we needed a deeper copy
            confirmingChanges: false
        };

        this._onConfirmChanges = this._onConfirmChanges.bind(this);
        this._onCancelChanges = this._onCancelChanges.bind(this);
        this._performChanges = this._performChanges.bind(this);
        this._removeSelfFromClub = this._removeSelfFromClub.bind(this);
        this._postNewUserInfo = this._postNewUserInfo.bind(this);
        this._confirmClubAlert = this._confirmClubAlert.bind(this);
        this._onGoProfileWithChanges = this._onGoProfileWithChanges.bind(this);
    }
    render() {
        var clubList = this.props.clubList;
        var clubs = [];
        for(let userClubId of this.state.nextUserState.clubs) {
            for(let club of clubList) {
                if(club.id === userClubId) {
                    clubs.push(club);
                    break;
                }
            }
        }
        var TouchableElement = Platform.select({
            ios: TouchableOpacity,
            android: TouchableNativeFeedback
        });
        return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Image style = {styles.profilepic} source={require('./images/profile-default.png')} />
                <View style={styles.longBox}>
                    <TextInput
                        style={styles.textEdit}
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({nextUserState: Object.assign(this.state.nextUserState, {name: text})})}
                        placeholder={this.state.nextUserState.name}/>
                    <Text style = {{paddingTop: 10}}></Text>
                    <Text>
                        {this.state.nextUserState.username}
                    </Text>
                </View>

            </View>
            <Text style = {styles.welcome}>Clubs:</Text>
            <ScrollView>
                {clubs.map((club,i) => {
                    return (
                        <View style = {styles.clubs} key={'clubbbb-'+i}>
                            <Text style = {styles.instructions}>{club.name}</Text>
                            <TouchableHighlight onPress = {()=>this._confirmClubAlert()}>
                                <Image style = {styles.deleteButton} source={require('./images/delete.jpg')} />
                            </TouchableHighlight>
                        </View>
                    );
                })}
            </ScrollView>

            <Text style = {styles.welcome}>Events:</Text>
            {/*}<ScrollView>
                <View style = {styles.events}>
                    <Text style = {styles.instructions}>Jellyfishing Practice</Text>
                    <Text style = {styles.instructions}>[Tues. 6:00 pm]</Text>
                    <TouchableHighlight onPress = {()=>{Alert.alert("Leave Event?", "Are you sure you want to leave this event?",[{text: 'Yes', onPress: () => console.log('Yes Pressed!')}, {text: 'No', onPress: () => console.log('No Pressed')}])}}>
                        <Image style = {styles.deleteButton} source={require('./images/delete.jpg')} />
                    </TouchableHighlight>
                </View>
                <View style = {styles.events}>
                    <Text style = {styles.instructions}>Bubble Party</Text>
                    <Text style = {styles.instructions}>[Fri. 8:00 pm]</Text>
                    <TouchableHighlight onPress = {()=>{Alert.alert("Leave Event?", "Are you sure you want to leave this event?",[{text: 'Yes', onPress: () => console.log('Yes Pressed!')}, {text: 'No', onPress: () => console.log('No Pressed')}])}}>
                        <Image style = {styles.deleteButton} source={require('./images/delete.jpg')} />
                    </TouchableHighlight>
                </View>
            </ScrollView>*/}
            <View style={styles.events}>
                <Text style={styles.instructions}>
                    RSVP Events Feature "Coming Soon"
                </Text>
            </View>
            <View style = {styles.finalize}>
                <TouchableHighlight onPress={()=>this._onConfirmChanges()}>
                    <View style = {styles.bottomConfirm}>
                        <Text style = {{color: 'black', fontSize: 25, fontWeight: 'bold', ...Platform.select({android: {textAlign: 'center'}})}}>Confirm</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={()=>this._onCancelChanges()}>
                    <View style = {styles.bottomCancel}>
                        <Text style = {{color: 'black', fontSize: 25, fontWeight: 'bold', ...Platform.select({android: {textAlign: 'center'}})}}>Cancel</Text>
                    </View>
                </TouchableHighlight>
            </View>
            <View><Text>{this.state.confirmingChanges ? "Confirming your changes..." : ""}</Text></View>
        </View>

        );
        }

        _confirmClubAlert(club) {
            let removeClub = (clubId) => {
                //hypothetically, ids are unique within this array and this will work cleanly
                var arr = [...this.state.nextUserState.clubs] // so we don't manipulate state directly
                var index = arr.indexOf(clubId);
                if(index > -1) {
                    arr.splice(index,1);
                    this.setState({
                        nextUserState: Object.assign(this.state.nextUserState, {clubs: arr})
                    });
                }
                //TODO: delete from club properly? need to fetch and stuff
            };
            Alert.alert("Leave Club?", "Are you sure you want to leave this club?",
                [
                    {text: 'Yes', onPress: () => removeClub(club)},
                    {text: 'No', onPress: () => console.log('No Pressed')}
                ]
            );
        }

        _onGoProfileWithChanges() {
            if(this.props.route.index > 1) {
                //assume we came here from the profile, but also we need to snag the new information
                this.props.navigator.replacePrevious({
                    type: "profile",
                    index: this.props.route.index-1,
                    state: Object.assign({}, this.props.route.state, {user: this.state.nextUserState})
                });
                this.props.navigator.pop();
            }
        }

        _onConfirmChanges() {
            this.setState({
                confirmingChanges: true
            }, this._performChanges);
        }

        _onCancelChanges() {
            //pop and go back to the profile
            this.props.navigator.pop();
        }

        _performChanges() {
            //compare user state as the DB sees it and the next State, and if there are any discrepancies, make the API calls
            var cur = this.state.userState;
            var next = this.state.nextUserState;

            //only 2 conditions we can change are user's name and the clubs that they are in
            if(cur.clubs.length > next.clubs.length) {
                //if condition is sufficient because we can only remove clubs or stay the same
                var clubsToRemove = cur.clubs.filter(club => next.clubs.indexOf(club) === -1);
                for(let club of clubsToRemove) {
                    this._removeSelfFromClub(club);
                }
            }
            if(cur.name !== next.name) {
                this._postNewUserInfo()
            }
            this._onGoProfileWithChanges();
        }

        /*
            Function that actually performs the call with the updated information, if we have any updated information.
        */
        _postNewUserInfo() {
            var url = "http://skeleton20161103012840.azurewebsites.net/api/Users/"+this.state.nextUserState.id;
            fetch(url, {method: "POST", body: JSON.stringify(this.state.nextUserState)});
            let headers = {'Accept': 'application/json', 'Content-Type': 'application/json'};
            let parseResponse = res => res.text().then(text => text ? JSON.parse(text) : {});
            fetch(url, {method: "POST", headers: headers, body: JSON.stringify(this.state.nextUserState)})
                .then(parseResponse)
                .then(json => {
                    Alert.alert("Success","Succesfully updated profile", [{text: "OK", onPress: ()=>{
                        this.props.navigator.pop();
                    }}]);
                })
                .catch(e => {
                    Alert.alert("Error","couldn't update profile", [{text: "Dang", onPress: ()=>{
                                        this.props.navigator.pop();
                    }}]);});
        }

        _removeSelfFromClub(club) {
            var url = "http://skeleton20161103012840.azurewebsites.net/api/Users/" + this.state.nextUserState.id + "/leave/" + club;
            let headers = {'Accept': 'application/json', 'Content-Type': 'application/json'};
            let parseResponse = res => res.text().then(text => text ? JSON.parse(text) : {});
            fetch(url, {method: "POST", headers: headers})
                .then(parseResponse)
                .then(json => {
                    Alert.alert("left club","you left club",[{text: "OK", onPress: ()=>{
                        this.props.navigator.pop();
                    }}]);
                })
                .catch(e => {
                    Alert.alert("Error","couldn't leave club", [{text: "WAIT AM I TRAPPED?", onPress: ()=>{
                                        this.props.navigator.pop();
                    }}]);});
        }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 40,
  },
  welcome: {
    fontSize: 20,
    ...Platform.select({android: {textAlign: 'center'}}),
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    color: '#800000',
  },
  instructions: {
    ...Platform.select({android: {textAlign: 'center'}}),
    color: '#333333',
    justifyContent: 'center',
    marginBottom: 5,
    paddingRight: 10,
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
  deleteButton: {
      height: 15,
      width: 15,

  },
  textEdit: {
    height: 40,
    width: 200,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
  },
  box: {
      paddingTop: 25,
      flexDirection: 'row',
      flexWrap: 'wrap',

  },
  longBox: {
      height: 125,
      flexDirection: 'column',
      alignItems: 'center',
      paddingLeft: 25,
  },
  finalize: {
      bottom: 1,
      height: 125,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
  },
  bottomConfirm: {
      height: 50,
      width: 100,
      backgroundColor: 'chartreuse',
      borderColor: 'black',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  bottomCancel: {
        height: 50,
        width: 100,
        backgroundColor: 'red',
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
  clubs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: 100,
        marginRight: 125,
        marginBottom: 2,
        height: 25,
  },
  events: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 2,
        height: 25,
    },
});
