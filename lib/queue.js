'use strict'

module.exports = (fn, cb) => {

    const queue = {
        q: cb ? [cb] : [],
        ready: fn => queue.q.push(fn),
        done: (err, data) => {
            queue.done = undefined;
            process.nextTick(() => fn(err, data, (err, data) => {
                queue.q.forEach(cb => cb(err, data));
                queue.q = [];
            }));
        }
    };

    return Object.create(queue);
};
