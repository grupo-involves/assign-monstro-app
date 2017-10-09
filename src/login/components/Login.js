import React, {Component} from 'react';
import {Button, View} from 'react-native';
import autobind from 'class-autobind';

import routerService from './../../main/services/RouterService'

import loginService from '../services/LoginService'

class Login extends Component {
    constructor() {
        super();
        autobind(this);

        loginService.doAuthFromPreviousLogin()
            .then((userInfo) => {
                if (userInfo != null) {
                    routerService.goToHome();
                }
            });
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Button title="Open FB Auth" onPress={this._handleFacebookLogin}/>
            </View>
        );
    }

    async _handleFacebookLogin() {
        await loginService.doFacebookLogin();
        routerService.goToHome();
    };
}

export default Login;
