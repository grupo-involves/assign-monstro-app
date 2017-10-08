import autobind from 'class-autobind';

class RouterService {
    constructor() {
        this.routes = Object.freeze({
            login: "login",
            home: "home",
        });

        this.onRouteChangeListeners = [];

        this.currentRoute = this.routes.login;

        autobind(this);
    }

    get currentRoute() {
        return this._currentRoute;
    }

    set currentRoute(v) {
        this._currentRoute = v;
        this.onRouteChangeListeners.forEach((l) => l())
    }

    addOnRouteChangeListener(listener) {
        this.onRouteChangeListeners.push(listener);
    }

    removeOnRouteChangeListener(listener) {
        this.onRouteChangeListeners = this.onRouteChangeListeners.filter((l) => l !== listener);
    }

    goToLogin() {
        this.currentRoute = this.routes.login;
    }

    goToHome() {
        this.currentRoute = this.routes.home;
    }
}

const routerService = new RouterService();

export default routerService;
