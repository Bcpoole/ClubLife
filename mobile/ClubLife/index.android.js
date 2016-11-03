import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import ClubLifeNavigator from './src/components/clublifenavigator';

export default class ClubLife extends Component {

    render() {
        return (
            <ClubLifeNavigator
            />
        );
    }

}

AppRegistry.registerComponent('ClubLife', () => ClubLife); //DO NOT TOUCH THIS LINE
