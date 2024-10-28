document.addEventListener('DOMContentLoaded', () => {
  const progressSpinner = document.querySelector('progress-spinner');
  const inputValue = document.getElementById('input_value');
  const switchAnimate = document.getElementById('switch_animate');
  const switchHidden = document.getElementById('switch_hidden');

  const setValue = () => {
    const value = inputValue.value.trim();
    progressSpinner.setAttribute('value', value);
  }
  const setAnimated = () => {
    if (switchAnimate.checked) {
      progressSpinner.setAttribute('animated', '');
    } else {
      progressSpinner.removeAttribute('animated');
    }
  }
  const setHidden = () => {
    if (switchHidden.checked) {
      progressSpinner.setAttribute('hidden', '');
    } else {
      progressSpinner.removeAttribute('hidden');
    }
  }

  setValue();
  setAnimated();
  setHidden();

  inputValue.addEventListener('input', setValue);
  switchAnimate.addEventListener('change', setAnimated);
  switchHidden.addEventListener('change', setHidden);
});