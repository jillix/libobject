var tap = require('tap')
var libob = require('../index');

// change tests
var tests = {"key": "value"}
var results = true;

tap.match(libob.isObject(tests), results);
