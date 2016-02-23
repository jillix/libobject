var tap = require('tap')
var libob = require('../index');

// depp tests
var tests = {
    "1one": 1,
    "2one.two": 2,
    "3one.two.three": 3,
    "4one": [1],
    "5one.two": [1, 2],
    "6one": {key: 1},
    "7one.two": {key: 2}
};

var results = {
    "1one": 1,
    "2one": {two: 2},
    "3one": {two: {three: 3}},
    "4one": [1],
    "5one": {two: [1, 2]},
    "6one": {key: 1},
    "7one": {two: {key: 2}}
};

tap.match(libob.deep(tests), results);

