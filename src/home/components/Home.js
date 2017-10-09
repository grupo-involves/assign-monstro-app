import React, {Component} from 'react';
import {Button, Image, Text, View} from 'react-native';
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

                    <Button title="Sair" onPress={this._handleLogoff}/>
                </View>
            </View>
        );
    }

    async _handleLogoff() {
        await loginService.logoff();
    }
}

export default Home;
