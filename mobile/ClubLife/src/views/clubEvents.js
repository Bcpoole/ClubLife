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
  Platform,
} from 'react-native';
import LoadingView from '../components/loadingview';
//import TabNavigator from 'react-native-tab-navigator';
import Communications from 'react-native-communications';
import Button from 'react-native-button';

export default class ClubEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasData: false,
            data: []
        };
    }

    render() {
        var clubData = this.props.route.state.clubData;
        var user = this.props.route.state.user;


        var TouchableElement = Platform.select({
            android: TouchableNativeFeedback,
            ios: TouchableOpacity
        });

        var eventsList = [];
        var events = this.props.route.state.events;
        let i = 0;
        for (let event of events){
            eventsList.push(
                //  <TouchableElement onPress={() => this._onGoEvent(event)}>
                 <View key={"eeevent"+i}>

                 <Button onPress={()=>this._onGoEvent(event)} style={{fontSize: 20, color:'gray', textAlign: 'left', marginLeft: 20}}>
                     {event.subject+"\n\n"}
                 </Button>

                 </View>




            );
            i++;
        }


        return (

            <ScrollView style = {{marginTop: 40, paddingBottom: 30}}>
                <View>
                    <Text  style={{fontSize: 25, color:'#800000', textAlign: 'center', marginLeft: 10}}>{this.props.route.state.club.name} Events: {"\n\n"}</Text>
                    {eventsList}
                </View>

            </ScrollView>



        );
    }

    componentDidMount() {
        /* fetch
    }
    _onDeleteEvent() {
        /* confirm the deletion */
    }

    _onGoEditEvent(event) {
        var nextState = Object.assign({}, this.props.route.state, {event: event});
        this.props.navigator.push({
            type: "editEvent",
            index: this.props.route.index+1,
            state: nextState
        });
    }

    _onGoCreateEvent() {
        this.props.navigator.push({
            type: "createEvent",
            index: this.props.route.index+1,
            state: this.props.route.state
        });
    }

    _onGoEvent(event) {
        var nextState = Object.assign({}, this.props.route.state, {event: event});
        this.props.navigator.push({
            type: "event",
            index: this.props.route.index+1,
            state: nextState
        });
    }
}

 const styles = StyleSheet.create({
      container: {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F5FCFF',
      },
      ClubLife: {
          fontSize: 50,
          textAlign: 'center',
          color: 'white',
          backgroundColor: 'black',
          fontWeight: 'bold',
      },
      announcements: {
          fontSize: 30,
          textAlign: 'center',
          color: 'black',
          backgroundColor: 'powderblue',
          paddingTop: 10,
          paddingBottom: 30,
          fontWeight: 'bold',
      },
      BottomBar: {
          fontSize: 12,
          color: 'black',
          backgroundColor: 'skyblue',
      },
      bottomIcon: {
          width: 25,
          height: 25,
          backgroundColor: 'skyblue',
      },

      description: {
          fontSize: 10,
          textAlign: 'center',
          color: '#FFFFFF'
      },
      newsFeed: {
          fontSize: 25,
          textAlign: 'center',
          justifyContent: 'center',
          color: 'black',
          backgroundColor: 'powderblue',
      },
      bold: {
          fontWeight: 'bold',
      },
      newsFeedPadding: {
          paddingBottom: 20,
      },
    });
