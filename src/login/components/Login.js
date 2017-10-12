import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Button from 'react-native-button';
import autobind from 'class-autobind';

import colors from './../../colors';

import routerService from './../../main/services/RouterService'
import loginService from './../services/LoginService'
import imageService from './../../common/services/ImageService'

import imageLogo from './assets/Login-logo.png';

class Login extends Component {
    constructor() {
        super();
        autobind(this);

        this.state = {
            imageLogoHeight: null,
        };

        this._handleLogoImageLoad = imageService.autoHeightOnLayoutCallback(
            imageLogo,
            (e) => this.setState({imageLogoHeight: e.autoHeight})
        );

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

                <View style={styles.logoTagLineWrapper}>
                    <View style={styles.imageContainerLogo}>
                        <Image
                            source={imageLogo}
                            style={styles.imageLogo}
                            height={this.state.imageLogoHeight}
                            onLayout={this._handleLogoImageLoad}
                        />
                    </View>

                    <Text style={styles.tagLine}>
                        Tagline inteligente, que venda
                    </Text>
                </View>

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
        paddingBottom: 20,
    },
    logoTagLineWrapper: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainerLogo: {
        flexDirection: 'row',
    },
    imageLogo: {
        flex: 0,
        maxWidth: 400,
        resizeMode: 'contain',
        width: '100%',
    },
    tagLine: {
        color: colors.white,
        fontSize: 24,
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
