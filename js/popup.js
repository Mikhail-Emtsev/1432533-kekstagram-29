import {onDocumentEscKeydown} from './formupload.js';

const successTemplateElement = document.querySelector('#success').content.querySelector('.success');
const successPopupElement = successTemplateElement.cloneNode(true);
const successInnerElement = successPopupElement.querySelector('.success__inner');
const successTitleElement = successPopupElement.querySelector('.success__title');
const successButtonElement = successPopupElement.querySelector('.success__button');
const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
const errorPopupElement = errorTemplateElement.cloneNode(true);
const errorButtonElement = errorPopupElement.querySelector('.error__button');
const errorInnerElement = errorPopupElement.querySelector('.error__inner');
const errorTitleElement = errorPopupElement.querySelector('.error__title');


const closeSuccessPopup = () => {
  successPopupElement.remove();
  document.removeEventListener('keydown', onSuccessKeydown);
  document.removeEventListener('click', onSuccessClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
};


const showSuccessPopup = () => {
  document.body.append(successPopupElement);
  successButtonElement.addEventListener('click', () => {
    closeSuccessPopup();
  });
  document.addEventListener('keydown', onSuccessKeydown);
  document.addEventListener('click', onSuccessClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
};


function onSuccessKeydown (evt) {
  if (evt.key === 'Escape') {
    closeSuccessPopup();
  }
}


function onSuccessClick (evt) {
  if (evt.target !== successInnerElement && evt.target !== successTitleElement) {
    closeSuccessPopup();
  }
}


const closeErrorPopup = () => {
  errorPopupElement.remove();
  document.removeEventListener('keydown', onErrorKeydown);
  document.removeEventListener('click', onErrorClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
};


const showErrorPopup = () => {
  document.body.append(errorPopupElement);
  errorButtonElement.addEventListener('click', () => {
    closeErrorPopup();
  });
  document.addEventListener('keydown', onErrorKeydown);
  document.addEventListener('click', onErrorClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
};


function onErrorKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeErrorPopup();
  }
}


function onErrorClick (evt) {
  if (evt.target !== errorInnerElement && evt.target !== errorTitleElement) {
    closeErrorPopup();
  }
}

export {showSuccessPopup , showErrorPopup};
