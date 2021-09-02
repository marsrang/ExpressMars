// require module alias
require('module-alias/register');

// object value find
Object.defineProperty(Array.prototype, 'select', {
    value: (closure) => {
        for (let i = 0; i < this.length; ++i) {
            if (closure(this[i])) {
                return this[i];
            }
        }
        return null;
    },
});

// deep freeze object
Object.defineProperty(Object.prototype, 'deepFreeze', {
    value: (object) => {
        var propNames = Object.getOwnPropertyNames(object);

        for (let name of propNames) {
            let value = object[name];

            object[name] = value && typeof value === 'object' ? Object.deepFreeze(value) : value;
        }

        return Object.freeze(object);
    },
});

// global __stack defined : Error.stack
Object.defineProperty(global, '__stack', {
    get: function () {
        var orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function (_, stack) {
            return stack;
        };
        var err = new Error();
        Error.captureStackTrace(err, arguments.callee);
        var stack = err.stack;
        Error.prepareStackTrace = orig;
        return stack;
    },
});

// global __line defined : script line number
Object.defineProperty(global, '__line', {
    get: function () {
        return __stack[1].getLineNumber();
    },
});

// global __function defined : function name
Object.defineProperty(global, '__function', {
    get: function () {
        return __stack[1].getFunctionName();
    },
});
