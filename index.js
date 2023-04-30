import { KEYBOARD_OBJECT, keyOder } from './keyboard-object.js';
import {
  createKeyElement, createKeyboard, highlightKey,
  removeHighlightKey, toggleHighlightOnClick,
} from './functions.js';

document.addEventListener('keydown', (event) => {
  console.log(KEYBOARD_OBJECT[`${event.code}`]);
});
localStorage.setItem('capslock', '0');
const textarea = document.createElement('textarea');
const descriptionFirst = document.createElement('div');
descriptionFirst.className = 'description';
descriptionFirst.textContent = 'Клавиатура создана в операционной системе Windows';
const descriptionSecond = descriptionFirst.cloneNode();
descriptionSecond.textContent = 'Для переключения языка комбинация: левыe ctrl + alt';
textarea.className = 'textarea';
const body = document.querySelector('body');
document.addEventListener('keydown', highlightKey);
document.addEventListener('keyup', removeHighlightKey);
document.addEventListener('keyup', (event) => { console.log(event.code); });
body.append(textarea);
const keyboard = createKeyboard();
keyboard.querySelectorAll('.keyboard__row').forEach((row, rowIndex) => {
  createKeyElement(row, keyOder[rowIndex]);
});
body.append(keyboard);
body.append(descriptionFirst);
body.append(descriptionSecond);
document.getElementById('CapsLock').addEventListener('click', toggleHighlightOnClick);

// console.log(new KeyWrapper(KEYBOARD_OBJECT.ShiftRight).element);
/* document.querySelector('body').append((new KeyWrapper(KEYBOARD_OBJECT.Backquote)).element); */
/*
const textarea = document.querySelector('textarea');
const keyList = document.querySelectorAll('div.key');

keyList.forEach((element) => {
  element.addEventListener('click', () => {
    const start = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, start)
    + element.textContent + textarea.value.slice(start);
    textarea.selectionStart = start + 1;
  });
});
*/
