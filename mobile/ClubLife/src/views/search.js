
 
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



class Search extends Component {
    constructor(props){
        super(props);
    }
    render() {
        var TouchableElement = TouchableNativeFeedback;
        var xyz = [];
                
        function getJSON() {
            var xyz = [];
            return fetch('http://skeleton20161103012840.azurewebsites.net/api/organizations/')
            //.then((response) => response.text())
            .then((responseText) => {
                
                xyz = responseText;
                return JSON.stringify(xyz);
                
            })
            .catch((error) => {
                xyz = "boo";
                return "blah";
            });
        }
       console.log(JSON.stringify(xyz));
       console.log(JSON.stringify(getJSON()));
       //var hey = fetch('https://facebook.github.io/react-native/movies.json');
        
        return (
            
            <View style={styles.container}>
                <Text>Hey {JSON.stringify(xyz)}</Text>
            
            </View>
        
 
        );
    }
 
  
  
}

   module.exports = Search;



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



 
