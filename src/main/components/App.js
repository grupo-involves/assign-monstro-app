import React, {Component} from 'react';
import {ScrollView, Text, View} from "react-native";
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
        return (
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={{flex: 1}}>
                    {
                        this.state.currentRoute === routerService.routes.login ? <Login/>
                            : this.state.currentRoute === routerService.routes.home ? <Home/>
                            : <Text>No view defined</Text>
                    }
                </View>
            </ScrollView>
        );
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

export default App;
