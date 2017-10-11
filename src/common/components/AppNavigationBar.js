import React, {PureComponent} from 'react';
import NavigationBar from 'react-native-navbar';

import colors from './../../colors';
import {StyleSheet, View} from "react-native";

class AppNavigationBar extends PureComponent {
    render() {
        return (
            <NavigationBar
                title={titleConfig}
                rightButton={rightButtonConfig}
                containerStyle={styles.container}
                style={styles.navigationBar}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        paddingTop: 24,
    },
    navigationBar: {
      backgroundColor: colors.white,
    },
});

const rightButtonConfig = {
    title: 'Next',
    handler: () => alert('hello!'),
};

const titleConfig = {
    title: 'Hello, world',
};

export default AppNavigationBar;
