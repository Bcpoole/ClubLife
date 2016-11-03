import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import styles from '../styles/stylesheet'

class HomePage extends Component {
  render() {
    return (
      <View>
        <Text style={styles.ClubLife}>'Club Life'</Text>
        <View style={styles.container}/>
        <Text style={styles.announcements}>'Announcements'</Text>
        <View style={styles.container}/>

      </View>
    );
  }
}

AppRegistry.registerComponent('HomePage', () => HomePage);