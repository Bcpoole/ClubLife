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
            clubData: JSON.parse(JSON.stringify(this.props.route.state.club)) //deep copy
        };
        this.userList = this.props.route.state.userList;
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
        else {
            pmView = (
                <View>
                    {pendingRequests.map((id,i) => {
                        var approveButton = canApprove ? (
                            <TouchableElement onPress={()=>this._approveRequest(id)}>
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
                            <View key={"fofofo"+i}>
                                <TouchableElement onPress={()=>this._onGoMemberById(id)}>
                                    <View>
                                        <Text>{this._getMemberById(id).name}</Text>
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
        var url = "http://skeleton20161103012840.azurewebsites.net/api/Organizations/" + clubId + "/approve/" + memberId + "?approved=false";
        let headers = {'Accept': 'application/json', 'Content-Type': 'application/json'};
        let parseResponse = res => res.text().then(text => text ? JSON.parse(text) : {});
        fetch(url, {method: "POST"})
            .then(parseResponse)
            .then(json => {
                this._onHandled(memberId);
            })
            .catch(e => console.error(e));

    }

    _approveRequest(memberId) {
        var clubId = this.state.clubData.id;
        var url = "http://skeleton20161103012840.azurewebsites.net/api/Organizations/" + clubId + "/approve/" + memberId + "?approved=true";
        let headers = {'Accept': 'application/json', 'Content-Type': 'application/json'};
        let parseResponse = res => res.text().then(text => text ? JSON.parse(text) : {});
        fetch(url, {method: "POST"})
            .then(parseResponse)
            .then(json => {
                this._onHandled(memberId);
            })
            .catch(e => console.error(e));
    }

    _onHandled(id) {
        let pendingRequests = [...this.state.clubData.pendingRequests];
        var remIndex = pendingRequests.indexOf(id);
        if(remIndex > -1) {
            pendingRequests.splice(remIndex,1);
        }
        var nextState = Object.assign({},this.state.clubData, {pendingRequests: pendingRequests});
        this.setState({
            clubData: nextState
        });
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

    _getMemberById(id) {
        for(let member of this.userList) {
            if(member.id === id) {
                return member;
            }
        }
        return {
            name: "Unknown User"
        }; //handle deleted users...I guess?
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
