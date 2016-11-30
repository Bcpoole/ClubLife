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
} from 'react-native';
import LoadingView from '../components/loadingview';
//import TabNavigator from 'react-native-tab-navigator';
import Communications from 'react-native-communications';
import Button from 'react-native-button';

export default class EditEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasData: false,
            data: {},
            eventSubject:"",
            eventContent:"",
            eventStartTime:"",
            eventEndTime:"",
            eventStartDate:"",
            
        };
        this._type = this.props.type || ""; // edit or create
    }

    render() {
        
        if(this._type === "edit" && !this.state.hasData) {
            return <LoadingView/>;
        }
        
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
                value={this.state.evenStartDate}
            />

        );

        var startTime = (
            <TextInput
                style={{height: 40}}
                onChangeText={(text)=>{this.setState({eventStartTime: text})}}
                value={this.state.evenStartTime}
            />

        );

          var endTime = (
            <TextInput
                style={{height: 40}}
                onChangeText={(text)=>{this.setState({eventEndTime: text})}}
                value={this.state.evenEndTime}
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
                <Text>End Time</Text>
                {endTime}
                {submitButton}
                {cancelButton}
            </View>
        );
        return content;
    }

    componentDidMount() {
        if(this._type === "edit") {
            let eventId = this.props.route.state.eventId;
            let url = "";
            fetch(url)
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        hasData: true,
                        data: json,
                        eventContent: json.content,
                        eventSubject: json.subject,
                        startTime: json.startTime, // FIX HERE
                        startDate: json.startTime,
                        endTime: json.endTime
                    });
                })
                .catch(e => console.error(e));
        }
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

    _setDateTime(dateStr, time) { // date = "11/30/2011"  time="09.17 PM" or AM
        var date = Date.parse(dateStr);
        alert(dateStr);

        var index = time.indexOf("."); // replace with ":" for differently displayed time.
        var index2 = time.indexOf(" ");

        var hours = time.substring(0, index);
        var minutes = time.substring(index + 1, index2);

        var mer = time.substring(index2 + 1, time.length);
        if (mer == "PM"){
            hours = hours + 12;
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
            startTime:this._setDateTime(this.state.startTime,this.state.eventStartDate),
            endTime:this._setDateTime(this.state.endTime,this.state.eventStartDate),
            rsvp:"",
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
                    "Succesfully made post",
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

    // _makeUpdateRequest() {
    //     let clubId = this.props.route.state.club.id;
    //     let url = "http://skeleton20161103012840.azurewebsites.net/api/Orgnanizations/events/"+this.state.data.id;
    //     let body = Object.assign({}, this.state.data,
    //         {author: this.props.route.state.user.id, subject: this.state.postSubject, content: this.state.postContent});
    //     let headers = {'Accept': 'application/json', 'Content-Type': 'application/json'};
    //     let parseResponse = res => res.text().then(text => text ? JSON.parse(text) : {});
    //     fetch(url, {method: "POST", headers: headers, body: body})
    //         .then(parseResponse)
    //         .then(json => {
    //             Alert.alert(
    //                 "Succesfully edited post",
    //                 "Click OK to return",
    //                 [
    //                     {text: "OK", onPress: () => this.props.navigator.pop()}
    //                 ]
    //             );
    //         })
    //         .catch(e => {
    //             Alert.alert(
    //                 "Oops!",
    //                 "An error occurred.",
    //                 [
    //                     {text: "Return", onPress: () => this.props.navigator.pop()}
    //                 ]
    //             );
    //         });
    // }

    // _onCancel() {
    //     this.props.navigator.pop();
    // }
}
