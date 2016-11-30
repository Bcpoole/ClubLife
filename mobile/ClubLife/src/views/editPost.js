import React, { Component } from 'react';
import {
  Alert,
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

export default class EditPost extends Component {
    constructor(props) {
        super(props);
        this._type = this.props.type || ""; //expecting "edit" or "create"...Dr. Gray, I'm so sorry
        this.state = {
            postSubject: this._type === "edit" ? this.props.route.state.post.subject : "",
            postContent: this._type === "edit" ? this.props.route.state.post.content : "",
        };
    }

    render() {
        var TouchableElement = TouchableOpacity;
        var titleText = this._type + " post"; //smelly code
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
                onChangeText={(text)=>{this.setState({postSubject: text})}}
                value={this.state.postSubject}
            />
        );
        var contentInput = (
            <TextInput
                style={{height: 40}}
                onChangeText={(text)=>{this.setState({postContent: text})}}
                value={this.state.postContent}
            />
        );
        var content = (
            <View style={{marginTop: 40}}>
                {titleNode}
                <Text>Subject</Text>
                {subjectInput}
                <Text>Content</Text>
                {contentInput}
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

    _makePostRequest() {
        let clubId = this.props.route.state.club.id;
        let url = "http://skeleton20161103012840.azurewebsites.net/api/organizations/"+clubId+"/posts/new";
        let body = {
            "subject": this.state.postSubject,
            "content": this.state.postContent,
            "created": new Date().toJSON(),
            "author": this.props.route.state.user.id,
            "club": clubId
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

    _makeUpdateRequest() {
        let clubId = this.props.route.state.club.id;
        let url = "http://skeleton20161103012840.azurewebsites.net/api/Organizations/posts/"+this.props.route.state.post.id;
        let body = Object.assign({}, this.props.route.state.post,
            {author: this.props.route.state.user.id, subject: this.state.postSubject, content: this.state.postContent});
        let headers = {'Accept': 'application/json', 'Content-Type': 'application/json'};
        let parseResponse = res => res.text().then(text => text ? JSON.parse(text) : {});
        fetch(url, {method: "POST", headers: headers, body: JSON.stringify(body)})
            .then(parseResponse)
            .then(json => {
                Alert.alert(
                    "Succesfully edited post",
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
