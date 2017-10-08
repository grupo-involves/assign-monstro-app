import React, {Component} from 'react';
import {Button, Image, Text, View} from 'react-native';
import {AuthSession} from 'expo';
import autobind from 'class-autobind';

import config from './../../config'

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
            <Button title="Open FBZ Auth" onPress={this._handlePressAsync}/>
        )
    }

    async _handlePressAsync() {
        let redirectUrl = AuthSession.getRedirectUrl();

        // You need to add this url to your authorized redirect urls on your Facebook app
        console.log({redirectUrl});

        // NOTICE: Please do not actually request the token on the client (see:
        // response_type=token in the authUrl), it is not secure. Request a code
        // instead, and use this flow:
        // https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/#confirm
        // The code here is simplified for the sake of demonstration. If you are
        // just prototyping then you don't need to concern yourself with this and
        // can copy this example, but be aware that this is not safe in production.

        let result = await AuthSession.startAsync({
            authUrl:
            `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
            `&client_id=${config.FB_APP_ID}` +
            `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
        });

        if (result.type !== 'success') {
            console.error({result});
            alert('Uh oh, something went wrong');
            return;
        }

        let accessToken = result.params.access_token;
        let userInfoResponse = await fetch(
            `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,picture.type(large)`
        );
        const userInfo = await userInfoResponse.json();
        this.setState({userInfo});
    };
}

export default Login;
