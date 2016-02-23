var tap = require('tap')
var libob = require('../index');

var tests = {
    one: "one",
    two: "two.one",
    three: "three.two.one",
    arr1: "arr.0",
    arr2: "arr.1.one",
    arr3: "arr.2.0",
    arr4: "arr.2.1.one"
}
var results = "val";

var input = {
    one: "val",
    two: {one: "val"},
    three: {two: {one: "val"}},
    arr: [
        "val",
        {one: "val"},
        ["val", {one: "val"}]
    ]
};

tap.match(libob.path(tests.one, input), results);
tap.match(libob.path(tests.two, input), results);
tap.match(libob.path(tests.three, input), results);
tap.match(libob.path(tests.arr1, input), results);
tap.match(libob.path(tests.arr2, input), results);
tap.match(libob.path(tests.arr3, input), results);
tap.match(libob.path(tests.arr4, input), results);

