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
  Platform,
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
        var club = this.state.data;
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

        var TouchableElement = Platform.select({
            android: TouchableNativeFeedback,
            ios: TouchableOpacity
        });


         // Club Variables:
        var data = this.state.data;
        var club = data;
        var picURL = club.img || this.DEFAULT_IMG_URL;
        var name = club.name;
        var officers = club.officers;
        var members = club.members;
        var leaders = club.leaders;
        var email = club.organizationEmail;

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
        var addPost = <Text></Text>;

        // officer (and by extension, leader) options: post to club, approve members
        var offOps = null;
        if (isOfficer || isLeader){
            offOps = (
                    <TouchableElement onPress = {()=>this._onGoPendingMembers()}>
                        <View style = {styles.clubIcon}>
                            <Image style={styles.bottomIcon} source={require('./images/pending.png')} />
                            <Text style={{...Platform.select({android: {textAlign: 'center'}}),fontWeight:'bold',fontSize:15}}>Pending Members</Text>
                        </View>
                    </TouchableElement>

            );

            addPost = ( <TouchableElement onPress={()=>this._onPostToClub()}>
                        <View style = {{height:30,width: 365, flexDirection: 'row',
                    flexWrap: 'wrap',paddingLeft:10}}>
                            <Image style={styles.bottomIcon} source={require('./images/plus.png')} />
                            <Text style = {styles.button}>Create Event/Post{"\n\n"}</Text>
                        </View>
                    </TouchableElement>);
        }



        // member options: {if !member allow to join club}
        var memberOps =  <TouchableElement onPress = {()=>this._addToPending(user.id)}>
                <View style = {styles.clubIcon}>
                    <Image style={styles.bottomIcon} source={require('./images/plus.png')} />
                    <Text style = {{fontWeight:'bold',fontSize:15}}>Join Club</Text>
                </View>
            </TouchableElement>;

        if (isLeader || isOfficer){
            memberOps = null;
        }
        else if (isMember){
                    memberOps =<TouchableElement onPress = {() =>Communications.email([email,email],null,null,null,null)}>
                        <View style = {styles.clubIcon}>
                            <Image style={styles.bottomIcon} source={require('./images/mail.png')} />
                            <Text style={{...Platform.select({android: {textAlign: 'center'}}),fontWeight:'bold',fontSize:15}}>Contact an Officer</Text>
                        </View>
                    </TouchableElement>;
        }

        // leader options: edit club info, post to club, approve members

        /*
        var getUser=(userId)=>{
            for (let user of this.state.users){
                if (user.id === userId){
                    return user;
                }
            }
            return null;

        }

        var leader =   <TouchableElement onPress = {()=>this._onGoProfile()}>
                <View style = {styles.topBox}>
                    <Text style={{borderWidth:1, borderRadius:5,padding:3, marginRight:5, fontSize:15, fontWeight:'bold',borderColor:'grey'}}>{getUser(leaders[0])}</Text>
                </View>
            </TouchableElement>; */
        let leLeaders = [];
        let leOfficers = [];
        if(this.state.users.length) {
            leLeaders = leaders.map((id,i) => {
                let l = this._getUserById(id);
                return (
                    <TouchableElement key={"l"+i}onPress = {()=>this._onGoProfile(l.id)}>
                            <View style = {styles.topBox}>
                                <Text style={{padding:3, marginRight:5, fontSize:15, fontWeight:'bold',borderColor:'grey'}}>{l.name}</Text>
                            </View>
                    </TouchableElement>
                );
            });
            leOfficers = officers.map((id,i) => {
                let off = this._getUserById(id);
                return (
                    <TouchableElement key={"o"+i} onPress = {()=>this._onGoProfile(off.id)}>
                            <View style = {styles.topBox}>
                                <Text style={{padding:3, marginRight:5, fontSize:15, fontWeight:'bold',borderColor:'grey'}}>{off.name}</Text>
                            </View>
                    </TouchableElement>
                );
            })
        }
        let leadersText = leLeaders.length === 1 ? "Leader:" : "Leaders:";
        let officersText = leOfficers.length === 1 ? "Officer:" : "Officers:";


        return (



        <ScrollView style={styles.container}>
            <View style={styles.box}>
                <Image
                    source={{uri: picURL}}
                    style={{height: 300, width: 300,  resizeMode: 'contain',borderWidth:5, backgroundColor:'white', borderColor:'grey'}}
                />

                <View style={styles.longBox}>
                    <Text style={{fontSize: 25, color:'#800000', ...Platform.select({android: {textAlign: 'center'}}), fontWeight:'bold'}}>
                    {name}
                    </Text>
                </View>



                <View style={{width: 365, height: 30, flexDirection: 'row',
                    justifyContent: 'space-around', paddingLeft: 10, paddingRight: 10, flexWrap: 'wrap',marginBottom:40}}>
                    <TouchableElement onPress={()=>this._onGoEvents(this.state.events)}>
                         <View style = {styles.clubIcon}>
                            <Image style={styles.bottomIcon} source={require('./images/Events-Icon.png')} />
                           <Text style = {{fontWeight:'bold',fontSize:15}}>Events</Text>
                        </View>
                    </TouchableElement>
                    <TouchableElement onPress = {()=>this._onGoClubInfo()}>
                         <View style = {styles.clubIcon}>
                            <Image style={styles.bottomIcon} source={require('./images/info.png')} />
                            <Text style = {{fontWeight:'bold',fontSize:15}}>Info</Text>
                        </View>
                    </TouchableElement>


                    {offOps}
                   {memberOps}


                </View>
            </View>

            <View style = {styles.posts}>
            <Text style = {{fontSize: 20,marginLeft: 10,color:'#800000',marginTop:10, marginBottom:10}}>Club Events/Posts:</Text>
            {addPost}
            {this._messages()}
            </View>

            {
                leLeaders.length ? <View style={styles.posts}>
                    <Text style = {{fontSize: 20,marginLeft: 10,color:'#800000',marginTop:10, marginBottom:10}}>{leadersText}</Text>
                    {leLeaders}
                </View> : <Text></Text>
            }
            {
                leOfficers.length ?             <View style={styles.posts}>
                                <Text style = {{fontSize: 20,marginLeft: 10,color:'#800000',marginTop:10, marginBottom:10}}>{officersText}</Text>
                                {leOfficers}
                            </View> : <Text></Text>
            }



        </ScrollView>
        );
        }

        _getUserById(id) {
            if(!this.state.users.length) {
                return null;
            }
            for(let user of this.state.users) {
                if(user.id === id) {
                    return user;
                }
            }
            return null;
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
            postArray.sort(function(a,b){
                return new Date(b.created) - new Date(a.created);
            });

            var TouchableElement = Platform.select({
                android: TouchableNativeFeedback,
                ios: TouchableOpacity
            });

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
                             <View style = {{borderWidth: 1,borderStyle: 'dotted',marginBottom:10,marginLeft:3,marginRight:3,paddingRight:3,paddingLeft:3}}>
                                <Text>{"EVENT: "+post.subject+"\n"}</Text>
                            </View>
                        </TouchableElement>
                    );
                }
                else {
                    //the post is a post
                    return (
                        <TouchableElement key={"p"+i} onPress = {() => this._onGoPost(post, authorName(post.author))}>
                           <View style = {{borderWidth: 1,borderStyle: 'dotted',marginBottom:10,marginLeft:3,marginRight:3,paddingRight:3,paddingLeft:3}}>
                                <Text>{"POST by "+authorName(post.author)+": "+post.subject+"\n"}</Text>
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

         _onGoProfile(userID) {
          this.props.navigator.push({
              type: 'memberPage',
              index: this.props.route.index+1,
              state: Object.assign({}, this.props.route.state, {memberId: userID})
          });
      }

}

module.exports = Club;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //...Platform.select({android: {textAlign: 'center'}}),
    //backgroundColor: '#F5FCFF',
    marginTop: 40,
 },
  clubIcon:{
    height:80,
    justifyContent:'center',
    alignItems:'center',
    width:100,
    borderWidth: 1,
    borderRadius:5,
    borderColor: 'grey',
    marginBottom:10,
    marginTop: 10


  },

  posts: {borderWidth:1,borderRadius: 5,borderColor:'grey', marginTop:40, marginLeft:10, marginRight:10,paddingRight:3,paddingLeft:3},

  welcome: {
    fontSize: 20,
    ...Platform.select({android: {textAlign: 'center'}}),
    margin: 10,
  },
  instructions: {
    ...Platform.select({android: {textAlign: 'center'}}),
    color: '#333333',
    marginBottom: 5,
  },
  button: {
   //...Platform.select({android: {textAlign: 'center'}}),
    color: '#333333',
    marginBottom: 5,
    marginLeft: 10
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
      //backgroundColor: 'powderblue',
  },
  bottomIcon: {
      width: 25,
      height: 25,
      justifyContent: 'center',
      alignItems: 'center',


      //backgroundColor: 'powderblue',
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
      height: 75,
      marginTop:20


  }
});
