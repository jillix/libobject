/**
 * Unflatten dot-notation keys {"key1.key2": "value"} => {key1: {key2: "value"}}
 *
 * @public
 * @param {string} The object, which is unflattened.
 */
module.exports = function (object) {
    var result = {};
    var parentObj = result;
    var subkeys;
    var subkey;
    var last;

    Object.keys(object).forEach(function (key) {

        subkeys = key.split('.');
        last = subkeys.pop();

        for (var i = 0, l = subkeys.length; i < l; ++i) {
            subkey = subkeys[i];
            if (parentObj[subkey] === undefined) {
                // check if subkey is a number
                var next = i + 1;
                if (next < l && !isNaN(subkeys[next])) {
                    parentObj[subkey] = [];
                } else {
                    parentObj[subkey] = {};
                }
            }

            parentObj = parentObj[subkey];
        };

        parentObj[last] = object[key];
        parentObj = result;
    });

    return result;
};
