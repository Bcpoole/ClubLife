import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableNativeFeedback,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import LoadingView from '../components/loadingview';
//import TabNavigator from 'react-native-tab-navigator';
import Communications from 'react-native-communications';
import Button from 'react-native-button';

export default class EditEvent extends Component {
    constructor(props) {
        super(props);
        this._type = this.props.type || ""; // edit or create
        this.state = {
            eventSubject: this._type === "edit" ? this.props.route.state.event.subject : "",
            eventContent: this._type === "edit" ? this.props.route.state.event.content : "",
            eventStartDate:this._type === "edit" ? (()=>{
                var startTime = this.props.route.state.event.startTime;
                var timeObj = startTime.split("T");
                var dateArr = timeObj[0].split("-");
                var date=dateArr[1]+"/"+dateArr[2]+"/"+dateArr[0];
                return date;
            })()  : "",
            eventStartTime:this._type === "edit" ? (()=>{
                var startTime = this.props.route.state.event.startTime;
                var timeObj = startTime.split("T");
                var timeArr = timeObj[1].split(":");
                var time=timeArr[0]+":"+timeArr[1]+ " AM";
                return time;
            })()  : "",

        };

    }

    render() {



        var TouchableElement = TouchableOpacity;
        var titleText = this._type + " event"; //smelly code
        var titleNode = (
            <View>
                <Text>{titleText}</Text>
            </View>
        );
        var cancelButton = (
            <Button onPress={()=>this._onCancel()} style={{fontSize: 20, color: 'red'}}>
                Cancel</Button>
        );
        var submitButton = (
            <Button onPress={()=>this._onSubmit()} style={{fontSize: 20, color: 'green'}}>
                Submit</Button>
        );
        var subjectInput = (
            <TextInput
                style={{height: 40}}
                onChangeText={(text)=>{this.setState({eventSubject: text})}}
                value={this.state.eventSubject}
            />
        );
        var contentInput = (
            <TextInput
                style={{height: 40}}
                onChangeText={(text)=>{this.setState({eventContent: text})}}
                value={this.state.eventContent}
            />
        );
         var startDate = (
            <TextInput
                style={{height: 40}}
                onChangeText={(text)=>{this.setState({eventStartDate: text})}}
                value={this.state.eventStartDate}
            />

        );

        var startTime = (
            <TextInput
                style={{height: 40}}
                onChangeText={(text)=>{this.setState({eventStartTime: text})}}
                value={this.state.eventStartTime}
            />

        );




        var content = (
            <View>
                {titleNode}
                <Text>Subject</Text>
                {subjectInput}
                <Text>Content</Text>
                {contentInput}
                <Text>Date</Text>
                {startDate}
                <Text>Start Time</Text>
                {startTime}

                {submitButton}
                {cancelButton}
            </View>
        );
        return content;
    }


    _onSubmit() {
        switch(this._type) {
            case "edit":
                this._makeUpdateRequest();
                break;
            case "create":
                this._makePostRequest();
                break;
            default:
                return;
        }
    }

    _setDateTime(dateStr, time) { // date = "11/30/2011"  time="09:17 PM" or AM
        var dateArr = dateStr.split("/");
        var date =  new Date();
        date.setDate(dateArr[1]);
        date.setMonth(parseInt(dateArr[0])-1);
        date.setFullYear(dateArr[2]);

        var index = time.indexOf(":"); // replace with ":" for differently displayed time.
        var index2 = time.indexOf(" ");

        var hours = time.substring(0, index);
        var minutes = time.substring(index + 1, index2);

        var mer = time.substring(index2 + 1, time.length);
        if (mer == "PM"){
            hours = parseInt(hours) + 12;
        }


        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds("00");

        return date;
    }



    _makePostRequest() {
        //alert("here");
        let clubId = this.props.route.state.club.id;
        let url = "http://skeleton20161103012840.azurewebsites.net/api/organizations/"+clubId+"/events/new";
        let body = {
            subject: this.state.eventSubject,
            content: this.state.eventContent,
            created: new Date().toJSON(),
            startTime:this._setDateTime(this.state.eventStartDate,this.state.eventStartTime).toJSON(),
            endTime:new Date(2038,1,1).toJSON(),
            rsvp:[],
            isPublic:true,
            author: this.props.route.state.user.id,
            club: clubId
        };



        let headers = {'Accept': 'application/json', 'Content-Type': 'application/json'};
        let parseResponse = res => res.text().then(text => text ? JSON.parse(text) : {});

        fetch(url, {method: "PUT", headers: headers, body: JSON.stringify(body)})

            .then(parseResponse)
            .then(json => {
                Alert.alert(
                    "Succesfully made event",
                    "Click OK to return",
                    [
                        {text: "OK", onPress: () => this.props.navigator.pop()}
                    ]
                );
            })
            .catch(e => {
                Alert.alert(
                    "Oops!",
                    "An error occurred.",
                    [
                        {text: "Return", onPress: () => this.props.navigator.pop()}
                    ]
                );
            });
    }

 _makeUpdateRequest() {
        let clubId = this.props.route.state.club.id;
        let url = "http://skeleton20161103012840.azurewebsites.net/api/Organizations/events/"+this.props.route.state.event.id;
        let body = Object.assign({}, this.props.route.state.event,
            {author: this.props.route.state.user.id, subject: this.state.eventSubject, content: this.state.eventContent, startTime:this._setDateTime(this.state.eventStartDate,this.state.eventStartTime).toJSON(),});
        let headers = {'Accept': 'application/json', 'Content-Type': 'application/json'};
        let parseResponse = res => res.text().then(text => text ? JSON.parse(text) : {});
        fetch(url, {method: "POST", headers: headers, body: JSON.stringify(body)})
            .then(parseResponse)
            .then(json => {
                Alert.alert(
                    "Succesfully edited event",
                    "Click OK to return",
                    [
                        {text: "OK", onPress: () => this.props.navigator.pop()}
                    ]
                );
            })
            .catch(e => {
                Alert.alert(
                    "Oops!",
                    "An error occurred.",
                    [
                        {text: "Return", onPress: () => this.props.navigator.pop()}
                    ]
                );
            });
    }


    _onCancel() {
        this.props.navigator.pop();
    }
}
