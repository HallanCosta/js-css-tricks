console.log('> Timer View');

class TimerView {
  // States
  intervalId;
  running = false;
  paused = false;
  currentTime = 0;
  startTime = 0;
  pauseTime = 0;
  pauseStartTime = 0;
  points = 0;

  // Elements
  cronHoursElement = document.querySelector('#cron-hours');
  cronMinutesElement = document.querySelector('#cron-minutes');
  cronSecondsElement = document.querySelector('#cron-seconds');
  cronMilisecondsElement = document.querySelector('#cron-milliseconds');

  startButton = document.querySelector('#cron-play');
  pauseButton = document.querySelector('#cron-pause');
  stopButton = document.querySelector('#cron-stop');

  // Dependences
  timerStorage = null;

  constructor(props) {
    this.timerStorage = props.timerStorage;
    return this;
  }

  run() {
    this._loadStorage();
    
    this._configureEventStartTimer();
    this._configureEventStartTimerAfterPaused();
    this._configureEvent_PauseTimer();
    this._configureEvent_StopTimer();
  }

  _loadStorage() {
    const state = this.timerStorage.getStatesFromLocalStorage();

    if (state) {
      this.running = state.running;
      this.paused = state.paused;
      this.pauseStartTime = state.pauseStartTime;
      this.pauseTime = state.pauseTime;
      this.startTime = state.startTime;
      this.currentTime = state.currentTime;

      if (this.paused) {
        this._showTimerValues();
        return;
      } 

      if (this.running) {
        this.intervalId = setInterval(this._updateTimer.bind(this), 10);
        return;
      }
    }
  }

  _convertTimestampInObjectTime(timestamp) {
    const hours = Math.floor(timestamp / 3600000);
    const minutes = Math.floor((timestamp % 3600000) / 60000);
    const seconds = Math.floor((timestamp % 60000) / 1000);
    const milliseconds = timestamp % 1000; 

    return {
      hours,
      minutes,
      seconds,
      milliseconds
    }
  }

  debugTimestamp(timestamp) {
    const time = _convertTimestampInObjectTime(timestamp);
    return `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}:${time.milliseconds.toString().padStart(2, '0')}`;
  }

  _updateTimer() {
    console.log('_updateTimer - new Date:', new Date().getTime());
    console.log('_updateTimer - this.startTime:', this.startTime);
    console.log('_updateTimer - this.pauseTime:', this.pauseTime);

    this.currentTime = new Date().getTime() - this.startTime - this.pauseTime;
    const time = this._convertTimestampInObjectTime(this.currentTime);

    this.cronHoursElement.textContent = time.hours.toString().padStart(2, '0');
    this.cronMinutesElement.textContent = time.minutes.toString().padStart(2, '0');
    this.cronSecondsElement.textContent = time.seconds.toString().padStart(2, '0');
    this.cronMilisecondsElement.textContent = time.milliseconds.toString().padStart(2, '0');

    if (time.hours >= 2) {
      this._stopTimer();
      alert('Excedeu o limite diário de 2 horas');
      return;
    } 
  }

  _addPoints() {
    const time = this._convertTimestampInObjectTime(this.currentTime);
    const points = (time.hours * 60) + time.minutes;
    this.points = points;
  }

  _showTimerValues() {
    const hours = Math.floor(this.currentTime / 3600000);
    const minutes = Math.floor((this.currentTime % 3600000) / 60000);
    const seconds = Math.floor((this.currentTime % 60000) / 1000);
    const milliseconds = this.currentTime % 1000;

    this.cronHoursElement.textContent = hours.toString().padStart(2, '0');
    this.cronMinutesElement.textContent = minutes.toString().padStart(2, '0');
    this.cronSecondsElement.textContent = seconds.toString().padStart(2, '0');
    this.cronMilisecondsElement.textContent = milliseconds.toString().padStart(2, '0');
  }

  _stopTimer() {
    clearInterval(this.intervalId);

    this._addPoints();

    this.cronHoursElement.textContent = '00';
    this.cronMinutesElement.textContent = '00';
    this.cronSecondsElement.textContent = '00';
    this.cronMilisecondsElement.textContent = '99';
    this.running = false;
    this.paused = false;
    this.pauseStartTime = 0;
    this.pauseTime = 0;

    this.timerStorage.removeStatesFromLocalStorage();
  }

  _pauseTimer() {
    clearInterval(this.intervalId);
    this.pauseStartTime = new Date().getTime();
    this.paused = true;
    this.timerStorage.saveStatesOnLocalStorage(this._getStates());
  }

  _getStates() {
    return {
      running: this.running,
      paused: this.paused,
      pauseStartTime: this.pauseStartTime,
      pauseTime: this.pauseTime,
      startTime: this.startTime,
      currentTime: this.currentTime
    }
  }

  _configureEventStartTimer() {
    this.startButton.addEventListener('click', () => {
      if (!this.running) {
        this.startTime = new Date().getTime() - this.pauseTime;
        this.intervalId = setInterval(this._updateTimer.bind(this), 10); // Atualiza a cada 10 milissegundos
        this.running = true;
        this.paused = false;
        this.timerStorage.saveStatesOnLocalStorage(this._getStates());
      }
    });
  }

  _configureEventStartTimerAfterPaused() {
    this.startButton.addEventListener('click', () => {
      if (this.running && this.paused) {
        this.pauseTime += new Date().getTime() - this.pauseStartTime;
        this.intervalId = setInterval(this._updateTimer.bind(this), 10);
        this.running = true;
        this.paused = false;
        this.timerStorage.saveStatesOnLocalStorage(this._getStates());
      }
    });
  }

  _configureEvent_PauseTimer() {
    this.pauseButton.addEventListener('click', () => {
      if (this.running && !this.paused) {
        this._pauseTimer();
      }
    });
  }

  _configureEvent_StopTimer() {
    this.stopButton.addEventListener('click', () => {
      if (confirm('Deseja parar o cronômetro?')) {
        this._stopTimer();
        this.timerStorage.removeStatesFromLocalStorage();
      }
    });
  }

  configureEventResetTimer() {
    this.resetButton.addEventListener('click', () => {
      this._stopTimer();
    });
  }
}