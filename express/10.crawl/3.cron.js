let cron = require('cron'),
    cronJob = cron.CronJob;

let job = new cronJob("00 00 10 * * 1,5", () => {
    console.log(new Date().toLocaleString());
});

job.start();