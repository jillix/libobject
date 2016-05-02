var getPath= require('./path');
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

    Object.keys(config).forEach(function (key) {
        var value = config[key]; 

        // check if path contains fields
        if (typeof value !== 'string') {
            return;
        }

        // navigate object
        var splits = key.split('.');
        var cObj = object;
        for (var i = 0; i < splits.length - 1; ++ i) {
            if (typeof cObj[splits[i]] !== 'undefined') {
                cObj = cObj[splits[i]];
            } else {
                return;
            }
        }
        key = splits[splits.length - 1];


        if (value.indexOf('{') >= 0) {
            // replace value, if value is a "path"
            if (check_field.test(value)) {
                cObj[key] = getPath(value.slice(1, -1), object);
                return;
            }

            // replace fields with data
            var fields = value.match(find_fields);
            if (fields) {
                fields.forEach(function (field) {
                    value = value.replace(field, getPath(field.slice(1, -1), object));
                });
                cObj[key] = value;
            }
        } else {
            cObj[key] = value;
        }
    });

    return object;
};
