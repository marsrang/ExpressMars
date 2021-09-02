class Utils {
    constructor() {}

    /**
     * basic promise, insert a promise instead of using a callback
     * @param {Function} func proceed function
     * @param  {...any} args arguments
     * @returns
     */
    injectPromise(func, ...args) {
        return new Promise((resolve, reject) => {
            func(...args, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    /**
     * scope callback
     * @param {Function} scope callback
     * @returns
     */
    promiseInjector(scope) {
        return (func, ...args) => {
            return this.injectPromise(func.bind(scope), ...args);
        };
    }

    /**
     * router setting (get, post)
     * @param {any} router express router
     * @param {string} path http path
     * @param {Function} func message function
     * @param {string} protocol protocol set
     */
    setRoute(router, path, func, protocol = null) {
        if (protocol == null) {
            router.get(path, func);
            router.post(path, func);
        } else if (protocol == 'post') {
            router.post(path, func);
        } else {
            router.get(path, func);
        }
    }
}

module.exports = new Utils();
