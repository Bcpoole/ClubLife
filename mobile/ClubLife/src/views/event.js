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
        let timeText = `${new Date(event.startTime).toString()}`;
        var user = this.props.route.state.user;
        var club = this.props.route.state.club;
        var officerOps = <Text></Text>;
        var TouchableElement = TouchableNativeFeedback;

        if(club.leaders.indexOf(user.id)>-1 || club.officers.indexOf(user.id)){
            officerOps =
                <TouchableElement onPress={()=>this._onGoEditEvent()}>
                    <View>
                        <Text style ={{textAlign:'right', marginRight:10, marginTop:10}}>
                            Edit Event
                        </Text>
                    </View>
                </TouchableElement>


        }


        return (
          <View style={{marginTop: 40}}>
            <Text style={styles.ClubLife}>Club Life</Text>
            {officerOps}
            <Text style={{fontSize: 30, color:'#800000', textAlign: 'center'}}>{"\n"+event.subject+":\n\n"}</Text>
            <View style={{width: 375, height: 65}}>
                <Text style={{fontSize: 20,textAlign:'left',marginLeft:10}}>Date and Time:</Text>
                <Text style ={{textAlign:'left',marginLeft:20}}>{timeText}</Text>
                <Text style={{fontSize: 20,textAlign:'left',marginLeft:10}}>{"\n\n"}Description:</Text>
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
              state: this.props.route.state
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
