import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native';


class AllViews extends Component {
    constructor(props){
        super(props);
    }
    render() {
        var TouchableElement = TouchableNativeFeedback;
        return (
            <ScrollView style={styles.container}>
                <Text>
                    {"lol this page lists all our views so it's easy to debug stuffs"}
                </Text>
                {this.props.views.map((view,i) => {
                    return (
                        <TouchableElement onPress={view.pressCallback} key={'view'+i}>

                            <View style={{height: 80}}>
                                <Text>
                                    {view.name}
                                </Text>
                            </View>
                        </TouchableElement>
                    );
                })}
            </ScrollView>
        );
    }



}

module.exports = AllViews;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
    }
});
