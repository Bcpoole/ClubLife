

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
            stuff: 'new value'

        };
    }
    render() {
        var TouchableElement = TouchableNativeFeedback;
        var officer = true; // figure this out later
        //var vals = ['Secondary Advisor Department','Meeting Location','Vice President Email','President Email','Parent Organization','Meeting Times','Advisor Email','Vice President Name','Advisor Phone','Organization Email','Secretary Name','Advisor Department','Seceretary Email','Primary Contact','Meeting Day','Secondary Advisor Name and Title','url','Advisor Name and Title','Secondary Advisor Phone','Summary','Treasurer Email','Secondary Advisor Email','Main Summary','About Summary','Name', 'President Name'];
        //image
        
         var data = this.state.data;
        
        var clubValue = () => {
           
           var returnValue = [];
           //var html = 
          
          
          
          // something wierd is going on with the text input
           data.map(club=> {
               
               for (let prop in club){
                    
                    if (prop==="id" || prop === "events" || prop==="posts" || prop==="img"){
                        continue;
                    }
                    
                    var val = club[prop];
                    if (Array.isArray(val)){
                        
                        // this should be changed? whats in the arrays?
                        val = val[0];
                        
                    }
                    
                    returnValue.push(<View><Text style={styles.welcome}>{prop}:</Text>
                        
                        <TextInput 
                            style = {styles.textEdit} 
                            value = {val}
                            onChangeText = {(newValue)=>{this.setState({stuff: newValue});val = newValue;}}
                            
                            
                        ></TextInput>
                        
                        </View>);
                  // club[prop] = this.state.newVal;
               }
               
            })
            
            //   data.map(club=> {
            //    var i = 0;
            //    for (let prop in club){
                    
            //         if (prop==="id" || prop === "events" || prop==="posts" || prop==="img"){
            //             continue;
            //         }
                    
            //         returnValue.push(<View><Text style={styles.welcome}>{prop}:</Text>
                        
            //             <Text>{club[prop]}
            //             </Text>
                        
            //             </View>);
            //         i++;
            //    }
            //   })
      
          
          return returnValue;
            
        }
        
        
        
        
        
        return (
        <ScrollView style = {{marginTop: 30, paddingBottom: 30}}>
            
            {clubValue()}
            
            <TouchableElement style = {styles.button} onPress = {()=>{updateDatabase()}}>
                <View><Text>Submit</Text></View>
            </TouchableElement>
            <TouchableElement style = {styles.button} onPress = {this.props.onGoClub}>
                <View><Text>Back</Text></View>
            </TouchableElement>

        </ScrollView>


        );
        }

            // Jonathan's component code
        componentDidMount() {
            const url = "http://skeleton20161103012840.azurewebsites.net/api/organizations/name?name=UA+Association+for+Computing+Machinery";
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
