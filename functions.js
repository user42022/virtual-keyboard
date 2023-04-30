import { KEYBOARD_OBJECT } from './keyboard-object.js';

export function createKeyElement(target, optionsList) {
  optionsList.forEach((options) => {
    const newElement = document.createElement('div');
    options.styleList.forEach((styleName) => {
      newElement.classList.add(styleName);
    });
    const [ru,, en] = options.content;
    newElement.id = options.id;
    newElement.textContent = +localStorage.getItem('lang') ? ru : en;
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
  if (event.code in KEYBOARD_OBJECT) {
    const key = document.getElementById(`${event.code}`);
    key.classList.add('key_active');
  }
}
export function highlightKeyOnMouseDown() {
  this.classList.add('key_active');
}
export function removeHighlightKey(event) {
  if (event.code in KEYBOARD_OBJECT) {
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
}
export function removeHighlightKeyOnMouseUp() {
  this.classList.remove('key_active');
}
export function toggleHighlightOnClick() {
  this.classList.toggle('key_active');
  if (+localStorage.getItem('capslock')) {
    localStorage.setItem('capslock', '0');
  } else {
    localStorage.setItem('capslock', '1');
  }
}
function changeContent(contentType, modifier) {
  if (modifier === 'uppercase') {
    this.textContent = KEYBOARD_OBJECT[this.id].content[contentType].toUpperCase();
  } else if (modifier === 'lowercase') {
    this.textContent = KEYBOARD_OBJECT[this.id].content[contentType].toLowerCase();
  } else {
    this.textContent = KEYBOARD_OBJECT[this.id].content[contentType];
  }
}

/* check pressed keys */
const pressedKeys = {};
document.addEventListener('keydown', (event) => { pressedKeys[`${event.code}`] = true; });

document.addEventListener('keyup', (event) => { delete pressedKeys[`${event.code}`]; });

export function switchLanguage() {
  if (('ControlLeft' in pressedKeys) && ('AltLeft' in pressedKeys)) {
    if (+localStorage.getItem('lang')) {
      localStorage.setItem('lang', '0');
      document.querySelectorAll('.description')[0].textContent = +localStorage.getItem('lang') ? 'Клавиатура создана в операционной системе Windows 10' : 'The keyboard was created in the Windows 10 operating system';
      document.querySelectorAll('.description')[1].textContent = +localStorage.getItem('lang') ? 'Для переключения языка комбинация: левыe ctrl + alt' : 'To switch the language combination: left ctrl + alt';
      document.querySelector('.lang-shortcut').textContent = +localStorage.getItem('lang') ? 'РУ' : 'EN';
      if (+localStorage.getItem('lang')) {
        document.querySelector('.lang-shortcut').classList.add('lang-shortcut_ru');
      } else {
        document.querySelector('.lang-shortcut').classList.remove('lang-shortcut_ru');
      }
    } else {
      localStorage.setItem('lang', '1');
      document.querySelectorAll('.description')[0].textContent = +localStorage.getItem('lang') ? 'Клавиатура создана в операционной системе Windows 10' : 'The keyboard was created in the Windows 10 operating system';
      document.querySelectorAll('.description')[1].textContent = +localStorage.getItem('lang') ? 'Для переключения языка комбинация: левыe ctrl + alt' : 'To switch the language combination: left ctrl + alt';
      document.querySelector('.lang-shortcut').textContent = +localStorage.getItem('lang') ? 'РУ' : 'EN';
      if (+localStorage.getItem('lang')) {
        document.querySelector('.lang-shortcut').classList.add('lang-shortcut_ru');
      } else {
        document.querySelector('.lang-shortcut').classList.remove('lang-shortcut_ru');
      }
    }
  }
}

export function defineContent() {
  const keyArray = [...document.querySelectorAll('.key')].filter((el) => !el.classList.contains('key_service'));
  const capslock = document.getElementById('CapsLock').classList;
  const leftshift = document.getElementById('ShiftLeft').classList;
  const rightshift = document.getElementById('ShiftRight').classList;
  const language = localStorage.getItem('lang');
  if (![capslock, leftshift, rightshift].filter((el) => el.contains('key_active')).length && +language) {
    keyArray.forEach((el) => changeContent.call(el, 0));
  } else if (capslock.contains('key_active') && ![leftshift, rightshift].filter((el) => el.contains('key_active')).length && +language) {
    keyArray.forEach((el) => changeContent.call(el, 0, 'uppercase'));
  } else if (!capslock.contains('key_active') && [leftshift, rightshift].filter((el) => el.contains('key_active')).length && +language) {
    keyArray.forEach((el) => changeContent.call(el, 1));
  } else if ([capslock, leftshift, rightshift].filter((el) => el.contains('key_active')).length && +language) {
    keyArray.forEach((el) => changeContent.call(el, 1, 'lowercase'));
  } else if (![capslock, leftshift, rightshift].filter((el) => el.contains('key_active')).length && !+language) {
    keyArray.forEach((el) => changeContent.call(el, 2));
  } else if (capslock.contains('key_active') && ![leftshift, rightshift].filter((el) => el.contains('key_active')).length && !+language) {
    keyArray.forEach((el) => changeContent.call(el, 2, 'uppercase'));
  } else if (!capslock.contains('key_active') && [leftshift, rightshift].filter((el) => el.contains('key_active')).length && !+language) {
    keyArray.forEach((el) => changeContent.call(el, 3));
  } else if ([capslock, leftshift, rightshift].filter((el) => el.contains('key_active')).length && !+language) {
    keyArray.forEach((el) => changeContent.call(el, 3, 'lowercase'));
  }
}

export function inputKeyOnPress(event) {
  const textarea = document.querySelector('textarea');
  const key = document.getElementById(`${event.code}`);
  if (KEYBOARD_OBJECT[`${event.code}`] !== undefined) {
    if (!key.classList.contains('key_service') || ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(key.id)) {
      const start = textarea.selectionStart;
      textarea.value = textarea.value.slice(0, start)
      + key.textContent + textarea.value.slice(start);
      textarea.selectionStart = start + 1;
    } else if (key.id === 'Delete') {
      const start = textarea.selectionStart;
      textarea.value = textarea.value.slice(0, start)
      + textarea.value.slice(start + 1);
      textarea.selectionStart = start;
    } else if (key.id === 'Backspace') {
      const start = textarea.selectionStart;
      textarea.value = textarea.value.slice(0, start - 1 > -1 ? start - 1 : 0)
      + textarea.value.slice(start);
      textarea.selectionStart = start === 0 ? 0 : start - 1;
    } else if (key.id === 'Enter') {
      const start = textarea.selectionStart;
      textarea.value = `${textarea.value.slice(0, start)
      }\n${textarea.value.slice(start)}`;
      textarea.selectionStart = start + 1;
    } else if (key.id === 'Tab') {
      const start = textarea.selectionStart;
      textarea.value = `${textarea.value.slice(0, start)
      }\t${textarea.value.slice(start)}`;
      textarea.selectionStart = start + 1;
    }
  }
}
export function inputKeyOnClick() {
  const textarea = document.querySelector('textarea');
  if (!this.classList.contains('key_service') || ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(this.id)) {
    const start = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, start)
      + this.textContent + textarea.value.slice(start);
    textarea.selectionStart = start + 1;
  } else if (this.id === 'Delete') {
    const start = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, start)
      + textarea.value.slice(start + 1);
    textarea.selectionStart = start;
  } else if (this.id === 'Backspace') {
    const start = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, start - 1 > -1 ? start - 1 : 0)
      + textarea.value.slice(start);
    textarea.selectionStart = start === 0 ? 0 : start - 1;
  } else if (this.id === 'Enter') {
    const start = textarea.selectionStart;
    textarea.value = `${textarea.value.slice(0, start)
    }\n${textarea.value.slice(start)}`;
    textarea.selectionStart = start + 1;
  } else if (this.id === 'Tab') {
    const start = textarea.selectionStart;
    textarea.value = `${textarea.value.slice(0, start)
    }\t${textarea.value.slice(start)}`;
    textarea.selectionStart = start + 1;
  }
}
