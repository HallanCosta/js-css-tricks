console.log('Cron.JS');

const timerStorage = new TimerStorage;

const timerView = new TimerView({
  timerStorage
});
timerView.run();