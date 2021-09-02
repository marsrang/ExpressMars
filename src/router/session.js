// session management class
class Session {
    constructor(req, res) {
        if (req.method == 'POST') this.body = req.body;
        else this.body = req.query;

        this.url = req.originalUrl;
        this.res = res;
    }

    send(res) {
        console.log('[' + this.res['mid'] + '] res: ' + JSON.stringify(res));
        this.res.send(res);
    }

    error(err) {
        console.log('[' + this.res['mid'] + '] resError: ' + JSON.stringify(err));
        this.res.send({ error: err });
    }
}

module.exports = Session;
