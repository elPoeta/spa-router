import { Route } from './route.js';

export class Router {
    constructor() {
        this.mode = 'history';
        this.routes = [];
        this.root = '/';
        console.log('new Router...')
    }

    get mode() {
        return this.mode;
    }

    set mode(mode) {
        this.mode = (mode === 'history' && window.history.pushState) ? 'history' : 'hash';
    }

    get root() {
        return this.root;
    }

    set root(root) {
        this.root = root;
    }

    get routes() {
        return this.routes;
    }

    set routes(routes) {
        this.routes = routes;
    }

    add(route) {
        const { name, path, handler } = route;
        this.routes.push(new Route({ name, path, handler }));
        return this;
    }

    navigate(route) {
        route = route ? route : '';
        this.match(route);
    }

    match(route) {
        this.routes
            .forEach(r => {
                let paramNames = [];
                let regexPath = r.path.replace(/([:*])(\w+)/g, (full, colon, name) => {
                    paramNames.push(name);
                    return '([^\/]+)';
                }) + '(?:\/|$)';
                let routeMatch = route.match(new RegExp(regexPath));
                if (routeMatch !== null) {
                    let params = routeMatch
                        .slice(1, routeMatch.length)
                        .reduce((params, value, index) => {
                            if (params === null) {
                                params[paramNames[index]] = value;
                                return params;
                            }
                        }, null);
                    if (params === null) {
                        r.handler();
                    } else {
                        r.handler(params);
                    }
                    this.location(route)
                }
            });
    }

    location(route) {
        if (this.mode === 'history') {
            window.history.pushState(null, null, this.root + route);
        } else {
            route = route.replace(/^\//).replace(/\/$/, '');
            window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + route;
        }
    }

}