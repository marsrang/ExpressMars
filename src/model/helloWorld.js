const DefaultKeys = require('./defaultKeys');

class HelloWorldReqKeys extends DefaultKeys {
    constructor(data) {
        super();

        this.name = data.name;
    }
}

class HelloWorldResKeys extends DefaultKeys {
    constructor(data) {
        super();

        this.message = data.message;
    }
}

module.exports = { REQ: HelloWorldReqKeys, RES: HelloWorldResKeys };
