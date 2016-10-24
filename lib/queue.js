'use strict'

module.exports = (fn, cb) => {

    const queue = {
        n: 1,
        Q: cb ? [cb] : [],
        add: num => queue.n += num || 1,
        push: fn => queue.a ? fn(queue.a[0], queue.a[1]) : queue.Q.push(fn),
        done: (err, data) => {
            if (!(--queue.n < 0 ? 0 : queue.n)) {
                fn(err, data, (err, data) => {
                    queue.a = [err, data];
                    queue.Q.forEach(cb => cb(err, data));
                    queue.Q = [];
                });
            }
        }
    };

    return Object.create(queue);
};
