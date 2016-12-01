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

export default class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            textOp: 1,
            boxOp: 0
        };
        this._onGoClub = this._onGoClub.bind(this);
    }
    render() {
        var TouchableElement = Platform.select({
            ios: TouchableOpacity,
            android: TouchableNativeFeedback
        });
        return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.textEdit}>Club Name</Text>

                <TextInput
                style={styles.textEdit}
                autoCorrect={false}
                onChangeText={(text) => this.setState({nextUserState: Object.assign(this.state.nextUserState, {name: text})})}
                placeholder={Please enter event location}/>

                //Time/Date for makeEvent will be a series of picker boxes in a row? [Day] [Time] [AM/PM]
                <Picker
                    style={styles.picker}
                    selectedValue={this.state.selected1}
                    onValueChange={this.onValueChange.bind(this, 'selected1')}>
                    <Item label="Mon" value="key0" />
                    <Item label="Tue" value="key1" />
                    <Item label="Wed" value="key2" />
                    <Item label="Thu" value="key3" />
                    <Item label="Fri" value="key4" />
                    <Item label="Sat" value="key5" />
                    <Item label="Sun" value="key6" />
                </Picker>

                <TextInput
                style={styles.textEdit}
                autoCorrect={true}
                onChangeText={(text) => this.setState({nextUserState: Object.assign(this.state.nextUserState, {name: text})})}
                placeholder={Please enter event description}/>
            </View>

            {
                userClubs.length ? (
                    userClubs.map(club => {
                        return (
                            <TouchableElement onPress={()=>this._onGoClub(club)}>
                                <Text style={styles.instructions}>
                                    {club.name}
                                </Text>
                            </TouchableElement>
                        );
                    })
                ) :
                <TouchableElement onPress={()=>this._onGoFindAClub()}>
                    <View><Text style={styles.instructions}>You aren't in any clubs! How about finding a club?</Text></View>
                </TouchableElement>
            }
        </View>
        );
    }

    _onGoClub(club) {
        this.props.navigator.push({
            type: "club",
            index: this.props.route.index+1,
            state: Object.assign({}, this.props.route.state, {club: club})
        });
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 40
  },
  welcome: {
    fontSize: 20,
    ...Platform.select({android: {textAlign: 'center'}}),
    margin: 10,
  },
  instructions: {
    ...Platform.select({android: {textAlign: 'center'}}),
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    ...Platform.select({android: {textAlign: 'center'}}),
    color: '#333333',
    marginBottom: 5,
  },
  profilepic: {
      height: 100,
      width: 100

  },
  edit: {
      height: 25,
      width: 25,

  },
  textEdit: {
    height: 40,
    width: 200,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1
  },
  box: {
      flexDirection: 'row',
      flexWrap: 'wrap'

  },
  longBox: {
      height: 125

  }
});
