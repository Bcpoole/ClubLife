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
  TouchableHighlight,
} from 'react-native';

class Event extends Component {
    constructor(props){
        super(props);
        this.state = {
            hasData: false,
            data: [],
        };
    }
    render() {
        return (
          <View>
            <Text style={styles.ClubLife}>Club Life</Text>
            <Text style={styles.announcements}>Announcements</Text>
            <View style={{width: 375, height: 65, backgroundColor: 'skyblue'}}>
                <Text style={styles.newsFeed}>Event Time</Text>
                <Text style={styles.description}>Event Description</Text>
            </View>
          </View>
        );
      }

      _onGoHome(){
          this.props.navigator.push({
              type: "homepage",
              index: this.props.route.index+1,
              state: this.props.route.state
          })
      }

      _onGoFindAnEvent() {
          this.props.navigator.push({
              type: "findanevent",
              index: this.props.route.index+1,
              state: this.props.route.state
          })
      }
      _onGoEvents() {
          this.props.navigator.push({
              type: "testpage",
              index: this.props.route.index+1,
              state: this.props.route.state
          })
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
          fontWeight: 'bold',
      },
      announcements: {
          fontSize: 30,
          textAlign: 'center',
          color: 'black',
          backgroundColor: 'powderblue',
          paddingTop: 10,
          paddingBottom: 30,
          fontWeight: 'bold',
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
      newsFeed: {
          fontSize: 25,
          textAlign: 'center',
          justifyContent: 'center',
          color: 'black',
          backgroundColor: 'powderblue',
      },
      bold: {
          fontWeight: 'bold',
      },
      newsFeedPadding: {
          paddingBottom: 20,
      },
    });