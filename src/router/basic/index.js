const express = require('express');
const router = express.Router();

const Session = require('@src/router/session');

const utils = require('@src/utils/index');
const helloWorldKeys = require('@src/model/helloWorld');

async function helloWorld(req, res) {
    const session = new Session(req, res);

    try {
        const bodyData = session.body;
        const reqData = new helloWorldKeys.REQ(bodyData);
        let resData = new helloWorldKeys.RES({
            message: 'Hello World!',
        });

        if (reqData.isnull() == false) {
            resData.message = resData.message + ' ' + reqData.name + '!!';
        }

        session.send(resData);
    } catch (e) {
        session.error(e);
    }
}

utils.setRoute(router, '/helloWorld', helloWorld);

module.exports = router;
