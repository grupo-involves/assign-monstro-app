import React, {Component} from 'react'
import {Image, StyleSheet} from "react-native";
import BottomNavigation, {Tab} from 'react-native-material-bottom-navigation'

import autobind from "class-autobind";

import colors from "../../colors";
import routerService from "../../main/services/RouterService";

class AppBottomNavigationBar extends Component {
    constructor(props) {
        super(props);
        autobind(this);

        this.state = {
            currentRoute: routerService.currentRoute
        };

        routerService.addOnRouteChangeListener(this.onRouteChange)
    }

    render() {
        return (
            <BottomNavigation
                barBackgroundColor="#fcfcfc"
                backgroundColor="#fcfcfc"
                activeLabelColor={colors.orangeDarken}
                style={styles.navigationBar}
                onTabChange={this.onTabChange}
                activeTab={this.currentRouteIndex}
            >
                <Tab
                    label="Galeria"
                    icon={
                        <Image
                            source={require('./assets/AppBottomNavigationBar-gallery.png')}
                            style={styles.navigationBarIcon}
                        />
                    }
                    activeIcon={
                        <Image
                            source={require('./assets/AppBottomNavigationBar-gallery-active.png')}
                            style={styles.navigationBarIcon}
                        />
                    }
                />
                <Tab
                    label="Batalha de PDV"
                    icon={
                        <Image
                            source={require('./assets/AppBottomNavigationBar-fight.png')}
                            style={styles.navigationBarIcon}
                        />
                    }
                    activeIcon={
                        <Image
                            source={require('./assets/AppBottomNavigationBar-fight-active.png')}
                            style={styles.navigationBarIcon}
                        />
                    }
                />
            </BottomNavigation>
        )
    }

    get currentRouteIndex() {
        if (routerService.currentRoute === routerService.routes.gallery) {
            return 0;
        } else if (routerService.currentRoute === routerService.routes.pdvFight) {
            return 1;
        } else {
            console.log(`rota ${routerService.currentRoute} não configurada na barra de navegação`);
            return 0;
        }
    }

    onTabChange(index) {
        if (index === 0) {
            routerService.goToGallery();
        } else if (index === 1) {
            routerService.goToPdvFight()
        }
    }

    onRouteChange() {
        this.setState({
            currentRoute: routerService.currentRoute
        });
    }

    componentWillUnmount() {
        routerService.removeOnRouteChangeListener(this.onRouteChange)
        this.setState = () => {
        }
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
    navigationBarIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
});


export default AppBottomNavigationBar;
