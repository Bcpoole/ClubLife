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
    render() {
        if(!this.state.hasData) {
            return <LoadingView/>;
        }
        else {
            //TODO: make all the stuff underneath do actual things,
            // here I'm just returning the JSON as a string and making it the view LMAO
            return <View style={{paddingTop: 40}}><Text>{JSON.stringify(this.state.data)}</Text></View>
        }

        var TouchableElement = TouchableNativeFeedback;

        var officer = true; // figure this out later

        var member = false;

        var offOps = <Text></Text>;
        if (officer){
            offOps =
                <TouchableElement onPress = {()=>this._onGoEditClub()}>
                    <View><Text style = {styles.button} >Edit Club Info</Text></View>
                </TouchableElement>;
        }
        var memberOps =  <TouchableElement onPress = {() =>Communications.email(['avhedges@crimson.ua.edu', 'avhedges@crimson.ua.edu'],null,null,'This person wants to join club','please let me join, i love club.')}>
                <View><Text style = {styles.button}>Join Club</Text></View>
            </TouchableElement>;
        if (member){
            memberOps = <Text></Text>;
        }

        // Club Variables:



        var picURL = 'https://images.collegiatelink.net/clink/images/f5b2dc13-7aab-4a95-ab24-adcfa884d90e57a54f72-e5a6-43f1-aa48-942c176ef3b2.png';
        var name = 'ACM';
        var data = this.state.data;





        return (



        <ScrollView style={styles.container}>
            <View style={styles.box}>
                <Image source={{uri: picURL}} style={{flex:1, height: 375, width: 375}} />

                <View style={styles.longBox}>
                    <Text style={styles.welcome}>
                    {name}
                    </Text>
                </View>


                <View style={{width: 365, height: 30, flexDirection: 'row', justifyContent: 'space-around', paddingLeft: 10, paddingRight: 10}}>
                    <TouchableElement onPress={()=>this._onGoClubInfo()}>
                        <View><Text style={styles.button}>Events</Text></View>
                    </TouchableElement>
                    {/* TODO: fix the callback onpres above */}
                    <TouchableElement style = {styles.button} onPress = {()=>this._onGoClubInfo()}>
                        <View><Text style = {styles.button}>Info</Text></View>
                    </TouchableElement>
                   {memberOps}
                    {offOps}

                </View>
            </View>

            {data.map(club=> {
                return (
                    <View><Text>{club.name}</Text></View>
                );
            })}
            <Text>{data.name}</Text>

            <Text style = {styles.welcome}>Messages:</Text>
            <View style = {[styles.box,  styles.message]}>
                <Image style = {styles.edit} source={require('./krab.png')} />
                <Text style = {styles.instructions}> Mr. Krabs: Join us at our frycook olymics next Tues!!</Text>
            </View>
            <View style = {[styles.box, styles.message]}>
                <Image style = {styles.edit} source={require('./pat.jpeg')} />
                <Text style = {styles.instructions}> Patrick: Vote for me in tomorrow's elections!</Text>
            </View>
        </ScrollView>
        );
        }


        // Jonathan's component code

        componentDidMount() {
            const url = "http://skeleton20161103012840.azurewebsites.net/api/organizations/name?name="+
                this.props.route.clubName.replace(" ","+");
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
                user: this.props.route.user
            });
        }

        _onGoClubInfo() {
            this.props.navigator.push({
                type: "clubInfo",
                index: this.props.route.index+1,
                user: this.props.route.user
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
