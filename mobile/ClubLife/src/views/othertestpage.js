import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

export default class OtherTestPage extends Component {
    render() {
        return (
                <View style={styles.page}>
                    <Text>
                        This is another test page.
                    </Text>
                    <Text>
                        Current navigator routes:
                    </Text>
                    <Text style={styles.routeText}>
                        {JSON.stringify(this.props.navigator.getCurrentRoutes())}
                    </Text>
                    <TouchableHighlight onPress={this.props.onGoBack} style={styles.go}>
                        <Text style={styles.centertext}>
                            touch me to go back
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.props.onGoForward} style={styles.go}>
                        <Text style={styles.centertext}>
                            Go forward
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.props.onGoOther} style={styles.go}>
                        <Text style={styles.centertext}>
                            Go other
                        </Text>
                    </TouchableHighlight>
                </View>
        );
    }
}

var styles = StyleSheet.create({
    page: {
        paddingTop: 40
    },
    routeText: {
        color: 'blue'
    },
    go: {
        backgroundColor: 'green',
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 10
    },
    centertext: {
        textAlign: 'center'
    }
});