import React, { Component } from 'react';
import { AppRegistry, Text, View, Image, StyleSheet, TouchableHighlight } from 'react-native';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        /* don't think these are needed, uncomment if needed */
        this._onGoHome = this._onGoHome.bind(this);
        this._onGoClubList = this._onGoClubList.bind(this);
        this._onGoChooseSearch = this._onGoChooseSearch.bind(this);
        this._onGoEvents = this._onGoEvents.bind(this);
        this._onGoProfile = this._onGoProfile.bind(this);
    }
  render() {
    return (
      <View>
        <Text style={styles.ClubLife}>Club Life</Text>
        <Text style={styles.announcements}>Announcements</Text>
        <View style={{width: 375, height: 370, backgroundColor: 'powderblue'}}>
            <Text style={styles.newsFeed, styles.bold}>Video Game Development Club Meeting</Text>
            <Text style={styles.newsFeed, styles.newsFeedPadding}>Thursday, Nov. 3rd, 5:30pm - 7:30pm, SERC 3048</Text>
            <Text style={styles.newsFeed, styles.bold}>ABXY Riverside Night</Text>
            <Text style={styles.newsFeed, styles.newsFeedPadding}>Friday, Nov. 4th, 6:00pm - 8:00pm, RCC</Text>
            <Text style={styles.newsFeed, styles.bold}>ACM Object Oriented Programming Workshop</Text>
            <Text style={styles.newsFeed, styles.newsFeedPadding}>Tuesday, Nov. 8th, 5:15pm - 7:00pm, SERC 1014</Text>
            <Text style={styles.newsFeed, styles.bold}>Thanksgiving Break</Text>
            <Text style={styles.newsFeed, styles.newsFeedPadding}>Wednesday-Sunday, Nov. 23rd - 27th</Text>
        </View>
        <View style={{width: 375, height: 65, backgroundColor: 'skyblue'}}>
            <View style={{width: 365, height: 30, flexDirection: 'row', justifyContent: 'space-around', paddingLeft: 5, paddingRight: 15, paddingTop: 3}}>
                <Image style={styles.bottomIcon} source={require('./images/Home-Icon.jpg')} />
                <Image style={styles.bottomIcon} source={require('./images/Club-Icon.jpeg')} />
                <Image style={styles.bottomIcon} source={require('./images/Search-Icon.jpg')} />
                <Image style={styles.bottomIcon} source={require('./images/Events-Icon.jpeg')} />
                <Image style={styles.bottomIcon} source={require('./images/Profile-Icon.jpeg')} />
            </View>
            <View style={{width: 365, height: 30, flexDirection: 'row', justifyContent: 'space-around', paddingLeft: 10, paddingRight: 10}}>
                <TouchableHighlight onPress={()=>this._onGoHome()}><Text style={styles.BottomBar}>Home</Text></TouchableHighlight>
                <TouchableHighlight onPress={()=>this._onGoClubList()}><Text style={styles.BottomBar}>My Clubs</Text></TouchableHighlight>
                <TouchableHighlight onPress = {()=>this._onGoChooseSearch()}><Text style={styles.BottomBar}>Search</Text></TouchableHighlight>
                <TouchableHighlight onPress={()=>this._onGoEvents()}><Text style={styles.BottomBar}>My Events</Text></TouchableHighlight>
                <TouchableHighlight onPress={()=>this._onGoProfile()}><Text style={styles.BottomBar}>My Profile</Text></TouchableHighlight>
            </View>
        </View>
      </View>
    );
  }

  _onGoHome(){
      this.props.navigator.push({
          type: "homepage",
          index: this.props.route.index+1,
          user: this.props.route.user
      })
  }

  _onGoProfile() {
      this.props.navigator.push({
          type: "profile",
          index: this.props.route.index+1,
          user: this.props.route.user
      })
  }

  _onGoClubList() {
      this.props.navigator.push({
          type: "clubPage",
          index: this.props.route.index+1,
          user: this.props.route.user
      });
  }
  _onGoFindAnEvent() {
      this.props.navigator.push({
          type: "findanevent",
          index: this.props.route.index+1,
          user: this.props.route.user
      })
  }
  _onGoChooseSearch() {
      this.props.navigator.push({
          type: "choosesearch",
          index: this.props.route.index+1,
          user: this.props.route.user
      })
  }
  _onGoFindAClub() {
      this.props.navigator.push({
          type: "findaclub",
          index: this.props.route.index+1,
          user: this.props.route.user
      })
  }
  _onGoEvents() {
      this.props.navigator.push({
          type: "testpage",
          index: this.props.route.index+1,
          user: this.props.route.user
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
