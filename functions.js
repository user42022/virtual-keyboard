export function createKeyElement(target, optionsList) {
  optionsList.forEach((options) => {
    const newElement = document.createElement('div');
    options.styleList.forEach((styleName) => {
      newElement.classList.add(styleName);
    });
    const [ru,, en] = options.content;
    newElement.id = options.id;
    newElement.textContent = localStorage.getItem('lang') ? ru : en;
    target.append(newElement);
  });
}
export function createKeyboard() {
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  for (let i = 0; i < 5; i += 1) {
    const keyboardRow = document.createElement('div');
    keyboardRow.classList.add('keyboard__row');
    keyboard.append(keyboardRow);
  }
  return keyboard;
}
export function highlightKey(event) {
  event.preventDefault();
  const key = document.getElementById(`${event.code}`);
  key.classList.add('key_active');
}
export function removeHighlightKey(event) {
  const key = document.getElementById(`${event.code}`);
  key.classList.remove('key_active');
  if (event.code === 'CapsLock') {
    if (+localStorage.getItem('capslock')) {
      localStorage.setItem('capslock', '0');
      key.classList.remove('key_active');
    } else {
      localStorage.setItem('capslock', '1');
      key.classList.add('key_active');
    }
  }
}
export function toggleHighlightOnClick() {
  this.classList.toggle('key_active');
  if (+localStorage.getItem('capslock')) {
    localStorage.setItem('capslock', '0');
  } else {
    localStorage.setItem('capslock', '1');
  }
}
