/**
 * Get a value from a property "path" (dot.notation).
 * path('Object.key.key.value', {'key': {'key': {'value': 123}}});
 *
 * @public
 * @param {string} The path in "dot" notation.
 * @param {array} The data objects, which are used to search the path.
 */
module.exports = function (path, object) {

    if (typeof path !== 'string' || !object) {
        return;
    }

    if (path === '.') {
        return object;
    }

    // find keys in paths or return
    path.split('.').forEach(function (key) {
        if ((object = object[key]) === undefined) {
            return;
        }
    });

    return object;
};
