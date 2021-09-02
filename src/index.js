require('./property/index');
const config = require('@src/config');
const ExpressAPI = require('@src/api/expressApi');

/**
 * initialize express API server
 * @param {string} type server type name
 */
async function initExpressAPI(type) {
    const service = new ExpressAPI({
        type: type,
        port: config.server[type].port,
    });

    await service.run((err) => {
        if (err) throw err;
        console.log(type + ' service running.');
    });
}

/**
 * running server
 * @param {string} type server type name
 */
async function run(type) {
    try {
        if (type == 'basic') await initExpressAPI(type);
    } catch (err) {
        console.log(type + ' server # exception - code: ' + err.code + ', message: ' + err.message + ', stack: ' + err.stack);
    }
}

// arguments command
const commands = process.argv.slice(2);
/**
 * server type name
 * 1. basic
 */
const type = commands[0];

// running
run(type);
