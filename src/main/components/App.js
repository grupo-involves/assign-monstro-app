import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import autobind from 'class-autobind';

import routerService from './../services/RouterService'

import Home from './../../home/components/Home';
import Login from './../../login/components/Login';

class App extends Component {
    constructor() {
        super();
        autobind(this);

        this.state = {
            currentRoute: routerService.currentRoute
        };

        routerService.addOnRouteChangeListener(this.onRouteChange)
    }

    render() {
        if (this.state.currentRoute === routerService.routes.login) {
            return (<Login/>)
        } else if (this.state.currentRoute === routerService.routes.home) {
            return (<Home/>)
        } else {
            throw new Error(`state ${this.state.currentRoute} not set up`)
        }
    }

    onRouteChange() {
        this.setState({
            currentRoute: routerService.currentRoute
        });
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
