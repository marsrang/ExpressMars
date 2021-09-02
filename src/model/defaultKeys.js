// default keys for verify
class DefaultKeys {
    constructor() {}

    isnull() {
        for (let key in this) {
            if (this[key] == null) {
                return true;
            }
        }
        return false;
    }
}

module.exports = DefaultKeys;
