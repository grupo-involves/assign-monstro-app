import React, {PureComponent} from 'react';
import {Image, StyleSheet} from "react-native";
import NavigationBar from 'react-native-navbar';

import colors from './../../colors';

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
                    <Image
                        source={require('./assets/AppNavigationBar-profile.png')}
                        style={styles.navigationBarProfile}
                    />
                }
            />
        )
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
        width: 18,
        height: 34,
        marginTop: 5,
        marginRight: 8,
        resizeMode: 'contain',
    }
});

export default AppNavigationBar;
