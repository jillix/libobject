"use strict"

const isObject = require('./isObject');

// TODO test if object is an array (get and set)
/* Example:
    path('Object.key.key.value', {'key': {'key': {'value': 123}}});
*/
// get a value from a object with dot notation
exports.get = (path, object, noSplit) => {

    if (typeof path !== 'string' || path === '.' || typeof object !== 'object') {
        return object;
    }

    if (noSplit) {
        return object[path];
    }

    // find keys in paths or return
	path = path.split('.');
	for (let i = 0, l = path.length; i < l; ++i) {
		if ((object = object[path[i]]) === undefined) {
            return;
        }
	}

    return object;
};

// set a value on a object with dot notation
exports.set = (path, object, value, noSplit) => {

    if (typeof path !== 'string' || path === '.' || typeof object !== 'object') {
        return;
    }

    if (noSplit) {
        object[path] = value;
        return;
    }

    // ensure object location
	path = path.split('.');
	for (let i = 0, l = path.length; i < l; ++i) {
        object = (
            object[path[i]] = path.length === (i+1) ? value :
                object[path[i]] !== undefined ? object[path[i]] : {}
        );
    }
};
