var getPath= require('./path.js');
var toDeep = require('./deep.js');
var find_fields = /\{[\w\.]+\}/g;
var check_field = /^\{[^{}]+\}$/;

/**
 * Replace data fields in a string.
 *
 * @private
 * @param {string} The string.
 * @param {object} The data context.
 */
module.exports = function (object) {

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

        // replace value, if value is a "path"
        if (check_field.test(value)) {
            object[key] = getPath(value.slice(1, -1), object);
            return;
        }

        // replace fields with data
        var fields = value.match(find_fields);
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
