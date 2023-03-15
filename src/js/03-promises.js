import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  let delay = +formData.get('delay');
  const step = +formData.get('step');
  const amount = +formData.get('amount');
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay);
    delay += step;
  }
}

function createPromise(position, delay) {
  Notiflix.Notify.init({});
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      } else {
        // Reject
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      }
    }, delay);
  });
}
