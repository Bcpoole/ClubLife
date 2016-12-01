import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableNativeFeedback,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
} from 'react-native';

class Event extends Component {
    constructor(props){
        super(props);
        this.state = {
            hasData: false,
            data: [],
        };
    }


    render() {
        var event = this.props.route.state.event;
        let timeText =  (()=>{
                var startTime = this.props.route.state.event.startTime;
                var timeObj = startTime.split("T");
                var timeArr = timeObj[1].split(":");
                var time=timeArr[0]+":"+timeArr[1];
                return time;
            })();//`${new Date(event.startTime).toString()}`;
        let dateText = (()=>{
                var startTime = this.props.route.state.event.startTime;
                var timeObj = startTime.split("T");
                var dateArr = timeObj[0].split("-");
                var date=dateArr[1]+"/"+dateArr[2]+"/"+dateArr[0];
                return date;
            })();
        var user = this.props.route.state.user;
        var club = this.props.route.state.club;
        var officerOps = <Text></Text>;
        var TouchableElement = Platform.select({
            ios: TouchableOpacity,
            android: TouchableNativeFeedback
        });

        if(club.leaders.indexOf(user.id)>-1 || club.officers.indexOf(user.id)>-1){
            officerOps =
                <TouchableElement onPress={()=>this._onGoEditEvent()}>
                    <View>
                        <Text style ={{...Platform.select({android: {textAlign: 'right'}}), marginRight:10, marginTop:10}}>
                            Edit Event
                        </Text>
                    </View>
                </TouchableElement>


        }


        return (
          <View style={{marginTop: 40}}>

            {officerOps}
            <Text style={{fontSize: 30, color:'#800000', ...Platform.select({android: {textAlign: 'center'}})}}>{"\n"+event.subject+":\n\n"}</Text>
            <View style={{width: 375, height: 65}}>
                <Text style={{fontSize: 20,...Platform.select({android: {textAlign: 'left'}}),marginLeft:10}}>Date:</Text>
                <Text style ={{...Platform.select({android: {textAlign: 'left'}}),marginLeft:20}}>{dateText}</Text>
                <Text style={{fontSize: 20,...Platform.select({android: {textAlign: 'left'}}),marginLeft:10}}>{"\n\n"}Time (Military time)</Text>
                <Text style ={{...Platform.select({android: {textAlign: 'left'}}),marginLeft:20}}>{timeText}</Text>
                <Text style={{fontSize: 20,...Platform.select({android: {textAlign: 'left'}}),marginLeft:10}}>{"\n\n"}Description:</Text>
                <Text style={{marginLeft:20}}>{event.content}</Text>
            </View>
          </View>
        );
      }

      _onGoHome(){
          this.props.navigator.push({
              type: "homepage",
              index: this.props.route.index+1,
              state: this.props.route.state
          })
      }

      _onGoFindAnEvent() {
          this.props.navigator.push({
              type: "findanevent",
              index: this.props.route.index+1,
              state: this.props.route.state
          })
      }
      _onGoEvents() {
          this.props.navigator.push({
              type: "testpage",
              index: this.props.route.index+1,
              state: this.props.route.state
          })
      }
       _onGoEditEvent() {
          this.props.navigator.push({
              type: "editEvent",
              index: this.props.route.index+1,
              state:this.props.route.state
              //state: Object.assign({}, this.props.route.state, {event: this.props.route.state.event})
          })
      }

    }


    module.exports = Event;

    const styles = StyleSheet.create({
      container: {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F5FCFF',
      },
      ClubLife: {
          fontSize: 50,
          ...Platform.select({android: {textAlign: 'center'}}),
          color: 'white',
          backgroundColor: 'black',
          fontWeight: 'bold',
      },
      announcements: {
          fontSize: 30,
          ...Platform.select({android: {textAlign: 'center'}}),
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
          ...Platform.select({android: {textAlign: 'center'}}),
          color: '#FFFFFF'
      },
      newsFeed: {
          fontSize: 25,
          ...Platform.select({android: {textAlign: 'center'}}),
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
