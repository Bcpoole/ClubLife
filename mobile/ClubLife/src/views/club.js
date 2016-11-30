import React, { Component } from 'react';
import {
  Alert,
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
            data: {},
            posts: [],
            events: [],
            postsEvents: [],
            users: []
        };
        this.DEFAULT_IMG_URL = "";
    }

    _addToPending(userId){
        var club = this.state.data[0];
        //if we're already in the pending members, no op and alert the user
        if(club.pendingRequests.indexOf(userId) > -1) {
            Alert.alert("Hey now","You have already requested to join the club. Be patient!", [
                {"text": "Sorry!", onPress: () => {}}
            ]);
            //alert(this.state.data[0].pendingRequests);
            return;
        }
        var pending = [...club.pendingRequests];
        pending.push(userId);
        var newClub = Object.assign({}, club, {pendingRequests: pending});
        var url = "http://skeleton20161103012840.azurewebsites.net/api/Organizations/"+club.id;
        let headers = {'Accept': 'application/json', 'Content-Type': 'application/json'};
        let parseResponse = res => res.text().then(text => text ? JSON.parse(text) : {});
        fetch(url, {method: "POST", headers: headers, body: JSON.stringify(newClub)})
            .then(parseResponse)
            .then(json=>{
                alert("You have requested to join "+club.name);
                // set our state to be the new club as well
                this.setState({
                    data: newClub
                });
            })
            .catch(e => console.error(e));
    }

    render() {
        if(!this.state.hasData) {
            return <LoadingView/>;
        }

        var TouchableElement = TouchableNativeFeedback;


         // Club Variables:
        var data = this.state.data;
        var club = data;
        var picURL = club.img || this.DEFAULT_IMG_URL;
        var name = club.name;
        var officers = club.officers;
        var members = club.members;
        var leaders = club.leaders;
        var email = club.email;

        var user = this.props.route.state.user;

        function isInArray(array){
            for (var j = 0; j<array.length;j++){
                if (array[j]===user.id){
                    return true;
                }

            }
            return false;
        }

        var isMember = isInArray(members); //members.includes(user.id)
        var isOfficer = isInArray(officers); //officers.includes(user.id)
        var isLeader = isInArray(leaders); //leaders.includes(user.id)


        // officer (and by extension, leader) options: post to club, approve members
        var offOps = <Text></Text>;
        if (isOfficer || isLeader){
            offOps = (
                <View style = {{width: 215, height: 30, flexDirection: 'row',
                    justifyContent: 'space-around', flexWrap: 'wrap'}}>
                    <TouchableElement onPress={()=>this._onPostToClub()}>
                        <View><Text style = {styles.button}>Create Post</Text></View>
                    </TouchableElement>
                    <TouchableElement onPress={()=>this._onGoEditEvent()}>
                        <View><Text style = {styles.button}>Create Event</Text></View>
                    </TouchableElement>
                    <TouchableElement onPress = {()=>this._onGoPendingMembers()}>
                        <View><Text style = {styles.button} >Pending Members</Text></View>
                    </TouchableElement>
                </View>
            );
        }

        // member options: {if !member allow to join club}
        var memberOps =  <TouchableElement onPress = {()=>this._addToPending(user.id)}>
                <View><Text style = {styles.button}>Join Club</Text></View>
            </TouchableElement>;
        if (isLeader || isOfficer){
            memberOps = <Text></Text>;
        }
        else if (isMember){
            memberOps =<TouchableElement onPress = {() =>Communications.email([user.username,email],null,null,'This person wants to join club','please let me join, i love club.')}>
                        <View><Text style = {styles.button}>Contact an Officer</Text></View>
                    </TouchableElement>;
        }

        // leader options: edit club info, post to club, approve members


        return (



        <ScrollView style={styles.container}>
            <View style={styles.box}>
                <Image source={{uri: picURL}} style={{height: 200, width: 200, resizeMode: 'contain'}} />

                <View style={styles.longBox}>
                    <Text style={styles.welcome}>
                    {name}
                    </Text>
                </View>

                <View style={{width: 365, height: 30, flexDirection: 'row',
                    justifyContent: 'space-around', paddingLeft: 10, paddingRight: 10, flexWrap: 'wrap'}}>
                    <TouchableElement onPress={()=>this._onGoEvents(this.state.events)}>
                        <View><Text style={styles.button}>Events</Text></View>
                    </TouchableElement>
                    <TouchableElement style = {styles.button} onPress = {()=>this._onGoClubInfo()}>
                        <View><Text style = {styles.button}>Info</Text></View>
                    </TouchableElement>

                   {memberOps}
                   {offOps}

                </View>
            </View>
            <Text style = {styles.welcome}>Club Posts:</Text>
            {this._messages()}
        </ScrollView>
        );
        }

        _messages() {
            if(!this.state.users.length) {
                //we can't map the user IDs to users so no-op
                return [];
            }
            //concat clubs and events into one array
            var posts = this.state.posts;
            var events = this.state.events;
            var user = this.props.route.state.user;
            if(!(this.state.data.members.includes(user.id) || this.state.data.officers.includes(user.id) || this.state.data.leaders.includes(user.id))) {
                //if we aren't in the club, don't show private events

                //normally we wouldn't filter clientside and this is horrible but we KNOW this endpoint works, but not /api/.../public so let's minimize work
                events = events.filter(e => e.isPublic);
            }
            var returnValue = [];
            // actual post objects
            var postArray = [].concat(posts, events);
            postArray = JSON.parse(JSON.stringify(postArray));
            console.log(postArray);
            postArray.sort(function(a,b){
                return new Date(b.created) - new Date(a.created);
            });
            
            //postArray.sort((a,b)=>{-1*a.created.localeCompare(b.created)}); // not working
            console.log(postArray);
            var TouchableElement = TouchableNativeFeedback;
            let authorName = id => {
                for(let user of this.state.users) {
                    if(user.id === id) {
                        return user.name;
                    }
                }
                return "Unknown author";
            };
            returnValue = postArray.map((post,i) => {
                if(post.hasOwnProperty("isPublic")) {
                    //the post is an event
                    return (
                        <TouchableElement key={"p"+i} onPress={() => this._onGoEvent(post)}>
                            <View style = {[styles.box,  styles.message]}>
                                <Text>{"EVENT: "+post.subject}</Text>
                            </View>
                        </TouchableElement>
                    );
                }
                else {
                    //the post is a post
                    return (
                        <TouchableElement key={"p"+i} onPress = {() => this._onGoPost(post, authorName(post.author))}>
                            <View style = {[styles.box,  styles.message]}>
                                <Text>{"POST by "+authorName(post.author)+": "+post.subject}</Text>
                            </View>
                        </TouchableElement>
                    )
                }
            });
            return returnValue;
        }



        // Jonathan's component code

        componentDidMount() {
            const url = "http://skeleton20161103012840.azurewebsites.net/api/organizations/name?name="+
                this.props.route.state.club.name.replace(" ","+");
            fetch(url)
                .then(res=>res.json())
                .then(json => {
                    this.setState({
                        hasData: true,
                        data: json[0] //no idea why this is returning an array now
                    }, () => {
                        this._fetchClubPosts();
                        this._fetchClubEvents();
                    });
                })
                .catch(e => {
                    console.error(e);
                    //reset to login if this call screws up, I guess
                    this.props.navigator.resetTo({
                        type: "login",
                        index: 0,
                        state: {}
                    });
                })
            const userUrl = "http://skeleton20161103012840.azurewebsites.net/api/users";
            fetch(userUrl).then(res=>res.json()).then(json => this.setState({users: json}))
            .catch(e => {
                console.error(e);
            });
        }

        _fetchClubPosts() {
            let club = this.state.data;
            let url = "http://skeleton20161103012840.azurewebsites.net/api/organizations/"+club.id+"/posts";
            fetch(url)
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        posts: json
                    })
                })
                .catch(e => console.error(e));
        }

        _fetchClubEvents() {
            let club = this.state.data;
            let url = "http://skeleton20161103012840.azurewebsites.net/api/organizations/"+club.id+"/events";
            fetch(url)
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        events: json
                    });
                })
                .catch(e => console.error(e));

        }


        _onGoEditClub() {
            this.props.navigator.push({
                type: "EditClub",
                index: this.props.route.index+1,
                state: this.props.route.state
            });
        }

        _onGoClubInfo() {
            this.props.navigator.push({
                type: "clubInfo",
                index: this.props.route.index+1,
                state: this.props.route.state
            });
        }

        _onGoPendingMembers() {
            this.props.navigator.push({
                type: "pendingMembers",
                index: this.props.route.index+1,
                state: Object.assign({}, this.props.route.state, {userList: this.state.users})
            });
        }

        _onPostToClub() {
            this.props.navigator.push({
                type: "postToClubOptions",
                index: this.props.route.index+1,
                state: this.props.route.state
            });
        }

        _onGoEvents(events) {
            this.props.navigator.push({
                type: "clubEvents",
                index: this.props.route.index+1,
                state: Object.assign({},this.props.route.state,{events:events})
            });
        }

        _onGoPost(post, authorName) {
            this.props.navigator.push({
                type: "post",
                index: this.props.route.index+1,
                state: Object.assign({}, this.props.route.state, {post: post}, {authorName: authorName})
            });
        }

        _onGoEvent(event) {
            this.props.navigator.push({
                type: "event",
                index: this.props.route.index+1,
                state: Object.assign({}, this.props.route.state, {event: event})
            });
        }

        _onGoEditEvent(){
            this.props.navigator.push({
                type:"createEvent",
                index: this.props.route.index+1,
                state: this.props.route.state,
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
    marginTop: 40,
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

  padding: {
      paddingBottom: 10,
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

      alignItems: 'center',

      flexDirection: 'column',

      flexWrap: 'wrap'



  },

  longBox: {

      height: 125



  }

});
