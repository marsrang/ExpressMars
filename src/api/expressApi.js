const express = require('express');
const uniqid = require('uniqid');

const utils = require('@src/utils/index');

// CORS
//const cors = require('cors');

class ExpressAPI {
    /**
     * EXPRESS base class
     * @param {{type: string, port: number}} options server type name, port
     */
    constructor(options) {
        this.type = options.type;
        this.port = options.port;
        this.app = express();

        // CORS
        //this.app.use(cors({ origin: true, credentials: true }));

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use((req, res, next) => {
            let reqs = {};

            // session number alloc
            const messageNumber = uniqid();
            req['mid'] = messageNumber;
            res['mid'] = messageNumber;

            reqs['method'] = req.method;
            reqs['path'] = req.path;
            if (req.method == 'POST') {
                reqs['params'] = req.body;
            } else {
                reqs['params'] = req.query;
            }
            console.log('[' + req['mid'] + '] req: ' + JSON.stringify(reqs));

            next();
        });

        // use router
        if (this.type == 'basic') {
            const basicRouter = require('@src/router/basic/index');
            this.app.use('/basic', basicRouter);
        } else {
            throw 'Error: Express server type is invalid';
        }

        this.app.use((req, res, next) => {
            let err = new Error('404 Not Found');
            err['status'] = 404;
            next(err);
        });

        this.app.use((err, req, res, next) => {
            res.status(err['status'] || 500);

            const data = JSON.stringify({
                message: err.message,
                error: err,
            });
            console.log('[' + req['mid'] + '] res: ' + JSON.stringify(data));
            res.send(data);
        });

        this.app.set('port', this.port);
    }

    /**
     * running
     * @param {*} callback
     */
    run(callback) {
        if (!callback) utils.promiseInjector(this.run);

        this.app.listen(this.port, (err) => {
            callback(err);
        });
    }
}

module.exports = ExpressAPI;
