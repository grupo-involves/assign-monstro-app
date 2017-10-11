import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Button from 'react-native-button';
import autobind from 'class-autobind';

import colors from './../../colors';

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
            <View style={styles.view}>
                <Button
                    containerStyle={styles.buttonContainerLoginFacebook}
                    style={styles.buttonLoginFacebook}
                    onPress={this._handleFacebookLogin}>
                    Entrar com Facebook
                </Button>
            </View>
        );
    }

    async _handleFacebookLogin() {
        await loginService.doFacebookLogin();
        routerService.goToHome();
    };
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.orange,
    },
    buttonContainerLoginFacebook: {
        backgroundColor: colors.yellow,
        padding: 12,
        borderRadius: 2,
        elevation: 2,
    },
    buttonLoginFacebook: {
        color: colors.white,
        fontSize: 24,
    },
});

export default Login;
