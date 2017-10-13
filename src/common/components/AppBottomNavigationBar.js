import React, {Component} from 'react'
import {Image, StyleSheet} from "react-native";
import BottomNavigation, {Tab} from 'react-native-material-bottom-navigation'

class AppBottomNavigationBar extends Component {
    render() {
        return (
            <BottomNavigation
                backgroundColor="#fcfcfc"
                style={styles.navigationBar}
                onTabChange={(newTabIndex) => alert(`New Tab at position ${newTabIndex}`)}
            >
                <Tab
                    label="Meus envios"
                    icon={
                        <Image
                            source={require('./assets/AppBottomNavigationBar-fight.png')}
                            style={styles.navigationBarFight}
                        />
                    }
                />
                <Tab
                    label="Batalha de PDV"
                    icon={
                        <Image
                            source={require('./assets/AppBottomNavigationBar-fight.png')}
                            style={styles.navigationBarFight}
                        />
                    }
                />
            </BottomNavigation>
        )
    }
}


const styles = StyleSheet.create({
    navigationBar: {
        backgroundColor: "#f0f0f0",
        height: 56,
        elevation: 8,
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
    },
    navigationBarFight: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
});


export default AppBottomNavigationBar;
