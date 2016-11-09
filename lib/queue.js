'use strict'

module.exports = (fn, cb) => {

    const queue = {
        q: cb ? [cb] : [],
        ready: cb => queue.q.push(cb),
        done: (err, data) => {
            if (queue.d) return;
            queue.d = true;
            setImmediate(fn, err, data, (err, data) => {
                queue.q.forEach(cb => cb(err, data));
                queue.q = [];
            });
        }
    };

    return Object.create(queue);
};
