import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDateMs = selectedDates[0].getTime();

    if (selectedDateMs < new Date()) {
      Notiflix.Notify.init({ position: 'center-top' });
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.startBtn.disabled = refs.startBtn.disabled
        ? refs.startBtn.disabled
        : true;
    } else {
      refs.startBtn.disabled = false;
    }
  },
};

let selectedDateMs = null;
let intervalId = null;
let DELAY = 1000;

const refs = {
  dateTimeInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysField: document.querySelector('[data-days]'),
  hoursField: document.querySelector('[data-hours]'),
  minutesField: document.querySelector('[data-minutes]'),
  secondsFields: document.querySelector('[data-seconds]'),
};
refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', onStart);

flatpickr(refs.dateTimeInput, options);

function onStart() {
  intervalId = setInterval(() => {
    //   const timeDiffMs = selectedDateMs - Date.now();
    const timeDiffMs = selectedDateMs - new Date();
    if (timeDiffMs <= 0) {
      stopTimer();
      return;
    } else {
      updateTimerFields(convertMs(timeDiffMs));
    }
  }, DELAY);
}

function stopTimer() {
  clearInterval(intervalId);
}

function updateTimerFields({
  days = '00',
  hours = '00',
  minutes = '00',
  seconds = '00',
} = {}) {
  refs.daysField.textContent = addLeadingZero(days);
  refs.hoursField.textContent = addLeadingZero(hours);
  refs.minutesField.textContent = addLeadingZero(minutes);
  refs.secondsFields.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  //console.log(`days ${days}, hours ${hours},mins ${minutes},sec ${seconds},`);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
