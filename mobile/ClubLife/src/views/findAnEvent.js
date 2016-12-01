import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, Image } from 'react-native';
import LoadingView from '../components/loadingview';

export default class FindAnEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasData: false, // turns true once we make the actual API call,
            error: false,
            data: [],
            sort: 'name',
            filterName: ''
        };

        this._errorView = this._errorView.bind(this);
        this._resultsView = this._resultsView.bind(this);
    }

    _errorView() {
        return (
            <View>
                <Text>
                    An error occurred. You should go back.
                </Text>
            </View>
        );
    }

    _resultsView() {
        //failsafe
        if(this.state.error) {
            return this._errorView();
        }
        var data = [...this.state.data]; //make a copy so we don't directly mess with the state
        //sort data in-place by name
        if(this.state.sort === 'name'){
            data.sort(function(a,b){
                return new Date(b.startTime) - new Date(a.startTime);
            });
        }
        if(this.state.filterName) {
            data = data.filter((event) => event.subject.toLowerCase().startsWith(this.state.filterName.toLowerCase()));
        }
        var defaultImg = "https://avatars2.githubusercontent.com/u/12243827?v=3&s=40"
        var content = (
            <View style={{marginTop: 40}}>
                <TextInput
                    style={{paddingTop: 20}}
                    placeholder={"filter events by name"}
                    onChangeText={(filterName)=>{this.setState({filterName: filterName});}}
                    >
                </TextInput>
                <ScrollView>
                    {data.map((event,i) => {
                        return (
                            <View key={"f"+i} style={{flex: 1, flexDirection: 'row'}}>
                                <Text>
                                    {event.subject+" EventTime: "+event.startTime}
                                </Text>
                            </View>
                        );
                    })}
                </ScrollView>
                <View style={{paddingTop: 40}}>
                    <Text>{`Pressing on events to go to the event page \"coming soon\"`}</Text>
                </View>
            </View>
        );
        return content;

    }

    render() {
        var content = (
            <View></View>
        );
        if(this.state.error) {
            content = this._errorView();
        }
        if(!this.state.hasData) {
            content = <LoadingView />;
        }
        else {
            //TODO: figure out what to render once we fetch data
            content = this._resultsView();
        }
        return content;
    }

    componentDidMount() {
        const url = "http://skeleton20161103012840.azurewebsites.net/api/organizations/publicEvents";
        fetch(url)
            .then(res=>res.json())
            .then(json => {
                this.setState({
                    hasData: true,
                    data: json
                })
            })
            .catch(e => {
                console.error(e);
                //TODO: figure out how to navigate back out if something went wrong
            })
    }
}
