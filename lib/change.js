var getPath= require('./path.js');
var toDeep = require('./deep.js');
var find_tmpl = /\{[\w\.]+\}/g;

/**
 * Replace data fields in a string.
 *
 * @private
 * @param {string} The string.
 * @param {object} The data context.
 */
module.exports = function (object) {

    // TODO handle {.}

    var nested;
    Object.keys(object).forEach(function (key) {
        var value = object[key]; 

        // check if path contains fields
        if (typeof value !== 'string' || value.indexOf('{') < 0) {
            return;
        }

        // check if object contains flat keys
        if (key.indexOf('.') > 0) {
            nested = true;
        } 

        // replace fields with data
        var fields = value.match(find_tmpl);
        if (fields) {
            fields.forEach(function (field) {
                value = value.replace(field, getPath(field.slice(1, -1), object));
            });

            object[key] = value;
        }
    });

    // nest flat paths
    if (nested) {
        object = toDeep(object);
    }

    return object;
};
