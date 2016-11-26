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


class EditClub extends Component {
    constructor(props){
        super(props);
        this.state = {
            hasData: false,
            data: [],
            newVal: '',
            currentVal:'',
            newValues : '',
            //newValues : {hi:0},
            //hasValues:false

        };
        //this.setState({hasValues:false});
    }
    render() {
        var TouchableElement = TouchableNativeFeedback;
        var officer = true; // figure this out later
        //var vals = ['Secondary Advisor Department','Meeting Location','Vice President Email','President Email','Parent Organization','Meeting Times','Advisor Email','Vice President Name','Advisor Phone','Organization Email','Secretary Name','Advisor Department','Seceretary Email','Primary Contact','Meeting Day','Secondary Advisor Name and Title','url','Advisor Name and Title','Secondary Advisor Phone','Summary','Treasurer Email','Secondary Advisor Email','Main Summary','About Summary','Name', 'President Name'];
        //image


        var data = this.state.data;
        var ho = this.state.hasData;
        //this.setState({hasData:false});

        var yo = this;

        if (this.state.hasData){
            this.setState({hasData:false});
            this.setState({newValues:{}});
        }



        function hey(boo){
            if (boo in this.state.newValues){
            //if (ho){
                //yo.setState({hasData: false});
                // this.setState(newValues: 'hey');
                //this.state.newValues;
                //return this.state.newValues[club[prop]];
                return "blah2";
            }
            else{
                return "blah";
            }
         }


        var clubValue= ()=>{

            var returnValue = [];
            //this.state.newValues;
                //onChangeText={(text)=>{this.state.newValues[i]=text}}
                //this.state.newValue.push(club[prop]);
            data.map(club=> {
                var i = 0;

                for (let prop in club){
                        //this.state.newValues;

                        if (prop==="id" || prop === "events" || prop==="posts" || prop==="img"){
                            continue;
                        }


                        returnValue.push(
                            <View>
                                <Text style={styles.welcome}>
                                    {prop}:
                                </Text>
                                <TextInput
                                    style = {styles.textEdit}
                                    onChangeText={(newText)=>{
                                        //this.state.newValues[club[prop]] = newText;
                                        this.setState({newValues[club[prop]]:this.state.newValues});
                                        }
                                    }
                                    value = {hey(club[prop])}
                                     >

                                </TextInput>
                            </View>);
                        i++;                }

                }, this) // end of map
            return returnValue;

        }




        return (
        <ScrollView style = {{marginTop: 30, paddingBottom: 30}}>

            {clubValue()}
            <Text>{this.state.newValues[0]}</Text>
            <TouchableElement style = {styles.button} onPress = {()=>{alert(blah[1])}}>
                <View><Text>Submit</Text></View>
            </TouchableElement>
            <TouchableElement style = {styles.button} onPress = {()=>this._onGoClub()}>
                <View><Text>Back</Text></View>
            </TouchableElement>

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

    _onGoClub() {
        this.props.navigator.push({
            type: 'club',
            index: this.props.route.index+1,
            state: this.props.route.state,
        })
    }


}

   module.exports = EditClub;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
  //  textAlign: 'center',
    margin: 10,
  },
  instructions: {
    //textAlign: 'center',
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
    marginLeft: 20,
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
