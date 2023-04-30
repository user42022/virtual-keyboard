import { keyOder } from './keyboard-object.js';
import {
  createKeyElement, createKeyboard, highlightKey,
  removeHighlightKey, toggleHighlightOnClick, switchLanguage, defineContent,
  highlightKeyOnMouseDown, removeHighlightKeyOnMouseUp, inputKeyOnPress, inputKeyOnClick,
} from './functions.js';

localStorage.setItem('capslock', '0');
document.addEventListener('keydown', switchLanguage);
document.addEventListener('keydown', highlightKey);
document.addEventListener('keydown', inputKeyOnPress);
document.addEventListener('keyup', removeHighlightKey);

const textarea = document.createElement('textarea');
const descriptionFirst = document.createElement('div');
descriptionFirst.className = 'description';
descriptionFirst.textContent = 'Клавиатура создана в операционной системе Windows';
const descriptionSecond = descriptionFirst.cloneNode();
descriptionSecond.textContent = 'Для переключения языка комбинация: левыe ctrl + alt';
textarea.className = 'textarea';
const body = document.querySelector('body');

body.append(textarea);
const keyboard = createKeyboard();
keyboard.querySelectorAll('.keyboard__row').forEach((row, rowIndex) => {
  createKeyElement(row, keyOder[rowIndex]);
});
body.append(keyboard);
body.append(descriptionFirst);
body.append(descriptionSecond);

[...document.querySelectorAll('.key')].filter((el) => el.id !== 'CapsLock').forEach((el) => {
  el.addEventListener('mousedown', highlightKeyOnMouseDown);
  el.addEventListener('mouseup', removeHighlightKeyOnMouseUp);
  el.addEventListener('mouseout', removeHighlightKeyOnMouseUp);
  el.addEventListener('click', inputKeyOnClick);
});
document.getElementById('CapsLock').addEventListener('click', toggleHighlightOnClick);

const target = [document.getElementById('CapsLock'),
  document.getElementById('ShiftLeft'),
  document.getElementById('ShiftRight'),
  document.getElementById('AltLeft'),
  document.getElementById('ControlLeft')];
const observer = new MutationObserver(defineContent);

const config = {
  attributes: true,
  childList: false,
  subtree: false,
};
target.forEach((el) => observer.observe(el, config));
