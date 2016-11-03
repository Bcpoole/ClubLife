
 
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

//import TabNavigator from 'react-native-tab-navigator';
//import Communications from 'react-native-communications';

class Club extends Component {
    constructor(props){
        super(props);
        this.state = {selectedTab: 'home'};
    }
    render() {
        var TouchableElement = TouchableNativeFeedback;
        return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Image style = {styles.profilepic} source={require('./kk.jpeg')} />
                <View style={styles.longBox}>
                    <Text style={styles.welcome}>
                    Krusty Krab Cooks
                    </Text>
                    <Text style = {styles.instructions}>  "We cook krabby patties with style"</Text>
                
                
                </View>         
            
            </View>
            <TouchableElement style = {styles.button} onPress = {() =>Communications.email(['avhedges@crimson.ua.edu', 'avhedges@crimson.ua.edu'],null,null,'This person wants to join club','please let me join, i love club.')}>
                <View><Text>   Click to Join!</Text></View>
            </TouchableElement>
            <Text style = {styles.welcome}>Info:</Text>
            <View style={[styles.box, styles.pad]}>
                <Text style = {styles.instructions}>President: SpongeBob </Text>
                <TouchableElement style = {styles.button} onPress={() => Communications.email(['avhedges@crimson.ua.edu', 'avhedges@crimson.ua.edu'],null,null,'hey','test im so tired')}> 

                    <View><Image style = {styles.edit} source={require('./contact.png')} /></View>
                </TouchableElement>
            </View>       
            <Text style = {styles.instructions}>Meeting Times: MWF at 7:00 am</Text>       
            <Text style = {styles.instructions}>Meeting Location: Krusty Krab </Text>
            
            <Text style = {styles.welcome}>Messages:</Text>
            <View style = {[styles.box,  styles.message]}>
                <Image style = {styles.edit} source={require('./krab.png')} />
                <Text style = {styles.instructions}> Mr. Krabs: Join us at our frycook olymics next Tues!!</Text>
            </View>
            <View style = {[styles.box, styles.message]}>
                <Image style = {styles.edit} source={require('./pat.jpeg')} />
                <Text style = {styles.instructions}> Patrick: Vote for me in tomorrow's elections!</Text>
            </View>
            <Text style = {styles.welcome}>Events:</Text>
            <Text style = {styles.instructions}>Fry Cook Olympics: Tues at 7:00 am</Text>       
            <Text style = {styles.instructions}>Next Meeting: Wed</Text>
         
                                   
        </View>
        
 
        );
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



 
