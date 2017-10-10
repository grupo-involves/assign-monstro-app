import React, {Component} from 'react';
import {Button, Image, Text, View} from 'react-native';
import Expo from 'expo';
import autobind from 'class-autobind';

import loginService from '../../login/services/LoginService'

class Home extends Component {
    constructor() {
        super();
        autobind(this);
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{alignItems: 'center'}}>
                    <Image
                        source={{uri: loginService.currentUserInfo.picture.data.url}}
                        style={{width: 100, height: 100, borderRadius: 50}}
                    />
                    <Text style={{fontSize: 20}}>{loginService.currentUserInfo.name}</Text>
                    <Text>ID: {loginService.currentUserInfo.id}</Text>

                    <Button title="Log location" onPress={this._handleGetLocation}/>
                    <Button title="Sair" onPress={this._handleLogoff}/>
                </View>
            </View>
        );
    }

    async _handleGetLocation() {
        const {Permissions} = Expo;
        const {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
            navigator.geolocation.getCurrentPosition(
                function () {
                    console.log("location");
                    console.log(arguments[0]);
                },
                function () {
                    console.error("geolocation.getCurrentPosition error");
                    console.error(arguments);
                    alert("erro ao buscar localizacao")
                },
                {enableHighAccuracy: true, timeout: 25000, maximumAge: 3600000}
            );
        } else {
            console.log("not granted");
            alert('Hey! You might want to enable notifications for my app, they are good.');
        }
    }   

    async _handleLogoff() {
        await loginService.logoff();
    }
}

export default Home;
