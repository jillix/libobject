module.exports = function (object) {
    if (Object.prototype.toString.call(object) === "[object Object]") {
        return true;
    }
};
