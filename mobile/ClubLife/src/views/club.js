import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableNativeFeedback,
  Image,
  TouchableOpacity,
} from 'react-native';
import LoadingView from '../components/loadingview';
//import TabNavigator from 'react-native-tab-navigator';
import Communications from 'react-native-communications';


class Club extends Component {
    constructor(props){
        super(props);
        this.state = {
            hasData: false,
            data: [],
        };
        this.DEFAULT_IMG_URL = "";
    }

    _addToPending(userId){
        var club = this.state.data[0];
        //if we're already in the pending members, no op and alert the user
        if(club.pendingRequests.indexOf(userId) > -1) {
            alert("You have already requested to join the club. Be patient!");
            return;
        }
        var pending = [...club.pendingRequests];
        pending.push(userId);
        var newClub = Object.assign({}, club, {pendingRequests: pending});
        var url = "http://skeleton20161103012840.azurewebsites.net/api/Organizations/"+club.id;
        fetch(url, {method: "POST", body: JSON.stringify(newClub)})
            .then(()=>{
                alert("You have requested to join "+club.name);
                // set our state to be the new club as well
                this.setState({
                    data: [newClub]
                });
            })
            .catch(e => console.error(e));
    }


    render() {
        if(!this.state.hasData) {
            return <LoadingView/>;
        }

        var TouchableElement = TouchableNativeFeedback;

         // Club Variables:
        var data = this.state.data;
        var club = data[0];
        var picURL = club.img || this.DEFAULT_IMG_URL;
        var name = club.name;
        var officers = club.officers;
        var members = club.members;
        var leaders = club.leaders;
        var email = club.email;

        var user = this.props.route.state.user;

        function isInArray(array){
            for (var j = 0; j<array.length;j++){
                if (array[j]===user.id){
                    return true;
                }

            }
            return false;
        }

        var isMember = isInArray(members); //members.includes(user.id)
        var isOfficer = isInArray(officers); //officers.includes(user.id)
        var isLeader = isInArray(leaders); //leaders.includes(user.id)


        // officer (and by extension, leader) options: post to club, approve members
        var offOps = <Text></Text>;
        if (isOfficer || isLeader){
            offOps = (
                <View>
                    <TouchableElement onPress={()=>this._onPostToClub()}>
                        <View><Text style = {styles.button}>Post to Club</Text></View>
                    </TouchableElement>
                    <TouchableElement onPress = {()=>this._onGoPendingMembers()}>
                        <View><Text style = {styles.button} >Pending Members</Text></View>
                    </TouchableElement>
                </View>
            );
        }

        // member options: {if !member allow to join club}
        var memberOps =  <TouchableElement onPress = {()=>this._addToPending(user.id)}>
                <View><Text style = {styles.button}>Join Club</Text></View>
            </TouchableElement>;
        if (isMember){
            memberOps = <Text></Text>;
        }

        // leader options: edit club info, post to club, approve members
        var leaderOps = <Text></Text>;
        if (isLeader){
            leaderOps =
                <TouchableElement onPress = {()=>this._onGoEditClub()}>
                    <View><Text style = {styles.button} >Edit Club Info</Text></View>
                </TouchableElement>;
        }





        return (



        <ScrollView style={styles.container}>
            <View style={styles.box}>
                <Image source={{uri: picURL}} style={{flex:1, height: 200, width: 200}} />

                <View style={styles.longBox}>
                    <Text style={styles.welcome}>
                    {name}
                    </Text>
                </View>


                <View style={{width: 365, height: 30, flexDirection: 'row',
                    justifyContent: 'space-around', paddingLeft: 10, paddingRight: 10, flexWrap: 'wrap'}}>
                    <TouchableElement onPress={()=>this._onGoEvent()}>
                        <View><Text style={styles.button}>Events</Text></View>
                    </TouchableElement>
                    <TouchableElement style = {styles.button} onPress = {()=>this._onGoClubInfo()}>
                        <View><Text style = {styles.button}>Info</Text></View>
                    </TouchableElement>
                    <TouchableElement onPress = {() =>Communications.email([email,user.username],null,null,'This person wants to join club','please let me join, i love club.')}>
                        <View><Text style = {styles.button}>Contact an Officer</Text></View>
                    </TouchableElement>
                   {memberOps}
                   {leaderOps}
                   {offOps}

                </View>
            </View>



            <Text style = {styles.welcome}>Messages:</Text>
            <View style = {[styles.box,  styles.message]}>
                <Image style = {styles.edit} source={require('./images/krab.png')} />
                <Text style = {styles.instructions}> Mr. Krabs: Join us at our frycook olymics next Tues!!</Text>
            </View>
            <View style = {[styles.box, styles.message]}>
                <Image style = {styles.edit} source={require('./images/pat.jpeg')} />
                <Text style = {styles.instructions}> Patrick: Vote for me in tomorrow's elections!</Text>
            </View>
        </ScrollView>
        );
        }


        // Jonathan's component code

        componentDidMount() {
            const url = "http://skeleton20161103012840.azurewebsites.net/api/organizations/name?name="+
                this.props.route.state.club.name.replace(" ","+");
            fetch(url)
                .then(res=>res.json())
                .then(json => {
                    this.setState({
                        hasData: true,
                        data: json
                    })
                })
                .catch(e => {
                    console.error(e);
                    //reset to login if this call screws up, I guess
                    this.props.navigator.resetTo({
                        type: "login",
                        index: 0,
                        state: {}
                    });
                })
        }

        _onGoEditClub() {
            this.props.navigator.push({
                type: "EditClub",
                index: this.props.route.index+1,
                state: this.props.route.state
            });
        }

        _onGoClubInfo() {
            this.props.navigator.push({
                type: "clubInfo",
                index: this.props.route.index+1,
                state: this.props.route.state
            });
        }

        _onGoPendingMembers() {
            this.props.navigator.push({
                type: "pendingMembers",
                index: this.props.route.index+1,
                state: this.props.route.state
            });
        }

        _onPostToClub() {
            this.props.navigator.push({
                type: "postToClubOptions",
                index: this.props.route.index+1,
                state: this.props.route.state
            });
        }

        _onGoEvent() {
            this.props.navigator.push({
                type: "event",
                index: this.props.route.index+1,
                state: this.props.route.state
            });
        }
}

module.exports = Club;

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

    BottomBar: {

      fontSize: 12,

      color: 'black',

      backgroundColor: 'skyblue',

  },

  bottomIcon: {

      width: 25,

      height: 25,

      backgroundColor: 'skyblue',

  },

  pad: {

      justifyContent: 'center',

      alignItems: 'center',



  },

  message: {

      borderWidth: 1,

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
