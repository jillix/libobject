var getPath= require('./path');
var toDeep = require('./deep');
var isObject = require('./isObject');
var find_fields = /\{[\w\.]+\}/g;
var check_field = /^\{[^{}]+\}$/;

/**
 * Replace data fields in a string.
 *
 * @private
 * @param {string} The string.
 * @param {object} The data context.
 */
module.exports = function (config, object) {

    // use config object as source
    object = object || config;

    // check config and data object
    if (!isObject(config) || !isObject(object)) {
        return new Error('libobject.change: Config or data object is not an object.');
    }

    var nested;
    Object.keys(config).forEach(function (key) {
        var value = config[key]; 

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
