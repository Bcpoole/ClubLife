import React, { Component } from 'react';
import { AppRegistry, Text, View, Image, StyleSheet, TouchableHighlight } from 'react-native';


export default class HomePage extends Component {
  render() {
    return (
      <View>
        <Text style={styles.ClubLife}>Club Life</Text>
        <Text style={styles.announcements}>Announcements</Text>
        <View style={{width: 375, height: 420, backgroundColor: 'powderblue'}} />
        <View style={{width: 375, height: 65, backgroundColor: 'skyblue'}}>
            <View style={{width: 365, height: 30, flexDirection: 'row', justifyContent: 'space-around', paddingLeft: 5, paddingRight: 15, paddingTop: 3}}>
                <Image style={styles.bottomIcon} source={require('./Home-Icon.jpg')} />
                <Image style={styles.bottomIcon} source={require('./Club-Icon.jpeg')} />
                <Image style={styles.bottomIcon} source={require('./Search-Icon.jpg')} />
                <Image style={styles.bottomIcon} source={require('./Events-Icon.jpeg')} />
                <Image style={styles.bottomIcon} source={require('./Profile-Icon.jpeg')} />
            </View>
            <View style={{width: 365, height: 30, flexDirection: 'row', justifyContent: 'space-around', paddingLeft: 10, paddingRight: 10}}>
                <TouchableHighlight onPress={this.props.onGoHome}><Text style={styles.BottomBar}>Home</Text></TouchableHighlight>
                <TouchableHighlight><Text style={styles.BottomBar}>My Clubs</Text></TouchableHighlight>
                <TouchableHighlight><Text style={styles.BottomBar}>Search</Text></TouchableHighlight>
                <TouchableHighlight onPress={this.props.onGoEvents}><Text style={styles.BottomBar}>My Events</Text></TouchableHighlight>
                <TouchableHighlight onPress={this.props.onGoProfile}><Text style={styles.BottomBar}>My Profile</Text></TouchableHighlight>
            </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
  ClubLife: {
      fontSize: 50,
      textAlign: 'center',
      color: 'white',
      backgroundColor: 'black',
    },
  announcements: {
      fontSize: 20,
      textAlign: 'center',
      color: 'black',
      backgroundColor: 'powderblue',
      paddingTop: 10,
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

  description: {
      fontSize: 10,
      textAlign: 'center',
      color: '#FFFFFF'
    },
});
