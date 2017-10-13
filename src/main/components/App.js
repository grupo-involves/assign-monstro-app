import React, {Component} from 'react';
import {ScrollView, Text, View} from "react-native";
import autobind from 'class-autobind';

import routerService from './../services/RouterService'

import Home from "../../home/components/Home";
import Login from './../../login/components/Login';
import AppNavigationBar from "../../common/components/AppNavigationBar";
import AppBottomNavigationBar from "../../common/components/AppBottomNavigationBar";

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
                        this.state.currentRoute === routerService.routes.login
                            ? (<Login/>)
                            : (
                                <View style={{flex: 1}}>
                                    <AppNavigationBar/>
                                    {
                                        this.state.currentRoute === routerService.routes.home ? <Home/>
                                            : <Text style={{paddingTop: 50}}>No view defined</Text>
                                    }
                                    <AppBottomNavigationBar/>
                                </View>
                            )
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
