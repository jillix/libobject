/**
 * Create a flat object {key1: {key2: "value"}} => {"key1.key2": "value"}
 *
 * @public
 * @param {string} The object, which is flattened.
 */
module.exports = function (object) {
    var output = {};
    var value;
    var newKey;
    var step = function (obj, prev) {
        for (var key in obj) {
            value = obj[key];
            newKey = prev + key;

            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {

                if (Object.keys(value).length) {
                    step(value, newKey + '.');
                    continue;
                }
            }

            output[newKey] = value;
        }
    };

    // start recursive loop
    step(object, '');

    return output;
};
