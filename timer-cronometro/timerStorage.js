console.log('> Timer Storage');

class TimerStorage {
  STORAGE_TABLE = 'timer_states';

  constructor() {}

  saveStatesOnLocalStorage(states) {
    localStorage.setItem(this.STORAGE_TABLE, JSON.stringify(states));
  }

  removeStatesFromLocalStorage() {
    localStorage.removeItem(this.STORAGE_TABLE);
  }

  getStatesFromLocalStorage() {
    const state = JSON.parse(localStorage.getItem(this.STORAGE_TABLE));
    return state;
  }
}