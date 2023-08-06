import { resetScale } from './zoom.js';
import { resetEffect } from './effects.js';
import {sendData} from './create-api.js';
import {showSuccessPopup , showErrorPopup} from './popup.js';

const MAX_HASHTAGS_COUNT = 5;
const HASHTAGS_RULES = /^#[a-zа-яё0-9]{1,19}$/i;
const UNUNIQUE_TAGS_ERROR_TEXT = 'Ошибка хэштэга: повторяющийся хэштэг - уберите повтор в любом регистре !';
const INVALID_CONTENT_ERROR_TEXT = 'Ошибка хэштэга: неверное содержимое хэштэга - начать с #, плюс от 1  до 19 символов a-z,а-я, 0-9';
const INVALID_COUNT_ERROR_TEXT = 'Ошибка хэштэга: превышено допустимое количество хэштэгов - не более 5 !';
const SUBMIT_BUTTON_TEXT_SENDING = 'Публикую...';
const SUBMIT_BUTTON_TEXT = 'Опубликовать';


const bodyElement = document.querySelector('body');
const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const uploadFormElement = document.querySelector('.img-upload__form');
const fileFieldElement = document.querySelector('#upload-file');
const hashtagFieldElement = document.querySelector('.text__hashtags');
const descriptionFieldElement = document.querySelector('.text__description');
const cancelCrossElement = document.querySelector('#upload-cancel');
const buttonSubmitElement = document.querySelector('#upload-submit');


const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});


const showModal = () => {
  uploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscKeydown);
  hashtagFieldElement.addEventListener('keyup', onTextKeyUp);
  descriptionFieldElement.addEventListener('keyup', onTextKeyUp);
};


const hideModal = () => {
  uploadFormElement.reset();
  resetScale();
  resetEffect();
  pristine.reset();
  uploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscKeydown);
  hashtagFieldElement.removeEventListener('keyup', onTextKeyUp);
  descriptionFieldElement.removeEventListener('keyup', onTextKeyUp);
};


const blockСonditionOnFocus = () =>
  document.activeElement === hashtagFieldElement || document.activeElement === descriptionFieldElement;


function onDocumentEscKeydown(evt) {
  if (evt.key === 'Escape' && !blockСonditionOnFocus()) {
    evt.preventDefault();
    hideModal();
  }
}

const onOpenFileChange = () => {
  showModal();
};

const onCancelCrossClick = () => {
  hideModal();
};


const normalizeTags = (tagString) => tagString.trim().split(' ').filter((tag) => Boolean(tag.length));


const isValidTag = (value) => normalizeTags(value).every((tag) => HASHTAGS_RULES.test(tag));


const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAGS_COUNT;


const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};


pristine.addValidator(
  hashtagFieldElement,
  hasUniqueTags,
  UNUNIQUE_TAGS_ERROR_TEXT, 1, true
);


pristine.addValidator(
  hashtagFieldElement,
  isValidTag,
  INVALID_CONTENT_ERROR_TEXT, 2, true
);


pristine.addValidator(
  hashtagFieldElement,
  hasValidCount,
  INVALID_COUNT_ERROR_TEXT, 3, true
);


function onTextKeyUp() {
  if (hasUniqueTags(hashtagFieldElement.value) && isValidTag(hashtagFieldElement.value) && hasValidCount(hashtagFieldElement.value) && descriptionFieldElement.value.length < 141) {
    buttonSubmitElement.disabled = false;
  } else {
    buttonSubmitElement.disabled = true;
  }
}


const blockSubmitButton = () => {
  buttonSubmitElement.disabled = true;
  buttonSubmitElement.textContent = SUBMIT_BUTTON_TEXT_SENDING;
};


const unblockSubmitButton = () => {
  buttonSubmitElement.disabled = false;
  buttonSubmitElement.textContent = SUBMIT_BUTTON_TEXT;
};

const submitUserPhoto = () => {
  uploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          hideModal();
          showSuccessPopup();
        })
        .catch(() => {
          showErrorPopup();
        })
        .finally(unblockSubmitButton);
    }
  });
};

fileFieldElement.addEventListener('change', onOpenFileChange);
cancelCrossElement.addEventListener('click', onCancelCrossClick);

export {submitUserPhoto, onDocumentEscKeydown};
