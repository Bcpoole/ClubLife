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


//import TabNavigator from 'react-native-tab-navigator';
//import Communications from 'react-native-communications';


class ClubInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            hasData: false,
            data: []

        };

    }
    render() {
        var TouchableElement = TouchableNativeFeedback;
        var officer = true; // figure this out later
        //var vals = ['Secondary Advisor Department','Meeting Location','Vice President Email','President Email','Parent Organization','Meeting Times','Advisor Email','Vice President Name','Advisor Phone','Organization Email','Secretary Name','Advisor Department','Seceretary Email','Primary Contact','Meeting Day','Secondary Advisor Name and Title','url','image url','Advisor Name and Title','Secondary Advisor Phone','Summary','Treasurer Email','Secondary Advisor Email','Main Summary','About Summary','Name', 'President Name'];
        var data = this.state.data;


        var user = this.props.route.state.user;
        var club = this.props.route.state.club;

        var leaderOps = <Text></Text>;


        if(club.leaders.indexOf(user.id) > -1) {
            leaderOps =
                <TouchableElement onPress = {()=>this._onGoEditClub()}>
                    <View><Text style = {styles.button} >Edit Club Info</Text></View>
                </TouchableElement>;
        }


        function clubValue(){

           var returnValue = [];




           data.map(club=> {
               var i = 0;
               for (let prop in club){

                    if (prop==="id" || prop === "events" || prop==="posts" || prop==="img" || prop ==="leaders" || prop ==="officers" || prop==="members"||prop==="pendingRequests"){
                        continue;
                    }
                    returnValue.push(<View key={"clubInfo-"+i}><Text style={styles.welcome}>{prop}:</Text><Text style={styles.instructions}>{club[prop]}</Text></View>);
                    i++;
               }
           });

          return returnValue;

        }



        return (
        <ScrollView style = {{marginTop: 30, paddingBottom: 30}}>
            <Text style = {{fontSize:20, paddingLeft:10, justifyContent: 'center'}}>Club Information:</Text>
            <Text style = {{fontSize:15, paddingLeft:10}}>Club: {this.props.route.state.club.name}{"\n\n"}</Text>
            {leaderOps}
            {clubValue()}

            <TouchableElement style = {styles.button} onPress = {()=>this._onGoClub(this.props.route.clubName)}>
                <View><Text>Back</Text></View>
            </TouchableElement>

        </ScrollView>


        );
        }

        _onGoClub(name) {
            this.props.navigator.push({
                type: "club",
                index: this.props.route.index+1,
                state: Object.assign({}, this.props.route.state, {clubName: name})
            });
        }

        _onGoEditClub() {
            this.props.navigator.push({
                type: "EditClub",
                index: this.props.route.index+1,
                state: this.props.route.state
            });
        }


        // Jonathan's component code
        // hard coded to acm
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
                    //TODO: figure out how to navigate back out if something went wrong
                })
        }



}

module.exports = ClubInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 18,
    //textAlign: 'center',
    //margin: 10,
    paddingLeft:10,
    color: '#800000'
  },
  instructions: {
    //textAlign: 'center',
    color: '#333333',
    paddingLeft: 10,
    paddingBottom: 10
    //marginBottom: 5,
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

  },
  boxSpace:{
    //   flexDirection: 'row',
    //   flexWrap: 'wrap',
      paddingTop: 20,
      paddingLeft: 20
  }
});
