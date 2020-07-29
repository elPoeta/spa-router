export class Route {
    constructor({ name, path, handler }) {
        this.name = name;
        this.path = path;
        this.handler = handler;
        console.log('new Route...')
    }

    get name() {
        return this.name;
    }

    set name(name) {
        this.name = name;
    }

    get path() {
        return this.path;
    }

    set path(path) {
        this.path = path;
    }

    get handler() {
        return this.handler;
    }

    set handler(handler) {
        this.handler = handler;
    }
}