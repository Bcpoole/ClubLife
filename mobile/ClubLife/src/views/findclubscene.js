import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class FindClubScene {
    constructor(props) {
        super(props);
        this.state = {
            hasData: false, // turns true once we make the actual API call,
            error: false,
            data: {}
        };
    }

    render() {
        var content = (
            <View>

            </View>
        );
        if(this.state.error) {
            return (
                <View>
                    <Text>
                    An error occurred.
                    </Text>
                </View>
            );
        }
        if(!this.state.hasData) {
            return (
                <View>
                    <Text>
                        Loading data...
                    </Text>
                </View>
            );
        }
        else {
            //TODO: figure out what to render once we fetch data

        }

    }

    componentDidMount() {
        fetch("TODO: WHERE IS THE ENDPOINT")
            .then(res=>res.json())
            .then(json=> {
                var foo = json; // TODO: see what the JSON is.
                this.setState({
                    hasData: true,
                    data: {
                        foo: foo //TODO: fix
                    }
                })
            })
            .catch(e => {
                console.error(e);
                //TODO: figure out how to navigate back out if something went wrong
            })
    }
}
