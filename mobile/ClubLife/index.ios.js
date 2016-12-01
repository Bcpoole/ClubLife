import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import ClubLifeNavigator from './src/components/clublifenavigator';


// var Main = require('./src/views/club')
// AppRegistry.registerComponent('ClubLife', () => Main);

export default class ClubLife extends Component {

    constructor(props) {
        super(props);
        console.disableYellowBox = true;
    }


    render() {
        return (
            <ClubLifeNavigator
            />
        );
    }

}
AppRegistry.registerComponent('ClubLife', () => ClubLife); //DO NOT TOUCH THIS LINE
