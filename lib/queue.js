'use strict'

module.exports = (fn, cb) => {

    const queue = {
        q: cb ? [cb] : [],
        ready: fn => queue.a ? fn(queue.a[0], queue.a[1]) : queue.q.push(fn),
        done: (err, data) => {
            queue.done = undefined;
            fn(err, data, (err, data) => {
                queue.a = [err, data];
                queue.q.forEach(cb => cb(err, data));
                queue.q = [];
            });
        }
    };

    return Object.create(queue);
};
