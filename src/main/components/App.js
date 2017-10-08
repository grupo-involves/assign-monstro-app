import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import autobind from 'class-autobind';
import routerService from './../services/RouterService'

class App extends Component {
    constructor() {
        super();
        autobind(this);

        routerService.addOnRouteChangeListener(this.onRouteChange)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Open up App.js to start working on your app!</Text>
                <Text>Changes you make will automatically reload.</Text>
                <Text>Shake your phone to open the developer menu.</Text>
            </View>
        );
    }

    onRouteChange() {
        this.setState(this.state);
    }

    componentWillUnmount() {
        routerService.removeOnRouteChangeListener(this.onRouteChange)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;
