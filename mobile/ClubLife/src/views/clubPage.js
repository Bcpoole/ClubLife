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
} from 'react-native';

class ClubPage extends Component {
    constructor(props){
        super(props);
        this.state = {selectedTab: 'home'};
    }


    _resultsView(){


        var TouchableElement = TouchableNativeFeedback;
        //var userClubs = this.props.route.state.user.clubs;
        var user = this.props.route.state.user;
        var userClubs = user.clubs;
        var returnVal = [];
        var data = this.props.clubList;

        //console.log(data);
        //console.log(data.filter((club)=>club.id===userClubs[0]));
        returnVal.push(<Text key={"title-key"} style = {styles.welcome}>My Clubs</Text>);
        
        for (var i =0;i<userClubs.length;i++){


            var clubObj =data.filter((club)=>club.id===userClubs[i]);


            returnVal.push(

                clubObj.map(club=>{
                    var content = (
                        <TouchableElement key={"myclub-"+i} style = {styles.button} onPress = {()=>this._navigateToClub(club)}>
                            <View><Text style = {styles.instructions}>{club.name}</Text></View>
                        </TouchableElement>);
                    return content;
                })
            );

        }
        //returnVal.push(</View>);
        return returnVal;


    }

    render (){

        return (
            <View  style = {{marginTop: 30, paddingBottom: 30}}>
                {this._resultsView()}
            </View>
        );
    }

    _navigateToClub(clubName) {
        this.props.navigator.push({
            type: "club",
            index: this.props.route.index+1,
            state: Object.assign({}, this.props.route.state, {club: clubName})
        });
    }

}



module.exports = ClubPage;


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
    //textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    marginLeft: 5
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

  }
});
