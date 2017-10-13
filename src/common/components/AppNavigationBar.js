import React, {PureComponent} from 'react';
import {Image, StyleSheet, TouchableHighlight} from "react-native";
import NavigationBar from 'react-native-navbar';

import loginService from "../../login/services/LoginService";

class AppNavigationBar extends PureComponent {
    render() {
        return (
            <NavigationBar
                containerStyle={styles.container}
                style={styles.navigationBar}
                leftButton={
                    <Image
                        source={require('./assets/AppNavigationBar-menu.png')}
                        style={styles.navigationBarMenu}
                    />
                }
                title={
                    <Image
                        source={require('./assets/AppNavigationBar-logo.png')}
                        style={styles.navigationBarLogo}
                    />
                }
                rightButton={
                    <TouchableHighlight onPress={this.onProfileClick}>
                        <Image
                            source={{uri: loginService.currentUserInfo.picture.data.url}}
                            style={styles.navigationBarProfile}
                        />
                    </TouchableHighlight>
                }
            />
        )
    }

    async onProfileClick() {
        await loginService.logoff();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        marginTop: 24,
        elevation: 3,
    },
    navigationBar: {
        backgroundColor: "#f8f8f8",
    },
    navigationBarMenu: {
        width: 28,
        height: 20,
        marginTop: 12,
        marginLeft: 8,
        resizeMode: 'contain',
    },
    navigationBarLogo: {
        width: 184,
        height: 34,
        marginTop: 5,
        resizeMode: 'contain',
    },
    navigationBarProfile: {
        width: 34,
        height: 34,
        borderRadius: 50,
        marginTop: 5,
        marginRight: 8,
        borderWidth: 1,
        borderColor: "#ccc"
    }
});

export default AppNavigationBar;
