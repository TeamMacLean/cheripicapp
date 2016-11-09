const thinky = require('../lib/thinky');
const type = thinky.type;
const r = thinky.r;

const Job = thinky.createModel('Job', {
    id: type.string(),
    data: type.object().required(),
    files: type.object().required(),
    createdAt: type.date().default(r.now()),
    queued: type.boolean().default(true),
    running: type.boolean().default(false),
    complete: type.boolean().default(false),
    errored: type.boolean().default(false),
    error: type.string(),
    outputPath: type.string()
});

Job.define('status', function () {
    var self = this;
    if (self.errored) {
        return 'Error'
    }
    if (self.complete) {
        return 'Complete';
    }
    if (self.running) {
        return 'Running';
    }
    if (self.queued) {
        return 'In Queue';
    }
});


module.exports = Job;