const config = require('@root/config.json');

// config js
class Config {
    constructor(jsonData) {
        this.server = { base: new ConfigServer() };

        for (let i in jsonData.server) {
            this.server[i] = new ConfigServer(jsonData.server[i]);
        }
    }
}

class ConfigServer {
    constructor(jsonData) {
        if (jsonData == null) {
            jsonData = {};
        }

        let host = jsonData.host;
        let port = jsonData.port;
        if (host == null) {
            host = '127.0.0.1';
        }
        if (port == null) {
            port = 8080;
        }

        this.host = host;
        this.port = port;
    }
}

module.exports = new Config(config);
