"use strict"

const path = require('./path');
const isObject = require('./isObject');
const find_fields = /\{[\w\.]+\}/g;
//const check_field = /^\{[^{}]+\}$/;

/**
 * Replace data fields in a string.
 *
 * @private
 * @param {string} The string.
 * @param {object} The data context.
 */
//module.exports = (config, object) => {
module.exports = (config, source, target) => {

    // check arguments
    if (!isObject(config) || typeof source !== 'object' || typeof target !== 'object') {
        return new Error('libobject.change: Invalid arguments.');
    }

    let get_path;
    let set_path;
    let fields;
    for (set_path in config) {
        get_path = config[set_path]

        // handle simple "set" -> target[set_path] = get_path
        if (typeof get_path === 'string' && get_path.indexOf('{') > -1) {

            // check if get_path is a field (avoid regexp)
            if (get_path.charAt(0) === '{' && get_path.indexOf('}') === get_path.length - 1) {

                // get value from source
                get_path = path.get(get_path.slice(1, -1), source);

            // get fields in get_path and replace them with source values
            } else {
                fields = get_path.match(find_fields);
                if (fields) {
                    fields.forEach((field) => {
                        get_path = get_path.replace(field, path.get(field.slice(1, -1), source));
                    });
                }
            }
        }

        // set value to target
        path.set(set_path, target, get_path);
    };
};
