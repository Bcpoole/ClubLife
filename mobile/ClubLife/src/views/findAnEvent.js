import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, Image } from 'react-native';

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
        this._loadingView = this._loadingView.bind(this);
        this._resultsView = this._resultsView.bind(this);
    }

    _errorView() {
        return (
            <View>
                <Text>
                An error occurred.
                </Text>
            </View>
        );
    }

    _loadingView() {
        return (
            <View>
                <Text>
                    Loading data...
                </Text>
            </View>
        );
    }

    _resultsView() {
        //failsafe
        if(this.state.error) {
            return this._errorView();
        }
        var data = this.state.data;
        //sort data in-place by name
        if(this.state.sort === 'name'){
            data.sort((a,b) => a.name.localeCompare(b.name));
        }
        //TODO: add more filters
        if(this.state.filterName) {
            data = data.filter((event) => event.name.startsWith(this.state.filterName));
        }
        var defaultImg = "https://avatars2.githubusercontent.com/u/12243827?v=3&s=40"
        var content = (
            <View>
                <TextInput
                    style={{paddingTop: 20}}
                    placeholder={"filter events by name"}
                    onChangeText={(filterName)=>{this.setState({filterName: filterName});}}
                    >
                </TextInput>
                <ScrollView>
                    {data.map(event => {
                        return (
                            <View key={event.name} style={{flex: 1, flexDirection: 'row'}}>
                                <Text>
                                    {event.name+" EventTime: "+event.startTime}
                                </Text>
                            </View>
                        );
                    })}
                </ScrollView>
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
            content = this._loadingView();
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