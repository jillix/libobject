var tap = require('tap')
var libob = require('../index');

// change tests
var tests = {
    key1: "val",
    key2: {sub: "val"},
    key3: ["first", "second"],
    key4: [{sub: "val"}],
    key5: [{sub: {sub: "val"}}]
};

var results = {
    key1: "val",
    "key2.sub": "val",
    key3: ["first", "second"],
    key4: [{sub: "val"}],
    key5: [{sub: {sub: "val"}}]
};

tap.match(libob.flat(tests), results);

