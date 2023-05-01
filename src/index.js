import { keyOder } from './keyboard-object';
import {
  createKeyElement, createKeyboard, highlightKey,
  removeHighlightKey, toggleHighlightOnClick, switchLanguage, defineContent,
  highlightKeyOnMouseDown, removeHighlightKeyOnMouseUp, inputKeyOnPress, inputKeyOnClick,
} from './functions';

localStorage.setItem('capslock', '0');
document.addEventListener('keydown', switchLanguage);
document.addEventListener('keydown', highlightKey);
document.addEventListener('keydown', inputKeyOnPress);
document.addEventListener('keyup', removeHighlightKey);

const langShortcut = document.createElement('div');
langShortcut.className = 'lang-shortcut';
langShortcut.textContent = +localStorage.getItem('lang') ? 'РУ' : 'EN';
if (+localStorage.getItem('lang')) {
  langShortcut.classList.add('lang-shortcut_ru');
} else {
  langShortcut.classList.remove('lang-shortcut_ru');
}
const heading = document.createElement('h1');
heading.className = 'heading';
heading.textContent = 'RSS Виртуальная клавиатура';
const textarea = document.createElement('textarea');
const descriptionFirst = document.createElement('div');
descriptionFirst.className = 'description';
descriptionFirst.textContent = +localStorage.getItem('lang') ? 'Клавиатура создана в операционной системе Windows 10' : 'The keyboard was created in the Windows 10 operating system';
const descriptionSecond = descriptionFirst.cloneNode();
descriptionSecond.textContent = +localStorage.getItem('lang') ? 'Для переключения языка комбинация: левыe ctrl + alt' : 'To switch the language combination: left ctrl + alt';
textarea.className = 'textarea';
const body = document.querySelector('body');
body.append(heading);
body.append(textarea);
const keyboard = createKeyboard();
keyboard.querySelectorAll('.keyboard__row').forEach((row, rowIndex) => {
  createKeyElement(row, keyOder[rowIndex]);
});
body.append(keyboard);
body.append(descriptionFirst);
body.append(descriptionSecond);
body.append(langShortcut);

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
