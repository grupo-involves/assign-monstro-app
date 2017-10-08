import React, {Component} from 'react';
import {Button, Image, Text, View} from 'react-native';
import autobind from 'class-autobind';

import loginService from '../services/LoginService'

class Login extends Component {
    constructor() {
        super();
        autobind(this);

        this.state = {
            userInfo: null,
        };
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                {
                    this.state.userInfo != null
                        ? (this._renderUserInfo())
                        : (this._renderLoginButton())
                }
            </View>
        );
    }

    _renderUserInfo() {
        return (
            <View style={{alignItems: 'center'}}>
                <Image
                    source={{uri: this.state.userInfo.picture.data.url}}
                    style={{width: 100, height: 100, borderRadius: 50}}
                />
                <Text style={{fontSize: 20}}>{this.state.userInfo.name}</Text>
                <Text>ID: {this.state.userInfo.id}</Text>
            </View>
        );
    };

    _renderLoginButton() {
        return (
            <Button title="Open FB Auth" onPress={this._handlePressAsync}/>
        )
    }

    async _handlePressAsync() {
        let userInfo = await loginService.doFacebookLogin();
        this.setState({userInfo});
    };
}

export default Login;
