var tap = require('tap')
var libob = require('../index');

// change tests
var tests = {
    simple: {
        field: "{other.field}",
        other: {field: "value"}
    },
    fields: {
        field: "{other.field}{other.field}",
        other: {field: "value"}
    },
    array: {
        field: "{other.1}, {other.0}",
        other: ["second", "first"]
    }
}
var results = {
    simple: {
        field: "value"
    },
    fields: {
        field: "valuevalue"
    },
    array: {
        field: "first, second"
    }
};

tap.match(libob.change(tests.simple), results.simple);
tap.match(libob.change(tests.fields), results.fields);
tap.match(libob.change(tests.array), results.array);

