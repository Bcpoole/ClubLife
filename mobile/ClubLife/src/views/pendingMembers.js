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

class PendingMembers extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedTab: 'home',
            clubData: Object.assign({},this.props.route.state.club),
            loadedMembers: {}
        };
    }

    render (){
        var TouchableElement = TouchableNativeFeedback;
        var pendingRequests = this.state.clubData.pendingRequests;
        var user = this.props.route.state.user;
        var canApprove = (this.state.clubData.leaders.indexOf(user.id) > -1 ||
                            this.state.clubData.officers.indexOf(user.id) > -1);

        var goBack = (
            <TouchableElement onPress={()=>this._onGoBack()}>
                <View>
                    <Text>Go back</Text>
                </View>
            </TouchableElement>
        );
        var pmView = "";
        if(pendingRequests.length === 0) {
            pmView = (
                <View>
                    <Text>No pending requests for this organization.</Text>
                </View>
            );
        }
        else if(pendingRequests.length !== Object.keys(this.state.loadedMembers).length) {
            //if we haven't loaded all the members yet...
            pmView = (
                <View>
                    <Text>Loading pending membership requests...</Text>
                </View>
            );
        }
        else {
            pmView = (
                <View>
                    {pendingRequests.map(id => {
                        var approveButton = canApprove ? (
                            <TouchableElement>
                                <View>
                                    <Text>Approve</Text>
                                </View>
                            </TouchableElement>
                        ): <View></View>;
                        var denyButton = canApprove ? (
                            <TouchableElement onPress={()=>this._denyRequest(id)}>
                                <View>
                                    <Text>Deny</Text>
                                </View>
                            </TouchableElement>
                        ): <View></View>;
                        return (
                            <View>
                                <TouchableElement onPress={()=>this._onGoMemberById(id)}>
                                    <View>
                                        <Text>{this.state.loadedMembers[id].name}</Text>
                                    </View>
                                </TouchableElement>
                                {approveButton}
                                {denyButton}
                            </View>
                        );
                    })}
                </View>
            );
        }
        return (
            <View style={{paddingTop: 40}}>
                <Text>Pending membership requests:</Text>
                {pmView}
                {goBack}
            </View>
        );
    }

    componentDidMount() {
        //load each member in the membership request
        let getMemberRequest = (userId) => {
            let url = "http://skeleton20161103012840.azurewebsites.net/api/Users/"+userId;
            fetch(url)
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        loadedMembers: Object.assign(this.state.loadedMembers, {userId: json})
                    });
                })
                .catch(e => console.error(e));
        };
        for(let memberId of this.props.route.state.club.pendingRequests) {
            getMemberRequest(memberId);
        }
    }

    _onGoMemberById(memberId) {
        //replace the current route with our newest state, since it may have changed
        var upToDateCurrentState = Object.assign({},this.props.route.state,{club: this.state.clubData});
        this.props.navigator.replace({
            type: this.props.route.type,
            index: this.props.route.index,
            state: upToDateCurrentState
        });
        //then go to the user page
        var nextState = Object.assign({},upToDateCurrentState, {memberId: memberId});
        this.props.navigator.push({
            type: "memberPage",
            index: this.props.route.index+1,
            state: nextState
        });
    }

    _denyRequest(memberId) {
        var clubId = this.state.clubData.id;
        var url = "http://skeleton20161103012840.azurewebsites.net/api/Organizations/" + clubId + "/approve/" + memberId;
        fetch(url, {method: "POST", body: JSON.stringify({approved: false})})
            .then(res => res.json())
            .then(json => {})
            .catch(e => console.error(e));

    }

    _approveRequest(memberId) {
        var clubId = this.state.clubData.id;
        var url = "http://skeleton20161103012840.azurewebsites.net/api/Organizations/" + clubId + "/approve/" + memberId;
        fetch(url, {method: "POST", body: JSON.stringify({approved: true})})
            .then(res => res.json())
            .then(json => {})
            .catch(e => console.error(e));
    }

    _onGoBack() {
        //replace the state's club with ours, since we may have changed the member list.
        var nextState =
        this.props.navigator.replacePreviousAndPop({
            type: "club",
            index: this.props.route.index-1,
            state: Object.assign({}, this.props.route.state, {club: this.state.clubData})
        });
    }
}



module.exports = PendingMembers;


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
    //textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    marginLeft: 5
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
