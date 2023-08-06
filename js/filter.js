// Модуль сортировки фото в галерее

import { renderGallery } from './gallery.js';
import { debounce, removeElement, sortComments, sortRandom } from './util.js';

const DELAY_TIME = 600;
const COUNT_RANDOM_PHOTOS = 10;

const photosSortsElement = document.querySelector('.img-filters');
const sortRandomElement = document.querySelector('#filter-random');
const sortCommentElement = document.querySelector('#filter-discussed');

const updatePhotos = (targetElement, photos) => {
  let copyPhotos = photos.slice();
  if (targetElement === sortRandomElement) {
    copyPhotos = sortRandom(copyPhotos, COUNT_RANDOM_PHOTOS);
  }
  if (targetElement === sortCommentElement) {
    copyPhotos = sortComments(copyPhotos);
  }
  document.querySelectorAll('.picture').forEach(removeElement);
  renderGallery(copyPhotos);
};

const renderPhotosDelay = debounce((targetElement, photos) => updatePhotos(targetElement, photos), DELAY_TIME);

const filtergGallery = (loadedPhotos) => {
  photosSortsElement.classList.remove('img-filters--inactive');
  photosSortsElement.addEventListener('click', (evt) => {
    if (evt.target.closest('.img-filters__button') && !evt.target.closest('.img-filters__button--active')) {
      const activeSortElement = photosSortsElement.querySelector('.img-filters__button--active');
      activeSortElement.classList.remove('img-filters__button--active');
      renderPhotosDelay(evt.target, loadedPhotos);
      evt.target.classList.add('img-filters__button--active');
    }
  });
};

export { filtergGallery };
