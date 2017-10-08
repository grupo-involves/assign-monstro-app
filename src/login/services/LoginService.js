import {AsyncStorage} from 'react-native'
import {AuthSession} from 'expo';
import autobind from 'class-autobind';
import deepFreeze from 'deep-freeze';

import config from './../../config'

const STORAGE_KEY_USER_ACCESS_TOKEN = "app.facebookAuthAccessToken";

class LoginService {
    constructor() {
        autobind(this);
        this._currentUserInfo = null;
    }

    async doFacebookLogin() {
        const accessToken = await this.fetchAccessToken();

        const userInfo = await this.fetchUserInfo(accessToken);
        this.currentUserInfo = userInfo;

        return userInfo;
    }

    async doAuthFromPreviousLogin() {
        try {
            console.log("getAccessToken " + new Date());
            const accessToken = await this.getAccessToken();
            console.log("getAccessToken done " + new Date())

            if (accessToken == null) {
                console.log("no previous login available");
                return null;
            }

            const userInfo = await this.fetchUserInfo(accessToken);
            this.currentUserInfo = userInfo;

            return userInfo;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    //
    /** @private */
    async fetchAccessToken() {
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

        const accessToken = result.params.access_token;
        await this.saveAccessToken(accessToken);
        return accessToken;
    }

    /** @private */
    async saveAccessToken(userInfo) {
        await AsyncStorage.setItem(STORAGE_KEY_USER_ACCESS_TOKEN, userInfo)
    }

    /** @private */
    async getAccessToken() {
        return await AsyncStorage.getItem(STORAGE_KEY_USER_ACCESS_TOKEN);
    }

    /** @private */
    async removeAccessToken() {
        return await AsyncStorage.removeItem(STORAGE_KEY_USER_ACCESS_TOKEN);
    }

    /** @private */
    async fetchUserInfo(accessToken) {
        console.log(`doing fetchUserInfo with accessToken ${accessToken}`);
        let userInfoResponse = await fetch(
            `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,picture.type(large)`
        );
        let userInfo = await userInfoResponse.json();
        userInfo = deepFreeze(userInfo);
        return userInfo;
    }

    get currentUserInfo() {
        return this._currentUserInfo;
    }

    set currentUserInfo(currentUserInfo) {
        this._currentUserInfo = currentUserInfo;
        console.log("currentUserInfo updated");
        console.log({currentUserInfo});
    }
}

export default new LoginService()
