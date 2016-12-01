import React, { Component } from 'react';
import { AppRegistry, Text, View, Image, StyleSheet, TouchableHighlight, ScrollView, Platform, TouchableOpacity } from 'react-native';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
        /* don't think these are needed, uncomment if needed */
        this._onGoHome = this._onGoHome.bind(this);
        this._onGoClubList = this._onGoClubList.bind(this);
        this._onGoChooseSearch = this._onGoChooseSearch.bind(this);
        this._onGoEvents = this._onGoEvents.bind(this);
        this._onGoProfile = this._onGoProfile.bind(this);
    }
  render() {
      let nameFromClubId = id => {
          for(let club of this.props.clubList) {
              if(club.id === id) {
                  return club.name;
              }
          }
          return "...";
      }
      let posts = this.state.posts;
      posts.sort((a,b) => -1/*for newest first*/*a.postData.created.localeCompare(b.postData.created));
    return (
      <View style={{paddingTop: 40}}>
        <Text style={styles.ClubLife}>Club Life</Text>
        <Image style={{flex: 1, resizeMode: 'stretch', width: 375, height: 410, opacity: 1}} source={require('./images/Denny-Chimes1.jpg')}>
            <Text style={styles.announcements}>Recent Activity</Text>
            <ScrollView style={{width: 375, height: 340, backgroundColor: 'rgba(0,0,0,0)', paddingLeft: 5}}>
            {
                posts.map((item, i) => {
                    return (
                        <View key={"content"+i}>
                            <Text style={styles.newsFeed, styles.bold}>{nameFromClubId(item.id) || "..."}</Text>
                            <Text style={styles.newsFeed, styles.newsFeedPadding}>{item.postData.subject}</Text>
                        </View>
                    );
                })
            }
            </ScrollView>
        </Image>
        <View style={{width: 375, height: 65, backgroundColor: 'crimson'}}>
            <View style={{width: 365, height: 35, flexDirection: 'row', justifyContent: 'space-around', paddingLeft: 5, paddingRight: 15, paddingTop: 3}}>
                <Image style={styles.bottomIcon} source={require('./images/Home-Icon.jpg')} />
                <Image style={styles.bottomIcon} source={require('./images/Club-Icon.jpeg')} />
                <Image style={styles.bottomIcon} source={require('./images/Search-Icon.jpg')} />
                <Image style={styles.bottomIcon} source={require('./images/Events-Icon.jpeg')} />
                <Image style={styles.bottomIcon} source={require('./images/Profile-Icon.jpeg')} />
            </View>
            <View style={{width: 365, height: 20, flexDirection: 'row', justifyContent: 'space-around', paddingLeft: 10, paddingRight: 10}}>
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
          state: this.props.route.state
      })
  }

  _onGoProfile() {
      this.props.navigator.push({
          type: "profile",
          index: this.props.route.index+1,
          state: this.props.route.state
      })
  }

  _onGoClubList() {
      this.props.navigator.push({
          type: "clubPage",
          index: this.props.route.index+1,
          state: this.props.route.state
      });
  }
  _onGoFindAnEvent() {
      this.props.navigator.push({
          type: "findanevent",
          index: this.props.route.index+1,
          state: this.props.route.state
      })
  }
  _onGoChooseSearch() {
      this.props.navigator.push({
          type: "choosesearch",
          index: this.props.route.index+1,
          state: this.props.route.state
      })
  }
  _onGoFindAClub() {
      this.props.navigator.push({
          type: "findaclub",
          index: this.props.route.index+1,
          state: this.props.route.state
      })
  }
  _onGoEvents() {
      this.props.navigator.push({
          type: "myEvents",
          index: this.props.route.index+1,
          state: this.props.route.state
      })
  }

  componentDidMount() {
      // this is totally and completely horrible but we can't have static fake content on the homepage because that's ridiculous.
      // get all posts and all events for all clubs that the user has.
      let fetchPostsAndEventsFromClub = (id) => {
          //fetch the posts and add them to the content state
              let url1 = "http://skeleton20161103012840.azurewebsites.net/api/organizations/"+id+"/posts";
              fetch(url1)
                  .then(res => res.json())
                  .then(json => {
                      let p = [...this.state.posts];
                      this.setState({
                          posts: p.concat(json.map(j => ({id: id, type: "post", postData: j})))
                      });
                  })
                  .catch(e => console.error(e));
              let url2 = "http://skeleton20161103012840.azurewebsites.net/api/organizations/"+id+"/events";
              fetch(url2)
                  .then(res => res.json())
                  .then(json => {
                      let p = [...this.state.posts];
                      this.setState({
                          posts: p.concat(json.map(j => ({id: id, type: "event", postData: j})))
                      });
                  })
                  .catch(e => console.error(e));
      };
      for(let clubId of this.props.route.state.user.clubs) {
          fetchPostsAndEventsFromClub(clubId);
      }
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
      ...Platform.select({android: {textAlign: 'center'}}),
      color: 'white',
      backgroundColor: 'black',
      fontWeight: 'bold',
  },
  announcements: {
      fontSize: 30,
      ...Platform.select({android: {textAlign: 'center'}}),
      color: 'black',
      backgroundColor: 'rgba(0,0,0,0)',
      paddingTop: 10,
      paddingBottom: 15,
      fontWeight: 'bold',
  },
  BottomBar: {
      fontSize: 12,
      color: 'black',
      backgroundColor: 'crimson',
  },
  bottomIcon: {
      width: 25,
      height: 25,
      backgroundColor: 'crimson',
  },

  description: {
      fontSize: 10,
      ...Platform.select({android: {textAlign: 'center'}}),
      color: '#FFFFFF'
  },
  newsFeed: {
      fontSize: 25,
      ...Platform.select({android: {textAlign: 'center'}}),
      justifyContent: 'center',
      color: 'black',
      backgroundColor: 'rgba(0,0,0,0)',
  },
  bold: {
      fontWeight: 'bold',
  },
  newsFeedPadding: {
      paddingBottom: 20,
  }

});
