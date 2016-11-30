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
import Button from 'react-native-button';

class EditClub extends Component {
    constructor(props){
        super(props);
        this.variableNames = ({'secondaryAdvisorDepartment':'Secondary Advisor Department','organizationMeetingLocation':'Meeting Location',
        'vicePresidentEmail':'Vice-President Email','presidentEmail':'President Email','parentOrganization':'Parent Organization',
        'organizationMeetingTime':'Meeting Time','advisorEmail':'Advisor Email','vicePresidentName':'Vice-President',
        'advisorPhone':'Advisor Phone','organizationEmail':'Organization Email','secretaryName':'Secretary',
        'advisorDepartment':'Advisor Department','secretaryEmail':'Secretary Email','primarycontact':'Primary Contact',
        'organizationMeetingDay':'Meeting Day','secondaryAdvisorNameAndTitle':'Secondary Advisor','url':'Website','advisorNameAndTitle':'Advisor',
        'secondaryAdvisorPhone':'Secondary Advisor Phone','summary':'Summary','treasurerEmail':'Treasurer Email',
        'secondaryAdvisorEmail':'Secondary Advisor Email','mainSummary':'Main Summary','aboutSummary':'About Summary',
        'name':'Club Name','presidentName':'President'});
        this.initial = {};
        for(let key in this.variableNames) {
            this.initial[key] = this.props.route.state.club[key];
        }
        this.state = this.initial;
    }

    _resultsView(){
        var data = this.state.data;

        var retArr = [];
        var i = 0;
        for(let key in this.variableNames) {
            retArr.push(
                <View key={"input"+i}>
                    <Text style={styles.welcome}>
                        {this.variableNames[key]}:
                    </Text>
                    <TextInput
                        style = {styles.textEdit}
                        onChangeText={(newText)=>{
                            let newStateObject = {};
                            newStateObject[key] = newText; //{key: blah} doesn't work because state."key" literally
                            this.setState(newStateObject);
                            }
                        }
                        defaultValue = {this.state[key]}
                    />
                </View>
            );
            i++;
        }

        return retArr;
    }

    _processSubmit() {
        let club = this.props.route.state.club;
        let url = "http://skeleton20161103012840.azurewebsites.net/api/organizations/"+club.id;
        let body = Object.assign({}, club, this.state);
        let headers = {'Accept': 'application/json', 'Content-Type': 'application/json'};
        let parseResponse = res => res.text().then(text => text ? JSON.parse(text) : {});
        console.log(url);
        console.log(JSON.stringify(body));
        fetch(url, {method: "POST", headers: headers, body: JSON.stringify(body)})
            .then(parseResponse)
            .then(json => {
                this._onGoClub();
            })
            .catch(e => {
                Alert.alert("error","error updating club", [{"text": "leave", onPress: () => this._onGoClub()}]);
            });
    }

    render() {
        var TouchableElement = TouchableNativeFeedback;
        return (
            <View style={{paddingTop: 40}}>
                <View>
                    <TouchableElement style = {styles.button} onPress = {()=>this._processSubmit()}>
                        <View><Text style={{color: 'blue'}}>Submit</Text></View>
                    </TouchableElement>
                    <TouchableElement style = {styles.button} onPress = {()=>this._onGoClub()}>
                        <View><Text style={{color: 'red'}}>Back</Text></View>
                    </TouchableElement>
                </View>
                <ScrollView>
                    {this._resultsView()}
                </ScrollView>
            </View>
        )
    }

    _onGoClub() {
        this.props.navigator.push({
            type: 'club',
            index: this.props.route.index+1,
            state: this.props.route.state,
        })
    }


}

module.exports = EditClub;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
  //  textAlign: 'center',
    margin: 10,
  },
  instructions: {
    //textAlign: 'center',
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
    marginLeft: 20,
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

  },
  boxSpace:{
    //   flexDirection: 'row',
    //   flexWrap: 'wrap',
      paddingTop: 20,
      paddingLeft: 20
  }
});
