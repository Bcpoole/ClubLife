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
    }
    
    _addToPending(userID){
        
        
    }
    
    
    render() {
        if(!this.state.hasData) {
            return <LoadingView/>;
        }

        var TouchableElement = TouchableNativeFeedback;
        
         // Club Variables:
        var picURL;
        var data = this.state.data;
        var name;
        var officers;
        var members;
        var leaders;
        var email;

        {data.map(club=> {
            name = club.name;
            picURL = club.img;
            officers= club.officers;
            members = club.members;
            leaders = club.leaders;
            email = club.email;
    
        })}
        
        var user = this.props.route.state.user;
        
        function isInArray(array){    
            for (var j = 0; j<array.length;i++){
                if (array[i]===user.id){
                    return true;
                }
                
            }
            return false;
        }
        
        //var officer = isOfficer(officers);
        //var member = isOfficer(members);
        //var leader = isOfficer(leaders); 
        
        // while there is nothing in the arrays
        var officer = true; 
        var member = false;
        var leader = true;

        
        // officer options: post to club, approve members
        var offOps = <Text></Text>;
        if (officer){
            offOps =
                <TouchableElement onPress = {()=>this._onGoPendingMembers()}>
                    <View><Text style = {styles.button} >Pending Members</Text></View>
                </TouchableElement>;
        }
        
        // member options: {if !member allow to join club}
        var memberOps =  <TouchableElement onPress = {()=>alert("HEYO!!!")}>
                <View><Text style = {styles.button}>Join Club</Text></View>
            </TouchableElement>;
        if (member){
            memberOps = <Text></Text>;
        }

        // leader options: edit club info, post to club, approve members
        var leaderOps = <Text></Text>;
        if (leader){
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
                this.props.route.state.clubName.replace(" ","+");
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
                    //TODO: figure out how to navigate back out if something went wrong
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
