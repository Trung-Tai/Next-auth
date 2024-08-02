const cron = require('node-cron');
const { exec } = require('child_process');

const scheduleTimes = ['* 18 * * *'];


scheduleTimes.forEach(time => {
  cron.schedule(time, () => {
    console.log(`Running task at ${time}`);
    exec('pip install -U vnstock3  && python /lib/fetchDataQuote.py', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Error: ${stderr}`);
        return;
      }
      console.log(`Result: ${stdout}`);
    });
  });
});

console.log('Scheduler is running');
