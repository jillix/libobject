"use strict"

/**
 * Get a value from a property "path" (dot.notation).
 * path('Object.key.key.value', {'key': {'key': {'value': 123}}});
 *
 * @public
 * @param {string} The path in "dot" notation.
 * @param {array} The data objects, which are used to search the path.
 */
module.exports = (path, object, noSplit) => {

    if (typeof path !== 'string' || !object) {
        return;
    }

    if (path === '.') {
        return object;
    }

    // find keys in paths or return
	path = noSplit ? path : path.split('.');
	for (var i = 0, l = path.length; i < l; ++i) {
		if ((object = object[path[i]]) === undefined) {
            return;
        }
	}

    return object;
};
