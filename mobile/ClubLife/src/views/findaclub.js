import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableNativeFeedback } from 'react-native';

export default class FindAClub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: 'name',
            filterName: ''
        };

        this._loadingView = this._loadingView.bind(this);
        this._resultsView = this._resultsView.bind(this);
        this.DEFAULT_IMG = "https://avatars2.githubusercontent.com/u/12243827?v=3&s=40"; //hey it me
        this._navigateToClub = this._navigateToClub.bind(this);
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
        var data = this.props.clubList;
        //sort data in-place by name
        if(this.state.sort === 'name'){
            data.sort((a,b) => a.name.localeCompare(b.name));
        }
        //TODO: add more filters
        if(this.state.filterName) {
            data = data.filter((club) => club.name.startsWith(this.state.filterName));
        }

        var TouchableElement = TouchableNativeFeedback;
        var content = (
            <View>
                <TextInput
                    style={{paddingTop: 20}}
                    placeholder={"filter clubs by name"}
                    onChangeText={(filterName)=>{this.setState({filterName: filterName});}}
                    >
                </TextInput>
                <ScrollView>
                    {data.map(club => {
                        return (
                            <View key={club.name} style={{flex: 1, flexDirection: 'row'}}>
                                <TouchableElement
                                    onPress={()=>this._navigateToClub(club)}>
                                    <Image
                                        source={{uri: club.img || this.DEFAULT_IMG}}
                                        style={{height: 40, width: 40}}
                                    />
                                </TouchableElement>
                                <Text>
                                    {club.name+" PresidentName: "+club.presidentName}
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
        return this.props.clubList ? this._resultsView() : this._loadingView();
    }

    _navigateToClub(club) {
        this.props.navigator.push({
            type: "club",
            index: this.props.route.index+1,
            clubName: club.name
        });
    }
}
